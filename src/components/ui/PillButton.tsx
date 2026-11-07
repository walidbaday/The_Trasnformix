"use client";

import type { ReactNode } from "react";
import { useContactModal } from "@/components/contact/ContactModal";
import styles from "./PillButton.module.css";

type PillButtonProps = {
  children: ReactNode;
  /** Without one the pill opens the contact form. */
  href?: string;
  /** What a pill without `href` opens: the project form, or the six
      partnership paths and their forms. */
  opens?: "contact" | "partnerships";
  /** Opens `href` in a new tab, for links that leave the site. */
  external?: boolean;
  className?: string;
  /** `primary` — blue pill, white arrow disc (Figma 3459:10323).
      `inverse` — the white pill for dark grounds, blue disc (3459:11119).
      `outline` — "Button 9": a primary rim on a faint white wash (3459:10320).
      `ghost` — the same rim on a dark ground, white label (3459:11116).
      `soft` — the pale blue pill with a SemiBold primary label and no disc
      (3652:7310). */
  variant?: "primary" | "inverse" | "outline" | "ghost" | "soft";
  size?: "default" | "compact";
  /** `submit` makes the pill its form's submit button instead. */
  type?: "submit";
  disabled?: boolean;
};

/** The site's rounded CTA (Figma 3459:10323, 2786:9056): a 264-wide pill whose label
    sits beside a 28px disc holding a left-pointing arrow. The outline kinds
    drop the disc and use the Medium 18px label. */
export function PillButton({
  children,
  href,
  opens = "contact",
  external,
  className,
  variant = "primary",
  size = "default",
  type,
  disabled,
}: PillButtonProps) {
  const { open, openPartnerships } = useContactModal();
  const outlined = variant === "outline" || variant === "ghost" || variant === "soft";
  const classes = [styles.root, styles[variant], size === "compact" && styles.compact, className]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      <span className={styles.label}>{children}</span>
      {!outlined && (
        <span className={styles.disc} aria-hidden>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className={styles.arrow}
            src={
              variant === "inverse"
                ? "/icons/academy/pill-arrow-light.svg"
                : "/icons/academy/pill-arrow.svg"
            }
            alt=""
            width={16}
            height={16}
          />
        </span>
      )}
    </>
  );

  if (type === "submit") {
    return (
      <button type="submit" className={classes} disabled={disabled}>
        {content}
      </button>
    );
  }

  if (!href) {
    return (
      <button
        type="button"
        className={classes}
        aria-haspopup="dialog"
        onClick={opens === "partnerships" ? openPartnerships : open}
      >
        {content}
      </button>
    );
  }

  return (
    <a
      href={href}
      className={classes}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
    >
      {content}
    </a>
  );
}
