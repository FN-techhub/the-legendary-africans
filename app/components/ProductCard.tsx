interface ProductCardProps {
  name: string;
  category: string;
  price: string;
  image: string;
}

export default function ProductCard({
  name,
  category,
  price,
  image,
}: ProductCardProps) {
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

        <button className="product-button">
          View Item
        </button>

      </div>

    </article>
  );
}