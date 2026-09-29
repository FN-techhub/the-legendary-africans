"use client";

import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";
import { supabase } from "../lib/supabaseClient";

type Product = {
  id: number;
  name: string;
  category: string;
  price: string;
  image: string;
};

const categories = ["All", "T-Shirts", "Hoodies", "Caps", "Accessories"];

function parsePrice(price: string) {
  return Number(price.replace(/[^0-9.]/g, ""));
}

export default function Shop() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState("default");

  useEffect(() => {
    async function fetchProducts() {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: true });

      if (!error && data) {
        setProducts(data);
      }
      setLoading(false);
    }

    fetchProducts();
  }, []);

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
          {loading
            ? "Loading products..."
            : `${sortedProducts.length} ${sortedProducts.length === 1 ? "item" : "items"}`}
        </p>

        <section className="products-grid">
          {sortedProducts.map((product) => (
            <ProductCard
              key={product.id}
               id={String(product.id)}
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