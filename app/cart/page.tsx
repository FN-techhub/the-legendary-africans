"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";
import Link from "next/link";

export default function Cart() {
  const { items, removeFromCart, updateQuantity, totalPrice } = useCart();

  return (
    <>
      <Navbar />

      <main className="shop-page">
        <section className="shop-header">
          <h1>YOUR CART</h1>
          <p>Review your items before checkout.</p>
        </section>

        {items.length === 0 ? (
          <div className="cart-empty">
            <p>Your cart is empty.</p>
            <Link href="/shop" className="product-button">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <section className="cart-section">
            <div className="cart-items">
              {items.map((item) => (
                <div key={item.id} className="cart-item">
                  <img src={item.image} alt={item.name} className="cart-item-image" />

                  <div className="cart-item-info">
                    <h2>{item.name}</h2>
                    <p className="cart-item-price">
                      KES {item.price.toLocaleString()}
                    </p>
                  </div>

                  <div className="cart-item-quantity">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      −
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>

                  <p className="cart-item-subtotal">
                    KES {(item.price * item.quantity).toLocaleString()}
                  </p>

                  <button
                    className="cart-item-remove"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <div className="cart-summary-row">
                <span>Total</span>
                <span>KES {totalPrice.toLocaleString()}</span>
              </div>

              <Link href="/checkout" className="cart-checkout-button">
                Proceed to Checkout
              </Link>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </>
  );
}