/**
 * ZAPDOCS — INTERACTIVE SCROLL & STORYTELLING ENGINE
 * Smooth, Apple-inspired performance with GPU-friendly transforms and zero layout shifts
 */

document.addEventListener('DOMContentLoaded', () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 1. STICKY NAVBAR SCROLL BEHAVIOR
  const navbar = document.querySelector('.zap-navbar');
  const handleNavScroll = () => {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll();

  // 2. SCROLL REVEAL OBSERVER (INTERSECTION OBSERVER)
  if (!prefersReducedMotion) {
    const revealElements = document.querySelectorAll('.reveal-item, .reveal-scale');
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -8% 0px',
      threshold: 0.12
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    document.querySelectorAll('.reveal-item, .reveal-scale').forEach(el => {
      el.classList.add('is-revealed');
    });
  }

  // 3. HERO DEPTH EFFECT ON SCROLL
  const heroVisual = document.querySelector('.hero-visual-container');
  const heroContent = document.querySelector('.hero-content');
  if (!prefersReducedMotion && heroVisual && heroContent) {
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          if (scrollY < 900) {
            const scaleVal = Math.max(0.92, 1 - (scrollY * 0.00015));
            const yOffset = scrollY * 0.12;
            heroVisual.style.transform = `scale(${scaleVal}) translateY(${yOffset * 0.4}px)`;
            heroContent.style.opacity = `${Math.max(0, 1 - (scrollY / 700))}`;
          }
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  // 4 & 5. STICKY STORYTELLING 8-STEP SCROLL SYNC
  const storyCards = document.querySelectorAll('.story-step-card');
  const stageScreens = document.querySelectorAll('.sticky-stage-screen');
  const progressDots = document.querySelectorAll('.progress-dot');
  const currentStepLabel = document.getElementById('stickyCurrentStep');

  if (storyCards.length > 0) {
    const updateActiveStage = (index) => {
      // Update cards
      storyCards.forEach((card, i) => {
        card.classList.toggle('active', i === index);
      });
      // Update sticky preview screens
      stageScreens.forEach((screen, i) => {
        screen.classList.toggle('active', i === index);
      });
      // Update progress dots
      progressDots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
      });
      // Update indicator label
      if (currentStepLabel) {
        const stepNum = String(index + 1).padStart(2, '0');
        currentStepLabel.textContent = `Stage ${stepNum} of 08`;
      }
    };

    // Scroll spy for story steps
    const stepObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const stepIndex = parseInt(entry.target.getAttribute('data-step-index'), 10);
          if (!isNaN(stepIndex)) {
            updateActiveStage(stepIndex);
          }
        }
      });
    }, {
      rootMargin: '-30% 0px -40% 0px',
      threshold: 0.2
    });

    storyCards.forEach(card => stepObserver.observe(card));

    // Click on step card smoothly scrolls it into view
    storyCards.forEach((card, idx) => {
      card.addEventListener('click', () => {
        updateActiveStage(idx);
        card.scrollIntoView({ behavior: 'smooth', block: 'center' });
      });
    });
  }

  // 6. INTERACTIVE DOCUMENT ENGINE CONTROLS
  const docTabs = document.querySelectorAll('.doc-engine-tab');
  const docPaper = document.getElementById('interactiveDocPaper');
  const sealElement = document.getElementById('docSealElement');
  const sigOwner = document.getElementById('docSigOwner');
  const sigTenant = document.getElementById('docSigTenant');
  const docFillableFields = document.querySelectorAll('.doc-fillable-text');

  if (docTabs.length > 0 && docPaper) {
    docTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        docTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const stage = tab.getAttribute('data-doc-stage');

        if (stage === 'blank') {
          docFillableFields.forEach(f => f.style.opacity = '0.35');
          if (sealElement) sealElement.style.opacity = '0';
          if (sigOwner) sigOwner.style.opacity = '0';
          if (sigTenant) sigTenant.style.opacity = '0';
        } else if (stage === 'populated') {
          docFillableFields.forEach(f => f.style.opacity = '1');
          if (sealElement) sealElement.style.opacity = '0';
          if (sigOwner) sigOwner.style.opacity = '0';
          if (sigTenant) sigTenant.style.opacity = '0';
        } else if (stage === 'estamp') {
          docFillableFields.forEach(f => f.style.opacity = '1');
          if (sealElement) {
            sealElement.style.opacity = '1';
            sealElement.style.transform = 'rotate(-3deg) scale(1)';
          }
          if (sigOwner) sigOwner.style.opacity = '0';
          if (sigTenant) sigTenant.style.opacity = '0';
        } else if (stage === 'signed') {
          docFillableFields.forEach(f => f.style.opacity = '1');
          if (sealElement) sealElement.style.opacity = '1';
          if (sigOwner) sigOwner.style.opacity = '1';
          if (sigTenant) sigTenant.style.opacity = '0.4';
        } else if (stage === 'final') {
          docFillableFields.forEach(f => f.style.opacity = '1');
          if (sealElement) sealElement.style.opacity = '1';
          if (sigOwner) sigOwner.style.opacity = '1';
          if (sigTenant) sigTenant.style.opacity = '1';
        }
      });
    });
  }

  // 7. PAYMENT & STAMP DUTY REAL-TIME CALCULATOR
  const stateSelect = document.getElementById('calcState');
  const rentInput = document.getElementById('calcRent');
  const monthsSelect = document.getElementById('calcMonths');
  const stampDutyDisplay = document.getElementById('calcStampDuty');
  const platformFeeDisplay = document.getElementById('calcPlatformFee');
  const totalDisplay = document.getElementById('calcTotal');
  const verifySimBtn = document.getElementById('simulatePaymentBtn');
  const verifyStatusChip = document.getElementById('paymentStatusChip');

  const stampRates = {
    'Karnataka': { stamp: 500, estDuty: 0.005 },
    'Maharashtra': { stamp: 1000, estDuty: 0.0025 },
    'Telangana': { stamp: 400, estDuty: 0.004 },
    'Delhi': { stamp: 500, estDuty: 0.005 },
    'Tamil Nadu': { stamp: 300, estDuty: 0.004 }
  };

  const recalculateFees = () => {
    if (!stateSelect || !rentInput || !monthsSelect) return;
    const state = stateSelect.value || 'Karnataka';
    const rent = parseFloat(rentInput.value) || 25000;
    const months = parseInt(monthsSelect.value, 10) || 11;

    const rateConfig = stampRates[state] || stampRates['Karnataka'];
    const totalRent = rent * months;
    const stampFee = Math.max(rateConfig.stamp, Math.round(totalRent * rateConfig.estDuty));
    const platformFee = 499;
    const total = stampFee + platformFee;

    if (stampDutyDisplay) stampDutyDisplay.textContent = `₹${stampFee.toLocaleString('en-IN')}`;
    if (platformFeeDisplay) platformFeeDisplay.textContent = `₹${platformFee.toLocaleString('en-IN')}`;
    if (totalDisplay) totalDisplay.textContent = `₹${total.toLocaleString('en-IN')}`;
  };

  if (stateSelect && rentInput && monthsSelect) {
    stateSelect.addEventListener('change', recalculateFees);
    rentInput.addEventListener('input', recalculateFees);
    monthsSelect.addEventListener('change', recalculateFees);
    recalculateFees();
  }

  // Payment Verification Simulator
  if (verifySimBtn && verifyStatusChip) {
    verifySimBtn.addEventListener('click', () => {
      verifyStatusChip.textContent = 'Verification in progress...';
      verifyStatusChip.className = 'node-status-chip chip-in-progress';
      verifySimBtn.disabled = true;
      verifySimBtn.textContent = 'Verifying with Treasury...';

      setTimeout(() => {
        verifyStatusChip.textContent = 'eStamp GRN Issued ✓';
        verifyStatusChip.className = 'node-status-chip chip-success';
        verifySimBtn.disabled = false;
        verifySimBtn.textContent = 'Verified! Run Again';
      }, 1600);
    });
  }

  // 8. DUAL-SIGNER INTERACTIVE WORKFLOW TOGGLE
  const signOwnerBtn = document.getElementById('signOwnerBtn');
  const signTenantBtn = document.getElementById('signTenantBtn');
  const ownerInk = document.getElementById('ownerInkDisplay');
  const tenantInk = document.getElementById('tenantInkDisplay');
  const tenantLockMsg = document.getElementById('tenantLockNotice');

  if (signOwnerBtn && ownerInk) {
    signOwnerBtn.addEventListener('click', () => {
      ownerInk.style.display = 'block';
      signOwnerBtn.textContent = 'Signed with Aadhaar OTP ✓';
      signOwnerBtn.classList.remove('zap-btn-primary');
      signOwnerBtn.classList.add('zap-btn-secondary');
      if (tenantLockMsg) {
        tenantLockMsg.textContent = '✓ Secure link sent to tenant: +91 98765 43210. Ready for guest sign.';
        tenantLockMsg.style.color = 'var(--zap-success)';
      }
      if (signTenantBtn) {
        signTenantBtn.removeAttribute('disabled');
        signTenantBtn.classList.remove('zap-btn-ghost');
        signTenantBtn.classList.add('zap-btn-primary');
      }
    });
  }

  if (signTenantBtn && tenantInk) {
    signTenantBtn.addEventListener('click', () => {
      tenantInk.style.display = 'block';
      signTenantBtn.textContent = 'Tenant Signed as Guest ✓';
      signTenantBtn.classList.remove('zap-btn-primary');
      signTenantBtn.classList.add('zap-btn-secondary');
      const finalBanner = document.getElementById('dualSignCompleteBanner');
      if (finalBanner) {
        finalBanner.style.display = 'flex';
      }
    });
  }

  // 9. FAQ ACCORDION
  const faqHeaders = document.querySelectorAll('.faq-header');
  faqHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const card = header.parentElement;
      const isOpen = card.classList.contains('open');
      // Close other accordions
      document.querySelectorAll('.faq-card').forEach(c => c.classList.remove('open'));
      if (!isOpen) {
        card.classList.add('open');
      }
    });
  });
});
