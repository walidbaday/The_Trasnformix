import { ChevronDown } from "@/english/components/ui/ChevronDown";
import type { Errors, Field, FormSpec, Values } from "@/english/components/careers/forms";
import styles from "@/english/components/careers/ApplicationForm.module.css";

const cx = (...names: (string | false | undefined)[]) =>
  names.filter(Boolean).join(" ");

const LTR_KINDS: readonly Field["kind"][] = ["email", "tel", "url"];

/* An Arabic hint in a left-to-right field still reads from the right. */
const ARABIC = /[؀-ۿ]/;

type FormFieldsProps = {
  spec: FormSpec<string>;
  values: Values;
  errors: Errors;
  /** Prefixes the fields' ids. */
  uid: string;
  onChange: (name: string, value: string | string[]) => void;
};

/** A form's fields on the two-column grid, with the sections its answers
    reveal. Shared by the page forms above and the partnerships modal. */
export function FormFields({ spec, values, errors, uid, onChange }: FormFieldsProps) {
  const toggle = (name: string, value: string) => {
    const current = (values[name] as string[] | undefined) ?? [];
    onChange(name, current.includes(value) ? current.filter((item) => item !== value) : [...current, value]);
  };

  const id = (name: string) => `${uid}-${name}`;
  const described = (name: string) => describedBy(uid, name, errors[name]);
  const labelText = (field: Field) => (
    <>
      {field.label}
      {field.required && <span className={styles.required} aria-hidden> *</span>}
    </>
  );

  const renderField = (field: Field) => {
    const { name, kind } = field;
    const value = values[name];

    if (kind === "choice" || kind === "choices") {
      const picked = kind === "choices" ? ((value as string[] | undefined) ?? []) : [value as string];
      return (
        <fieldset
          key={name}
          className={cx(styles.field, styles.group, field.wide && styles.wide)}
          {...described(name)}
        >
          <legend className={styles.label}>{labelText(field)}</legend>
          <div className={styles.chips}>
            {field.options!.map((option, index) => (
              <label key={option.value} className={styles.chip}>
                <input
                  type={kind === "choice" ? "radio" : "checkbox"}
                  name={`${uid}-${name}`}
                  value={option.value}
                  required={kind === "choice" && field.required}
                  data-field={index === 0 ? name : undefined}
                  checked={picked.includes(option.value)}
                  onChange={() => (kind === "choice" ? onChange(name, option.value) : toggle(name, option.value))}
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
          <FieldError uid={uid} name={name} error={errors[name]} />
        </fieldset>
      );
    }

    const common = {
      id: id(name),
      "data-field": name,
      required: field.required,
      autoComplete: field.autoComplete,
      value: (value as string | undefined) ?? "",
      ...described(name),
    };

    return (
      <div key={name} className={cx(styles.field, field.wide && styles.wide)}>
        <label className={styles.label} htmlFor={id(name)}>
          {labelText(field)}
        </label>
        {kind === "textarea" ? (
          <textarea
            {...common}
            placeholder={field.placeholder}
            className={cx(styles.input, styles.textarea, errors[name] && styles.inputError)}
            onChange={(event) => onChange(name, event.target.value)}
          />
        ) : kind === "select" ? (
          <div className={styles.selectWrap}>
            <select
              {...common}
              className={cx(styles.input, styles.select, !value && styles.placeholder, errors[name] && styles.inputError)}
              onChange={(event) => onChange(name, event.target.value)}
            >
              {/* A select's placeholder is its empty first choice. */}
              <option value="">{field.placeholder ?? "Select"}</option>
              {field.options!.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDown className={styles.selectChevron} />
          </div>
        ) : (
          <input
            {...common}
            placeholder={field.placeholder}
            className={cx(
              styles.input,
              LTR_KINDS.includes(kind) && styles.ltr,
              LTR_KINDS.includes(kind) && ARABIC.test(field.placeholder ?? "") && styles.rtlPlaceholder,
              errors[name] && styles.inputError,
            )}
            type={kind}
            dir={LTR_KINDS.includes(kind) ? "ltr" : undefined}
            inputMode={kind === "tel" ? "tel" : kind === "url" ? "url" : undefined}
            onChange={(event) => onChange(name, event.target.value)}
          />
        )}
        <FieldError uid={uid} name={name} error={errors[name]} />
      </div>
    );
  };

  return spec.sections.map((section, index) =>
    !section.when || section.when.values.includes(values[section.when.field] as string) ? (
      <div key={index} className={cx(styles.grid, section.title && styles.extra)}>
        {section.title && <h3 className={styles.extraTitle}>{section.title}</h3>}
        {section.fields.map(renderField)}
        {section.note && <p className={styles.note}>{section.note}</p>}
      </div>
    ) : null,
  );
}

/** The privacy consent row every form ends with. */
export function ConsentField({ uid, text, checked, error, onChange }: {
  uid: string;
  text: string;
  checked: boolean;
  error?: string;
  onChange: (checked: boolean) => void;
}) {
  return (
    <div className={styles.field}>
      <label className={styles.consent}>
        <input
          className={cx(styles.checkbox, error && styles.inputError)}
          type="checkbox"
          data-field="consent"
          checked={checked}
          onChange={(event) => onChange(event.target.checked)}
          {...describedBy(uid, "consent", error)}
        />
        <span>{text}</span>
      </label>
      <FieldError uid={uid} name="consent" error={error} />
    </div>
  );
}

const errorId = (uid: string, name: string) => `${uid}-${name}-error`;

const describedBy = (uid: string, name: string, error?: string) => ({
  "aria-invalid": error ? true : undefined,
  "aria-describedby": error ? errorId(uid, name) : undefined,
});

function FieldError({ uid, name, error }: { uid: string; name: string; error?: string }) {
  return error ? (
    <p id={errorId(uid, name)} className={styles.error}>
      {error}
    </p>
  ) : null;
}
