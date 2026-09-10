import { BookingLink } from "../booking-link";
import { ArrowUpRight } from "../icons";
import { createPageMetadata, regionalStageKeywords, serializeJsonLd } from "../seo";
import { ActHeading, PageFrame, PageHero } from "../site-components";
import { siteUrl } from "../site-url";
import { videos } from "../site-data";
import { VideoPlayer } from "../video-player";

const description = "Plan Kochi solo stage shows with Arun Guinness for associations, corporate events, campus programmes and celebrations across Kochi and Ernakulam, with India and overseas bookings welcome.";

export const metadata = createPageMetadata({
  title: "Kochi Solo Stage Shows & Live Entertainment",
  description,
  path: "/kochi-stage-shows",
  keywords: regionalStageKeywords,
});

const faqs = [
  { question: "Can we book Arun Guinness for a stage show in Kochi?", answer: "Yes. Send the event date, Kochi or Ernakulam venue, audience type and preferred running time through the booking form or WhatsApp." },
  { question: "Which Kochi events can the show fit?", answer: "Formats are available for Malayali association programmes, cultural events, corporate celebrations, college fests, school annual days, inaugurations, festivals and private functions." },
  { question: "Which areas around Kochi can enquire?", answer: "Enquiries are welcome from Kochi, Ernakulam, Kakkanad, Kalamassery, Aluva, Angamaly, Perumbavoor, Kothamangalam, Muvattupuzha, Thrippunithura, Fort Kochi and nearby locations." },
  { question: "Can the same stage show travel outside Kochi?", answer: "Yes. Arun's formats can be planned for venues across Kerala, India and abroad, including Gulf and international Malayali association programmes." },
] as const;

const kochiAreas = ["Kochi", "Ernakulam", "Kakkanad", "Kalamassery", "Aluva", "Angamaly", "Perumbavoor", "Kothamangalam", "Muvattupuzha", "Thrippunithura", "Fort Kochi"];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": `${siteUrl}/kochi-stage-shows#service`,
      name: "Kochi Solo Stage Shows by Arun Guinness",
      serviceType: "Live stage show entertainment",
      description,
      url: `${siteUrl}/kochi-stage-shows`,
      provider: { "@id": `${siteUrl}/#arun-guinness` },
      areaServed: kochiAreas.map((name) => ({ "@type": "Place", name })),
      availableChannel: { "@type": "ServiceChannel", serviceUrl: `${siteUrl}/book` },
    },
    {
      "@type": "FAQPage",
      "@id": `${siteUrl}/kochi-stage-shows#faq`,
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
        { "@type": "ListItem", position: 2, name: "Kochi Stage Shows", item: `${siteUrl}/kochi-stage-shows` },
      ],
    },
  ],
};

export default function KochiStageShowsPage() {
  return <PageFrame>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(structuredData) }} />
    <PageHero
      label="Kochi stage shows"
      title="Kochi energy."
      accent="One unforgettable voice act."
      description="Book Arun Guinness for a Kochi solo stage show combining live singing, voice transformations, mimicry, clean comedy and audience-aware interaction."
      highlights={["Kochi + Ernakulam", "Associations · Campus · Corporate", "Direct booking enquiry"]}
      motionPreset="cinematic"
      media={<VideoPlayer id={videos[0].id} title="Arun Guinness Kochi solo stage show" alt="Arun Guinness live stage show available for Kochi and Ernakulam events" className="route-player" sizes="(max-width: 800px) calc(100vw - 40px), 42vw" eager badge="Kochi booking" ratio="16:9" caption="Official live performance" />}
    />

    <section className="artist-story section-shell">
      <div data-reveal><ActHeading act="01" label="Kochi bookings" title="Local planning." accent="Full-stage impact." /></div>
      <div data-reveal>
        <p className="lead">For Kochi and Ernakulam events, Arun offers solo stage shows, a 90-minute one-man show, variety musical formats, mega shows and compact guest performances.</p>
        <p>The programme can suit an Onam celebration, Malayali association gathering, corporate event, college fest, school annual day, inauguration or public cultural stage. Organisers can share venue, audience and schedule details directly.</p>
        <BookingLink className="button button-dark" href="/book?location=Kochi">Check a Kochi date <ArrowUpRight /></BookingLink>
      </div>
    </section>

    <section className="craft-section section-shell">
      <ActHeading act="02" label="Service area" title="Across Kochi." accent="Beyond Kerala." description="Kochi-first booking intent with flexible travel for suitable productions." />
      <div className="craft-grid">
        <article data-reveal><span>01</span><h3>Central Kochi</h3><p>Kochi, Fort Kochi, Mattancherry, Thrippunithura and nearby event venues.</p></article>
        <article data-reveal><span>02</span><h3>Greater Ernakulam</h3><p>Ernakulam, Kakkanad, Kalamassery, Aluva, Angamaly, Perumbavoor and nearby areas.</p></article>
        <article data-reveal><span>03</span><h3>Across Kerala</h3><p>Kothamangalam, Muvattupuzha and enquiries from every Kerala district.</p></article>
        <article data-reveal><span>04</span><h3>India + abroad</h3><p>Domestic and international stage-show planning for cultural groups and Malayali communities.</p></article>
      </div>
    </section>

    <section className="inner-section section-shell faq-section">
      <ActHeading act="03" label="Kochi show FAQ" title="Useful answers." accent="Direct next step." />
      <div className="faq-list">{faqs.map((faq, index) => <details key={faq.question}><summary><span>0{index + 1}</span>{faq.question}</summary><p>{faq.answer}</p></details>)}</div>
    </section>
  </PageFrame>;
}
