document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.querySelectorAll(".doc-nav a");
  const menuToggle = document.querySelector(".menu-toggle");
  const sidebar = document.querySelector(".doc-sidebar");

  // Apply initial theme
  const savedTheme = localStorage.getItem("theme") || "light";
  document.documentElement.setAttribute("data-theme", savedTheme);

  // Navigation
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href").substring(1);

      // Update active states
      document.querySelectorAll(".doc-section").forEach((section) => {
        section.classList.remove("active");
      });
      
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        targetSection.classList.add("active");
        
        navLinks.forEach((l) => l.classList.remove("active"));
        link.classList.add("active");
        
        // Scroll to the section
        const headerHeight = 20; // Adjust based on your header height
        const targetPosition = targetSection.getBoundingClientRect().top + window.scrollY - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: "smooth"
        });
      }

      // Close mobile menu
      if (window.innerWidth <= 768) {
        sidebar.classList.remove("active");
      }
    });
  });

  // Mobile menu toggle
  menuToggle.addEventListener("click", () => {
    sidebar.classList.toggle("active");
  });

  // Close mobile menu on window resize
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      sidebar.classList.remove("active");
    }
  });

  // Show/hide menu toggle based on screen size
  function updateMenuToggleVisibility() {
    menuToggle.style.display = window.innerWidth <= 768 ? "block" : "none";
  }

  window.addEventListener("resize", updateMenuToggleVisibility);
  updateMenuToggleVisibility();

  // Listen for theme changes
  window.addEventListener("storage", function (e) {
    if (e.key === "theme") {
      applyTheme(e.newValue);
    }
  });
});