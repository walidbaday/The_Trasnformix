"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import navStyles from "@/components/sections/Navbar.module.css";
import { inter } from "@/lib/fonts";
import { SERVICES, type Service } from "@/lib/services";
import { EXIT_MS, ModalFrame } from "./ModalFrame";
import { PartnershipModal } from "./PartnershipModal";
import styles from "./ContactModal.module.css";

/* ==========================================================================
   Context — any control on any page can open the form.
   ========================================================================== */

type ContactModalContext = {
  /** The project form: the navbar's call and most pills without a link. */
  open: () => void;
  /** The six ways to work with Transformix, each leading to its form. */
  openPartnerships: () => void;
};

const Context = createContext<ContactModalContext | null>(null);

export function useContactModal() {
  const context = useContext(Context);
  if (!context) {
    throw new Error("useContactModal must be used inside <ContactModalProvider>.");
  }
  return context;
}

export function ContactModalProvider({ children }: { children: ReactNode }) {
  const [shown, setShown] = useState<"contact" | "partnerships" | null>(null);
  const open = useCallback(() => setShown("contact"), []);
  const openPartnerships = useCallback(() => setShown("partnerships"), []);
  const close = useCallback(() => setShown(null), []);
  const value = useMemo(() => ({ open, openPartnerships }), [open, openPartnerships]);

  return (
    <Context.Provider value={value}>
      {children}
      <ContactModal open={shown === "contact"} onClose={close} />
      <PartnershipModal open={shown === "partnerships"} onClose={close} />
    </Context.Provider>
  );
}

/* ==========================================================================
   Form model
   ========================================================================== */

type Step = 1 | 2 | 3 | "done";

type FormState = {
  name: string;
  phone: string;
  company: string;
  website: string;
  services: Service[];
  message: string;
};

type Errors = Partial<Record<keyof FormState, string>>;

const EMPTY: FormState = {
  name: "",
  phone: "",
  company: "",
  website: "",
  services: [],
  message: "",
};

const STEP_COPY = {
  1: {
    title: "لنبدأ",
    subtitle: "شاركنا بياناتك الأساسية حتى نتمكن من التواصل معك.",
  },
  2: {
    title: "أخبرنا أكثر عن شركتك",
    subtitle: "بعض التفاصيل البسيطة تساعدنا على فهم طبيعة عملك واحتياجك .",
  },
  3: {
    title: "كيف يمكننا مساعدتك؟",
    subtitle: "اختر الخدمة الأقرب إلى احتياجك، ويمكنك اختيار أكثر من خدمة.",
  },
} as const;

const validate = (step: 1 | 2 | 3, form: FormState): Errors => {
  const errors: Errors = {};
  if (step === 1) {
    if (form.name.trim().length < 2) errors.name = "من فضلك أدخل اسمك بالكامل.";
    const digits = form.phone.replace(/\D/g, "");
    if (!/^[+\d\s()-]+$/.test(form.phone.trim()) || digits.length < 7) {
      errors.phone = "من فضلك أدخل رقم هاتف صحيح.";
    }
  }
  if (step === 2) {
    if (!form.company.trim()) errors.company = "من فضلك أدخل اسم الشركة.";
    const site = form.website.trim();
    if (site && !/^(https?:\/\/)?[^\s.]+\.[^\s]{2,}$/i.test(site)) {
      errors.website = "من فضلك أدخل رابطًا صحيحًا أو اترك الحقل فارغًا.";
    }
  }
  if (step === 3 && form.services.length === 0) {
    errors.services = "اختر خدمة واحدة على الأقل.";
  }
  return errors;
};

const cx = (...names: (string | false | undefined)[]) =>
  names.filter(Boolean).join(" ");

function ContactModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const router = useRouter();
  const pathname = usePathname();
  const titleId = useId();
  const formRef = useRef<HTMLFormElement>(null);

  const [step, setStep] = useState<Step>(1);
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  /* After a sent request, the next opening starts afresh. */
  useEffect(() => {
    if (open || step !== "done") return;
    const timer = setTimeout(() => {
      setStep(1);
      setForm(EMPTY);
    }, EXIT_MS);
    return () => clearTimeout(timer);
  }, [open, step]);

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => (current[key] ? { ...current, [key]: undefined } : current));
  };

  const submit = async () => {
    setSubmitting(true);
    setSubmitError(null);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!response.ok) throw new Error(String(response.status));
      setStep("done");
    } catch {
      setSubmitError(
        "تعذّر إرسال الطلب الآن. حاول مرة أخرى، أو راسلنا على Info@thetransformix.com",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (step === "done" || submitting) return;
    const found = validate(step, form);
    setErrors(found);
    if (Object.values(found).some(Boolean)) {
      const firstInvalid = Object.keys(found)[0];
      formRef.current
        ?.querySelector<HTMLElement>(`[data-field="${firstInvalid}"]`)
        ?.focus();
      return;
    }
    if (step === 3) void submit();
    else setStep((step + 1) as Step);
  };

  const goHome = () => {
    onClose();
    if (pathname === "/") window.scrollTo({ top: 0, behavior: "smooth" });
    else router.push("/");
  };

  const errorId = (field: keyof FormState) => `${titleId}-${field}-error`;
  const fieldProps = (field: keyof FormState) => ({
    id: `${titleId}-${field}`,
    "data-field": field,
    "aria-invalid": errors[field] ? true : undefined,
    "aria-describedby": errors[field] ? errorId(field) : undefined,
  });
  const fieldError = (field: keyof FormState) =>
    errors[field] ? (
      <p id={errorId(field)} className={styles.error}>
        {errors[field]}
      </p>
    ) : null;

  return (
    <ModalFrame
      open={open}
      onClose={onClose}
      labelledBy={titleId}
      focusKey={step}
      className={cx(step === "done" && styles.dialogDone, inter.variable)}
    >
      {step === "done" ? (
        <div className={styles.done}>
          <div className={styles.doneCopy}>
            <h2 id={titleId} className={styles.doneTitle}>
              شكرًا لتواصلك معنا
            </h2>
            <p className={styles.doneText}>
              وصلنا طلبك، وسيتواصل معك فريق Transformix قريبًا لفهم احتياجك وتحديد
              الخطوة التالية.
            </p>
          </div>
          <button
            type="button"
            className={styles.doneButton}
            onClick={goHome}
          >
            العودة للصفحة الرئيسية
          </button>
        </div>
      ) : (
        <>
          <div className={styles.header}>
            <div className={styles.progress} aria-hidden>
              {[1, 2, 3].map((n) => (
                <span key={n} className={cx(styles.bar, n <= step && styles.barOn)} />
              ))}
            </div>
            <p className={styles.caption}>
              الخطوات من 1الي3
              <span className={styles.visuallyHidden}> — الخطوة {step} من 3</span>
            </p>
          </div>

          <form ref={formRef} className={styles.body} onSubmit={onSubmit} noValidate>
            <div key={step} className={styles.step}>
              <h2 id={titleId} className={styles.title}>
                {STEP_COPY[step].title}
              </h2>
              <p className={styles.subtitle}>{STEP_COPY[step].subtitle}</p>

              <div className={styles.fields}>
                {step === 1 && (
                  <>
                    <div className={styles.field}>
                      <label className={styles.label} htmlFor={`${titleId}-name`}>
                        الاسم بالكامل
                      </label>
                      <input
                        {...fieldProps("name")}
                        className={cx(styles.input, errors.name && styles.inputError)}
                        type="text"
                        autoComplete="name"
                        placeholder="احمد محمد"
                        value={form.name}
                        onChange={(event) => update("name", event.target.value)}
                      />
                      {fieldError("name")}
                    </div>
                    <div className={styles.field}>
                      <label className={styles.label} htmlFor={`${titleId}-phone`}>
                        رقم الهاتف
                      </label>
                      <input
                        {...fieldProps("phone")}
                        className={cx(
                          styles.input,
                          styles.inputPhone,
                          errors.phone && styles.inputError,
                        )}
                        type="tel"
                        dir="ltr"
                        inputMode="tel"
                        autoComplete="tel"
                        placeholder="+1 (555) 000-0000"
                        value={form.phone}
                        onChange={(event) => update("phone", event.target.value)}
                      />
                      {fieldError("phone")}
                    </div>
                  </>
                )}

                {step === 2 && (
                  <>
                    <div className={styles.field}>
                      <label className={styles.label} htmlFor={`${titleId}-company`}>
                        اسم الشركة
                      </label>
                      <input
                        {...fieldProps("company")}
                        className={cx(styles.input, errors.company && styles.inputError)}
                        type="text"
                        autoComplete="organization"
                        placeholder="ترانسفورمكس"
                        value={form.company}
                        onChange={(event) => update("company", event.target.value)}
                      />
                      {fieldError("company")}
                    </div>
                    <div className={styles.field}>
                      <label className={styles.label} htmlFor={`${titleId}-website`}>
                        الموقع الإلكتروني — إن وجد
                      </label>
                      <input
                        {...fieldProps("website")}
                        className={cx(
                          styles.input,
                          styles.inputWebsite,
                          errors.website && styles.inputError,
                        )}
                        type="url"
                        dir="ltr"
                        inputMode="url"
                        autoComplete="url"
                        value={form.website}
                        onChange={(event) => update("website", event.target.value)}
                      />
                      {fieldError("website")}
                    </div>
                  </>
                )}

                {step === 3 && (
                  <>
                    <div className={styles.field}>
                      <span className={styles.label} id={`${titleId}-services-label`}>
                        الخدمات
                      </span>
                      <ServicePicker
                        id={`${titleId}-services`}
                        labelledBy={`${titleId}-services-label`}
                        value={form.services}
                        invalid={Boolean(errors.services)}
                        describedBy={errors.services ? errorId("services") : undefined}
                        onChange={(services) => update("services", services)}
                      />
                      {fieldError("services")}
                    </div>
                    <div className={styles.field}>
                      <label className={styles.label} htmlFor={`${titleId}-message`}>
                        أخبرنا عن مشروعك
                      </label>
                      <textarea
                        {...fieldProps("message")}
                        className={cx(styles.input, styles.textarea)}
                        placeholder="اكتب هنا"
                        value={form.message}
                        onChange={(event) => update("message", event.target.value)}
                      />
                    </div>
                  </>
                )}
              </div>

              {submitError && (
                <p role="alert" className={styles.submitError}>
                  {submitError}
                </p>
              )}

              <div className={cx(styles.actions, styles[`actions${step}`])}>
                <button type="submit" className={styles.primary} disabled={submitting}>
                  <span>
                    {step === 3 ? (submitting ? "جارٍ الإرسال…" : "إرسال الطلب") : "التالي"}
                  </span>
                  <Image
                    className={styles.arrow}
                    src="/icons/modal-arrow.svg"
                    alt=""
                    width={14}
                    height={16}
                    aria-hidden
                  />
                </button>
              </div>
            </div>
          </form>
        </>
      )}
    </ModalFrame>
  );
}

/* ==========================================================================
   Services picker — the field of 2551:8025 opening the "Links container" of
   2551:8086, the navbar's الخدمات card. More than one service can be picked.
   ========================================================================== */

type ServicePickerProps = {
  id: string;
  labelledBy: string;
  value: Service[];
  invalid: boolean;
  describedBy?: string;
  onChange: (value: Service[]) => void;
};

function ServicePicker({
  id,
  labelledBy,
  value,
  invalid,
  describedBy,
  onChange,
}: ServicePickerProps) {
  const listId = `${id}-list`;
  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  const toggle = (service: Service) =>
    onChange(
      value.includes(service)
        ? value.filter((item) => item !== service)
        : SERVICES.filter((item) => item === service || value.includes(item)),
    );

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        if (!open) setOpen(true);
        else setActive((index) => (index + 1) % SERVICES.length);
        break;
      case "ArrowUp":
        event.preventDefault();
        if (!open) setOpen(true);
        else setActive((index) => (index - 1 + SERVICES.length) % SERVICES.length);
        break;
      case "Enter":
      case " ":
        event.preventDefault();
        if (open) toggle(SERVICES[active]);
        else setOpen(true);
        break;
      case "Escape":
        if (open) {
          event.preventDefault();
          event.stopPropagation();
          setOpen(false);
        }
        break;
      case "Tab":
        setOpen(false);
        break;
    }
  };

  return (
    <div className={styles.picker} ref={rootRef}>
      <button
        type="button"
        id={id}
        data-picker
        data-field="services"
        className={cx(styles.input, styles.pickerButton, invalid && styles.inputError)}
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-labelledby={`${labelledBy} ${id}`}
        aria-activedescendant={open ? `${listId}-${active}` : undefined}
        aria-invalid={invalid || undefined}
        aria-describedby={describedBy}
        onClick={() => setOpen((current) => !current)}
        onKeyDown={onKeyDown}
      >
        <span className={cx(styles.pickerValue, value.length === 0 && styles.placeholder)}>
          {value.length ? value.join("، ") : "اختر الخدمة"}
        </span>
        <Image
          className={cx(styles.chevron, open && styles.chevronOpen)}
          src="/icons/modal-chevron.svg"
          alt=""
          width={24}
          height={24}
          aria-hidden
        />
      </button>

      {open && (
        <ul
          id={listId}
          role="listbox"
          aria-multiselectable="true"
          aria-labelledby={labelledBy}
          className={cx(navStyles.menu, styles.pickerMenu)}
        >
          {SERVICES.map((service, index) => {
            const selected = value.includes(service);
            return (
              <li
                key={service}
                id={`${listId}-${index}`}
                role="option"
                aria-selected={selected}
                className={cx(
                  navStyles.menuLink,
                  styles.option,
                  selected && styles.optionSelected,
                  index === active && styles.optionActive,
                )}
                onMouseEnter={() => setActive(index)}
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => toggle(service)}
              >
                {service}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
