"use client";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Link from "next/link";
import { usePlayer, Track } from "../../context/PlayerContext";

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

const albumTracks: (Track & { track: number })[] = albumTracksRaw.map((t) => ({
  title: t.title,
  audio: t.audio,
  cover: "/exodus-cover.jpeg",
  subtitle: `Exodus · Track ${t.track}`,
  track: t.track,
}));

export default function ExodusAlbum() {
  const { playTrack, togglePlay, currentTrack, isPlaying } = usePlayer();

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
            <p className="featured-release-meta">13 tracks</p>
            <Link href="/music" className="story-teaser-link">
              ← Back to Music
            </Link>
          </div>
        </section>

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