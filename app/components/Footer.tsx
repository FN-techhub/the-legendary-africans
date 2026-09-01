"use client";

import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const { error } = await supabase
      .from("newsletter_signups")
      .insert([{ email }]);

    if (error) {
      setStatus("error");
      if (error.code === "23505") {
        setErrorMessage("That email is already subscribed!");
      } else {
        setErrorMessage("Something went wrong. Please try again.");
      }
    } else {
      setStatus("success");
    }
  }

  return (
    <footer className="footer">
      <div className="footer-newsletter">
        <h2>JOIN THE LEGENDARY AFRICANS</h2>
        <p>Be first to hear new drops, new releases, and new stories.</p>

        {status === "success" ? (
          <p className="footer-form-success">
            Thanks for subscribing — welcome to the movement!
          </p>
        ) : (
          <form className="footer-form" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Enter your email"
              className="footer-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button
              type="submit"
              className="footer-subscribe"
              disabled={status === "loading"}
            >
              {status === "loading" ? "Subscribing..." : "Subscribe"}
            </button>
          </form>
        )}

        {status === "error" && (
          <p className="footer-form-error">{errorMessage}</p>
        )}
      </div>

      <div className="footer-divider"></div>

      <div className="footer-bottom-row">
        <a href="/" className="footer-logo">
          <img src="/tla-navbar-logo-v3.png" alt="The Legendary Africans" />
        </a>

        <div className="footer-links">
          <a href="/shop">Shop</a>
          <a href="/music">Music</a>
          <a href="/stories">Stories</a>
          <a href="/culture">Culture</a>
          <a href="/about">About</a>
        </div>

        <div className="footer-social">
          <a href="#" target="_blank" rel="noopener noreferrer">Instagram</a>
          <a href="#" target="_blank" rel="noopener noreferrer">TikTok</a>
          <a href="#" target="_blank" rel="noopener noreferrer">YouTube</a>
        </div>
      </div>

      <div className="footer-copyright">
        <p>© 2026 The Legendary Africans. All rights reserved.</p>
      </div>
    </footer>
  );
}