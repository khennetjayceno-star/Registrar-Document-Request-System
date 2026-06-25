// ── Admins ──
async function addAdmin() {
  const username = document.getElementById('a-username').value.trim();
  const pw = document.getElementById('a-pw').value;
  const msgEl = document.getElementById('add-admin-msg');
  if (!username || !pw) { showMsg(msgEl, 'error', 'Username and password required.'); return; }
  const { error } = await db.from('admins').insert([{ username, password_hash: pw }]);
  if (error) showMsg(msgEl, 'error', error.message);
  else { showMsg(msgEl, 'success', '✅ Admin added!'); document.getElementById('a-username').value=''; document.getElementById('a-pw').value=''; loadAdminAdmins(); }
}

async function loadAdminAdmins() {
  const tbody = document.getElementById('admin-admins-body');
  tbody.innerHTML = '<tr><td colspan="3" style="color:var(--gray);text-align:center;padding:20px;">Loading…</td></tr>';
  const { data } = await db.from('admins').select('*').order('created_at');
  if (!data || !data.length) { tbody.innerHTML = '<tr><td colspan="3" style="color:var(--gray);text-align:center;padding:20px;">No admins found.</td></tr>'; return; }
  tbody.innerHTML = data.map(a => `<tr>
    <td><strong style="color:var(--gold)">${escHtml(a.username)}</strong></td>
    <td>${fmtDate(a.created_at)}</td>
    <td>
      <button class="btn-edit" onclick="promptEditAdmin('${a.id}','${escHtml(a.username)}')">Change PW</button>
      <button class="btn-danger" onclick="deleteAdmin('${a.id}','${escHtml(a.username)}')">Delete</button>
    </td>
  </tr>`).join('');
}

function promptEditAdmin(id, name) {
  const pw = prompt(`New password for "${name}":`);
  if (!pw || !pw.trim()) return;
  db.from('admins').update({ password_hash: pw.trim() }).eq('id', id).then(({ error }) => {
    if (error) alert('Error: ' + error.message);
    else { alert('Password updated!'); loadAdminAdmins(); }
  });
}

async function deleteAdmin(id, name) {
  if (!confirm(`Delete admin "${name}"?`)) return;
  await db.from('admins').delete().eq('id', id);
  loadAdminAdmins();
}
