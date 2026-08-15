import type { Metadata } from "next";
import { ArrowUpRight, Instagram } from "../icons";
import { PageHero } from "../site-components";
import { contact, videos } from "../site-data";
import { VideoPlayer } from "../video-player";

export const metadata: Metadata = { title: "Live Portfolio", description: "A visual portfolio of Arun Guinness across television, Kerala and international stages." };

export default function Gallery() {
  return (
    <main id="main-content">
      <PageHero label="Live portfolio" title="Every stage." accent="A different energy." description="Performance moments from television, voice showcases and international events. Follow Instagram for Arun's newest live work." />
      <section className="gallery-mosaic section-shell">
        {videos.map((video, index) => <div key={video.id} className={`gallery-item item-${index + 1}`} data-reveal><VideoPlayer id={video.id} title={video.title} alt={`${video.title} performance thumbnail`} className="gallery-player" sizes="(max-width: 800px) 100vw, 50vw" category={video.category} variant="gallery" /></div>)}
      </section>
      <section className="instagram-banner section-shell"><Instagram /><div><small>Newest work lives here</small><h2>@arun_guinness</h2></div><a href={contact.instagram} target="_blank" rel="noreferrer">Open Instagram <ArrowUpRight /></a></section>
    </main>
  );
}
