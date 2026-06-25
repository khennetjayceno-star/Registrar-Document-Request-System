// ── CONFIG ──
const SUPABASE_URL = 'https://loptucjttggxleiliygn.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxvcHR1Y2p0dGdneGxlaWxpeWduIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYwNjI4NjcsImV4cCI6MjA5MTYzODg2N30.Vw7vNvNCUjVQ-DB4dLt1RZ4IlB5wg5J6pBj10vJ2bnM';
const EMAILJS_SERVICE_ID  = 'service_zvucg1c';
const EMAILJS_TEMPLATE_ID = 'template_ki376d9';
const EMAILJS_PUBLIC_KEY  = 'vcLeXe5pdCznA27op';

const { createClient } = supabase;
const db = createClient(SUPABASE_URL, SUPABASE_KEY);
emailjs.init(EMAILJS_PUBLIC_KEY);

// ── Shared state ──
let currentAdmin = null;
let currentStatusReqId = null;
let videoStream = null;
let scanInterval = null;
let scanMode = 'scan';
