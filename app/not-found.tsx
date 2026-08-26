import Link from "next/link";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function NotFound() {
  return (
    <>
      <Navbar />

      <main className="not-found-page">
        <p className="not-found-code">404</p>
        <h1>THIS PAGE DOESN&apos;T EXIST</h1>
        <p className="not-found-text">
          Looks like this page wandered off the path. Let&apos;s get you back
          to the culture.
        </p>
        <Link href="/" className="btn-primary not-found-button">
          Back to Home
        </Link>
      </main>

      <Footer />
    </>
  );
}