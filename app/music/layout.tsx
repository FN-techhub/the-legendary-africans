import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Music | The Legendary Africans",
  description:
    "Stream music from The Legendary Africans Music.inc — the Exodus album, singles, and releases from artists signed to or associated with the label.",
};

export default function MusicLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}