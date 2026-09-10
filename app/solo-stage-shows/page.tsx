import { BookingLink } from "../booking-link";
import { ArrowUpRight } from "../icons";
import { createPageMetadata, serializeJsonLd, soloStageKeywords } from "../seo";
import { ActHeading, PageFrame, PageHero } from "../site-components";
import { siteUrl } from "../site-url";
import { videos } from "../site-data";
import { VideoPlayer } from "../video-player";

const description = "Book Arun Guinness for solo stage shows in Kerala and worldwide: a one-man live show combining singing, male and female voice impressions, mimicry, comedy and audience interaction.";

export const metadata = createPageMetadata({
  title: "Solo Stage Shows in Kerala",
  description,
  path: "/solo-stage-shows",
  keywords: soloStageKeywords,
});

const faqs = [
  { question: "What happens in an Arun Guinness solo stage show?", answer: "The format combines live singing, male and female playback-style voice impressions, mimicry, clean comedy, characters and audience interaction in one performance." },
  { question: "How long can the one-man show run?", answer: "The flagship one-man show runs for about 90 minutes. Compact guest appearances and longer custom programmes can be planned around the event schedule." },
  { question: "Which events suit the solo stage show?", answer: "It works for cultural festivals, Malayali association programmes, college fests, school annual days, corporate events, inaugurations, ticketed shows and private celebrations." },
  { question: "Can Arun perform solo stage shows outside Kerala?", answer: "Yes. Enquiries are welcome from across India and from overseas Malayali associations, cultural unions and event organisers, subject to date, travel and production requirements." },
] as const;

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": `${siteUrl}/solo-stage-shows#service`,
      name: "Arun Guinness Solo Stage Show",
      serviceType: "Solo stage show and one-man live entertainment",
      description,
      url: `${siteUrl}/solo-stage-shows`,
      provider: { "@id": `${siteUrl}/#arun-guinness` },
      areaServed: ["Kerala", "India", "Worldwide"],
      audience: { "@type": "Audience", audienceType: "Families, students, corporate audiences and Malayali communities" },
    },
    {
      "@type": "FAQPage",
      "@id": `${siteUrl}/solo-stage-shows#faq`,
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
        { "@type": "ListItem", position: 2, name: "Solo Stage Shows", item: `${siteUrl}/solo-stage-shows` },
      ],
    },
  ],
};

export default function SoloStageShowsPage() {
  return <PageFrame>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(structuredData) }} />
    <PageHero
      label="Solo stage shows"
      title="One artist."
      accent="A full stage."
      description="Arun Guinness turns one live performer into a complete musical and mimicry experience—male and female playback styles, characters, comedy and audience interaction."
      highlights={["90-minute flagship", "Custom event formats", "Kerala · India · Worldwide"]}
      motionPreset="cinematic"
      media={<VideoPlayer id={videos[0].id} title="Arun Guinness solo stage show" alt="Arun Guinness performing his solo stage show with male and female voice impressions" className="route-player" sizes="(max-width: 800px) calc(100vw - 40px), 42vw" eager badge="Solo show preview" ratio="16:9" caption="Official live performance" />}
    />

    <section className="artist-story section-shell">
      <div data-reveal><ActHeading act="01" label="The format" title="Solo does not mean" accent="small." /></div>
      <div data-reveal>
        <p className="lead">This solo stage show gives organisers a headline act without losing variety. Arun moves between songs, voice impressions, mimicry, clean humour and spontaneous audience moments.</p>
        <p>Choose a compact guest performance, the signature 90-minute one-man show or a custom running time. Language mix, pacing and interaction can be shaped for family audiences, students, corporate rooms and public festivals.</p>
        <BookingLink className="button button-dark" href="/book?show=One%20Man%20Show">Book a solo stage show <ArrowUpRight /></BookingLink>
      </div>
    </section>

    <section className="craft-section section-shell">
      <ActHeading act="02" label="Suitable events" title="One format." accent="Many rooms." description="Built for programmes that need musical range, clean entertainment and flexible stage time." />
      <div className="craft-grid">
        <article data-reveal><span>01</span><h3>Associations</h3><p>Malayali association, Kerala association, resident association, cultural union and Onam programmes.</p></article>
        <article data-reveal><span>02</span><h3>Campus</h3><p>School annual days, college fests, arts days, youth festivals, alumni meets and inaugurations.</p></article>
        <article data-reveal><span>03</span><h3>Corporate</h3><p>Company celebrations, award nights, conferences and agenda-friendly guest appearances.</p></article>
        <article data-reveal><span>04</span><h3>Worldwide</h3><p>Stage shows abroad for Gulf and international Malayali communities, subject to travel and production planning.</p></article>
      </div>
    </section>

    <section className="inner-section section-shell faq-section">
      <ActHeading act="03" label="Solo show FAQ" title="Before you" accent="book the stage." />
      <div className="faq-list">{faqs.map((faq, index) => <details key={faq.question}><summary><span>0{index + 1}</span>{faq.question}</summary><p>{faq.answer}</p></details>)}</div>
    </section>
  </PageFrame>;
}
