/**
 * Soham Patil Portfolio — Main Application Script
 * Interactive Constellation Canvas, Scroll-Spy Navigation, Modals, Audio Synthesizer & Toast Alerts
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (window.lucide) {
    lucide.createIcons();
  }

  /* --------------------------------------------------------------------------
     1. Interactive Constellation Particle Canvas (Exact Friend's Feature)
     -------------------------------------------------------------------------- */
  const canvas = document.getElementById('particle-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.6;
        this.vy = (Math.random() - 0.5) * 0.6;
        this.size = Math.random() * 2 + 0.6;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }
      draw() {
        ctx.fillStyle = 'rgba(41, 121, 255, 0.6)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const initParticles = () => {
      particles = [];
      const count = Math.min(100, Math.max(40, Math.floor((canvas.width * canvas.height) / 14000)));
      for (let i = 0; i < count; i++) {
        particles.push(new Particle());
      }
    };

    const animateParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const len = particles.length;
      for (let i = 0; i < len; i++) {
        for (let j = i; j < len; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 110) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(41, 121, 255, ${0.18 - dist / 800})`;
            ctx.lineWidth = 0.6;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      animationFrameId = requestAnimationFrame(animateParticles);
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    animateParticles();
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

    // Navbar scrolled background
    if (navbar) {
      if (scrollY > 30) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    // Back to top visibility
    if (backToTopBtn) {
      if (scrollY > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }

    // Section scroll-spy
    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 140;
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
     4. Modals Management (Resume, Certificate, Simon Game)
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
          <div style="display: flex; flex-direction: column; gap: 20px;">
            <div style="background: rgba(23, 42, 69, 0.7); border: 1px solid rgba(41, 121, 255, 0.3); border-radius: 12px; padding: 24px; text-align: center;">
              <span style="display: inline-block; font-size: 0.75rem; font-weight: 700; color: #00BCD4; background: rgba(0, 188, 212, 0.15); padding: 4px 12px; border-radius: 9999px; margin-bottom: 12px;">VERIFIED CREDENTIAL</span>
              <p style="font-size: 0.85rem; color: #94a3b8; text-transform: uppercase;">This is to certify that</p>
              <h3 style="font-size: 1.4rem; font-weight: 800; color: #ffffff; margin: 4px 0 10px;">Soham Patil</h3>
              <p style="font-size: 0.85rem; color: #94a3b8;">has completed the course requirement for</p>
              <h4 style="font-size: 1.2rem; color: #2979FF; margin: 4px 0 8px;">${certData.title}</h4>
              <p style="font-size: 0.9rem; color: #94a3b8;">Issued by <strong>${certData.issuer}</strong> via ${certData.platform}</p>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
              <div style="background: rgba(23, 42, 69, 0.5); padding: 12px 16px; border-radius: 8px; border: 1px solid rgba(41, 121, 255, 0.15);">
                <strong style="display: block; font-size: 0.75rem; color: #64748b; text-transform: uppercase;">Completion Date</strong>
                <span style="color: #ffffff; font-weight: 600;">${certData.date}</span>
              </div>
              <div style="background: rgba(23, 42, 69, 0.5); padding: 12px 16px; border-radius: 8px; border: 1px solid rgba(41, 121, 255, 0.15);">
                <strong style="display: block; font-size: 0.75rem; color: #64748b; text-transform: uppercase;">Credential ID</strong>
                <span style="color: #00BCD4; font-weight: 600;">${certData.credentialId}</span>
              </div>
            </div>

            <p style="font-size: 0.92rem; color: #94a3b8; line-height: 1.6;">${certData.summary}</p>

            <a href="${certData.verificationUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary w-full">
              <i data-lucide="external-link"></i>
              <span>View Profile Credentials</span>
            </a>
          </div>
        `;

        openModal(certModal);
      }
    });
  });

  if (certModalClose) {
    certModalClose.addEventListener('click', () => closeModal(certModal));
  }

  // Simon Game Modal
  const openSimonBtn = document.getElementById('open-simon-demo-btn');
  const simonModalClose = document.getElementById('simon-modal-close');

  if (openSimonBtn) {
    openSimonBtn.addEventListener('click', () => openModal(simonModal));
  }
  if (simonModalClose) {
    simonModalClose.addEventListener('click', () => closeModal(simonModal));
  }

  // Close modals on background or ESC
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
     5. Simon Game Engine (Web Audio API Synthesizer)
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

  const audioCtx = window.AudioContext ? new (window.AudioContext || window.webkitAudioContext)() : null;

  function playTone(color) {
    if (!audioCtx) return;
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    const freqMap = {
      green: 261.63,
      red: 329.63,
      yellow: 392.00,
      blue: 523.25,
      wrong: 110.00
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
     6. 1-Click Copy-to-Clipboard & Toast Alerts
     -------------------------------------------------------------------------- */
  const copyButtons = document.querySelectorAll('.btn-copy');
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toast-message');
  let toastTimeout = null;

  function showToast(message) {
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
      showToast('Could not copy text.');
    }
    document.body.removeChild(textArea);
  }

  /* --------------------------------------------------------------------------
     7. Contact Form Handling
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

      if (!nameInput.value.trim()) {
        nameInput.parentElement.classList.add('has-error');
        isValid = false;
      } else {
        nameInput.parentElement.classList.remove('has-error');
      }

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailInput.value.trim() || !emailPattern.test(emailInput.value.trim())) {
        emailInput.parentElement.classList.add('has-error');
        isValid = false;
      } else {
        emailInput.parentElement.classList.remove('has-error');
      }

      if (!messageInput.value.trim()) {
        messageInput.parentElement.classList.add('has-error');
        isValid = false;
      } else {
        messageInput.parentElement.classList.remove('has-error');
      }

      if (!isValid) {
        showToast('Please fill in all required fields.');
        return;
      }

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i data-lucide="loader"></i> Sending message...';
        if (window.lucide) lucide.createIcons();
      }

      setTimeout(() => {
        showToast('Message sent! Opening email client...');
        const mailSubject = encodeURIComponent(subjectInput.value.trim() || `Portfolio Inquiry from ${nameInput.value.trim()}`);
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
