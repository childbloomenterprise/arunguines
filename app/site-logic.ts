import type { BookingDraft, ShowFormat } from "./site-data";

export type ShowPreferences = { event: string; audience: string; duration: string };

export function recommendShow(programs: readonly ShowFormat[], preferences: ShowPreferences): ShowFormat {
  const { event, audience, duration } = preferences;
  if (duration === "under-30" || event === "inauguration" || event === "awards") return programs[3];
  if (audience === "1000-plus" || duration === "over-120" || event === "public-festival") return programs[2];
  if (event === "corporate" || event === "campus") return programs[1];
  return programs[0];
}

export function composeBookingMessage(draft: BookingDraft): string {
  return ["ARUN GUINNESS — BOOKING ENQUIRY", "", `Name: ${draft.name}`, `Phone: ${draft.phone}`, `Show: ${draft.show}`, `Event: ${draft.event}`, `Date: ${draft.date}`, `Location: ${draft.location}`, `Audience: ${draft.audience}`, `Requirements: ${draft.notes}`].join("\n");
}
