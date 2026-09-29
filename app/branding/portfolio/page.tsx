"use client";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const PORTFOLIO_SECTIONS = [
  {
    key: "tshirts",
    title: "T-Shirts",
    items: [
      { name: "Custom Event Tee", image: "/tla-logo.png" },
      { name: "Corporate Branded Tee", image: "/tla-logo.png" },
    ],
  },
  {
    key: "hoodies",
    title: "Hoodies",
    items: [
      { name: "Embroidered Hoodie", image: "/tla-logo.png" },
    ],
  },
  {
    key: "caps",
    title: "Caps",
    items: [
      { name: "Team Snapback", image: "/tla-logo.png" },
    ],
  },
  {
    key: "uniforms",
    title: "School Uniforms",
    items: [
      { name: "Bulk School Uniform Order", image: "/tla-logo.png" },
    ],
  },
  {
    key: "reflectors",
    title: "Reflectors",
    items: [
      { name: "School Safety Reflector", image: "/tla-logo.png" },
    ],
  },
  {
    key: "identity",
    title: "Logo & Brand Identity",
    items: [
      { name: "Full Brand Identity Package", image: "/tla-logo.png" },
    ],
  },
];

export default function BrandingPortfolio() {
  return (
    <>
      <Navbar />

      <main className="branding-page">
        <div className="branding-header">
          <h1>PAST WORK</h1>
          <p>A look at branding, apparel, and print work we&apos;ve delivered.</p>
        </div>

        <div className="portfolio-sections">
          {PORTFOLIO_SECTIONS.map((section) => (
            <section key={section.key} className="portfolio-section">
              <h2 className="portfolio-section-title">{section.title}</h2>
              <div className="portfolio-grid">
                {section.items.map((item) => (
                  <div key={item.name} className="portfolio-card">
                    <div className="portfolio-card-image">
                      <img src={item.image} alt={item.name} />
                    </div>
                    <p className="portfolio-card-name">{item.name}</p>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>

      <Footer />
    </>
  );
}