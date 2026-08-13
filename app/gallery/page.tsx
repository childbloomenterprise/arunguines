import type { Metadata } from "next";import { PageHero } from "../site-components";
export const metadata:Metadata={title:"Gallery"};
const shots=["Spotlight Moment","One Man Show","Audience Energy","Mimicry Night","College Stage","Corporate Event","Festival Show","Behind the Scenes"];
export default function Gallery(){return <main><PageHero eyebrow="ON & OFF STAGE" title="Photo" accent="Gallery."><p>വേദിയിലെ ചിരി, ആവേശം, മറക്കാനാവാത്ത നിമിഷങ്ങൾ.</p></PageHero><section className="gallery-grid section">{shots.map((shot,i)=><figure className={`gallery-shot shot-${i+1}`} key={shot}><div className="photo-placeholder"><span>PHOTO {String(i+1).padStart(2,"0")}</span></div><figcaption>{shot}<small>Official photo ചേർക്കുക</small></figcaption></figure>)}</section></main>}
