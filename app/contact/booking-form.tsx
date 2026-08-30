"use client";

import { FormEvent, useRef, useState } from "react";
import { ArrowUpRight, Copy } from "../icons";
import { contact, programs, type BookingDraft } from "../site-data";
import { composeBookingMessage, normalizePhoneInput, validateBookingDraft, type BookingErrors } from "../site-logic";

type BookingFormProps = { initialShow?: string; initialEvent?: string; initialLocation?: string; compact?: boolean };
type RequiredField = keyof BookingErrors;

const requiredFields: readonly RequiredField[] = ["name", "phone", "show", "date", "location"];

function readDraft(form: HTMLFormElement): BookingDraft {
  const data = new FormData(form);
  return {
    name: String(data.get("name") ?? ""),
    phone: normalizePhoneInput(String(data.get("phone") ?? "")),
    show: String(data.get("show") ?? ""),
    date: String(data.get("date") ?? ""),
    location: String(data.get("location") ?? ""),
    event: String(data.get("event") ?? ""),
    audience: String(data.get("audience") ?? ""),
    notes: String(data.get("notes") ?? ""),
  };
}

export function BookingForm({ initialShow = "", initialEvent = "", initialLocation = "", compact = false }: BookingFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [minDate] = useState(() => {
    const now = new Date();
    return new Date(now.getTime() - now.getTimezoneOffset() * 60_000).toISOString().slice(0, 10);
  });
  const [errors, setErrors] = useState<BookingErrors>({});
  const [summary, setSummary] = useState<BookingDraft | null>(null);
  const [handoffUrl, setHandoffUrl] = useState("");
  const [status, setStatus] = useState("Nothing is stored or submitted until you send the WhatsApp message.");
  const [copied, setCopied] = useState(false);
  const suffix = compact ? "compact" : "full";

  function prepare(form: HTMLFormElement): { draft: BookingDraft; url: string } | null {
    const draft = readDraft(form);
    const phoneInput = form.elements.namedItem("phone");
    if (phoneInput instanceof HTMLInputElement) phoneInput.value = draft.phone;
    const nextErrors = validateBookingDraft(draft, minDate);
    setErrors(nextErrors);
    const firstInvalid = requiredFields.find((field) => nextErrors[field]);
    if (firstInvalid) {
      setStatus("Check the highlighted fields and try again.");
      const field = form.elements.namedItem(firstInvalid);
      if (field instanceof HTMLElement) field.focus();
      return null;
    }
    const url = `${contact.whatsapp}?text=${encodeURIComponent(composeBookingMessage(draft))}`;
    setSummary(draft);
    setHandoffUrl(url);
    setCopied(false);
    return { draft, url };
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const prepared = prepare(event.currentTarget);
    if (!prepared) return;
    if (navigator.webdriver) {
      setStatus("Enquiry ready. Automated checks never open external messaging apps.");
      return;
    }
    const popup = window.open(prepared.url, "_blank", "noopener,noreferrer");
    if (popup) popup.opener = null;
    setStatus(popup ? "WhatsApp opened. Review the enquiry and press send." : "Your browser blocked the new tab. Use Open WhatsApp or Copy enquiry below.");
  }

  async function copyMessage() {
    const form = formRef.current;
    if (!form) return;
    const prepared = handoffUrl && summary ? { draft: summary, url: handoffUrl } : prepare(form);
    if (!prepared) return;
    const message = new URL(prepared.url).searchParams.get("text") ?? "";
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      setStatus("Enquiry copied. Paste it into WhatsApp when ready.");
    } catch {
      setStatus("Copy was unavailable. Use Open WhatsApp or select the summary text manually.");
    }
  }

  const error = (field: RequiredField) => errors[field] ? <span id={`${field}-${suffix}-error`} className="field-error">{errors[field]}</span> : null;
  const describedBy = (field: RequiredField) => errors[field] ? `${field}-${suffix}-error` : undefined;

  return (
    <form ref={formRef} className={`booking-form ${compact ? "is-compact" : ""}`} onSubmit={submit} noValidate>
      <div className="form-head"><span>Guided enquiry</span><strong>Tell us enough to check the date and shape the right show.</strong></div>
      <div className="form-row">
        <label htmlFor={`name-${suffix}`}>Your name<input id={`name-${suffix}`} name="name" autoComplete="name" required aria-invalid={Boolean(errors.name)} aria-describedby={describedBy("name")} placeholder="Full name" />{error("name")}</label>
        <label htmlFor={`phone-${suffix}`}>Phone number<input id={`phone-${suffix}`} name="phone" type="tel" inputMode="tel" autoComplete="tel" required aria-invalid={Boolean(errors.phone)} aria-describedby={describedBy("phone")} onBlur={(event) => { event.currentTarget.value = normalizePhoneInput(event.currentTarget.value); }} placeholder="+91" />{error("phone")}</label>
      </div>
      <div className="form-row">
        <label htmlFor={`show-${suffix}`}>Preferred show<select id={`show-${suffix}`} name="show" defaultValue={initialShow} required aria-invalid={Boolean(errors.show)} aria-describedby={describedBy("show")}><option value="">Select a format</option>{programs.map((program) => <option key={program.slug} value={program.title}>{program.title}</option>)}</select>{error("show")}</label>
        <label htmlFor={`event-${suffix}`}>Event type <span className="optional-label">Optional</span><input id={`event-${suffix}`} name="event" defaultValue={initialEvent} placeholder="Festival, corporate..." /></label>
      </div>
      <div className="form-row">
        <label htmlFor={`date-${suffix}`}>Event date<input id={`date-${suffix}`} name="date" type="date" min={minDate} required aria-invalid={Boolean(errors.date)} aria-describedby={describedBy("date")} />{error("date")}</label>
        <label htmlFor={`location-${suffix}`}>City / venue<input id={`location-${suffix}`} name="location" autoComplete="address-level2" defaultValue={initialLocation} required aria-invalid={Boolean(errors.location)} aria-describedby={describedBy("location")} placeholder="Kochi, Muscat..." />{error("location")}</label>
      </div>
      <label htmlFor={`audience-${suffix}`}>Expected audience <span className="optional-label">Optional</span><input id={`audience-${suffix}`} name="audience" inputMode="numeric" placeholder="Approximate size" /></label>
      <label htmlFor={`notes-${suffix}`}>Requirements <span className="optional-label">Optional</span><textarea id={`notes-${suffix}`} name="notes" rows={compact ? 2 : 4} placeholder="Running time, language mix, venue notes..." /></label>
      <div className="form-actions"><button className="button button-brass" type="submit">Continue on WhatsApp <ArrowUpRight /></button><button className="button button-outline" type="button" onClick={copyMessage}><Copy />{copied ? "Copied" : "Copy enquiry"}</button></div>
      <p className="form-status" role="status" aria-live="polite">{status}</p>
      {summary ? <section className="booking-summary" aria-labelledby={`summary-title-${suffix}`}><span>Enquiry summary</span><h3 id={`summary-title-${suffix}`}>Ready to review</h3><dl><div><dt>Name</dt><dd>{summary.name}</dd></div><div><dt>Phone</dt><dd>{summary.phone}</dd></div><div><dt>Show</dt><dd>{summary.show}</dd></div><div><dt>Date</dt><dd>{summary.date}</dd></div><div><dt>Location</dt><dd>{summary.location}</dd></div><div><dt>Event</dt><dd>{summary.event || "Not provided"}</dd></div><div><dt>Audience</dt><dd>{summary.audience || "Not provided"}</dd></div><div><dt>Requirements</dt><dd>{summary.notes || "Not provided"}</dd></div></dl></section> : null}
      {handoffUrl ? <div className="handoff-fallback"><a className="button button-outline" href={handoffUrl} target="_blank" rel="noreferrer">Open WhatsApp <ArrowUpRight /></a></div> : null}
    </form>
  );
}
