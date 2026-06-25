// ── File handlers ──
function handleAuthUpload(e) {
  const file = e.target.files[0];
  if (!file) return;
  const rd = new FileReader();
  rd.onload = ev => {
    authFileBase64 = ev.target.result;
    document.getElementById('auth-upload-area').classList.add('has-file');
    const nm = document.getElementById('auth-file-name');
    nm.textContent = '✅ ' + file.name; nm.style.display = 'block';
  };
  rd.readAsDataURL(file);
}

function handlePaymentUpload(e) {
  const file = e.target.files[0];
  if (!file) return;
  const rd = new FileReader();
  rd.onload = ev => {
    paymentFileBase64 = ev.target.result;
    document.getElementById('payment-upload-area').classList.add('has-file');
    const nm = document.getElementById('payment-file-name');
    nm.textContent = '✅ ' + file.name; nm.style.display = 'block';
  };
  rd.readAsDataURL(file);
}
