<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Registrar Admin — University of Bohol</title>
  <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
  <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/jsqr@1.4.0/dist/jsQR.js"></script>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@700;900&family=Rajdhani:wght@400;500;600;700&family=Barlow:wght@300;400;500&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="styles.css">
</head>
<body>

<!-- HEADER -->
<header>
  <div class="header-left">
    <img class="ub-logo" id="header-logo" src="" alt="UB Logo">
    <div class="brand">
      <div class="brand-main">University of Bohol</div>
      <div class="brand-sub">Registrar's Office</div>
      <div class="brand-full">City of Tagbilaran, Bohol, Philippines</div>
    </div>
  </div>
  <div class="header-right">
    <div id="header-user-info">
      <strong id="header-username"></strong><br>
      <div class="admin-badge">Registrar Admin</div>
    </div>
  </div>
</header>

<!-- NAV -->
<nav id="main-nav">
  <button id="nav-admin" class="active" onclick="showPage('admin')">📊 Dashboard</button>
  <button id="nav-scanner" onclick="showPage('scanner')">📷 QR Scanner</button>
  <button onclick="doLogout()" style="color:var(--red);">⬛ Logout</button>
</nav>

<!-- ════ LOGIN PAGE ════ -->
<div id="page-login" class="page active">
  <div style="display:flex;align-items:center;justify-content:center;padding:60px 20px;min-height:calc(100vh - 80px);">
    <div class="login-card">
      <div class="login-logo-wrap">
        <img class="login-logo" id="login-logo" src="" alt="UB Logo">
      </div>
      <div class="login-title">University of Bohol</div>
      <div class="login-subtitle">Registrar's Office</div>
      <div class="login-fullname">Admin Management Portal</div>
      <div class="login-role-tag">Admin Access Only</div>
      <div class="form-group">
        <label>Username</label>
        <input type="text" id="admin-username" placeholder="Admin username" autocomplete="username">
      </div>
      <div class="form-group">
        <label>Password</label>
        <input type="password" id="admin-password" placeholder="••••••••" autocomplete="current-password">
      </div>
      <div id="login-msg"></div>
      <button class="btn-primary" onclick="adminLogin()">
        <span class="spinner" id="login-spinner" style="display:none;"></span>Login
      </button>
      <div class="student-link-bar" style="margin-top:18px;">
        <a href="ub_registrar_student.html">← Student Portal</a>
      </div>
    </div>
  </div>
</div>

<!-- ════ ADMIN DASHBOARD ════ -->
<div id="page-admin" class="page">
  <div style="padding:40px;">
    <div class="stat-row" id="stat-row">
      <div class="stat-card"><div class="stat-num" id="stat-total">0</div><div class="stat-label">Total Requests</div></div>
      <div class="stat-card" style="border-top-color:var(--red);"><div class="stat-num" style="color:var(--red);" id="stat-pending">0</div><div class="stat-label">Pending</div></div>
      <div class="stat-card" style="border-top-color:var(--gold);"><div class="stat-num" style="color:#8a6d00;" id="stat-processing">0</div><div class="stat-label">Processing</div></div>
      <div class="stat-card" style="border-top-color:var(--success);"><div class="stat-num" style="color:var(--success);" id="stat-done">0</div><div class="stat-label">Ready / Done</div></div>
      <div class="stat-card" style="border-top-color:var(--blue);"><div class="stat-num" id="stat-claimed">0</div><div class="stat-label">Claimed</div></div>
    </div>

    <div class="admin-tabs">
      <button class="admin-tab active" onclick="showAdminSec('requests')">📋 All Requests</button>
      <button class="admin-tab" onclick="showAdminSec('claims')">✅ Claims</button>
      <button class="admin-tab" onclick="showAdminSec('users')">👤 Users</button>
      <button class="admin-tab" onclick="showAdminSec('admins')">🔑 Admins</button>
    </div>

    <!-- REQUESTS SECTION -->
    <div class="admin-section active" id="asec-requests">
      <div class="card-panel">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;flex-wrap:wrap;gap:10px;">
          <div class="section-title" style="margin-bottom:0;">Document Requests</div>
          <select id="req-status-filter" onchange="loadAdminRequests()" style="padding:8px 12px;border:1px solid var(--border);border-radius:7px;font-size:0.85rem;outline:none;">
            <option value="">All</option>
            <option value="Pending">Pending</option>
            <option value="Processing">Processing</option>
            <option value="Ready">Ready</option>
            <option value="Claimed">Claimed</option>
            <option value="Declined">Declined</option>
          </select>
        </div>
        <div style="overflow-x:auto;">
          <table>
            <thead><tr><th>ID</th><th>Name</th><th>Email</th><th>Documents</th><th>Amount</th><th>Status</th><th>Date</th><th>Actions</th></tr></thead>
            <tbody id="admin-requests-body"><tr><td colspan="8" style="color:var(--gray);text-align:center;padding:20px;">Loading…</td></tr></tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- CLAIMS -->
    <div class="admin-section" id="asec-claims">
      <div class="card-panel">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;flex-wrap:wrap;gap:10px;">
          <div class="section-title" style="margin-bottom:0;">Claimed Records</div>
          <button class="btn-danger" onclick="clearAllClaims()">🗑 Clear All</button>
        </div>
        <div style="overflow-x:auto;">
          <table>
            <thead><tr><th>ID</th><th>Name</th><th>Email</th><th>Documents</th><th>Status</th><th>Date</th><th>Actions</th></tr></thead>
            <tbody id="claims-table-body"><tr><td colspan="7" style="color:var(--gray);text-align:center;padding:20px;">Loading…</td></tr></tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- USERS -->
    <div class="admin-section" id="asec-users">
      <div class="card-panel">
        <div class="section-title">Registered Users (Email Logins)</div>
        <div style="overflow-x:auto;">
          <table>
            <thead><tr><th>Email</th><th>Registered</th><th>Requests</th></tr></thead>
            <tbody id="admin-users-body"><tr><td colspan="3" style="color:var(--gray);text-align:center;padding:20px;">Loading…</td></tr></tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- ADMINS -->
    <div class="admin-section" id="asec-admins">
      <div class="card-panel">
        <div class="section-title">Add Admin Account</div>
        <div class="input-row">
          <input id="a-username" placeholder="Username" type="text">
          <input id="a-pw" placeholder="Password" type="text">
          <button class="btn-add" onclick="addAdmin()">+ Add Admin</button>
        </div>
        <div id="add-admin-msg" style="margin-top:8px;"></div>
      </div>
      <div class="card-panel">
        <div class="section-title">Admin Accounts</div>
        <table>
          <thead><tr><th>Username</th><th>Created</th><th>Actions</th></tr></thead>
          <tbody id="admin-admins-body"><tr><td colspan="3" style="color:var(--gray);text-align:center;padding:20px;">Loading…</td></tr></tbody>
        </table>
      </div>
    </div>
  </div>
</div>

<!-- ════ SCANNER PAGE ════ -->
<div id="page-scanner" class="page">
  <div class="scanner-hero">
    <h2>QR Code Scanner</h2>
    <p>Scan a student's claim stub QR code to verify and process their document request.</p>
  </div>
  <div class="scanner-container">
    <div class="scanner-card">
      <div class="mode-tabs">
        <div class="mode-tab active" id="tab-scan" onclick="setMode('scan')">📷 Camera Scan</div>
        <div class="mode-tab" id="tab-upload" onclick="setMode('upload')">🖼 Upload QR Image</div>
        <div class="mode-tab" id="tab-manual" onclick="setMode('manual')">⌨ Manual ID Entry</div>
      </div>

      <!-- Camera mode -->
      <div id="mode-scan">
        <div class="scanner-status-box" id="scanner-status-box">
          <div class="scanner-pulse">📷</div>
          <div id="scanner-status-text">CLICK BUTTON TO START SCANNING</div>
        </div>
        <video id="qr-video" style="display:none;width:100%;max-width:400px;border-radius:8px;margin:0 auto;display:block;" autoplay muted playsinline></video>
        <canvas id="qr-canvas" style="display:none;"></canvas>
        <div style="text-align:center;margin-top:14px;">
          <button class="btn-blue" id="start-scan-btn" onclick="startCamera()">▶ Start Camera</button>
          <button class="btn-sm" id="stop-scan-btn" style="display:none;" onclick="stopCamera()">■ Stop</button>
        </div>
      </div>

      <!-- Upload mode -->
      <div id="mode-upload" style="display:none;">
        <div style="border:2px dashed var(--border);border-radius:8px;padding:28px;text-align:center;cursor:pointer;" onclick="document.getElementById('qr-file-input').click()">
          <div style="font-size:2rem;margin-bottom:8px;">🖼</div>
          <strong>Click to upload QR code image</strong>
          <p style="font-size:0.82rem;color:var(--gray);margin-top:4px;">JPG or PNG of the student's QR code</p>
        </div>
        <input type="file" id="qr-file-input" accept="image/*" style="display:none;" onchange="scanQRFromFile(event)">
      </div>

      <!-- Manual entry -->
      <div id="mode-manual" style="display:none;">
        <div class="form-group">
          <label>Request ID</label>
          <input type="text" id="manual-req-id" placeholder="REQ-XXXXXXXX" style="font-family:monospace;">
        </div>
        <button class="btn-blue" onclick="lookupByManualId()">🔍 Lookup Request</button>
      </div>

      <div id="scanner-result" style="margin-top:20px;display:none;"></div>
    </div>
  </div>
</div>

<!-- ════ MODALS ════ -->

<!-- Request Detail Modal -->
<div id="req-detail-modal" class="modal-overlay">
  <div class="modal">
    <button class="modal-close" onclick="closeModal('req-detail-modal')">✕</button>
    <div class="modal-title" id="req-detail-title">Request Details</div>
    <div id="req-detail-body"></div>
  </div>
</div>

<!-- Status Update Modal -->
<div id="status-modal" class="modal-overlay">
  <div class="modal" style="max-width:380px;">
    <button class="modal-close" onclick="closeModal('status-modal')">✕</button>
    <div class="modal-title">Update Request Status</div>
    <p style="font-size:0.88rem;color:var(--gray);margin-bottom:16px;">Request ID: <strong id="status-req-id"></strong></p>
    <div class="form-group"><label>New Status</label>
      <select id="status-select">
        <option value="Pending">Pending</option>
        <option value="Processing">Processing</option>
        <option value="Ready">Ready for Claiming</option>
        <option value="Claimed">Claimed</option>
        <option value="Declined">Declined</option>
      </select>
    </div>
    <button class="btn-primary" onclick="saveStatus()">Save Status</button>
    <div id="status-msg" style="margin-top:10px;"></div>
  </div>
</div>

<!-- QR Claim Stub Modal (Scanner result) -->
<div id="scan-result-modal" class="modal-overlay">
  <div class="modal" style="max-width:520px;text-align:center;">
    <button class="modal-close" onclick="closeModal('scan-result-modal')">✕</button>
    <div class="modal-title" style="text-align:left;">📋 Claim Stub — Scanned</div>
    <div class="stub-box" id="scan-stub-display" style="text-align:left;"></div>
    <div id="scan-action-btns" style="display:flex;gap:10px;flex-wrap:wrap;justify-content:center;margin-top:14px;"></div>
  </div>
</div>

<script src="src/config.js"></script>
<script src="src/utils.js"></script>
<script src="src/modal.js"></script>
<script src="src/logo.js"></script>
<script src="src/router.js"></script>
<script src="src/auth.js"></script>
<script src="src/stats.js"></script>
<script src="src/requests.js"></script>
<script src="src/claims.js"></script>
<script src="src/users.js"></script>
<script src="src/admins.js"></script>
<script src="src/scanner.js"></script>
<script src="src/main.js"></script>
</body>
</html>
