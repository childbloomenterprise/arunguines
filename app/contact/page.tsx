import type { Metadata } from "next";
import { ArrowUpRight, Instagram, Mail, MapPin, Message, Phone, Youtube } from "../icons";
import { Eyebrow, PageHero } from "../site-components";
import { contact } from "../site-data";
import { BookingForm } from "./booking-form";

export const metadata: Metadata = { title: "Book Arun", description: "Check Arun Guinness's availability for one-man shows, corporate events, festivals, international programs and guest appearances." };

export default async function Contact({ searchParams }: { searchParams: Promise<{ show?: string }> }) {
  const params = await searchParams;
  return (
    <main id="main-content">
      <PageHero label="Direct booking" title="Your date." accent="His stage." description="Share date, city and audience. Your enquiry opens directly in WhatsApp—no account, no database and no unnecessary steps." />
      <section className="contact-layout section-shell">
        <div className="contact-panel" data-reveal><Eyebrow>Talk directly</Eyebrow><h2>Fastest route<br /><em>to availability.</em></h2><a className="contact-line" href={contact.whatsapp} target="_blank" rel="noreferrer"><Message /><span><small>WhatsApp enquiry</small><strong>{contact.phoneDisplay}</strong></span><ArrowUpRight /></a><a className="contact-line" href={`tel:${contact.phone}`}><Phone /><span><small>Call bookings</small><strong>{contact.phoneDisplay}</strong></span><ArrowUpRight /></a><a className="contact-line" href={`mailto:${contact.email}?subject=${encodeURIComponent("Booking enquiry for Arun Guinness")}`}><Mail /><span><small>Gmail enquiries</small><strong>{contact.email}</strong></span><ArrowUpRight /></a><a className="contact-line" href={contact.officeMap} target="_blank" rel="noreferrer"><MapPin /><span><small>Office / base</small><strong>{contact.office}</strong></span><ArrowUpRight /></a><div className="contact-social"><a href={contact.instagram} target="_blank" rel="noreferrer"><Instagram />Instagram</a><a href={contact.youtube} target="_blank" rel="noreferrer"><Youtube />YouTube</a></div><p>Available for domestic and international programs.</p></div>
        <BookingForm initialShow={params.show ?? ""} />
      </section>
    </main>
  );
}
