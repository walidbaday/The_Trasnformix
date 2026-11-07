"use client";

import {
  createContext,
  useCallback,
  useContext,
  useId,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import { ModalFrame } from "@/english/components/contact/ModalFrame";
import modal from "@/english/components/contact/ContactModal.module.css";
import { ConsentField, FormFields } from "@/english/components/careers/FormFields";
import { FORMS, validate, visibleFields, type Errors, type Values } from "@/english/components/careers/forms";
import fields from "@/english/components/careers/ApplicationForm.module.css";
import styles from "@/english/components/careers/CareerApplication.module.css";

const cx = (...names: (string | false | undefined)[]) =>
  names.filter(Boolean).join(" ");

const spec = FORMS.career;

/** Opens the application, optionally preset to one of the form's paths. */
const StartContext = createContext<(type?: string) => void>(() => {});

/** The careers page's application (Figma 4334:4697) in a dialog. Every
    "apply" on the page opens it, preset to the path it belongs to; what was
    typed survives closing it, until the request is sent. */
export function CareerApplicationProvider({ children }: { children: ReactNode }) {
  const uid = useId();
  const titleId = `${uid}-title`;
  const formRef = useRef<HTMLFormElement>(null);

  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [values, setValues] = useState<Values>({});
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const start = useCallback(
    (type?: string) => {
      if (sent) {
        setSent(false);
        setValues(type ? { type } : {});
        setConsent(false);
      } else if (type) {
        setValues((current) => ({ ...current, type }));
      }
      setErrors({});
      setSubmitError(null);
      setOpen(true);
    },
    [sent],
  );

  const update = (name: string, value: string | string[]) => {
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => (current[name] ? { ...current, [name]: "" } : current));
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submitting) return;
    const found = validate(spec, values, consent);
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
      const response = await fetch("/api/careers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ form: spec.id, values: payload, consent }),
      });
      if (!response.ok) throw new Error(String(response.status));
      setSent(true);
    } catch {
      setSubmitError(
        "We couldn't send your application right now. Please try again, or email us at Info@thetransformix.com",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <StartContext.Provider value={start}>
      {children}
      <ModalFrame
        open={open}
        onClose={() => setOpen(false)}
        labelledBy={titleId}
        focusKey={sent}
        className={sent ? modal.dialogDone : styles.dialog}
      >
        {sent ? (
          <div className={modal.done}>
            <div className={modal.doneCopy}>
              <h2 id={titleId} className={modal.doneTitle}>
                {spec.doneTitle}
              </h2>
              <p className={modal.doneText}>{spec.doneText}</p>
            </div>
            <button type="button" className={modal.doneButton} onClick={() => setOpen(false)}>
              {" Close "}</button>
          </div>
        ) : (
          <form
            ref={formRef}
            className={cx(styles.body, fields.large)}
            onSubmit={onSubmit}
            aria-labelledby={titleId}
            noValidate
          >
            <p className={styles.eyebrow} lang="en" dir="ltr">
              Career Application
            </p>
            <h2 id={titleId} className={styles.title}>
              {" Application form "}</h2>
            <p className={styles.lead}>
              {" Share your interest through one unified form. The additional fields change with the path you choose. "}</p>

            <div className={styles.card}>
              <h3 className={styles.cardTitle}>{"Basic details"}</h3>
              <p className={styles.required}>{"Fields marked with an asterisk (*) are required."}</p>
              <FormFields spec={spec} values={values} errors={errors} uid={uid} onChange={update} />
            </div>

            <div className={styles.consent}>
              <ConsentField
                uid={uid}
                text={spec.consent}
                checked={consent}
                error={errors.consent}
                onChange={(checked) => {
                  setConsent(checked);
                  setErrors((found) => (found.consent ? { ...found, consent: "" } : found));
                }}
              />
              <p className={styles.disclaimer}>
                {" Submitted details are subject to our privacy policy and your consent to be contacted; submitting an application does not guarantee acceptance or employment. "}</p>
            </div>

            {submitError && (
              <p role="alert" className={styles.submitError}>
                {submitError}
              </p>
            )}

            <div className={styles.actions}>
              <button type="submit" className={styles.submit} disabled={submitting}>
                {submitting ? "Sending…" : spec.submit}
              </button>
            </div>
          </form>
        )}
      </ModalFrame>
    </StartContext.Provider>
  );
}

/** A button that opens the application, preset to `type` when given. */
export function ApplyButton({
  type,
  className,
  children,
}: {
  type?: string;
  className?: string;
  children: ReactNode;
}) {
  const start = useContext(StartContext);
  return (
    <button type="button" className={className} aria-haspopup="dialog" onClick={() => start(type)}>
      {children}
    </button>
  );
}
