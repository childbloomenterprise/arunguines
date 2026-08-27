import { permanentRedirect } from "next/navigation";

export default function GalleryRedirect() {
  permanentRedirect("/proof#performances");
}
