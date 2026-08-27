import type { Metadata } from "next";
import { ArrowUpRight, Instagram, Mail, MapPin, Message, Phone, Youtube } from "../icons";
import { PageFrame, PageHero } from "../site-components";
import { contact } from "../site-data";
import { BookingForm } from "../contact/booking-form";

const description = "Check Arun Guinness availability for one-man shows, corporate events, festivals, international programmes and guest appearances.";
export const metadata: Metadata = { title: "Book Arun", description, alternates: { canonical: "/book" }, openGraph: { title: "Book Arun | Arun Guinness", description, url: "/book" } };

type BookPageProps = { searchParams: Promise<{ show?: string; event?: string; location?: string }> };

export default async function BookPage({ searchParams }: BookPageProps) {
  const params = await searchParams;
  return <PageFrame><PageHero label="Book" title="Your date." accent="His stage." description="Direct to Arun." highlights={["WhatsApp", "No login", "Worldwide"]} /><section className="booking-layout section-shell"><aside className="contact-panel" data-reveal><span>Direct</span><h2>Pick a<br /><em>route.</em></h2><a href={contact.whatsapp} target="_blank" rel="noreferrer"><Message /><span><small>WhatsApp</small><strong>{contact.phoneDisplay}</strong></span><ArrowUpRight /></a><a href={`tel:${contact.phone}`}><Phone /><span><small>Call</small><strong>{contact.phoneDisplay}</strong></span><ArrowUpRight /></a><a href={`mailto:${contact.email}`}><Mail /><span><small>Email</small><strong>{contact.email}</strong></span><ArrowUpRight /></a><a href={contact.officeMap} target="_blank" rel="noreferrer"><MapPin /><span><small>Base</small><strong>{contact.office}</strong></span><ArrowUpRight /></a><div><a href={contact.instagram} target="_blank" rel="noreferrer"><Instagram />Instagram</a><a href={contact.youtube} target="_blank" rel="noreferrer"><Youtube />YouTube</a></div></aside><BookingForm initialShow={params.show ?? ""} initialEvent={params.event ?? ""} initialLocation={params.location ?? ""} /></section></PageFrame>;
}
