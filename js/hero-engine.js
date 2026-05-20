export function initHeroEngine() {
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