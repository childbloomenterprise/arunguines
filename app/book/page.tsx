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
  return <PageFrame>
    <PageSchema path="/book" name="Check Availability" description={description} type="ContactPage" />
    <PageHero variant="book" label="Check availability" title="Tell us about" accent="your event." description="A few details are enough. Your enquiry opens in WhatsApp for you to review and send." highlights={[]} />
    <section className="booking-layout section-shell first-task">
      <Suspense fallback={<div className="booking-form booking-loading" role="status">Preparing your enquiry…</div>}><BookFormFromSearch /></Suspense>
      <aside className="contact-panel" data-reveal><span>Prefer to talk?</span><h2>Reach Arun<br /><em>directly.</em></h2><a href={contact.whatsapp} target="_blank" rel="noreferrer"><Message /><span><small>WhatsApp</small><strong>{contact.phoneDisplay}</strong></span><ArrowUpRight /></a><a href={`tel:${contact.phone}`}><Phone /><span><small>Call</small><strong>{contact.phoneDisplay}</strong></span><ArrowUpRight /></a></aside>
    </section>
  </PageFrame>;
}
