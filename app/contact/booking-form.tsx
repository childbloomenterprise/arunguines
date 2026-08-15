"use client";

import { FormEvent, useMemo, useState } from "react";
import { ArrowUpRight } from "../icons";
import { contact, programs } from "../site-data";

export function BookingForm({ initialShow = "" }: { initialShow?: string }) {
  const [opened, setOpened] = useState(false);
  const minDate = useMemo(() => new Date().toISOString().slice(0, 10), []);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const message = [
      "ARUN GUINNESS — BOOKING ENQUIRY",
      "",
      `Name: ${String(data.get("name") ?? "")}`,
      `Phone: ${String(data.get("phone") ?? "")}`,
      `Show: ${String(data.get("show") ?? "")}`,
      `Date: ${String(data.get("date") ?? "")}`,
      `Location: ${String(data.get("location") ?? "")}`,
      `Audience / notes: ${String(data.get("message") ?? "")}`,
    ].join("\n");

    setOpened(true);
    window.open(`${contact.whatsapp}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  }

  return (
    <form className="booking-form" onSubmit={submit}>
      <div className="form-head"><span>Booking enquiry</span><strong>No database. Your details open directly in WhatsApp.</strong></div>
      <div className="form-row"><label htmlFor="name">Your name<input id="name" name="name" autoComplete="name" required placeholder="Full name" /></label><label htmlFor="phone">Phone number<input id="phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" required placeholder="+91" /></label></div>
      <div className="form-row"><label htmlFor="show">Preferred show<select id="show" name="show" defaultValue={initialShow}><option value="">Select a format</option>{programs.map((program) => <option key={program.title}>{program.title}</option>)}</select></label><label htmlFor="date">Event date<input id="date" name="date" type="date" min={minDate} required /></label></div>
      <label htmlFor="location">City / venue<input id="location" name="location" autoComplete="address-level2" required placeholder="Kochi, Muscat, Kuwait..." /></label>
      <label htmlFor="message">Audience and requirements<textarea id="message" name="message" rows={3} placeholder="Event type, expected audience, preferred duration..." /></label>
      <button className="button button-gold" type="submit">Continue on WhatsApp <ArrowUpRight /></button>
      <p className="form-status" role="status">{opened ? "WhatsApp opened. Review your enquiry and press send." : "Nothing is stored or submitted until you send the WhatsApp message."}</p>
    </form>
  );
}
