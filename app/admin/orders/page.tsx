"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "../../lib/supabaseClient";

type Order = {
  id: string;
  created_at: string;
  customer_name: string;
  customer_phone: string;
  customer_email: string | null;
  delivery_address: string;
  items: { name: string; quantity: number; price: number }[];
  total_amount: number;
  payment_method: string;
  payment_status: string;
  order_status: string;
};

const orderStatuses = ["pending", "processing", "shipped", "delivered"];

export default function AdminOrders() {
  const [checking, setChecking] = useState(true);
  const [orders, setOrders] = useState<Order[]>([]);

  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        router.push("/admin/login");
      } else {
        setChecking(false);
        fetchOrders();
      }
    });
  }, [router]);

  async function fetchOrders() {
    const { data } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setOrders(data);
  }

  async function updateOrderStatus(id: string, newStatus: string) {
    await supabase.from("orders").update({ order_status: newStatus }).eq("id", id);
    fetchOrders();
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
        <h1>Manage Orders</h1>
        <Link href="/admin" className="admin-logout-btn">
          Back to Dashboard
        </Link>
      </div>

      <div className="admin-product-list">
        {orders.map((order) => (
          <div key={order.id} className="admin-order-row">
            <div className="admin-order-header">
              <p className="admin-product-name">{order.customer_name}</p>
              <p className="admin-order-date">
                {new Date(order.created_at).toLocaleDateString()}
              </p>
            </div>

            <p className="admin-product-meta">
              {order.customer_phone}
              {order.customer_email ? " - " + order.customer_email : ""}
            </p>
            <p className="admin-product-meta">{order.delivery_address}</p>

            <div className="admin-order-items">
              {order.items.map((item, index) => (
                <p key={index} className="admin-order-item-line">
                  {item.quantity}x {item.name} - KES{" "}
                  {(item.price * item.quantity).toLocaleString()}
                </p>
              ))}
            </div>

            <div className="admin-order-footer">
              <p className="admin-order-total">
                Total: KES {order.total_amount.toLocaleString()}
              </p>

              <span className={"admin-order-badge admin-order-badge-" + order.payment_status}>
                {order.payment_method.toUpperCase()} - {order.payment_status}
              </span>

              <select
                value={order.order_status}
                onChange={(e) => updateOrderStatus(order.id, e.target.value)}
              >
                {orderStatuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
          </div>
        ))}

        {orders.length === 0 && (
          <p style={{ color: "#888888" }}>No orders yet.</p>
        )}
      </div>
    </main>
  );
}
