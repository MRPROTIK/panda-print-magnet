const headerHTML = `
<header class="site-header">
  <div class="container header-inner">
    <a class="brand" href="index.html">
      <img src="assets/images/Pandaprintmagnet.png" alt="Panda Print Magnets logo">
      <span class="brand-name">Panda Print Magnets</span>
    </a>

    <nav class="main-nav" id="main-nav">
      <a href="index.html">Home</a>
      <a href="magnets.html">Magnets</a>
      <a href="bulk-orders.html">Bulk Orders</a>
      <a href="events.html">Events</a>
      <a href="give-back.html">Give Back</a>
      <a href="our-story.html">Our Story</a>
    </nav>

    <div class="header-right">
      <a class="cart-link" href="cart.html">Cart</a>
      <button class="hamburger" id="hamburger-btn" aria-label="Open menu" type="button">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
  </div>

  <div class="mobile-menu" id="mobile-menu">
    <a href="index.html">Home</a>
    <a href="magnets.html">Magnets</a>
    <a href="bulk-orders.html">Bulk Orders</a>
    <a href="events.html">Events</a>
    <a href="give-back.html">Give Back</a>
    <a href="our-story.html">Our Story</a>
    <a href="cart.html" class="mobile-cart-link">Cart</a>
  </div>
</header>
`;

const footerHTML = `
<footer class="site-footer">
  <div class="footer-grid container">
    <div class="footer-brand">
      <img src="assets/images/Pandaprintmagnet.png" alt="Panda Print Magnets logo">
      <p>Premium custom photo magnets for families, events, and businesses.</p>
    </div>
    <div class="footer-links">
      <h3>Products</h3>
      <a href="magnets.html">Photo Magnets</a>
      <a href="bulk-orders.html">Bulk Orders</a>
    </div>
    <div class="footer-links">
      <h3>Company</h3>
      <a href="our-story.html">Our Story</a>
      <a href="give-back.html">Give Back</a>
      <a href="events.html">Events</a>
    </div>
    <div class="footer-links">
      <h3>Support</h3>
      <a href="#">Contact</a>
      <a href="#">Shipping Info</a>
      <a href="#">FAQs</a>
    </div>
  </div>
  <div class="footer-note">
    © 2026 Panda Print Magnets. All rights reserved.
  </div>
</footer>
`;

document.addEventListener("DOMContentLoaded", () => {
  const headerMount = document.querySelector("#site-header");
  const footerMount = document.querySelector("#site-footer");

  if (headerMount) headerMount.innerHTML = headerHTML;
  if (footerMount) footerMount.innerHTML = footerHTML;

  // Active nav link
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".main-nav a, .mobile-menu a").forEach(link => {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
    }
  });

  // Hamburger toggle
  const hamburger = document.querySelector("#hamburger-btn");
  const mobileMenu = document.querySelector("#mobile-menu");

  if (hamburger && mobileMenu) {
    hamburger.addEventListener("click", () => {
      const isOpen = mobileMenu.classList.toggle("open");
      hamburger.classList.toggle("open", isOpen);
    });

    mobileMenu.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        mobileMenu.classList.remove("open");
        hamburger.classList.remove("open");
      });
    });
  }
});
