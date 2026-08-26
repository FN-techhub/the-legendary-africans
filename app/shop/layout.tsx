import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop | The Legendary Africans",
  description:
    "Shop original streetwear from The Legendary Africans — tees, hoodies, caps, and accessories that represent African heritage and culture.",
};

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}