"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "../../lib/supabaseClient";

type Track = {
  id: number;
  title: string;
  category: string;
  track_number: number | null;
  audio_path: string;
  cover_path: string;
  featured: boolean;
  featured_label: string | null;
};

const categories = ["Album", "Singles"];

const emptyForm = {
  title: "",
  category: categories[0],
  track_number: "",
  audio_path: "",
  cover_path: "",
  featured: false,
  featured_label: "",
};

export default function AdminTracks() {
  const [checking, setChecking] = useState(true);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [albumCover, setAlbumCover] = useState<string>("");
  const [form, setForm] = useState(emptyForm);

  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        router.push("/admin/login");
      } else {
        setChecking(false);
        fetchTracks();
      }
    });
  }, [router]);

  async function fetchTracks() {
    const { data } = await supabase
      .from("tracks")
      .select("*")
      .order("category", { ascending: true })
      .order("track_number", { ascending: true });

    if (data) {
      setTracks(data);
      const existingAlbumTrack = data.find((t) => t.category === "Album" && t.cover_path);
      if (existingAlbumTrack) setAlbumCover(existingAlbumTrack.cover_path);
    }
  }

  function resetForm() {
    setForm(emptyForm);
    setEditingId(null);
  }

  function handleCategoryChange(category: string) {
    setForm((f) => ({
      ...f,
      category,
      cover_path: category === "Album" ? albumCover : "",
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const payload = {
      title: form.title,
      category: form.category,
      track_number: form.track_number ? Number(form.track_number) : null,
      audio_path: form.audio_path,
      cover_path: form.cover_path,
      featured: form.featured,
      featured_label: form.featured ? form.featured_label || "Featured Track" : null,
    };

    if (payload.featured) {
      await supabase
        .from("tracks")
        .update({ featured: false, featured_label: null })
        .eq("featured", true);
    }

    if (editingId) {
      await supabase.from("tracks").update(payload).eq("id", editingId);
    } else {
      await supabase.from("tracks").insert([payload]);
    }

    resetForm();
    fetchTracks();
  }

  function startEdit(track: Track) {
    setEditingId(track.id);
    setForm({
      title: track.title,
      category: track.category,
      track_number: track.track_number ? String(track.track_number) : "",
      audio_path: track.audio_path,
      cover_path: track.cover_path,
      featured: track.featured,
      featured_label: track.featured_label || "",
    });
  }

  async function handleDelete(id: number) {
    if (!confirm("Delete this track?")) return;
    await supabase.from("tracks").delete().eq("id", id);
    fetchTracks();
  }

  if (checking) {
    return (
      <main className="admin-login-page">
        <p style={{ color: "#ffffff" }}>Checking access...</p>
      </main>
    );
  }

  return (
    <main className="admin-dashboard">
      <div className="admin-dashboard-header">
        <h1>Manage Tracks</h1>
        <Link href="/admin" className="admin-logout-btn">
          ← Back to Dashboard
        </Link>
      </div>

      <form className="admin-track-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Track title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />
        <select
          value={form.category}
          onChange={(e) => handleCategoryChange(e.target.value)}
        >
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Track number"
          value={form.track_number}
          onChange={(e) => setForm({ ...form, track_number: e.target.value })}
        />
        <input
          type="text"
          placeholder="Audio path (e.g. /audio/exodus.mp3)"
          value={form.audio_path}
          onChange={(e) => setForm({ ...form, audio_path: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder={
            form.category === "Album"
              ? "Cover path (defaults to album cover)"
              : "Cover path (e.g. /covers/single.jpg)"
          }
          value={form.cover_path}
          onChange={(e) => setForm({ ...form, cover_path: e.target.value })}
          required
        />

        <label className="admin-checkbox-field">
          <input
            type="checkbox"
            checked={form.featured}
            onChange={(e) => setForm({ ...form, featured: e.target.checked })}
          />
          Featured track
        </label>

        {form.featured && (
          <input
            type="text"
            placeholder="Featured label (e.g. Featured Track)"
            value={form.featured_label}
            onChange={(e) => setForm({ ...form, featured_label: e.target.value })}
          />
        )}

        <div className="admin-form-buttons">
          <button type="submit" className="admin-save-btn">
            {editingId ? "Update Track" : "Add Track"}
          </button>
          {editingId && (
            <button type="button" onClick={resetForm} className="admin-cancel-btn">
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="admin-product-list">
        {tracks.map((track) => (
          <div key={track.id} className="admin-product-row">
            <img src={track.cover_path} alt={track.title} />
            <div className="admin-product-info">
              <p className="admin-product-name">
                {track.title}
                {track.featured && <span className="admin-featured-tag">Featured</span>}
              </p>
              <p className="admin-product-meta">
                {track.category}
                {track.track_number ? ` · Track ${track.track_number}` : ""}
              </p>
            </div>
            <div className="admin-product-actions">
              <button onClick={() => startEdit(track)}>Edit</button>
              <button onClick={() => handleDelete(track.id)} className="admin-delete-btn">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}