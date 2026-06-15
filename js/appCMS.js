const CMS_CONFIG = {
  projectId: 'zmqqi4n3',
  dataset: 'production',
  apiVersion: 'v2026-06-14'
};

const GLOBAL_CMS_QUERY = `{
  "hero": *[_type == "hero"][0] {
    branding,
    navigationLinks[] { label, urlTarget },
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
    processCards[] { cardNumber, cardHeading, cardDescription }
  },
  "services": *[_type == "servicesSection"][0] {
    sectionMiniHeading,
    sectionHeading,
    sectionDescription,
    servicesList[] {
      serviceName,
      serviceDescription,
      "iconUrl": serviceIcon.asset->url,
      "imageUrl": cardImage.asset->url
    }
  },
  "projects": *[_type == "projectsSection"][0] {
    sectionMiniHeading,
    sectionHeading,
    sectionDescription,
    projectsList[] {
      projectTitle,
      projectLocation,
      projectSpecs,
      "imageUrl": projectImage.asset->url
    }
  },
  "faq": *[_type == "faqSection"][0] {
    sectionMiniHeading,
    sectionHeading,
    sectionDescription,
    ctaLabel,
    faqList[] { question, answer }
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
      if (!response.ok) throw new Error(`Sanity status rejection: ${response.status}`);
      return response.json();
    })
    .then(payload => {
      const data = payload.result;
      if (!data) return;

      // Component execution chain
      if (data.hero) {
        paintBrandingAndNav(data.hero.branding, data.hero.navigationLinks);
        paintHeroTypography(data.hero.mainHeading, data.hero.subHeading);
        paintActionTriggers(data.hero.primaryCTA, data.hero.secondaryCTA);
        paintVisualSurfaces(data.hero.bgImageUrl);
      }
      if (data.process) paintProcessMatrix(data.process);
      if (data.services) paintServicesMatrix(data.services);
      if (data.projects) paintProjectsMatrix(data.projects);
      if (data.faq) paintFAQMatrix(data.faq);

      console.log('[CMS ENGINE]: Structural initialization execution complete.');
    })
    .catch(error => {
      console.error('[CMS ENGINE]: Operational failure on component assembly execution:', error);
    });
}

function paintBrandingAndNav(brandTitle, linksArray) {
  const brandingTarget = document.querySelector('.brand-title-target');
  if (brandingTarget && brandTitle) brandingTarget.textContent = brandTitle;

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
  if (backgroundFrame && imageUrl) backgroundFrame.style.backgroundImage = `url('${imageUrl}')`;
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

function paintServicesMatrix(servicesData) {
  const miniTarget = document.querySelector('.services-mini-target');
  const titleTarget = document.querySelector('.services-title-target');
  const leadTarget = document.querySelector('.services-lead-target');

  if (miniTarget && servicesData.sectionMiniHeading) miniTarget.textContent = servicesData.sectionMiniHeading;
  if (titleTarget && servicesData.sectionHeading) titleTarget.textContent = servicesData.sectionHeading;
  if (leadTarget && servicesData.sectionDescription) leadTarget.textContent = servicesData.sectionDescription;

  const gridTarget = document.querySelector('.services-grid-target');
  if (gridTarget && servicesData.servicesList && servicesData.servicesList.length > 0) {
    gridTarget.innerHTML = '';
    servicesData.servicesList.forEach(service => {
      const card = document.createElement('div');
      card.className = 'service-reveal-card';
      const bgMask = document.createElement('div');
      bgMask.className = 'card-bg-mask';
      if (service.imageUrl) bgMask.style.backgroundImage = `url('${service.imageUrl}')`;
      card.appendChild(bgMask);

      const shield = document.createElement('div');
      shield.className = 'card-content-shield';

      if (service.iconUrl) {
        const iconRow = document.createElement('div');
        iconRow.className = 'card-icon-row';
        const imgIcon = document.createElement('img');
        imgIcon.className = 'service-icon';
        imgIcon.src = service.iconUrl;
        imgIcon.alt = `${service.serviceName || 'Service'} Icon`;
        iconRow.appendChild(imgIcon);
        shield.appendChild(iconRow);
      }

      const h3 = document.createElement('h3');
      h3.className = 'service-card-title';
      h3.textContent = service.serviceName || '';
      const p = document.createElement('p');
      p.className = 'service-card-description';
      p.textContent = service.serviceDescription || '';

      shield.appendChild(h3);
      shield.appendChild(p);
      card.appendChild(shield);
      gridTarget.appendChild(card);
    });
  }
}

function paintProjectsMatrix(projectsData) {
  const miniTarget = document.querySelector('.projects-mini-target');
  const titleTarget = document.querySelector('.projects-title-target');
  const leadTarget = document.querySelector('.projects-lead-target');

  if (miniTarget && projectsData.sectionMiniHeading) miniTarget.textContent = projectsData.sectionMiniHeading;
  if (titleTarget && projectsData.sectionHeading) titleTarget.textContent = projectsData.sectionHeading;
  if (leadTarget && projectsData.sectionDescription) leadTarget.textContent = projectsData.sectionDescription;

  const gridTarget = document.querySelector('.projects-grid-target');
  if (gridTarget && projectsData.projectsList && projectsData.projectsList.length > 0) {
    gridTarget.innerHTML = '';
    projectsData.projectsList.forEach(project => {
      const article = document.createElement('article');
      article.className = 'project-card';

      const imgWrapper = document.createElement('div');
      imgWrapper.className = 'card-image-wrapper';
      const img = document.createElement('img');
      img.src = project.imageUrl || '';
      img.alt = project.projectTitle || '';
      img.loading = 'lazy';
      imgWrapper.appendChild(img);

      const meta = document.createElement('div');
      meta.className = 'card-meta';

      const h3 = document.createElement('h3');
      h3.className = 'card-title';
      h3.textContent = project.projectTitle || '';

      const pLoc = document.createElement('p');
      pLoc.className = 'card-location';
      pLoc.textContent = project.projectLocation || '';

      const specsList = document.createElement('ul');
      specsList.className = 'card-specs-list';

      if (project.projectSpecs && project.projectSpecs.length > 0) {
        project.projectSpecs.forEach(specText => {
          const liSpec = document.createElement('li');
          liSpec.className = 'spec-list-item';
          liSpec.innerHTML = `
            <svg class="spec-tick-icon" viewBox="0 0 24 24" style="width:16px; height:16px; fill:currentColor; margin-right:8px; display:inline-block; vertical-align:middle;">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
            <span class="spec-text-node" style="display:inline-block; vertical-align:middle;">${specText}</span>
          `;
          specsList.appendChild(liSpec);
        });
      }

      meta.appendChild(h3);
      meta.appendChild(pLoc);
      meta.appendChild(specsList);
      article.appendChild(imgWrapper);
      article.appendChild(meta);
      gridTarget.appendChild(article);
    });
  }
}

function paintFAQMatrix(faqData) {
  const miniTarget = document.querySelector('.faq-mini-target');
  const titleTarget = document.querySelector('.faq-title-target');
  const leadTarget = document.querySelector('.faq-lead-target');
  const ctaTarget = document.querySelector('.faq-cta-target');

  if (miniTarget && faqData.sectionMiniHeading) miniTarget.textContent = faqData.sectionMiniHeading;
  if (titleTarget && faqData.sectionHeading) titleTarget.textContent = faqData.sectionHeading;
  if (leadTarget && faqData.sectionDescription) leadTarget.textContent = faqData.sectionDescription;
  if (ctaTarget && faqData.ctaLabel) ctaTarget.textContent = faqData.ctaLabel;

  const wrapperTarget = document.querySelector('.faq-wrapper-target');
  if (wrapperTarget && faqData.faqList && faqData.faqList.length > 0) {
    wrapperTarget.innerHTML = '';

    faqData.faqList.forEach((item, index) => {
      const serialIndex = String(index + 1).padStart(2, '0');
      
      const accordionItem = document.createElement('details');
      accordionItem.className = 'faq-accordion-item';

      accordionItem.name = 'faq-group';

      if (index === 0) {
        accordionItem.setAttribute('open', '');
      }

      const summaryTrigger = document.createElement('summary');
      summaryTrigger.className = 'faq-trigger';

      const qSpan = document.createElement('span');
      qSpan.className = 'faq-question';
      qSpan.textContent = `${serialIndex} / ${item.question || ''}`;

      const iconSpan = document.createElement('span');
      iconSpan.className = 'faq-status-icon';

      summaryTrigger.appendChild(qSpan);
      summaryTrigger.appendChild(iconSpan);

      const panel = document.createElement('div');
      panel.className = 'faq-content-panel';

      const inner = document.createElement('div');
      inner.className = 'faq-content-inner';

      const p = document.createElement('p');
      p.textContent = item.answer || '';

      inner.appendChild(p);
      panel.appendChild(inner);
      
      accordionItem.appendChild(summaryTrigger);
      accordionItem.appendChild(panel);
      wrapperTarget.appendChild(accordionItem);
    });

    if (typeof initFaqScrollReveal === 'function') {
      initFaqScrollReveal();
    }
  }
}

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