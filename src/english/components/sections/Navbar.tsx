"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type Ref } from "react";
import { ChevronDown } from "@/english/components/ui/ChevronDown";
import { LanguageSwitch } from "@/components/ui/LanguageSwitch";
import { PillButton } from "@/english/components/ui/PillButton";
import {
  HOME_LINK,
  NAV_ITEMS,
  NAV_SEARCH_SUGGESTIONS,
  searchNav,
  type NavLink,
  type NavMenu,
  type NavMenuId,
} from "@/english/lib/navbarMenus";
import styles from "@/english/components/sections/Navbar.module.css";

type Panel = NavMenuId | "search";

/* No tab is picked as a menu opens, so it shows everything it holds. */
const FIRST_TABS: Record<NavMenuId, number | null> = { services: null, products: null, resources: null };

const cx = (...names: (string | false | undefined)[]) =>
  names.filter(Boolean).join(" ");

const panelId = (panel: Panel) => `nav-panel-${panel}`;

/** A menu entry, which opens in a new tab when it leaves the site. */
function MenuLink({ link, className, onNavigate, pathname }: {
  link: NavLink;
  className?: string;
  onNavigate: () => void;
  pathname: string;
}) {
  const current = link.href === pathname;
  return (
    <Link
      href={link.href}
      className={className}
      target={link.external ? "_blank" : undefined}
      rel={link.external ? "noopener noreferrer" : undefined}
      aria-current={current ? "page" : undefined}
      onClick={onNavigate}
    >
      {link.label}
    </Link>
  );
}

/** The grey line of parts under an entry: "تطوير المواقع - تطبيقات الموبيل". */
function Extras({ links, onNavigate, pathname }: { links: NavLink[]; onNavigate: () => void; pathname: string }) {
  return (
    <span className={styles.extras}>
      {links.map((extra, index) => (
        <span key={extra.label}>
          {index > 0 && <span aria-hidden="true"> - </span>}
          <MenuLink link={extra} className={styles.extraLink} onNavigate={onNavigate} pathname={pathname} />
        </span>
      ))}
    </span>
  );
}

/** Figma 4305:4659 — the grey sidebar of tabs under the menu's own name, then
    the selected tab's columns, or all of them until one is picked. Pointing
    at or focusing a tab shows its columns; its label opens its page. */
function MegaMenu({ title, menu, tab, onTab, onNavigate, pathname }: {
  title: string;
  menu: NavMenu;
  tab: number | null;
  onTab: (index: number) => void;
  onNavigate: () => void;
  pathname: string;
}) {
  const columns = (tab === null ? undefined : menu.tabs[tab]?.columns) ?? menu.overview;
  const shownKey = tab ?? "all";

  return (
    <div className={cx(styles.mega, menu.plain && styles.megaPlain)}>
      <div className={styles.side}>
        <p className={styles.sideTitle}>{title}</p>
        <ul className={styles.tabs}>
          {menu.tabs.map((item, index) => {
            const selected = index === tab;
            const props = {
              className: cx(styles.tab, selected && styles.tabSelected),
              onPointerEnter: () => onTab(index),
              onFocus: () => onTab(index),
            };
            const content = (
              <>
                <span>{item.label}</span>
                <Image className={styles.tabArrow} src={menu.arrow} alt="" width={20} height={20} />
              </>
            );
            return (
              <li key={item.label}>
                {item.href ? (
                  <Link href={item.href} {...props} aria-current={item.href === pathname ? "page" : undefined} onClick={onNavigate}>
                    {content}
                  </Link>
                ) : (
                  <button type="button" {...props} aria-pressed={selected} onClick={() => onTab(index)}>
                    {content}
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      </div>

      <div className={styles.columns}>
        {columns.map((column, index) => (
          <div key={`${shownKey}-${index}`} className={styles.column}>
            {column.map((block, blockIndex) => (
              <div key={block.title?.label ?? blockIndex} className={cx(styles.block, block.continues && styles.blockContinues)}>
                {block.title && (
                  <MenuLink link={block.title} className={styles.blockTitle} onNavigate={onNavigate} pathname={pathname} />
                )}
                <ul className={styles.blockLinks}>
                  {block.links.map((link) => (
                    <li key={link.label}>
                      <MenuLink link={link} className={styles.megaLink} onNavigate={onNavigate} pathname={pathname} />
                      {link.extras && <Extras links={link.extras} onNavigate={onNavigate} pathname={pathname} />}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/** Finds pages and menu entries by name, in the bar's panel and the sheet. */
function NavSearch({ inputRef, compact, onNavigate, pathname }: {
  inputRef?: Ref<HTMLInputElement>;
  compact?: boolean;
  onNavigate: () => void;
  pathname: string;
}) {
  const [query, setQuery] = useState("");
  const typed = query.trim() !== "";
  const results = typed ? searchNav(query) : compact ? [] : NAV_SEARCH_SUGGESTIONS;
  const done = () => {
    setQuery("");
    onNavigate();
  };

  return (
    <div className={cx(styles.search, compact && styles.searchCompact)} role="search">
      <label className={styles.searchField}>
        <Image className={styles.searchIcon} src="/icons/nav/search.svg" alt="" width={22} height={22} />
        <span className={styles.visuallyHidden}>{"Search the site"}</span>
        <input
          ref={inputRef}
          type="search"
          className={styles.searchInput}
          value={query}
          placeholder={"Search for a service, product or page"}
          autoComplete="off"
          onChange={(event) => setQuery(event.target.value)}
        />
      </label>

      {!typed && !compact && <p className={styles.searchHint}>{"Suggested pages"}</p>}
      {typed && results.length === 0 && <p className={styles.searchHint} role="status">{"No matching results"}</p>}
      {results.length > 0 && (
        <ul className={styles.searchResults}>
          {results.map((result) => (
            <li key={`${result.label}-${result.href}`}>
              <Link
                href={result.href}
                className={styles.searchResult}
                target={result.external ? "_blank" : undefined}
                rel={result.external ? "noopener noreferrer" : undefined}
                aria-current={result.href === pathname ? "page" : undefined}
                onClick={done}
              >
                <span className={styles.searchLabel}>{result.label}</span>
                {result.trail && <span className={styles.searchTrail}>{result.trail}</span>}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

type NavbarProps = {
  /** `slim` is the 72px small-screen bar of the about artboard (Figma
      2515:60114): a white bar with a hairline, a 60 x 53 lockup and a 21 x 24
      bars glyph. The desktop bar is identical in both variants. */
  variant?: "default" | "slim";
};

export function Navbar({ variant = "default" }: NavbarProps) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [panel, setPanel] = useState<Panel | null>(null);
  const [tabs, setTabs] = useState(FIRST_TABS);
  const [menuOpen, setMenuOpen] = useState(false);
  const [sheetMenu, setSheetMenu] = useState<NavMenuId | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const searchInput = useRef<HTMLInputElement>(null);
  const closeTimer = useRef<number | undefined>(undefined);

  const onRoute = (routes: string[]) =>
    routes.some((route) => pathname === route || pathname.startsWith(`${route}/`));

  const cancelClose = () => window.clearTimeout(closeTimer.current);

  const openPanel = (next: Panel) => {
    cancelClose();
    if (next !== panel && next !== "search") setTabs((current) => ({ ...current, [next]: null }));
    setPanel(next);
  };

  /* A menu opened by pointing closes shortly after the pointer leaves; the
     search panel stays until it is dismissed. */
  const closeSoon = () => {
    cancelClose();
    closeTimer.current = window.setTimeout(() => {
      setPanel((current) => (current === "search" ? current : null));
    }, 160);
  };

  const closeAll = () => {
    cancelClose();
    setPanel(null);
    setMenuOpen(false);
    setSheetMenu(null);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const close = () => {
      setPanel(null);
      setMenuOpen(false);
      setSheetMenu(null);
    };
    window.addEventListener("resize", close);
    return () => window.removeEventListener("resize", close);
  }, []);

  useEffect(() => () => window.clearTimeout(closeTimer.current), []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (menuOpen) burgerRef.current?.focus();
      else headerRef.current?.querySelector<HTMLElement>('[aria-controls^="nav-panel-"][aria-expanded="true"]')?.focus();
      setPanel(null);
      setMenuOpen(false);
      setSheetMenu(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  /* A tap never produces a pointerleave, so anything pressed outside the bar
     and its panels has to close them. */
  useEffect(() => {
    if (!panel) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) setPanel(null);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [panel]);

  useEffect(() => {
    if (panel === "search") searchInput.current?.focus();
  }, [panel]);

  /* The sheet covers the viewport, so the page behind it must not scroll. */
  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    sheetRef.current?.querySelector<HTMLButtonElement>("button")?.focus();
    const trapFocus = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;
      const controls = Array.from(sheetRef.current?.querySelectorAll<HTMLElement>("a, button, input") ?? [])
        .filter((element) => element.getClientRects().length > 0 && !element.closest("[inert]"));
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    };
    document.addEventListener("keydown", trapFocus);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", trapFocus);
    };
  }, [menuOpen]);

  const focusPanel = (id: Panel) =>
    requestAnimationFrame(() => document.getElementById(panelId(id))?.querySelector<HTMLElement>("a, button")?.focus());

  return (
    <header
      ref={headerRef}
      className={cx(styles.header, variant === "slim" && styles.slim, scrolled && styles.scrolled)}
      onPointerLeave={(event) => { if (event.pointerType === "mouse") closeSoon(); }}
      onPointerEnter={(event) => { if (event.pointerType === "mouse") cancelClose(); }}
      onBlur={(event) => {
        /* Only focus moving elsewhere closes the panels; a press on the
           panel's background blurs to nothing and must keep it open. */
        const next = event.relatedTarget as Node | null;
        if (next && !event.currentTarget.contains(next)) setPanel(null);
      }}
    >
      <div className={styles.inner}>
        <Link href={"/en"} className={styles.logo} aria-label="Transformix">
          <Image
            className={styles.logoWide}
            src="/images/logo-wide.png"
            alt=""
            width={249}
            height={83}
            priority
          />
          <Image
            className={styles.logoCompact}
            src="/icons/logo-mobile.svg"
            alt=""
            width={47}
            height={35}
            priority
          />
          {variant === "slim" && (
            <Image
              className={styles.logoBar}
              src="/icons/logo-bar.svg"
              alt=""
              width={60}
              height={53}
              priority
            />
          )}
        </Link>

        <nav className={styles.nav} aria-label={"Main navigation"}>
          <ul className={styles.list}>
            {NAV_ITEMS.map((item) => {
              const menu = item.menu;
              const open = menu !== undefined && panel === menu.id;
              const lit = panel && panel !== "search" ? open : onRoute(item.routes);
              const current = item.href === pathname;
              const chevron = (
                <Image
                  className={styles.chevron}
                  src={open ? "/icons/nav/chevron-up.svg" : "/icons/nav/chevron-down.svg"}
                  alt=""
                  width={16}
                  height={16}
                />
              );

              if (!menu) {
                return (
                  <li
                    key={item.label}
                    className={cx(styles.item, lit && styles.itemLit)}
                    onPointerEnter={(event) => { if (event.pointerType === "mouse" && panel !== "search") closeSoon(); }}
                  >
                    <Link href={item.href!} className={styles.link} aria-current={current ? "page" : undefined} onClick={closeAll}>
                      {item.label}
                    </Link>
                  </li>
                );
              }

              return (
                <li
                  key={item.label}
                  className={cx(styles.item, lit && styles.itemLit)}
                  onPointerEnter={(event) => { if (event.pointerType === "mouse") openPanel(menu.id); }}
                >
                  {item.href ? (
                    <>
                      {/* The label opens its page; pointing, the chevron or ArrowDown shows the menu. */}
                      <Link
                        href={item.href}
                        className={styles.link}
                        aria-current={current ? "page" : undefined}
                        onClick={closeAll}
                        onKeyDown={(event) => {
                          if (event.key !== "ArrowDown") return;
                          event.preventDefault();
                          openPanel(menu.id);
                          focusPanel(menu.id);
                        }}
                      >
                        {item.label}
                      </Link>
                      <button
                        type="button"
                        className={styles.toggle}
                        aria-label={`Show the menu for ${item.label}`}
                        aria-expanded={open}
                        aria-controls={panelId(menu.id)}
                        onClick={() => (open ? setPanel(null) : openPanel(menu.id))}
                      >
                        {chevron}
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      className={cx(styles.link, styles.trigger)}
                      aria-expanded={open}
                      aria-controls={panelId(menu.id)}
                      onClick={() => (open ? setPanel(null) : openPanel(menu.id))}
                      onKeyDown={(event) => {
                        if (event.key !== "ArrowDown") return;
                        event.preventDefault();
                        openPanel(menu.id);
                        focusPanel(menu.id);
                      }}
                    >
                      {item.label}
                      {chevron}
                    </button>
                  )}

                  <div id={panelId(menu.id)} className={cx(styles.panel, open && styles.panelOpen)} inert={!open}>
                    <MegaMenu
                      title={item.label}
                      menu={menu}
                      tab={tabs[menu.id]}
                      onTab={(index) => setTabs((current) => ({ ...current, [menu.id]: index }))}
                      onNavigate={closeAll}
                      pathname={pathname}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Figma 4305:4680–4305:4687 — language, a hairline, then search. */}
        <div className={styles.tools}>
          <LanguageSwitch variant="menu" />
          <span className={styles.divider} aria-hidden="true" />
          <div className={styles.searchItem}>
            <button
              type="button"
              className={cx(styles.searchButton, panel === "search" && styles.searchButtonOpen)}
              aria-expanded={panel === "search"}
              aria-controls={panelId("search")}
              onClick={() => (panel === "search" ? setPanel(null) : openPanel("search"))}
            >
              {" Search "}<Image className={styles.searchIcon} src="/icons/nav/search.svg" alt="" width={22} height={22} />
            </button>
            <div id={panelId("search")} className={cx(styles.panel, panel === "search" && styles.panelOpen)} inert={panel !== "search"}>
              <NavSearch inputRef={searchInput} onNavigate={closeAll} pathname={pathname} />
            </div>
          </div>
        </div>

        <LanguageSwitch />

        <button
          ref={burgerRef}
          type="button"
          className={styles.burger}
          aria-label={"Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen(true)}
        >
          <Image
            className={styles.burgerGlyph}
            src="/icons/lucide-menu.svg"
            alt=""
            width={24}
            height={24}
            aria-hidden
          />
          {variant === "slim" && (
            <Image
              className={styles.burgerBars}
              src="/icons/menu-bars.svg"
              alt=""
              width={21}
              height={24}
              aria-hidden
            />
          )}
        </button>

        <div
          ref={sheetRef}
          id="mobile-menu"
          className={cx(styles.sheet, menuOpen && styles.sheetOpen)}
          role="dialog"
          aria-modal={menuOpen ? true : undefined}
          aria-label={"Main navigation"}
          aria-hidden={!menuOpen}
          inert={!menuOpen}
        >
          <button
            type="button"
            className={styles.close}
            aria-label={"Close menu"}
            onClick={() => { closeAll(); burgerRef.current?.focus(); }}
          >
            <span />
            <span />
          </button>

          <NavSearch compact onNavigate={closeAll} pathname={pathname} />

          <ul className={styles.sheetList}>
            <li className={styles.sheetItem}>
              <MenuLink
                link={HOME_LINK}
                className={cx(styles.sheetLink, pathname === HOME_LINK.href && styles.sheetActive)}
                onNavigate={closeAll}
                pathname={pathname}
              />
            </li>

            {NAV_ITEMS.map((item) => {
              const lit = onRoute(item.routes);
              const menu = item.menu;

              if (!menu) {
                return (
                  <li key={item.label} className={styles.sheetItem}>
                    <Link
                      href={item.href!}
                      className={cx(styles.sheetLink, lit && styles.sheetActive)}
                      aria-current={item.href === pathname ? "page" : undefined}
                      onClick={closeAll}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              }

              const open = sheetMenu === menu.id;
              return (
                <li key={item.label} className={styles.sheetItem}>
                  {/* The label opens its page; the chevron beside it unfolds the menu. */}
                  <div className={styles.sheetRow}>
                    {item.href ? (
                      <Link
                        href={item.href}
                        className={cx(styles.sheetLink, lit && styles.sheetActive)}
                        aria-current={item.href === pathname ? "page" : undefined}
                        onClick={closeAll}
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <span className={cx(styles.sheetLink, lit && styles.sheetActive)}>{item.label}</span>
                    )}
                    <button
                      type="button"
                      className={styles.sheetToggle}
                      aria-label={`Show the menu for ${item.label}`}
                      aria-expanded={open}
                      aria-controls={`sheet-${menu.id}-menu`}
                      onClick={() => setSheetMenu(open ? null : menu.id)}
                    >
                      <ChevronDown className={styles.sheetChevron} />
                    </button>
                  </div>

                  <div
                    id={`sheet-${menu.id}-menu`}
                    className={cx(styles.sheetMenu, open && styles.sheetMenuOpen)}
                    inert={!open}
                  >
                    {menu.tabs.map((group) => (
                      <div key={group.label} className={styles.sheetGroup}>
                        {group.href ? (
                          <MenuLink link={{ label: group.label, href: group.href }} className={styles.sheetGroupTitle} onNavigate={closeAll} pathname={pathname} />
                        ) : (
                          <p className={styles.sheetGroupTitle}>{group.label}</p>
                        )}
                        <ul className={styles.sheetGroupLinks}>
                          {group.columns.flat().flatMap((block) => block.links).map((link) => (
                            <li key={link.label}>
                              <MenuLink link={link} className={styles.sheetGroupLink} onNavigate={closeAll} pathname={pathname} />
                              {link.extras && <Extras links={link.extras} onNavigate={closeAll} pathname={pathname} />}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </li>
              );
            })}

            <li className={styles.sheetCtaItem}>
              <PillButton size="compact">{"Get a consultation"}</PillButton>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
