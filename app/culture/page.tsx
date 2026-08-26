"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const featuredItem = {
  title: "Threads of Heritage",
  excerpt:
    "How traditional textiles and patterns continue to shape modern African fashion — and why they matter more than ever.",
  image: "/tla-logo.png",
  type: "Article",
  category: "Fashion",
};

const cultureItems = [
  {
    title: "The Sound of the Diaspora",
    excerpt:
      "Exploring how music has carried African identity across borders, generations, and genres.",
    image: "/tla-logo.png",
    type: "Article",
    category: "Music",
  },
  {
    title: "Faces of Legacy",
    excerpt:
      "A visual spotlight on the artists, creators, and everyday legends shaping the culture today.",
    image: "/tla-logo.png",
    type: "Spotlight",
    category: "Art",
  },
  {
    title: "Colors That Speak",
    excerpt:
      "Why color choice in African art and fashion is never accidental — a look at symbolism across the continent.",
    image: "/tla-logo.png",
    type: "Article",
    category: "Art",
  },
];

const categories = ["All", "Fashion", "Music", "Art", "History"];

export default function Culture() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredItems =
    activeCategory === "All"
      ? cultureItems
      : cultureItems.filter((item) => item.category === activeCategory);

  const showFeatured =
    activeCategory === "All" || featuredItem.category === activeCategory;

  return (
    <>
      <Navbar />

      <main className="culture-page">
        <section className="culture-header">
          <h1>CULTURE</h1>
          <p>Stories, sounds, and style — the heartbeat behind the brand.</p>
        </section>

        <section className="culture-filters">
          {categories.map((category) => (
            <button
              key={category}
              className={`filter-btn ${activeCategory === category ? "active" : ""}`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </section>

        {showFeatured && (
          <section className="culture-featured">
            <div className="culture-featured-image">
              <img src={featuredItem.image} alt={featuredItem.title} />
            </div>
            <div className="culture-featured-info">
              <p className="culture-type">{featuredItem.type}</p>
              <h2>{featuredItem.title}</h2>
              <p className="culture-featured-excerpt">{featuredItem.excerpt}</p>
              <button className="culture-button culture-button-large">Read More</button>
            </div>
          </section>
        )}

        {filteredItems.length === 0 ? (
          <p className="culture-empty">
            No stories in this category yet — check back soon.
          </p>
        ) : (
          <section className="culture-grid">
            {filteredItems.map((item) => (
              <article key={item.title} className="culture-card">
                <div className="culture-image">
                  <img src={item.image} alt={item.title} />
                </div>

                <div className="culture-info">
                  <p className="culture-type">{item.type}</p>
                  <h2>{item.title}</h2>
                  <p className="culture-excerpt">{item.excerpt}</p>
                  <button className="culture-button">Read More</button>
                </div>
              </article>
            ))}
          </section>
        )}
      </main>

      <Footer />
    </>
  );
}