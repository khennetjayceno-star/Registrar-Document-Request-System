// ── Users ──
async function loadUsers() {
  const tbody = document.getElementById('admin-users-body');
  tbody.innerHTML = '<tr><td colspan="3" style="color:var(--gray);text-align:center;padding:20px;">Loading…</td></tr>';
  const { data: users } = await db.from('registrar_users').select('*').order('created_at', { ascending: false });
  if (!users || !users.length) { tbody.innerHTML = '<tr><td colspan="3" style="color:var(--gray);text-align:center;padding:20px;">No users yet.</td></tr>'; return; }
  const { data: reqs } = await db.from('registrar_requests').select('email');
  const reqCount = {};
  (reqs || []).forEach(r => { reqCount[r.email] = (reqCount[r.email] || 0) + 1; });
  tbody.innerHTML = users.map(u => `<tr>
    <td>${escHtml(u.email)}</td>
    <td style="font-size:0.8rem;">${fmtDate(u.created_at)}</td>
    <td><span class="badge badge-blue">${reqCount[u.email] || 0} requests</span></td>
  </tr>`).join('');
}
