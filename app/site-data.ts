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
  { href: "/", label: "Home" },
  { href: "/proof", label: "Performances" },
  { href: "/shows", label: "Shows" },
  { href: "/artist", label: "About" },
];

export const stats = [
  { value: "6", label: "Official videos", source: "Arun Guinness official video archive" },
  { value: "4", label: "Regions", source: "Kerala · Kuwait · UAE · Oman" },
  { value: "2+", label: "TV stages", source: "Flowers TV · Kairali TV" },
] as const;

export const programs: readonly ShowFormat[] = [
  { number: "01", slug: "one-man-show", title: "One Man Show", duration: "90 min", description: "Voices, music, mimicry—one artist.", bestFor: "Festivals · Associations", inclusions: ["Male + female voices", "Music + comedy", "Audience interaction", "Flexible languages"], production: "Headline show. Adaptable running order.", proofVideoId: "e66PF3ImXIQ" },
  { number: "02", slug: "variety-musical", title: "Variety Musical", duration: "Flexible", description: "A flexible, music-led set.", bestFor: "Corporate · Campus", inclusions: ["Flexible time", "Voice transformations", "Event comedy", "Adaptive pace"], production: "Built around audience and stage time.", proofVideoId: "7FufHDMK8Xw" },
  { number: "03", slug: "mega-show", title: "Mega Show", duration: "2–3 hours", description: "Full cast. Festival energy.", bestFor: "Festivals · Gulf events", inclusions: ["Expanded cast", "Full-show arc", "Large-stage energy", "Custom production"], production: "Scale, variety, long-form energy.", proofVideoId: "LcwIFf_3A34" },
  { number: "04", slug: "guest-performance", title: "Guest Performance", duration: "Custom", description: "A compact signature appearance.", bestFor: "Schools · Brands", inclusions: ["Signature voices", "Compact setup", "Agenda-friendly", "Guest moment"], production: "Fits cleanly into an existing programme.", proofVideoId: "CJiPfOPfbBY" },
] as const;

export const videos: readonly Performance[] = [
  { id: "e66PF3ImXIQ", title: "Two voices. One performer.", subtitle: "Male ↔ female", category: "Signature" },
  { id: "P1jg8u0ldbs", title: "S. Janaki voice", subtitle: "Playback voice", category: "Voice" },
  { id: "7FufHDMK8Xw", title: "Flowers stage", subtitle: "Television", category: "Television" },
  { id: "LcwIFf_3A34", title: "Kuwait live", subtitle: "International", category: "International" },
  { id: "CJiPfOPfbBY", title: "Association live", subtitle: "Community", category: "Live" },
  { id: "V-n8_vxB0yc", title: "Onam · Kuwait", subtitle: "Festival", category: "International" },
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
  { number: "01", title: "Melody", text: "Male ↔ female." },
  { number: "02", title: "Voice", text: "Listen. Control. Transform." },
  { number: "03", title: "Timing", text: "Comedy + audience instinct." },
  { number: "04", title: "Sound", text: "Engineering precision." },
] as const;

export const mediaLogos = ["Flowers TV", "Kairali TV"] as const;

export const milestones: readonly Milestone[] = [
  { year: "2000s", title: "Sound foundation", text: "Engineering sharpened the ear." },
  { year: "Television", title: "Broadcast stages", text: "Flowers TV. Kairali TV." },
  { year: "2024–25", title: "International stages", text: "Kuwait + Kerala records." },
  { year: "Today", title: "Kerala → Gulf", text: "Kerala. Kuwait. Oman. UAE." },
] as const;

export const proofItems: readonly ProofItem[] = [
  { title: "Kuwait · Onavesham 2024", text: "Female register. Medleys. Live vocals.", href: "https://www.indiansinkuwait.com/news/70618-IAK-Onavesham-2024-A-Grand-Celebration-of-Onam-at-ICSK-School-Salmiya", label: "Public coverage" },
  { title: "SFS Public School", text: "Featured 30-minute performance · 2025.", href: "https://sfspublicschool.com/carpe-diem-a-celebration-of-talent-and-spirit/", label: "Institutional record" },
  { title: "Flowers · Comedy Utsavam", text: "Official television performance.", href: "https://www.youtube.com/watch?v=3vXZZvHX208", label: "Official source" },
] as const;

export const stageNotes = [
  { quote: "Captivating the audience with a spectacular 30-minute performance.", source: "SFS Public School · Carpe Diem 2025", href: "https://sfspublicschool.com/carpe-diem-a-celebration-of-talent-and-spirit/" },
  { quote: "From melodic femininity to dynamic medleys and powerful vocals.", source: "Indians in Kuwait · Onavesham 2024", href: "https://www.indiansinkuwait.com/news/70618-IAK-Onavesham-2024-A-Grand-Celebration-of-Onam-at-ICSK-School-Salmiya" },
  { quote: "Well-known artist Arun Guinness.", source: "Times Kuwait · Onavesham 2024", href: "https://timeskuwait.com/idukki-association-kuwait-gears-up-for-onam-2024-celebration/" },
] as const;

export const faqs = [
  { question: "What is different?", answer: "Male + female playback voices, sung live—with music, mimicry and interaction." },
  { question: "Which events?", answer: "Corporate, festivals, campuses, associations, celebrations and international stages." },
  { question: "Customizable?", answer: "Yes—time, cast, languages and tone." },
  { question: "Check availability?", answer: "WhatsApp date, city, audience and format." },
] as const;

const standardDefinitionThumbnails = new Set(["7FufHDMK8Xw", "LcwIFf_3A34"]);
export const youtubeThumbnail = (id: string) => `https://i.ytimg.com/vi/${id}/${standardDefinitionThumbnails.has(id) ? "hqdefault" : "maxresdefault"}.jpg`;
export const youtubeUrl = (id: string) => `https://www.youtube.com/watch?v=${id}`;
