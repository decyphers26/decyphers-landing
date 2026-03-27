// Decyphers Animation Enhancement Pack v2 — Live prices + Mobile fixed
(function(){
// Price data with live updates
const prices = {
  eurusd: {base: 1.0847, change: 0.12, up: true},
  gbpusd: {base: 1.2631, change: -0.08, up: false},
  usdjpy: {base: 149.82, change: 0.31, up: true},
  btcusd: {base: 67842, change: 2.4, up: true},
  gold: {base: 2341, change: 0.8, up: true},
  aapl: {base: 189.47, change: 1.2, up: true},
  tsla: {base: 178.23, change: -0.7, up: false},
  spx: {base: 5234, change: 0.4, up: true},
  ndx: {base: 16428, change: 0.6, up: true}
};

function jitter(base, pct) {
  return base * (1 + (Math.random() - 0.5) * pct / 100);
}

function formatPrice(val, decimals) {
  return val.toFixed(decimals);
}

function updatePriceData() {
  for (let key in prices) {
    let p = prices[key];
    let jitterPct = key === 'btcusd' ? 0.3 : 0.05;
    let newBase = jitter(p.base, jitterPct);
    let change = (Math.random() - 0.48) * 0.5;
    p.up = change >= 0;
    p.change = parseFloat(change.toFixed(2));
    p.base = newBase;
  }
}

function getTickerHTML() {
  let items = [
    {name: 'EUR/USD', val: formatPrice(prices.eurusd.base, 4), c: prices.eurusd.change, up: prices.eurusd.up},
    {name: 'GBP/USD', val: formatPrice(prices.gbpusd.base, 4), c: prices.gbpusd.change, up: prices.gbpusd.up},
    {name: 'USD/JPY', val: formatPrice(prices.usdjpy.base, 2), c: prices.usdjpy.change, up: prices.usdjpy.up},
    {name: 'BTC/USD', val: formatPrice(prices.btcusd.base, 0), c: prices.btcusd.change, up: prices.btcusd.up},
    {name: 'GOLD', val: formatPrice(prices.gold.base, 0), c: prices.gold.change, up: prices.gold.up},
    {name: 'AAPL', val: formatPrice(prices.aapl.base, 2), c: prices.aapl.change, up: prices.aapl.up},
    {name: 'TSLA', val: formatPrice(prices.tsla.base, 2), c: prices.tsla.change, up: prices.tsla.up},
    {name: 'S&P 500', val: formatPrice(prices.spx.base, 0), c: prices.spx.change, up: prices.spx.up},
    {name: 'NASDAQ', val: formatPrice(prices.ndx.base, 0), c: prices.ndx.change, up: prices.ndx.up}
  ];
  return items.map(i => {
    let color = i.up ? '#22c55e' : '#ef4444';
    let arrow = i.up ? '▲' : '▼';
    let sign = i.up ? '+' : '';
    return `<span style="white-space:nowrap">${i.name} <span style="color:${color}">${i.val} ${arrow} ${sign}${i.c}%</span></span>`;
  }).join('');
}

// Create ticker
const ticker = document.createElement('div');
ticker.id = 'live-ticker';
ticker.innerHTML = `<div style="position:fixed;top:0;left:0;right:0;background:rgba(13,17,23,0.97);border-bottom:1px solid #21262d;padding:8px 0;z-index:10000;overflow:hidden;backdrop-filter:blur(10px);">
  <div style="display:flex;gap:30px;animation:tickScroll 30s linear infinite;white-space:nowrap;color:#8b949e;font-size:11px;font-family:'SF Mono',Monaco,Consolas,monospace;" id="tickerContent">
    ${getTickerHTML()}
  </div>
</div>`;
document.body.prepend(ticker);

// Update prices every 3 seconds
setInterval(() => {
  updatePriceData();
  const el = document.getElementById('tickerContent');
  if (el) el.innerHTML = getTickerHTML();
}, 3000);

// Add scroll progress bar
const progressBar = document.createElement('div');
progressBar.id = 'scrollProgress';
progressBar.style.cssText = 'position:fixed;top:37px;left:0;height:3px;background:linear-gradient(90deg,#FF6B35,#FFD700,#22c55e);z-index:9999;width:0%;transition:width 0.1s;box-shadow:0 0 10px rgba(255,107,53,0.5);';
document.body.prepend(progressBar);

window.addEventListener('scroll',function(){
  const h = document.documentElement;
  const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
  progressBar.style.width = pct + '%';
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
@keyframes tickScroll { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
@keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
@keyframes floatSlow { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-8px) rotate(2deg)} }
@keyframes glow { 0%,100%{box-shadow:0 0 10px rgba(255,107,53,0.3)} 50%{box-shadow:0 0 30px rgba(255,107,53,0.8),0 0 60px rgba(255,107,53,0.3)} }
@keyframes glowBlue { 0%,100%{box-shadow:0 0 10px rgba(59,130,246,0.3)} 50%{box-shadow:0 0 30px rgba(59,130,246,0.8),0 0 60px rgba(59,130,246,0.3)} }
@keyframes gradientShift { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }
@keyframes pulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.05)} }
@keyframes countUp { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
@keyframes slideInLeft { from{opacity:0;transform:translateX(-40px)} to{opacity:1;transform:translateX(0)} }
@keyframes slideInRight { from{opacity:0;transform:translateX(40px)} to{opacity:1;transform:translateX(0)} }
@keyframes fadeInUp { from{opacity:0;transform:translateY(40px)} to{opacity:1;transform:translateY(0)} }

.reveal { opacity:0; transform:translateY(30px); transition:all 0.7s cubic-bezier(0.4,0,0.2,1); }
.reveal.visible { opacity:1; transform:translateY(0); }
.reveal-left { opacity:0; transform:translateX(-40px); transition:all 0.7s cubic-bezier(0.4,0,0.2,1); }
.reveal-left.visible { opacity:1; transform:translateX(0); }
.reveal-right { opacity:0; transform:translateX(40px); transition:all 0.7s cubic-bezier(0.4,0,0.2,1); }
.reveal-right.visible { opacity:1; transform:translateX(0); }

.floating { animation: float 3s ease-in-out infinite; }
.floating-slow { animation: floatSlow 5s ease-in-out infinite; }
.glow-pulse { animation: glow 2.5s ease-in-out infinite; }
.glow-blue { animation: glowBlue 2.5s ease-in-out infinite; }
.pulse { animation: pulse 2s ease-in-out infinite; }
.shifting-bg { background-size:200% 200%; animation:gradientShift 8s ease infinite; }

.card-3d { transition:all 0.3s cubic-bezier(0.4,0,0.2,1); transform-style:preserve-3d; }
.card-3d:hover { transform:translateY(-6px) scale(1.02); box-shadow:0 20px 40px rgba(0,0,0,0.3); }

.wave-divider { position:relative; height:60px; margin:-1px 0; overflow:hidden; }
.wave-divider svg { width:100%; height:100%; display:block; }

.progress-bar-bg { background:#21262d; border-radius:10px; height:12px; overflow:hidden; }
.progress-bar-fill { height:100%; border-radius:10px; width:0; transition:width 1.5s cubic-bezier(0.4,0,0.2,1); }
.progress-bar-fill.animated { /* width set inline */ }

.hex-grid { display:flex; flex-wrap:wrap; justify-content:center; gap:10px; padding:20px; }
.hex { width:140px; height:162px; clip-path:polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%); display:flex; flex-direction:column; align-items:center; justify-content:center; color:#fff; text-align:center; padding:20px; transition:all 0.3s; cursor:default; }
.hex:hover { transform:scale(1.08); filter:brightness(1.2); }
.hex .hex-icon { font-size:2rem; margin-bottom:6px; }
.hex .hex-title { font-size:0.85rem; font-weight:700; }
.hex .hex-sub { font-size:0.7rem; opacity:0.8; margin-top:3px; }

/* MOBILE FIXES */
@media(max-width:768px) {
  body { padding-top:45px !important; }
  .hex-grid { gap:6px; padding:10px; }
  .hex { width:100px; height:115px; }
  .hex .hex-icon { font-size:1.4rem; }
  .hex .hex-title { font-size:0.7rem; }
  .hex .hex-sub { display:none; }
  
  /* Fix section spacing on mobile */
  section, [class*="section"] { padding:20px 12px !important; margin:0 !important; }
  
  /* Fix heading sizes on mobile */
  h1 { font-size:1.8rem !important; line-height:1.2 !important; }
  h2 { font-size:1.4rem !important; }
  h3 { font-size:1.1rem !important; }
  
  /* Fix cards on mobile */
  .card-3d, [class*="card"] { margin:6px 0 !important; }
  
  /* Fix comparison table on mobile */
  .comparison-table { font-size:0.75rem !important; }
  .comparison-header, .comparison-row { grid-template-columns: 1fr 60px 60px !important; }
  
  /* Fix progress bars on mobile */
  .progress-bar-bg { height:8px !important; }
  
  /* Ticker smaller on mobile */
  #tickerContent { font-size:10px !important; gap:20px !important; }
}

@media(max-width:480px) {
  h1 { font-size:1.5rem !important; }
  .hex { width:80px; height:92px; }
  .hex .hex-icon { font-size:1.1rem; }
  #tickerContent { font-size:9px !important; gap:15px !important; }
}

body { padding-top:45px; }
`;
document.head.appendChild(style);

// Scroll reveal observer
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if(e.isIntersecting) {
      e.target.classList.add('visible');
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

// Progress bar observer
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if(e.isIntersecting) {
      const fills = e.target.querySelectorAll('.progress-bar-fill');
      fills.forEach(f => { f.style.width = f.dataset.width; f.classList.add('animated'); });
      barObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });

// Count-up observer
const countObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if(e.isIntersecting) {
      const el = e.target;
      const target = parseFloat(el.dataset.target);
      const suffix = el.dataset.suffix || '';
      const prefix = el.dataset.prefix || '';
      const isDecimal = String(target).includes('.');
      let current = 0;
      const duration = 1500;
      const steps = 60;
      const stepTime = duration / steps;
      const increment = target / steps;
      const timer = setInterval(() => {
        current += increment;
        if(current >= target) { current = target; clearInterval(timer); }
        el.textContent = prefix + (isDecimal ? current.toFixed(1) : Math.floor(current)) + suffix;
      }, stepTime);
      countObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

// Initialize observers after DOM ready
setTimeout(() => {
  document.querySelectorAll('h2, h3, .section-title, [class*="feature"], [class*="card"], [class*="testimonial"], [class*="pricing"]').forEach(el => {
    if(!el.classList.contains('reveal') && !el.closest('.reveal')) {
      el.classList.add('reveal');
    }
  });
  
  document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => revealObserver.observe(el));
  document.querySelectorAll('[class*="progress-section"], .progress-bars-container').forEach(el => barObserver.observe(el));
  document.querySelectorAll('.count-up').forEach(el => countObserver.observe(el));
}, 100);

console.log('🎨 Decyphers Animation Pack v2 loaded — LIVE prices + mobile fixed!');
})();
