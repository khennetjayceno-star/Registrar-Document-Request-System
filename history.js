// ── Claims ──
async function loadClaimsData() {
  const tbody = document.getElementById('claims-table-body');
  tbody.innerHTML = '<tr><td colspan="7" style="color:var(--gray);text-align:center;padding:20px;">Loading…</td></tr>';
  const { data } = await db.from('registrar_requests').select('*').eq('status', 'Claimed').order('created_at', { ascending: false });
  if (!data || !data.length) { tbody.innerHTML = '<tr><td colspan="7" style="color:var(--gray);text-align:center;padding:20px;">No claimed records.</td></tr>'; return; }
  tbody.innerHTML = data.map(r => `<tr>
    <td style="font-family:monospace;font-size:0.78rem;color:var(--gold);">${escHtml(r.req_id||r.id)}</td>
    <td>${escHtml((r.title||'')+' '+(r.family_name||'')+', '+(r.first_name||''))}</td>
    <td style="font-size:0.8rem;">${escHtml(r.email||'—')}</td>
    <td style="font-size:0.8rem;max-width:180px;">${escHtml(r.document_names||r.documents||'—')}</td>
    <td><span class="claim-badge badge-claimed">✓ Claimed</span></td>
    <td style="font-size:0.78rem;">${fmtDate(r.created_at)}</td>
    <td><button class="btn-danger" onclick="deleteRequest('${r.req_id||r.id}')">Delete</button></td>
  </tr>`).join('');
}

async function clearAllClaims() {
  if (!confirm('Delete ALL claimed records? Cannot be undone.')) return;
  await db.from('registrar_requests').delete().eq('status', 'Claimed');
  loadClaimsData();
}
