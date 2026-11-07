"use client";

import { useId, useRef, useState, type FormEvent } from "react";
import { PillButton } from "@/english/components/ui/PillButton";
import { ConsentField, FormFields } from "@/english/components/careers/FormFields";
import {
  FORMS,
  validate,
  visibleFields,
  type Errors,
  type FormId,
  type Values,
} from "@/english/components/careers/forms";
import styles from "@/english/components/careers/ApplicationForm.module.css";

const cx = (...names: (string | false | undefined)[]) =>
  names.filter(Boolean).join(" ");

type ApplicationFormProps = {
  form: FormId;
  /** The id of the heading that names this form. */
  labelledBy: string;
  /** Answers the form starts with, and returns to after a send. */
  initial?: Values;
};

/** One of the site's application forms. Picking a path reveals the fields
    that belong to it; only the fields on screen are checked and sent to
    /api/careers. */
export function ApplicationForm({ form: formId, labelledBy, initial }: ApplicationFormProps) {
  const spec = FORMS[formId];
  const uid = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const [values, setValues] = useState<Values>(initial ?? {});
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const clearError = (name: string) =>
    setErrors((current) => (current[name] ? { ...current, [name]: "" } : current));

  const update = (name: string, value: string | string[]) => {
    setValues((current) => ({ ...current, [name]: value }));
    clearError(name);
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
    for (const field of visibleFields(spec, values)) {
      payload[field.name] = values[field.name] ?? (field.kind === "choices" ? [] : "");
    }

    setSubmitting(true);
    setSubmitError(null);
    try {
      const response = await fetch("/api/careers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ form: formId, values: payload, consent }),
      });
      if (!response.ok) throw new Error(String(response.status));
      setSent(true);
      setValues(initial ?? {});
      setConsent(false);
    } catch {
      setSubmitError(
        "We couldn't send your application right now. Please try again, or email us at Info@thetransformix.com",
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (sent) {
    return (
      <div className={cx(styles.card, styles.done)} role="status">
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
      className={styles.card}
      onSubmit={onSubmit}
      aria-labelledby={labelledBy}
      noValidate
    >
      <FormFields spec={spec} values={values} errors={errors} uid={uid} onChange={update} />

      <ConsentField
        uid={uid}
        text={spec.consent}
        checked={consent}
        error={errors.consent}
        onChange={(checked) => {
          setConsent(checked);
          clearError("consent");
        }}
      />

      {submitError && (
        <p role="alert" className={styles.submitError}>
          {submitError}
        </p>
      )}

      <div className={styles.actions}>
        <PillButton type="submit" className={styles.submit} disabled={submitting}>
          {submitting ? "Sending…" : spec.submit}
        </PillButton>
      </div>
    </form>
  );
}
