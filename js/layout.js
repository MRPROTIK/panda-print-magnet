const headerHTML = `
<header class="site-header">
  <div class="header-inner">
    <a class="brand" href="index.html">
      <img src="assets/images/Pandaprintmagnet.png" alt="Panda Print logo">
      <span>Panda Print</span>
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
  <a href="index.html">Home</a>
  <a href="magnets.html">Magnets</a>
  <a href="bulk-orders.html">Bulk Orders</a>
  <a href="events.html">Events</a>
  <a href="give-back.html">Give Back</a>
  <a href="our-story.html">Our Story</a>
  <a href="cart.html" class="mobile-cart">🛒 Cart</a>
</nav>
`;

const footerHTML = `
<footer class="site-footer">
  <div class="footer-grid container">

    <div class="footer-brand">
      <img src="assets/images/Pandaprintmagnet.png" alt="Panda Print logo">
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
  // Mount header and footer
  const headerMount = document.querySelector("#site-header");
  const footerMount = document.querySelector("#site-footer");

  if (headerMount) headerMount.innerHTML = headerHTML;
  if (footerMount) footerMount.innerHTML = footerHTML;

  // Set active nav link based on current page
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  const allNavLinks = document.querySelectorAll(".main-nav a, .mobile-nav a");

  allNavLinks.forEach(link => {
    const linkPage = link.getAttribute("href");
    if (linkPage === currentPage || (currentPage === "" && linkPage === "index.html")) {
      link.classList.add("active");
    }
  });

  // Hamburger menu toggle
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
    const isOpen = hamburgerBtn.classList.contains("open");
    isOpen ? closeMenu() : openMenu();
  });

  // Close menu when a nav link is clicked
  mobileNav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", closeMenu);
  });

  // Close menu on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });

  // Close menu when clicking outside (on overlay area)
  mobileNav.addEventListener("click", (e) => {
    if (e.target === mobileNav) closeMenu();
  });
});
