"use client";

import { useState } from "react";

export default function Footer() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <footer className="footer">
      <div className="footer-newsletter">
        <h2>JOIN THE LEGENDARY AFRICANS</h2>
        <p>Be first to hear new drops, new releases, and new stories.</p>

        {submitted ? (
          <p className="footer-form-success">
            Thanks for your interest — email signup is launching soon!
          </p>
        ) : (
          <form className="footer-form" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Enter your email"
              className="footer-input"
              required
            />
            <button type="submit" className="footer-subscribe">
              Subscribe
            </button>
          </form>
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