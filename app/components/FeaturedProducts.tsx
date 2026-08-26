import ProductCard from "./ProductCard";

const featuredProducts = [
  {
    name: "Ankara Bomber Jacket",
    category: "Outerwear",
    price: "$120",
    image: "/images/placeholder-1.jpg",
  },
  {
    name: "Legendary Tee",
    category: "Apparel",
    price: "$45",
    image: "/images/placeholder-2.jpg",
  },
  {
    name: "Heritage Cap",
    category: "Accessories",
    price: "$35",
    image: "/images/placeholder-3.jpg",
  },
];

export default function FeaturedProducts() {
  return (
    <section className="featured">
      <div className="featured-header">
        <h2>Wear the culture</h2>
        <a href="/shop" className="featured-link">
          View all →
        </a>
      </div>

      <div className="featured-grid">
        {featuredProducts.map((product) => (
          <ProductCard
            key={product.name}
            name={product.name}
            category={product.category}
            price={product.price}
            image={product.image}
          />
        ))}
      </div>
    </section>
  );
}