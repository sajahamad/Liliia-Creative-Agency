document.addEventListener("DOMContentLoaded", () => {
  const loader = document.getElementById("loader");
  const content = document.getElementById("main-content");
  const steps = document.querySelectorAll(".step");
  const serviceCards = document.querySelectorAll(".service-card");
  const statsSection = document.querySelector(".stats-section");
  const filterButtons = document.querySelectorAll(".filter-btn");
  const portfolioItems = document.querySelectorAll(".portfolio-item");
  const teamMembers = document.querySelectorAll(".team-member.animate-in");
  const teamSection = document.querySelector(".team-section");
  const pricingCards = document.querySelectorAll(".pricing-section .card");
  const pricingSection = document.querySelector(".pricing-section");
  const navLinks = document.querySelectorAll(".nav-links a");
  const sections = document.querySelectorAll("section");

  setTimeout(() => {
    if (loader) loader.style.display = "none";
    if (content) {
      content.style.visibility = "visible";
      content.style.opacity = "1";
    }
  }, 1000);
  function activateService(index) {
    steps.forEach((s) => s.classList.remove("active"));
    serviceCards.forEach((card) => {
      card.classList.remove("active");
      card.style.display = "none";
    });

    const targetStep =
      document.querySelector(`.step[data-index="${index}"]`) || steps[index];
    const targetCard =
      document.querySelector(`.service-card[data-index="${index}"]`) ||
      serviceCards[index];

    if (targetStep) targetStep.classList.add("active");
    if (targetCard) {
      targetCard.style.display = "block";

      setTimeout(() => {
        targetCard.classList.add("active");
      }, 50);
    }
  }

  steps.forEach((step, idx) => {
    const index = step.getAttribute("data-index") || idx;
    step.addEventListener("click", () => activateService(index));
    step.addEventListener("mouseenter", () => activateService(index));
  });

  serviceCards.forEach((card, idx) => {
    const index = card.getAttribute("data-index") || idx;
    card.addEventListener("mouseenter", () => {
      steps.forEach((s) => s.classList.remove("active"));
      const targetStep =
        document.querySelector(`.step[data-index="${index}"]`) || steps[index];
      if (targetStep) targetStep.classList.add("active");
    });
  });

  if (serviceCards.length > 0) activateService(0);

  if (statsSection) {
    const startCounters = () => {
      const counters = document.querySelectorAll(".counter");
      counters.forEach((counter) => {
        const target = +counter.getAttribute("data-target");
        let count = 0;
        const duration = 2000;
        const increment = target / (duration / 16);

        const update = () => {
          if (count < target) {
            count += increment;
            counter.innerText = Math.ceil(count);
            requestAnimationFrame(update);
          } else {
            counter.innerText = target;
          }
        };
        update();
      });
    };

    const statsObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          startCounters();
          statsObserver.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    statsObserver.observe(statsSection);
  }

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterButtons.forEach((button) => button.classList.remove("active"));
      btn.classList.add("active");
      const filterValue = btn.getAttribute("data-filter");

      portfolioItems.forEach((item) => {
        const itemCategory = item.getAttribute("data-category");
        if (filterValue === "all" || filterValue === itemCategory) {
          item.style.display = "block";
          setTimeout(() => item.classList.add("show"), 10);
        } else {
          item.classList.remove("show");
          setTimeout(() => (item.style.display = "none"), 300);
        }
      });
    });
  });

  const revealOnScroll = (section, elements, thresholdValue) => {
    if (section) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            elements.forEach((el) => el.classList.add("reveal"));
            observer.unobserve(section);
          }
        },
        { threshold: thresholdValue },
      );
      observer.observe(section);
    }
  };

  revealOnScroll(teamSection, teamMembers, 0.2);
  revealOnScroll(pricingSection, pricingCards, 0.15);

  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.pageYOffset >= sectionTop - 200) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (current && link.getAttribute("href").includes(current)) {
        link.classList.add("active");
      }
    });
  });
});
