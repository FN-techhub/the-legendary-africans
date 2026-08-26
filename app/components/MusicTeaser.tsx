export default function MusicTeaser() {
  const videoId = "fSCoSxgSYHI";
  const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
  const thumbnail = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  return (
    <section className="music-teaser">
      <div className="music-teaser-text">
        <p className="music-teaser-label">Latest release</p>
        <h2>Upper Echelon</h2>
        <p className="music-teaser-description">
          Stream the video and catch every release on the Music page.
        </p>
        <a href={videoUrl} target="_blank" rel="noopener noreferrer" className="music-teaser-link">
          Watch on YouTube →
        </a>
      </div>

      
        <a href={videoUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="music-teaser-thumb"
        aria-label="Watch Upper Echelon on YouTube"
      >
        <img src={thumbnail} alt="Upper Echelon" />
        <span className="play-button">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="#050505">
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
      </a>
    </section>
  );
}