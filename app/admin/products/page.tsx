"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "../../lib/supabaseClient";

type Product = {
  id: number;
  name: string;
  category: string;
  price: string;
  image: string;
};

const categories = ["T-Shirts", "Hoodies", "Caps", "Accessories"];

export default function AdminProducts() {
  const [checking, setChecking] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [form, setForm] = useState({
    name: "",
    category: categories[0],
    price: "",
    image: "/tla-logo.png",
  });

  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        router.push("/admin/login");
      } else {
        setChecking(false);
        fetchProducts();
      }
    });
  }, [router]);

  async function fetchProducts() {
    const { data } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: true });
    if (data) setProducts(data);
  }

  function resetForm() {
    setForm({ name: "", category: categories[0], price: "", image: "/tla-logo.png" });
    setEditingId(null);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (editingId) {
      await supabase.from("products").update(form).eq("id", editingId);
    } else {
      await supabase.from("products").insert([form]);
    }

    resetForm();
    fetchProducts();
  }

  function startEdit(product: Product) {
    setEditingId(product.id);
    setForm({
      name: product.name,
      category: product.category,
      price: product.price,
      image: product.image,
    });
  }

  async function handleDelete(id: number) {
    if (!confirm("Delete this product?")) return;
    await supabase.from("products").delete().eq("id", id);
    fetchProducts();
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
        <h1>Manage Products</h1>
        <Link href="/admin" className="admin-logout-btn">
          ← Back to Dashboard
        </Link>
      </div>

      <form className="admin-product-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Product name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
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
          placeholder="Price (e.g. KES 2,500)"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Image path (e.g. /tla-logo.png)"
          value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
          required
        />
        <div className="admin-form-buttons">
          <button type="submit" className="admin-save-btn">
            {editingId ? "Update Product" : "Add Product"}
          </button>
          {editingId && (
            <button type="button" onClick={resetForm} className="admin-cancel-btn">
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="admin-product-list">
        {products.map((product) => (
          <div key={product.id} className="admin-product-row">
            <img src={product.image} alt={product.name} />
            <div className="admin-product-info">
              <p className="admin-product-name">{product.name}</p>
              <p className="admin-product-meta">
                {product.category} · {product.price}
              </p>
            </div>
            <div className="admin-product-actions">
              <button onClick={() => startEdit(product)}>Edit</button>
              <button onClick={() => handleDelete(product.id)} className="admin-delete-btn">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}