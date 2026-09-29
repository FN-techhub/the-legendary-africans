"use client";

import { useCart } from "../context/CartContext";

interface ProductCardProps {
  id: string;
  name: string;
  category: string;
  price: string;
  image: string;
}

export default function ProductCard({
  id,
  name,
  category,
  price,
  image,
}: ProductCardProps) {
  const { addToCart } = useCart();

  function handleAddToCart() {
    const numericPrice = Number(price.replace(/[^0-9.]/g, ""));

    addToCart({
      id,
      name,
      price: numericPrice,
      image,
    });
  }

  return (
    <article className="product-card">

      <div className="product-image">
        <img
          src={image}
          alt={name}
        />
      </div>

      <div className="product-info">

        <p className="product-category">
          {category}
        </p>

        <h2>
          {name}
        </h2>

        <p className="product-price">
          {price}
        </p>

        <button className="product-button" onClick={handleAddToCart}>
          Add to Cart
        </button>

      </div>

    </article>
  );
}