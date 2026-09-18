import { Suspense } from "react";
import { ArrowUpRight, Message, Phone } from "../icons";
import { PageSchema } from "../page-schema";
import { bookingKeywords, createPageMetadata } from "../seo";
import { PageFrame, PageHero } from "../site-components";
import { contact } from "../site-data";
import { BookFormFromSearch } from "./booking-form-from-search";

const description = "Check Arun Guinness availability for one-man shows, corporate events, festivals, international programmes and guest appearances.";
export const metadata = createPageMetadata({ title: "Book Arun Guinness for a Stage Show", description, path: "/book", keywords: bookingKeywords });

export default function BookPage() {
  return <PageFrame tone="stone">
    <PageSchema path="/book" name="Check Availability" description={description} type="ContactPage" />
    <PageHero variant="book" label="Begin the conversation" title="Tell us what" accent="you imagine." description="A few details can start a remarkable evening. We’ll prepare your note for WhatsApp; you decide when to send it." highlights={[]} />
    <section className="booking-layout section-shell first-task">
      <Suspense fallback={<div className="booking-form booking-loading" role="status">Preparing your enquiry…</div>}><BookFormFromSearch /></Suspense>
      <aside className="contact-panel" data-reveal><span>A more personal note</span><h2>Some evenings<br /><em>begin with hello.</em></h2><p>Prefer to talk through the idea? Reach Arun directly.</p><a href={`tel:${contact.phone}`}><Phone /><span><small>Speak to Arun</small><strong>{contact.phoneDisplay}</strong></span><ArrowUpRight /></a><a href={contact.whatsapp} target="_blank" rel="noreferrer"><Message /><span><small>Start on WhatsApp</small><strong>Send a quick note</strong></span><ArrowUpRight /></a></aside>
    </section>
  </PageFrame>;
}
