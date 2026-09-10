"use client";

import { FormEvent, useRef, useState } from "react";
import { ArrowUpRight, Check, Copy } from "../icons";
import { contact, programs, type BookingDraft } from "../site-data";
import { composeBookingMessage, normalizePhoneInput, validateBookingDraft, type BookingErrors } from "../site-logic";

type BookingFormProps = { initialShow?: string; initialEvent?: string; initialLocation?: string; initialCountry?: string; source?: string; compact?: boolean };
const fieldOrder = ["name", "event", "country", "location", "date", "phone"] as const;
const fieldLabels = { name: "Your name", event: "Event type", country: "Event country", location: "Event city", date: "Choose your event date", phone: "Phone number" };

export function BookingForm({ initialShow = "", initialEvent = "", initialLocation = "", initialCountry = "", source = "/book", compact = false }: BookingFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [dateUndecided, setDateUndecided] = useState(true);
  const [errors, setErrors] = useState<BookingErrors>({});
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [copied, setCopied] = useState(false);
  const [minDate] = useState(() => {
    const now = new Date();
    return new Date(now.getTime() - now.getTimezoneOffset() * 60_000).toISOString().slice(0, 10);
  });
  const suffix = compact ? "compact" : "full";
  const handoffUrl = message ? `${contact.whatsapp}?text=${encodeURIComponent(message)}` : "";

  function prepare(): string | null {
    const form = formRef.current;
    if (!form) return null;
    const data = new FormData(form);
    const value = (name: string) => String(data.get(name) ?? "").trim();
    const draft: BookingDraft = { name: value("name"), event: value("event"), country: value("country"), location: value("location"), date: dateUndecided ? "" : value("date"), show: value("show"), phone: normalizePhoneInput(value("phone")), audience: value("audience"), notes: value("notes"), source };
    const nextErrors = validateBookingDraft(draft, minDate);
    if (!dateUndecided && !draft.date) nextErrors.date = "Choose a date or select Date not decided.";
    setErrors(nextErrors);
    const first = fieldOrder.find((field) => nextErrors[field]);
    if (first) {
      setStatus("Check the highlighted details below.");
      const field = form.elements.namedItem(first);
      if (field instanceof HTMLElement) {
        const details = field.closest("details");
        if (details) details.open = true;
        field.focus();
      }
      return null;
    }
    const nextMessage = composeBookingMessage(draft);
    setMessage(nextMessage);
    setCopied(false);
    return nextMessage;
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const prepared = prepare();
    if (!prepared) return;
    window.open(`${contact.whatsapp}?text=${encodeURIComponent(prepared)}`, "_blank", "noopener,noreferrer");
    setStatus("Enquiry ready. Review and send it in WhatsApp. If no tab opened, use Open WhatsApp or Copy enquiry below.");
  }

  async function copyMessage() {
    const prepared = prepare();
    if (!prepared) return;
    try {
      await navigator.clipboard.writeText(prepared);
      setCopied(true);
      setStatus("Enquiry copied. Paste it into WhatsApp when ready.");
    } catch {
      setStatus("Copy is unavailable. Select the enquiry text below, or use Open WhatsApp.");
    }
  }

  const error = (field: keyof BookingErrors) => errors[field] ? <span id={`${field}-${suffix}-error`} className="field-error">{errors[field]}</span> : null;
  const accessibility = (field: keyof BookingErrors) => ({ "aria-label": fieldLabels[field], "aria-invalid": Boolean(errors[field]), "aria-describedby": errors[field] ? `${field}-${suffix}-error` : undefined });

  return <form ref={formRef} className={`booking-form ${compact ? "is-compact" : ""}`} onSubmit={submit} onChange={() => { setMessage(""); setCopied(false); setStatus(""); }} noValidate>
    <div className="form-head"><span>Your next great evening starts here</span><h2>Tell us about your event.</h2><p>Just the essentials. We can work out the rest together.</p></div>
    <div className="form-row">
      <label htmlFor={`name-${suffix}`}>Your name<input id={`name-${suffix}`} name="name" autoComplete="name" required maxLength={120} {...accessibility("name")} placeholder="Your full name" />{error("name")}</label>
      <label htmlFor={`event-${suffix}`}>Event type<input id={`event-${suffix}`} name="event" list={`event-options-${suffix}`} defaultValue={initialEvent} required maxLength={160} {...accessibility("event")} placeholder="e.g. Malayali association celebration" /><datalist id={`event-options-${suffix}`}>{["Malayali association", "Onam / cultural festival", "Family / community gathering", "Corporate event", "School annual day", "College fest", "Other event"].map((item) => <option key={item} value={item} />)}</datalist>{error("event")}</label>
    </div>
    <div className="form-row">
      <label htmlFor={`country-${suffix}`}>Event country<input id={`country-${suffix}`} name="country" defaultValue={initialCountry} required maxLength={100} {...accessibility("country")} placeholder="e.g. United Kingdom" />{error("country")}</label>
      <label htmlFor={`location-${suffix}`}>Event city<input id={`location-${suffix}`} name="location" defaultValue={initialLocation} required maxLength={160} {...accessibility("location")} placeholder="e.g. London" />{error("location")}</label>
    </div>
    <div className="date-choice"><span>Event date</span><label className="checkbox-label"><input type="checkbox" checked={dateUndecided} onChange={(event) => setDateUndecided(event.target.checked)} />Date not decided</label>{!dateUndecided ? <label htmlFor={`date-${suffix}`}>Choose your event date<input id={`date-${suffix}`} name="date" type="date" min={minDate} {...accessibility("date")} />{error("date")}</label> : null}</div>
    <label htmlFor={`show-${suffix}`}>Show preference<select id={`show-${suffix}`} name="show" defaultValue={programs.some((program) => program.title === initialShow) ? initialShow : ""}><option value="">Help me choose</option>{programs.map((program) => <option key={program.slug} value={program.title}>{program.title}</option>)}</select></label>
    <details className="optional-details"><summary>Add more details <span>Optional</span></summary><div className="optional-fields"><div className="form-row"><label htmlFor={`phone-${suffix}`}>Phone number<input id={`phone-${suffix}`} name="phone" type="tel" autoComplete="tel" maxLength={30} {...accessibility("phone")} placeholder="Include your country code" />{error("phone")}</label><label htmlFor={`audience-${suffix}`}>Expected audience<input id={`audience-${suffix}`} name="audience" inputMode="numeric" maxLength={40} placeholder="Approximate number of guests" /></label></div><label htmlFor={`notes-${suffix}`}>Anything else we should know?<textarea id={`notes-${suffix}`} name="notes" rows={3} maxLength={1500} placeholder="Favourite songs, language mix, venue or running time…" /></label></div></details>
    <div className="form-actions"><button className="button button-brass" type="submit">Continue on WhatsApp <ArrowUpRight /></button><button className="copy-action" type="button" onClick={copyMessage}>{copied ? <Check /> : <Copy />}{copied ? "Copied" : "Copy enquiry"}</button></div>
    <p className="booking-reassurance">You review and send the message in WhatsApp. Dates and pricing are confirmed in conversation.</p>
    {status ? <p className="form-status" role="status">{status}</p> : null}
    {message ? <section className="booking-summary" aria-label="Your prepared enquiry"><h3>Your enquiry, ready to send</h3><pre>{message}</pre><div className="handoff-fallback"><a className="button button-dark" href={handoffUrl} target="_blank" rel="noreferrer">Open WhatsApp <ArrowUpRight /></a></div></section> : null}
  </form>;
}
