import Navbar from "../components/Navbar";

export default function Shop() {
  return (
    <>
      <Navbar />

      <main className="shop-page">

        <section className="shop-hero">
          <p className="shop-label">THE LEGENDARY AFRICANS</p>

          <h1>THE SHOP</h1>

          <p className="shop-intro">
            Discover fashion, artwork, and pieces inspired by
            African identity, creativity, and culture.
          </p>
        </section>

        <section className="shop-categories">

          <div className="shop-card">
            <h2>Clothing</h2>

            <p>
              T-shirts, hoodies, jackets and statement pieces.
            </p>

            <button>Explore Clothing</button>
          </div>

          <div className="shop-card">
            <h2>Artwork</h2>

            <p>
              African-inspired artwork and creative pieces.
            </p>

            <button>Explore Artwork</button>
          </div>

          <div className="shop-card">
            <h2>Accessories</h2>

            <p>
              Unique accessories designed to represent identity
              and culture.
            </p>

            <button>Explore Accessories</button>
          </div>

        </section>

      </main>
    </>
  );
}