import Link from "next/link";

export const programs = [
  ["01", "One Man Show", "കഥാപാത്രങ്ങളും ശബ്ദങ്ങളും കഥകളും ചേർന്ന signature performance."],
  ["02", "Mimicry", "പ്രിയപ്പെട്ട ശബ്ദങ്ങളും കഥാപാത്രങ്ങളും തത്സമയം വേദിയിൽ."],
  ["03", "Comedy Show", "എല്ലാ പ്രായക്കാർക്കും ആസ്വദിക്കാവുന്ന മലയാളം കോമഡി."],
  ["04", "Musical & Variety", "സംഗീതം, കോമഡി, interaction — പൂർണ്ണ വിനോദ പാക്കേജ്."],
  ["05", "College Events", "ക്യാംപസിന്റെ energy-ക്ക് ചേരുന്ന high-engagement show."],
  ["06", "Corporate Events", "Annual day, awards night, team celebrations എന്നിവയ്ക്ക്."],
  ["07", "School Programs", "കുട്ടികൾക്കും കുടുംബങ്ങൾക്കും സുരക്ഷിതവും രസകരവുമായ പരിപാടി."],
  ["08", "Association & Club", "ക്ലബ്, റെസിഡന്റ്സ് അസോസിയേഷൻ, community gatherings."],
  ["09", "Festival & Cultural", "ഉത്സവങ്ങൾക്കും സാംസ്കാരിക വേദികൾക്കും വലിയ ആഘോഷം."],
];

export function Header() {
  return <header className="site-header"><Link href="/" className="brand" aria-label="Arun Guinness home"><span className="brand-mark">AG</span><span>ARUN <b>GUINNESS</b><small>STAGE PROGRAMS</small></span></Link><nav aria-label="Main navigation"><Link href="/about">About</Link><Link href="/programs">Programs</Link><Link href="/gallery">Gallery</Link><Link href="/videos">Videos</Link><Link href="/testimonials">Testimonials</Link></nav><Link href="/contact" className="header-cta">BOOK NOW <span>↗</span></Link></header>;
}

export function Footer() {
  return <footer><div className="footer-top"><div><Link href="/" className="brand footer-brand"><span className="brand-mark">AG</span><span>ARUN <b>GUINNESS</b><small>STAGE PROGRAMS</small></span></Link><p>കേരളത്തിലുടനീളം ലൈവ് സ്റ്റേജ് എന്റർടെയിൻമെന്റ്.</p></div><div><h3>Explore</h3><Link href="/about">About</Link><Link href="/programs">Programs</Link><Link href="/gallery">Gallery</Link><Link href="/videos">Videos</Link></div><div><h3>Booking</h3><Link href="/contact">Contact</Link><a href="tel:+919656712941">+91 96567 12941</a><a href="mailto:arunguinnes@gmail.com">arunguinnes@gmail.com</a></div><SocialLinks /></div><div className="footer-bottom"><span>© 2026 Arun Guinness</span><span>Made for the stage.</span></div></footer>;
}

export function SocialLinks({ compact = false }: { compact?: boolean }) {
  return <div className={`social-links ${compact ? "compact" : ""}`}><a href="https://wa.me/919656712941" aria-label="WhatsApp">WA</a><a href="tel:+919656712941" aria-label="Call Arun Guinness">CALL</a><a href="https://youtube.com/@arunguinnes?si=JR5d98Nho6-gKlAH" target="_blank" rel="noreferrer" aria-label="Arun Guinness YouTube channel">YT</a><a href="https://www.instagram.com/" aria-label="Instagram">IG</a></div>;
}

export function HeroStage() {
  return <section className="hero"><div className="spotlight spotlight-one"/><div className="spotlight spotlight-two"/><div className="hero-noise"/><div className="hero-content"><div className="hero-kicker"><span /> LIVE • LAUGH • CELEBRATE</div><h1><span>ARUN</span><strong>GUINNESS</strong></h1><p className="hero-malayalam">ചിരിയുടെ വേദി.<br />ഓർമ്മകളുടെ രാത്രി.</p><div className="hero-buttons"><Link href="/contact" className="button">BOOK NOW <span>↗</span></Link><a href="https://wa.me/919656712941" className="button button-ghost">WHATSAPP</a></div></div><div className="stage-figure" aria-hidden="true"><div className="figure-head"/><div className="figure-body"/><div className="mic"><i/><b/></div></div><div className="hero-social"><SocialLinks /></div><div className="scroll-cue"><span /> SCROLL TO EXPLORE</div></section>;
}

export function ProgramGrid({ limit }: { limit?: number }) {
  return <div className="program-grid">{programs.slice(0, limit).map(([num,title,text])=><article className="program-card" key={title}><span className="program-num">{num}</span><div className="program-icon" aria-hidden="true">✦</div><h3>{title}</h3><p>{text}</p><Link href="/contact" aria-label={`Book ${title}`}>BOOK THIS SHOW <span>↗</span></Link></article>)}</div>;
}

export function PageHero({ eyebrow, title, accent, children }: { eyebrow:string; title:string; accent:string; children?:React.ReactNode }) {
  return <section className="page-hero"><span className="eyebrow light">{eyebrow}</span><h1>{title} <em>{accent}</em></h1>{children}</section>;
}

export function QuoteMark() { return <div className="quote-mark" aria-hidden="true">“</div>; }
