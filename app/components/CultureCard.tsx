interface CultureCardProps {
  title: string;
  excerpt: string;
  image: string;
  type: string;
  category: string;
}

export default function CultureCard({
  title,
  excerpt,
  image,
  type,
  category,
}: CultureCardProps) {
  return (
    <article className="story-card">
      <div className="story-cover-placeholder">
        <img src={image} alt={title} className="culture-image" />
      </div>

      <div className="story-info">
        <p className="story-category">
          {type} · {category}
        </p>
        <h2>{title}</h2>
        <p className="story-excerpt">{excerpt}</p>
      </div>
    </article>
  );
}