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
import { ModalFrame } from "@/components/contact/ModalFrame";
import modal from "@/components/contact/ContactModal.module.css";
import { ConsentField, FormFields } from "./FormFields";
import { FORMS, validate, visibleFields, type Errors, type Values } from "./forms";
import fields from "./ApplicationForm.module.css";
import styles from "./CareerApplication.module.css";

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
        "تعذّر إرسال طلبك الآن. حاول مرة أخرى، أو راسلنا على Info@thetransformix.com",
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
              إغلاق
            </button>
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
              نموذج التقديم
            </h2>
            <p className={styles.lead}>
              قدّم اهتمامك من خلال نموذج موحّد. تتغيّر الحقول الإضافية على الموقع بحسب مسار التقديم.
            </p>

            <div className={styles.card}>
              <h3 className={styles.cardTitle}>البيانات الأساسية</h3>
              <p className={styles.required}>الحقول المعلّمة بنجمة (*) مطلوبة.</p>
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
                يخضع تقديم البيانات لسياسة الخصوصية والموافقة على التواصل؛ ولا يعني تقديم الطلب ضمان القبول أو التوظيف.
              </p>
            </div>

            {submitError && (
              <p role="alert" className={styles.submitError}>
                {submitError}
              </p>
            )}

            <div className={styles.actions}>
              <button type="submit" className={styles.submit} disabled={submitting}>
                {submitting ? "جارٍ الإرسال…" : spec.submit}
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
