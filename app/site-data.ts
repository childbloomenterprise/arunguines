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
};

export const navItems = [
  { href: "/programs", label: "Live" },
  { href: "/videos", label: "Voices" },
  { href: "/about", label: "Artist" },
  { href: "/contact", label: "Book" },
];

export const stats = [
  { value: "~20", label: "Years on stage" },
  { value: "3,000+", label: "Live performances*" },
  { value: "50+", label: "Countries reached*" },
  { value: "35+", label: "Singer voices*" },
];

export const programs = [
  {
    number: "01",
    title: "One Man Show",
    duration: "90 min",
    description: "Dozens of voices, singing, mimicry, characters, comedy and audience interaction—performed live by one artist.",
    bestFor: "Festivals · Associations · Ticketed events",
  },
  {
    number: "02",
    title: "Variety Musical",
    duration: "Flexible",
    description: "A high-energy blend of music, rapid voice transformations and live entertainment shaped around your audience.",
    bestFor: "Corporate · Campus · Cultural programs",
  },
  {
    number: "03",
    title: "Mega Show",
    duration: "2–3 hours",
    description: "Large-format production featuring Arun with additional singers, musicians and supporting performers.",
    bestFor: "Public festivals · Gulf events · Celebrations",
  },
  {
    number: "04",
    title: "Guest Performance",
    duration: "Custom",
    description: "Compact featured appearance for inaugurations, annual days, award nights and special occasions.",
    bestFor: "Schools · Institutions · Brand events",
  },
];

export const videos = [
  {
    id: "e66PF3ImXIQ",
    title: "Two voices. One performer.",
    subtitle: "Male ↔ female voice transformation",
    category: "Signature act",
  },
  {
    id: "6OQvkHQJ2LU",
    title: "Echo Singing",
    subtitle: "Live vocal illusion · Comedy Utsavam",
    category: "Television",
  },
  {
    id: "P1jg8u0ldbs",
    title: "S. Janaki voice",
    subtitle: "Playback-singer voice impression",
    category: "Voice artistry",
  },
  {
    id: "36viUt4Fmgc",
    title: "Vineeth Sreenivasan",
    subtitle: "A familiar voice, recreated live",
    category: "Voice artistry",
  },
  {
    id: "bJSqjrq2rJk",
    title: "Live in Muscat",
    subtitle: "International variety stage performance",
    category: "International",
  },
  {
    id: "a0BScpW4hkA",
    title: "The Arun Guinness story",
    subtitle: "Profile, recognition and journey",
    category: "Artist profile",
  },
];

export const voiceRoster = [
  { name: "S. Janaki", register: "Playback classic", language: "Malayalam · Tamil" },
  { name: "P. Susheela", register: "Golden-era melody", language: "Malayalam · Tamil" },
  { name: "Vani Jairam", register: "Classical colour", language: "Malayalam · Hindi" },
  { name: "K. S. Chithra", register: "Lyrical soprano", language: "Malayalam · Tamil" },
  { name: "Vineeth Sreenivasan", register: "Contemporary male", language: "Malayalam" },
  { name: "Jassie Gift", register: "Rhythmic character", language: "Malayalam" },
  { name: "Adnan Sami", register: "Textured baritone", language: "Hindi" },
  { name: "Arijit Singh", register: "Modern playback", language: "Hindi" },
];

export const artistModes = [
  { number: "01", title: "Singer", text: "Live melody across male and female registers." },
  { number: "02", title: "Voice artist", text: "Playback voices recreated through close listening and control." },
  { number: "03", title: "Mimicry performer", text: "Characters, timing and clean comedy built for a live room." },
  { number: "04", title: "Sound mind", text: "Electronics and audio-engineering roots behind every detail." },
];

export const mediaLogos = [
  "Flowers TV",
  "Kairali TV",
  "Asianet",
  "Surya TV",
  "Mazhavil Manorama",
  "Reporter Live",
];

export const milestones = [
  { year: "2000s", title: "Sound to stage", text: "Electronics and sound-engineering training became the technical base for a life in music." },
  { year: "2014", title: "Best Mimicry Artist", text: "Rotary recognition reported in Arun's published professional profile." },
  { year: "2019", title: "Record milestone", text: "A voice-imitation record achievement publicly documented by Arun; certificate verification pending." },
  { year: "Now", title: "Across borders", text: "Documented performances across Kerala, Kuwait, Oman and the UAE." },
];

export const faqs = [
  {
    question: "What makes Arun's show different?",
    answer: "He does not only imitate speaking voices—he sings in the styles and voices of male and female playback singers, then combines that skill with comedy, characters and audience interaction.",
  },
  {
    question: "Which events can he perform at?",
    answer: "Corporate events, festivals, colleges, schools, associations, annual days, inaugurations, private celebrations and international/Gulf programs.",
  },
  {
    question: "Can the show be customized?",
    answer: "Yes. Duration, supporting artists, language mix and tone can be adjusted around your venue, audience and production schedule.",
  },
  {
    question: "How do we check availability?",
    answer: "Send event date, city, audience type and preferred format through WhatsApp. Arun's team can then confirm availability and requirements.",
  },
];

const standardDefinitionThumbnails = new Set(["6OQvkHQJ2LU", "36viUt4Fmgc"]);
export const youtubeThumbnail = (id: string) =>
  `https://i.ytimg.com/vi/${id}/${standardDefinitionThumbnails.has(id) ? "hqdefault" : "maxresdefault"}.jpg`;
export const youtubeUrl = (id: string) => `https://www.youtube.com/watch?v=${id}`;
