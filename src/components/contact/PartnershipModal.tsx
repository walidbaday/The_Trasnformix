"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { ConsentField, FormFields } from "@/components/careers/FormFields";
import { validate, visibleFields, type Errors, type Field, type Values } from "@/components/careers/forms";
import { inter } from "@/lib/fonts";
import {
  PARTNERSHIP_COPY as COPY,
  PARTNERSHIP_FORMS,
  PARTNERSHIP_PATHS,
  type PartnershipPath,
} from "@/lib/partnerships";
import { EXIT_MS, ModalFrame } from "./ModalFrame";
import modal from "./ContactModal.module.css";
import styles from "./PartnershipModal.module.css";

type Step = "choose" | "form" | "review" | "done";

const STEP_ORDER: readonly Step[] = ["choose", "form", "review"];

const pad = (index: number) => String(index + 1).padStart(2, "0");

const cx = (...names: (string | false | undefined)[]) =>
  names.filter(Boolean).join(" ");

/** The answers a path may preset. Picking another path resets them to its own. */
const PRESET_KEYS = [
  ...new Set(PARTNERSHIP_PATHS.flatMap(({ initial }) => Object.keys(initial ?? {}))),
];

function Arrow() {
  return (
    <Image
      className={cx(modal.arrow, styles.arrow)}
      src="/icons/modal-arrow.svg"
      alt=""
      width={14}
      height={16}
      aria-hidden
    />
  );
}

/** The hero's ناقش فرصة تعاون: the six ways to work with Transformix, then
    the form that path leads to, a review of the answers, and the send, which
    /api/partnerships emails to the team. Changing path keeps what was typed,
    so nothing is entered twice. */
export function PartnershipModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const uid = useId();
  const titleId = `${uid}-title`;
  const formRef = useRef<HTMLFormElement>(null);

  const [step, setStep] = useState<Step>("choose");
  const [path, setPath] = useState<PartnershipPath | null>(null);
  const [values, setValues] = useState<Values>({});
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  /* A field people never see; only bots fill it in. */
  const [trap, setTrap] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  /* After a sent request, the next opening starts afresh. */
  useEffect(() => {
    if (open || step !== "done") return;
    const timer = setTimeout(() => {
      setStep("choose");
      setPath(null);
      setValues({});
      setConsent(false);
      setTrap("");
    }, EXIT_MS);
    return () => clearTimeout(timer);
  }, [open, step]);

  const spec = path ? PARTNERSHIP_FORMS[path.form] : null;

  const choose = (next: PartnershipPath) => {
    setPath(next);
    setValues((current) => ({
      ...current,
      ...Object.fromEntries(PRESET_KEYS.map((key) => [key, next.initial?.[key] ?? ""])),
    }));
    setErrors({});
    setSubmitError(null);
    setStep("form");
  };

  const update = (name: string, value: string | string[]) => {
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => (current[name] ? { ...current, [name]: "" } : current));
  };

  const toReview = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!spec) return;
    const found = validate(spec, values, consent);
    setErrors(found);
    const firstInvalid = Object.keys(found)[0];
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`[data-field="${firstInvalid}"]`)?.focus();
      return;
    }
    setSubmitError(null);
    setStep("review");
  };

  const send = async () => {
    if (!path || !spec || submitting) return;
    const payload: Values = {};
    for (const field of visibleFields(spec, values)) payload[field.name] = values[field.name] ?? "";

    setSubmitting(true);
    setSubmitError(null);
    try {
      const response = await fetch("/api/partnerships", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          path: path.id,
          values: payload,
          consent,
          fax: trap,
          lang: document.documentElement.lang,
        }),
      });
      if (!response.ok) throw new Error(String(response.status));
      setStep("done");
    } catch {
      setSubmitError(COPY.error);
    } finally {
      setSubmitting(false);
    }
  };

  /** An answer as it reads on screen: a choice's label rather than its key. */
  const shown = (field: Field) => {
    const value = String(values[field.name] ?? "").trim();
    return field.options?.find((option) => option.value === value)?.label ?? value;
  };

  const current = STEP_ORDER.indexOf(step);

  const head = (eyebrow: string, title: string, text?: string) => (
    <div className={styles.head}>
      <p className={styles.eyebrow} lang="en">
        {eyebrow}
      </p>
      <h2 id={titleId} className={styles.title}>
        {title}
      </h2>
      {text && <p className={styles.text}>{text}</p>}
    </div>
  );

  return (
    <ModalFrame
      open={open}
      onClose={onClose}
      labelledBy={titleId}
      focusKey={step}
      className={cx(
        styles.frame,
        step === "done" ? modal.dialogDone : styles[step],
        inter.variable,
      )}
    >
      {step === "done" && spec ? (
        <div className={modal.done}>
          <div className={modal.doneCopy}>
            <h2 id={titleId} className={modal.doneTitle}>
              {spec.doneTitle}
            </h2>
            <p className={modal.doneText}>{spec.doneText}</p>
          </div>
          <button type="button" className={modal.doneButton} onClick={onClose}>
            {COPY.close}
          </button>
        </div>
      ) : (
        <>
          <ol className={styles.steps} aria-label="خطوات الطلب">
            {COPY.steps.map((label, index) => (
              <li
                key={label}
                className={cx(
                  styles.stepItem,
                  index < current && styles.stepPast,
                  index === current && styles.stepNow,
                )}
                aria-current={index === current ? "step" : undefined}
              >
                <span className={styles.stepNumber}>{index + 1}</span>
                {label}
              </li>
            ))}
          </ol>

          {step === "choose" && (
            <div key="choose" className={cx(modal.step, styles.body)}>
              {head(COPY.choose.eyebrow, COPY.choose.title, COPY.choose.text)}
              <ul className={styles.paths}>
                {PARTNERSHIP_PATHS.map((item, index) => (
                  <li
                    key={item.id}
                    className={cx(styles.path, path?.id === item.id && styles.pathPicked)}
                  >
                    <span className={styles.number} aria-hidden>
                      {pad(index)}
                    </span>
                    <h3 id={`${uid}-${item.id}`} className={styles.pathTitle}>
                      {item.title}
                    </h3>
                    {/* The whole card is the button's target (see ::after). */}
                    <button
                      type="button"
                      className={styles.pathCta}
                      aria-describedby={`${uid}-${item.id}`}
                      onClick={() => choose(item)}
                    >
                      {item.cta}
                      <Arrow />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {step === "form" && path && spec && (
            <form
              key={`form-${path.id}`}
              ref={formRef}
              className={cx(modal.step, styles.body)}
              onSubmit={toReview}
              noValidate
            >
              {head(spec.eyebrow, spec.title)}
              <p className={styles.chosen}>
                <span className={styles.chosenLabel}>{COPY.path}</span>
                <span className={styles.chosenName}>{path.title}</span>
                {path.en !== path.title && (
                  <span className={styles.pathEn} lang="en">
                    {path.en}
                  </span>
                )}
              </p>
              <p className={styles.requiredNote}>{COPY.required}</p>

              <div className={styles.fields}>
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

              <div className={styles.footer}>
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
                <div className={styles.actions}>
                  <button type="button" className={styles.secondary} onClick={() => setStep("choose")}>
                    {COPY.back}
                  </button>
                  <button type="submit" className={modal.primary}>
                    <span>{spec.submit}</span>
                    <Arrow />
                  </button>
                </div>
              </div>
            </form>
          )}

          {step === "review" && path && spec && (
            <div key="review" className={cx(modal.step, styles.body)}>
              {head(COPY.review.eyebrow, COPY.review.title, COPY.review.text)}
              <dl className={styles.summary}>
                <div className={cx(styles.row, styles.rowWide)}>
                  <dt>{COPY.path}</dt>
                  <dd>
                    {path.title}
                    {path.en !== path.title && (
                      <>
                        {" · "}
                        <bdi lang="en">{path.en}</bdi>
                      </>
                    )}
                  </dd>
                </div>
                {visibleFields(spec, values)
                  .filter((field) => shown(field))
                  .map((field) => (
                    <div key={field.name} className={cx(styles.row, field.wide && styles.rowWide)}>
                      <dt>{field.label}</dt>
                      <dd>
                        <bdi>{shown(field)}</bdi>
                      </dd>
                    </div>
                  ))}
              </dl>

              {submitError && (
                <p role="alert" className={styles.submitError}>
                  {submitError}
                </p>
              )}

              <div className={styles.actions}>
                <button type="button" className={styles.secondary} onClick={() => setStep("form")}>
                  {COPY.review.edit}
                </button>
                <button
                  type="button"
                  className={modal.primary}
                  disabled={submitting}
                  onClick={send}
                >
                  <span>{submitting ? COPY.review.sending : COPY.review.send}</span>
                  <Arrow />
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </ModalFrame>
  );
}
