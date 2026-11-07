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
        { name: "fullName", label: "Full name", kind: "text", required: true, autoComplete: "name", placeholder: "Enter your full name" },
        { name: "phone", label: "Phone number", kind: "tel", required: true, autoComplete: "tel", placeholder: "+966 5X XXX XXXX" },
        { name: "email", label: "Email", kind: "email", required: true, autoComplete: "email", placeholder: "name@example.com" },
        { name: "location", label: "Country and city", kind: "text", required: true, placeholder: "Enter your country and city" },
        {
          name: "type",
          label: "Opportunity type",
          kind: "select",
          required: true,
          placeholder: "Choose an application path",
          options: [
            { value: "job", label: "Job" },
            { value: "internship", label: "Internship" },
            { value: "university", label: "University training" },
            { value: "graduation", label: "Graduation project" },
            { value: "freelance", label: "Freelance" },
            { value: "community", label: "Community" },
            { value: "talent", label: "Talent network" },
          ],
        },
        { name: "field", label: "Field or specialization", kind: "text", required: true, placeholder: "Enter your field or specialty" },
      ],
      note: "Paths: Job / Internship / University training / Graduation project / Freelance / Community / Talent network",
    },
    {
      fields: [
        { name: "profile", label: "LinkedIn / CV / Portfolio", kind: "url", placeholder: "https://" },
        { name: "role", label: "Position or opportunity you're applying for", kind: "text", placeholder: "Enter the role or opportunity" },
        { name: "summary", label: "A short summary of your experience and why you're applying", kind: "textarea", wide: true, placeholder: "Tell us about your experience and what draws you to join or work with us…" },
      ],
    },
    {
      title: "Jobs and freelancers",
      when: { field: "type", values: ["job", "freelance"] },
      fields: [
        {
          name: "experience",
          label: "Years of experience",
          kind: "select",
          options: [
            { value: "0-1", label: "Less than a year" },
            { value: "1-3", label: "1–3 years" },
            { value: "3-5", label: "3–5 years" },
            { value: "5-10", label: "5–10 years" },
            { value: "10+", label: "More than 10 years" },
          ],
        },
        { name: "specialties", label: "Specialties", kind: "text", placeholder: "e.g. Front-end development, data analysis" },
        {
          name: "workMode",
          label: "Work mode",
          kind: "select",
          options: [
            { value: "onsite", label: "On-site" },
            { value: "remote", label: "Remote" },
            { value: "hybrid", label: "Hybrid" },
          ],
        },
        {
          name: "availability",
          label: "Expected availability",
          kind: "select",
          options: [
            { value: "full-time", label: "Full-time" },
            { value: "part-time", label: "Part-time" },
            { value: "per-project", label: "Depends on the project" },
          ],
        },
        { name: "portfolio", label: "Portfolio", kind: "url", wide: true, placeholder: "https://" },
      ],
    },
    {
      title: "Internships & university training",
      when: { field: "type", values: ["internship", "university"] },
      fields: [
        { name: "university", label: "University", kind: "text" },
        { name: "faculty", label: "Faculty", kind: "text" },
        {
          name: "studyYear",
          label: "Academic year",
          kind: "select",
          options: [
            { value: "1", label: "First year" },
            { value: "2", label: "Second year" },
            { value: "3", label: "Third year" },
            { value: "4", label: "Fourth year" },
            { value: "5+", label: "Fifth year or above" },
            { value: "graduate", label: "Recent graduate" },
          ],
        },
        {
          name: "trainingType",
          label: "Training type",
          kind: "select",
          options: [
            { value: "internship", label: "Internship" },
            { value: "summer", label: "Summer training" },
            { value: "mandatory", label: "Mandatory training" },
            { value: "cooperative", label: "Co-op training" },
          ],
        },
        { name: "duration", label: "Requested duration", kind: "text", placeholder: "e.g. 8 weeks" },
        { name: "universityLetter", label: "University letter (if required)", kind: "url", placeholder: "Link to the letter" },
      ],
    },
    {
      title: "Graduation projects",
      when: { field: "type", values: ["graduation"] },
      fields: [
        { name: "projectTitle", label: "Project title", kind: "text" },
        { name: "supervisor", label: "Academic supervisor", kind: "text" },
        { name: "team", label: "Team members", kind: "text", wide: true, placeholder: "Names of the team members" },
        {
          name: "stage",
          label: "Current stage",
          kind: "select",
          options: [
            { value: "idea", label: "Idea and proposal" },
            { value: "design", label: "Analysis and design" },
            { value: "build", label: "Development" },
            { value: "testing", label: "Testing and delivery" },
          ],
        },
        {
          name: "support",
          label: "Support needed",
          kind: "select",
          options: [
            { value: "mentoring", label: "Mentoring" },
            { value: "technical", label: "Technical support" },
            { value: "review", label: "Prototype review" },
          ],
        },
      ],
    },
    {
      title: "Talent network",
      when: { field: "type", values: ["talent"] },
      fields: [
        { name: "interests", label: "Specialties you're interested in", kind: "text" },
        { name: "preferences", label: "Work preferences", kind: "text", placeholder: "e.g. Remote, part-time" },
      ],
    },
  ],
  consent: "I agree to the privacy policy and to being contacted about suitable opportunities.",
  submit: "Submit interest",
  doneTitle: "Thank you for your interest in joining us",
  doneText: "We've received your application. The Transformix team will contact you when a suitable opportunity for your path opens up.",
  again: "Send another application",
};

const partner: FormSpec = {
  id: "partner",
  sections: [
    {
      fields: [
        {
          name: "type",
          label: "Application type",
          kind: "choice",
          required: true,
          wide: true,
          options: [
            { value: "partner", label: "Partner company" },
            { value: "representative", label: "Representative" },
            { value: "ambassador", label: "Ambassador" },
          ],
        },
        { name: "fullName", label: "Full name", kind: "text", required: true, autoComplete: "name", placeholder: "Enter your full name" },
        { name: "email", label: "Email", kind: "email", required: true, autoComplete: "email", placeholder: "name@example.com" },
        { name: "country", label: "Country", kind: "text", required: true, autoComplete: "country-name" },
        { name: "city", label: "City", kind: "text", required: true, autoComplete: "address-level2" },
        { name: "phone", label: "Phone number", kind: "tel", required: true, autoComplete: "tel", placeholder: "+966 5X XXX XXXX" },
        { name: "title", label: "Job title or university", kind: "text", autoComplete: "organization-title" },
        { name: "website", label: "LinkedIn or organization website", kind: "url", wide: true, placeholder: "https://" },
      ],
    },
    {
      when: { field: "type", values: ["partner"] },
      fields: [
        { name: "company", label: "Company name and line of business", kind: "text", wide: true, autoComplete: "organization" },
      ],
    },
    {
      fields: [
        {
          name: "areas",
          label: "Areas of collaboration",
          kind: "choices",
          wide: true,
          options: [
            { value: "events", label: "Event coordination" },
            { value: "universities", label: "Universities" },
            { value: "startups", label: "Startups" },
            { value: "corporate", label: "Corporate partnerships" },
            { value: "talent", label: "Talent acquisition" },
            { value: "content", label: "Community content" },
          ],
        },
        { name: "motivation", label: "Why do you want to collaborate, and what value can you add in your country or city?", kind: "textarea", required: true, wide: true },
        {
          name: "hours",
          label: "Expected time per week",
          kind: "choice",
          required: true,
          wide: true,
          options: [
            { value: "1-2", label: "1–2 hours" },
            { value: "2-4", label: "2–4 hours" },
            { value: "5-8", label: "5–8 hours" },
            { value: "8+", label: "More than 8 hours" },
            { value: "per-project", label: "Depends on the project" },
          ],
        },
        { name: "background", label: "Previous experience, network or proposed activities", kind: "textarea", wide: true },
        { name: "notes", label: "Notes or an additional collaboration proposal", kind: "textarea", wide: true },
      ],
    },
  ],
  consent: "I agree to the privacy policy and to being contacted about my application.",
  submit: "Send application",
  doneTitle: "Thank you for your interest in working with us",
  doneText: "We've received your application. The TX Community team will review it and contact you if it matches our expansion priorities in your country.",
  again: "Send another application",
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
          label: "Type of participation",
          kind: "select",
          required: true,
          wide: true,
          options: [
            { value: "join", label: "Join the community" },
            { value: "talks", label: "Suggest a topic or take part as a speaker" },
            { value: "contribution", label: "Contribute an article or experience" },
            { value: "showcase", label: "Showcase a project" },
            { value: "talent", label: "Register as a talent or team" },
            { value: "events", label: "Invite TX Community to take part in an event" },
            { value: "research", label: "Submit a research or graduation project" },
            { value: "industry", label: "Discuss a professional collaboration" },
            { value: "initiative", label: "Propose a joint initiative" },
            { value: "hosting", label: "Propose an activity for a club or community" },
          ],
        },
        {
          name: "applicant",
          label: "Applying as",
          kind: "choice",
          required: true,
          wide: true,
          options: [
            { value: "individual", label: "An individual" },
            { value: "organization", label: "An organization (university, club, company, institution)" },
          ],
        },
        { name: "fullName", label: "Full name", kind: "text", required: true, autoComplete: "name", placeholder: "Enter your full name" },
        { name: "email", label: "Email", kind: "email", required: true, autoComplete: "email", placeholder: "name@example.com" },
        { name: "phone", label: "Phone number", kind: "tel", autoComplete: "tel", placeholder: "+966 5X XXX XXXX" },
        { name: "location", label: "Country and city", kind: "text", required: true, placeholder: "e.g. Egypt, Cairo" },
      ],
    },
    {
      when: { field: "applicant", values: ["organization"] },
      fields: [
        { name: "organization", label: "Organization name and field", kind: "text", required: true, wide: true, autoComplete: "organization" },
      ],
    },
    {
      fields: [
        { name: "profile", label: "LinkedIn, portfolio or organization website", kind: "url", wide: true, placeholder: "https://" },
        {
          name: "details",
          label: "Details of your proposal or interest",
          kind: "textarea",
          required: true,
          wide: true,
          placeholder: "The topic or idea, the intended audience, and a proposed timing if you have one",
        },
      ],
    },
  ],
  consent: "I agree to the privacy policy and to being contacted about my application.",
  submit: "Send request",
  doneTitle: "Thank you for your interest in TX Community",
  doneText: "We have received your request. The community team will review it and contact you when a suitable opportunity comes up.",
  again: "Send another application",
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
      if (field.required && value.length === 0) errors[field.name] = "Please choose at least one option.";
      continue;
    }
    const text = (value ?? "").trim();
    if (!text) {
      if (field.required) {
        errors[field.name] = field.kind === "choice" || field.kind === "select"
          ? "Please choose one of the options."
          : "This field is required.";
      }
      continue;
    }
    if (field.options && !field.options.some((option) => option.value === text)) {
      errors[field.name] = "Please choose one of the options.";
    } else if (field.kind === "email" && !EMAIL.test(text)) {
      errors[field.name] = "Please enter a valid email address.";
    } else if (field.kind === "tel" && (!/^[+\d\s()-]+$/.test(text) || text.replace(/\D/g, "").length < 7)) {
      errors[field.name] = "Please enter a valid phone number.";
    } else if (field.kind === "url" && !URL_LIKE.test(text)) {
      errors[field.name] = "Please enter a valid link.";
    } else if (field.name === "fullName" && text.length < 2) {
      errors[field.name] = "Please enter your full name.";
    }
  }
  /* A form without a consent line (the /contact page's) doesn't ask for it. */
  if (spec.consent && !consent) errors.consent = "Please accept the privacy policy and agree to be contacted to send your application.";
  return errors;
}
