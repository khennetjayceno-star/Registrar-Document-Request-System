:root {
      --gold: #E8B800; --yellow: #F5C518; --red: #C0152A;
      --blue: #0B2F6E; --blue-mid: #1A4A9A; --blue-light: #EBF0FA;
      --white: #FFFFFF; --off-white: #F5F6F8; --black: #111111;
      --gray: #6B7280; --gray-light: #E5E7EB; --border: #D1D5DB;
      --shadow: 0 2px 8px rgba(0,0,0,0.08); --shadow-md: 0 4px 20px rgba(0,0,0,0.10);
      --success: #166534; --success-bg: #DCFCE7;
    }
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Barlow', sans-serif; background: var(--off-white); color: var(--black); min-height: 100vh; }

    header { background: var(--blue); border-bottom: 4px solid var(--red); box-shadow: 0 2px 8px rgba(0,0,0,0.15); padding: 0 40px; display: flex; align-items: center; justify-content: space-between; min-height: 76px; }
    .header-left { display: flex; align-items: center; gap: 16px; }
    .ub-logo { width: 58px; height: 58px; flex-shrink: 0; border-radius: 50%; border: 2px solid rgba(255,255,255,0.2); object-fit: cover; }
    .brand { line-height: 1.2; }
    .brand-main { font-family: 'Cinzel', serif; font-size: 1.3rem; font-weight: 900; color: var(--yellow); letter-spacing: 2px; }
    .brand-sub { font-family: 'Rajdhani', sans-serif; font-size: 0.72rem; letter-spacing: 2px; color: rgba(255,255,255,0.72); text-transform: uppercase; }
    .brand-full { font-family: 'Rajdhani', sans-serif; font-size: 0.65rem; letter-spacing: 1px; color: rgba(255,255,255,0.42); text-transform: uppercase; margin-top: 1px; }
    .header-right { font-family: 'Rajdhani', sans-serif; font-size: 0.82rem; color: rgba(255,255,255,0.65); text-align: right; line-height: 1.5; }
    .header-right strong { color: var(--yellow); }
    #header-user-info { display: none; }
    .admin-badge { display: inline-block; padding: 3px 12px; background: rgba(192,21,42,0.25); border: 1px solid rgba(192,21,42,0.5); border-radius: 20px; font-family: 'Rajdhani', sans-serif; font-size: 0.72rem; font-weight: 700; letter-spacing: 1.5px; color: #ff8a97; text-transform: uppercase; margin-top: 6px; }

    nav { background: var(--white); display: flex; justify-content: center; padding: 0 20px; border-bottom: 2px solid var(--gray-light); flex-wrap: wrap; box-shadow: 0 1px 4px rgba(0,0,0,0.05); }
    nav button { background: none; border: none; border-bottom: 3px solid transparent; margin-bottom: -2px; cursor: pointer; font-family: 'Rajdhani', sans-serif; font-weight: 700; font-size: 0.8rem; letter-spacing: 1.5px; text-transform: uppercase; color: var(--gray); padding: 12px 20px; transition: all .18s; }
    nav button:hover, nav button.active { color: var(--blue); background: var(--blue-light); border-bottom-color: var(--red); }
    #main-nav { display: none; }

    .page { display: none; min-height: calc(100vh - 140px); }
    .page.active { display: block; }

    /* LOGIN */
    #page-login { display: none; align-items: center; justify-content: center; padding: 60px 20px; min-height: calc(100vh - 80px); background: var(--off-white); }
    #page-login.active { display: flex; }
    .login-card { width: 100%; max-width: 420px; background: var(--white); border: 1px solid var(--border); border-radius: 12px; box-shadow: var(--shadow-md); padding: 44px 38px; text-align: center; }
    .login-logo-wrap { display: flex; justify-content: center; margin-bottom: 14px; }
    .login-logo { width: 90px; height: 90px; border-radius: 50%; border: 3px solid var(--yellow); object-fit: cover; }
    .login-title { font-family: 'Cinzel', serif; font-size: 1.45rem; font-weight: 900; color: var(--blue); margin-bottom: 4px; }
    .login-subtitle { font-family: 'Rajdhani', sans-serif; font-size: 0.75rem; letter-spacing: 2px; color: var(--red); text-transform: uppercase; margin-bottom: 3px; font-weight: 700; }
    .login-fullname { font-family: 'Rajdhani', sans-serif; font-size: 0.66rem; letter-spacing: 1px; color: var(--gray); text-transform: uppercase; margin-bottom: 22px; }
    .login-role-tag { display: inline-block; padding: 4px 16px; background: #FEE2E2; border: 1px solid #FECACA; border-radius: 20px; font-family: 'Rajdhani', sans-serif; font-size: 0.72rem; font-weight: 700; letter-spacing: 1.5px; color: var(--red); text-transform: uppercase; margin-bottom: 20px; }

    .form-group { margin-bottom: 14px; text-align: left; }
    .form-group label { display: block; font-family: 'Rajdhani', sans-serif; font-weight: 600; font-size: 0.75rem; letter-spacing: 1px; text-transform: uppercase; color: var(--gray); margin-bottom: 5px; }
    .form-group input, .form-group select, .form-group textarea { width: 100%; padding: 10px 13px; background: var(--white); border: 1px solid var(--border); border-radius: 7px; color: var(--black); font-family: 'Barlow', sans-serif; font-size: 0.93rem; transition: border-color .2s, box-shadow .2s; outline: none; }
    .form-group input:focus, .form-group select:focus, .form-group textarea:focus { border-color: var(--blue); box-shadow: 0 0 0 3px rgba(11,47,110,0.1); }

    .btn-primary { width: 100%; padding: 12px; background: var(--blue); border: none; border-radius: 7px; color: var(--white); cursor: pointer; font-family: 'Rajdhani', sans-serif; font-weight: 700; font-size: 0.93rem; letter-spacing: 2px; text-transform: uppercase; transition: all .2s; margin-top: 6px; }
    .btn-primary:hover { background: var(--blue-mid); box-shadow: 0 4px 12px rgba(11,47,110,0.22); transform: translateY(-1px); }
    .btn-sm { padding: 7px 18px; background: var(--white); border: 1px solid var(--red); border-radius: 6px; color: var(--red); cursor: pointer; font-family: 'Rajdhani', sans-serif; font-weight: 700; font-size: 0.8rem; letter-spacing: 1px; text-transform: uppercase; transition: all .18s; }
    .btn-sm:hover { background: var(--red); color: var(--white); }
    .btn-blue { padding: 7px 18px; background: var(--white); border: 1px solid var(--blue); border-radius: 6px; color: var(--blue); cursor: pointer; font-family: 'Rajdhani', sans-serif; font-weight: 700; font-size: 0.8rem; letter-spacing: 1px; text-transform: uppercase; transition: all .18s; }
    .btn-blue:hover { background: var(--blue); color: var(--white); }
    .btn-gold { padding: 7px 18px; background: var(--white); border: 1px solid var(--gold); border-radius: 6px; color: #8a6d00; cursor: pointer; font-family: 'Rajdhani', sans-serif; font-weight: 700; font-size: 0.8rem; letter-spacing: 1px; text-transform: uppercase; transition: all .18s; }
    .btn-gold:hover { background: var(--yellow); color: var(--black); }
    .btn-add { padding: 9px 20px; background: var(--blue); border: none; border-radius: 7px; color: var(--white); cursor: pointer; font-family: 'Rajdhani', sans-serif; font-weight: 700; font-size: 0.8rem; letter-spacing: 1px; text-transform: uppercase; transition: all .18s; }
    .btn-add:hover { background: var(--blue-mid); transform: translateY(-1px); }
    .btn-danger { padding: 4px 10px; background: #FEE2E2; border: 1px solid #FECACA; border-radius: 5px; color: var(--red); cursor: pointer; font-family: 'Rajdhani', sans-serif; font-weight: 700; font-size: 0.72rem; letter-spacing: 0.5px; text-transform: uppercase; transition: all .18s; }
    .btn-danger:hover { background: var(--red); color: var(--white); border-color: var(--red); }
    .btn-edit { padding: 4px 10px; background: #FFFBEA; border: 1px solid #FDE68A; border-radius: 5px; color: #8a6d00; cursor: pointer; font-family: 'Rajdhani', sans-serif; font-weight: 700; font-size: 0.72rem; letter-spacing: 0.5px; text-transform: uppercase; transition: all .18s; margin-right: 4px; }
    .btn-edit:hover { background: var(--yellow); color: var(--black); }
    .btn-claim { padding: 4px 10px; background: var(--success-bg); border: 1px solid #BBF7D0; border-radius: 5px; color: var(--success); cursor: pointer; font-family: 'Rajdhani', sans-serif; font-weight: 700; font-size: 0.72rem; letter-spacing: 0.5px; text-transform: uppercase; transition: all .18s; margin-right: 4px; }
    .btn-claim:hover { background: var(--success); color: var(--white); border-color: var(--success); }

    .msg { font-size: 0.85rem; border-radius: 6px; padding: 10px 14px; }
    .msg.error { background: #FEE2E2; color: #991B1B; border: 1px solid #FECACA; }
    .msg.success { background: var(--success-bg); color: var(--success); border: 1px solid #BBF7D0; }
    .spinner { display: inline-block; width: 14px; height: 14px; border: 2px solid rgba(255,255,255,0.4); border-top-color: #fff; border-radius: 50%; animation: spin .7s linear infinite; margin-right: 7px; vertical-align: middle; }
    @keyframes spin { to { transform: rotate(360deg); } }

    /* ADMIN PANEL */
    #page-admin { padding: 40px; background: var(--off-white); }
    .admin-tabs { display: flex; gap: 6px; margin-bottom: 28px; flex-wrap: wrap; }
    .admin-tab { padding: 8px 20px; background: var(--white); border: 1px solid var(--border); border-radius: 7px; color: var(--gray); cursor: pointer; font-family: 'Rajdhani', sans-serif; font-weight: 700; font-size: 0.8rem; letter-spacing: 1px; text-transform: uppercase; transition: all .18s; }
    .admin-tab.active, .admin-tab:hover { background: var(--blue); color: var(--white); border-color: var(--blue); }
    .admin-section { display: none; }
    .admin-section.active { display: block; }
    .card-panel { background: var(--white); border: 1px solid var(--border); border-radius: 10px; padding: 24px; margin-bottom: 20px; }
    .input-row { display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 14px; }
    .input-row input, .input-row select { flex: 1; min-width: 160px; padding: 9px 12px; background: var(--white); border: 1px solid var(--border); border-radius: 7px; color: var(--black); font-family: 'Barlow', sans-serif; font-size: 0.88rem; outline: none; }
    .input-row input:focus { border-color: var(--blue); }
    .section-title { font-family: 'Rajdhani', sans-serif; font-size: 0.78rem; font-weight: 700; letter-spacing: 2px; color: var(--blue); text-transform: uppercase; border-bottom: 2px solid var(--yellow); padding-bottom: 8px; margin-bottom: 22px; display: inline-block; }
    .stat-row { display: flex; gap: 14px; margin-bottom: 30px; flex-wrap: wrap; }
    .stat-card { flex: 1; min-width: 130px; background: var(--white); border: 1px solid var(--border); border-top: 3px solid var(--blue); border-radius: 10px; padding: 18px 16px; text-align: center; }
    .stat-num { font-family: 'Cinzel', serif; font-size: 2rem; color: var(--blue); }
    .stat-label { font-family: 'Rajdhani', sans-serif; font-size: 0.72rem; letter-spacing: 1.5px; text-transform: uppercase; color: var(--gray); margin-top: 4px; }

    table { width: 100%; border-collapse: collapse; font-size: 0.87rem; }
    table th { font-family: 'Rajdhani', sans-serif; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; color: var(--blue); font-size: 0.75rem; padding: 10px 12px; border-bottom: 2px solid var(--yellow); text-align: left; background: var(--off-white); }
    table td { padding: 11px 12px; border-bottom: 1px solid var(--gray-light); color: var(--black); vertical-align: top; }
    table tr:hover td { background: var(--blue-light); }
    .badge { display: inline-block; padding: 2px 10px; border-radius: 20px; font-size: 0.70rem; font-weight: 700; letter-spacing: 0.5px; font-family: 'Rajdhani', sans-serif; }
    .badge-blue { background: var(--blue-light); color: var(--blue); border: 1px solid rgba(11,47,110,0.2); }
    .badge-red { background: #FEE2E2; color: var(--red); border: 1px solid #FECACA; }
    .badge-gold { background: #FFFBEA; color: #8a6d00; border: 1px solid #FDE68A; }
    .badge-green { background: var(--success-bg); color: var(--success); border: 1px solid #BBF7D0; }
    .claim-badge { display: inline-block; padding: 3px 12px; border-radius: 20px; font-size: 0.72rem; font-weight: 700; font-family: 'Rajdhani', sans-serif; letter-spacing: 0.5px; }
    .badge-claimed { background: var(--success-bg); color: var(--success); border: 1px solid #BBF7D0; }

    /* QR GEN */
    .gen-hero { background: linear-gradient(135deg, #0f1e3a, #1a3a7a); border-bottom: 3px solid var(--yellow); padding: 36px 40px 28px; text-align: center; }
    .gen-hero h2 { font-family: 'Cinzel', serif; font-size: 1.5rem; color: var(--yellow); letter-spacing: 2px; margin-bottom: 8px; }
    .gen-hero p { color: rgba(255,255,255,0.6); font-size: 0.9rem; }
    .gen-container { max-width: 760px; margin: 36px auto; padding: 0 24px; }
    .gen-card { background: rgba(255,255,255,0.04); border: 1px solid rgba(245,197,24,0.15); border-radius: 14px; padding: 30px; margin-bottom: 20px; }
    .gen-card .form-group label { color: rgba(255,255,255,0.6); }
    .gen-card .form-group input, .gen-card .form-group select, .gen-card .form-group textarea { background: rgba(255,255,255,0.08); border-color: rgba(255,255,255,0.12); color: #e0eaff; }
    .gen-card .form-group input::placeholder { color: rgba(255,255,255,0.3); }
    .gen-card .form-group input:focus, .gen-card .form-group select:focus { border-color: var(--yellow); }
    .gen-card .form-group select option { background: #1a3a7a; color: #e0eaff; }
    .qr-result-card { background: rgba(255,255,255,0.04); border: 1px solid rgba(245,197,24,0.25); border-radius: 14px; padding: 36px; text-align: center; }

    /* SCANNER */
    .scanner-hero { background: var(--blue); border-bottom: 4px solid var(--yellow); padding: 32px 40px 26px; text-align: center; }
    .scanner-hero h2 { font-family: 'Cinzel', serif; font-size: 1.4rem; color: var(--yellow); margin-bottom: 6px; letter-spacing: 2px; }
    .scanner-hero p { color: rgba(255,255,255,0.72); font-size: 0.88rem; }
    .scanner-container { max-width: 720px; margin: 32px auto; padding: 0 24px; }
    .scanner-card { background: var(--white); border: 1px solid var(--border); border-radius: 12px; padding: 28px; margin-bottom: 20px; }
    .scanner-status-box { background: var(--off-white); border: 2px dashed var(--border); border-radius: 10px; padding: 28px; text-align: center; margin-bottom: 16px; }
    #scanner-input { position: absolute; left: -9999px; width: 1px; height: 1px; opacity: 0; }
    .scanner-pulse { width: 56px; height: 56px; border-radius: 50%; background: rgba(11,47,110,0.08); display: flex; align-items: center; justify-content: center; font-size: 1.6rem; margin: 0 auto 16px; animation: pulse 2s ease-in-out infinite; }
    @keyframes pulse { 0%,100%{transform:scale(1);opacity:1}50%{transform:scale(1.1);opacity:0.7} }
    #scanner-status-text { font-family: 'Rajdhani', sans-serif; font-size: 0.9rem; color: var(--gray); letter-spacing: 1px; text-transform: uppercase; }
    .mode-tabs { display: flex; gap: 8px; margin-bottom: 20px; }
    .mode-tab { flex: 1; padding: 10px; text-align: center; border: 1px solid var(--border); border-radius: 8px; cursor: pointer; font-family: 'Rajdhani', sans-serif; font-weight: 700; font-size: 0.8rem; letter-spacing: 1px; text-transform: uppercase; color: var(--gray); transition: all .18s; background: var(--off-white); }
    .mode-tab.active { background: var(--blue); color: var(--white); border-color: var(--blue); }

    /* MODAL */
    .modal-overlay { position: fixed; inset: 0; z-index: 100; background: rgba(0,0,0,0.45); backdrop-filter: blur(2px); display: none; align-items: center; justify-content: center; padding: 20px; overflow-y: auto; }
    .modal-overlay.open { display: flex; }
    .modal { background: var(--white); border: 1px solid var(--border); border-radius: 12px; padding: 36px; width: 100%; max-width: 620px; box-shadow: var(--shadow-md); position: relative; max-height: 90vh; overflow-y: auto; }
    .modal-title { font-family: 'Cinzel', serif; color: var(--blue); font-size: 1.1rem; margin-bottom: 20px; border-bottom: 2px solid var(--yellow); padding-bottom: 10px; }
    .modal-close { float: right; background: none; border: none; color: var(--gray); cursor: pointer; font-size: 1.3rem; margin-top: -4px; }
    .modal-close:hover { color: var(--red); }

    /* Claim stub display */
    .stub-box { background: var(--off-white); border: 1px solid var(--border); border-radius: 10px; padding: 18px; font-size: 0.85rem; line-height: 1.8; margin-bottom: 14px; }
    .stub-row { display: flex; gap: 8px; margin-bottom: 4px; }
    .stub-label { font-family: 'Rajdhani', sans-serif; font-weight: 700; font-size: 0.75rem; letter-spacing: 1px; text-transform: uppercase; color: var(--gray); min-width: 140px; }
    .stub-val { color: var(--blue); font-weight: 500; }

    /* Proof of payment image */
    .proof-img { max-width: 100%; border-radius: 8px; border: 1px solid var(--border); margin-top: 8px; max-height: 300px; object-fit: contain; }

    .student-link-bar { text-align: center; margin-top: 16px; }
    .student-link-bar a { font-family: 'Rajdhani', sans-serif; font-size: 0.78rem; color: var(--gray); letter-spacing: 1px; text-decoration: none; text-transform: uppercase; }
    .student-link-bar a:hover { color: var(--blue); }

    @media(max-width:600px) {
      header { padding: 0 16px; } #page-admin { padding: 20px 14px; }
      .admin-tabs { gap: 4px; } .admin-tab { padding: 7px 12px; font-size: 0.72rem; }
    }
    @keyframes scanLine { 0%,100%{margin-top:-80px;opacity:1} 50%{margin-top:77px;opacity:0.7} }
