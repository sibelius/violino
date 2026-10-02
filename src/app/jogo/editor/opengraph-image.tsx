import { ogAlt, renderOg } from "@/lib/og";

export const alt = ogAlt("/jogo/editor");
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return renderOg("/jogo/editor");
}
