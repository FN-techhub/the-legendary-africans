"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { supabase } from "../../lib/supabaseClient";

const SERVICE_LABELS: Record<string, string> = {
  tshirts: "T-Shirts",
  hoodies: "Hoodies",
  caps: "Caps",
  uniforms: "School Uniforms",
  reflectors: "Reflectors",
  identity: "Logo & Brand Identity",
};

function QuoteForm() {
  const searchParams = useSearchParams();
  const presetType = searchParams.get("type") || "";

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service_type: presetType,
    quantity: "",
    details: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");

    const { error } = await supabase.from("branding_quotes").insert([
      { ...form, status: "new" },
    ]);

    if (error) {
      setStatus("error");
    } else {
      setStatus("success");
    }
  }

  if (status === "success") {
    return (
      <div className="quote-success">
        <h1>Request Received!</h1>
        <p>
          Thanks, {form.name.split(" ")[0]} — we&apos;ll get back to you shortly
          with a quote for your {SERVICE_LABELS[form.service_type] || "order"}.
        </p>
      </div>
    );
  }

  return (
    <div className="quote-page">
      <div className="quote-header">
        <h1>REQUEST A QUOTE</h1>
        <p>Tell us what you need and we&apos;ll get back to you with pricing.</p>
      </div>

      <form className="quote-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Full name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          type="tel"
          placeholder="Phone number"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          required
        />

        <select
          value={form.service_type}
          onChange={(e) => setForm({ ...form, service_type: e.target.value })}
          required
        >
          <option value="">Select a service</option>
          {Object.entries(SERVICE_LABELS).map(([key, label]) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Quantity (e.g. 20, or 50+)"
          value={form.quantity}
          onChange={(e) => setForm({ ...form, quantity: e.target.value })}
          required
        />

        <textarea
          placeholder="Tell us more about what you need — colors, deadline, design ideas, etc."
          value={form.details}
          onChange={(e) => setForm({ ...form, details: e.target.value })}
          rows={5}
          required
        />

        {status === "error" && (
          <p className="quote-error">Something went wrong. Please try again.</p>
        )}

        <button type="submit" className="btn-primary" disabled={status === "loading"}>
          {status === "loading" ? "Submitting..." : "Submit Request"}
        </button>
      </form>
    </div>
  );
}

export default function BrandingQuote() {
  return (
    <>
      <Navbar />
      <main className="branding-page">
        <Suspense fallback={<p style={{ color: "#fff", textAlign: "center", padding: "120px 20px" }}>Loading...</p>}>
          <QuoteForm />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}