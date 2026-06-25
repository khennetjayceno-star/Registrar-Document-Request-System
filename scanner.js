// ── QR Scanner ──
function setMode(mode) {
  scanMode = mode;
  document.querySelectorAll('.mode-tab').forEach(t => t.classList.remove('active'));
  document.getElementById('tab-' + mode).classList.add('active');
  ['mode-scan','mode-upload','mode-manual'].forEach(id => document.getElementById(id).style.display = 'none');
  document.getElementById('mode-' + mode).style.display = 'block';
  if (mode !== 'scan') stopCamera();
  document.getElementById('scanner-result').style.display = 'none';
}

async function startCamera() {
  const video = document.getElementById('qr-video');
  const canvas = document.getElementById('qr-canvas');
  try {
    videoStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
    video.srcObject = videoStream;
    video.style.display = 'block';
    document.getElementById('scanner-status-box').style.display = 'none';
    document.getElementById('start-scan-btn').style.display = 'none';
    document.getElementById('stop-scan-btn').style.display = 'inline-block';
    scanInterval = setInterval(() => {
      if (video.readyState === video.HAVE_ENOUGH_DATA) {
        canvas.width = video.videoWidth; canvas.height = video.videoHeight;
        canvas.getContext('2d').drawImage(video, 0, 0);
        const img = canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(img.data, img.width, img.height, { inversionAttempts: 'dontInvert' });
        if (code) { stopCamera(); processQRData(code.data); }
      }
    }, 200);
  } catch(e) {
    alert('Camera access denied or not available: ' + e.message);
  }
}

function stopCamera() {
  if (videoStream) { videoStream.getTracks().forEach(t => t.stop()); videoStream = null; }
  if (scanInterval) { clearInterval(scanInterval); scanInterval = null; }
  const video = document.getElementById('qr-video');
  if (video) video.style.display = 'none';
  const box = document.getElementById('scanner-status-box');
  if (box) box.style.display = 'block';
  const startBtn = document.getElementById('start-scan-btn');
  if (startBtn) startBtn.style.display = 'inline-block';
  const stopBtn = document.getElementById('stop-scan-btn');
  if (stopBtn) stopBtn.style.display = 'none';
}

function scanQRFromFile(e) {
  const file = e.target.files[0];
  if (!file) return;
  const img = new Image();
  const url = URL.createObjectURL(file);
  img.onload = () => {
    const canvas = document.createElement('canvas');
    canvas.width = img.width; canvas.height = img.height;
    canvas.getContext('2d').drawImage(img, 0, 0);
    const imgData = canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height);
    const code = jsQR(imgData.data, imgData.width, imgData.height);
    URL.revokeObjectURL(url);
    if (code) processQRData(code.data);
    else { const r = document.getElementById('scanner-result'); r.style.display='block'; r.innerHTML='<div class="msg error">Could not read QR code from image. Try a clearer photo.</div>'; }
  };
  img.src = url;
}

async function lookupByManualId() {
  const reqId = document.getElementById('manual-req-id').value.trim();
  if (!reqId) return;
  const { data } = await db.from('registrar_requests').select('*').eq('req_id', reqId).single();
  if (!data) { const r = document.getElementById('scanner-result'); r.style.display='block'; r.innerHTML='<div class="msg error">Request ID not found.</div>'; return; }
  if (data.qr_data) processQRData(data.qr_data);
  else showScanResult(data);
}

async function processQRData(rawData) {
  let stub = null;
  try { stub = JSON.parse(rawData); } catch(e) { stub = { id: rawData }; }
  const reqId = stub.id || stub.req_id || rawData;
  const { data } = await db.from('registrar_requests').select('*').eq('req_id', reqId).single();
  if (data) showScanResult(data);
  else {
    // Show raw stub info
    const r = document.getElementById('scanner-result');
    r.style.display = 'block';
    r.innerHTML = `<div class="scanner-card" style="background:var(--success-bg);border-color:#BBF7D0;">
      <div style="font-family:'Cinzel',serif;color:var(--success);margin-bottom:12px;">✅ QR Code Scanned</div>
      <pre style="font-size:0.78rem;background:white;padding:12px;border-radius:6px;overflow:auto;">${escHtml(JSON.stringify(stub,null,2))}</pre>
    </div>`;
  }
}

function showScanResult(data) {
  const html = `
    <div class="stub-row"><span class="stub-label">Request ID</span><span class="stub-val" style="font-family:monospace;">${escHtml(data.req_id||data.id)}</span></div>
    <div class="stub-row"><span class="stub-label">Name</span><span class="stub-val">${escHtml((data.title||'')+' '+(data.family_name||'')+', '+(data.first_name||'')+' '+(data.middle_name||''))}</span></div>
    <div class="stub-row"><span class="stub-label">Email</span><span class="stub-val">${escHtml(data.email||'—')}</span></div>
    <div class="stub-row"><span class="stub-label">Documents</span><span class="stub-val">${escHtml(data.document_names||data.documents||'—')}</span></div>
    <div class="stub-row"><span class="stub-label">Total</span><span class="stub-val" style="color:var(--red);">₱${(data.total_amount||0).toLocaleString()}</span></div>
    <div class="stub-row"><span class="stub-label">Claim Window</span><span class="stub-val">${escHtml(data.claim_window||'Window 1')}</span></div>
    <div class="stub-row"><span class="stub-label">Due Date</span><span class="stub-val">${escHtml(data.due_date||'—')}</span></div>
    <div class="stub-row"><span class="stub-label">Status</span><span class="stub-val"><span class="badge ${statusBadge(data.status)}">${data.status}</span></span></div>`;

  document.getElementById('scan-stub-display').innerHTML = html;
  document.getElementById('scan-action-btns').innerHTML = `
    <button class="btn-claim" onclick="markClaimed('${escHtml(data.req_id||data.id)}');closeModal('scan-result-modal')">✓ Mark as Claimed</button>
    <button class="btn-edit" onclick="openStatusModal('${escHtml(data.req_id||data.id)}','${data.status}');closeModal('scan-result-modal')">Update Status</button>
    <button class="btn-blue" onclick="openReqDetail('${escHtml(data.req_id||data.id)}');closeModal('scan-result-modal')">Full Details</button>`;
  openModal('scan-result-modal');
}
