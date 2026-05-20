function initHeroEngine() {
  const heroViewport = document.getElementById('heroViewport');
  const heroTextBlock = document.getElementById('heroTextBlock');
  const heroHeadline = document.getElementById('heroHeadline');
  const heroNav = document.getElementById('heroNav');
  const switchContainer = document.getElementById('switchContainer');
  const switchTrigger = document.getElementById('lightSwitchTrigger');
  const switchAudio = document.getElementById('switchAudio');

  let isIlluminated = false;

  if (heroHeadline && heroViewport) {
    const wordsText = heroHeadline.innerText.split(' ');
    heroHeadline.innerHTML = '';
    
    wordsText.forEach(word => {
      const span = document.createElement('span');
      span.className = 'word-token';
      span.innerText = word;
      heroHeadline.appendChild(span);
    });

    const wordTokens = heroHeadline.querySelectorAll('.word-token');

    heroViewport.addEventListener('mousemove', (e) => {
      if (isIlluminated) return;

      const rect = heroHeadline.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const boxWidth = rect.width;

      let progress = mouseX / (boxWidth * 0.85);
      
      if (progress < 0) progress = 0;
      if (progress > 1) progress = 1;
      
      const totalWordsToReveal = Math.floor(progress * wordTokens.length);

      wordTokens.forEach((token, index) => {
        if (index <= totalWordsToReveal) {
          token.classList.add('revealed');
        } else {
          token.classList.remove('revealed');
        }
      });
    });
  }

  if (switchTrigger) {
    switchTrigger.addEventListener('click', () => {
      isIlluminated = true;
      
      if (switchAudio) {
        switchAudio.currentTime = 0;
        switchAudio.play().catch(err => console.log("Audio play deferred:", err));
      }

      heroViewport.style.backgroundColor = '#ffffff';
      
      setTimeout(() => {
        heroViewport.classList.add('illuminated');
        if (heroTextBlock) {
          heroTextBlock.classList.remove('initial-center');
          heroTextBlock.classList.add('shifted-left');
        }
        if (heroNav) heroNav.classList.add('reveal');
        if (switchContainer) switchContainer.classList.add('hidden-switch');
        document.body.classList.remove('no-scroll');
      }, 80);
    });
  }
}

function initProjectsEngine() {
  const projectCards = document.querySelectorAll('.projects-grid .project-card');
  if (projectCards.length === 0) return;
}

// 3. CUSTOMER REVIEW SLIDER/CAROUSEL ENGINE (REPAIRED)
function initReviewsEngine() {
  const indicators = document.querySelectorAll('.reviews-section .indicator-bar'); 
  const track = document.getElementById('reviewsTrack');
  const reviewGroups = document.querySelectorAll('.reviews-section .reviews-group');
  
  if (indicators.length === 0 || !track || reviewGroups.length === 0) return;

  indicators.forEach((bar) => {
    bar.addEventListener('click', () => {
      const slideIndex = parseInt(bar.getAttribute('data-slide'), 10);
      
      indicators.forEach(b => b.classList.remove('active'));
      bar.classList.add('active');
      
      const translationStep = 100 / reviewGroups.length;
      const finalOffset = slideIndex * translationStep;
      
      track.style.transform = `translateX(-${finalOffset}%)`;
    });
  });
}

function initScrollEngine() {
  const revealElements = document.querySelectorAll('.scroll-reveal, .segment-item, .project-card');
  if (revealElements.length === 0) return;

  const observerOptions = {
    root: null,
    threshold: 0.05,
    rootMargin: "0px 0px 100px 0px"
  };

  const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  };

  const observer = new IntersectionObserver(revealCallback, observerOptions);

  revealElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.8s cubic-bezier(0.25, 1, 0.5, 1), transform 0.8s cubic-bezier(0.25, 1, 0.5, 1)';
    
    observer.observe(element);
  });

  setTimeout(() => {
    revealElements.forEach(el => {
      if (window.getComputedStyle(el).opacity === "0") {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }
    });
  }, 1500);
}

function initServicesEngine() {
  const serviceCards = document.querySelectorAll('.services-section .service-card');
  if (serviceCards.length === 0) return;

  serviceCards.forEach(card => {
    card.style.transition = 'transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)';
    
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-4px)';
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0)';
    });
  });
}

// 6. FAQ TAB ACCORDION PANEL ENGINE (REPAIRED FOR ORIGINAL HTML)
function initTabsEngine() {
  const tabButtons = document.querySelectorAll('.faq-tab-btn');
  const contentPanels = document.querySelectorAll('.faq-content-panel');

  if (!tabButtons.length || !contentPanels.length) return;

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      // 1. Extract using your exact original data attribute
      const targetTab = button.getAttribute('data-faq-tab');

      // 2. Clear out active states across all buttons and layout panels
      tabButtons.forEach(btn => btn.classList.remove('active'));
      contentPanels.forEach(panel => panel.classList.remove('active'));

      // 3. Arm active state onto the clicked button
      button.classList.add('active');
      
      // 4. Reveal the target panel using your original id structure ("faq-")
      const targetPanel = document.getElementById(`faq-${targetTab}`);
      if (targetPanel) {
        targetPanel.classList.add('active');
      }
    });
  });
}

// 7. FOOTER EVALUATION FORM DYNAMIC INPUT ENGINE
function initFooterFormEngine() {
  const tabButtons = document.querySelectorAll('.site-footer .tab-btn');
  const dynamicInput = document.getElementById('dynamicInput');

  if (!tabButtons.length || !dynamicInput) return;

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const targetMode = button.getAttribute('data-tab');

      tabButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      if (targetMode === 'email') {
        dynamicInput.type = 'email';
        dynamicInput.placeholder = 'Email Address';
      } else if (targetMode === 'whatsapp') {
        dynamicInput.type = 'tel';
        dynamicInput.placeholder = 'WhatsApp Number';
      } else {
        dynamicInput.type = 'tel';
        dynamicInput.placeholder = 'Mobile Number';
      }

      dynamicInput.value = '';
      dynamicInput.focus();
    });
  });
}

if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

document.addEventListener('DOMContentLoaded', () => {

  window.scrollTo(0, 0);
    if (window.location.hash) {
      history.replaceState(null, null, window.location.pathname);
  }

  initHeroEngine();
  initProjectsEngine();
  initReviewsEngine();
  initScrollEngine();
  initServicesEngine();
  initTabsEngine();
  initFooterFormEngine();
});