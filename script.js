/**
 * Plus Skills - Interactive Core Script
 * Business: Plus Skills ("Proof over pedigree")
 * Team: DIGITALERS (Shiva, Krishna, Kartik)
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initMobileNav();
  initInteractiveLeaderboard();
  initColorSwatchCopy();
  initPilotForm();
  initSurveyModal();
});

/* --------------------------------------------------------------------------
   1. Theme Management (Light / Dark / Auto)
   -------------------------------------------------------------------------- */
function initThemeToggle() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  if (!themeToggleBtn) return;

  const savedTheme = localStorage.getItem('plus-skills-theme') || 'auto';
  document.documentElement.setAttribute('data-theme', savedTheme);

  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    let nextTheme = 'light';

    if (currentTheme === 'light') {
      nextTheme = 'dark';
    } else if (currentTheme === 'dark') {
      nextTheme = 'auto';
    } else {
      // If auto, determine based on system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      nextTheme = prefersDark ? 'light' : 'dark';
    }

    document.documentElement.setAttribute('data-theme', nextTheme);
    localStorage.setItem('plus-skills-theme', nextTheme);
  });
}

/* --------------------------------------------------------------------------
   2. Mobile Drawer Navigation
   -------------------------------------------------------------------------- */
function initMobileNav() {
  const menuToggle = document.getElementById('menu-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  if (!menuToggle || !mobileNav) return;

  menuToggle.addEventListener('click', () => {
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', !isExpanded);
    menuToggle.classList.toggle('is-active', !isExpanded);
    mobileNav.hidden = isExpanded;
  });

  // Close mobile nav when clicking a link
  const navLinks = mobileNav.querySelectorAll('a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.classList.remove('is-active');
      mobileNav.hidden = true;
    });
  });
}

/* --------------------------------------------------------------------------
   3. Interactive Demo Leaderboard
   -------------------------------------------------------------------------- */
function initInteractiveLeaderboard() {
  const submitBtn = document.getElementById('submit-project-btn');
  const resetBtn = document.getElementById('reset-demo-btn');
  const submitBtnText = document.getElementById('submit-btn-text');
  const simulationToast = document.getElementById('simulation-toast');
  const simulationMsg = document.getElementById('simulation-msg');
  const rewardBanner = document.getElementById('reward-unlocked-banner');

  const userStatusBox = document.getElementById('user-status-box');
  const userCurrentRank = document.getElementById('user-current-rank');
  const userMetaText = document.getElementById('user-meta-text');

  const dynamicUserRow = document.getElementById('dynamic-user-row');
  const userRowBadge = document.getElementById('user-row-badge');
  const userVerifiedBadge = document.getElementById('user-verified-badge');
  const userScoreBadge = document.getElementById('user-score-badge');

  const rowNeha = document.getElementById('row-neha');
  const badgeNeha = document.getElementById('badge-neha');
  const rowAnanya = document.getElementById('row-ananya');
  const badgeAnanya = document.getElementById('badge-ananya');

  const leaderboardRows = document.getElementById('leaderboard-rows');

  if (!submitBtn || !dynamicUserRow) return;

  let isSubmitted = false;

  submitBtn.addEventListener('click', () => {
    if (isSubmitted) return;
    isSubmitted = true;

    // Phase 1: Disable button & show simulation
    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.7';
    simulationToast.style.display = 'flex';
    simulationMsg.textContent = 'Uploading project repo & test suite deliverables...';

    // Phase 2: Reviewer matching simulation
    setTimeout(() => {
      simulationMsg.textContent = 'Matching with Lead Industry Reviewer (FinTech SDE-3)...';
    }, 700);

    // Phase 3: Rubric evaluation simulation
    setTimeout(() => {
      simulationMsg.textContent = 'Scoring rubrics: Architecture 96/100, Security 93/100, Reliability 94/100...';
    }, 1400);

    // Phase 4: Final calculation & Leaderboard update
    setTimeout(() => {
      simulationToast.style.display = 'none';

      // Reorder rows: Move Aarav Sharma (dynamicUserRow) right before Neha Sundaram
      if (leaderboardRows && rowNeha) {
        leaderboardRows.insertBefore(dynamicUserRow, rowNeha);
      }

      // Update Aarav Sharma row to Rank #3
      userRowBadge.textContent = '#3';
      userRowBadge.className = 'rank-badge rank-3';

      userVerifiedBadge.className = 'verified-tag';
      userVerifiedBadge.innerHTML = `
        <svg viewBox="0 0 16 16" width="12" height="12" fill="currentColor">
          <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
        </svg>
        Verified by Lead Engineer @ FinTech
      `;

      userScoreBadge.textContent = '94/100';
      userScoreBadge.className = 'score-pill score-high';

      dynamicUserRow.classList.remove('user-row-dormant');
      dynamicUserRow.classList.add('user-row-promoted');

      // Update Neha Sundaram to Rank #4
      if (badgeNeha) {
        badgeNeha.textContent = '#4';
        badgeNeha.className = 'rank-badge rank-default';
      }

      // Update Ananya Iyer to Rank #5
      if (badgeAnanya) {
        badgeAnanya.textContent = '#5';
        badgeAnanya.className = 'rank-badge rank-default';
      }

      // Update User Status Card
      userStatusBox.classList.add('state-promoted');
      userCurrentRank.textContent = '#3';
      userCurrentRank.classList.add('promoted');
      userMetaText.innerHTML = 'Project status: <span class="status-state text-success">Verified • Top 2% Nationwide Rank</span>';

      // Reveal Rewards Unlocked Card
      rewardBanner.style.display = 'flex';

      // Update Button State
      submitBtn.disabled = true;
      submitBtn.style.opacity = '1';
      submitBtn.classList.remove('btn-accent');
      submitBtn.classList.add('btn-primary');
      submitBtnText.textContent = 'Project Verified & Ranked (Score 94)';

      // Show Reset Demo button
      resetBtn.style.display = 'inline-block';
    }, 2100);
  });

  // Reset Demo to initial state
  resetBtn.addEventListener('click', () => {
    isSubmitted = false;

    // Reset rows order: Move Aarav Sharma back to bottom of table
    if (leaderboardRows && rowAnanya) {
      leaderboardRows.appendChild(dynamicUserRow);
    }

    // Reset user row
    userRowBadge.textContent = '#42';
    userRowBadge.className = 'rank-badge rank-default';
    userVerifiedBadge.className = 'verified-tag tag-pending';
    userVerifiedBadge.textContent = 'Pending Project Submission';
    userScoreBadge.textContent = '61/100';
    userScoreBadge.className = 'score-pill score-pending';

    dynamicUserRow.classList.remove('user-row-promoted');
    dynamicUserRow.classList.add('user-row-dormant');

    // Reset Neha to #3
    if (badgeNeha) {
      badgeNeha.textContent = '#3';
      badgeNeha.className = 'rank-badge rank-3';
    }

    // Reset Ananya to #4
    if (badgeAnanya) {
      badgeAnanya.textContent = '#4';
      badgeAnanya.className = 'rank-badge rank-default';
    }

    // Reset user status card
    userStatusBox.classList.remove('state-promoted');
    userCurrentRank.textContent = '#42';
    userCurrentRank.classList.remove('promoted');
    userMetaText.innerHTML = 'Project status: <span class="status-state text-warning">Draft brief ready for review</span>';

    // Hide rewards and reset button
    rewardBanner.style.display = 'none';
    resetBtn.style.display = 'none';

    // Reset submit button
    submitBtn.disabled = false;
    submitBtn.style.opacity = '1';
    submitBtn.classList.remove('btn-primary');
    submitBtn.classList.add('btn-accent');
    submitBtnText.textContent = 'Submit project for pro review';
  });
}

/* --------------------------------------------------------------------------
   4. Color Swatches Click-to-Copy
   -------------------------------------------------------------------------- */
function initColorSwatchCopy() {
  const swatchCards = document.querySelectorAll('.swatch-card');
  const copyToast = document.getElementById('copy-toast');
  if (!swatchCards.length || !copyToast) return;

  swatchCards.forEach(card => {
    card.addEventListener('click', () => {
      const hex = card.getAttribute('data-copy');
      if (!hex) return;

      navigator.clipboard.writeText(hex).then(() => {
        copyToast.textContent = `Copied ${hex} to clipboard!`;
        copyToast.classList.add('show');
        setTimeout(() => {
          copyToast.classList.remove('show');
        }, 2200);
      }).catch(() => {
        copyToast.textContent = `Hex: ${hex}`;
        copyToast.classList.add('show');
        setTimeout(() => {
          copyToast.classList.remove('show');
        }, 2200);
      });
    });
  });
}

/* --------------------------------------------------------------------------
   5. Pilot Registration Form Validation
   -------------------------------------------------------------------------- */
function initPilotForm() {
  const form = document.getElementById('pilot-registration-form');
  const successBox = document.getElementById('form-success-box');
  if (!form || !successBox) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameInput = document.getElementById('student-name');
    const emailInput = document.getElementById('student-email');
    const degreeSelect = document.getElementById('student-degree');
    const yearSelect = document.getElementById('student-year');
    const collegeInput = document.getElementById('student-college');

    let isValid = true;

    // Simple email regex validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!nameInput.value.trim()) {
      document.getElementById('name-error').style.display = 'block';
      nameInput.focus();
      isValid = false;
    } else {
      document.getElementById('name-error').style.display = 'none';
    }

    if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
      document.getElementById('email-error').style.display = 'block';
      if (isValid) emailInput.focus();
      isValid = false;
    } else {
      document.getElementById('email-error').style.display = 'none';
    }

    if (!degreeSelect.value || !yearSelect.value || !collegeInput.value.trim()) {
      isValid = false;
    }

    if (isValid) {
      // Simulate successful submission
      form.querySelector('button[type="submit"]').style.display = 'none';
      successBox.style.display = 'block';

      // Log submitted data cleanly
      console.log('Plus Skills Pilot Application Submitted:', {
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        degree: degreeSelect.value,
        year: yearSelect.value,
        college: collegeInput.value.trim(),
        timestamp: new Date().toISOString()
      });
    }
  });
}

/* --------------------------------------------------------------------------
   6. Student Survey Modal (# Placeholder)
   -------------------------------------------------------------------------- */
function initSurveyModal() {
  const openSurveyBtn = document.getElementById('open-survey-btn');
  const modal = document.getElementById('survey-modal');
  const closeBtn = document.getElementById('close-modal-btn');
  const dismissBtn = document.getElementById('dismiss-modal-btn');

  if (!openSurveyBtn || !modal) return;

  function openModal(e) {
    e.preventDefault();
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
    if (closeBtn) closeBtn.focus();
  }

  function closeModal() {
    modal.hidden = true;
    document.body.style.overflow = '';
    openSurveyBtn.focus();
  }

  openSurveyBtn.addEventListener('click', openModal);

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (dismissBtn) dismissBtn.addEventListener('click', closeModal);

  // Close when clicking modal backdrop
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.hidden) {
      closeModal();
    }
  });
}
