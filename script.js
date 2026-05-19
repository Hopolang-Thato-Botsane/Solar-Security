document.addEventListener('DOMContentLoaded', () => {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const dynamicInput = document.getElementById('dynamicInput');
  const modeToggle = document.getElementById('modeToggle');
  const toggleLabel = document.querySelector('.toggle-label');
  const evaluationForm = document.getElementById('evaluationForm');
  const faqTabs = document.querySelectorAll('.faq-tab-btn');
  const faqPanels = document.querySelectorAll('.faq-content-panel');

/* FAQ */

faqTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    faqTabs.forEach(btn => btn.classList.remove('active'));
    tab.classList.add('active');
    faqPanels.forEach(panel => panel.classList.remove('active'));
    const targetPanelId = `faq-${tab.getAttribute('data-faq-tab')}`;
    const targetPanel = document.getElementById(targetPanelId);
    if (targetPanel) {
      targetPanel.classList.add('active');
    }
  });
});

/* Footer */

tabButtons.forEach(button => {
  button.addEventListener('click', () => {
    tabButtons.forEach(btn => btn.classList.remove('active'));  
    button.classList.add('active');
      
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

if (modeToggle) {
  modeToggle.addEventListener('change', () => {
    if (modeToggle.checked) {
      toggleLabel.textContent = 'Solar';
    } else {
      toggleLabel.textContent = 'Security';
    }
  });
}

if (evaluationForm) {
  evaluationForm.addEventListener('submit', (e) => {
    e.preventDefault();
      
    alert("Request Logged Successfully. We will contact you once a technician has assessed your requirements.");
    evaluationForm.reset();
  });
  }
});