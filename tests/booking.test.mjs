import assert from "node:assert/strict";
import test from "node:test";
import { composeBookingMessage, validateBookingDraft } from "../app/site-logic.ts";

const draft = { name: "Asha", event: "Malayali association", country: "United Kingdom", location: "London", date: "", show: "", phone: "", audience: "", notes: "", source: "/shows" };

test("early overseas enquiries need no date, format or phone", () => {
  assert.deepEqual(validateBookingDraft(draft, "2026-09-05"), {});
  const message = composeBookingMessage(draft);
  for (const value of ["United Kingdom", "London", "Date not decided", "Help me choose", "Website", "/shows"]) assert.ok(message.includes(value), value);
});

test("name, event, country and city are required", () => {
  assert.deepEqual(Object.keys(validateBookingDraft({ ...draft, name: " ", event: "", country: "", location: "" }, "2026-09-05")).sort(), ["country", "event", "location", "name"]);
});

test("optional supplied phone and date must be valid", () => {
  assert.deepEqual(Object.keys(validateBookingDraft({ ...draft, phone: "123", date: "2026-09-04" }, "2026-09-05")).sort(), ["date", "phone"]);
  assert.ok(validateBookingDraft({ ...draft, date: "2026-02-30" }, "2026-01-01").date);
  assert.ok(validateBookingDraft({ ...draft, date: "nonsense" }, "2026-01-01").date);
  assert.deepEqual(validateBookingDraft({ ...draft, date: "2026-09-05", phone: "+44 (7700) 900123" }, "2026-09-05"), {});
});

test("message normalizes contact, encodes cleanly and excludes external origin injection", () => {
  const message = composeBookingMessage({ ...draft, phone: "+44 (7700) 900123", notes: "Music & family\nTwo generations", source: "https://unrelated.example/?secret=private" });
  assert.ok(message.includes("+447700900123"));
  assert.equal(decodeURIComponent(encodeURIComponent(message)), message);
  assert.ok(!message.includes("unrelated.example"));
  assert.ok(!message.includes("secret"));
});
