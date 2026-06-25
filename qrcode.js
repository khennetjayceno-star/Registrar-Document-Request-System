// ── QR Code Modal ──
function showQRModal(stub) {
  const displayEl = document.getElementById('student-qr-display');
  displayEl.innerHTML = '';
  const qrText = JSON.stringify({
    id: stub.id,
    name: `${stub.title} ${stub.family_name}, ${stub.first_name} ${stub.middle_name}`,
    docs: stub.document_names,
    window: stub.claim_window,
    due: stub.due_date,
    total: '₱' + stub.total_amount
  });
  new QRCode(displayEl, { text: qrText, width: 220, height: 220, correctLevel: QRCode.CorrectLevel.H, colorDark: '#0B2F6E', colorLight: '#FFFFFF' });

  document.getElementById('student-qr-info').innerHTML = `
    <div class="stub-row"><span class="stub-label">Request ID</span><span class="stub-val" style="font-family:monospace;">${escHtml(stub.id)}</span></div>
    <div class="stub-row"><span class="stub-label">Name</span><span class="stub-val">${escHtml(stub.title + ' ' + stub.family_name + ', ' + stub.first_name + ' ' + stub.middle_name)}</span></div>
    <div class="stub-row"><span class="stub-label">Document(s)</span><span class="stub-val">${escHtml(stub.document_names)}</span></div>
    ${stub.academic_years ? `<div class="stub-row"><span class="stub-label">Academic Year(s)</span><span class="stub-val">${escHtml(stub.academic_years)}</span></div>` : ''}
    <div class="stub-row"><span class="stub-label">Total Amount</span><span class="stub-val" style="color:var(--red);">₱${stub.total_amount.toLocaleString()}</span></div>
    <div class="stub-row"><span class="stub-label">Due Date</span><span class="stub-val">${escHtml(stub.due_date)}</span></div>`;

  // Render claim window info
  const winEl = document.getElementById('claim-window-info');
  if (stub.documents && stub.documents.length) {
    winEl.innerHTML = renderClaimWindowInfo(stub.documents);
  } else {
    winEl.innerHTML = `<div class="stub-row"><span class="stub-label">Claim At</span><span class="stub-val">${escHtml(stub.claim_window)}</span></div>`;
  }

  document.getElementById('qr-display-modal').classList.add('open');
}

async function viewQRById(reqId) {
  const { data } = await db.from('registrar_requests').select('*').eq('req_id', reqId).single();
  if (!data || !data.qr_data) { alert('QR not available.'); return; }
  const stub = JSON.parse(data.qr_data);
  showQRModal(stub);
}
