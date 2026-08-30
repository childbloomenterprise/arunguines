import type { BookingDraft, ShowFormat } from "./site-data";

export type ShowPreferences = { event: string; audience: string; duration: string };
export type BookingErrors = Partial<Record<"name" | "phone" | "show" | "date" | "location", string>>;

export function recommendShow(programs: readonly ShowFormat[], preferences: ShowPreferences): ShowFormat {
  const { event, audience, duration } = preferences;
  if (duration === "under-30" || event === "inauguration" || event === "awards") return programs[3];
  if (audience === "1000-plus" || duration === "over-120" || event === "public-festival") return programs[2];
  if (event === "corporate" || event === "campus") return programs[1];
  return programs[0];
}

export function composeBookingMessage(draft: BookingDraft): string {
  const optional = (value: string) => value.trim() || "Not provided";
  return ["ARUN GUINNESS — BOOKING ENQUIRY", "", `Name: ${draft.name.trim()}`, `Phone: ${normalizePhoneInput(draft.phone)}`, `Show: ${draft.show}`, `Event: ${optional(draft.event)}`, `Date: ${draft.date}`, `Location: ${draft.location.trim()}`, `Audience: ${optional(draft.audience)}`, `Requirements: ${optional(draft.notes)}`].join("\n");
}

export function normalizePhoneInput(value: string): string {
  const trimmed = value.trim();
  const digits = trimmed.replace(/\D/g, "");
  return `${trimmed.startsWith("+") ? "+" : ""}${digits}`;
}

export function validateBookingDraft(draft: BookingDraft, today: string): BookingErrors {
  const errors: BookingErrors = {};
  if (!draft.name.trim()) errors.name = "Enter your name.";
  const phoneDigits = normalizePhoneInput(draft.phone).replace(/\D/g, "");
  if (phoneDigits.length < 7 || phoneDigits.length > 15) errors.phone = "Enter a valid phone number.";
  if (!draft.show) errors.show = "Choose a show format.";
  if (!draft.date) errors.date = "Choose an event date.";
  else if (draft.date < today) errors.date = "Choose today or a future date.";
  if (!draft.location.trim()) errors.location = "Enter a city or venue.";
  return errors;
}
