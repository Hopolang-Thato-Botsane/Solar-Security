document.addEventListener("DOMContentLoaded", () => {
  initFaqAccordion();
  initFaqScrollReveal();
});

function initFaqAccordion() {
  const accordionWrapper = document.querySelector(".faq-accordion-wrapper");
  if (!accordionWrapper) return;

  accordionWrapper.addEventListener("click", (event) => {
    const trigger = event.target.closest(".faq-trigger");
    if (!trigger) return;

    const currentItem = trigger.closest(".faq-accordion-item");
    if (!currentItem) return;

    const isActive = currentItem.classList.contains("active");

    const allItems = accordionWrapper.querySelectorAll(".faq-accordion-item");
    allItems.forEach((item) => {
      if (item !== currentItem) {
        item.classList.remove("active");
        const panelBtn = item.querySelector(".faq-trigger");
        if (panelBtn) panelBtn.setAttribute("aria-expanded", "false");
      }
    });

    if (isActive) {
      currentItem.classList.remove("active");
      trigger.setAttribute("aria-expanded", "false");
    } else {
      currentItem.classList.add("active");
      trigger.setAttribute("aria-expanded", "true");
    }
  });
}

function initFaqScrollReveal() {
  const revealTarget = document.querySelector(".reveal-on-scroll");
  if (!revealTarget) return;

  const configOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.15
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, configOptions);

  revealObserver.observe(revealTarget);
}