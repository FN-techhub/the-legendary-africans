"use client";

import { usePlayer } from "../context/PlayerContext";

function formatTime(seconds: number) {
  if (!seconds || isNaN(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function PersistentPlayer() {
  const { currentTrack, isPlaying, currentTime, duration, togglePlay, playNext, playPrev, seek } =
    usePlayer();

  if (!currentTrack) return null;

  return (
    <div className="persistent-player">
      <div className="persistent-player-track">
        <img src={currentTrack.cover} alt={currentTrack.title} />
        <div>
          <p className="persistent-player-title">{currentTrack.title}</p>
          {currentTrack.subtitle && (
            <p className="persistent-player-subtitle">{currentTrack.subtitle}</p>
          )}
        </div>
      </div>

      <div className="persistent-player-controls">
        <div className="persistent-player-buttons">
          <button onClick={playPrev} aria-label="Previous">
            ⏮
          </button>
          <button onClick={togglePlay} className="persistent-player-play" aria-label="Play/Pause">
            {isPlaying ? "⏸" : "▶"}
          </button>
          <button onClick={playNext} aria-label="Next">
            ⏭
          </button>
        </div>

        <div className="persistent-player-progress">
          <span>{formatTime(currentTime)}</span>
          <input
            type="range"
            min={0}
            max={duration || 0}
            value={currentTime}
            onChange={(e) => seek(Number(e.target.value))}
          />
          <span>{formatTime(duration)}</span>
        </div>
      </div>
    </div>
  );
}