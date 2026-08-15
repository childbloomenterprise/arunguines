import Link from "next/link";
import { ArrowUpRight } from "./icons";

export default function NotFound() {
  return <main id="main-content" className="page-hero"><div className="page-hero-copy"><span className="eyebrow eyebrow-light"><i />404 / Off stage</span><h1>Wrong door.<em>Right performer.</em></h1><p>This page left the stage. The main show is still live.</p><Link className="button button-gold" href="/">Return home <ArrowUpRight /></Link></div></main>;
}
