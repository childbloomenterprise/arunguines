import type { ReactNode, SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function IconBase({ children, ...props }: IconProps & { children: ReactNode }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      {children}
    </svg>
  );
}

export function VoiceMark(props: IconProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" {...props}>
      <circle cx="16" cy="16" r="15" stroke="currentColor" strokeOpacity=".28" />
      <path d="M7 17h2.5l1.6-5.5 2.8 10 3.2-14 2.6 11.5 1.8-5.2 1.5 3.2H25" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="25" cy="17" r="1.5" fill="currentColor" />
    </svg>
  );
}

export function ArrowUpRight(props: IconProps) { return <IconBase {...props}><path d="M7 17 17 7M7 7h10v10" /></IconBase>; }
export function ArrowRight(props: IconProps) { return <IconBase {...props}><path d="M5 12h14M13 6l6 6-6 6" /></IconBase>; }
export function Play(props: IconProps) { return <IconBase {...props}><path d="m9 7 8 5-8 5V7Z" /></IconBase>; }
export function Menu(props: IconProps) { return <IconBase {...props}><path d="M4 8h16M4 16h16" /></IconBase>; }
export function Close(props: IconProps) { return <IconBase {...props}><path d="m6 6 12 12M18 6 6 18" /></IconBase>; }
export function Phone(props: IconProps) { return <IconBase {...props}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.69 2.8a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.33 1.85.56 2.81.69A2 2 0 0 1 22 16.92Z" /></IconBase>; }
export function Message(props: IconProps) { return <IconBase {...props}><path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v8Z" /><path d="M8 9h8M8 13h5" /></IconBase>; }
export function Instagram(props: IconProps) { return <IconBase {...props}><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><path d="M17.5 6.5h.01" /></IconBase>; }
export function Youtube(props: IconProps) { return <IconBase {...props}><path d="M21.6 7.2a2.5 2.5 0 0 0-1.76-1.77C18.3 5 12 5 12 5s-6.3 0-7.84.43A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.76 1.77C5.7 19 12 19 12 19s6.3 0 7.84-.43a2.5 2.5 0 0 0 1.76-1.77A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8Z" /><path d="m10 15 5-3-5-3v6Z" /></IconBase>; }
export function Mail(props: IconProps) { return <IconBase {...props}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></IconBase>; }
export function MapPin(props: IconProps) { return <IconBase {...props}><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></IconBase>; }
export function Check(props: IconProps) { return <IconBase {...props}><path d="m5 12 4 4L19 6" /></IconBase>; }
export function ChevronLeft(props: IconProps) { return <IconBase {...props}><path d="m15 18-6-6 6-6" /></IconBase>; }
export function ChevronRight(props: IconProps) { return <IconBase {...props}><path d="m9 18 6-6-6-6" /></IconBase>; }
export function Replay(props: IconProps) { return <IconBase {...props}><path d="M3 12a9 9 0 1 0 3-6.7L3 8" /><path d="M3 3v5h5" /></IconBase>; }
export function Copy(props: IconProps) { return <IconBase {...props}><rect x="9" y="9" width="11" height="11" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></IconBase>; }
export function Plus(props: IconProps) { return <IconBase {...props}><path d="M12 5v14M5 12h14" /></IconBase>; }
export function Minus(props: IconProps) { return <IconBase {...props}><path d="M5 12h14" /></IconBase>; }
export function Microphone(props: IconProps) { return <IconBase {...props}><rect x="8" y="3" width="8" height="12" rx="4" /><path d="M5 11a7 7 0 0 0 14 0M12 18v3M8 21h8" /></IconBase>; }
export function Clock(props: IconProps) { return <IconBase {...props}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></IconBase>; }
export function People(props: IconProps) { return <IconBase {...props}><circle cx="9" cy="8" r="3" /><path d="M3 20v-2a6 6 0 0 1 12 0v2M16 5.5a3 3 0 0 1 0 5.8M17 14a5 5 0 0 1 4 4.9V20" /></IconBase>; }
export function Globe(props: IconProps) { return <IconBase {...props}><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" /></IconBase>; }
export function Television(props: IconProps) { return <IconBase {...props}><rect x="3" y="5" width="18" height="14" rx="3" /><path d="m9 2 3 3 3-3M9 10l6 3-6 3v-6Z" /></IconBase>; }
export function Sparkles(props: IconProps) { return <IconBase {...props}><path d="m12 3 1.2 3.8L17 8l-3.8 1.2L12 13l-1.2-3.8L7 8l3.8-1.2L12 3ZM5 14l.8 2.2L8 17l-2.2.8L5 20l-.8-2.2L2 17l2.2-.8L5 14ZM19 13l.7 1.8 1.8.7-1.8.7L19 18l-.7-1.8-1.8-.7 1.8-.7L19 13Z" /></IconBase>; }
export function SoundWave(props: IconProps) { return <IconBase {...props}><path d="M3 12h2M7 8v8M11 4v16M15 7v10M19 10v4M22 12h-1" /></IconBase>; }
export function Sliders(props: IconProps) { return <IconBase {...props}><path d="M4 7h6M14 7h6M4 17h10M18 17h2" /><circle cx="12" cy="7" r="2" /><circle cx="16" cy="17" r="2" /></IconBase>; }
export function Stage(props: IconProps) { return <IconBase {...props}><path d="M3 4h18v16H3zM8 4c0 5-2 8-5 10M16 4c0 5 2 8 5 10M8 20v-5h8v5" /></IconBase>; }
export function QuoteMark(props: IconProps) { return <IconBase {...props}><path d="M7 10H4a4 4 0 0 0 4 4v4H4v-4a8 8 0 0 1 8-8M17 10h-3a4 4 0 0 0 4 4v4h-4v-4a8 8 0 0 1 8-8" /></IconBase>; }
