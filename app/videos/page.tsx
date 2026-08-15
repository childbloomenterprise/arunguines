import type { Metadata } from "next";
import { PageHero, VideoCard } from "../site-components";
import { videos, voiceRoster } from "../site-data";

export const metadata: Metadata = { title: "The Voices", description: "Watch Arun Guinness transform between male and female playback-singer voices, echo singing, television appearances and international performances." };

export default function Videos() {
  return (
    <main id="main-content">
      <PageHero label="Watch the transformation" title="Do not take our word." accent="Press play." description="Real performances from Arun's official channel—voice changes, television stages, international shows and the signature double-voice act." />
      <section className="all-videos section-shell"><div className="video-bento video-bento-all">{videos.map((video, index) => <VideoCard key={video.id} video={video} index={index} feature={index === 0 || index === 3} />)}</div></section>
      <section className="voice-spectrum section-shell" aria-label="Voice repertoire">
        <div data-reveal><span>Malayalam</span><span>Hindi</span><span>Tamil</span><span>English</span></div>
        <h2 data-reveal>35+ voices.<br /><em>Four languages.</em><br />One live artist.</h2>
        <p data-reveal>Reported repertoire includes S. Janaki, P. Susheela, Vani Jairam, Vineeth Sreenivasan, Jassie Gift, Adnan Sami, Arijit Singh and more.</p>
        <div className="voice-roster voice-roster-dark">{voiceRoster.map((voice, index) => <article key={voice.name} data-reveal style={{ "--delay": `${(index % 4) * 55}ms` } as React.CSSProperties}><span>0{index + 1}</span><h3>{voice.name}</h3><p>{voice.register}</p><small>{voice.language}</small></article>)}</div>
      </section>
    </main>
  );
}
