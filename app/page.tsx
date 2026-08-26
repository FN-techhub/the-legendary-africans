import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import FeaturedProducts from "./components/FeaturedProducts";
import MusicTeaser from "./components/MusicTeaser";
import StoryTeaser from "./components/StoryTeaser";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <FeaturedProducts />
      <MusicTeaser />
      <StoryTeaser />
      <Footer />
    </>
  );
}