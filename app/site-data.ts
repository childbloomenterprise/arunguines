export type NavItem = { href: string; label: string };

export type Performance = {
  id: string;
  title: string;
  subtitle: string;
  category: "Profile" | "Signature" | "Voice" | "Television" | "International" | "Live";
  poster?: {
    quality: YoutubeThumbnailQuality;
    fallbackQuality: YoutubeThumbnailQuality;
  };
};

export type YoutubeThumbnailQuality = "maxresdefault" | "hqdefault";

export type PortfolioPhoto = {
  src: string;
  alt: string;
  caption: string;
  category: "Live performance" | "Community event" | "Recognition" | "Portrait";
  collection: "School Programs" | "Stage Shows" | "Inaugurations" | "Invitations & Honours";
  orientation: "landscape" | "portrait";
  focalPoint?: string;
  sourcePage?: number;
};

export type StagePreset = {
  key: "campus" | "festival" | "corporate" | "guest";
  label: string;
  description: string;
  event: string;
  audience: string;
  duration: string;
  energy: number;
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
export type Milestone = { year: string; title: string; text: string; source: string; sourceUrl: string };
export type BookingDraft = { name: string; phone: string; show: string; date: string; country: string; location: string; event: string; audience: string; notes: string; source: string };

export const contact = {
  phoneDisplay: "+91 96567 12941",
  phone: "+919656712941",
  whatsapp: "https://wa.me/919656712941",
  instagram: "https://www.instagram.com/arun_guinness/",
  youtube: "https://www.youtube.com/@arunguinnes",
  facebook: "https://www.facebook.com/arunguinness",
  office: "Kochi, Kerala, India",
  officeMap: "https://www.google.com/maps/search/?api=1&query=Kochi%2C%20Kerala%2C%20India",
} as const;

export const navItems: readonly NavItem[] = [
  { href: "/#voices", label: "Videos" },
  { href: "/proof", label: "Portfolio" },
  { href: "/shows", label: "Shows" },
  { href: "/artist", label: "Arun" },
];

export const stats = [
  { value: "Voice shift", label: "Male ↔ female playback styles", source: "Official performance: Mere Dholna", sourceUrl: "https://www.youtube.com/watch?v=e66PF3ImXIQ" },
  { value: "Live craft", label: "Singing + mimicry", source: "Porukara school annual report", sourceUrl: "https://porukarajc.ac.in/cbse/ANNUALREPORT23.pdf" },
  { value: "TV stage", label: "Flowers performance archive", source: "Official channel recording", sourceUrl: "https://www.youtube.com/watch?v=7FufHDMK8Xw" },
  { value: "Gulf stage", label: "Kuwait event coverage", source: "Indians in Kuwait · Onavesham 2024", sourceUrl: "https://www.indiansinkuwait.com/news/70618-IAK-Onavesham-2024-A-Grand-Celebration-of-Onam-at-ICSK-School-Salmiya" },
] as const;

export const programs: readonly ShowFormat[] = [
  { number: "01", slug: "one-man-show", title: "One Man Show", duration: "90 min", description: "Dozens of voices, singing, mimicry, characters, comedy and audience interaction—performed live by one artist.", bestFor: "Festivals · Associations · Ticketed events", inclusions: ["Male and female playback voices", "Music, mimicry and clean comedy", "Audience interaction", "Flexible language mix"], production: "A complete headline experience with adaptable running order and technical plan.", proofVideoId: "e66PF3ImXIQ" },
  { number: "02", slug: "variety-musical", title: "Variety Musical", duration: "Flexible", description: "A high-energy blend of music, rapid voice transformations and live entertainment shaped around your audience.", bestFor: "Corporate · Campus · Cultural programs", inclusions: ["Custom running time", "Music-led voice transformations", "Event-specific comedy", "Audience-aware pacing"], production: "A modular format built around event agenda, audience profile and available stage time.", proofVideoId: "7FufHDMK8Xw" },
  { number: "03", slug: "mega-show", title: "Mega Show", duration: "2–3 hours", description: "Large-format production featuring Arun with additional singers, musicians and supporting performers.", bestFor: "Public festivals · Gulf events · Celebrations", inclusions: ["Expanded performance cast", "Full-show arc", "Large-stage energy", "Custom production planning"], production: "Best for large audiences where production scale, variety and a longer programme matter.", proofVideoId: "LcwIFf_3A34" },
  { number: "04", slug: "guest-performance", title: "Guest Performance", duration: "Custom", description: "Compact featured appearance for inaugurations, annual days, award nights and special occasions.", bestFor: "Schools · Institutions · Brand events", inclusions: ["Signature voice segment", "Compact stage setup", "Agenda-friendly timing", "Featured guest moment"], production: "Designed to enter an existing programme cleanly without taking over the full schedule.", proofVideoId: "CJiPfOPfbBY" },
] as const;

export const videos: readonly Performance[] = [
  { id: "e66PF3ImXIQ", title: "Two voices. One performer.", subtitle: "Male ↔ female voice transformation", category: "Signature" },
  { id: "P1jg8u0ldbs", title: "S. Janaki voice", subtitle: "Playback-singer voice impression", category: "Voice", poster: { quality: "hqdefault", fallbackQuality: "maxresdefault" } },
  { id: "7FufHDMK8Xw", title: "On the Flowers stage", subtitle: "Television performance · live voice craft", category: "Television" },
  { id: "LcwIFf_3A34", title: "Kuwait live stage", subtitle: "International show · full-room energy", category: "International" },
  { id: "CJiPfOPfbBY", title: "Malayali association live", subtitle: "Community stage · audience connection", category: "Live" },
  { id: "V-n8_vxB0yc", title: "Onam in Kuwait", subtitle: "Festival performance · Kerala to the Gulf", category: "International" },
] as const;

export const profileVideo: Performance = {
  id: "a0BScpW4hkA",
  title: "Arun Guinness profile film",
  subtitle: "Meet the artist and discover his performance journey",
  category: "Profile",
};

export const homepageVideos: readonly Performance[] = [
  {
    id: "36viUt4Fmgc",
    title: "Arun Guinness live",
    subtitle: "A performance highlight from Arun's official archive",
    category: "Live",
    poster: { quality: "hqdefault", fallbackQuality: "maxresdefault" },
  },
  {
    id: "_pK5XHgumAQ",
    title: "Echo singing",
    subtitle: "Live voice craft in performance",
    category: "Voice",
    poster: { quality: "hqdefault", fallbackQuality: "maxresdefault" },
  },
  ...videos.slice(0, 4),
];

export const featuredPerformances: readonly Performance[] = [videos[0], homepageVideos[0], videos[3]];

export const stagePortfolio: readonly PortfolioPhoto[] = [
  { src: "/portfolio/01-live-in-red.webp", alt: "Arun Guinness singing into a microphone in a red shirt during a live stage show", caption: "Stage show example · A close-audience live set built around songs, voice transformations and spontaneous connection.", category: "Live performance", collection: "Stage Shows", orientation: "landscape", focalPoint: "50% 40%" },
  { src: "/portfolio/13-school-audience-show.webp", alt: "Arun Guinness singing among a large group of schoolchildren", caption: "School programme · Arun takes the song into the audience during a student celebration.", category: "Community event", collection: "School Programs", orientation: "landscape", focalPoint: "55% 46%" },
  { src: "/portfolio/04-community-stage.webp", alt: "Collage of Arun Guinness performing with another singer and children on a community stage", caption: "Stage show example · Music, movement and audience participation shared across a community stage.", category: "Community event", collection: "Stage Shows", orientation: "portrait", focalPoint: "50% 45%" },
  { src: "/portfolio/12-onam-muscat-stage.webp", alt: "Arun Guinness performing at an Onam celebration in Muscat", caption: "International stage example · A featured Onam performance for the Malayali community in Muscat.", category: "Live performance", collection: "Stage Shows", orientation: "landscape", focalPoint: "50% 48%" },
  { src: "/portfolio/09-close-live-vocal.webp", alt: "Close view of Arun Guinness singing into a microphone in a red shirt", caption: "Stage show example · Voice craft in focus during a live vocal programme.", category: "Live performance", collection: "Stage Shows", orientation: "portrait", focalPoint: "63% 43%" },
  { src: "/portfolio/03-stage-in-yellow.webp", alt: "Arun Guinness speaking into a microphone under purple stage lights", caption: "Stage show example · Building a connection with the room between songs and impressions.", category: "Live performance", collection: "Stage Shows", orientation: "portrait", focalPoint: "50% 42%" },
  { src: "/portfolio/02-dhun-recognition.webp", alt: "Arun Guinness presenting a certificate during the DHUN 2024 prize distribution", caption: "Invited guest moment · Joining the DHUN 2024 prize distribution and celebrating its winners.", category: "Recognition", collection: "Invitations & Honours", orientation: "landscape", focalPoint: "50% 48%" },
  { src: "/portfolio/14-school-recognition.webp", alt: "Arun Guinness receiving a gift and handshake at a school programme", caption: "School programme · Recognition shared after a performance for students, staff and families.", category: "Recognition", collection: "School Programs", orientation: "landscape", focalPoint: "52% 48%" },
  { src: "/portfolio/07-school-honour.webp", alt: "Arun Guinness receiving a trophy at St Juliana's Public School", caption: "School programme · An honour presented at St. Juliana's Public School.", category: "Recognition", collection: "School Programs", orientation: "landscape", focalPoint: "50% 48%" },
  { src: "/portfolio/05-school-inauguration.webp", alt: "Arun Guinness joining a ceremonial lamp lighting at a school annual day", caption: "Inauguration · Joining the ceremonial lamp lighting that opens a school annual-day celebration.", category: "Community event", collection: "Inaugurations", orientation: "landscape", focalPoint: "50% 50%" },
  { src: "/portfolio/08-onam-inauguration.webp", alt: "Arun Guinness lighting a ceremonial lamp at an Onam celebration", caption: "Inauguration · Opening an Onam gathering with the traditional lamp-lighting ceremony.", category: "Community event", collection: "Inaugurations", orientation: "landscape", focalPoint: "50% 48%" },
  { src: "/portfolio/11-blue-blazer-stage.webp", alt: "Arun Guinness smiling with a microphone while wearing a blue blazer", caption: "Stage show example · A performance portrait between live voice moments.", category: "Portrait", collection: "Stage Shows", orientation: "landscape", focalPoint: "50% 42%" },
  { src: "/portfolio/06-blue-kurta-portrait.webp", alt: "Portrait of Arun Guinness smiling in a blue kurta at an outdoor event", caption: "Invited appearance · Arun arriving for a cultural programme and guest engagement.", category: "Portrait", collection: "Invitations & Honours", orientation: "portrait", focalPoint: "50% 35%" },
  { src: "/portfolio/10-performer-moment.webp", alt: "Arun Guinness taking a selfie with two fellow performers backstage", caption: "Invited appearance · A relaxed stage-side moment shared with fellow performers.", category: "Portrait", collection: "Invitations & Honours", orientation: "portrait", focalPoint: "50% 42%" },
  { src: "/portfolio/15-campus-inauguration.webp", alt: "Arun Guinness joining guests for a ceremonial lamp lighting on a school stage", caption: "Inauguration · Joining invited guests for the opening ceremony before a school celebration.", category: "Community event", collection: "Inaugurations", orientation: "landscape", sourcePage: 38 },
  { src: "/portfolio/16-crowd-celebration.webp", alt: "A large audience celebrating with Arun Guinness and guests in front of a school stage", caption: "School programme · A full student audience celebrating together in front of the stage.", category: "Community event", collection: "School Programs", orientation: "landscape", sourcePage: 43 },
  { src: "/portfolio/17-among-students.webp", alt: "Arun Guinness singing as he walks through a hall of students", caption: "School programme · Bringing a familiar song into the middle of the student audience.", category: "Community event", collection: "School Programs", orientation: "landscape", focalPoint: "59% 50%", sourcePage: 50 },
  { src: "/portfolio/18-night-stage.webp", alt: "Arun Guinness singing to an outdoor audience at an evening event", caption: "Outdoor stage example · A live performance after the evening lights come on.", category: "Live performance", collection: "Stage Shows", orientation: "landscape", focalPoint: "44% 50%", sourcePage: 74 },
  { src: "/portfolio/19-school-honour.webp", alt: "Arun Guinness receiving an award from a guest on a school stage", caption: "School programme · A recognition moment shared on the institution's stage.", category: "Recognition", collection: "School Programs", orientation: "landscape", sourcePage: 89 },
  { src: "/portfolio/20-school-crowd-performance.webp", alt: "Arun Guinness singing among smiling schoolchildren and guests", caption: "School programme · Students and guests become part of the performance around them.", category: "Community event", collection: "School Programs", orientation: "landscape", focalPoint: "52% 52%", sourcePage: 94 },
  { src: "/portfolio/21-campus-microphone.webp", alt: "Arun Guinness speaking and singing at a school event microphone", caption: "School programme · A voice-led performance moment shaped for a campus audience.", category: "Live performance", collection: "School Programs", orientation: "landscape", sourcePage: 97 },
  { src: "/portfolio/22-student-voice-moment.webp", alt: "Arun Guinness singing in the middle of a cheering student audience", caption: "School programme · A familiar melody carried through a hall of cheering students.", category: "Community event", collection: "School Programs", orientation: "landscape", sourcePage: 99 },
  { src: "/portfolio/23-school-auditorium.webp", alt: "Arun Guinness facing a full school auditorium from the stage", caption: "School programme · A full auditorium seen from the performer's side of the stage.", category: "Live performance", collection: "School Programs", orientation: "landscape", sourcePage: 100 },
  { src: "/portfolio/24-guest-appreciation.webp", alt: "Arun Guinness receiving a commemorative gift from a guest at an event", caption: "Invited guest moment · A featured appearance marked with a commemorative presentation.", category: "Recognition", collection: "Invitations & Honours", orientation: "landscape", sourcePage: 102 },
  { src: "/portfolio/25-institutional-recognition.webp", alt: "Arun Guinness receiving a commemorative plaque from a school representative", caption: "Invited guest moment · An institutional honour presented after the programme.", category: "Recognition", collection: "Invitations & Honours", orientation: "landscape", sourcePage: 112 },
] as const;

export const eventExperiences = [
  { title: "A little closer to home.", label: "Malayali associations", event: "Malayali association", text: "Familiar songs and voices. A shared evening for your community, wherever home is now." },
  { title: "Your celebration. Turned up.", label: "Onam + cultural festivals", event: "Onam / cultural festival", text: "Bring live music, voice transformations and audience interaction into your cultural programme." },
  { title: "Every generation. Together.", label: "Family + community gatherings", event: "Family / community gathering", text: "Music and entertainment for a room full of different ages, memories and favourite songs." },
] as const;

export const bookingSteps = [
  { title: "Tell us about your event", text: "Start with your occasion and location. Still exploring dates or formats? That is fine." },
  { title: "Shape the evening together", text: "Discuss your audience, music, running time and production needs directly on WhatsApp." },
  { title: "Confirm the details", text: "Availability, pricing, travel and technical arrangements are agreed before a booking is confirmed." },
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

export const mediaEvidence = [
  { label: "Flowers TV", href: "https://www.youtube.com/watch?v=7FufHDMK8Xw" },
  { label: "SFS Public School", href: "https://sfspublicschool.com/carpe-diem-a-celebration-of-talent-and-spirit/" },
  { label: "Indians in Kuwait", href: "https://www.indiansinkuwait.com/news/70618-IAK-Onavesham-2024-A-Grand-Celebration-of-Onam-at-ICSK-School-Salmiya" },
] as const;

export const stagePresets: readonly StagePreset[] = [
  { key: "campus", label: "Campus night", description: "Fast, musical and student-facing", event: "campus", audience: "250-1000", duration: "60-120", energy: 88 },
  { key: "festival", label: "Festival headline", description: "Large-room variety and scale", event: "public-festival", audience: "1000-plus", duration: "over-120", energy: 100 },
  { key: "corporate", label: "Corporate room", description: "Polished, paced and agenda-aware", event: "corporate", audience: "250-1000", duration: "60-120", energy: 72 },
  { key: "guest", label: "Guest moment", description: "Compact signature appearance", event: "inauguration", audience: "under-250", duration: "under-30", energy: 54 },
] as const;

export const milestones: readonly Milestone[] = [
  { year: "Foundation", title: "A technical ear", text: "Electronics and sound-engineering study became the listening discipline behind Arun's live voice work.", source: "Published first-person profile", sourceUrl: "https://www.examchoices.in/2023/10/special-person-3-arun-guiness.html" },
  { year: "Television", title: "The voice reaches TV", text: "An official channel recording documents Arun performing his voice craft on the Flowers stage.", source: "Official Flowers performance recording", sourceUrl: "https://www.youtube.com/watch?v=7FufHDMK8Xw" },
  { year: "2024", title: "Kuwait stage documented", text: "Independent event coverage records Arun's featured Onavesham performance in Salmiya, Kuwait.", source: "Indians in Kuwait event coverage", sourceUrl: "https://www.indiansinkuwait.com/news/70618-IAK-Onavesham-2024-A-Grand-Celebration-of-Onam-at-ICSK-School-Salmiya" },
  { year: "2025", title: "A musical feast for students", text: "A school annual report records Arun Guinness appearing as a mimicry artist and presenting a musical performance.", source: "Martha Mariyam Public School annual report", sourceUrl: "https://marthamariyamschool.org/images/annual-report.pdf" },
] as const;

export const proofItems: readonly ProofItem[] = [
  { title: "Kuwait · Onavesham 2024", text: "Independent event coverage documented Arun's voice range, medleys and live vocals.", href: "https://www.indiansinkuwait.com/news/70618-IAK-Onavesham-2024-A-Grand-Celebration-of-Onam-at-ICSK-School-Salmiya", label: "Independent event coverage" },
  { title: "SFS Public School", text: "Arun inaugurated Carpe Diem and delivered a featured live performance for students and families.", href: "https://sfspublicschool.com/carpe-diem-a-celebration-of-talent-and-spirit/", label: "Institutional record" },
  { title: "Flowers · Comedy Utsavam", text: "Indexed television performances connect Arun directly with Kerala's live entertainment stage.", href: "https://www.youtube.com/watch?v=3vXZZvHX208", label: "Official performance source" },
] as const;

export const faqs = [
  { question: "Can we enquire before choosing a date or show?", answer: "Yes. Share your occasion, country and city to start the conversation. Choose ‘Date not decided’ or ‘Help me choose’ when you are still planning." },
  { question: "Can we book Arun for an overseas event?", answer: "Enquiries are welcome from Malayali associations and event organisers worldwide. Availability, travel, accommodation and any visa arrangements are discussed for your event before confirmation." },
  { question: "Can we discuss songs and the language mix?", answer: "Share your audience’s favourite songs and preferred languages with the booking enquiry. The repertoire and language mix can be discussed around the gathering." },
  { question: "How long is the show, and what equipment is needed?", answer: "Running time depends on the format and your programme. Share the venue, audience size and stage facilities so sound, microphones and production requirements can be agreed together." },
  { question: "Does sending an enquiry confirm a booking?", answer: "No. The enquiry starts a conversation. Your date, price, travel and production arrangements must be confirmed directly before the booking is agreed." },
  { question: "What makes Arun's show different?", answer: "He sings in the styles and voices of male and female playback singers, then combines that craft with comedy, characters and audience interaction." },
  { question: "Which events can he perform at?", answer: "Corporate events, festivals, colleges, schools, associations, annual days, inaugurations, private celebrations and international programmes." },
  { question: "Can the show be customized?", answer: "Yes. Duration, supporting artists, language mix and tone can be adjusted around venue, audience and production schedule." },
  { question: "How do we check availability?", answer: "Send event date, city, audience type and preferred format through WhatsApp. Arun's team can then confirm availability and requirements." },
] as const;

const standardDefinitionThumbnails = new Set(["7FufHDMK8Xw", "LcwIFf_3A34"]);
export const youtubeThumbnail = (id: string, quality?: YoutubeThumbnailQuality) => `https://i.ytimg.com/vi/${id}/${quality ?? (standardDefinitionThumbnails.has(id) ? "hqdefault" : "maxresdefault")}.jpg`;
export function youtubePosterSources(id: string, poster?: Performance["poster"]): readonly string[] {
  const primaryQuality = poster?.quality ?? (standardDefinitionThumbnails.has(id) ? "hqdefault" : "maxresdefault");
  const fallbackQuality = poster?.fallbackQuality ?? (primaryQuality === "maxresdefault" ? "hqdefault" : "maxresdefault");
  return [youtubeThumbnail(id, primaryQuality), youtubeThumbnail(id, fallbackQuality)];
}
export const youtubeUrl = (id: string) => `https://www.youtube.com/watch?v=${id}`;
