"use client";

import { useSearchParams } from "next/navigation";
import { BookingForm } from "../contact/booking-form";

export function BookFormFromSearch() {
  const searchParams = useSearchParams();
  return <BookingForm
    key={searchParams.toString()}
    initialShow={searchParams.get("show") ?? ""}
    initialEvent={searchParams.get("event") ?? ""}
    initialLocation={searchParams.get("location") ?? ""}
    initialCountry={searchParams.get("country") ?? ""}
    source={searchParams.get("source") ?? "/book"}
  />;
}
