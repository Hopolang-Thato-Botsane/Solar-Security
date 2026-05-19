document.addEventListener('DOMContentLoaded', () => {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const dynamicInput = document.getElementById('dynamicInput');
  const modeToggle = document.getElementById('modeToggle');
  const toggleLabel = document.querySelector('.toggle-label');
  const evaluationForm = document.getElementById('evaluationForm');

  // 1. Communication Tabs Engine
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Deactivate all matching buttons
      tabButtons.forEach(btn => btn.classList.remove('active'));
      
      // Light up the selected option
      button.classList.add('active');
      
      // Update types and placeholders based on what they choose
      const selectedTab = button.getAttribute('data-tab');
      if (selectedTab === 'email') {
        dynamicInput.type = 'email';
        dynamicInput.placeholder = 'Email Address';
      } else if (selectedTab === 'whatsapp') {
        dynamicInput.type = 'tel';
        dynamicInput.placeholder = 'WhatsApp Number';
      } else {
        dynamicInput.type = 'tel';
        dynamicInput.placeholder = 'Mobile Number';
      }
    });
  });

  // 2. Toggle Mode Label Switcher (Solar vs Security form tracking)
  if (modeToggle) {
    modeToggle.addEventListener('change', () => {
      if (modeToggle.checked) {
        toggleLabel.textContent = 'Solar';
      } else {
        toggleLabel.textContent = 'Security';
      }
    });
  }

  // 3. Form Submission Capture
  if (evaluationForm) {
    evaluationForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Create a clean overlay response instead of breaking layouts
      alert("Request Logged Successfully. We will contact you once a technician has assessed your requirements.");
      evaluationForm.reset();
    });
  }
});