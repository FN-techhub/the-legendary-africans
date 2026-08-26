"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";

export type Track = {
  title: string;
  audio: string;
  cover: string;
  subtitle?: string;
};

type PlayerContextType = {
  currentTrack: Track | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  playTrack: (track: Track, list: Track[]) => void;
  togglePlay: () => void;
  playNext: () => void;
  playPrev: () => void;
  seek: (time: number) => void;
};

const PlayerContext = createContext<PlayerContextType | null>(null);

export function PlayerProvider({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const currentTrackRef = useRef<Track | null>(null);
  const playlistRef = useRef<Track[]>([]);

  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = new Audio();
    audioRef.current = audio;

    audio.addEventListener("play", () => setIsPlaying(true));
    audio.addEventListener("pause", () => setIsPlaying(false));
    audio.addEventListener("timeupdate", () => setCurrentTime(audio.currentTime));
    audio.addEventListener("loadedmetadata", () => setDuration(audio.duration));
    audio.addEventListener("ended", () => goToNext());

    return () => {
      audio.pause();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function playTrack(track: Track, list: Track[]) {
    playlistRef.current = list;
    currentTrackRef.current = track;
    setCurrentTrack(track);

    if (audioRef.current) {
      audioRef.current.src = track.audio;
      audioRef.current.play();
    }
  }

  function togglePlay() {
    if (!audioRef.current || !currentTrackRef.current) return;
    if (audioRef.current.paused) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }

  function goToNext() {
    const list = playlistRef.current;
    const current = currentTrackRef.current;
    if (!list.length || !current) return;
    const idx = list.findIndex((t) => t.audio === current.audio);
    const nextTrack = list[(idx + 1) % list.length];
    playTrack(nextTrack, list);
  }

  function goToPrev() {
    const list = playlistRef.current;
    const current = currentTrackRef.current;
    if (!list.length || !current) return;
    const idx = list.findIndex((t) => t.audio === current.audio);
    const prevTrack = list[(idx - 1 + list.length) % list.length];
    playTrack(prevTrack, list);
  }

  function seek(time: number) {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  }

  return (
    <PlayerContext.Provider
      value={{
        currentTrack,
        isPlaying,
        currentTime,
        duration,
        playTrack,
        togglePlay,
        playNext: goToNext,
        playPrev: goToPrev,
        seek,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error("usePlayer must be used within PlayerProvider");
  return ctx;
}