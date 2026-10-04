/**
 * SAMA A2Z — Interactive Chat & Business HUD Simulator
 * Synchronizes realistic WhatsApp conversations in Telugu / Hindi / English
 * with the operator "What Your Business Sees" real-time status HUD.
 */

const CHAT_SCENARIOS = {
  realestate: {
    name: "Sri Sai Properties",
    avatar: "SSP",
    category: "Property & Real Estate",
    steps: [
      {
        sender: "customer",
        telugu: "హలో, కొండాపూర్ లో 3BHK ఫ్లాట్ అందుబాటులో ఉందా?",
        english: "Is a 3BHK flat available in Kondapur?",
        hindi: "नमस्ते, क्या कोंडापुर में 3BHK फ्लैट उपलब्ध है?",
        time: "11:42 pm",
        hudStep: 0,
        hudData: {
          title: "Enquiry arrives, 11:42 pm",
          desc: "From WhatsApp, a portal or an ad"
        }
      },
      {
        sender: "ai",
        telugu: "అవును, కొండాపూర్ లో 3BHK ఫ్లాట్లు ఉన్నాయి. మీ బడ్జెట్ ఎంత?",
        english: "Yes, we have 3BHK flats in Kondapur. What is your budget?",
        hindi: "हाँ, कोंडापुर में 3BHK फ्लैट उपलब्ध हैं। आपका बजट क्या है?",
        time: "11:42 pm",
        hudStep: 1,
        hudData: {
          title: "Answered in 8 seconds",
          desc: "Using only prices and details you approved"
        }
      },
      {
        sender: "customer",
        telugu: "90 లక్షల వరకు",
        english: "Up to ₹90 lakh",
        hindi: "₹90 लाख तक",
        time: "11:44 pm",
        hudStep: 2,
        hudData: {
          title: "Qualified lead recorded",
          desc: "3BHK, Kondapur, up to ₹90 lakh budget"
        }
      },
      {
        sender: "ai",
        telugu: "శనివారం ఉదయం 11 గంటలకు సైట్ విజిట్ బుక్ చేయమంటారా?",
        english: "Shall I book a site visit for Saturday, 11:00 am?",
        hindi: "क्या मैं शनिवार सुबह 11:00 बजे के लिए साइट विजिट बुक करूँ?",
        time: "11:45 pm",
        hudStep: 3,
        hudData: {
          title: "Site visit proposed",
          desc: "Direct slot match from open calendar"
        }
      },
      {
        sender: "card",
        title: "Visit booked. Saturday, 11:00 am",
        sub: "Calendar invitation sent & reminders queued for Friday evening",
        time: "11:45 pm",
        hudStep: 4,
        hudData: {
          title: "Site visit booked & confirmed",
          desc: "Reminders go out Friday evening & Saturday morning"
        }
      },
      {
        sender: "summary",
        title: "You get a 8:00 am morning summary",
        desc: "New leads, qualified details, and exactly who needs a call",
        time: "8:00 am",
        hudStep: 5,
        hudData: {
          title: "8:00 AM Morning Executive Summary",
          desc: "Delivered to owner's phone before office opens"
        }
      }
    ]
  },
  interiors: {
    name: "Sri Interior Studios",
    avatar: "SIS",
    category: "Interiors & Modular",
    steps: [
      {
        sender: "customer",
        telugu: "మా 3BHK ఫ్లాట్ ఇంటీరియర్ డిజైన్ కొటేషన్ కావాలి.",
        english: "Need a modular interior quotation for our new 3BHK flat in Gachibowli.",
        hindi: "हमारे 3BHK फ्लैट के लिए इंटीरियर डिज़ाइन का कोटेशन चाहिए।",
        time: "10:15 pm",
        hudStep: 0,
        hudData: {
          title: "Enquiry arrives, 10:15 pm",
          desc: "From Instagram Ad campaign"
        }
      },
      {
        sender: "ai",
        telugu: "ఖచ్చితంగా! మీ స్వాధీనం తేదీ ఎప్పుడు, మరియు మీ ప్రాథమిక బడ్జెట్ ఎంత?",
        english: "Certainly! When is your handover date, and what is your expected budget range?",
        hindi: "बिल्कुल! आपका पजेशन कब है और आपका अनुमानित बजट क्या है?",
        time: "10:15 pm",
        hudStep: 1,
        hudData: {
          title: "Answered in 6 seconds",
          desc: "Instant friendly qualification in Telugu/English"
        }
      },
      {
        sender: "customer",
        telugu: "వచ్చే నెల. బడ్జెట్ 12 నుండి 15 లక్షలు.",
        english: "Handover next month. Budget is ₹12 to ₹15 lakhs.",
        hindi: "अगले महीने। बजट 12 से 15 लाख।",
        time: "10:18 pm",
        hudStep: 2,
        hudData: {
          title: "Qualified: ₹12-15L handover next month",
          desc: "Priority tag: Ready to design"
        }
      },
      {
        sender: "ai",
        telugu: "మా డిజైనర్ రేపు సాయంత్రం 4 గంటలకు ఉచిత 3D కన్సల్టేషన్ కోసం కాల్ చేయవచ్చా?",
        english: "Would you like our chief designer to schedule a 3D consultation tomorrow at 4 PM?",
        hindi: "क्या हमारे इंटीरियर डिज़ाइनर कल शाम 4 बजे कॉल पर बात कर सकते हैं?",
        time: "10:19 pm",
        hudStep: 3,
        hudData: {
          title: "Consultation booked",
          desc: "Scheduled directly into team calendar"
        }
      },
      {
        sender: "card",
        title: "Design Consultation Booked: 4:00 PM Tomorrow",
        sub: "Floor plan checklist sent to client on WhatsApp",
        time: "10:19 pm",
        hudStep: 4,
        hudData: {
          title: "Portfolio & Checklist Dispatched",
          desc: "Customer received pricing PDF & brochure"
        }
      }
    ]
  },
  clinic: {
    name: "Sai Healthcare & Dental",
    avatar: "SHD",
    category: "Clinics & Practices",
    steps: [
      {
        sender: "customer",
        telugu: "రేపు డెంటల్ క్లీనింగ్ కోసం డాక్టర్ గారు అందుబాటులో ఉన్నారా?",
        english: "Is doctor available tomorrow for dental cleaning & checkup?",
        hindi: "क्या कल डेंटल चेकअप के लिए डॉक्टर उपलब्ध हैं?",
        time: "07:30 am",
        hudStep: 0,
        hudData: {
          title: "Enquiry arrives, 7:30 am",
          desc: "Direct from Google Business Profile"
        }
      },
      {
        sender: "ai",
        telugu: "నమస్కారం! డాక్టర్ గారు రేపు ఉదయం 10:30 లేదా సాయంత్రం 5:30 కి అందుబాటులో ఉన్నారు. ఏ సమయం మీకు వీలవుతుంది?",
        english: "Good morning! Dr. Rao is available tomorrow at 10:30 AM or 5:30 PM. Which suits you better?",
        hindi: "नमस्ते! डॉक्टर कल सुबह 10:30 या शाम 5:30 बजे उपलब्ध हैं। कौन सा समय सही रहेगा?",
        time: "07:30 am",
        hudStep: 1,
        hudData: {
          title: "Answered instantly before clinic opens",
          desc: "Using verified clinic doctor schedule"
        }
      },
      {
        sender: "customer",
        telugu: "సాయంత్రం 5:30 సరిపోతుంది.",
        english: "Evening 5:30 PM is perfect.",
        hindi: "शाम 5:30 बजे का समय ठीक है।",
        time: "07:32 am",
        hudStep: 2,
        hudData: {
          title: "Slot Selected: 5:30 PM",
          desc: "Patient contact & preference confirmed"
        }
      },
      {
        sender: "card",
        title: "Appointment Confirmed: Tomorrow 5:30 PM",
        sub: "Clinic Google Map location & preparation tips sent",
        time: "07:32 am",
        hudStep: 3,
        hudData: {
          title: "Appointment Recorded & Map Dispatched",
          desc: "SMS & WhatsApp reminder scheduled 2 hrs prior"
        }
      }
    ]
  }
};

class ChatSimulator {
  constructor() {
    this.currentScenarioKey = 'realestate';
    this.currentLang = 'telugu';
    this.stepIndex = 0;
    this.isPlaying = true;
    this.timer = null;

    this.containerMessages = document.getElementById('chatMessages');
    this.hudStepList = document.getElementById('hudStepList');
    this.chatNameEl = document.getElementById('chatContactName');
    this.chatAvatarEl = document.getElementById('chatContactAvatar');

    this.init();
  }

  init() {
    if (!this.containerMessages || !this.hudStepList) return;
    this.renderScenarioHeader();
    this.startPlayback();

    // Bind scenario buttons
    document.querySelectorAll('.demo-tab-btn[data-scenario]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('.demo-tab-btn[data-scenario]').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.switchScenario(btn.dataset.scenario);
      });
    });

    // Bind language selector if present
    document.querySelectorAll('.demo-lang-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.demo-lang-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.currentLang = btn.dataset.lang || 'telugu';
        this.restartCurrentScenario();
      });
    });
  }

  switchScenario(key) {
    if (!CHAT_SCENARIOS[key]) return;
    this.currentScenarioKey = key;
    this.renderScenarioHeader();
    this.restartCurrentScenario();
  }

  renderScenarioHeader() {
    const sc = CHAT_SCENARIOS[this.currentScenarioKey];
    if (this.chatNameEl) this.chatNameEl.textContent = sc.name;
    if (this.chatAvatarEl) this.chatAvatarEl.textContent = sc.avatar;
  }

  restartCurrentScenario() {
    clearTimeout(this.timer);
    this.stepIndex = 0;
    this.containerMessages.innerHTML = '';
    this.resetHud();
    this.playNextStep();
  }

  startPlayback() {
    this.restartCurrentScenario();
  }

  resetHud() {
    const sc = CHAT_SCENARIOS[this.currentScenarioKey];
    this.hudStepList.innerHTML = '';
    sc.steps.forEach((step, idx) => {
      const stepEl = document.createElement('div');
      stepEl.className = 'hud-step-item';
      stepEl.id = `hud-step-${idx}`;
      stepEl.innerHTML = `
        <div class="hud-step-icon">${idx + 1}</div>
        <div class="hud-step-content">
          <div class="hud-step-name">${step.hudData ? step.hudData.title : 'Processing'}</div>
          <div class="hud-step-desc">${step.hudData ? step.hudData.desc : ''}</div>
        </div>
      `;
      this.hudStepList.appendChild(stepEl);
    });
  }

  playNextStep() {
    const sc = CHAT_SCENARIOS[this.currentScenarioKey];
    if (this.stepIndex >= sc.steps.length) {
      // Loop after delay
      this.timer = setTimeout(() => {
        this.restartCurrentScenario();
      }, 7000);
      return;
    }

    const step = sc.steps[this.stepIndex];
    this.renderMessage(step);
    this.updateHud(this.stepIndex);

    this.stepIndex++;
    const delay = step.sender === 'customer' ? 2200 : (step.sender === 'card' ? 2000 : 2500);
    this.timer = setTimeout(() => this.playNextStep(), delay);
  }

  renderMessage(step) {
    const bubble = document.createElement('div');
    
    if (step.sender === 'customer') {
      bubble.className = 'chat-bubble customer';
      bubble.innerHTML = `
        <div class="telugu-text">${step.telugu}</div>
        <div class="sub-text">${step.english}</div>
        <div class="meta">${step.time} <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg></div>
      `;
    } else if (step.sender === 'ai') {
      bubble.className = 'chat-bubble ai';
      bubble.innerHTML = `
        <div class="telugu-text">${step.telugu}</div>
        <div class="sub-text">${step.english}</div>
        <div class="meta">${step.time} <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#53bdeb" stroke-width="2"><polyline points="18 6 9 17 4 12"></polyline><polyline points="22 10 13 21 8 16"></polyline></svg></div>
      `;
    } else if (step.sender === 'card') {
      bubble.className = 'chat-bubble-card';
      bubble.innerHTML = `
        <div class="chat-card-title">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
          ${step.title}
        </div>
        <div style="font-size:0.75rem; color:#54656F; margin-top:2px;">${step.sub}</div>
        <div class="meta">${step.time}</div>
      `;
    } else if (step.sender === 'summary') {
      bubble.className = 'chat-bubble-card';
      bubble.style.borderLeftColor = '#1878DE';
      bubble.innerHTML = `
        <div class="chat-card-title" style="color:#1878DE;">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
          ${step.title}
        </div>
        <div style="font-size:0.75rem; color:#54656F; margin-top:2px;">${step.desc}</div>
        <div class="meta">${step.time}</div>
      `;
    }

    this.containerMessages.appendChild(bubble);
    this.containerMessages.scrollTop = this.containerMessages.scrollHeight;
  }

  updateHud(index) {
    document.querySelectorAll('.hud-step-item').forEach((el, i) => {
      if (i < index) {
        el.className = 'hud-step-item completed';
        el.querySelector('.hud-step-icon').innerHTML = '✓';
      } else if (i === index) {
        el.className = 'hud-step-item active';
        el.querySelector('.hud-step-icon').innerHTML = i + 1;
      } else {
        el.className = 'hud-step-item';
        el.querySelector('.hud-step-icon').innerHTML = i + 1;
      }
    });
  }
}

// Auto-instantiate when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.samaChatSimulator = new ChatSimulator();
});
