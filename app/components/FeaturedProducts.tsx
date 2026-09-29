import ProductCard from "./ProductCard";

const featuredProducts = [
  {
    id: "ankara-bomber-jacket",
    name: "Ankara Bomber Jacket",
    category: "Outerwear",
    price: "$120",
    image: "/images/placeholder-1.jpg",
  },
  {
    id: "legendary-tee",
    name: "Legendary Tee",
    category: "Apparel",
    price: "$45",
    image: "/images/placeholder-2.jpg",
  },
  {
    id: "heritage-cap",
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
          View all &rarr;
        </a>
      </div>

      <div className="featured-grid">
        {featuredProducts.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
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
