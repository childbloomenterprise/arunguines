"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps } from "react";

export function BookingLink({ href = "/book", ...props }: Omit<ComponentProps<typeof Link>, "href"> & { href?: string }) {
  const pathname = usePathname();
  const [path, query = ""] = href.split("?");
  const params = new URLSearchParams(query);
  params.set("source", pathname);
  return <Link {...props} href={`${path}?${params.toString()}`} />;
}
