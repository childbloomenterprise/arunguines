import Link from "next/link";
import { HeroStage, ProgramGrid, QuoteMark, SocialLinks } from "./site-components";

export default function Home() {
  return (
    <>
      <HeroStage />
      <main>
        <section className="intro section" aria-labelledby="intro-title">
          <div className="eyebrow">കേരളത്തിന്റെ സ്വന്തം സ്റ്റേജ് എന്റർടെയ്നർ</div>
          <div className="intro-grid">
            <h2 id="intro-title">ഓരോ വേദിക്കും<br /><em>സ്വന്തം താളം.</em></h2>
            <div>
              <p className="lead">ചിരിയും മിമിക്രിയും സംഗീതവും ചേർന്ന, കുടുംബസൗഹൃദമായ ലൈവ് എന്റർടെയിൻമെന്റ്. കോളേജ് ക്യാംപസ് മുതൽ കോർപ്പറേറ്റ് വേദിവരെ — നിങ്ങളുടെ പ്രേക്ഷകർക്ക് ഓർമയിൽ നിൽക്കുന്നൊരു രാത്രി.</p>
              <Link className="text-link" href="/about">Arun-നെ പരിചയപ്പെടാം <span>↗</span></Link>
            </div>
          </div>
        </section>

        <section className="section programs-preview" aria-labelledby="programs-title">
          <div className="section-heading">
            <div><span className="eyebrow">പ്രോഗ്രാമുകൾ</span><h2 id="programs-title">ഒരു വേദി. <em>ഒട്ടേറെ ഭാവങ്ങൾ.</em></h2></div>
            <Link className="outline-button" href="/programs">എല്ലാം കാണുക</Link>
          </div>
          <ProgramGrid limit={6} />
        </section>

        <section className="showreel section" aria-label="Featured show">
          <div className="showreel-card">
            <div className="showreel-light" />
            <div className="showreel-copy">
              <span className="eyebrow light">Featured act</span>
              <h2>One Man Show</h2>
              <p>ഒരു കലാകാരൻ. നിരവധി കഥാപാത്രങ്ങൾ. നിർത്താതെ ചിരിപ്പിക്കുന്ന അനുഭവം.</p>
              <Link href="/videos" className="play-link"><span className="play-button">▶</span> വീഡിയോകൾ കാണുക</Link>
            </div>
            <div className="performer-silhouette" aria-hidden="true"><span /></div>
          </div>
        </section>

        <section className="testimonial-home section">
          <QuoteMark />
          <blockquote>“പരിപാടിയുടെ ആദ്യ മിനിറ്റ് മുതൽ അവസാന നിമിഷം വരെ പ്രേക്ഷകരെ പിടിച്ചിരുത്തുന്ന അവതരണം.”</blockquote>
          <p className="quote-credit">— സംഘാടകന്റെ അഭിപ്രായം ഇവിടെ ചേർക്കുക</p>
          <Link href="/testimonials" className="text-link">കൂടുതൽ അഭിപ്രായങ്ങൾ <span>↗</span></Link>
        </section>

        <section className="booking-strip section">
          <div><span className="eyebrow light">നിങ്ങളുടെ വേദി തയ്യാറാണോ?</span><h2>ചിരി തുടങ്ങട്ടെ.</h2></div>
          <div className="booking-actions">
            <Link className="button button-light" href="/contact">Book Arun Now</Link>
            <SocialLinks compact />
          </div>
        </section>
      </main>
    </>
  );
}
