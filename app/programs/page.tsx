import { permanentRedirect } from "next/navigation";

export default function ProgramsRedirect() {
  permanentRedirect("/shows");
}
