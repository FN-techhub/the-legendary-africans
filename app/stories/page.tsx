import Navbar from "../components/Navbar";
import StoryCard from "../components/StoryCard";
import InterviewCard from "../components/InterviewCard";
import Footer from "../components/Footer";

const interviews = [
  {
    title: "The Story Behind TLA Anthem",
    guest: "In conversation with the artist",
    link: "https://youtube.com/",
  },
  {
    title: "Building The Legendary Africans",
    guest: "Founder interview",
    link: "https://youtube.com/",
  },
  {
    title: "Fashion Meets Culture",
    guest: "Behind the clothing line",
    link: "https://youtube.com/",
  },
];

const stories = [
  {
    title: "How It All Began",
    excerpt: "The journey behind The Legendary Africans, from concept to reality.",
    category: "Origin Story",
    link: "#",
    featured: true,
  },
  {
    title: "Culture Through Cloth",
    excerpt: "Why the clothing line carries more than just style — it carries identity.",
    category: "Culture",
    link: "#",
  },
  {
    title: "The Sound of Legacy",
    excerpt: "Behind the making of our latest music releases.",
    category: "Music",
    link: "#",
  },
];

export default function Stories() {
  const featuredStory = stories.find((story) => story.featured);
  const otherStories = stories.filter((story) => !story.featured);

  return (
    <>
      <Navbar />

      <main className="shop-page">
        <section className="shop-header">
          <h1>STORIES</h1>
          <p>Voices behind the vision.</p>
        </section>

        {featuredStory && (
          <section className="featured-release">
            <div className="featured-release-cover">
              {featuredStory.title}
            </div>
            <div className="featured-release-info">
              <p className="featured-release-label">Featured Story</p>
              <h2>{featuredStory.title}</h2>
              <p className="featured-release-meta">
                {featuredStory.category}
              </p>
              <p className="story-excerpt">
                {featuredStory.excerpt}
              </p>
              <a href={featuredStory.link} className="featured-release-button">
                Read More
              </a>
            </div>
          </section>
        )}

        <section className="interviews-section">
          <h2 className="section-title">Interviews</h2>
          <div className="interviews-grid">
            {interviews.map((interview) => (
              <InterviewCard
                key={interview.title}
                title={interview.title}
                guest={interview.guest}
                link={interview.link}
              />
            ))}
          </div>
        </section>

        <section className="stories-section">
          <h2 className="section-title">Written Stories</h2>
          <div className="products-grid">
            {otherStories.map((story) => (
              <StoryCard
                key={story.title}
                title={story.title}
                excerpt={story.excerpt}
                category={story.category}
                link={story.link}
              />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}