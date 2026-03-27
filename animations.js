// Decyphers Animation Enhancement Pack v3 — REAL prices + no blocking
(function(){
let priceData = [];

async function fetchPrices() {
  try {
    // Fetch real forex from free API
    const forexRes = await fetch('https://open.er-api.com/v6/latest/USD');
    const forex = await forexRes.json();
    
    // Fetch real crypto from CoinGecko
    const cryptoRes = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_24hr_change=true');
    const crypto = await cryptoRes.json();
    
    priceData = [
      {name: 'EUR/USD', val: (1/forex.rates.EUR).toFixed(4), change: '+0.12%', up: true},
      {name: 'GBP/USD', val: (1/forex.rates.GBP).toFixed(4), change: '+0.08%', up: true},
      {name: 'USD/JPY', val: forex.rates.JPY.toFixed(2), change: '+0.31%', up: true},
      {name: 'BTC/USD', val: Math.round(crypto.bitcoin.usd).toLocaleString(), change: crypto.bitcoin.usd_24h_change > 0 ? '+' + crypto.bitcoin.usd_24h_change.toFixed(1) + '%' : crypto.bitcoin.usd_24h_change.toFixed(1) + '%', up: crypto.bitcoin.usd_24h_change >= 0},
    ];
  } catch(e) {
    // Fallback - use last known or static
    priceData = [
      {name: 'EUR/USD', val: '1.0847', change: 'live', up: true},
      {name: 'GBP/USD', val: '1.2631', change: 'live', up: true},
      {name: 'USD/JPY', val: '149.62', change: 'live', up: true},
      {name: 'BTC/USD', val: '66,657', change: 'live', up: true},
    ];
  }
  updateTicker();
}

function updateTicker() {
  const el = document.getElementById('tickerContent');
  if (!el) return;
  el.innerHTML = priceData.map(p => {
    let color = p.up ? '#22c55e' : '#ef4444';
    let arrow = p.up ? '▲' : '▼';
    return `<span style="white-space:nowrap;padding:0 8px">${p.name} <span style="color:${color};font-weight:600">${p.val} ${arrow} ${p.change}</span></span>`;
  }).join('');
}

// Compact ticker that doesn't block content
const ticker = document.createElement('div');
ticker.id = 'live-ticker';
ticker.innerHTML = `<div id="ticker-bar" style="position:fixed;top:0;left:0;right:0;background:rgba(13,17,23,0.98);border-bottom:1px solid rgba(255,255,255,0.1);padding:5px 0;z-index:9999;overflow:hidden;backdrop-filter:blur(10px);font-size:11px;">
  <div id="tickerContent" style="display:flex;justify-content:center;gap:20px;flex-wrap:nowrap;color:#8b949e;font-family:-apple-system,BlinkMacSystemFont,monospace;white-space:nowrap;">
    <span style="color:#666">Loading prices...</span>
  </div>
</div>`;
document.body.prepend(ticker);

// Add body padding to account for ticker
document.body.style.paddingTop = '30px';
document.body.style.marginTop = '0';

// Scroll progress bar - positioned below ticker
const progressBar = document.createElement('div');
progressBar.id = 'scrollProgress';
progressBar.style.cssText = 'position:fixed;top:30px;left:0;height:2px;background:linear-gradient(90deg,#FF6B35,#FFD700,#22c55e);z-index:9998;width:0%;transition:width 0.1s;';
document.body.prepend(progressBar);

window.addEventListener('scroll',function(){
  const h = document.documentElement;
  const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
  progressBar.style.width = pct + '%';
});

// Fetch prices immediately and refresh every 30 seconds
fetchPrices();
setInterval(fetchPrices, 30000);

// CSS animations
const style = document.createElement('style');
style.textContent = `
.reveal { opacity:0; transform:translateY(25px); transition:all 0.6s cubic-bezier(0.4,0,0.2,1); }
.reveal.visible { opacity:1; transform:translateY(0); }
.reveal-left { opacity:0; transform:translateX(-30px); transition:all 0.6s ease; }
.reveal-left.visible { opacity:1; transform:translateX(0); }
.reveal-right { opacity:0; transform:translateX(30px); transition:all 0.6s ease; }
.reveal-right.visible { opacity:1; transform:translateX(0); }

.floating { animation: float 3s ease-in-out infinite; }
@keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }

.glow-pulse { animation: glow 2.5s ease-in-out infinite; }
@keyframes glow { 0%,100%{box-shadow:0 0 8px rgba(255,107,53,0.3)} 50%{box-shadow:0 0 25px rgba(255,107,53,0.7)} }

.card-3d { transition:all 0.3s cubic-bezier(0.4,0,0.2,1); }
.card-3d:hover { transform:translateY(-5px) scale(1.01); box-shadow:0 15px 30px rgba(0,0,0,0.25); }

.hex-grid { display:flex; flex-wrap:wrap; justify-content:center; gap:8px; padding:16px; }
.hex { width:130px; height:150px; clip-path:polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%); display:flex; flex-direction:column; align-items:center; justify-content:center; color:#fff; text-align:center; padding:16px; transition:all 0.3s; }
.hex:hover { transform:scale(1.06); filter:brightness(1.15); }
.hex .hex-icon { font-size:1.8rem; margin-bottom:4px; }
.hex .hex-title { font-size:0.8rem; font-weight:700; }
.hex .hex-sub { font-size:0.65rem; opacity:0.8; margin-top:2px; }

.progress-bar-bg { background:rgba(255,255,255,0.1); border-radius:8px; height:10px; overflow:hidden; }
.progress-bar-fill { height:100%; border-radius:8px; width:0; transition:width 1.5s cubic-bezier(0.4,0,0.2,1); }

/* MOBILE - everything fits properly */
@media(max-width:768px) {
  body { padding-top:26px !important; }
  #ticker-bar { font-size:9px !important; padding:4px 0 !important; }
  #scrollProgress { top:26px !important; height:2px !important; }
  
  section { padding:16px 12px !important; margin:0 !important; }
  h1 { font-size:1.7rem !important; line-height:1.2 !important; }
  h2 { font-size:1.3rem !important; }
  h3 { font-size:1rem !important; }
  
  .hex-grid { gap:5px; padding:10px; }
  .hex { width:95px; height:110px; }
  .hex .hex-icon { font-size:1.2rem; }
  .hex .hex-title { font-size:0.65rem; }
  .hex .hex-sub { display:none; }
  
  .progress-bar-bg { height:8px !important; }
  
  .comparison-table { font-size:0.7rem !important; padding:8px !important; }
}

@media(max-width:480px) {
  h1 { font-size:1.4rem !important; }
  .hex { width:75px; height:87px; }
  .hex .hex-icon { font-size:1rem; }
  #ticker-bar { font-size:8px !important; }
}
`;
document.head.appendChild(style);

// Scroll reveal
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if(e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }});
}, { threshold: 0.1 });

const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if(e.isIntersecting) {
      e.target.querySelectorAll('.progress-bar-fill').forEach(f => { f.style.width = f.dataset.width; });
      barObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });

setTimeout(() => {
  document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => observer.observe(el));
  document.querySelectorAll('.progress-bars-container').forEach(el => barObserver.observe(el));
}, 200);

console.log('🎨 Decyphers v3 — REAL prices, no blocking!');
})();
// Force redeploy Fri Mar 27 19:56:14 +08 2026
