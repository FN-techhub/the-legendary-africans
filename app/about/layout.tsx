import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Story | The Legendary Africans",
  description:
    "Fashion, music, poetry, and heritage — the story of how The Legendary Africans became a production house and community for young Africans.",
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}