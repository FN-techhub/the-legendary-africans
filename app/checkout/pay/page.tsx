"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { supabase } from "../../lib/supabaseClient";

function PayForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderId = searchParams.get("orderId");

  const [phoneNumber, setPhoneNumber] = useState("");
  const [orderTotal, setOrderTotal] = useState<number | null>(null);
  const [loadingOrder, setLoadingOrder] = useState(true);
  const [status, setStatus] = useState<
    "idle" | "sending" | "waiting" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  // 1. Fetch order details on load to pre-fill phone and display total
  useEffect(() => {
    if (!orderId) {
      setLoadingOrder(false);
      return;
    }

    async function fetchOrder() {
      const { data, error } = await supabase
        .from("orders")
        .select("customer_phone, total_amount")
        .eq("id", orderId)
        .single();

      if (data) {
        if (data.customer_phone) setPhoneNumber(data.customer_phone);
        if (data.total_amount) setOrderTotal(data.total_amount);
      }
      setLoadingOrder(false);
    }

    fetchOrder();
  }, [orderId]);

  // Helper function to format phone numbers to Safaricom format: 254XXXXXXXXX
  function formatPhone(phone: string): string {
    let clean = phone.replace(/\D/g, ""); // Remove non-digit characters
    if (clean.startsWith("0")) {
      clean = "254" + clean.substring(1);
    } else if (clean.startsWith("7") || clean.startsWith("1")) {
      clean = "254" + clean;
    }
    return clean;
  }

  async function handlePay(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setErrorMessage("");

    const formattedPhone = formatPhone(phoneNumber);

    try {
      const response = await fetch("/api/mpesa/stkpush", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phoneNumber: formattedPhone,
          orderId,
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setStatus("waiting");
      } else {
        setStatus("error");
        setErrorMessage(
          result.error || result.message || "Payment request failed. Please try again."
        );
      }
    } catch (err) {
      setStatus("error");
      setErrorMessage("Network error. Please check your connection.");
    }
  }

  // 2. Poll Supabase every 3 seconds while status === "waiting"
  useEffect(() => {
    if (status !== "waiting" || !orderId) return;

    const interval = setInterval(async () => {
      const { data } = await supabase
        .from("orders")
        .select("payment_status")
        .eq("id", orderId)
        .single();

      if (data?.payment_status === "paid") {
        clearInterval(interval);
        router.push(`/checkout/confirmation?orderId=${orderId}`);
      } else if (data?.payment_status === "failed") {
        clearInterval(interval);
        setStatus("error");
        setErrorMessage("Payment was canceled or failed. Please try again.");
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [status, orderId, router]);

  if (loadingOrder) {
    return (
      <div className="cart-empty">
        <p>Loading order details...</p>
      </div>
    );
  }

  if (!orderId) {
    return (
      <div className="cart-empty">
        <p>No order found.</p>
      </div>
    );
  }

  return (
    <section className="checkout-section">
      {orderTotal !== null && (
        <div className="checkout-total" style={{ marginBottom: "20px" }}>
          <span>Amount to Pay:</span>
          <span>KES {orderTotal.toLocaleString()}</span>
        </div>
      )}

      {status === "waiting" ? (
        <div className="cart-empty">
          <p> Check your phone and enter your M-Pesa PIN to complete payment.</p>
          <p style={{ color: "#666666", fontSize: "13px", marginTop: "15px" }}>
            Waiting for payment confirmation...
          </p>
          <button
            onClick={() => setStatus("idle")}
            style={{ marginTop: "20px", cursor: "pointer", background: "none", border: "1px solid #ccc", padding: "8px 16px", borderRadius: "4px" }}
          >
            Resend Prompt
          </button>
        </div>
      ) : (
        <form className="checkout-form" onSubmit={handlePay}>
          <label>
            M-Pesa Phone Number
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="e.g. 0712345678"
              required
            />
          </label>

          {status === "error" && (
            <p className="checkout-error">{errorMessage}</p>
          )}

          <button
            type="submit"
            className="cart-checkout-button"
            disabled={status === "sending"}
          >
            {status === "sending" ? "Sending prompt..." : "Send Payment Prompt"}
          </button>
        </form>
      )}
    </section>
  );
}

export default function CheckoutPay() {
  return (
    <>
      <Navbar />
      <main className="shop-page">
        <section className="shop-header">
          <h1>PAY WITH M-PESA</h1>
          <p>Enter your phone number to receive the payment prompt on your phone.</p>
        </section>
        <Suspense fallback={<div className="cart-empty"><p>Loading...</p></div>}>
          <PayForm />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}