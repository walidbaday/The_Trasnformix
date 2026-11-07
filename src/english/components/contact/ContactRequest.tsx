"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from "react";
import { FormFields } from "@/english/components/careers/FormFields";
import { validate, visibleFields, type Errors, type Values } from "@/english/components/careers/forms";
import fieldStyles from "@/english/components/careers/ApplicationForm.module.css";
import {
  CONTACT_REQUEST_TYPES,
  PARTNERSHIP_COPY,
  PARTNERSHIP_FORMS,
  type PartnershipPathId,
} from "@/english/lib/partnerships";
import styles from "@/english/components/contact/ContactRequest.module.css";

const cx = (...names: (string | false | undefined)[]) =>
  names.filter(Boolean).join(" ");

const spec = PARTNERSHIP_FORMS.contact;

/** Fired by a RequestLink; the form picks up the request type it names. */
const SELECT_EVENT = "transformix:request-type";

/** One of the page's calls (a card, the hero, the regional box): it drops to
    the request form with its own request type already picked. */
export function RequestLink({ type, href, className, children }: {
  type: PartnershipPathId;
  /** The form's id, as a fragment. */
  href: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      className={className}
      onClick={() => window.dispatchEvent(new CustomEvent(SELECT_EVENT, { detail: type }))}
    >
      {children}
    </a>
  );
}

/** The unified request (Figma 4431:12256): the request type, then who is
    asking and what they need. /api/partnerships checks it against the same
    spec and emails it to the team. */
export function RequestForm({ id, labelledBy }: { id: string; labelledBy: string }) {
  const uid = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const [type, setType] = useState<PartnershipPathId>(CONTACT_REQUEST_TYPES[0].id);
  const [values, setValues] = useState<Values>({});
  const [errors, setErrors] = useState<Errors>({});
  /* A field people never see; only bots fill it in. */
  const [trap, setTrap] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const onSelect = (event: Event) => {
      const next = (event as CustomEvent<PartnershipPathId>).detail;
      setType(next);
      setSent(false);
      /* Keyboard users land on the option the call picked. */
      requestAnimationFrame(() =>
        formRef.current
          ?.querySelector<HTMLInputElement>(`input[name="${uid}-type"][value="${next}"]`)
          ?.focus({ preventScroll: true }),
      );
    };
    window.addEventListener(SELECT_EVENT, onSelect);
    return () => window.removeEventListener(SELECT_EVENT, onSelect);
  }, [uid]);

  const update = (name: string, value: string | string[]) => {
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => (current[name] ? { ...current, [name]: "" } : current));
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submitting) return;
    const found = validate(spec, values, true);
    setErrors(found);
    const firstInvalid = Object.keys(found)[0];
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`[data-field="${firstInvalid}"]`)?.focus();
      return;
    }

    const payload: Values = {};
    for (const field of visibleFields(spec, values)) payload[field.name] = values[field.name] ?? "";

    setSubmitting(true);
    setSubmitError(null);
    try {
      const response = await fetch("/api/partnerships", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          path: type,
          form: spec.id,
          values: payload,
          fax: trap,
          lang: document.documentElement.lang,
        }),
      });
      if (!response.ok) throw new Error(String(response.status));
      setSent(true);
      setValues({});
      setTrap("");
    } catch {
      setSubmitError(PARTNERSHIP_COPY.error);
    } finally {
      setSubmitting(false);
    }
  };

  if (sent) {
    return (
      <div id={id} className={cx(styles.card, styles.done)} role="status">
        <h3 className={styles.doneTitle}>{spec.doneTitle}</h3>
        <p className={styles.doneText}>{spec.doneText}</p>
        <button type="button" className={styles.again} onClick={() => setSent(false)}>
          {spec.again}
        </button>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      id={id}
      className={styles.card}
      onSubmit={onSubmit}
      aria-labelledby={labelledBy}
      noValidate
    >
      <fieldset className={styles.types}>
        <legend className={styles.typesTitle}>{"What is your request about?"}</legend>
        <div className={styles.typeGrid}>
          {CONTACT_REQUEST_TYPES.map((option) => (
            <label key={option.id} className={styles.type}>
              <input
                type="radio"
                name={`${uid}-type`}
                value={option.id}
                checked={type === option.id}
                onChange={() => setType(option.id)}
              />
              <span className={styles.typeBox}>
                <Image
                  className={styles.check}
                  src="/icons/request-check.svg"
                  alt=""
                  width={20}
                  height={20}
                  aria-hidden
                />
                <span>{option.label}</span>
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className={cx(fieldStyles.compact, styles.fields)}>
        <FormFields spec={spec} values={values} errors={errors} uid={uid} onChange={update} />
      </div>

      <div className={styles.trap} aria-hidden="true">
        <label>
          Fax
          <input
            type="text"
            name="fax"
            tabIndex={-1}
            autoComplete="off"
            value={trap}
            onChange={(event) => setTrap(event.target.value)}
          />
        </label>
      </div>

      {submitError && (
        <p role="alert" className={styles.submitError}>
          {submitError}
        </p>
      )}

      <div className={styles.actions}>
        <button type="submit" className={styles.submit} disabled={submitting}>
          {submitting ? PARTNERSHIP_COPY.review.sending : spec.submit}
        </button>
      </div>
    </form>
  );
}
