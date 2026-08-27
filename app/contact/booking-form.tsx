"use client";

import { FormEvent, useState } from "react";
import { ArrowUpRight, Copy } from "../icons";
import { contact, programs, type BookingDraft } from "../site-data";
import { composeBookingMessage } from "../site-logic";

type BookingFormProps = { initialShow?: string; initialEvent?: string; initialLocation?: string; compact?: boolean };

export function BookingForm({ initialShow = "", initialEvent = "", initialLocation = "", compact = false }: BookingFormProps) {
  const [minDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [handoffUrl, setHandoffUrl] = useState("");
  const [status, setStatus] = useState("Nothing is stored or submitted until you send the WhatsApp message.");
  const [copied, setCopied] = useState(false);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const draft: BookingDraft = {
      name: String(data.get("name") ?? ""), phone: String(data.get("phone") ?? ""), show: String(data.get("show") ?? ""),
      date: String(data.get("date") ?? ""), location: String(data.get("location") ?? ""), event: String(data.get("event") ?? ""),
      audience: String(data.get("audience") ?? ""), notes: String(data.get("notes") ?? ""),
    };
    const url = `${contact.whatsapp}?text=${encodeURIComponent(composeBookingMessage(draft))}`;
    setHandoffUrl(url);
    const popup = window.open(url, "_blank", "noopener,noreferrer");
    if (popup) popup.opener = null;
    setStatus(popup ? "WhatsApp opened. Review the enquiry and press send." : "Your browser blocked the new tab. Use the button below to continue.");
  }

  async function copyMessage() {
    if (!handoffUrl) return;
    const message = new URL(handoffUrl).searchParams.get("text") ?? "";
    await navigator.clipboard.writeText(message);
    setCopied(true);
    setStatus("Enquiry copied. Paste it into WhatsApp when ready.");
  }

  return (
    <form className={`booking-form ${compact ? "is-compact" : ""}`} onSubmit={submit}>
      <div className="form-head"><span>Guided enquiry</span><strong>Tell us enough to check the date and shape the right show.</strong></div>
      <div className="form-row"><label htmlFor={`name-${compact}`}>Your name<input id={`name-${compact}`} name="name" autoComplete="name" required placeholder="Full name" /></label><label htmlFor={`phone-${compact}`}>Phone number<input id={`phone-${compact}`} name="phone" type="tel" inputMode="tel" autoComplete="tel" required placeholder="+91" /></label></div>
      <div className="form-row"><label htmlFor={`show-${compact}`}>Preferred show<select id={`show-${compact}`} name="show" defaultValue={initialShow} required><option value="">Select a format</option>{programs.map((program) => <option key={program.slug} value={program.title}>{program.title}</option>)}</select></label><label htmlFor={`event-${compact}`}>Event type<input id={`event-${compact}`} name="event" defaultValue={initialEvent} placeholder="Festival, corporate..." /></label></div>
      <div className="form-row"><label htmlFor={`date-${compact}`}>Event date<input id={`date-${compact}`} name="date" type="date" min={minDate} required /></label><label htmlFor={`location-${compact}`}>City / venue<input id={`location-${compact}`} name="location" autoComplete="address-level2" defaultValue={initialLocation} required placeholder="Kochi, Muscat..." /></label></div>
      <label htmlFor={`audience-${compact}`}>Expected audience<input id={`audience-${compact}`} name="audience" inputMode="numeric" placeholder="Approximate size" /></label>
      <label htmlFor={`notes-${compact}`}>Requirements<textarea id={`notes-${compact}`} name="notes" rows={compact ? 2 : 4} placeholder="Running time, language mix, venue notes..." /></label>
      <button className="button button-brass" type="submit">Continue on WhatsApp <ArrowUpRight /></button>
      <p className="form-status" role="status">{status}</p>
      {handoffUrl ? <div className="handoff-fallback"><a className="button button-outline" href={handoffUrl} target="_blank" rel="noreferrer">Open WhatsApp <ArrowUpRight /></a><button className="button button-text" type="button" onClick={copyMessage}><Copy />{copied ? "Copied" : "Copy enquiry"}</button></div> : null}
    </form>
  );
}
