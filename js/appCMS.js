const CMS_CONFIG = {
  projectId: 'zmqqi4n3',
  dataset: 'production',
  apiVersion: 'v2026-06-14'
};

const GLOBAL_CMS_QUERY = `{
  "hero": *[_type == "hero"][0] {
    branding,
    navigationLinks[] {
      label,
      urlTarget
    },
    mainHeading,
    subHeading,
    primaryCTA,
    secondaryCTA,
    "bgImageUrl": backgroundImage.asset->url
  },
  "process": *[_type == "process"][0] {
    sectionMiniHeading,
    sectionHeading,
    sectionDescription,
    processCards[] {
      cardNumber,
      cardHeading,
      cardDescription
    }
  }
}`;

const SANITY_API_URL = `https://${CMS_CONFIG.projectId}.api.sanity.io/${CMS_CONFIG.apiVersion}/data/query/${CMS_CONFIG.dataset}?query=${encodeURIComponent(GLOBAL_CMS_QUERY)}`;

document.addEventListener('DOMContentLoaded', () => {
  executeContentPipeline();
});

function executeContentPipeline() {
  console.log('[CMS ENGINE]: Dispatching data synchronization packet to Sanity CDN...');

  fetch(SANITY_API_URL)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Sanity network handshake rejected. HTTP Status: ${response.status}`);
      }
      return response.json();
    })
    .then(payload => {
      const data = payload.result;

      if (!data) {
        console.warn('[CMS ENGINE]: Network pipeline successful, but cloud returned an empty data result schema.');
        return;
      }

      console.log('[CMS ENGINE]: Data payload safely extracted. Starting UI paint sequences...');

      // PIER 1: FLUSH HERO CORE CANVAS LAYER
      if (data.hero) {
        paintBrandingAndNav(data.hero.branding, data.hero.navigationLinks);
        paintHeroTypography(data.hero.mainHeading, data.hero.subHeading);
        
        // LOCK AND KEY ALIGNED: This call now matches the terminal function perfectly
        paintActionTriggers(data.hero.primaryCTA, data.hero.secondaryCTA);
        
        paintVisualSurfaces(data.hero.bgImageUrl);
      } else {
        console.warn('[CMS ENGINE]: Hero configuration payload missing from data envelope.');
      }

      // PIER 2: FLUSH PROCESS STEP GRID LAYER
      if (data.process) {
        paintProcessMatrix(data.process);
      } else {
        console.warn('[CMS ENGINE]: Process configuration payload missing from data envelope.');
      }

      console.log('[CMS ENGINE]: All visual assets and structural typography synced completely.');
    })
    .catch(error => {
      console.error('[CMS ENGINE]: Critical structural crash during pipeline fetch execution:', error);
    });
}

function paintBrandingAndNav(brandTitle, linksArray) {
  const brandingTarget = document.querySelector('.brand-title-target');
  if (brandingTarget && brandTitle) {
    brandingTarget.textContent = brandTitle;
  }

  const navTarget = document.querySelector('.nav-links-target');
  if (navTarget && linksArray && linksArray.length > 0) {
    navTarget.innerHTML = '';
    
    linksArray.forEach((link, index) => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      
      a.href = link.urlTarget;
      a.className = `nav-link ${index === 0 ? 'active' : ''}`;
      a.textContent = link.label;
      
      li.appendChild(a);
      navTarget.appendChild(li);
    });
  }
}

function paintHeroTypography(mainTitle, subTitle) {
  const mainHeadingTarget = document.querySelector('.hero-main-title');
  const subHeadingTarget = document.querySelector('.hero-sub-title');

  if (mainHeadingTarget && mainTitle) mainHeadingTarget.textContent = mainTitle;
  if (subHeadingTarget && subTitle) subHeadingTarget.textContent = subTitle;
}

function paintActionTriggers(primaryLabel, secondaryLabel) {
  const primaryBtn = document.querySelector('.cta-primary-target');
  const secondaryBtn = document.querySelector('.cta-secondary-target');

  if (primaryBtn && primaryLabel) primaryBtn.textContent = primaryLabel;
  if (secondaryBtn && secondaryLabel) secondaryBtn.textContent = secondaryLabel;
}

function paintVisualSurfaces(imageUrl) {
  const backgroundFrame = document.querySelector('.hero-canvas-frame');
  if (backgroundFrame && imageUrl) {
    backgroundFrame.style.backgroundImage = `url('${imageUrl}')`;
  }
}

function paintProcessMatrix(processData) {
  const miniTarget = document.querySelector('.process-mini-target');
  const titleTarget = document.querySelector('.process-title-target');
  const leadTarget = document.querySelector('.process-lead-target');

  if (miniTarget && processData.sectionMiniHeading) miniTarget.textContent = processData.sectionMiniHeading;
  if (titleTarget && processData.sectionHeading) titleTarget.textContent = processData.sectionHeading;
  if (leadTarget && processData.sectionDescription) leadTarget.textContent = processData.sectionDescription;

  const gridTarget = document.querySelector('.process-grid-target');
  if (gridTarget && processData.processCards && processData.processCards.length > 0) {
    gridTarget.innerHTML = '';

    processData.processCards.forEach(card => {
      const li = document.createElement('li');
      li.className = 'step-card';

      const badge = document.createElement('div');
      badge.className = 'step-number-badge';
      badge.textContent = card.cardNumber || '';

      const h3 = document.createElement('h3');
      h3.className = 'step-title';
      h3.textContent = card.cardHeading || '';

      const p = document.createElement('p');
      p.className = 'step-description';
      p.textContent = card.cardDescription || '';

      li.appendChild(badge);
      li.appendChild(h3);
      li.appendChild(p);

      gridTarget.appendChild(li);
    });
  }
}