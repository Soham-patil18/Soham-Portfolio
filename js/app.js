/**
 * Soham Patil Portfolio — Main Application Script
 * Interactive Constellation Canvas, 2-Second Continuous Project Carousels, High-Res Certificate Previews, Modals & Audio Synthesizer
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (window.lucide) {
    lucide.createIcons();
  }

  /* --------------------------------------------------------------------------
     1. Interactive Constellation Particle Canvas
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
     2. Reusable 2-Second Continuous Animated Project Carousels
     -------------------------------------------------------------------------- */
  function setupProjectCarousel(wrapperId, prevBtnId, nextBtnId) {
    const wrapper = document.getElementById(wrapperId);
    if (!wrapper) return;

    const slides = wrapper.querySelectorAll('.carousel-slide');
    const dots = wrapper.querySelectorAll('.dot-btn');
    const prevBtn = document.getElementById(prevBtnId);
    const nextBtn = document.getElementById(nextBtnId);
    let currentSlide = 0;
    let autoplayInterval = null;

    function goToSlide(index) {
      if (slides.length === 0) return;
      slides[currentSlide].classList.remove('active');
      if (dots[currentSlide]) dots[currentSlide].classList.remove('active');
      
      currentSlide = (index + slides.length) % slides.length;
      
      slides[currentSlide].classList.add('active');
      if (dots[currentSlide]) dots[currentSlide].classList.add('active');
      if (window.lucide) lucide.createIcons();
    }

    function nextSlide() {
      goToSlide(currentSlide + 1);
    }

    function prevSlide() {
      goToSlide(currentSlide - 1);
    }

    function startAutoplay() {
      if (autoplayInterval) clearInterval(autoplayInterval);
      autoplayInterval = setInterval(nextSlide, 2000); // exactly 2 seconds continuous
    }

    function stopAutoplay() {
      if (autoplayInterval) clearInterval(autoplayInterval);
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        nextSlide();
        startAutoplay();
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        prevSlide();
        startAutoplay();
      });
    }

    dots.forEach((dot, idx) => {
      dot.addEventListener('click', () => {
        goToSlide(idx);
        startAutoplay();
      });
    });

    wrapper.addEventListener('mouseenter', stopAutoplay);
    wrapper.addEventListener('mouseleave', startAutoplay);

    // Start 2-second continuous animation
    startAutoplay();
  }

  // Initialize NammaKisan, BEC Bill Desk, and InterviewIQ carousels
  setupProjectCarousel('nammakisan-carousel', 'nk-prev-btn', 'nk-next-btn');
  setupProjectCarousel('becbilldesk-carousel', 'bbd-prev-btn', 'bbd-next-btn');
  setupProjectCarousel('interviewiq-carousel', 'iiq-prev-btn', 'iiq-next-btn');

  /* --------------------------------------------------------------------------
     3. Sticky Navbar & Active Scroll Spy
     -------------------------------------------------------------------------- */
  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
  const backToTopBtn = document.getElementById('back-to-top');

  function handleScroll() {
    const scrollY = window.scrollY;

    if (navbar) {
      if (scrollY > 30) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    if (backToTopBtn) {
      if (scrollY > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }

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
     4. Mobile Navigation Drawer
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
     5. Modals Management (Resume, Certificate, Simon Game)
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

  // Certificate Modal Handlers (Previews with real Certificate Image)
  const certElements = document.querySelectorAll('.cert-view-btn, .cert-preview-img-wrap');
  const certModalTitle = document.getElementById('cert-modal-title');
  const certModalOrg = document.getElementById('cert-modal-org');
  const certModalContent = document.getElementById('cert-modal-content');
  const certModalClose = document.getElementById('cert-modal-close');

  certElements.forEach(el => {
    el.addEventListener('click', () => {
      const certKey = el.getAttribute('data-cert');
      if (!certKey) return;
      const certData = PORTFOLIO_DATA.certifications[certKey];

      if (certData && certModalContent) {
        certModalTitle.textContent = certData.title;
        certModalOrg.textContent = `${certData.issuer} • ${certData.platform} (${certData.date})`;

        let verifyBtnHtml = '';
        if (certData.verificationUrl) {
          verifyBtnHtml = `
            <a href="${certData.verificationUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary" style="flex: 1;">
              <i data-lucide="shield-check"></i>
              <span>Verify Official Credential</span>
            </a>
          `;
        }

        certModalContent.innerHTML = `
          <div class="modal-cert-viewer">
            <div class="modal-cert-img-container">
              <img src="${certData.image}" alt="${certData.title}" class="modal-full-cert-img">
            </div>
            
            <div class="modal-cert-meta">
              <div class="meta-row">
                <div>
                  <strong style="color: #64748b; font-size: 0.78rem; text-transform: uppercase;">Issued To</strong>
                  <p style="font-weight: 700; color: #ffffff;">Soham Patil</p>
                </div>
                <div>
                  <strong style="color: #64748b; font-size: 0.78rem; text-transform: uppercase;">Issue Date</strong>
                  <p style="font-weight: 700; color: #00BCD4;">${certData.date}</p>
                </div>
                <div>
                  <strong style="color: #64748b; font-size: 0.78rem; text-transform: uppercase;">Credential / Verification ID</strong>
                  <p style="font-weight: 700; color: #2979FF; font-family: var(--font-mono); font-size: 0.85rem;">${certData.credentialId || 'Verified'}</p>
                </div>
              </div>

              <p style="font-size: 0.92rem; color: #94a3b8; line-height: 1.6; margin-top: 14px;">${certData.summary}</p>

              <div style="display: flex; gap: 12px; margin-top: 20px; flex-wrap: wrap;">
                ${verifyBtnHtml}
                <a href="${certData.image}" target="_blank" download class="btn btn-outline" style="flex: 1;">
                  <i data-lucide="download"></i>
                  <span>Download High-Res Image</span>
                </a>
              </div>
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

  // Simon Game Modal
  const openSimonBtn = document.getElementById('open-simon-demo-btn');
  const simonModalClose = document.getElementById('simon-modal-close');

  if (openSimonBtn) {
    openSimonBtn.addEventListener('click', () => openModal(simonModal));
  }
  if (simonModalClose) {
    simonModalClose.addEventListener('click', () => closeModal(simonModal));
  }

  // Close modals on backdrop or ESC
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
});
