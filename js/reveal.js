document.addEventListener("DOMContentLoaded", () => {
  const textContainer = document.querySelector(".system-reveal-text");

  if (!textContainer) return;

  const trackSpotlightVector = (event) => {
    const elementBounds = textContainer.getBoundingClientRect();

    const relativeX = event.clientX - elementBounds.left;
    const relativeY = event.clientY - elementBounds.top;

    textContainer.style.setProperty("--mouse-x", `${relativeX}px`);
    textContainer.style.setProperty("--mouse-y", `${relativeY}px`);
  };

  window.addEventListener("mousemove", trackSpotlightVector);
});