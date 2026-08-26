import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Culture | The Legendary Africans",
  description:
    "Stories, sounds, and style — explore articles and spotlights on African fashion, art, music, and heritage from The Legendary Africans.",
};

export default function CultureLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}