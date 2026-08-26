"use client";

import { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const sections = [
  { id: "where-it-started", label: "Where It Started" },
  { id: "legendary-mentality", label: "A Legendary Mentality" },
  { id: "the-why", label: "The Why" },
  { id: "more-than-a-brand", label: "More Than a Brand" },
  { id: "the-road-ahead", label: "The Road Ahead" },
  { id: "life-in-the-community", label: "Life in the Community" },
];

export default function About() {
  useEffect(() => {
    const handleScroll = () => {
      const bar = document.getElementById("scrollProgress");
      if (!bar) return;
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const percent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      bar.style.width = percent + "%";
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Navbar />

      <main className="about-page">
        <div className="scroll-progress" id="scrollProgress"></div>

        <section className="about-header">
          <p className="about-established">Est. 2017</p>
          <h1>OUR STORY</h1>
          <p>Fashion. Music. Poetry. Heritage. One mentality.</p>
        </section>

        <div className="about-body">
          <nav className="about-jumpnav" aria-label="Page sections">
            {sections.map((section) => (
              <a key={section.id} href={`#${section.id}`}>
                {section.label}
              </a>
            ))}
          </nav>

          <div className="about-content">
            <section id="where-it-started" className="about-section">
              <h2>Where It Started</h2>
              <p>
                The Legendary Africans began as a thought in the mind of a
                young boy in love with fashion, music, and poetry — three
                languages that, to him, always spoke the same truth. Fashion
                has long been a form of expression that connects people the
                way sport and politics do. TLA became the name for
                something bigger: a brand built to represent the ambitions
                of young Africans carrying big dreams and facing real
                obstacles — young Africans with a will of steel who refuse
                to be broken by the odds, who show up and push forward
                anyway, again and again, until the dream becomes real.
              </p>
              <p>
                Along the way, we studied how African style itself has
                evolved — from animal skins and hand-spun cotton threads to
                the modern trends worn today. That journey matters to us. No
                matter how far fashion moves forward, we&apos;re determined
                to weave a thread of that heritage into everything we wear.
              </p>
            </section>

            <blockquote className="about-pullquote">
              &ldquo;A will of steel that refuses to be broken by the odds —
              showing up and pushing forward, again and again, until the
              dream becomes real.&rdquo;
            </blockquote>

            <section id="legendary-mentality" className="about-section">
              <h2>A Legendary Mentality</h2>
              <p>
                Before anything else, TLA acknowledges African heritage and
                origin — and builds its fashion and thinking around that
                identity. The name is an emblem: a mentality worth
                cultivating for anyone who aspires to greatness.
              </p>
              <p>
                We look to those who paved the way —{" "}
                <strong>Mansa Musa</strong>, the richest man to ever walk
                the earth; <strong>Mandela</strong>, the man who turned a
                prison cell into a pulpit for freedom;{" "}
                <strong>Haile Selassie</strong>, the Lion of Judah;{" "}
                <strong>Cleopatra</strong>, the last Pharaoh of the Nile;{" "}
                <strong>the Pharaohs of Kemet</strong>, who built wonders
                the world still marvels at; <strong>Thomas Sankara</strong>,
                the upright man who dared his nation to stand on its own
                feet; <strong>Tom Mboya</strong>, the young voice who
                helped shape a continent&apos;s independence;{" "}
                <strong>the Queen of Sheba</strong>, who ruled over the
                Kingdom of Aksum in wisdom and gold — not as history to
                admire from a distance, but as proof of what&apos;s
                possible, and a reason to keep our heritage alive.
              </p>
            </section>

            <section id="the-why" className="about-section">
              <h2>The Why</h2>
              <p>
                Fashion, music, and poetry all existed separately, each
                demanding attention on its own. Rather than let them
                compete, we merged them — creating space for more people
                and more ideas to shape African perspectives, spark
                discussion, and open doors for others coming up behind us.
              </p>
            </section>

            <section id="more-than-a-brand" className="about-section">
              <h2>More Than a Brand</h2>
              <p>
                TLA started as a clothing line — but that&apos;s not what
                it is today. It has grown into a full production house:
                branding and design services, a music recording studio, and
                a technology arm built to support all of it. Through F-N
                Techhub, the owner leads the tech team behind TLA,
                providing the solutions and innovations essential to its
                growth.
              </p>
              <p>
                The original clothing line remains dedicated to
                representing African origin and identity, while sister
                labels like <strong>Expensive Dreams</strong> and{" "}
                <strong>Blackcellency</strong> explore the wider diversity
                of style and aesthetic the fashion world has to offer.
                Music and poetry from artists we work with — musically and
                in business — are part of the same ecosystem.
              </p>
            </section>

            <section id="the-road-ahead" className="about-section">
              <h2>The Road Ahead</h2>
              <p>
                The trajectory of this community is bigger than any single
                brand: to build a network of young Africans from across the
                continent, united by a shared vision — to better the lives
                of every African child, and create an environment with the
                capacity to uplift the African community at large.
                It&apos;s a vision Kwame Nkrumah carried long before us,
                and it&apos;s exactly the kind of conversation TLA exists
                to keep alive.
              </p>
              <p>
                Part of that vision is preparing young Africans to step
                confidently into the global tech, business, sports, and
                fashion arenas — capable of doing what the biggest players
                there do. Heritage and politics belong in these
                conversations too, not as abstract topics, but as real
                debate. The goal: a generation informed on the laws that
                govern them, and equipped to engage with and shape the
                politics of their future.
              </p>
            </section>

            <section id="life-in-the-community" className="about-section">
              <h2>Life in the Community</h2>
              <p>
                Beyond the brand, TLA lives as a real community — one that
                meets once a month to bring these conversations to life.
                Alongside discussions on heritage, politics, and the road
                ahead, there&apos;s room for fun too: games, laughter, and
                connection. One of the community&apos;s favorite traditions
                is a culinary one — each meeting features a different
                African cuisine, which the group tries together and
                reviews, dish by dish, country by country.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}