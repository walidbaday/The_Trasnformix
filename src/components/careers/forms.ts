/* The site's application forms, kept as data: the careers page's modal
   (career) and the TX Community pages (community and partner) render
   them from here and /api/careers validates against the same specs, so a
   field added here is shown, checked and forwarded everywhere. */

export type FormId = "career" | "partner" | "community";

export type Option = { value: string; label: string };

export type Field = {
  name: string;
  label: string;
  /** `choice` is a single-pick chip row, `choices` a multi-pick one. */
  kind: "text" | "email" | "tel" | "url" | "textarea" | "select" | "choice" | "choices";
  required?: boolean;
  options?: readonly Option[];
  placeholder?: string;
  autoComplete?: string;
  /** Spans both columns of the form grid. */
  wide?: boolean;
};

export type Section = {
  title?: string;
  /** Shown only while `field` holds one of `values`. */
  when?: { field: string; values: readonly string[] };
  fields: readonly Field[];
  /** A full-width line under the section's fields. */
  note?: string;
};

/** `Id` lets other forms built from these fields (the partnerships modal's)
    keep their own ids. */
export type FormSpec<Id extends string = FormId> = {
  id: Id;
  sections: readonly Section[];
  consent: string;
  submit: string;
  doneTitle: string;
  doneText: string;
  again: string;
};

export type Values = Record<string, string | string[]>;
export type Errors = Record<string, string>;

/* The careers application modal (Figma 4334:4697): its fields in reading
   order, right column first. */
const career: FormSpec = {
  id: "career",
  sections: [
    {
      fields: [
        { name: "fullName", label: "الاسم الكامل", kind: "text", required: true, autoComplete: "name", placeholder: "اكتب اسمك الكامل" },
        { name: "phone", label: "رقم التواصل", kind: "tel", required: true, autoComplete: "tel", placeholder: "أدخل رقم التواصل" },
        { name: "email", label: "البريد الإلكتروني", kind: "email", required: true, autoComplete: "email", placeholder: "name@example.com" },
        { name: "location", label: "الدولة والمدينة", kind: "text", required: true, placeholder: "أدخل الدولة والمدينة" },
        {
          name: "type",
          label: "نوع الفرصة",
          kind: "select",
          required: true,
          placeholder: "اختر مسار التقديم",
          options: [
            { value: "job", label: "وظيفة" },
            { value: "internship", label: "تدريب عملي" },
            { value: "university", label: "تدريب جامعي" },
            { value: "graduation", label: "مشروع تخرج" },
            { value: "freelance", label: "مستقل" },
            { value: "community", label: "مجتمع" },
            { value: "talent", label: "شبكة مواهب" },
          ],
        },
        { name: "field", label: "المجال أو التخصص", kind: "text", required: true, placeholder: "اكتب مجالك أو تخصصك" },
      ],
      note: "المسارات: وظيفة / تدريب عملي / تدريب جامعي / مشروع تخرج / مستقل / مجتمع / شبكة مواهب",
    },
    {
      fields: [
        { name: "profile", label: "LinkedIn / CV / Portfolio", kind: "url", placeholder: "أضف رابط الملف المهني أو السيرة الذاتية" },
        { name: "role", label: "الوظيفة أو الفرصة المطلوبة", kind: "text", placeholder: "اكتب اسم الوظيفة أو الفرصة" },
        { name: "summary", label: "نبذة مختصرة عن الخبرات والاهتمام بالتقديم", kind: "textarea", wide: true, placeholder: "حدّثنا عن خبراتك وما يدفعك للانضمام أو التعاون معنا…" },
      ],
    },
    {
      title: "الوظائف والمستقلون",
      when: { field: "type", values: ["job", "freelance"] },
      fields: [
        {
          name: "experience",
          label: "سنوات الخبرة",
          kind: "select",
          options: [
            { value: "0-1", label: "أقل من سنة" },
            { value: "1-3", label: "من 1 إلى 3 سنوات" },
            { value: "3-5", label: "من 3 إلى 5 سنوات" },
            { value: "5-10", label: "من 5 إلى 10 سنوات" },
            { value: "10+", label: "أكثر من 10 سنوات" },
          ],
        },
        { name: "specialties", label: "التخصصات", kind: "text", placeholder: "مثال: تطوير الواجهات، تحليل البيانات" },
        {
          name: "workMode",
          label: "نمط العمل",
          kind: "select",
          options: [
            { value: "onsite", label: "من المقر" },
            { value: "remote", label: "عن بُعد" },
            { value: "hybrid", label: "هجين" },
          ],
        },
        {
          name: "availability",
          label: "التفرغ المتوقع",
          kind: "select",
          options: [
            { value: "full-time", label: "دوام كامل" },
            { value: "part-time", label: "دوام جزئي" },
            { value: "per-project", label: "بحسب المشروع" },
          ],
        },
        { name: "portfolio", label: "ملف الأعمال", kind: "url", wide: true, placeholder: "https://" },
      ],
    },
    {
      title: "التدريب العملي والجامعي",
      when: { field: "type", values: ["internship", "university"] },
      fields: [
        { name: "university", label: "الجامعة", kind: "text" },
        { name: "faculty", label: "الكلية", kind: "text" },
        {
          name: "studyYear",
          label: "السنة الدراسية",
          kind: "select",
          options: [
            { value: "1", label: "السنة الأولى" },
            { value: "2", label: "السنة الثانية" },
            { value: "3", label: "السنة الثالثة" },
            { value: "4", label: "السنة الرابعة" },
            { value: "5+", label: "السنة الخامسة أو أكثر" },
            { value: "graduate", label: "خريج حديث" },
          ],
        },
        {
          name: "trainingType",
          label: "نوع التدريب",
          kind: "select",
          options: [
            { value: "internship", label: "تدريب عملي (Internship)" },
            { value: "summer", label: "تدريب صيفي" },
            { value: "mandatory", label: "تدريب إلزامي" },
            { value: "cooperative", label: "تدريب تعاوني" },
          ],
        },
        { name: "duration", label: "المدة المطلوبة", kind: "text", placeholder: "مثال: 8 أسابيع" },
        { name: "universityLetter", label: "خطاب الجامعة (عند الحاجة)", kind: "url", placeholder: "رابط الخطاب" },
      ],
    },
    {
      title: "مشروعات التخرج",
      when: { field: "type", values: ["graduation"] },
      fields: [
        { name: "projectTitle", label: "عنوان المشروع", kind: "text" },
        { name: "supervisor", label: "المشرف الأكاديمي", kind: "text" },
        { name: "team", label: "أعضاء الفريق", kind: "text", wide: true, placeholder: "أسماء أعضاء الفريق" },
        {
          name: "stage",
          label: "المرحلة الحالية",
          kind: "select",
          options: [
            { value: "idea", label: "الفكرة والمقترح" },
            { value: "design", label: "التحليل والتصميم" },
            { value: "build", label: "التطوير" },
            { value: "testing", label: "الاختبار والتسليم" },
          ],
        },
        {
          name: "support",
          label: "نوع الدعم المطلوب",
          kind: "select",
          options: [
            { value: "mentoring", label: "الإرشاد" },
            { value: "technical", label: "الدعم الفني" },
            { value: "review", label: "مراجعة النموذج التقني" },
          ],
        },
      ],
    },
    {
      title: "شبكة المواهب",
      when: { field: "type", values: ["talent"] },
      fields: [
        { name: "interests", label: "التخصصات المهتم بها", kind: "text" },
        { name: "preferences", label: "تفضيلات العمل", kind: "text", placeholder: "مثال: عن بُعد، دوام جزئي" },
      ],
    },
  ],
  consent: "أوافق على سياسة الخصوصية وعلى التواصل معي بشأن الفرص المناسبة.",
  submit: "إرسال الاهتمام",
  doneTitle: "شكرًا لاهتمامك بالانضمام إلينا",
  doneText: "وصلنا طلبك، وسيتواصل معك فريق Transformix عند توفر فرصة مناسبة لمسارك.",
  again: "إرسال طلب آخر",
};

const partner: FormSpec = {
  id: "partner",
  sections: [
    {
      fields: [
        {
          name: "type",
          label: "نوع التقديم",
          kind: "choice",
          required: true,
          wide: true,
          options: [
            { value: "partner", label: "شركة شريكة" },
            { value: "representative", label: "ممثل" },
            { value: "ambassador", label: "سفير" },
          ],
        },
        { name: "fullName", label: "الاسم الكامل", kind: "text", required: true, autoComplete: "name", placeholder: "اكتب اسمك الكامل" },
        { name: "email", label: "البريد الإلكتروني", kind: "email", required: true, autoComplete: "email", placeholder: "name@example.com" },
        { name: "country", label: "الدولة", kind: "text", required: true, autoComplete: "country-name" },
        { name: "city", label: "المدينة", kind: "text", required: true, autoComplete: "address-level2" },
        { name: "phone", label: "رقم التواصل", kind: "tel", required: true, autoComplete: "tel", placeholder: "+966 5X XXX XXXX" },
        { name: "title", label: "المسمى المهني أو الجامعة", kind: "text", autoComplete: "organization-title" },
        { name: "website", label: "LinkedIn أو موقع المؤسسة", kind: "url", wide: true, placeholder: "https://" },
      ],
    },
    {
      when: { field: "type", values: ["partner"] },
      fields: [
        { name: "company", label: "اسم الشركة ومجال عملها", kind: "text", wide: true, autoComplete: "organization" },
      ],
    },
    {
      fields: [
        {
          name: "areas",
          label: "مجالات التعاون",
          kind: "choices",
          wide: true,
          options: [
            { value: "events", label: "تنسيق فعاليات" },
            { value: "universities", label: "جامعات" },
            { value: "startups", label: "شركات ناشئة" },
            { value: "corporate", label: "شراكات مؤسسية" },
            { value: "talent", label: "استقطاب مواهب" },
            { value: "content", label: "محتوى مجتمعي" },
          ],
        },
        { name: "motivation", label: "لماذا ترغب في التعاون؟ وما القيمة التي يمكنك إضافتها في دولتك أو مدينتك؟", kind: "textarea", required: true, wide: true },
        {
          name: "hours",
          label: "الوقت المتوقع أسبوعيًا",
          kind: "choice",
          required: true,
          wide: true,
          options: [
            { value: "1-2", label: "1–2 ساعة" },
            { value: "2-4", label: "2–4 ساعات" },
            { value: "5-8", label: "5–8 ساعات" },
            { value: "8+", label: "أكثر من 8 ساعات" },
            { value: "per-project", label: "بحسب المشروع" },
          ],
        },
        { name: "background", label: "خبرات سابقة وشبكة العلاقات أو الأنشطة المقترحة", kind: "textarea", wide: true },
        { name: "notes", label: "ملاحظات أو مقترح تعاون إضافي", kind: "textarea", wide: true },
      ],
    },
  ],
  consent: "أوافق على سياسة الخصوصية وعلى التواصل معي بخصوص طلبي.",
  submit: "إرسال طلب التعاون",
  doneTitle: "شكرًا لاهتمامك بالتعاون معنا",
  doneText: "وصلنا طلبك، وسيراجعه فريق TX Community ويتواصل معك إذا توافق مع أولويات التوسع في دولتك.",
  again: "إرسال طلب آخر",
};

/* One interest form for every TX Community page; each page presets `type` to
   its own kind of participation. */
const community: FormSpec = {
  id: "community",
  sections: [
    {
      fields: [
        {
          name: "type",
          label: "نوع المشاركة",
          kind: "select",
          required: true,
          wide: true,
          options: [
            { value: "join", label: "الانضمام إلى المجتمع" },
            { value: "talks", label: "اقتراح موضوع أو المشاركة كمتحدث" },
            { value: "contribution", label: "المساهمة بمقال أو تجربة" },
            { value: "showcase", label: "عرض مشروع" },
            { value: "talent", label: "التسجيل كموهبة أو فريق" },
            { value: "events", label: "دعوة TX Community للمشاركة في فعالية" },
            { value: "research", label: "عرض مشروع بحث أو تخرج" },
            { value: "industry", label: "مناقشة فرصة تعاون مهني" },
            { value: "initiative", label: "اقتراح مبادرة مشتركة" },
            { value: "hosting", label: "اقتراح نشاط لنادٍ أو مجتمع" },
          ],
        },
        {
          name: "applicant",
          label: "تتقدم بصفتك",
          kind: "choice",
          required: true,
          wide: true,
          options: [
            { value: "individual", label: "فرد" },
            { value: "organization", label: "جهة (جامعة، نادٍ، شركة، مؤسسة)" },
          ],
        },
        { name: "fullName", label: "الاسم الكامل", kind: "text", required: true, autoComplete: "name", placeholder: "اكتب اسمك الكامل" },
        { name: "email", label: "البريد الإلكتروني", kind: "email", required: true, autoComplete: "email", placeholder: "name@example.com" },
        { name: "phone", label: "رقم التواصل", kind: "tel", autoComplete: "tel", placeholder: "+966 5X XXX XXXX" },
        { name: "location", label: "الدولة والمدينة", kind: "text", required: true, placeholder: "مثال: مصر، القاهرة" },
      ],
    },
    {
      when: { field: "applicant", values: ["organization"] },
      fields: [
        { name: "organization", label: "اسم الجهة ومجال عملها", kind: "text", required: true, wide: true, autoComplete: "organization" },
      ],
    },
    {
      fields: [
        { name: "profile", label: "LinkedIn أو رابط الأعمال أو موقع الجهة", kind: "url", wide: true, placeholder: "https://" },
        {
          name: "details",
          label: "تفاصيل الاقتراح أو الاهتمام",
          kind: "textarea",
          required: true,
          wide: true,
          placeholder: "الموضوع أو الفكرة، والجمهور المستهدف، والتوقيت المقترح إن وُجد",
        },
      ],
    },
  ],
  consent: "أوافق على سياسة الخصوصية وعلى التواصل معي بخصوص طلبي.",
  submit: "إرسال الطلب",
  doneTitle: "شكرًا لاهتمامك بـ TX Community",
  doneText: "وصلنا طلبك، وسيراجعه فريق المجتمع ويتواصل معك عند توفر فرصة مناسبة.",
  again: "إرسال طلب آخر",
};

export const FORMS: Record<FormId, FormSpec> = { career, partner, community };

export const isFormId = (value: unknown): value is FormId =>
  value === "career" || value === "partner" || value === "community";

const LIMITS: Record<Field["kind"], number> = {
  text: 200,
  email: 254,
  tel: 40,
  url: 500,
  textarea: 3000,
  select: 40,
  choice: 40,
  choices: 40,
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const URL_LIKE = /^(https?:\/\/)?[^\s/.]+\.[^\s]{2,}$/i;

/** The fields on screen for the current answers, in order. */
export function visibleFields(spec: FormSpec<string>, values: Values): Field[] {
  return spec.sections
    .filter(({ when }) => !when || when.values.includes(values[when.field] as string))
    .flatMap(({ fields }) => fields);
}

/** Keeps only the visible fields, trimmed, capped and limited to their options. */
export function clean(spec: FormSpec<string>, input: Record<string, unknown>): Values {
  const values: Values = {};
  const read = (field: Field) => {
    const raw = input[field.name];
    if (field.kind === "choices") {
      return Array.isArray(raw)
        ? raw.filter((item): item is string => field.options!.some((option) => option.value === item))
        : [];
    }
    return typeof raw === "string" ? raw.trim().slice(0, LIMITS[field.kind]) : "";
  };
  /* Two passes: the first settles the answers that decide which sections show. */
  for (const field of visibleFields(spec, {})) values[field.name] = read(field);
  for (const field of visibleFields(spec, values)) values[field.name] = read(field);
  return values;
}

export function validate(spec: FormSpec<string>, values: Values, consent: boolean): Errors {
  const errors: Errors = {};
  for (const field of visibleFields(spec, values)) {
    const value = values[field.name];
    if (Array.isArray(value)) {
      if (field.required && value.length === 0) errors[field.name] = "اختر خيارًا واحدًا على الأقل.";
      continue;
    }
    const text = (value ?? "").trim();
    if (!text) {
      if (field.required) {
        errors[field.name] = field.kind === "choice" || field.kind === "select"
          ? "من فضلك اختر أحد الخيارات."
          : "هذا الحقل مطلوب.";
      }
      continue;
    }
    if (field.options && !field.options.some((option) => option.value === text)) {
      errors[field.name] = "من فضلك اختر أحد الخيارات.";
    } else if (field.kind === "email" && !EMAIL.test(text)) {
      errors[field.name] = "من فضلك أدخل بريدًا إلكترونيًا صحيحًا.";
    } else if (field.kind === "tel" && (!/^[+\d\s()-]+$/.test(text) || text.replace(/\D/g, "").length < 7)) {
      errors[field.name] = "من فضلك أدخل رقم تواصل صحيحًا.";
    } else if (field.kind === "url" && !URL_LIKE.test(text)) {
      errors[field.name] = "من فضلك أدخل رابطًا صحيحًا.";
    } else if (field.name === "fullName" && text.length < 2) {
      errors[field.name] = "من فضلك أدخل اسمك الكامل.";
    }
  }
  /* A form without a consent line (the /contact page's) doesn't ask for it. */
  if (spec.consent && !consent) errors.consent = "يلزم الموافقة على سياسة الخصوصية والتواصل لإرسال طلبك.";
  return errors;
}
