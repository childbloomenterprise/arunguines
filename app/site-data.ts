export type NavItem = { href: string; label: string };

export type Performance = {
  id: string;
  title: string;
  subtitle: string;
  category: "Signature" | "Voice" | "Television" | "International" | "Live";
};

export type ShowFormat = {
  number: string;
  slug: "one-man-show" | "variety-musical" | "mega-show" | "guest-performance";
  title: string;
  duration: string;
  description: string;
  bestFor: string;
  inclusions: readonly string[];
  production: string;
  proofVideoId: string;
};

export type ProofItem = { title: string; text: string; href: string; label: string };
export type Milestone = { year: string; title: string; text: string; source?: string };
export type BookingDraft = { name: string; phone: string; show: string; date: string; location: string; event: string; audience: string; notes: string };

export const contact = {
  phoneDisplay: "+91 96567 12941",
  phone: "+919656712941",
  email: "arunguinnes@gmail.com",
  whatsapp: "https://wa.me/919656712941",
  instagram: "https://www.instagram.com/arun_guinness/",
  youtube: "https://www.youtube.com/@arunguinnes",
  facebook: "https://www.facebook.com/arunguinness",
  office: "Kothamangalam, Kerala, India",
  officeMap: "https://www.google.com/maps/search/?api=1&query=Kothamangalam%2C%20Kerala%2C%20India",
} as const;

export const navItems: readonly NavItem[] = [
  { href: "/shows", label: "Shows" },
  { href: "/artist", label: "Artist" },
  { href: "/proof", label: "Proof" },
  { href: "/book", label: "Book" },
];

export const stats = [
  { value: "~20", label: "Years on stage", source: "Published 2023 professional profile" },
  { value: "3,000+", label: "Live performances*", source: "Published 2023 professional profile; final reconfirmation pending" },
  { value: "50+", label: "Countries reached*", source: "Published 2023 professional profile; final reconfirmation pending" },
  { value: "35+", label: "Singer voices*", source: "Published repertoire and official performance archive" },
] as const;

export const programs: readonly ShowFormat[] = [
  { number: "01", slug: "one-man-show", title: "One Man Show", duration: "90 min", description: "Dozens of voices, singing, mimicry, characters, comedy and audience interaction—performed live by one artist.", bestFor: "Festivals · Associations · Ticketed events", inclusions: ["Male and female playback voices", "Music, mimicry and clean comedy", "Audience interaction", "Flexible language mix"], production: "A complete headline experience with adaptable running order and technical plan.", proofVideoId: "e66PF3ImXIQ" },
  { number: "02", slug: "variety-musical", title: "Variety Musical", duration: "Flexible", description: "A high-energy blend of music, rapid voice transformations and live entertainment shaped around your audience.", bestFor: "Corporate · Campus · Cultural programs", inclusions: ["Custom running time", "Music-led voice transformations", "Event-specific comedy", "Audience-aware pacing"], production: "A modular format built around event agenda, audience profile and available stage time.", proofVideoId: "7FufHDMK8Xw" },
  { number: "03", slug: "mega-show", title: "Mega Show", duration: "2–3 hours", description: "Large-format production featuring Arun with additional singers, musicians and supporting performers.", bestFor: "Public festivals · Gulf events · Celebrations", inclusions: ["Expanded performance cast", "Full-show arc", "Large-stage energy", "Custom production planning"], production: "Best for large audiences where production scale, variety and a longer programme matter.", proofVideoId: "LcwIFf_3A34" },
  { number: "04", slug: "guest-performance", title: "Guest Performance", duration: "Custom", description: "Compact featured appearance for inaugurations, annual days, award nights and special occasions.", bestFor: "Schools · Institutions · Brand events", inclusions: ["Signature voice segment", "Compact stage setup", "Agenda-friendly timing", "Featured guest moment"], production: "Designed to enter an existing programme cleanly without taking over the full schedule.", proofVideoId: "CJiPfOPfbBY" },
] as const;

export const videos: readonly Performance[] = [
  { id: "e66PF3ImXIQ", title: "Two voices. One performer.", subtitle: "Male ↔ female voice transformation", category: "Signature" },
  { id: "P1jg8u0ldbs", title: "S. Janaki voice", subtitle: "Playback-singer voice impression", category: "Voice" },
  { id: "7FufHDMK8Xw", title: "On the Flowers stage", subtitle: "Television performance · live voice craft", category: "Television" },
  { id: "LcwIFf_3A34", title: "Kuwait live stage", subtitle: "International show · full-room energy", category: "International" },
  { id: "CJiPfOPfbBY", title: "Malayali association live", subtitle: "Community stage · audience connection", category: "Live" },
  { id: "V-n8_vxB0yc", title: "Onam in Kuwait", subtitle: "Festival performance · Kerala to the Gulf", category: "International" },
] as const;

export const voiceRoster = [
  { name: "S. Janaki", register: "Playback classic", language: "Malayalam · Tamil", photo: "/voices/s-janaki.jpg", position: "50% 38%", source: "https://commons.wikimedia.org/wiki/File:S_Janaki_in_Pune,_India_2007.JPG" },
  { name: "P. Susheela", register: "Golden-era melody", language: "Malayalam · Tamil", photo: "/voices/p-susheela.jpg", position: "50% 35%", source: "https://commons.wikimedia.org/wiki/File:P._Susheela.jpg" },
  { name: "Vani Jairam", register: "Classical colour", language: "Malayalam · Hindi", photo: "/voices/vani-jairam.jpg", position: "50% 32%", source: "https://commons.wikimedia.org/wiki/File:Vani_Jairam_2014_FF_(cropped).jpg" },
  { name: "K. S. Chithra", register: "Lyrical soprano", language: "Malayalam · Tamil", photo: "/voices/ks-chithra.jpg", position: "50% 32%", source: "https://commons.wikimedia.org/wiki/File:Melody_Queen_of_Indian_Cinema_Dr._K_S_Chithra_(cropped).jpg" },
  { name: "Vineeth Sreenivasan", register: "Contemporary male", language: "Malayalam", photo: "/voices/vineeth-sreenivasan.jpg", position: "50% 32%", source: "https://commons.wikimedia.org/wiki/File:Vineeth_Sreenivasan_Aravindante_Athidhikal.jpg" },
  { name: "Jassie Gift", register: "Rhythmic character", language: "Malayalam", photo: "/voices/jassie-gift.jpg", position: "50% 25%", source: "https://commons.wikimedia.org/wiki/File:Singer_Jassie_Gift_3.jpg" },
  { name: "Adnan Sami", register: "Textured baritone", language: "Hindi", photo: "/voices/adnan-sami.jpg", position: "50% 28%", source: "https://commons.wikimedia.org/wiki/File:Adnan_Sami_in_2016.jpg" },
  { name: "Arijit Singh", register: "Modern playback", language: "Hindi", photo: "/voices/arijit-singh.jpg", position: "50% 22%", source: "https://commons.wikimedia.org/wiki/File:Arijit_Singh_performance_at_Chandigarh_2025.jpg" },
] as const;

export const artistModes = [
  { number: "01", title: "Melody", text: "Live singing that moves naturally between male and female registers." },
  { number: "02", title: "Voice", text: "Playback signatures recreated through listening, control and character." },
  { number: "03", title: "Timing", text: "Mimicry, clean comedy and audience instinct shaped for each room." },
  { number: "04", title: "Sound", text: "Electronics and audio-engineering discipline behind every performance." },
] as const;

export const mediaLogos = ["Flowers TV", "Kairali TV", "Asianet", "Surya TV", "Mazhavil Manorama", "Reporter Live"] as const;

export const milestones: readonly Milestone[] = [
  { year: "2000s", title: "Sound becomes foundation", text: "Electronics and sound-engineering training formed the technical base for a life in music." },
  { year: "2014", title: "Best Mimicry Artist", text: "Rotary recognition reported in Arun's published professional profile.", source: "Certificate wording pending final verification" },
  { year: "2019", title: "Record milestone", text: "A voice-imitation record achievement publicly documented by Arun.", source: "Guinness certificate verification pending" },
  { year: "Now", title: "Across borders", text: "Documented performances across Kerala, Kuwait, Oman and the UAE." },
] as const;

export const proofItems: readonly ProofItem[] = [
  { title: "Kuwait · Onavesham 2024", text: "Independent event coverage documented Arun's voice range, medleys and live vocals.", href: "https://www.indiansinkuwait.com/news/70618-IAK-Onavesham-2024-A-Grand-Celebration-of-Onam-at-ICSK-School-Salmiya", label: "Independent event coverage" },
  { title: "SFS Public School", text: "Arun inaugurated Carpe Diem and delivered a featured live performance for students and families.", href: "https://sfspublicschool.com/carpe-diem-a-celebration-of-talent-and-spirit/", label: "Institutional record" },
  { title: "Flowers · Comedy Utsavam", text: "Indexed television performances connect Arun directly with Kerala's live entertainment stage.", href: "https://www.youtube.com/watch?v=3vXZZvHX208", label: "Official performance source" },
] as const;

export const faqs = [
  { question: "What makes Arun's show different?", answer: "He sings in the styles and voices of male and female playback singers, then combines that craft with comedy, characters and audience interaction." },
  { question: "Which events can he perform at?", answer: "Corporate events, festivals, colleges, schools, associations, annual days, inaugurations, private celebrations and international programmes." },
  { question: "Can the show be customized?", answer: "Yes. Duration, supporting artists, language mix and tone can be adjusted around venue, audience and production schedule." },
  { question: "How do we check availability?", answer: "Send event date, city, audience type and preferred format through WhatsApp. Arun's team can then confirm availability and requirements." },
] as const;

const standardDefinitionThumbnails = new Set(["7FufHDMK8Xw", "LcwIFf_3A34"]);
export const youtubeThumbnail = (id: string) => `https://i.ytimg.com/vi/${id}/${standardDefinitionThumbnails.has(id) ? "hqdefault" : "maxresdefault"}.jpg`;
export const youtubeUrl = (id: string) => `https://www.youtube.com/watch?v=${id}`;
