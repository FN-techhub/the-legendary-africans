"use client";

import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const SERVICES = [
  {
    key: "tshirts",
    title: "T-Shirts",
    desc: "Plain or branded, single pieces or bulk runs.",
  },
  {
    key: "hoodies",
    title: "Hoodies",
    desc: "Custom prints and embroidery on quality hoodies.",
  },
  {
    key: "caps",
    title: "Caps",
    desc: "Branded caps for teams, schools, and events.",
  },
  {
    key: "uniforms",
    title: "School Uniforms",
    desc: "Bulk uniform orders with your school's branding.",
  },
  {
    key: "reflectors",
    title: "Reflectors",
    desc: "Safety reflectors branded for schools and companies.",
  },
  {
    key: "identity",
    title: "Logo & Brand Identity",
    desc: "Logo design, brand guidelines, and full identity work.",
  },
];

export default function BrandingPage() {
  return (
    <>
      <Navbar />

      <main className="branding-page">
        <div className="branding-header">
          <h1>BRANDING</h1>
          <p>From a single branded tee to a full school uniform order — tell us what you need.</p>

          <div className="hero-buttons">
            <Link href="/branding/quote" className="btn-primary">
              Request a Quote
            </Link>
            <Link href="/branding/portfolio" className="btn-secondary">
              View Past Work
            </Link>
          </div>
        </div>

        <div className="branding-grid">
          {SERVICES.map((s) => (
            <Link key={s.key} href={`/branding/quote?type=${s.key}`} className="branding-card">
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              <span className="branding-card-link">Get started →</span>
            </Link>
          ))}
        </div>
      </main>

      <Footer />
    </>
  );
}