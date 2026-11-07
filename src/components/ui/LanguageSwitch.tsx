"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import styles from "./LanguageSwitch.module.css";

const subscribe = (onChange: () => void) => {
  window.addEventListener("hashchange", onChange);
  window.addEventListener("popstate", onChange);
  return () => {
    window.removeEventListener("hashchange", onChange);
    window.removeEventListener("popstate", onChange);
  };
};

type LanguageSwitchProps = {
  /** `pill` — the globe pill every navbar has carried. `menu` — the v1 bar's
      selector (Figma 4305:4684–4305:4687): chevron, language name and globe,
      opening a list of both languages. */
  variant?: "pill" | "menu";
};

export function LanguageSwitch({ variant = "pill" }: LanguageSwitchProps) {
  const pathname = usePathname();
  const suffix = useSyncExternalStore(subscribe, () => window.location.search + window.location.hash, () => "");
  const isEnglish = /^\/en(?:\/|$)/.test(pathname);
  const targetPath = isEnglish ? pathname.replace(/^\/en(?=\/|$)/, "") || "/" : `/en${pathname === "/" ? "" : pathname}`;
  const href = `${targetPath}${suffix}`;

  if (variant === "menu") return <LanguageMenu isEnglish={isEnglish} href={href} />;

  const language = isEnglish ? "ar" : "en";
  const label = isEnglish ? "View this page in Arabic" : "عرض هذه الصفحة باللغة الإنجليزية";

  return (
    <a className={styles.link} data-language-switch href={href}
      lang={language} hrefLang={language} dir="ltr" aria-label={label} title={label}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <ellipse cx="12" cy="12" rx="4" ry="9" />
        <path d="M3 12h18" />
      </svg>
      <span className={styles.label}>{isEnglish ? "العربية" : "EN"}</span>
    </a>
  );
}

const LANGUAGES = [
  { code: "ar", name: "العربية", dir: "rtl" },
  { code: "en", name: "English", dir: "ltr" },
] as const;

/** The current language heads the list; the other one leads to this same
    page, query and section in that language. */
function LanguageMenu({ isEnglish, href }: { isEnglish: boolean; href: string }) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const listId = useId();
  const current = isEnglish ? "en" : "ar";

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      button.current?.focus();
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div
      ref={root}
      className={styles.menu}
      data-language-menu
      onBlur={(event) => {
        const next = event.relatedTarget as Node | null;
        if (next && !event.currentTarget.contains(next)) setOpen(false);
      }}
    >
      <button
        ref={button}
        type="button"
        className={styles.menuButton}
        aria-expanded={open}
        aria-controls={listId}
        aria-label={isEnglish ? "Language: English" : "اللغة: العربية"}
        onClick={() => setOpen(!open)}
      >
        <Image className={styles.menuChevron} src="/icons/nav/language-chevron.svg" alt="" width={14} height={14} />
        <span>{isEnglish ? "English" : "العربية"}</span>
        <Image className={styles.menuGlobe} src="/icons/nav/globe.svg" alt="" width={21} height={21} />
      </button>

      <ul id={listId} className={`${styles.menuList} ${open ? styles.menuListOpen : ""}`} inert={!open}>
        {LANGUAGES.map(({ code, name, dir }) => (
          <li key={code}>
            {code === current ? (
              <span className={`${styles.menuOption} ${styles.menuOptionCurrent}`} lang={code} dir={dir} aria-current="true">
                {name}
              </span>
            ) : (
              <a className={styles.menuOption} href={href} lang={code} hrefLang={code} dir={dir}>
                {name}
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
