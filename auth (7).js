// ── Page & section routing ──
function showPage(name) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('nav button').forEach(b => b.classList.remove('active'));
  const pg = document.getElementById('page-' + name);
  if (pg) pg.classList.add('active');
  const nb = document.getElementById('nav-' + name);
  if (nb) nb.classList.add('active');
}

function showAdminSec(sec) {
  document.querySelectorAll('.admin-section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));
  document.getElementById('asec-' + sec)?.classList.add('active');
  event.target.classList.add('active');
  if (sec === 'requests') loadAdminRequests();
  if (sec === 'claims')   loadClaimsData();
  if (sec === 'users')    loadUsers();
  if (sec === 'admins')   loadAdminAdmins();
}
