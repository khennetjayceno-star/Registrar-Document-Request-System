// ── Auth ──
async function adminLogin() {
  const username = document.getElementById('admin-username').value.trim();
  const password = document.getElementById('admin-password').value;
  const msgEl    = document.getElementById('login-msg');
  const spinner  = document.getElementById('login-spinner');
  if (!username || !password) { showMsg(msgEl, 'error', 'Enter username and password.'); return; }
  spinner.style.display = 'inline-block';
  const { data } = await db.from('admins').select('*').eq('username', username).eq('password_hash', password).single();
  spinner.style.display = 'none';
  if (!data) { showMsg(msgEl, 'error', 'Invalid username or password.'); return; }
  currentAdmin = data;
  document.getElementById('header-username').textContent = username;
  document.getElementById('header-user-info').style.display = 'block';
  document.getElementById('main-nav').style.display = 'flex';
  showPage('admin');
  loadAdminRequests();
  loadStats();
}

function doLogout() {
  currentAdmin = null;
  stopCamera();
  document.getElementById('header-user-info').style.display = 'none';
  document.getElementById('main-nav').style.display = 'none';
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('page-login').classList.add('active');
}
