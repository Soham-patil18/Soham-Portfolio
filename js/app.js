/**
 * Soham Patil Portfolio — Main Application Script
 * Handles Theme Toggling, Modals, Scroll Spy, Filtering, Audio Synthesizer, and Form Handling
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (window.lucide) {
    lucide.createIcons();
  }

  /* --------------------------------------------------------------------------
     1. Theme Switcher (Dark / Light Mode)
     -------------------------------------------------------------------------- */
  const themeToggleBtn = document.getElementById('theme-toggle');
  const htmlElement = document.documentElement;

  // Check saved theme or default to dark
  const savedTheme = localStorage.getItem('theme') || 'dark';
  htmlElement.setAttribute('data-theme', savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = htmlElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      htmlElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      showToast(`Switched to ${newTheme} mode`);
    });
  }

  /* --------------------------------------------------------------------------
     2. Sticky Navbar & Active Scroll Spy
     -------------------------------------------------------------------------- */
  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
  const backToTopBtn = document.getElementById('back-to-top');

  function handleScroll() {
    const scrollY = window.scrollY;

    // Navbar shadow on scroll
    if (navbar) {
      if (scrollY > 20) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    // Back to Top button visibility
    if (backToTopBtn) {
      if (scrollY > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }

    // Scroll Spy for active navigation highlight
    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* --------------------------------------------------------------------------
     3. Mobile Navigation Drawer
     -------------------------------------------------------------------------- */
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  function toggleMobileMenu() {
    const isOpen = mobileDrawer.classList.contains('open');
    if (isOpen) {
      mobileDrawer.classList.remove('open');
      mobileToggle.classList.remove('active');
      mobileToggle.setAttribute('aria-expanded', 'false');
      mobileDrawer.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    } else {
      mobileDrawer.classList.add('open');
      mobileToggle.classList.add('active');
      mobileToggle.setAttribute('aria-expanded', 'true');
      mobileDrawer.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
  }

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', toggleMobileMenu);

    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        toggleMobileMenu();
      });
    });
  }

  /* --------------------------------------------------------------------------
     4. Project Filtering
     -------------------------------------------------------------------------- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (filterValue === 'all' || cardCategory === filterValue) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });

  /* --------------------------------------------------------------------------
     5. Modals Management (Resume, Certificate, Simon Game, Project Details)
     -------------------------------------------------------------------------- */
  const resumeModal = document.getElementById('resume-modal');
  const certModal = document.getElementById('cert-modal');
  const simonModal = document.getElementById('simon-modal');

  const resumeTriggers = [
    document.getElementById('nav-resume-btn'),
    document.getElementById('hero-resume-trigger'),
    document.getElementById('mobile-resume-btn')
  ];

  function openModal(modal) {
    if (!modal) return;
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    if (window.lucide) lucide.createIcons();
  }

  function closeModal(modal) {
    if (!modal) return;
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // Resume Modal Triggers
  resumeTriggers.forEach(btn => {
    if (btn) {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        if (mobileDrawer && mobileDrawer.classList.contains('open')) {
          toggleMobileMenu();
        }
        openModal(resumeModal);
      });
    }
  });

  const resumeCloseBtn = document.getElementById('resume-modal-close');
  if (resumeCloseBtn) {
    resumeCloseBtn.addEventListener('click', () => closeModal(resumeModal));
  }

  const printResumeBtn = document.getElementById('modal-download-resume');
  if (printResumeBtn) {
    printResumeBtn.addEventListener('click', () => {
      window.print();
    });
  }

  // Certificate Modal Handlers
  const certButtons = document.querySelectorAll('.cert-view-btn');
  const certModalTitle = document.getElementById('cert-modal-title');
  const certModalOrg = document.getElementById('cert-modal-org');
  const certModalContent = document.getElementById('cert-modal-content');
  const certModalClose = document.getElementById('cert-modal-close');

  certButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const certKey = btn.getAttribute('data-cert');
      const certData = PORTFOLIO_DATA.certifications[certKey];

      if (certData && certModalContent) {
        certModalTitle.textContent = certData.title;
        certModalOrg.textContent = `${certData.issuer} • ${certData.platform}`;

        certModalContent.innerHTML = `
          <div class="cert-preview-wrapper">
            <div class="cert-visual-card">
              <span class="cert-gold-ribbon">VERIFIED CREDENTIAL</span>
              <div class="cert-visual-badge">
                <i data-lucide="award"></i>
              </div>
              <p class="cert-certifies">This is to certify that</p>
              <h4 class="cert-recipient">Soham Patil</h4>
              <p class="cert-certifies">has successfully completed the coursework for</p>
              <h3 class="cert-course">${certData.title}</h3>
              <p class="cert-issuer">Issued by <strong>${certData.issuer}</strong> via ${certData.platform}</p>
            </div>

            <div class="cert-details-grid">
              <div class="detail-box">
                <strong>Issuing Organization</strong>
                <span>${certData.issuer}</span>
              </div>
              <div class="detail-box">
                <strong>Completion Date</strong>
                <span>${certData.date}</span>
              </div>
              <div class="detail-box">
                <strong>Credential ID</strong>
                <span>${certData.credentialId}</span>
              </div>
              <div class="detail-box">
                <strong>Status</strong>
                <span style="color: var(--accent-success);">Verified / Authentic</span>
              </div>
            </div>

            <div class="cert-skills-summary">
              <p style="font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 10px;">${certData.summary}</p>
              <div class="skills-pill-list">
                ${certData.skills.map(skill => `<span class="concept-chip"><i data-lucide="check"></i> ${skill}</span>`).join('')}
              </div>
            </div>

            <div style="display: flex; gap: 12px; margin-top: 10px;">
              <a href="${certData.verificationUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-primary w-full">
                <i data-lucide="external-link"></i>
                <span>View on Profile</span>
              </a>
            </div>
          </div>
        `;

        openModal(certModal);
      }
    });
  });

  if (certModalClose) {
    certModalClose.addEventListener('click', () => closeModal(certModal));
  }

  // Project Details Triggers
  const projectDetailTriggers = document.querySelectorAll('.project-preview-trigger');
  projectDetailTriggers.forEach(btn => {
    btn.addEventListener('click', () => {
      const projKey = btn.getAttribute('data-project');
      const projData = PORTFOLIO_DATA.projects[projKey];
      if (projData && certModalContent) {
        certModalTitle.textContent = projData.title;
        certModalOrg.textContent = `Project Overview • ${projData.date}`;

        certModalContent.innerHTML = `
          <div class="cert-preview-wrapper">
            <p style="font-size: 1rem; color: var(--text-secondary); line-height: 1.6;">${projData.description}</p>
            
            <div>
              <h5 style="font-size: 0.95rem; margin-bottom: 8px; color: var(--accent-primary);">Key Architectural Highlights:</h5>
              <ul class="project-bullets">
                ${projData.highlights.map(h => `<li><i data-lucide="check-circle-2"></i> ${h}</li>`).join('')}
              </ul>
            </div>

            <div>
              <h5 style="font-size: 0.95rem; margin-bottom: 8px; color: var(--accent-primary);">Tech Stack & Tools:</h5>
              <div class="project-tech-stack">
                ${projData.stack.map(t => `<span class="tech-tag">${t}</span>`).join('')}
              </div>
            </div>

            <div style="display: flex; gap: 12px; margin-top: 10px;">
              <a href="${projData.github}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-outline w-full">
                <i data-lucide="github"></i>
                <span>GitHub Repository</span>
              </a>
              ${projData.live ? `<a href="${projData.live}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-primary w-full"><i data-lucide="external-link"></i><span>Live Demo</span></a>` : ''}
            </div>
          </div>
        `;
        openModal(certModal);
      }
    });
  });

  // Playable Simon Game Modal
  const openSimonBtn = document.getElementById('open-simon-demo-btn');
  const simonModalClose = document.getElementById('simon-modal-close');

  if (openSimonBtn) {
    openSimonBtn.addEventListener('click', () => {
      openModal(simonModal);
    });
  }

  if (simonModalClose) {
    simonModalClose.addEventListener('click', () => closeModal(simonModal));
  }

  // Close modals on background click or ESC
  document.querySelectorAll('.modal').forEach(modal => {
    const backdrop = modal.querySelector('.modal-backdrop');
    if (backdrop) {
      backdrop.addEventListener('click', () => closeModal(modal));
    }
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal(resumeModal);
      closeModal(certModal);
      closeModal(simonModal);
      if (mobileDrawer && mobileDrawer.classList.contains('open')) {
        toggleMobileMenu();
      }
    }
  });

  /* --------------------------------------------------------------------------
     6. Simon Game Engine (Web Audio API Synthesizer)
     -------------------------------------------------------------------------- */
  const buttonColors = ["green", "red", "yellow", "blue"];
  let gamePattern = [];
  let userClickedPattern = [];
  let started = false;
  let level = 0;
  let bestScore = 0;

  const levelTitle = document.getElementById('simon-level-title');
  const currentScoreVal = document.getElementById('simon-score-val');
  const bestScoreVal = document.getElementById('simon-best-val');
  const startBtn = document.getElementById('simon-start-btn');
  const resetBtn = document.getElementById('simon-reset-btn');

  // Web Audio Synthesizer (No external audio file dependencies!)
  const audioCtx = window.AudioContext ? new (window.AudioContext || window.webkitAudioContext)() : null;

  function playTone(color) {
    if (!audioCtx) return;
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    const freqMap = {
      green: 261.63, // C4
      red: 329.63,   // E4
      yellow: 392.00,// G4
      blue: 523.25,  // C5
      wrong: 110.00  // Low buzz
    };

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = color === 'wrong' ? 'sawtooth' : 'sine';
    osc.frequency.setValueAtTime(freqMap[color] || 440, audioCtx.currentTime);

    gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.35);

    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.35);
  }

  function flashButton(color) {
    const btn = document.getElementById(color);
    if (btn) {
      btn.classList.add('active');
      playTone(color);
      setTimeout(() => {
        btn.classList.remove('active');
      }, 250);
    }
  }

  function nextSequence() {
    userClickedPattern = [];
    level++;
    if (levelTitle) levelTitle.textContent = `Level ${level}`;
    if (currentScoreVal) currentScoreVal.textContent = level - 1;

    if (level - 1 > bestScore) {
      bestScore = level - 1;
      if (bestScoreVal) bestScoreVal.textContent = bestScore;
    }

    const randomNumber = Math.floor(Math.random() * 4);
    const randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    setTimeout(() => {
      flashButton(randomChosenColor);
    }, 500);
  }

  function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length) {
        setTimeout(() => {
          nextSequence();
        }, 1000);
      }
    } else {
      playTone('wrong');
      if (levelTitle) levelTitle.textContent = "Game Over! Press Start to Retry";
      showToast("Game Over! Try again!");
      startOver();
    }
  }

  function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
    if (startBtn) startBtn.textContent = 'Restart Game';
  }

  document.querySelectorAll('.simon-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      if (!started) return;
      const userChosenColor = e.target.getAttribute('data-color');
      userClickedPattern.push(userChosenColor);
      flashButton(userChosenColor);
      checkAnswer(userClickedPattern.length - 1);
    });
  });

  if (startBtn) {
    startBtn.addEventListener('click', () => {
      if (!started) {
        started = true;
        gamePattern = [];
        level = 0;
        nextSequence();
        startBtn.textContent = 'Playing...';
      }
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      startOver();
      if (levelTitle) levelTitle.textContent = "Press Start to Play";
      if (currentScoreVal) currentScoreVal.textContent = 0;
    });
  }

  /* --------------------------------------------------------------------------
     7. 1-Click Copy-to-Clipboard & Toast Alerts
     -------------------------------------------------------------------------- */
  const copyButtons = document.querySelectorAll('.btn-copy');
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toast-message');
  let toastTimeout = null;

  function showToast(message, isError = false) {
    if (!toast || !toastMessage) return;
    toastMessage.textContent = message;
    toast.classList.add('show');
    if (toastTimeout) clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }

  copyButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.getAttribute('data-copy');
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast(`Copied "${textToCopy}" to clipboard!`);
        }).catch(() => {
          fallbackCopy(textToCopy);
        });
      } else {
        fallbackCopy(textToCopy);
      }
    });
  });

  function fallbackCopy(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      showToast(`Copied "${text}" to clipboard!`);
    } catch (err) {
      showToast('Could not copy text.', true);
    }
    document.body.removeChild(textArea);
  }

  /* --------------------------------------------------------------------------
     8. Contact Form Handling
     -------------------------------------------------------------------------- */
  const contactForm = document.getElementById('contact-form');
  const nameInput = document.getElementById('contact-name');
  const emailInput = document.getElementById('contact-email');
  const subjectInput = document.getElementById('contact-subject');
  const messageInput = document.getElementById('contact-message');
  const submitBtn = document.getElementById('contact-submit-btn');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      // Validate Name
      if (!nameInput.value.trim()) {
        nameInput.parentElement.classList.add('has-error');
        isValid = false;
      } else {
        nameInput.parentElement.classList.remove('has-error');
      }

      // Validate Email
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailInput.value.trim() || !emailPattern.test(emailInput.value.trim())) {
        emailInput.parentElement.classList.add('has-error');
        isValid = false;
      } else {
        emailInput.parentElement.classList.remove('has-error');
      }

      // Validate Message
      if (!messageInput.value.trim()) {
        messageInput.parentElement.classList.add('has-error');
        isValid = false;
      } else {
        messageInput.parentElement.classList.remove('has-error');
      }

      if (!isValid) {
        showToast('Please fill in all required fields correctly.', true);
        return;
      }

      // Simulate submission & open direct email draft fallback
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i data-lucide="loader" class="spin"></i> Sending message...';
        if (window.lucide) lucide.createIcons();
      }

      setTimeout(() => {
        showToast('Message sent! Opening email client...');
        
        const mailSubject = encodeURIComponent(subjectInput.value.trim() || `Portfolio Contact from ${nameInput.value.trim()}`);
        const mailBody = encodeURIComponent(`Hi Soham,\n\n${messageInput.value.trim()}\n\nFrom: ${nameInput.value.trim()} (${emailInput.value.trim()})`);
        
        window.location.href = `mailto:sohampatil49690@gmail.com?subject=${mailSubject}&body=${mailBody}`;

        contactForm.reset();
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = '<i data-lucide="check"></i> Message Prepared!';
          if (window.lucide) lucide.createIcons();
          setTimeout(() => {
            submitBtn.innerHTML = '<i data-lucide="send"></i> Send Message';
            if (window.lucide) lucide.createIcons();
          }, 3000);
        }
      }, 600);
    });

    // Realtime error clearing
    [nameInput, emailInput, messageInput].forEach(input => {
      if (input) {
        input.addEventListener('input', () => {
          if (input.value.trim()) {
            input.parentElement.classList.remove('has-error');
          }
        });
      }
    });
  }
});
