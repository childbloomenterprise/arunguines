"use client";

import { FormEvent, useRef, useState } from "react";
import { ArrowUpRight, Check, Copy } from "../icons";
import { contact, programs, type BookingDraft } from "../site-data";
import { composeBookingMessage, normalizePhoneInput, recommendShow, validateBookingDraft, type BookingErrors } from "../site-logic";

type BookingFormProps = { initialShow?: string; initialEvent?: string; initialLocation?: string; initialCountry?: string; source?: string; compact?: boolean };
const fieldOrder = ["name", "event", "country", "location", "date", "phone"] as const;
const fieldLabels = { name: "Your name", event: "Event type", country: "Event country", location: "Event city", date: "Choose your event date", phone: "Phone number" };
const occasionChoices = [
  { label: "Festival", value: "Onam / cultural festival" },
  { label: "Community", value: "Malayali association" },
  { label: "Campus", value: "School annual day" },
  { label: "Corporate", value: "Corporate event" },
  { label: "Private", value: "Family / community gathering" },
  { label: "Guest spot", value: "Guest appearance" },
] as const;

export function BookingForm({ initialShow = "", initialEvent = "", initialLocation = "", initialCountry = "", source = "/book", compact = false }: BookingFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [dateUndecided, setDateUndecided] = useState(true);
  const [eventChoice, setEventChoice] = useState(initialEvent);
  const [selectedShow, setSelectedShow] = useState(programs.some((program) => program.title === initialShow) ? initialShow : "");
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
  const eventKey = /guest|inauguration|award/i.test(eventChoice) ? "inauguration" : /corporate/i.test(eventChoice) ? "corporate" : /school|college|campus/i.test(eventChoice) ? "campus" : /festival|onam/i.test(eventChoice) ? "public-festival" : "association";
  const suggestedShow = eventChoice.trim() ? recommendShow(programs, { event: eventKey, audience: "", duration: "" }) : null;
  const resetPrepared = () => { setMessage(""); setCopied(false); setStatus(""); };

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

  return <form ref={formRef} className={`booking-form ${compact ? "is-compact" : ""}`} onSubmit={submit} onChange={resetPrepared} noValidate>
    <div className="form-head"><span>Your event, in a few notes</span><h2>Start with the feeling.</h2><p>Choose what you know. Leave the rest for a conversation.</p></div>
    <div className="booking-section-note"><span>01</span><strong>The occasion</strong></div>
    <div className="occasion-choices" role="group" aria-label="Choose an occasion">
      {occasionChoices.map((choice) => <button key={choice.label} type="button" aria-pressed={eventChoice === choice.value} onClick={() => { setEventChoice(choice.value); resetPrepared(); }}>{choice.label}</button>)}
    </div>
    <label htmlFor={`event-${suffix}`}>Event type<input id={`event-${suffix}`} name="event" list={`event-options-${suffix}`} value={eventChoice} onChange={(event) => setEventChoice(event.target.value)} required maxLength={160} {...accessibility("event")} placeholder="Or describe your occasion" /><datalist id={`event-options-${suffix}`}>{occasionChoices.map((item) => <option key={item.label} value={item.value} />)}<option value="College fest" /><option value="Other event" /></datalist>{error("event")}</label>
    {suggestedShow ? <div className="show-suggestion" aria-live="polite"><div><span>Suggested starting point</span><strong>{suggestedShow.title}</strong><small>{suggestedShow.duration} · You can change this below.</small></div><button type="button" onClick={() => { setSelectedShow(suggestedShow.title); resetPrepared(); }} disabled={selectedShow === suggestedShow.title}>{selectedShow === suggestedShow.title ? "Selected" : "Use this format"}</button></div> : null}
    <div className="booking-section-note"><span>02</span><strong>Place &amp; timing</strong></div>
    <div className="form-row">
      <label htmlFor={`country-${suffix}`}>Event country<input id={`country-${suffix}`} name="country" defaultValue={initialCountry} required maxLength={100} {...accessibility("country")} placeholder="Country" />{error("country")}</label>
      <label htmlFor={`location-${suffix}`}>Event city<input id={`location-${suffix}`} name="location" defaultValue={initialLocation} required maxLength={160} {...accessibility("location")} placeholder="City" />{error("location")}</label>
    </div>
    <div className="date-choice"><span>Event date</span><label className="checkbox-label"><input type="checkbox" checked={dateUndecided} onChange={(event) => setDateUndecided(event.target.checked)} />Date not decided</label>{!dateUndecided ? <label htmlFor={`date-${suffix}`}>Choose your event date<input id={`date-${suffix}`} name="date" type="date" min={minDate} {...accessibility("date")} />{error("date")}</label> : null}</div>
    <label htmlFor={`show-${suffix}`}>Show preference<select id={`show-${suffix}`} name="show" value={selectedShow} onChange={(event) => setSelectedShow(event.target.value)}><option value="">Help me choose</option>{programs.map((program) => <option key={program.slug} value={program.title}>{program.title}</option>)}</select></label>
    <div className="booking-section-note"><span>03</span><strong>Who should we reply to?</strong></div>
    <label htmlFor={`name-${suffix}`}>Your name<input id={`name-${suffix}`} name="name" autoComplete="name" required maxLength={120} {...accessibility("name")} placeholder="Your full name" />{error("name")}</label>
    <details className="optional-details"><summary>Add more details <span>Optional</span></summary><div className="optional-fields"><div className="form-row"><label htmlFor={`phone-${suffix}`}>Phone number<input id={`phone-${suffix}`} name="phone" type="tel" autoComplete="tel" maxLength={30} {...accessibility("phone")} placeholder="Include your country code" />{error("phone")}</label><label htmlFor={`audience-${suffix}`}>Expected audience<input id={`audience-${suffix}`} name="audience" inputMode="numeric" maxLength={40} placeholder="Approximate number of guests" /></label></div><label htmlFor={`notes-${suffix}`}>Anything else we should know?<textarea id={`notes-${suffix}`} name="notes" rows={3} maxLength={1500} placeholder="Favourite songs, language mix, venue or running time…" /></label></div></details>
    <div className="form-actions"><button className="button button-brass" type="submit">Prepare my WhatsApp note <ArrowUpRight /></button><button className="copy-action" type="button" onClick={copyMessage}>{copied ? <Check /> : <Copy />}{copied ? "Copied" : "Copy enquiry"}</button></div>
    <p className="booking-reassurance">Review and send your message in WhatsApp. Arun will confirm availability there.</p>
    {status ? <p className="form-status" role="status">{status}</p> : null}
    {message ? <section className="booking-summary" aria-label="Your prepared enquiry"><h3>Your enquiry, ready to send</h3><pre>{message}</pre><div className="handoff-fallback"><a className="button button-dark" href={handoffUrl} target="_blank" rel="noreferrer">Open WhatsApp <ArrowUpRight /></a></div></section> : null}
  </form>;
}
