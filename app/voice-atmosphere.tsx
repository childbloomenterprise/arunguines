export function VoiceAtmosphere() {
  return (
    <div className="voice-atmosphere" aria-hidden="true">
      <svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" focusable="false">
        <defs>
          <linearGradient id="voice-ribbon-gradient" x1="0" y1="0" x2="1" y2="0">
            <stop className="voice-stop-cool" offset="0" />
            <stop className="voice-stop-violet" offset=".52" />
            <stop className="voice-stop-warm" offset="1" />
          </linearGradient>
          <linearGradient id="voice-string-gradient" x1="0" y1="0" x2="1" y2="0">
            <stop className="voice-stop-warm" offset="0" />
            <stop className="voice-stop-cool" offset=".5" />
            <stop className="voice-stop-violet" offset="1" />
          </linearGradient>
        </defs>

        <g className="voice-ribbons">
          <path className="voice-ribbon voice-ribbon-primary" d="M-120 205C170 22 330 344 620 176S1090 39 1560 248" />
          <path className="voice-ribbon voice-ribbon-echo" d="M-90 668C224 497 416 822 745 651S1195 514 1535 706" />
        </g>

        <g className="singing-strings">
          <path className="singing-string singing-string-one" d="M-70 425C185 358 332 510 585 432S1022 351 1510 442" />
          <path className="singing-string singing-string-two" d="M-70 442C185 375 332 527 585 449S1022 368 1510 459" />
          <path className="singing-string singing-string-three" d="M-70 459C185 392 332 544 585 466S1022 385 1510 476" />
        </g>

        <g className="resonance resonance-left">
          <circle cx="108" cy="694" r="42" />
          <circle cx="108" cy="694" r="79" />
          <circle cx="108" cy="694" r="119" />
        </g>
        <g className="resonance resonance-right">
          <circle cx="1324" cy="190" r="44" />
          <circle cx="1324" cy="190" r="83" />
          <circle cx="1324" cy="190" r="126" />
        </g>

        <g className="voice-particles">
          <circle className="voice-particle particle-one" cx="238" cy="142" r="4" />
          <circle className="voice-particle particle-two" cx="842" cy="128" r="3" />
          <circle className="voice-particle particle-three" cx="1138" cy="608" r="4" />
          <circle className="voice-particle particle-four" cx="454" cy="705" r="3" />
        </g>
      </svg>
    </div>
  );
}
