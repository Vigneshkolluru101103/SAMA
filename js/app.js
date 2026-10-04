/**
 * SAMA A2Z — Master Application Interactions & Storytelling Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initSmoothScrollNav();   // <-- locked nav smooth-scroll, does NOT touch DOM order
  initMobileNav();
  initIndustryTabs();
  initTimelineInteractions();
  initSecurityChecklist();
  initModalAndForms();
  initScrollAnimations();
});

/* --------------------------------------------------------------------------
   Smooth-Scroll Navigation — LOCKED BEHAVIOUR
   Rules: Only scrolls to the target section. Never reorders anything.
   Never sorts, filters, moves, or re-renders sections or nav items.
   -------------------------------------------------------------------------- */
function initSmoothScrollNav() {
  // Select ONLY internal same-page anchor links (href starting with #)
  const navAnchors = document.querySelectorAll('a[href^="#"]');

  navAnchors.forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');

      // Safety: ignore empty hashes or non-section links
      if (!href || href === '#') return;

      const target = document.querySelector(href);
      if (!target) return;

      // Prevent the browser's default instant jump
      e.preventDefault();

      // Calculate the header height so the section isn't hidden behind it
      const header = document.querySelector('.site-header');
      const headerHeight = header ? header.offsetHeight : 0;

      // Get the section's distance from the very top of the document
      const targetTop = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 12;

      // Scroll — no DOM changes, just viewport movement
      window.scrollTo({
        top: targetTop,
        behavior: 'smooth'
      });

      // Update the URL hash silently (no page jump)
      history.pushState(null, '', href);
    });
  });
}

/* --------------------------------------------------------------------------
   Sticky Header & Scroll State
   -------------------------------------------------------------------------- */
function initStickyHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });
}

/* --------------------------------------------------------------------------
   Mobile Navigation Drawer
   -------------------------------------------------------------------------- */
function initMobileNav() {
  const toggleBtn = document.querySelector('.mobile-toggle');
  const mainNav = document.querySelector('.main-nav');
  if (!toggleBtn || !mainNav) return;

  toggleBtn.addEventListener('click', () => {
    mainNav.classList.toggle('open');
    const isExpanded = mainNav.classList.contains('open');
    toggleBtn.setAttribute('aria-expanded', isExpanded);
    toggleBtn.innerHTML = isExpanded 
      ? `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`
      : `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
  });

  // Close nav on link click
  mainNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('open');
      if (toggleBtn) {
        toggleBtn.setAttribute('aria-expanded', 'false');
        toggleBtn.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
      }
    });
  });
}

/* --------------------------------------------------------------------------
   Industry Interactive Selector & Flow Pipeline
   -------------------------------------------------------------------------- */
const INDUSTRY_DATA = {
  property: {
    title: "Property & Real Estate",
    tagline: "Never lose a buyer who searches at midnight.",
    flow: [
      { step: "Enquiry", desc: "Late night WhatsApp / Portal lead" },
      { step: "Qualification", desc: "Budget (e.g. ₹90L) & preferred locality" },
      { step: "Site Visit", desc: "Saturday 11 AM slot booked in calendar" },
      { step: "Reminder", desc: "Automated route & reminder on Friday" }
    ],
    detail: "Buyers browse properties outside working hours. SAMA A2Z responds in seconds, clarifies configuration & budget, books site visits into your calendar, and hands over to your sales team with a complete brief."
  },
  interiors: {
    title: "Interiors & Modular",
    tagline: "Turn ad clicks into qualified design appointments.",
    flow: [
      { step: "Ad Click", desc: "Instagram / Facebook campaign message" },
      { step: "Handover Date", desc: "Floor plan & possession timeline check" },
      { step: "Design Call", desc: "3D consultation scheduled" },
      { step: "Estimate Follow-up", desc: "Quotation tracking till contract" }
    ],
    detail: "Filter serious homeowners from casual scrollers. The assistant verifies possession dates, collects floor plans, and schedules structured consultation calls for your interior designers."
  },
  clinics: {
    title: "Clinics & Healthcare Practices",
    tagline: "Instant doctor appointments without phone busy tones.",
    flow: [
      { step: "Search / Question", desc: "Google profile inquiry on timings & fee" },
      { step: "Slot Match", desc: "Available doctor schedule offered" },
      { step: "Appointment", desc: "Slot locked with patient name & token" },
      { step: "Follow-up", desc: "Preparation tips & visit reminder sent" }
    ],
    detail: "Patients get immediate slot availability without holding on the phone. Emergency triage escalates instantly to clinic staff, while regular consultations are booked cleanly into your roster."
  },
  coaching: {
    title: "Coaching & Education",
    tagline: "Convert parent enquiries during peak admission seasons.",
    flow: [
      { step: "Course Enquiry", desc: "Syllabus, batch timings & fee question" },
      { step: "Qualification", desc: "Student grade, target exam & location" },
      { step: "Counselling", desc: "Demo class or parent counselling slot" },
      { step: "Nurturing", desc: "Follow-up sequence until enrollment" }
    ],
    detail: "Speed matters during admission cycles. SAMA A2Z answers queries regarding syllabus, eligibility, and timings in Telugu, Hindi, or English, and schedules parent counseling sessions."
  },
  retail: {
    title: "Retail & Local Services",
    tagline: "Close orders and service requests effortlessly.",
    flow: [
      { step: "Product / Service", desc: "Stock, pricing & delivery enquiry" },
      { step: "UPI Payment Link", desc: "Official payment link sent in chat" },
      { step: "Order Booked", desc: "Invoice generated & inventory noted" },
      { step: "Delivery Tracking", desc: "Status updates sent via WhatsApp" }
    ],
    detail: "From stock checks to instant UPI payment links inside chat, local service businesses handle customer inquiries seamlessly without hiring extra reception staff."
  }
};

function initIndustryTabs() {
  const container = document.getElementById('industryDisplayContainer');
  const buttons = document.querySelectorAll('.industry-btn');
  if (!container || buttons.length === 0) return;

  function renderIndustry(key) {
    const data = INDUSTRY_DATA[key];
    if (!data) return;

    container.innerHTML = `
      <div class="industry-display-card">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:12px; margin-bottom:14px;">
          <div>
            <h3 style="font-size:1.5rem; color:var(--color-midnight);">${data.title}</h3>
            <p style="font-weight:600; color:var(--color-signal-blue); font-size:1rem; margin-top:2px;">${data.tagline}</p>
          </div>
          <span class="badge badge-blue">Industry Workflow</span>
        </div>
        <p style="margin-bottom:20px; font-size:0.98rem; line-height:1.6;">${data.detail}</p>
        
        <div class="industry-flow">
          ${data.flow.map((item, idx) => `
            <div class="industry-flow-step">
              <div style="width:32px; height:32px; border-radius:50%; background:var(--color-ice); color:var(--color-signal-blue); display:flex; align-items:center; justify-content:center; font-weight:800; font-size:0.85rem;">
                ${idx + 1}
              </div>
              <div style="font-weight:700; color:var(--color-midnight);">${item.step}</div>
              <div style="font-size:0.75rem; color:var(--color-text-muted); max-width:140px;">${item.desc}</div>
            </div>
            ${idx < data.flow.length - 1 ? `<div class="industry-flow-arrow">→</div>` : ''}
          `).join('')}
        </div>
      </div>
    `;
  }

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderIndustry(btn.dataset.industry);
    });
  });

  // Render initial
  renderIndustry('property');
}

/* --------------------------------------------------------------------------
   7-Day Implementation Timeline
   -------------------------------------------------------------------------- */
function initTimelineInteractions() {
  const steps = document.querySelectorAll('.timeline-step');
  steps.forEach(step => {
    step.addEventListener('click', () => {
      steps.forEach(s => s.classList.remove('active'));
      step.classList.add('active');
    });
  });
}

/* --------------------------------------------------------------------------
   Pre-Launch Security Checklist Tooltips & Verification
   -------------------------------------------------------------------------- */
function initSecurityChecklist() {
  const checkItems = document.querySelectorAll('.security-check-item');
  checkItems.forEach(item => {
    item.style.cursor = 'pointer';
    item.addEventListener('click', () => {
      const svg = item.querySelector('svg');
      if (svg) {
        svg.style.transform = 'scale(1.25)';
        setTimeout(() => svg.style.transform = 'scale(1)', 200);
      }
    });
  });
}

/* --------------------------------------------------------------------------
   Modal & Booking Form Wizard
   -------------------------------------------------------------------------- */
function initModalAndForms() {
  const modal = document.getElementById('demoModal');
  const openBtns = document.querySelectorAll('[data-open-demo]');
  const closeBtn = document.getElementById('modalCloseBtn');
  const demoForm = document.getElementById('samaDemoForm');
  const directWhatsAppBtns = document.querySelectorAll('[data-whatsapp-direct]');

  if (!modal) return;

  function openModal(presetType = '') {
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    if (presetType && demoForm && demoForm.businessType) {
      demoForm.businessType.value = presetType;
    }
  }

  function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const preset = btn.dataset.preset || '';
      openModal(preset);
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });

  // Handle Demo Form Submission
  if (demoForm) {
    demoForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = demoForm.name ? demoForm.name.value.trim() : '';
      const business = demoForm.business ? demoForm.business.value.trim() : '';
      const businessType = demoForm.businessType ? demoForm.businessType.value : 'Small Business';
      const city = demoForm.city ? demoForm.city.value.trim() : 'Hyderabad';
      const phone = demoForm.whatsapp ? demoForm.whatsapp.value.trim() : '';
      const language = demoForm.preferredLang ? demoForm.preferredLang.value : 'Telugu';

      // WhatsApp formatted message
      const messageText = `Hi SAMA A2Z Team! I would like to book a 20-minute demo for my business.\n\n*Name:* ${name}\n*Business:* ${business}\n*Type:* ${businessType}\n*City:* ${city}\n*Preferred Language:* ${language}\n*WhatsApp:* ${phone}`;
      
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(messageText)}`;

      // Show confirmation UI inside modal
      const modalContent = modal.querySelector('.modal-card');
      if (modalContent) {
        modalContent.innerHTML = `
          <div style="text-align:center; padding:24px 12px;">
            <div style="width:64px; height:64px; border-radius:50%; background:var(--color-confirm-green-light); color:var(--color-confirm-green); display:flex; align-items:center; justify-content:center; margin-inline:auto; margin-bottom:16px;">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
            </div>
            <h3 style="font-size:1.6rem; color:var(--color-midnight); margin-bottom:8px;">Demo Request Received</h3>
            <p style="color:var(--color-text-muted); font-size:1rem; margin-bottom:20px; line-height:1.5;">
              Thank you, <strong>${name}</strong>! Our team will contact you through WhatsApp within <strong>one working day</strong> as promised in our scope.
            </p>
            <div class="btn-group" style="justify-content:center;">
              <a href="${whatsappUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.861.173.086.275.072.376-.044.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824z"/></svg>
                Open directly in WhatsApp
              </a>
              <button type="button" class="btn btn-secondary" onclick="document.getElementById('demoModal').classList.remove('open'); location.reload();">Close</button>
            </div>
          </div>
        `;
      }
    });
  }

  // Direct WhatsApp Button click handlers
  directWhatsAppBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const defaultText = "Hi SAMA A2Z Team! I saw your website and would like to ask a question in Telugu/Hindi/English.";
      window.open(`https://wa.me/?text=${encodeURIComponent(defaultText)}`, '_blank');
    });
  });
}

/* --------------------------------------------------------------------------
   Scroll Animations Observer
   -------------------------------------------------------------------------- */
function initScrollAnimations() {
  const cards = document.querySelectorAll('.card-glass, .problem-card, .service-card, .a2z-stage-card, .hold-card');
  if (!('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  cards.forEach(card => {
    card.style.opacity = '0.92';
    card.style.transform = 'translateY(10px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease, border-color 0.25s ease, box-shadow 0.25s ease';
    observer.observe(card);
  });
}
