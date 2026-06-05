/**
 * LIGHTWEIGHT TOGGLE ENGINE
 */
document.addEventListener("DOMContentLoaded", () => {
  const powerOverlay = document.getElementById("power-curtain");
  const activatorCheckbox = document.getElementById("grid-activator-checkbox");
  const coreSiteLayout = document.getElementById("core-site-layout");
  const switchLabel = document.querySelector(".switch-btn");

  // Protection Guard
  if (!powerOverlay || !activatorCheckbox || !coreSiteLayout || !switchLabel) return;

  // Let the browser handle the click relationship natively via the checkbox change event
  activatorCheckbox.addEventListener("change", () => {
    if (activatorCheckbox.checked) {
      
      // 1. Lock interaction controls immediately to prevent multi-firing
      switchLabel.style.pointerEvents = "none";
      activatorCheckbox.disabled = true;

      // 2. Flip the switch graphics to amber gold instantly
      powerOverlay.classList.add("power-ignited");

      // 3. Drop the black screen curtain and kick off main portfolio layout
      setTimeout(() => {
        coreSiteLayout.classList.remove("site-hidden");
        coreSiteLayout.classList.add("system-live");
        powerOverlay.classList.add("power-purged");
      }, 400);

      // 4. Dom Tree Garbage Collection: Unmount the overlay completely from memory
      setTimeout(() => {
        powerOverlay.remove();
      }, 1400);
    }
  });
});