// ── Stats ──
async function loadStats() {
  const { data } = await db.from('registrar_requests').select('status');
  if (!data) return;
  document.getElementById('stat-total').textContent     = data.length;
  document.getElementById('stat-pending').textContent   = data.filter(r => r.status === 'Pending').length;
  document.getElementById('stat-processing').textContent= data.filter(r => r.status === 'Processing').length;
  document.getElementById('stat-done').textContent      = data.filter(r => r.status === 'Ready').length;
  document.getElementById('stat-claimed').textContent   = data.filter(r => r.status === 'Claimed').length;
}
