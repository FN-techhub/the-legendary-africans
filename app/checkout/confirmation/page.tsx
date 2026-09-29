"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { supabase } from "../../lib/supabaseClient";

type OrderItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

type Order = {
  id: string;
  customer_name: string;
  customer_phone: string;
  total_amount: number;
  delivery_address: string;
  items: OrderItem[];
  payment_status: string;
};

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrder() {
      if (!orderId) {
        setLoading(false);
        return;
      }

      // Fetch order directly from Supabase
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .eq("id", orderId)
        .single();

      if (data && !error) {
        setOrder(data as Order);
      }
      setLoading(false);
    }

    fetchOrder();
  }, [orderId]);

  return (
    <section className="checkout-section">
      <div className="cart-empty">
        {loading ? (
          <p style={{ marginBottom: "25px" }}>Loading your order...</p>
        ) : order ? (
          <>
            <p style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "15px" }}>
              Thanks, {order.customer_name}! Your order has been confirmed.
            </p>

            <p style={{ color: "#888888", marginBottom: "8px", fontSize: "14px" }}>
              Order ID: <strong style={{ color: "#ffffff" }}>{order.id}</strong>
            </p>

            <p style={{ color: "#888888", marginBottom: "8px", fontSize: "14px" }}>
              Delivering to: <strong style={{ color: "#ffffff" }}>{order.delivery_address}</strong>
            </p>

            {/* Display list of purchased items if available */}
            {order.items && order.items.length > 0 && (
              <div
                style={{
                  borderTop: "1px solid #333",
                  borderBottom: "1px solid #333",
                  padding: "15px 0",
                  margin: "20px 0",
                  textAlign: "left",
                  maxWidth: "400px",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              >
                <p style={{ fontWeight: "bold", marginBottom: "10px", fontSize: "14px" }}>
                  Items Ordered:
                </p>
                {order.items.map((item, index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: "14px",
                      marginBottom: "6px",
                      color: "#ccc",
                    }}
                  >
                    <span>{item.name} × {item.quantity}</span>
                    <span>KES {(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>
            )}

            <p style={{ color: "#888888", marginBottom: "25px", fontSize: "16px" }}>
              Total Paid: <strong style={{ color: "#4CAF50" }}>KES {order.total_amount?.toLocaleString()}</strong>
            </p>
          </>
        ) : (
          <p style={{ marginBottom: "25px", color: "#ff4d4d" }}>Order not found.</p>
        )}

        <Link href="/shop" className="product-button">
          Continue Shopping
        </Link>
      </div>
    </section>
  );
}

export default function OrderConfirmation() {
  return (
    <>
      <Navbar />

      <main className="shop-page">
        <section className="shop-header">
          <h1>ORDER CONFIRMED</h1>
          <p>Thank you for shopping with The Legendary Africans.</p>
        </section>

        <Suspense fallback={<div className="cart-empty"><p>Loading...</p></div>}>
          <ConfirmationContent />
        </Suspense>
      </main>

      <Footer />
    </>
  );
}