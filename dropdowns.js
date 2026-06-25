// ── Auth ──
async function studentLogin() {
  const email  = document.getElementById('student-email').value.trim().toLowerCase();
  const msgEl  = document.getElementById('login-msg');
  const spinner = document.getElementById('login-spinner');
  if (!email || !isValidEmail(email)) { showMsg(msgEl, 'error', 'Please enter a valid email address.'); return; }
  spinner.style.display = 'inline-block';

  // Upsert: insert if not exists, or just fetch
  const { data: existing } = await db.from('registrar_users').select('*').eq('email', email).single();
  if (!existing) {
    const { error: insertErr } = await db.from('registrar_users').insert([{ email, created_at: new Date().toISOString() }]);
    if (insertErr && !insertErr.message.includes('duplicate')) {
      spinner.style.display = 'none';
      showMsg(msgEl, 'error', 'Could not create account: ' + insertErr.message);
      return;
    }
  }

  const { data: user } = await db.from('registrar_users').select('*').eq('email', email).single();
  spinner.style.display = 'none';
  if (!user) { showMsg(msgEl, 'error', 'Login failed. Please try again.'); return; }

  currentUser = user;
  document.getElementById('header-email').textContent = user.email;
  document.getElementById('header-user-info').style.display = 'block';
  document.getElementById('main-nav').style.display = 'flex';
  document.getElementById('portal-email-display').textContent = 'Logged in as: ' + user.email;
  showPage('portal');
}

function doLogout() {
  currentUser = null;
  document.getElementById('header-user-info').style.display = 'none';
  document.getElementById('main-nav').style.display = 'none';
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('page-login').classList.add('active');
  document.getElementById('student-email').value = '';
  document.getElementById('login-msg').innerHTML = '';
}

function isValidEmail(e) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e); }
