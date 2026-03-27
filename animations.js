// Decyphers Animation Enhancement Pack — inject into any landing page
(function(){
// Add ticker bar at top
const ticker = document.createElement('div');
ticker.innerHTML = `<div style="position:fixed;top:0;left:0;right:0;background:rgba(13,17,23,0.95);border-bottom:1px solid #21262d;padding:6px 0;z-index:10000;overflow:hidden;backdrop-filter:blur(10px);">
  <div style="display:flex;gap:40px;animation:tickScroll 25s linear infinite;white-space:nowrap;color:#8b949e;font-size:12px;font-family:monospace;" id="tickerContent">
    <span>EUR/USD <span style="color:#22c55e">1.0847 ▲ +0.12%</span></span>
    <span>GBP/USD <span style="color:#ef4444">1.2631 ▼ -0.08%</span></span>
    <span>USD/JPY <span style="color:#22c55e">149.82 ▲ +0.31%</span></span>
    <span>BTC/USD <span style="color:#22c55e">67,842 ▲ +2.4%</span></span>
    <span>GOLD <span style="color:#22c55e">2,341 ▲ +0.8%</span></span>
    <span>AAPL <span style="color:#22c55e">189.47 ▲ +1.2%</span></span>
    <span>TSLA <span style="color:#ef4444">178.23 ▼ -0.7%</span></span>
    <span>S&P 500 <span style="color:#22c55e">5,234 ▲ +0.4%</span></span>
    <span>NASDAQ <span style="color:#22c55e">16,428 ▲ +0.6%</span></span>
    <span>EUR/USD <span style="color:#22c55e">1.0847 ▲ +0.12%</span></span>
    <span>GBP/USD <span style="color:#ef4444">1.2631 ▼ -0.08%</span></span>
    <span>USD/JPY <span style="color:#22c55e">149.82 ▲ +0.31%</span></span>
  </div>
</div>`;
document.body.prepend(ticker);

// Add scroll progress bar
const progressBar = document.createElement('div');
progressBar.id = 'scrollProgress';
progressBar.style.cssText = 'position:fixed;top:34px;left:0;height:3px;background:linear-gradient(90deg,#FF6B35,#FFD700,#22c55e);z-index:9999;width:0%;transition:width 0.1s;box-shadow:0 0 10px rgba(255,107,53,0.5);';
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
@keyframes spin { 0%{transform:rotate(0deg)} 100%{transform:rotate(360deg)} }
@keyframes countUp { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
@keyframes slideInLeft { from{opacity:0;transform:translateX(-40px)} to{opacity:1;transform:translateX(0)} }
@keyframes slideInRight { from{opacity:0;transform:translateX(40px)} to{opacity:1;transform:translateX(0)} }
@keyframes fadeInUp { from{opacity:0;transform:translateY(40px)} to{opacity:1;transform:translateY(0)} }
@keyframes drawLine { from{stroke-dashoffset:1000} to{stroke-dashoffset:0} }
@keyframes shimmer { 0%{background-position:-200% 0} 100%{background-position:200% 0} }

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

body { padding-top:38px !important; }

@media(max-width:768px) {
  .hex-grid { gap:6px; }
  .hex { width:100px; height:115px; }
  .hex .hex-icon { font-size:1.4rem; }
  .hex .hex-title { font-size:0.7rem; }
  .hex .hex-sub { display:none; }
}
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

// Stagger children animation
const staggerObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if(e.isIntersecting) {
      const children = e.target.querySelectorAll('.stagger-child');
      children.forEach((c, i) => {
        setTimeout(() => { c.style.opacity = '1'; c.style.transform = 'translateY(0)'; }, i * 100);
      });
      staggerObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.2 });

// Initialize observers after DOM ready
setTimeout(() => {
  // Auto-add reveal class to common elements
  document.querySelectorAll('h2, h3, .section-title, [class*="feature"], [class*="card"], [class*="testimonial"], [class*="pricing"]').forEach(el => {
    if(!el.classList.contains('reveal') && !el.closest('.reveal')) {
      el.classList.add('reveal');
    }
  });
  
  // Observe all reveal elements
  document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => revealObserver.observe(el));
  
  // Observe progress bar sections
  document.querySelectorAll('[class*="progress-section"], .progress-bars-container').forEach(el => barObserver.observe(el));
  
  // Observe count-up elements
  document.querySelectorAll('.count-up').forEach(el => countObserver.observe(el));
  
  // Observe stagger containers
  document.querySelectorAll('.stagger-container').forEach(el => staggerObserver.observe(el));
}, 100);

console.log('🎨 Decyphers Animation Pack loaded!');
})();
