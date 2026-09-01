"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { usePlayer, Track } from "../context/PlayerContext";
import { supabase } from "../lib/supabaseClient";

type DbTrack = {
  id: number;
  title: string;
  category: string;
  track_number: number | null;
  audio_path: string;
  cover_path: string;
  featured: boolean;
  featured_label: string | null;
};

const filters = ["All", "Album", "Singles"];

export default function Music() {
  const [dbTracks, setDbTracks] = useState<DbTrack[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("All");
  const { playTrack, togglePlay, currentTrack, isPlaying } = usePlayer();

  useEffect(() => {
    async function fetchTracks() {
      const { data, error } = await supabase
        .from("tracks")
        .select("*")
        .order("track_number", { ascending: true });

      if (!error && data) setDbTracks(data);
      setLoading(false);
    }
    fetchTracks();
  }, []);

  const albumTracks: Track[] = dbTracks
    .filter((t) => t.category === "Album")
    .map((t) => ({
      title: t.title,
      audio: t.audio_path,
      cover: t.cover_path,
      subtitle: `Exodus · Track ${t.track_number}`,
    }));

  const singles: Track[] = dbTracks
    .filter((t) => t.category === "Singles")
    .map((t) => ({
      title: t.title,
      audio: t.audio_path,
      cover: t.cover_path,
      subtitle: "Single",
    }));

  const allTracks = [...albumTracks, ...singles];

  const featuredDb = dbTracks.find((t) => t.featured);
  const featuredTrack: Track | null = featuredDb
    ? {
        title: featuredDb.title,
        audio: featuredDb.audio_path,
        cover: featuredDb.cover_path,
        subtitle: featuredDb.category === "Album" ? `Exodus · Track ${featuredDb.track_number}` : "Single",
      }
    : null;
  const featuredLabel = featuredDb?.featured_label || "Featured Track";

  function isCurrent(track: Track) {
    return currentTrack?.audio === track.audio;
  }

  return (
    <>
      <Navbar />

      <main className="shop-page">
        <section className="shop-header music-header">
          <h1>WELCOME TO TLA MUSIC.INC</h1>
          <p>
            Sounds from the movement — every track, in one place.
            <br />
            The music in this page is from artists signed to or associated to TLA Music.inc label
          </p>
        </section>

        {loading && <p className="shop-count">Loading tracks...</p>}

        {!loading && featuredTrack && (
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
        )}

        {!loading && (
          <>
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

            {(activeFilter === "All" || activeFilter === "Album") && albumTracks.length > 0 && (
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

            {(activeFilter === "All" || activeFilter === "Singles") && singles.length > 0 && (
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
          </>
        )}
      </main>

      <Footer />
    </>
  );
}