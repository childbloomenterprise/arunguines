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
export function Whatsapp(props: IconProps) { return <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}><path d="M20.52 3.48A11.86 11.86 0 0 0 12.08 0C5.54 0 .22 5.32.22 11.87c0 2.1.55 4.15 1.6 5.95L.12 24l6.35-1.66a11.84 11.84 0 0 0 5.61 1.43h.01c6.54 0 11.87-5.32 11.87-11.87 0-3.17-1.23-6.14-3.44-8.42Zm-8.44 18.3c-1.7 0-3.36-.46-4.8-1.33l-.34-.2-3.77.99 1.01-3.67-.22-.37a9.84 9.84 0 0 1-1.51-5.25c0-5.44 4.42-9.86 9.87-9.86 2.63 0 5.1 1.03 6.96 2.9a9.79 9.79 0 0 1 2.89 6.96c0 5.44-4.42 9.86-9.88 9.86h-.01Zm5.41-7.39c-.3-.15-1.78-.88-2.06-.98-.28-.1-.48-.15-.69.15-.2.3-.79.98-.97 1.18-.18.2-.36.23-.66.08-.3-.15-1.27-.47-2.42-1.5a9.06 9.06 0 0 1-1.68-2.09c-.18-.3-.02-.46.13-.6.13-.13.3-.36.45-.54.15-.18.2-.3.3-.5.1-.2.05-.38-.03-.53-.08-.15-.69-1.65-.94-2.27-.25-.59-.5-.51-.69-.52h-.59c-.2 0-.53.08-.8.38-.28.3-1.05 1.03-1.05 2.5s1.07 2.9 1.22 3.1c.15.2 2.1 3.2 5.09 4.49.71.3 1.27.48 1.7.62.72.23 1.37.2 1.88.12.57-.08 1.78-.73 2.03-1.43.25-.7.25-1.3.18-1.43-.08-.12-.28-.2-.58-.35Z" /></svg>; }
export function Facebook(props: IconProps) { return <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}><path d="M13.7 21v-8h2.7l.4-3.1h-3.1v-2c0-.9.3-1.5 1.6-1.5H17V3.6c-.8-.1-1.6-.2-2.4-.2-2.4 0-4.1 1.5-4.1 4.2v2.3H7.8V13h2.7v8h3.2Z" /></svg>; }
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
