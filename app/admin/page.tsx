"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabaseClient";

export default function AdminDashboard() {
  const [checking, setChecking] = useState(true);
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        router.push("/admin/login");
      } else {
        setChecking(false);
      }
    });
  }, [router]);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/admin/login");
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
        <h1>Admin Dashboard</h1>
        <button onClick={handleLogout} className="admin-logout-btn">
          Log Out
        </button>
      </div>
     <p style={{ color: "#aaaaaa", marginBottom: "20px" }}>
  Welcome — manage your site content below.
</p>
<div style={{ display: "flex", gap: "12px" }}>
  <Link href="/admin/products" className="admin-save-btn" style={{ textDecoration: "none", display: "inline-block" }}>
    Manage Products
  </Link>
  <Link href="/admin/tracks" className="admin-save-btn" style={{ textDecoration: "none", display: "inline-block" }}>
    Manage Tracks
  </Link>
  <Link href="/admin/culture" className="admin-save-btn" style={{ textDecoration: "none", display: "inline-block" }}>
    Manage Culture
  </Link>
  <Link href="/admin/orders" className="admin-save-btn" style={{ textDecoration: "none", display: "inline-block" }}>
    Manage Orders
  </Link>
</div>
    </main>
  );
}