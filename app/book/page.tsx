import type { Metadata } from "next";
import { ArrowUpRight, MapPin, Message, Phone } from "../icons";
import { PageFrame, PageHero } from "../site-components";
import { contact } from "../site-data";
import { BookingForm } from "../contact/booking-form";

const description = "Check Arun Guinness availability for one-man shows, corporate events, festivals, international programmes and guest appearances.";
export const metadata: Metadata = { title: "Book Arun", description, alternates: { canonical: "/book" }, openGraph: { title: "Book Arun | Arun Guinness", description, url: "/book" } };

type BookPageProps = { searchParams: Promise<{ show?: string; event?: string; location?: string }> };

export default async function BookPage({ searchParams }: BookPageProps) {
  const params = await searchParams;
  return <PageFrame>
    <PageHero variant="book" motionPreset="cinematic" label="Book Arun" title="Your date." accent="His stage." description="Share the essentials, prepare the enquiry and continue in WhatsApp. No account, database or agency hand-off." highlights={["Direct WhatsApp", "No account", "Domestic + international"]} />
    <section className="booking-layout section-shell first-task">
      <BookingForm initialShow={params.show ?? ""} initialEvent={params.event ?? ""} initialLocation={params.location ?? ""} />
      <aside className="contact-panel" data-reveal><span>Prefer direct contact?</span><h2>One booking line.<br /><em>Two quick options.</em></h2><p>Use the guided form for a complete enquiry, or contact Arun&apos;s booking line directly.</p><a href={contact.whatsapp} target="_blank" rel="noreferrer"><Message /><span><small>WhatsApp</small><strong>{contact.phoneDisplay}</strong></span><ArrowUpRight /></a><a href={`tel:${contact.phone}`}><Phone /><span><small>Call</small><strong>{contact.phoneDisplay}</strong></span><ArrowUpRight /></a><a href={contact.officeMap} target="_blank" rel="noreferrer"><MapPin /><span><small>Based in</small><strong>{contact.office}</strong></span><ArrowUpRight /></a></aside>
    </section>
  </PageFrame>;
}
