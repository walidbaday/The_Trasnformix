"use client";

import type { ReactNode } from "react";
import { useContactModal } from "@/components/contact/ContactModal";

type ServiceActionProps = {
  children: ReactNode;
  /** Where the call leads. Without one it opens the site's project form. */
  href?: string;
  /** Leaves the site, so it opens in a new tab. */
  external?: boolean;
  className?: string;
};

/** A call on the service pages: a link when it has somewhere to go, and
    otherwise the button that opens the project form every page shares. */
export function ServiceAction({ children, href, external, className }: ServiceActionProps) {
  const { open } = useContactModal();

  if (href) {
    return (
      <a
        href={href}
        className={className}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </a>
    );
  }

  return (
    <button type="button" className={className} aria-haspopup="dialog" onClick={open}>
      {children}
    </button>
  );
}
