import { siteConfig } from "@/lib/site";

export const FORM_NAMES = [
  "interest",
  "waitlist",
  "investor",
  "seller",
  "contact",
  "tour",
] as const;

export type FormName = (typeof FORM_NAMES)[number];

export const MOVE_TIMELINES = [
  "As soon as I can",
  "Within 30 days",
  "In 1 to 3 months",
  "Just looking for now",
] as const;

export const SELLER_CONDITIONS = [
  "Looks good",
  "Needs some work",
  "Needs a lot of work",
  "I'm not sure",
] as const;

export const SELLER_TIMELINES = [
  "As soon as I can",
  "Within a month",
  "A few months",
  "No rush — just curious",
] as const;

export const INVESTOR_ROLES = ["Investor", "I'll do the work myself", "Both"] as const;

export const CONTACT_TOPICS = [
  "Buying a home",
  "Selling a house",
  "Fixer-uppers",
  "Something else",
] as const;

export const TOUR_DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
] as const;

export const TOUR_TIMES = ["Morning", "Afternoon", "Evening"] as const;

export const TOUR_HOME_UNSURE = "Not a specific house yet";

type FieldKind = "text" | "email" | "phone" | "select" | "multi" | "longtext";

type FieldRule = {
  label: string;
  required?: boolean;
  kind: FieldKind;
  options?: readonly string[];
  min?: number;
  max?: number;
  requiredMessage: string;
};

type Schema = {
  title: string;
  subject: string;
  order: string[];
  fields: Record<string, FieldRule>;
};

const phoneMessage = "Enter a phone number with an area code, so we can call you back.";

const schemas: Record<FormName, Schema> = {
  interest: {
    title: "I'm interested / apply",
    subject: "I'm interested in a home — Rooted Path Homes",
    order: [
      "homeAddress",
      "name",
      "phone",
      "email",
      "downPayment",
      "monthlyBudget",
      "moveTimeline",
      "notes",
    ],
    fields: {
      home: {
        label: "Home",
        required: true,
        kind: "text",
        min: 2,
        max: 120,
        requiredMessage: "Choose a home.",
      },
      homeAddress: {
        label: "Home address",
        required: true,
        kind: "text",
        min: 5,
        max: 180,
        requiredMessage: "Add the home address.",
      },
      name: personName(),
      phone: phoneField(),
      email: emailField(),
      downPayment: {
        label: "Down payment available",
        required: true,
        kind: "text",
        min: 1,
        max: 80,
        requiredMessage: "Tell us what you could put down, even if the answer is that you are not sure.",
      },
      monthlyBudget: {
        label: "Monthly budget",
        required: true,
        kind: "text",
        min: 1,
        max: 80,
        requiredMessage: "Tell us what monthly payment feels comfortable.",
      },
      moveTimeline: {
        label: "Move timeline",
        required: true,
        kind: "select",
        options: MOVE_TIMELINES,
        requiredMessage: "Choose a timeline.",
      },
      notes: optionalNote("Anything else we should know?", 2000),
    },
  },
  waitlist: {
    title: "Get on the list",
    subject: "Get on the list — Rooted Path Homes",
    order: ["name", "phone", "email", "note"],
    fields: {
      name: personName(),
      phone: phoneField(),
      email: emailField(),
      note: optionalNote("What are you hoping for?", 2000),
    },
  },
  investor: {
    title: "Fixer-upper list",
    subject: "Fixer-upper list — Rooted Path Homes",
    order: ["name", "phone", "email", "role", "note"],
    fields: {
      name: personName(),
      phone: phoneField(),
      email: emailField(),
      role: {
        label: "I am",
        required: true,
        kind: "select",
        options: INVESTOR_ROLES,
        requiredMessage: "Tell us whether you are an investor, handy, or both.",
      },
      note: optionalNote("What kind of house are you hoping to hear about?", 2000),
    },
  },
  seller: {
    title: "Sell Us Your House",
    subject: "Seller lead — Rooted Path Homes",
    order: [
      "propertyAddress",
      "name",
      "phone",
      "email",
      "condition",
      "timeline",
      "askingPrice",
      "notes",
    ],
    fields: {
      propertyAddress: {
        label: "Property address",
        required: true,
        kind: "text",
        min: 5,
        max: 180,
        requiredMessage: "Add the property address.",
      },
      name: personName(),
      phone: phoneField(),
      email: emailField(),
      condition: {
        label: "Condition",
        required: true,
        kind: "select",
        options: SELLER_CONDITIONS,
        requiredMessage: "Tell us the condition, even if you are not sure.",
      },
      timeline: {
        label: "Timeline",
        required: true,
        kind: "select",
        options: SELLER_TIMELINES,
        requiredMessage: "Tell us your timeline.",
      },
      askingPrice: {
        label: "Asking price",
        kind: "text",
        max: 40,
        requiredMessage: "",
      },
      notes: optionalNote("Anything else we should know?", 2000),
    },
  },
  contact: {
    title: "Let's Talk",
    subject: "Let's Talk — Rooted Path Homes",
    order: ["name", "phone", "email", "topic", "message"],
    fields: {
      name: personName(),
      phone: phoneField(),
      email: emailField(),
      topic: {
        label: "What is this about?",
        required: true,
        kind: "select",
        options: CONTACT_TOPICS,
        requiredMessage: "Choose a topic so we know who should answer.",
      },
      message: {
        label: "Message",
        required: true,
        kind: "longtext",
        min: 8,
        max: 2000,
        requiredMessage: "Write a short note so we know how to help.",
      },
    },
  },
  tour: {
    title: "Book a Tour",
    subject: "Tour request — Rooted Path Homes",
    order: ["home", "days", "times", "name", "phone", "email", "notes"],
    fields: {
      home: {
        label: "Home",
        required: true,
        kind: "text",
        min: 3,
        max: 180,
        requiredMessage: "Choose a home, or choose “not a specific house yet.”",
      },
      days: {
        label: "Preferred days",
        required: true,
        kind: "multi",
        options: TOUR_DAYS,
        requiredMessage: "Pick at least one day that usually works.",
      },
      times: {
        label: "Preferred times",
        required: true,
        kind: "multi",
        options: TOUR_TIMES,
        requiredMessage: "Pick at least one time of day.",
      },
      name: personName(),
      phone: phoneField(),
      email: emailField(),
      notes: optionalNote("Anything we should know before we call?", 2000),
    },
  },
};

function personName(): FieldRule {
  return {
    label: "Name",
    required: true,
    kind: "text",
    min: 2,
    max: 80,
    requiredMessage: "Tell us what to call you.",
  };
}

function phoneField(): FieldRule {
  return {
    label: "Phone",
    required: true,
    kind: "phone",
    requiredMessage: phoneMessage,
  };
}

function emailField(): FieldRule {
  return {
    label: "Email",
    required: true,
    kind: "email",
    max: 120,
    requiredMessage: "Enter an email address we can reply to.",
  };
}

function optionalNote(label: string, max: number): FieldRule {
  return {
    label,
    kind: "longtext",
    max,
    requiredMessage: "",
  };
}

export type ValidSubmission = {
  ok: true;
  form: FormName;
  fields: Record<string, string>;
  email: string;
  name: string;
  subject: string;
  message: string;
};

export type InvalidSubmission = {
  ok: false;
  error: string;
  fieldErrors: Record<string, string>;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const NAME_PATTERN = /^[\p{L}\p{M}][\p{L}\p{M}\s.'-]{1,79}$/u;

export function validateSubmission(raw: unknown): ValidSubmission | InvalidSubmission {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
    return { ok: false, error: "We could not read that form. Please try again.", fieldErrors: {} };
  }

  const input = raw as Record<string, unknown>;
  const formName = input.form;
  if (typeof formName !== "string" || !isFormName(formName)) {
    return { ok: false, error: "We could not tell which form that was.", fieldErrors: {} };
  }

  const schema = schemas[formName];
  const fieldErrors: Record<string, string> = {};
  const fields: Record<string, string> = {};

  for (const key of Object.keys(schema.fields)) {
    const rule = schema.fields[key];
    const parsed = readField(input[key], rule);
    if (!parsed.ok) {
      fieldErrors[key] = parsed.error;
      continue;
    }
    if (rule.required && !parsed.value) {
      fieldErrors[key] = rule.requiredMessage;
      continue;
    }
    if (parsed.value) fields[key] = parsed.value;
  }

  if (Object.keys(fieldErrors).length) {
    return {
      ok: false,
      error: "Please check the highlighted fields.",
      fieldErrors,
    };
  }

  let subject = schema.subject;
  if (formName === "interest" && fields.homeAddress) {
    subject = `Interest in ${fields.homeAddress} — Rooted Path Homes`;
  }
  if (formName === "seller" && fields.propertyAddress) {
    subject = `Seller lead: ${fields.propertyAddress} — Rooted Path Homes`;
  }
  if (formName === "tour" && fields.home) {
    subject = `Tour request: ${fields.home} — Rooted Path Homes`;
  }

  return {
    ok: true,
    form: formName,
    fields,
    email: fields.email,
    name: fields.name,
    subject,
    message: buildMessage(schema, fields),
  };
}

function readField(
  value: unknown,
  rule: FieldRule,
): { ok: true; value: string } | { ok: false; error: string } {
  if (rule.kind === "multi") {
    const items = readList(value);
    if (!items.length) return { ok: true, value: "" };
    const unknown = items.find((item) => !rule.options?.includes(item));
    if (unknown) return { ok: false, error: "Choose from the list." };
    return { ok: true, value: items.join(", ") };
  }

  const text = rule.kind === "longtext" ? readLong(value) : readString(value);
  if (!text) return { ok: true, value: "" };

  if (rule.max && text.length > rule.max) {
    return { ok: false, error: `Please keep this under ${rule.max} characters.` };
  }
  if (rule.min && text.length < rule.min) {
    return { ok: false, error: rule.requiredMessage || "Please add a little more detail." };
  }

  if (rule.kind === "email" && !EMAIL_PATTERN.test(text)) {
    return { ok: false, error: rule.requiredMessage };
  }

  if (rule.kind === "phone") {
    const digits = phoneDigits(text);
    if (digits.length !== 10) return { ok: false, error: rule.requiredMessage };
    return { ok: true, value: formatPhone(digits) };
  }

  if (rule.kind === "select") {
    if (!rule.options?.includes(text)) return { ok: false, error: "Choose one of the options." };
    return { ok: true, value: text };
  }

  if (rule.label === "Name" && !NAME_PATTERN.test(text)) {
    return { ok: false, error: "Use the name you'd like us to say out loud." };
  }

  return { ok: true, value: text };
}

function readString(value: unknown) {
  if (typeof value !== "string") return "";
  return value.trim().replace(/\s+/g, " ");
}

function readLong(value: unknown) {
  if (typeof value !== "string") return "";
  return value.replace(/\r\n/g, "\n").trim();
}

function readList(value: unknown) {
  const raw = Array.isArray(value)
    ? value.filter((item): item is string => typeof item === "string")
    : typeof value === "string"
      ? value.split(",")
      : [];
  const cleaned = raw.map((item) => item.trim()).filter(Boolean);
  return [...new Set(cleaned)];
}

function phoneDigits(value: string) {
  const digits = value.replace(/\D/g, "");
  if (digits.length === 11 && digits.startsWith("1")) return digits.slice(1);
  return digits;
}

function formatPhone(digits: string) {
  return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
}

function buildMessage(schema: Schema, fields: Record<string, string>) {
  const lines = [`Form: ${schema.title}`, ""];
  for (const key of schema.order) {
    const label = schema.fields[key].label;
    lines.push(`${label}: ${fields[key] || "Not given"}`);
  }
  lines.push(
    "",
    "Sent from the Rooted Path Homes website.",
    `Reply by phone at ${siteConfig.phoneDisplay} or by email.`,
  );
  return lines.join("\n");
}

function isFormName(value: string): value is FormName {
  return (FORM_NAMES as readonly string[]).includes(value);
}

export function isAllowedForwardUrl(value: string) {
  try {
    const url = new URL(value);
    if (url.protocol === "https:" && url.hostname === "api.web3forms.com") return true;
    if (
      (url.protocol === "http:" || url.protocol === "https:") &&
      (url.hostname === "127.0.0.1" || url.hostname === "localhost")
    ) {
      return true;
    }
    return false;
  } catch {
    return false;
  }
}

export function callFallback() {
  return `Please call ${siteConfig.phoneDisplay} or email ${siteConfig.email}.`;
}
