"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { usePlayer, Track } from "../context/PlayerContext";

// To change the featured track: move "featured: true" to any track below.
// Only one track should have featured: true at a time.

const albumTracksRaw = [
  { title: "Exodus", track: 1, audio: "/audio/exodus.mp3" },
  { title: "Fallen Soldiers", track: 2, audio: "/audio/fallen-soldiers.mp3" },
  { title: "Queen Latifah", track: 3, audio: "/audio/queen-latifah.mp3" },
  { title: "Reggae Don't Stop", track: 4, audio: "/audio/reggae-dont-stop.mp3" },
  { title: "Only Love", track: 5, audio: "/audio/only-love.mp3" },
  { title: "Wababa", track: 6, audio: "/audio/wababa.mp3" },
  { title: "Takeover", track: 7, audio: "/audio/take-over.mp3" },
  { title: "Wacha Kushout", track: 8, audio: "/audio/wacha-kushout.mp3" },
  { title: "Roggermilla", track: 9, audio: "/audio/rogger-milla.mp3" },
  { title: "Mandela", track: 10, audio: "/audio/mandela.mp3" },
  { title: "Ting Go", track: 11, audio: "/audio/ting-go.mp3" },
  { title: "Irie Love", track: 12, audio: "/audio/irie-love-ft-mushie.mp3" },
  { title: "No Man", track: 13, audio: "/audio/no-man.mp3" },
];

const albumTracks: Track[] = albumTracksRaw.map((t) => ({
  title: t.title,
  audio: t.audio,
  cover: "/exodus-cover.jpeg",
  subtitle: `Exodus · Track ${t.track}`,
}));

const singlesRaw = [
  { title: "Upper Echelon", audio: "/audio/upper-echelon.mp3", featured: true, featuredLabel: "Fan Favorite" },
  { title: "We Got the Love", audio: "/audio/we-got-the-love.mp3" },
  { title: "Dance Going Down", audio: "/audio/dance-going-down.mp3" },
  { title: "Let It Shine", audio: "/audio/let-it-shine.mp3" },
  { title: "Tubonge Kidogo (ft. Sabato)", audio: "/audio/tubone-kidogo-ft-sabato.mp3" },
  { title: "Yes Bana", audio: "/audio/yes-bana.mp3" },
  { title: "Wedding Ring", audio: "/audio/wedding-ring.mp3" },
];

const singles: Track[] = singlesRaw.map((t) => ({
  title: t.title,
  audio: t.audio,
  cover: "/tla-logo.png",
  subtitle: "Single",
}));

const allTracks = [...albumTracks, ...singles];
const filters = ["All", "Album", "Singles"];

// Automatically finds whichever single has featured: true
const featuredRaw = singlesRaw.find((t) => "featured" in t && t.featured);
const featuredTrack: Track = featuredRaw
  ? {
      title: featuredRaw.title,
      audio: featuredRaw.audio,
      cover: "/tla-logo.png",
      subtitle: "Single",
    }
  : singles[0];
const featuredLabel =
  featuredRaw && "featuredLabel" in featuredRaw && featuredRaw.featuredLabel
    ? featuredRaw.featuredLabel
    : "Featured Track";

export default function Music() {
  const [activeFilter, setActiveFilter] = useState("All");
  const { playTrack, togglePlay, currentTrack, isPlaying } = usePlayer();

  function isCurrent(track: Track) {
    return currentTrack?.audio === track.audio;
  }

  return (
    <>
      <Navbar />

      <main className="shop-page">
               <section className="shop-header music-header">
  <h1>WELCOME TO TLA MUSIC.INC</h1>
  <p>Sounds from the movement — every track, in one place.<br /> 
  The music in this page is from artists signed to or associated to TLA Music.inc label</p>
</section>

        <section className="featured-release">
          <div className="featured-release-cover">
            <img
              src={featuredTrack.cover}
              alt={featuredTrack.title}
              style={{ maxWidth: "70%", maxHeight: "70%", objectFit: "contain" }}
            />
          </div>
          <div className="featured-release-info">
            <p className="featured-release-label">{featuredLabel}</p>
            <h2>{featuredTrack.title}</h2>
            <p className="featured-release-meta">{featuredTrack.subtitle}</p>
            <button
              className="featured-release-button"
              onClick={() =>
                isCurrent(featuredTrack)
                  ? togglePlay()
                  : playTrack(featuredTrack, [featuredTrack, ...allTracks])
              }
            >
              {isCurrent(featuredTrack) && isPlaying ? "Pause" : "Play"}
            </button>
          </div>
        </section>

        <section className="filter-buttons">
          {filters.map((filter) => (
            <button
              key={filter}
              className={`filter-button ${activeFilter === filter ? "active" : ""}`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </section>

        {(activeFilter === "All" || activeFilter === "Album") && (
          <section className="music-row-section">
            <div className="music-row-header">
              <h2 className="music-row-title">Album — Exodus</h2>
              <Link href="/music/exodus" className="music-row-link">
                View full album →
              </Link>
            </div>
            <div className="music-row">
              {albumTracks.map((track) => (
                <button
                  key={track.title}
                  className="music-card"
                  onClick={() =>
                    isCurrent(track) ? togglePlay() : playTrack(track, albumTracks)
                  }
                >
                  <div className="music-card-cover">
                    <img src={track.cover} alt={track.title} />
                    <span className="music-card-play-icon">
                      {isCurrent(track) && isPlaying ? "⏸" : "▶"}
                    </span>
                  </div>
                  <p className="music-card-track">{track.subtitle}</p>
                  <h3 className="music-card-title">{track.title}</h3>
                </button>
              ))}
            </div>
          </section>
        )}

        {(activeFilter === "All" || activeFilter === "Singles") && (
          <section className="music-row-section">
            <h2 className="music-row-title">Singles</h2>
            <div className="music-row">
              {singles.map((track) => (
                <button
                  key={track.title}
                  className="music-card"
                  onClick={() =>
                    isCurrent(track) ? togglePlay() : playTrack(track, singles)
                  }
                >
                  <div className="music-card-cover">
                    <img src={track.cover} alt={track.title} />
                    <span className="music-card-play-icon">
                      {isCurrent(track) && isPlaying ? "⏸" : "▶"}
                    </span>
                  </div>
                  <p className="music-card-track">Single</p>
                  <h3 className="music-card-title">{track.title}</h3>
                </button>
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </>
  );
}