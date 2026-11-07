"use client";

import Image from "next/image";
import {
  useEffect,
  useRef,
  useSyncExternalStore,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import styles from "@/english/components/contact/ContactModal.module.css";

/* The portal needs `document`, so it renders only once hydrated. */
const noopSubscribe = () => () => {};
const useIsClient = () =>
  useSyncExternalStore(noopSubscribe, () => true, () => false);

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/** Length of the close transition (matches --dur). */
export const EXIT_MS = 320;

const cx = (...names: (string | false | undefined)[]) =>
  names.filter(Boolean).join(" ");

type ModalFrameProps = {
  open: boolean;
  onClose: () => void;
  /** The id of the dialog's title. */
  labelledBy: string;
  className?: string;
  /** Each change (a new step) scrolls back to the top and hands focus to the
      dialog, so the new title is announced. */
  focusKey?: unknown;
  children: ReactNode;
};

/** The overlay, panel and close button the site's modals share. The dialog
    stays mounted and is hidden (and inert) while closed, so both directions
    are plain CSS transitions. It traps Tab, closes on Escape or a click on
    the backdrop, and hands focus back to whatever opened it. */
export function ModalFrame({
  open,
  onClose,
  labelledBy,
  className,
  focusKey,
  children,
}: ModalFrameProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const wasOpenRef = useRef(false);
  const isClient = useIsClient();

  useEffect(() => {
    if (open) {
      openerRef.current = document.activeElement as HTMLElement | null;
    } else if (wasOpenRef.current) {
      openerRef.current?.focus?.({ preventScroll: true });
    }
    wasOpenRef.current = open;
  }, [open]);

  /* Lock the page behind the dialog. The scrollbar's width is handed to the
     root as padding so the layout (and the viewport-scaled rem) stay put. */
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const scrollbar = window.innerWidth - root.clientWidth;
    const previous = { overflow: root.style.overflow, padding: root.style.paddingRight };
    root.style.overflow = "hidden";
    if (scrollbar > 0) root.style.paddingRight = `${scrollbar}px`;
    return () => {
      root.style.overflow = previous.overflow;
      root.style.paddingRight = previous.padding;
    };
  }, [open]);

  /* Each step hands focus to the dialog itself: its title is announced, and
     the fields stay in their resting state. A tall dialog scrolls inside the
     overlay, so a new step starts from its top. */
  useEffect(() => {
    if (!open) return;
    dialogRef.current?.parentElement?.scrollTo({ top: 0 });
    dialogRef.current?.focus({ preventScroll: true });
  }, [open, focusKey]);

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      event.stopPropagation();
      onClose();
      return;
    }
    if (event.key !== "Tab") return;
    const nodes = dialogRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE);
    if (!nodes?.length) return;
    const first = nodes[0];
    const last = nodes[nodes.length - 1];
    const atStart =
      document.activeElement === first || document.activeElement === dialogRef.current;
    if (event.shiftKey && atStart) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  if (!isClient) return null;

  return createPortal(
    <div
      className={cx(styles.overlay, open && styles.overlayIn)}
      inert={!open}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        tabIndex={-1}
        className={cx(styles.dialog, className)}
        onKeyDown={onKeyDown}
      >
        <button type="button" className={styles.close} aria-label={"Close"} onClick={onClose}>
          <Image src="/icons/modal-close.svg" alt="" width={18} height={24} aria-hidden />
        </button>
        {children}
      </div>
    </div>,
    document.body,
  );
}
