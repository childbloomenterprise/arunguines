import type { BookingDraft, ShowFormat } from "./site-data";

export type ShowPreferences = { event: string; audience: string; duration: string };
export type BookingErrors = Partial<Record<"name" | "event" | "country" | "location" | "phone" | "date", string>>;

export function recommendShow(programs: readonly ShowFormat[], preferences: ShowPreferences): ShowFormat {
  const { event, audience, duration } = preferences;
  if (duration === "under-30" || event === "inauguration" || event === "awards") return programs[3];
  if (audience === "1000-plus" || duration === "over-120" || event === "public-festival") return programs[2];
  if (event === "corporate" || event === "campus") return programs[1];
  return programs[0];
}

export function composeBookingMessage(draft: BookingDraft): string {
  const optional = (value: string) => value.trim() || "Not provided";
  const source = /^\/[a-z0-9/-]*$/i.test(draft.source ?? "") ? draft.source : "/book";
  return ["ARUN GUINNESS — BOOKING ENQUIRY", `Source: Website · ${source}`, "", `Name: ${draft.name.trim()}`, `Event: ${draft.event.trim()}`, `Country: ${draft.country?.trim() ?? ""}`, `City / venue: ${draft.location.trim()}`, `Date: ${draft.date || "Date not decided"}`, `Show: ${draft.show || "Help me choose"}`, `Phone: ${optional(normalizePhoneInput(draft.phone))}`, `Audience: ${optional(draft.audience)}`, `Requirements: ${optional(draft.notes)}`].join("\n");
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
  if (draft.phone.trim() && (phoneDigits.length < 7 || phoneDigits.length > 15)) errors.phone = "Enter a valid phone number with country code.";
  if (draft.date) {
    const parsed = new Date(`${draft.date}T00:00:00Z`);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(draft.date) || Number.isNaN(parsed.getTime()) || parsed.toISOString().slice(0, 10) !== draft.date) errors.date = "Enter a valid event date.";
    else if (draft.date < today) errors.date = "Choose today or a future date.";
  }
  if (!draft.event.trim()) errors.event = "Enter your event type.";
  if (!draft.country?.trim()) errors.country = "Enter the event country.";
  if (!draft.location.trim()) errors.location = "Enter the event city.";
  return errors;
}
