"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";
import { supabase } from "../lib/supabaseClient";

export default function Checkout() {
  const { items, totalPrice, clearCart } = useCart();
  const router = useRouter();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("mpesa");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    const orderId = crypto.randomUUID();

    const { error: insertError } = await supabase.from("orders").insert([
      {
        id: orderId,
        customer_name: name,
        customer_phone: phone,
        customer_email: email || null,
        delivery_address: address,
        items: items,
        total_amount: totalPrice,
        payment_method: paymentMethod,
      },
    ]);

    if (insertError) {
      console.log(insertError);
      setError(insertError.message);
      setSubmitting(false);
      return;
    }

    clearCart();
    router.push(`/checkout/pay?orderId=${orderId}`);
  }

  if (items.length === 0) {
    return (
      <>
        <Navbar />
        <main className="shop-page">
          <div className="cart-empty">
            <p>Your cart is empty — nothing to check out.</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="shop-page">
        <section className="shop-header">
          <h1>CHECKOUT</h1>
          <p>Enter your details to complete your order.</p>
        </section>

        <section className="checkout-section">
          <form className="checkout-form" onSubmit={handleSubmit}>
            <label>
              Full Name
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </label>

            <label>
              Phone Number
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. 0712345678"
                required
              />
            </label>

            <label>
              Email (optional)
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>

            <label>
              Delivery Address
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                rows={3}
                required
              />
            </label>

            <div className="checkout-payment-options">
              <p>Payment Method</p>

              <label className="checkout-radio">
                <input
                  type="radio"
                  name="payment"
                  value="mpesa"
                  checked={paymentMethod === "mpesa"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                M-Pesa
              </label>

              <label className="checkout-radio">
                <input
                  type="radio"
                  name="payment"
                  value="card"
                  checked={paymentMethod === "card"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                Card
              </label>
            </div>

            {error && <p className="checkout-error">{error}</p>}

            <div className="checkout-total">
              <span>Total</span>
              <span>KES {totalPrice.toLocaleString()}</span>
            </div>

            <button
              type="submit"
              className="cart-checkout-button"
              disabled={submitting}
            >
              {submitting ? "Processing..." : "Continue to Payment"}
            </button>
          </form>
        </section>
      </main>

      <Footer />
    </>
  );
}