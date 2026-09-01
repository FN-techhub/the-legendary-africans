"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "../../lib/supabaseClient";

type CulturePost = {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  type: string;
  category: string;
  featured: boolean;
};

const categories = ["Fashion", "Music", "Art", "History"];
const types = ["Article", "Spotlight"];

const emptyForm = {
  title: "",
  excerpt: "",
  image: "/tla-logo.png",
  type: types[0],
  category: categories[0],
  featured: false,
};

export default function AdminCulture() {
  const [checking, setChecking] = useState(true);
  const [posts, setPosts] = useState<CulturePost[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState(emptyForm);

  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        router.push("/admin/login");
      } else {
        setChecking(false);
        fetchPosts();
      }
    });
  }, [router]);

  async function fetchPosts() {
    const { data } = await supabase
      .from("culture_posts")
      .select("*")
      .order("created_at", { ascending: true });
    if (data) setPosts(data);
  }

  function resetForm() {
    setForm(emptyForm);
    setEditingId(null);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (form.featured) {
      await supabase
        .from("culture_posts")
        .update({ featured: false })
        .eq("featured", true);
    }

    if (editingId) {
      await supabase.from("culture_posts").update(form).eq("id", editingId);
    } else {
      await supabase.from("culture_posts").insert([form]);
    }

    resetForm();
    fetchPosts();
  }

  function startEdit(post: CulturePost) {
    setEditingId(post.id);
    setForm({
      title: post.title,
      excerpt: post.excerpt,
      image: post.image,
      type: post.type,
      category: post.category,
      featured: post.featured,
    });
  }

  async function handleDelete(id: number) {
    if (!confirm("Delete this culture post?")) return;
    await supabase.from("culture_posts").delete().eq("id", id);
    fetchPosts();
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
        <h1>Manage Culture</h1>
        <Link href="/admin" className="admin-logout-btn">
          ← Back to Dashboard
        </Link>
      </div>

      <form className="admin-track-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />
        <select
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
        >
          {types.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
        <select
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        >
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Image path (e.g. /tla-logo.png)"
          value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
          required
        />
        <textarea
          placeholder="Excerpt"
          value={form.excerpt}
          onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
          required
          rows={3}
          style={{
            gridColumn: "1 / -1",
            padding: "10px 12px",
            background: "#050505",
            border: "1px solid #333333",
            color: "#ffffff",
            fontSize: "13px",
            fontFamily: "inherit",
            resize: "vertical",
          }}
        />

        <label className="admin-checkbox-field">
          <input
            type="checkbox"
            checked={form.featured}
            onChange={(e) => setForm({ ...form, featured: e.target.checked })}
          />
          Featured story
        </label>

        <div className="admin-form-buttons">
          <button type="submit" className="admin-save-btn">
            {editingId ? "Update Post" : "Add Post"}
          </button>
          {editingId && (
            <button type="button" onClick={resetForm} className="admin-cancel-btn">
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="admin-product-list">
        {posts.map((post) => (
          <div key={post.id} className="admin-product-row">
            <img src={post.image} alt={post.title} />
            <div className="admin-product-info">
              <p className="admin-product-name">
                {post.title}
                {post.featured && <span className="admin-featured-tag">Featured</span>}
              </p>
              <p className="admin-product-meta">
                {post.type} · {post.category}
              </p>
            </div>
            <div className="admin-product-actions">
              <button onClick={() => startEdit(post)}>Edit</button>
              <button onClick={() => handleDelete(post.id)} className="admin-delete-btn">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
