// ── Load UB logo ──
function loadLogo() {
  // Try to use the uploaded logo via a data URL trick — reference by filename
  // Since we can't embed it at build time, we leave as initials fallback
  const logoSrc = 'UB_LOGO.jpg'; // Place UB_LOGO.jpg in the same folder as this HTML
  [document.getElementById('header-logo'), document.getElementById('login-logo')].forEach(img => {
    if (img) { img.src = logoSrc; img.onerror = () => { img.style.display = 'none'; }; }
  });
}
