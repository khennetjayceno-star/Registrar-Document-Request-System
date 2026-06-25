// ── Init ──
loadLogo();
buildDocDropdown();
buildAYDropdown();

document.addEventListener('keydown', e => {
  if (e.key === 'Enter' && document.getElementById('page-login').classList.contains('active')) studentLogin();
});
