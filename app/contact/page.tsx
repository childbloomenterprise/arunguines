"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function ContactRedirect() {
  useEffect(() => {
    window.location.replace(`/book/${window.location.search}`);
  }, []);

  return <main className="legacy-redirect"><h1>Check Availability</h1><p>Opening the enquiry form…</p><Link href="/book">Continue to booking</Link></main>;
}
