$(function () {
  // Current year in footer.
  $("#year").text(new Date().getFullYear());

  // Reveal elements as they enter the viewport.
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -35px 0px" });

  document.querySelectorAll(".reveal").forEach((element, index) => {
    element.style.transitionDelay = `${Math.min(index % 4, 3) * 75}ms`;
    revealObserver.observe(element);
  });

  // Navbar, active section link, and back-to-top button.
  const $nav = $(".site-nav");
  const $topButton = $("#backToTop");
  const sections = $("main section[id]");
  const navLinks = $(".navbar-nav .nav-link");

  function updateScrollUI() {
    const scrollPosition = window.scrollY + 130;
    $nav.toggleClass("scrolled", window.scrollY > 25);
    $topButton.toggleClass("show", window.scrollY > 500);

    let currentId = "";
    sections.each(function () {
      if (scrollPosition >= $(this).offset().top) currentId = this.id;
    });
    navLinks.removeClass("active");
    navLinks.filter(`[href="#${currentId}"]`).addClass("active");
  }

  $(window).on("scroll", updateScrollUI);
  updateScrollUI();

  $topButton.on("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // Close the mobile navigation after choosing a section.
  $(".navbar-nav .nav-link, .navbar-nav .nav-cta").on("click", function () {
    const navElement = document.getElementById("mainNav");
    if (navElement.classList.contains("show")) {
      bootstrap.Collapse.getOrCreateInstance(navElement).hide();
    }
  });
});
