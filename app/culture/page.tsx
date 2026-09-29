"use client";

import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CultureCard from "../components/CultureCard";
import { supabase } from "../lib/supabaseClient";

type CulturePost = {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  type: string;
  category: string;
  featured: boolean;
};

export default function Culture() {
  const [posts, setPosts] = useState<CulturePost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    const { data } = await supabase
      .from("culture_posts")
      .select("*")
      .order("created_at", { ascending: true });

    if (data) setPosts(data);
    setLoading(false);
  }

  const featuredPost = posts.find((post) => post.featured);
  const otherPosts = posts.filter((post) => !post.featured);

  return (
    <>
      <Navbar />

      <main className="shop-page">
        <section className="shop-header">
          <h1>CULTURE</h1>
          <p>Heritage, art, and identity — explored.</p>
        </section>

        {loading && (
          <p style={{ textAlign: "center", color: "#888888", padding: "40px" }}>
            Loading culture posts...
          </p>
        )}

        {!loading && featuredPost && (
          <section className="featured-release">
            <div className="featured-release-cover">
              <img
                src={featuredPost.image}
                alt={featuredPost.title}
                className="culture-image"
              />
            </div>
            <div className="featured-release-info">
              <p className="featured-release-label">Featured</p>
              <h2>{featuredPost.title}</h2>
              <p className="featured-release-meta">
                {featuredPost.type} · {featuredPost.category}
              </p>
              <p className="story-excerpt">{featuredPost.excerpt}</p>
            </div>
          </section>
        )}

        {!loading && (
          <section className="stories-section">
            <div className="products-grid">
              {otherPosts.map((post) => (
                <CultureCard
                  key={post.id}
                  title={post.title}
                  excerpt={post.excerpt}
                  image={post.image}
                  type={post.type}
                  category={post.category}
                />
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </>
  );
}