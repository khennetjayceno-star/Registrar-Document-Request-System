// ── Submit Request ──
async function submitRequest() {
  const msgEl   = document.getElementById('req-msg');
  const spinner = document.getElementById('req-spinner');

  const titleVal = document.querySelector('input[name="title"]:checked')?.value || '';
  const fName    = document.getElementById('req-fname').value.trim();
  const gName    = document.getElementById('req-given').value.trim();
  const mName    = document.getElementById('req-mname').value.trim();
  const course   = document.getElementById('req-course').value.trim();
  const phone    = document.getElementById('req-phone').value.trim();
  const purpose  = document.getElementById('req-purpose').value.trim();
  const repName  = document.getElementById('req-rep-name').value.trim();
  const docCodes = Object.keys(selectedDocs);
  const ayList   = Object.keys(selectedAYs);

  if (!fName || !gName) { showMsg(msgEl, 'error', 'Family Name and First Name are required.'); return; }
  if (!course)           { showMsg(msgEl, 'error', 'Please enter your last course/program.'); return; }
  if (!phone)            { showMsg(msgEl, 'error', 'Cellphone number is required.'); return; }
  if (!purpose)          { showMsg(msgEl, 'error', 'Please state the purpose of your request.'); return; }
  if (!ayList.length)    { showMsg(msgEl, 'error', 'Please select at least one academic year.'); return; }
  if (!docCodes.length)  { showMsg(msgEl, 'error', 'Please select at least one document.'); return; }
  if (!paymentFileBase64){ showMsg(msgEl, 'error', 'Please upload proof of payment.'); return; }

  spinner.style.display = 'inline-block';

  const docNames = docCodes.map(c => DOCUMENTS.find(d => d.code === c)?.name || c).join(', ');
  let total = 0;
  docCodes.forEach(c => { const d = DOCUMENTS.find(x => x.code === c); if (d) total += d.price; });

  const dueDate = new Date();
  dueDate.setDate(dueDate.getDate() + 5);
  const dueDateStr = dueDate.toLocaleDateString('en-PH', { year: 'numeric', month: 'long', day: 'numeric' });

  const reqId = 'REQ-' + Date.now().toString(36).toUpperCase();

  // Determine claim window summary
  const byWindow = getClaimWindows(docCodes);
  const windowSummary = Object.keys(byWindow).sort().map(w => 'Window ' + w).join(', ');

  const claimStub = {
    id:        reqId,
    title:     titleVal,
    family_name: fName,
    first_name:  gName,
    middle_name: mName,
    documents:   docCodes,
    document_names: docNames,
    academic_years: ayList.join(', '),
    total_amount: total,
    claim_window: windowSummary,
    due_date:    dueDateStr,
    email:       currentUser.email,
    purpose,
    phone,
    course,
    rep_name:    repName || null,
    payment_proof: paymentFileBase64,
    auth_file:   authFileBase64 || null,
    status:      'Pending',
    created_at:  new Date().toISOString()
  };

  const { error: dbErr } = await db.from('registrar_requests').insert([{
    req_id:      reqId,
    email:       currentUser.email,
    title:       titleVal,
    family_name: fName,
    first_name:  gName,
    middle_name: mName,
    course,
    phone,
    purpose,
    rep_name:    repName || null,
    documents:   docCodes.join(', '),
    document_names: docNames,
    academic_years: ayList.join(', '),
    total_amount: total,
    due_date:    dueDateStr,
    claim_window: windowSummary,
    status:      'Pending',
    qr_data:     JSON.stringify(claimStub),
    created_at:  new Date().toISOString()
  }]);

  if (dbErr) {
    spinner.style.display = 'none';
    showMsg(msgEl, 'error', 'Submission failed: ' + dbErr.message);
    return;
  }

  spinner.style.display = 'none';
  showQRModal(claimStub);
  resetRequestForm();
}

function resetRequestForm() {
  document.querySelectorAll('input[name="title"]').forEach(r => r.checked = false);
  ['req-fname','req-given','req-mname','req-course','req-phone','req-purpose','req-rep-name'].forEach(id => document.getElementById(id).value = '');
  // Reset doc dropdown
  selectedDocs = {};
  document.querySelectorAll('#doc-options .cb-option').forEach(o => o.classList.remove('selected'));
  document.querySelectorAll('#doc-options input[type=checkbox]').forEach(c => c.checked = false);
  renderDocTags();
  updateTotal();
  // Reset AY dropdown
  selectedAYs = {};
  document.querySelectorAll('#ay-options .cb-option').forEach(o => o.classList.remove('selected'));
  document.querySelectorAll('#ay-options input[type=checkbox]').forEach(c => c.checked = false);
  renderAYTags();
  updateAYTrigger();
  authFileBase64 = null; paymentFileBase64 = null;
  ['auth-upload-area','payment-upload-area'].forEach(id => document.getElementById(id).classList.remove('has-file'));
  ['auth-file-name','payment-file-name'].forEach(id => { const el = document.getElementById(id); el.textContent=''; el.style.display='none'; });
  document.getElementById('req-msg').innerHTML = '';
}
