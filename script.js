// ===== Mobile menu toggle =====
const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");
const year = document.getElementById("year");

if (year) year.textContent = new Date().getFullYear();

menuBtn?.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("show");
  menuBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
});

// ===== Hero video carousel =====
(function () {
  var vids = document.querySelectorAll('.hero-vid');
  var dots = document.querySelectorAll('.hero-dot');
  var bar  = document.getElementById('heroBar');
  if (!vids.length || !dots.length || !bar) return;

  var cur      = 0;
  var elapsed  = 0;
  var duration = 6000;
  var tick     = 50;

  function heroGo(idx) {
    vids[cur].classList.remove('active');
    dots[cur].classList.remove('active');
    cur = idx;
    vids[cur].classList.add('active');
    dots[cur].classList.add('active');
    elapsed = 0;
    bar.style.width = '0%';

    // Start playback on lazy-loaded videos
    if (vids[cur].readyState === 0) {
      vids[cur].load();
    }
    vids[cur].play();
  }
  window.heroGo = heroGo;

  setInterval(function () {
    elapsed += tick;
    bar.style.width = Math.min((elapsed / duration) * 100, 100) + '%';
    if (elapsed >= duration) {
      heroGo((cur + 1) % vids.length);
    }
  }, tick);
})();

// ===== Contact form handler (Web3Forms) =====
(function () {
  var form = document.getElementById('leadForm');
  if (!form) return;

  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    var status = document.getElementById('lf-status');
    status.textContent = 'Sending...';

    var payload = {
      access_key: '2f1d0aea-3430-475e-901f-e7b66314a0e3',
      subject: 'Website Lead',
      from_name: 'Grownith Website',
      botcheck: '',
      Name: document.getElementById('lf-name').value,
      Email: document.getElementById('lf-email').value,
      Message: document.getElementById('lf-message').value
    };

    try {
      var res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(payload)
      });
      var json = await res.json();
      if (json.success) {
        status.textContent = 'Thanks! Your message has been sent.';
        e.target.reset();
      } else {
        status.textContent = json.message || 'Could not send. Please email sales@grownith.com.';
      }
    } catch (err) {
      status.textContent = 'Could not send. Please email sales@grownith.com directly.';
    }
  });
})();
