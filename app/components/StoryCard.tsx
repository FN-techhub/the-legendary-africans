interface StoryCardProps {
  title: string;
  excerpt: string;
  category: string;
  link: string;
}

export default function StoryCard({
  title,
  excerpt,
  category,
  link,
}: StoryCardProps) {
  return (
    <article className="story-card">
      <div className="story-cover-placeholder">
        {title}
      </div>

      <div className="story-info">
        <p className="story-category">{category}</p>
        <h2>{title}</h2>
        <p className="story-excerpt">{excerpt}</p>

        <a href={link} className="story-button">
          Read More
        </a>
      </div>
    </article>
  );
}