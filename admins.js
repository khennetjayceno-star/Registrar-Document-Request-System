// ── Load logo ──
function loadLogo() {
  const src = 'UB_LOGO.jpg';
  [document.getElementById('header-logo'), document.getElementById('login-logo')].forEach(img => {
    if (img) { img.src = src; img.onerror = () => { img.style.display = 'none'; }; }
  });
}
