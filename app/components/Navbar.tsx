export default function Navbar() {
  return (
    <nav className="navbar">
      <a href="/" className="navbar-brand">
        <img src="/tla-navbar-logo-v3.png" alt="The Legendary Africans" />
      </a>

      <div className="navbar-links">
        <a href="/">Home</a>
        <a href="/shop">Shop</a>
        <a href="/music">Music</a>
        <a href="/stories">Stories</a>
        <a href="/culture">Culture</a>
        <a href="/about">About</a>
      </div>
    </nav>
  );
}