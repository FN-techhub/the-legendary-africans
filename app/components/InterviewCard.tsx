interface InterviewCardProps {
  title: string;
  guest: string;
  link: string;
}

export default function InterviewCard({
  title,
  guest,
  link,
}: InterviewCardProps) {
  return (
    
      <a href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="interview-card"
    >
      <div className="interview-thumbnail">
        <span className="interview-play-icon">▶</span>
      </div>

      <div className="interview-info">
        <h3>{title}</h3>
        <p className="interview-guest">{guest}</p>
      </div>
    </a>
  );
}