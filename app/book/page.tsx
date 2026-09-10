import { Suspense } from "react";
import { ArrowUpRight, MapPin, Message, Phone } from "../icons";
import { PageSchema } from "../page-schema";
import { bookingKeywords, createPageMetadata } from "../seo";
import { PageFrame, PageHero } from "../site-components";
import { contact } from "../site-data";
import { BookingForm } from "../contact/booking-form";
import { BookFormFromSearch } from "./booking-form-from-search";

const description = "Check Arun Guinness availability for one-man shows, corporate events, festivals, international programmes and guest appearances.";
export const metadata = createPageMetadata({ title: "Book Arun Guinness for a Stage Show", description, path: "/book", keywords: bookingKeywords });

export default function BookPage() {
  return <PageFrame>
    <PageSchema path="/book" name="Check Availability" description={description} type="ContactPage" />
    <PageHero variant="book" label="Check availability" title="Your next great evening" accent="starts with a hello." description="Share your occasion and location. Let’s explore what Arun could bring to your stage." highlights={[]} />
    <section className="booking-layout section-shell first-task">
      <Suspense fallback={<BookingForm />}><BookFormFromSearch /></Suspense>
      <aside className="contact-panel" data-reveal><span>Prefer direct contact?</span><h2>Let’s talk<br /><em>about your event.</em></h2><p>Prefer a conversation first? Reach Arun’s booking line directly. Availability, travel and pricing are agreed together.</p><a href={contact.whatsapp} target="_blank" rel="noreferrer"><Message /><span><small>WhatsApp</small><strong>{contact.phoneDisplay}</strong></span><ArrowUpRight /></a><a href={`tel:${contact.phone}`}><Phone /><span><small>Call</small><strong>{contact.phoneDisplay}</strong></span><ArrowUpRight /></a><a href={contact.officeMap} target="_blank" rel="noreferrer"><MapPin /><span><small>Based in</small><strong>{contact.office}</strong></span><ArrowUpRight /></a></aside>
    </section>
  </PageFrame>;
}
