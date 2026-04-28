const headerHTML = `
<header class="site-header">
  <div class="header-inner">
    <a class="brand" href="index.html">
      <img src="assets/images/Pandaprintmagnet.png" alt="Panda Print Magnets logo">
      <span>Panda Print Magnets</span>
    </a>

    <nav class="main-nav">
      <a href="index.html">Home</a>
      <a href="magnets.html">Magnets</a>
      <a href="bulk-orders.html">Bulk Orders</a>
      <a href="events.html">Events</a>
      <a href="give-back.html">Give Back</a>
      <a href="our-story.html">Our Story</a>
    </nav>

    <a class="cart-link" href="cart.html">🛒 Cart</a>

    <button class="hamburger" id="hamburger-btn" aria-label="Open menu" aria-expanded="false">
      <span></span>
      <span></span>
      <span></span>
    </button>
  </div>
</header>

<nav class="mobile-nav" id="mobile-nav" aria-hidden="true">
  <div class="mobile-nav-brand">
    <img src="assets/images/Pandaprintmagnet.png" alt="Panda Print Magnets">
    <span>Panda Print Magnets</span>
  </div>
  <div class="mobile-nav-links">
    <a href="index.html">Home</a>
    <a href="magnets.html">Magnets</a>
    <a href="bulk-orders.html">Bulk Orders</a>
    <a href="events.html">Events</a>
    <a href="give-back.html">Give Back</a>
    <a href="our-story.html">Our Story</a>
  </div>
  <a href="cart.html" class="mobile-cart">🛒 View Cart</a>
</nav>
`;

const footerHTML = `
<footer class="site-footer">

  <div class="footer-top">
    <div class="footer-brand-col">
      <div class="footer-logo-wrap">
        <img src="assets/images/Pandaprintmagnet.png" alt="Panda Print Magnets">
      </div>
      <h3 class="footer-brand-name">Panda Print Magnets</h3>
      <p class="footer-tagline">Premium custom photo magnets handcrafted for families, events, and businesses. Turn your favorite memories into something you can hold.</p>
      <div class="footer-socials">
        <a href="#" class="social-btn" aria-label="Instagram">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>
        </a>
        <a href="#" class="social-btn" aria-label="Facebook">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
        </a>
        <a href="#" class="social-btn" aria-label="TikTok">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z"/></svg>
        </a>
      </div>
    </div>

    <div class="footer-links-grid">
      <div class="footer-col">
        <h4>Shop</h4>
        <a href="magnets.html">Photo Magnets</a>
        <a href="bulk-orders.html">Bulk Orders</a>
        <a href="events.html">Event Magnets</a>
        <a href="checkout.html">Custom Order</a>
      </div>

      <div class="footer-col">
        <h4>Company</h4>
        <a href="our-story.html">Our Story</a>
        <a href="give-back.html">Give Back</a>
        <a href="#">Contact Us</a>
        <a href="#">Blog</a>
      </div>

      <div class="footer-col">
        <h4>Support</h4>
        <a href="#">Shipping Info</a>
        <a href="#">FAQs</a>
        <a href="#">Returns</a>
        <a href="#">Track Order</a>
      </div>
    </div>
  </div>

  <div class="footer-newsletter">
    <div class="newsletter-text">
      <span class="newsletter-icon">✉️</span>
      <div>
        <strong>Get exclusive deals & new product updates</strong>
        <span>Join our email list — no spam, ever.</span>
      </div>
    </div>
    <form class="newsletter-form-footer" onsubmit="return false;">
      <input type="email" placeholder="Your email address" />
      <button type="button">Subscribe</button>
    </form>
  </div>

  <div class="footer-bottom">
    <span>© 2026 Panda Print Magnets. All rights reserved.</span>
    <div class="footer-bottom-links">
      <a href="#">Privacy Policy</a>
      <a href="#">Terms of Service</a>
      <a href="#">Cookie Policy</a>
    </div>
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
  const allNavLinks = document.querySelectorAll(".main-nav a, .mobile-nav a");

  allNavLinks.forEach(link => {
    const linkPage = link.getAttribute("href");
    if (linkPage === currentPage || (currentPage === "" && linkPage === "index.html")) {
      link.classList.add("active");
    }
  });

  // Hamburger menu
  const hamburgerBtn = document.querySelector("#hamburger-btn");
  const mobileNav = document.querySelector("#mobile-nav");

  if (!hamburgerBtn || !mobileNav) return;

  function openMenu() {
    hamburgerBtn.classList.add("open");
    mobileNav.classList.add("open");
    hamburgerBtn.setAttribute("aria-expanded", "true");
    mobileNav.setAttribute("aria-hidden", "false");
    document.body.classList.add("nav-open");
  }

  function closeMenu() {
    hamburgerBtn.classList.remove("open");
    mobileNav.classList.remove("open");
    hamburgerBtn.setAttribute("aria-expanded", "false");
    mobileNav.setAttribute("aria-hidden", "true");
    document.body.classList.remove("nav-open");
  }

  hamburgerBtn.addEventListener("click", () => {
    hamburgerBtn.classList.contains("open") ? closeMenu() : openMenu();
  });

  mobileNav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });
});
