"use client";

import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Link from "next/link";
import { usePlayer, Track } from "../../context/PlayerContext";
import { supabase } from "../../lib/supabaseClient";

export default function ExodusAlbum() {
  const [albumTracks, setAlbumTracks] = useState<(Track & { track: number })[]>([]);
  const [loading, setLoading] = useState(true);
  const { playTrack, togglePlay, currentTrack, isPlaying } = usePlayer();

  useEffect(() => {
    async function fetchAlbum() {
      const { data, error } = await supabase
        .from("tracks")
        .select("*")
        .eq("category", "Album")
        .order("track_number", { ascending: true });

      if (!error && data) {
        setAlbumTracks(
          data.map((t) => ({
            title: t.title,
            audio: t.audio_path,
            cover: t.cover_path,
            subtitle: `Exodus · Track ${t.track_number}`,
            track: t.track_number,
          }))
        );
      }
      setLoading(false);
    }
    fetchAlbum();
  }, []);

  function isCurrent(track: Track) {
    return currentTrack?.audio === track.audio;
  }

  return (
    <>
      <Navbar />

      <main className="shop-page">
        <section className="featured-release">
          <div className="featured-release-cover">
            <img
              src="/exodus-cover.jpeg"
              alt="Exodus"
              style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "cover" }}
            />
          </div>
          <div className="featured-release-info">
            <p className="featured-release-label">Album</p>
            <h2>Exodus</h2>
            <p className="featured-release-meta">{albumTracks.length} tracks</p>
            <Link href="/music" className="story-teaser-link">
              ← Back to Music
            </Link>
          </div>
        </section>

        {loading && <p className="shop-count">Loading tracklist...</p>}

        <section className="album-tracklist">
          {albumTracks.map((track) => (
            <button
              key={track.title}
              className="album-track-row album-track-row-button"
              onClick={() =>
                isCurrent(track) ? togglePlay() : playTrack(track, albumTracks)
              }
            >
              <span className="album-track-number">
                {isCurrent(track) && isPlaying ? "⏸" : track.track}
              </span>
              <span className="album-track-name">{track.title}</span>
            </button>
          ))}
        </section>
      </main>

      <Footer />
    </>
  );
}