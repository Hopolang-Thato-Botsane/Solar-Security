const CONFIG = {
  projectId: 'zmqqi4n3',
  dataset: 'production',
  apiVersion: 'v2026-06-14'
};

const HERO_QUERY = `*[_type == "hero"][0] {
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
}`;

const SANITY_ENDPOINT = `https://${CONFIG.projectId}.api.sanity.io/${CONFIG.apiVersion}/data/query/${CONFIG.dataset}?query=${encodeURIComponent(HERO_QUERY)}`;

document.addEventListener('DOMContentLoaded', () => {
  executeNativeFetchPipeline();
});

function executeNativeFetchPipeline() {
  console.log('[CMS NATIVE]: Dispatching HTTP GET request to Sanity Endpoint...');

  fetch(SANITY_ENDPOINT)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP network anomaly detected. Status: ${response.status}`);
      }
      return response.json();
    })
    .then(payload => {
      const heroData = payload.result;

      if (!heroData) {
        console.warn('[CMS NATIVE]: Handshake successful, but data result array is completely empty.');
        return;
      }

      console.log('[CMS NATIVE]: JSON Payload safely parsed. Injecting data to DOM targets...');
      
      paintBrandingAndNav(heroData.branding, heroData.navigationLinks);
      paintHeroText(heroData.mainHeading, heroData.subHeading);
      paintButtons(heroData.primaryCTA, heroData.secondaryCTA);
      paintCanvasBackground(heroData.bgImageUrl);
    })
    .catch(error => {
      console.error('[CMS NATIVE]: Critical pipeline breakdown during fetch routine:', error);
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

function paintHeroText(mainTitle, subTitle) {
  const mainHeadingTarget = document.querySelector('.hero-main-title');
  const subHeadingTarget = document.querySelector('.hero-sub-title');

  if (mainHeadingTarget && mainTitle) mainHeadingTarget.textContent = mainTitle;
  if (subHeadingTarget && subTitle) subHeadingTarget.textContent = subTitle;
}

function paintButtons(primaryLabel, secondaryLabel) {
  const primaryBtn = document.querySelector('.cta-primary-target');
  const secondaryBtn = document.querySelector('.cta-secondary-target');

  if (primaryBtn && primaryLabel) primaryBtn.textContent = primaryLabel;
  if (secondaryBtn && secondaryLabel) secondaryBtn.textContent = secondaryLabel;
}

function paintCanvasBackground(url) {
  const frame = document.querySelector('.hero-canvas-frame');
  if (frame && url) {
    frame.style.backgroundImage = `url('${url}')`;
  }
}