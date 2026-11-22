"use client";

import { useId, useRef, useState } from "react";
import Link from "next/link";
import { isAllowedForwardUrl, validateSubmission, type FormName } from "@/lib/forms";
import { siteConfig } from "@/lib/site";

export type LeadField = {
  name: string;
  label: string;
  type: "text" | "email" | "tel" | "textarea" | "select" | "checkboxes";
  required?: boolean;
  options?: { value: string; label: string }[];
  placeholder?: string;
  help?: string;
  autoComplete?: string;
  width?: "full" | "half";
};

type LeadFormProps = {
  form: FormName;
  fields: LeadField[];
  context?: Record<string, string>;
  initialValues?: Record<string, string>;
  submitLabel: string;
  disclaimer: string;
  successTitle: string;
  successBody: string;
};

type ForwardBody = {
  url: string;
  body: Record<string, string>;
};

export function LeadForm({
  form,
  fields,
  context = {},
  initialValues = {},
  submitLabel,
  disclaimer,
  successTitle,
  successBody,
}: LeadFormProps) {
  const formId = useId();
  const summaryRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);
  const [values, setValues] = useState<Record<string, string | string[]>>(() => {
    const starting: Record<string, string | string[]> = {};
    for (const field of fields) {
      if (field.type === "checkboxes") starting[field.name] = [];
      else starting[field.name] = initialValues[field.name] ?? "";
    }
    return starting;
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState("");
  const [pending, setPending] = useState(false);
  const [done, setDone] = useState(false);
  const [trap, setTrap] = useState("");

  function update(name: string, value: string | string[]) {
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => {
      if (!current[name]) return current;
      const next = { ...current };
      delete next[name];
      return next;
    });
  }

  function toggle(name: string, option: string) {
    const current = Array.isArray(values[name]) ? (values[name] as string[]) : [];
    const next = current.includes(option)
      ? current.filter((item) => item !== option)
      : [...current, option];
    update(name, next);
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;
    setFormError("");

    if (trap.trim()) {
      setDone(true);
      return;
    }

    const payload: Record<string, unknown> = { form, company_website: trap, ...context, ...values };
    const checked = validateSubmission(payload);
    if (!checked.ok) {
      setErrors(checked.fieldErrors);
      setFormError(checked.error);
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }

    setPending(true);
    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json().catch(() => null)) as {
        ok?: boolean;
        error?: string;
        fieldErrors?: Record<string, string>;
        delivery?: string;
        forwards?: ForwardBody[];
      } | null;

      if (!response.ok || !result?.ok) {
        setErrors(result?.fieldErrors || {});
        setFormError(result?.error || `We couldn't send that. ${fallback()}`);
        requestAnimationFrame(() => summaryRef.current?.focus());
        return;
      }

      if (result.delivery === "web3forms") {
        const forwards = result.forwards ?? [];
        if (forwards.length < 2 || forwards.some((item) => !isAllowedForwardUrl(item.url))) {
          setFormError(`We couldn't send that to both of us. ${fallback()}`);
          return;
        }
        const deliveries = await Promise.all(
          forwards.map(async (item) => {
            const sent = await fetch(item.url, {
              method: "POST",
              headers: { "Content-Type": "application/json", Accept: "application/json" },
              body: JSON.stringify(item.body),
            });
            const provider = (await sent.json().catch(() => null)) as { success?: boolean } | null;
            return sent.ok && provider?.success === true;
          }),
        );
        if (deliveries.some((ok) => !ok)) {
          setFormError(`We couldn't send that to both of us just now. ${fallback()}`);
          return;
        }
      }

      setDone(true);
      requestAnimationFrame(() => successRef.current?.focus());
    } catch {
      setFormError(`We couldn't reach the form service. Check your connection. ${fallback()}`);
    } finally {
      setPending(false);
    }
  }

  if (done) {
    return (
      <div className="form-success" role="status">
        <h3 ref={successRef} tabIndex={-1}>
          {successTitle}
        </h3>
        <p>{successBody}</p>
        <p>
          If it&apos;s faster to talk, call{" "}
          <a href={`tel:${siteConfig.phoneTel}`}>{siteConfig.phoneDisplay}</a>.
        </p>
      </div>
    );
  }

  return (
    <form className="lead-form" onSubmit={onSubmit} noValidate aria-busy={pending || undefined}>
      <p className="required-note">
        Fields with a <span aria-hidden="true">*</span>
        <span className="sr-only">star</span> are required.
      </p>

      {formError ? (
        <div className="form-alert" role="alert" tabIndex={-1} ref={summaryRef}>
          {formError}
        </div>
      ) : null}

      <div className="form-grid">
        {fields.map((field) => {
          const id = `${formId}-${field.name}`;
          const error = errors[field.name];
          const describedBy = [field.help ? `${id}-help` : "", error ? `${id}-error` : ""]
            .filter(Boolean)
            .join(" ");
          const widthClass = field.width === "half" ? "" : "field-full";

          if (field.type === "checkboxes") {
            const selected = Array.isArray(values[field.name]) ? (values[field.name] as string[]) : [];
            return (
              <fieldset
                key={field.name}
                className={`field field-full ${error ? "has-error" : ""}`}
                aria-describedby={describedBy || undefined}
              >
                <legend>
                  {field.label}
                  {field.required ? <RequiredMark /> : null}
                </legend>
                {field.help ? (
                  <p className="field-help" id={`${id}-help`}>
                    {field.help}
                  </p>
                ) : null}
                <div className="check-grid">
                  {field.options?.map((option) => {
                    const optionId = `${id}-${option.value.replace(/\s+/g, "-").toLowerCase()}`;
                    return (
                      <label key={option.value} htmlFor={optionId}>
                        <input
                          id={optionId}
                          type="checkbox"
                          name={field.name}
                          value={option.value}
                          checked={selected.includes(option.value)}
                          onChange={() => toggle(field.name, option.value)}
                        />
                        <span>{option.label}</span>
                      </label>
                    );
                  })}
                </div>
                {error ? (
                  <p className="error-text" id={`${id}-error`}>
                    {error}
                  </p>
                ) : null}
              </fieldset>
            );
          }

          return (
            <div key={field.name} className={`field ${widthClass} ${error ? "has-error" : ""}`}>
              <label htmlFor={id}>
                {field.label}
                {field.required ? <RequiredMark /> : null}
              </label>
              {field.help ? (
                <p className="field-help" id={`${id}-help`}>
                  {field.help}
                </p>
              ) : null}
              {field.type === "textarea" ? (
                <textarea
                  id={id}
                  name={field.name}
                  value={String(values[field.name] ?? "")}
                  placeholder={field.placeholder}
                  required={field.required}
                  autoComplete={field.autoComplete}
                  aria-invalid={error ? true : undefined}
                  aria-describedby={describedBy || undefined}
                  onChange={(event) => update(field.name, event.target.value)}
                />
              ) : field.type === "select" ? (
                <select
                  id={id}
                  name={field.name}
                  value={String(values[field.name] ?? "")}
                  required={field.required}
                  autoComplete={field.autoComplete}
                  aria-invalid={error ? true : undefined}
                  aria-describedby={describedBy || undefined}
                  onChange={(event) => update(field.name, event.target.value)}
                >
                  <option value="">Choose one</option>
                  {field.options?.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  id={id}
                  name={field.name}
                  type={field.type}
                  inputMode={field.type === "tel" ? "tel" : field.type === "email" ? "email" : undefined}
                  value={String(values[field.name] ?? "")}
                  placeholder={field.placeholder}
                  required={field.required}
                  autoComplete={field.autoComplete}
                  aria-invalid={error ? true : undefined}
                  aria-describedby={describedBy || undefined}
                  onChange={(event) => update(field.name, event.target.value)}
                />
              )}
              {error ? (
                <p className="error-text" id={`${id}-error`}>
                  {error}
                </p>
              ) : null}
            </div>
          );
        })}
      </div>

      <div className="hp-field" aria-hidden="true">
        <label htmlFor={`${formId}-company`}>Company website</label>
        <input
          id={`${formId}-company`}
          name="company_website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={trap}
          onChange={(event) => setTrap(event.target.value)}
        />
      </div>

      <p className="form-disclaimer">{disclaimer}</p>
      <p className="privacy-note">
        We use this only to reply to you. We don&apos;t sell your information. Read the{" "}
        <Link href="/privacy">Privacy Policy</Link>.
      </p>
      <button className="btn" type="submit" disabled={pending}>
        {pending ? "Sending…" : submitLabel}
      </button>
    </form>
  );
}

function RequiredMark() {
  return (
    <>
      <span aria-hidden="true"> *</span>
      <span className="sr-only"> required</span>
    </>
  );
}

function fallback() {
  return `Please call ${siteConfig.phoneDisplay} or email ${siteConfig.email}.`;
}
