// ── Requests ──
async function loadAdminRequests() {
  const tbody  = document.getElementById('admin-requests-body');
  const filter = document.getElementById('req-status-filter')?.value || '';
  tbody.innerHTML = '<tr><td colspan="8" style="color:var(--gray);text-align:center;padding:20px;">Loading…</td></tr>';
  let q = db.from('registrar_requests').select('*').order('created_at', { ascending: false });
  if (filter) q = q.eq('status', filter);
  const { data, error } = await q;
  if (error || !data || !data.length) { tbody.innerHTML = '<tr><td colspan="8" style="color:var(--gray);text-align:center;padding:28px;">No requests found.</td></tr>'; return; }
  tbody.innerHTML = data.map(r => `<tr>
    <td style="font-family:monospace;font-size:0.78rem;color:var(--gold);">${escHtml(r.req_id || r.id || '')}</td>
    <td style="font-size:0.85rem;white-space:nowrap;">${escHtml((r.title||'')+' '+(r.family_name||'')+', '+(r.first_name||''))}</td>
    <td style="font-size:0.8rem;">${escHtml(r.email || '—')}</td>
    <td style="font-size:0.8rem;max-width:180px;">${escHtml(r.document_names || r.documents || '—')}</td>
    <td style="font-size:0.85rem;color:var(--red);font-weight:600;">₱${(r.total_amount||0).toLocaleString()}</td>
    <td><span class="badge ${statusBadge(r.status)}">${r.status}</span></td>
    <td style="font-size:0.78rem;white-space:nowrap;">${fmtDate(r.created_at)}</td>
    <td style="white-space:nowrap;">
      <button class="btn-edit" onclick="openReqDetail('${r.req_id || r.id}')">View</button>
      <button class="btn-edit" style="margin-right:4px;" onclick="openStatusModal('${r.req_id || r.id}','${r.status}')">Status</button>
      <button class="btn-claim" onclick="markClaimed('${r.req_id || r.id}')">✓ Claimed</button>
      <button class="btn-danger" onclick="deleteRequest('${r.req_id || r.id}')">Del</button>
    </td>
  </tr>`).join('');
}

function statusBadge(s) {
  if (s === 'Pending') return 'badge-red';
  if (s === 'Processing') return 'badge-gold';
  if (s === 'Ready') return 'badge-green';
  if (s === 'Claimed') return 'badge-blue';
  return 'badge-gold';
}

async function openReqDetail(reqId) {
  const { data } = await db.from('registrar_requests').select('*').eq('req_id', reqId).single();
  if (!data) { alert('Record not found.'); return; }
  document.getElementById('req-detail-title').textContent = 'Request — ' + reqId;
  let html = `
    <div class="stub-box">
      <div class="stub-row"><span class="stub-label">Request ID</span><span class="stub-val" style="font-family:monospace;">${escHtml(data.req_id||data.id)}</span></div>
      <div class="stub-row"><span class="stub-label">Name</span><span class="stub-val">${escHtml((data.title||'')+' '+(data.family_name||'')+', '+(data.first_name||'')+' '+(data.middle_name||''))}</span></div>
      <div class="stub-row"><span class="stub-label">Email</span><span class="stub-val">${escHtml(data.email||'—')}</span></div>
      <div class="stub-row"><span class="stub-label">Course</span><span class="stub-val">${escHtml(data.course||'—')}</span></div>
      <div class="stub-row"><span class="stub-label">Phone</span><span class="stub-val">${escHtml(data.phone||'—')}</span></div>
      <div class="stub-row"><span class="stub-label">Purpose</span><span class="stub-val">${escHtml(data.purpose||'—')}</span></div>
      <div class="stub-row"><span class="stub-label">Documents</span><span class="stub-val">${escHtml(data.document_names||data.documents||'—')}</span></div>
      <div class="stub-row"><span class="stub-label">Total Amount</span><span class="stub-val" style="color:var(--red);">₱${(data.total_amount||0).toLocaleString()}</span></div>
      <div class="stub-row"><span class="stub-label">Authorized Rep</span><span class="stub-val">${escHtml(data.rep_name||'(None – owner requesting)')}</span></div>
      <div class="stub-row"><span class="stub-label">Claim Window</span><span class="stub-val">${escHtml(data.claim_window||'Window 1')}</span></div>
      <div class="stub-row"><span class="stub-label">Due Date</span><span class="stub-val">${escHtml(data.due_date||'—')}</span></div>
      <div class="stub-row"><span class="stub-label">Status</span><span class="stub-val"><span class="badge ${statusBadge(data.status)}">${data.status}</span></span></div>
      <div class="stub-row"><span class="stub-label">Submitted</span><span class="stub-val">${fmtDate(data.created_at)}</span></div>
    </div>`;

  // Proof of payment (stored in qr_data)
  if (data.qr_data) {
    try {
      const stub = JSON.parse(data.qr_data);
      if (stub.payment_proof) {
        html += `<div style="margin-bottom:14px;"><div class="section-title" style="margin-bottom:8px;">Proof of Payment</div><img class="proof-img" src="${stub.payment_proof}" alt="Payment proof"></div>`;
      }
      if (stub.auth_file) {
        html += `<div style="margin-bottom:14px;"><div class="section-title" style="margin-bottom:8px;">Authorization File</div><img class="proof-img" src="${stub.auth_file}" alt="Authorization"></div>`;
      }
    } catch(e) {}
  }

  html += `<div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:14px;">
    <button class="btn-edit" onclick="openStatusModal('${escHtml(data.req_id||data.id)}','${data.status}');closeModal('req-detail-modal')">Update Status</button>
    <button class="btn-claim" onclick="markClaimed('${escHtml(data.req_id||data.id)}');closeModal('req-detail-modal')">✓ Mark Claimed</button>
  </div>`;

  document.getElementById('req-detail-body').innerHTML = html;
  openModal('req-detail-modal');
}

function openStatusModal(reqId, currentStatus) {
  currentStatusReqId = reqId;
  document.getElementById('status-req-id').textContent = reqId;
  document.getElementById('status-select').value = currentStatus;
  document.getElementById('status-msg').innerHTML = '';
  openModal('status-modal');
}

async function saveStatus() {
  if (!currentStatusReqId) return;
  const newStatus = document.getElementById('status-select').value;
  const msgEl = document.getElementById('status-msg');
  const { error } = await db.from('registrar_requests').update({ status: newStatus }).eq('req_id', currentStatusReqId);
  if (error) { showMsg(msgEl, 'error', error.message); return; }
  showMsg(msgEl, 'success', '✅ Status updated!');
  setTimeout(() => { closeModal('status-modal'); loadAdminRequests(); loadStats(); }, 800);
}

async function markClaimed(reqId) {
  if (!confirm('Mark as Claimed?')) return;
  await db.from('registrar_requests').update({ status: 'Claimed' }).eq('req_id', reqId);
  loadAdminRequests(); loadStats();
}

async function deleteRequest(reqId) {
  if (!confirm('Delete this request? Cannot be undone.')) return;
  await db.from('registrar_requests').delete().eq('req_id', reqId);
  loadAdminRequests(); loadStats();
}
