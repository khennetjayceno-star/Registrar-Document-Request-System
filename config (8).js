// ── Init ──
loadLogo();
document.addEventListener('keydown', e => {
  if (e.key === 'Enter' && document.getElementById('page-login').classList.contains('active')) adminLogin();
});
