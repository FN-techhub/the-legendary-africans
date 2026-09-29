import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { PlayerProvider } from "./context/PlayerContext";
import PersistentPlayer from "./components/PersistentPlayer";
import { CartProvider } from "./context/CartContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The Legendary Africans | Fashion. Music. Culture. Stories.",
  description:
    "The Legendary Africans is a platform celebrating African fashion, music, and culture — shop original streetwear, discover new music, and explore stories from the continent and its diaspora.",
  keywords: [
    "African fashion",
    "African streetwear",
    "African music",
    "African culture",
    "TLA",
    "The Legendary Africans",
  ],
  openGraph: {
    title: "The Legendary Africans",
    description: "Fashion. Music. Culture. Stories.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <CartProvider>
          <PlayerProvider>
            {children}
            <PersistentPlayer />
          </PlayerProvider>
        </CartProvider>
      </body>
    </html>
  );
}