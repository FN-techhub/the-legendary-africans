"use client";

import Link from "next/link";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { totalItems } = useCart();

  return (
    <nav className="navbar">
      <Link href="/" className="navbar-brand">
        <img src="/tla-navbar-logo-v3.png" alt="The Legendary Africans" />
      </Link>

      <div className="navbar-links">
        <Link href="/">Home</Link>
        <Link href="/shop">Shop</Link>
        <Link href="/music">Music</Link>
        <Link href="/stories">Stories</Link>
        <Link href="/culture">Culture</Link>
        <Link href="/about">About</Link>
        <Link href="/branding">Branding</Link>
        <Link href="/cart" className="navbar-cart">
          Cart
          {totalItems > 0 && (
            <span className="navbar-cart-badge">{totalItems}</span>
          )}
        </Link>
      </div>
    </nav>
  );
}