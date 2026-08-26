"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";

const products = [
  { name: "TLA Classic Tee", category: "T-Shirts", price: "KES 2,500", image: "/tla-logo.png" },
  { name: "TLA Signature Tee", category: "T-Shirts", price: "KES 2,500", image: "/tla-logo.png" },
  { name: "TLA Heritage Tee", category: "T-Shirts", price: "KES 2,800", image: "/tla-logo.png" },
  { name: "TLA Hoodie", category: "Hoodies", price: "KES 4,500", image: "/tla-logo.png" },
  { name: "TLA Pullover Hoodie", category: "Hoodies", price: "KES 4,800", image: "/tla-logo.png" },
  { name: "TLA Zip Hoodie", category: "Hoodies", price: "KES 5,200", image: "/tla-logo.png" },
  { name: "TLA Snapback Cap", category: "Caps", price: "KES 1,800", image: "/tla-logo.png" },
  { name: "TLA Dad Cap", category: "Caps", price: "KES 1,600", image: "/tla-logo.png" },
  { name: "TLA Bucket Hat", category: "Caps", price: "KES 2,000", image: "/tla-logo.png" },
  { name: "TLA Tote Bag", category: "Accessories", price: "KES 1,200", image: "/tla-logo.png" },
  { name: "TLA Enamel Pin", category: "Accessories", price: "KES 600", image: "/tla-logo.png" },
];

const categories = ["All", "T-Shirts", "Hoodies", "Caps", "Accessories"];

function parsePrice(price: string) {
  return Number(price.replace(/[^0-9.]/g, ""));
}

export default function Shop() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState("default");

  const filteredProducts =
    activeCategory === "All"
      ? [...products]
      : products.filter((product) => product.category === activeCategory);

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-asc") return parsePrice(a.price) - parsePrice(b.price);
    if (sortBy === "price-desc") return parsePrice(b.price) - parsePrice(a.price);
    if (sortBy === "name-asc") return a.name.localeCompare(b.name);
    return 0;
  });

  return (
    <>
      <Navbar />

      <main className="shop-page">
        <section className="shop-header">
          <h1>THE SHOP</h1>
          <p>Wear the culture. Represent the legacy.</p>
        </section>

        <section className="shop-controls">
          <div className="shop-filters">
            {categories.map((category) => (
              <button
                key={category}
                className={`filter-btn ${activeCategory === category ? "active" : ""}`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          <select
            className="sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="default">Sort: Featured</option>
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
            <option value="name-asc">Name: A–Z</option>
          </select>
        </section>

        <p className="shop-count">
          {sortedProducts.length} {sortedProducts.length === 1 ? "item" : "items"}
        </p>

        <section className="products-grid">
          {sortedProducts.map((product) => (
            <ProductCard
              key={product.name}
              name={product.name}
              category={product.category}
              price={product.price}
              image={product.image}
            />
          ))}
        </section>
      </main>

      <Footer />
    </>
  );
}