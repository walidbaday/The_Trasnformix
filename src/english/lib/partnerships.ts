import type { Field, FormSpec, Option, Values } from "@/english/components/careers/forms";

/* The partnerships modal (components/contact/PartnershipModal.tsx), opened
   by the hero's ناقش فرصة تعاون: the six ways of working with Transformix
   from Transformix_Contact_Partnerships_UIUX.pdf, each leading to one of its
   two forms. /api/partnerships validates against the same specs and emails
   the request. */

export type PartnershipFormId = "inquiry" | "proposal" | "contact";

export type PartnershipPathId =
  | "business"
  | "technology"
  | "regional"
  | "outsourcing"
  | "academic"
  | "ventures";

export type PartnershipPath = {
  id: PartnershipPathId;
  title: string;
  en: string;
  text: string;
  /** The card's call, which opens the path's form. */
  cta: string;
  form: PartnershipFormId;
  /** Answers the form starts with on this path. */
  initial?: Values;
};

export const PARTNERSHIP_PATHS: readonly PartnershipPath[] = [
  {
    id: "business",
    title: "Business Inquiries",
    en: "Business Inquiries",
    text: "For companies and organizations that want to build new technology solutions, modernize their existing systems or draw on Transformix's specialized services. Areas include AI and intelligent agents, data, ERP and CRM, e-commerce, mobile apps, enterprise platforms, and digital and administrative transformation.",
    cta: "Discuss your project requirements",
    form: "inquiry",
  },
  {
    id: "technology",
    title: "Technology & Strategic Partnerships",
    en: "Technology & Strategic Partnerships",
    text: "We work with technology companies, solution and platform providers, consultancies and implementation partners to develop joint offerings and services, exchange expertise, integrate solutions and deliver projects across multiple markets.",
    cta: "Propose a partnership",
    form: "proposal",
  },
  {
    id: "regional",
    title: "Channel & Regional Partnerships",
    en: "Channel & Regional Partnerships",
    text: "We welcome companies with a commercial presence or sector expertise in local and regional markets to develop business opportunities, market solutions and products, and deliver services. Paths include sales and channel partners, implementation partners and expansion into new markets.",
    cta: "Apply for a regional partnership",
    form: "proposal",
    initial: { partnershipType: "channel" },
  },
  {
    id: "outsourcing",
    title: "Outsourcing & Managed Services",
    en: "Outsourcing & Managed Services",
    text: "We provide specialized teams and expertise in software development, AI, data and enterprise systems, e-commerce and digital booking support, and accounting and back-office services. Models include staff augmentation, dedicated teams, projects and managed services.",
    cta: "Discuss your team's needs",
    form: "inquiry",
  },
  {
    id: "academic",
    title: "Academic & Institutional Collaboration",
    en: "Academic & Institutional Collaboration",
    text: "We work with universities, educational institutions, innovation centers and professional bodies on technical and applied activities, training, student projects and mentoring. Areas include Transformix Academy, TX Community, lectures, workshops and graduation projects.",
    cta: "Propose an institutional collaboration",
    form: "proposal",
    initial: { partnershipType: "academic" },
  },
  {
    id: "ventures",
    title: "Product & Venture Collaboration",
    en: "Product & Venture Collaboration",
    text: "We explore collaboration with startups, digital product owners and specialized teams to develop products, prototypes and MVPs. Collaboration may involve specialized technical services, joint development or exploring partnerships on selected ventures under a separate agreement.",
    cta: "Share your proposal",
    form: "proposal",
    initial: { partnershipType: "venture" },
  },
];

export const isPartnershipPathId = (value: unknown): value is PartnershipPathId =>
  PARTNERSHIP_PATHS.some(({ id }) => id === value);

export const getPartnershipPath = (id: PartnershipPathId) =>
  PARTNERSHIP_PATHS.find((path) => path.id === id)!;

/* ---- The two forms ------------------------------------------------------ */

const COUNTRIES: readonly Option[] = [
  { value: "sa", label: "Saudi Arabia" },
  { value: "ae", label: "United Arab Emirates" },
  { value: "eg", label: "Egypt" },
  { value: "kw", label: "Kuwait" },
  { value: "qa", label: "Qatar" },
  { value: "bh", label: "Bahrain" },
  { value: "om", label: "Oman" },
  { value: "jo", label: "Jordan" },
  { value: "other", label: "Another country" },
];

/** Who is asking: the same six fields open both forms. */
const CONTACT: readonly Field[] = [
  { name: "fullName", label: "Full name", kind: "text", required: true, autoComplete: "name", placeholder: "Your name as it appears in your contact details" },
  { name: "email", label: "Work email", kind: "email", required: true, autoComplete: "email", placeholder: "name@company.com" },
  { name: "company", label: "Company / organization", kind: "text", autoComplete: "organization", placeholder: "Organization name" },
  { name: "jobTitle", label: "Job title", kind: "text", autoComplete: "organization-title", placeholder: "Your professional title" },
  { name: "country", label: "Country", kind: "select", required: true, placeholder: "Choose a country", options: COUNTRIES },
  { name: "city", label: "City", kind: "text", autoComplete: "address-level2", placeholder: "City" },
];

const COMMON = {
  consent: "I agree to my data being processed to review and respond to this request, in line with the privacy policy.",
  submit: "Review request",
  doneTitle: "Thank you for contacting Transformix",
  doneText: "We have received your request. The Transformix team will review the information you shared to decide on the right next step.",
  again: "Send another application",
};

export type PartnershipForm = FormSpec<PartnershipFormId> & {
  /** The line above the title, in English on both sites. */
  eyebrow: string;
  title: string;
};

const inquiry: PartnershipForm = {
  id: "inquiry",
  eyebrow: "Smart Contact Form · Business Inquiry",
  title: "Project or service request",
  sections: [
    {
      fields: [
        ...CONTACT,
        {
          name: "service",
          label: "Service area",
          kind: "select",
          placeholder: "AI & Data / ERP & CRM / Software Engineering",
          options: [
            { value: "ai-data", label: "AI & Data" },
            { value: "agents", label: "AI Agents" },
            { value: "erp-crm", label: "ERP & CRM systems" },
            { value: "software", label: "Software Engineering" },
            { value: "ecommerce", label: "E-commerce & digital booking" },
            { value: "mobile", label: "Mobile apps" },
            { value: "platforms", label: "Enterprise platforms" },
            { value: "transformation", label: "Digital & administrative transformation" },
            { value: "back-office", label: "Accounting & back-office services" },
            { value: "other", label: "Another area" },
          ],
        },
        {
          name: "stage",
          label: "Project stage",
          kind: "select",
          placeholder: "Requirements study / Existing system / Ready to build",
          options: [
            { value: "requirements", label: "Requirements study" },
            { value: "existing", label: "Existing system" },
            { value: "ready", label: "Ready to build" },
          ],
        },
        {
          name: "budget",
          label: "Estimated budget (optional)",
          kind: "select",
          placeholder: "Not set yet / Approved / Requesting a quote",
          options: [
            { value: "undecided", label: "Not set yet" },
            { value: "approved", label: "Approved" },
            { value: "quote", label: "Requesting a quote" },
          ],
        },
        {
          name: "start",
          label: "Expected start",
          kind: "select",
          placeholder: "Target timeframe",
          options: [
            { value: "month", label: "Within a month" },
            { value: "quarter", label: "In 1–3 months" },
            { value: "half", label: "In 3–6 months" },
            { value: "later", label: "After 6 months" },
            { value: "undecided", label: "Not decided yet" },
          ],
        },
        {
          name: "details",
          label: "Project details and requirements",
          kind: "textarea",
          required: true,
          wide: true,
          placeholder: "Describe the project scope, existing systems and the goals you want to reach...",
        },
      ],
    },
  ],
  ...COMMON,
};

const proposal: PartnershipForm = {
  id: "proposal",
  eyebrow: "Smart Contact Form · Partnership Proposal",
  title: "Commercial or technology partnership request",
  sections: [
    {
      fields: [
        ...CONTACT,
        {
          name: "partnershipType",
          label: "Proposed partnership type",
          kind: "select",
          placeholder: "Implementation partner / Integration / Sales channel / Co-development",
          options: [
            { value: "implementation", label: "Implementation partner" },
            { value: "integration", label: "Solution integration" },
            { value: "channel", label: "Sales channel" },
            { value: "co-development", label: "Co-development" },
            { value: "academic", label: "Academic or institutional collaboration" },
            { value: "venture", label: "Product or venture collaboration" },
            { value: "other", label: "Another type" },
          ],
        },
        { name: "markets", label: "Target markets or sectors", kind: "text", placeholder: "Countries and sectors the partnership would cover" },
        { name: "website", label: "Organization website", kind: "url", autoComplete: "url", placeholder: "https://" },
        { name: "capabilities", label: "Relevant capabilities and expertise", kind: "text", placeholder: "Your organization's or team's expertise" },
        {
          name: "details",
          label: "Partnership proposal details",
          kind: "textarea",
          required: true,
          wide: true,
          placeholder: "The kind of collaboration you expect, what you can contribute and the working model you propose...",
        },
      ],
    },
  ],
  ...COMMON,
};

/* The /contact page's own form (Figma 4431:12256): one short request for
   every path, picked from the request types above its fields. It asks no
   consent, as the artboard draws none. */
const contact: PartnershipForm = {
  id: "contact",
  eyebrow: "Contact Page · Unified Request",
  title: "Contact request",
  sections: [
    {
      fields: [
        { name: "fullName", label: "Full name", kind: "text", required: true, autoComplete: "name", placeholder: "Enter your full name" },
        { name: "company", label: "Organization / company", kind: "text", required: true, autoComplete: "organization", placeholder: "Organization or company name" },
        { name: "email", label: "Email", kind: "email", required: true, autoComplete: "email", placeholder: "name@company.com" },
        { name: "country", label: "Country", kind: "select", required: true, placeholder: "Choose a country", options: COUNTRIES },
        {
          name: "details",
          label: "Request details",
          kind: "textarea",
          required: true,
          wide: true,
          placeholder: "Tell us about your project or collaboration proposal and the results you are looking for…",
        },
        {
          name: "context",
          label: "Additional relevant context (optional)",
          kind: "text",
          wide: true,
          placeholder: "Current systems, target market or reference links",
        },
      ],
    },
  ],
  ...COMMON,
  consent: "",
  submit: "Send your request",
};

export const PARTNERSHIP_FORMS: Record<PartnershipFormId, PartnershipForm> = { inquiry, proposal, contact };

/** The request types the /contact form offers, one per path, in reading order. */
export const CONTACT_REQUEST_TYPES: readonly { id: PartnershipPathId; label: string }[] = [
  { id: "business", label: "Business Inquiries" },
  { id: "technology", label: "Technology & Strategic Partnerships" },
  { id: "regional", label: "Channel & Regional Partnerships" },
  { id: "outsourcing", label: "Outsourcing & Managed Services" },
  { id: "academic", label: "Academic & Institutional Collaboration" },
  { id: "ventures", label: "Products & Startup Ventures" },
];

/** The modal's own copy. */
export const PARTNERSHIP_COPY = {
  steps: ["Request type", "Details", "Review & send"],
  choose: {
    eyebrow: "Ways to Work With Us",
    title: "How can we work together?",
    text: "Choose the path closest to your request and we will take you to the right form.",
  },
  path: "Path",
  required: "Fields marked with an asterisk are required",
  back: "Back",
  review: {
    eyebrow: "Review & Send",
    title: "Review & send",
    text: "Check your request before you send it. You can go back to change anything.",
    edit: "Edit details",
    send: "Send request",
    sending: "Sending…",
  },
  close: "Close",
  error: "We could not send your request. Please try again or email Info@thetransformix.com.",
};
