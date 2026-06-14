/**
 * LIGHTWEIGHT TOGGLE ENGINE
 */
document.addEventListener("DOMContentLoaded", () => {
  const powerOverlay = document.getElementById("power-curtain");
  const activatorCheckbox = document.getElementById("grid-activator-checkbox");
  const coreSiteLayout = document.getElementById("core-site-layout");
  const switchLabel = document.querySelector(".switch-btn");

  if (!powerOverlay || !activatorCheckbox || !coreSiteLayout || !switchLabel) return;

  activatorCheckbox.addEventListener("change", () => {
    if (activatorCheckbox.checked) {
      switchLabel.style.pointerEvents = "none";
      activatorCheckbox.disabled = true;
      powerOverlay.classList.add("power-ignited");

      setTimeout(() => {
        coreSiteLayout.classList.remove("site-hidden");
        coreSiteLayout.classList.add("system-live");
        powerOverlay.classList.add("power-purged");
      }, 400);

      setTimeout(() => {
        powerOverlay.remove();
      }, 1400);
    }
  });
});