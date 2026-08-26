export default function StoryTeaser() {
  const videoId = "yjyZK0UeEnQ";
  const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
 const thumbnail = "/only-love.jpg.webp";

  return (
    <section className="story-teaser">
      
        <a href={videoUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="story-teaser-thumb"
        aria-label="Watch the story behind Only Love"
      >
        <img src={thumbnail} alt="The story behind Only Love" />
        <span className="play-button">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="#050505">
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
      </a>

      <div className="story-teaser-text">
        <p className="story-teaser-label">Behind the music</p>
        <h2>The story behind &ldquo;Only Love&rdquo;</h2>
        <p className="story-teaser-description">
          Go behind the scenes and hear the story that inspired the single — straight from the source.
        </p>
        <a href={videoUrl} target="_blank" rel="noopener noreferrer" className="story-teaser-link">
          Watch the story →
        </a>
      </div>
    </section>
  );
}