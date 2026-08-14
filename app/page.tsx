import Navbar from "./components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />

      <h1>TEST TLA</h1>

      <main className="hero">
        <h1>THE LEGENDARY AFRICANS</h1>

        <p>Fashion. Music. Culture. Stories.</p>

        <div className="hero-buttons">
          <button>Explore Fashion</button>
          <button>Discover Music</button>
        </div>
      </main>
    </>
  );
}