import type { Metadata } from "next";import { PageHero } from "../site-components";
export const metadata:Metadata={title:"Videos"};
const videos=["One Man Show — Highlights","Best of Mimicry","Live Comedy Performance","Musical & Variety Show","College Event Highlights","Corporate Entertainment"];
export default function Videos(){return <main><PageHero eyebrow="WATCH THE ENERGY" title="Show" accent="Videos."><p>YouTube വീഡിയോകളും മികച്ച showreel-ുകളും ഇവിടെ കാണാം.</p></PageHero><section className="video-grid section">{videos.map((v,i)=><article className="video-card" key={v}><div className="video-thumb"><span className="play-button">▶</span><small>YOUTUBE VIDEO {String(i+1).padStart(2,"0")}</small></div><h2>{v}</h2><p>Official YouTube link ചേർക്കുക</p></article>)}</section></main>}
