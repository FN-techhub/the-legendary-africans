interface ReleaseCardProps {
  title: string;
  type: string;
  year: string;
  link: string;
}

export default function ReleaseCard({
  title,
  type,
  year,
  link,
}: ReleaseCardProps) {
  return (
    <article className="release-card">
      <div className="release-cover-placeholder">
        {title}
      </div>

      <div className="release-info">
        <p className="release-type">{type}</p>
        <h2>{title}</h2>
        <p className="release-year">{year}</p>

        
          <a href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="release-button"
        >
          Listen Now
        </a>
      </div>
    </article>
  );
}