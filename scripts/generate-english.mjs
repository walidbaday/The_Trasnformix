import fs from "node:fs";
import path from "node:path";
import ts from "typescript";
import { adjustEnglishSource } from "./english-adjustments.mjs";

// English is generated into its own tree. Arabic source files are read only.
const messages = JSON.parse(fs.readFileSync("src/english/messages.json", "utf8"));
const normalize = (text) => text.trim().replace(/\s+/g, " ");
const arabic = /[\u0600-\u06ff]/;
const route = /^\/(?:about|academy|careers|community|contact|products|sectors|services|ventures|works)(?=[/?#]|$)|^\/v[234](?=[/?#]|$)/;
const files = [];

function walk(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) walk(file);
    else if (/\.(?:tsx?|css)$/.test(file)) files.push(file.replaceAll("\\", "/"));
  }
}
walk("src/components");
walk("src/lib");
walk("src/app/(arabic)");

const shared = (file) => /src\/lib\/(?:fonts|socialLinks|useInView|useStackingCards|useProgressCards|custom-effect-runtime\/|custom-effects\/)/.test(file)
  || /^src\/components\/ui\/LanguageSwitch\.(?:tsx|module\.css)$/.test(file);
const target = (file) => file.startsWith("src/app/(arabic)/")
  ? file.replace("src/app/(arabic)/", "src/app/(english)/en/")
  : file.replace("src/", "src/english/");
const sources = new Set(files.filter((file) => !shared(file) && file !== "src/app/(arabic)/layout.tsx"));
const missing = new Set();
const output = new Map();

function localizeRoute(value) {
  if (value === "/") return "/en";
  if (/^\/v2\/[^?#]*\.[a-z\d]+(?:[?#]|$)/i.test(value)) return value;
  return route.test(value) ? `/en${value}` : value;
}

function translate(value, preserveSpace = false, isRoute = true) {
  let output = value;
  if (arabic.test(value)) {
    const key = normalize(value);
    if (!(key in messages)) missing.add(key);
    else output = `${preserveSpace && /^\s/.test(value) ? " " : ""}${messages[key]}${preserveSpace && /\s$/.test(value) ? " " : ""}`;
  }
  output = output === "rtl" ? "ltr" : output;
  return isRoute ? localizeRoute(output) : output;
}

function resolveImport(file, specifier) {
  const base = specifier.startsWith("@/") ? `src/${specifier.slice(2)}` : specifier.startsWith(".") ? path.posix.normalize(path.posix.join(path.posix.dirname(file), specifier)) : null;
  if (!base) return specifier;
  for (const candidate of [base, `${base}.tsx`, `${base}.ts`, `${base}/index.tsx`, `${base}/index.ts`]) {
    if (sources.has(candidate)) return `@/${target(candidate).slice(4).replace(/\.(?:tsx?|css)$/, (extension) => extension === ".css" ? extension : "")}`;
  }
  return specifier;
}

const escapeTemplate = (value) => value.replaceAll("\\", "\\\\").replaceAll("`", "\\`").replaceAll("${", "\\${");
for (const file of sources) {
  let code = fs.readFileSync(file, "utf8");
  if (file.endsWith(".css")) {
    code = code.replace(/\bdirection:\s*rtl\b/g, "direction: ltr").replace(/\btext-align:\s*right\b/g, "text-align: left");
  } else {
    const source = ts.createSourceFile(file, code, ts.ScriptTarget.Latest, true);
    const edits = [];
    function visit(node) {
      if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) {
        const isImport = (ts.isImportDeclaration(node.parent) || ts.isExportDeclaration(node.parent)) && node.parent.moduleSpecifier === node;
        const isRootHref = node.text !== "/" ||
          (ts.isPropertyAssignment(node.parent) && /^(href|home)$/.test(node.parent.name.getText(source))) ||
          (ts.isJsxAttribute(node.parent) && node.parent.name.getText(source) === "href") ||
          (ts.isConditionalExpression(node.parent) && file.endsWith("HomeOpening.tsx"));
        let value = isImport ? resolveImport(file, node.text) : translate(node.text, false, isRootHref);
        // Route helper types must refer to the new route tree as well.
        if (node.text === "/v2" && ts.isLiteralTypeNode(node.parent)) value = "/en/v2";
        if (value !== node.text) {
          const replacement = ts.isJsxAttribute(node.parent) ? `{${JSON.stringify(value)}}` : JSON.stringify(value);
          edits.push([node.getStart(source), node.end, replacement]);
        }
      } else if (ts.isJsxText(node) && arabic.test(node.text)) {
        edits.push([node.getStart(source), node.end, `{${JSON.stringify(translate(node.text, true, false))}}`]);
      } else if (ts.isTemplateHead(node) || ts.isTemplateMiddle(node) || ts.isTemplateTail(node)) {
        const value = translate(node.text, true, ts.isTemplateHead(node) && node.text !== "/");
        if (value !== node.text) edits.push([node.getStart(source), node.end, `${ts.isTemplateHead(node) ? "`" : "}"}${escapeTemplate(value)}${ts.isTemplateTail(node) ? "`" : "${"}`]);
      }
      ts.forEachChild(node, visit);
    }
    visit(source);
    for (const [start, end, replacement] of edits.sort((a, b) => b[0] - a[0])) code = code.slice(0, start) + replacement + code.slice(end);
  }
  const destination = target(file);
  output.set(destination, adjustEnglishSource(file, code));
}

if (missing.size) throw new Error(`Missing English translations:\n${[...missing].join("\n")}`);
for (const [destination, code] of output) {
  if (fs.existsSync(destination) && fs.readFileSync(destination, "utf8") === code) continue;
  fs.mkdirSync(path.dirname(destination), { recursive: true });
  fs.writeFileSync(destination, code);
}
console.log(`Generated ${sources.size} English source files without editing Arabic content.`);
