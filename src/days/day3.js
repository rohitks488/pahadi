document.addEventListener('DOMContentLoaded', () => {
  const stages = document.querySelectorAll('.stage');

  // Force initial state: hide all, then show stage 1
  const goToStage = (num) => {
    stages.forEach((s) => s.classList.add('hidden'));
    const target = document.getElementById(`stage-${num}`);
    if (target) {
      target.classList.remove('hidden');
    }
    if (num === 4) initFogCanvas();
  };

  // Run this once on load to ensure only Stage 1 is visible
  goToStage(1);

  // --- STAGE 1: Roulette ---
  const styleDescs = {
    'Classic Romance 🌹':
      'A deep, passionate kiss that makes the whole world disappear. Just like in the movies, but better because it’s us.',
    'Butterfly Kisses 🦋':
      'Light eyelashes against your skin... the sweetest, most ticklish way to say I adore you.',
    'The Surprise Peck ⚡':
      'When you least expect it! In the middle of a sentence, just to keep you on your toes.',
    'Forehead Blessing ✨':
      'A kiss of protection and pure love. My way of saying you are safe with me, always.',
  };

  document.querySelectorAll('.lipstick-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const style = btn.dataset.style;
      document.getElementById('style-title').innerText = style;
      document.getElementById('style-desc').innerText = styleDescs[style];
      document.getElementById('roulette-result').classList.remove('hidden');
    });
  });

  document.getElementById('to-stage-2').onclick = () => goToStage(2);

  // --- STAGE 2: Geography ---
  const points = document.querySelectorAll('.kiss-point');
  const mapMsg = document.getElementById('map-msg');
  let clickedPoints = new Set();

  points.forEach((p, idx) => {
    p.onclick = () => {
      mapMsg.innerText = p.dataset.msg;
      p.style.background = '#ff4d4d';
      clickedPoints.add(idx);
      if (clickedPoints.size === points.length) {
        document.getElementById('to-stage-3').classList.remove('hidden');
      }
    };
  });

  document.getElementById('to-stage-3').onclick = () => {
    goToStage(3);
    startKissCollector();
  };

  // --- STAGE 3: Collector ---
  let score = 0;
  function startKissCollector() {
    const zone = document.getElementById('collection-zone');
    const scoreDisplay = document.getElementById('kiss-count');

    const gameInterval = setInterval(() => {
      if (score >= 13) {
        clearInterval(gameInterval);
        showCelebration();
        return;
      }

      const kiss = document.createElement('div');
      kiss.className = 'kiss-target';
      kiss.innerText = '💋';

      const x = Math.random() * 85;
      const y = Math.random() * 85;

      kiss.style.left = `${x}%`;
      kiss.style.top = `${y}%`;

      kiss.onclick = () => {
        if (kiss.classList.contains('exploding')) return;

        score++;
        scoreDisplay.innerText = score;

        kiss.classList.add('exploding');
        kiss.innerText = '💖';

        setTimeout(() => {
          kiss.remove();
        }, 400);
      };

      zone.appendChild(kiss);

      setTimeout(() => {
        if (kiss.parentNode === zone && !kiss.classList.contains('exploding')) {
          kiss.remove();
        }
      }, 1000);
    }, 800);
  }

  function showCelebration() {
    const zone = document.getElementById('collection-zone');

    const muah = document.createElement('div');
    muah.className = 'muah-text';
    muah.innerText = 'muah muah! 💋';
    zone.appendChild(muah);

    const positions = [
      { t: '5%', l: '5%' },
      { t: '5%', l: '75%' },
      { t: '65%', l: '5%' },
      { t: '65%', l: '75%' },
    ];

    positions.forEach((pos) => {
      const bigKiss = document.createElement('div');
      bigKiss.className = 'big-kiss';
      bigKiss.innerText = '💋';
      bigKiss.style.top = pos.t;
      bigKiss.style.left = pos.l;
      zone.appendChild(bigKiss);
    });

    document.getElementById('love-you-text').classList.remove('hidden');
    document.getElementById('to-stage-4').classList.remove('hidden');
  }

  document.getElementById('to-stage-4').onclick = () => goToStage(4);

  // --- STAGE 4: Foggy Cipher ---
  function initFogCanvas() {
    const canvas = document.getElementById('fog-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const gradient = ctx.createLinearGradient(
      0,
      0,
      canvas.width,
      canvas.height,
    );
    gradient.addColorStop(0, 'rgba(200, 214, 229, 0.95)');
    gradient.addColorStop(1, 'rgba(223, 230, 233, 0.9)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = '24px Caveat';
    ctx.fillStyle = 'rgba(100, 100, 100, 0.3)';
    ctx.textAlign = 'center';
    ctx.fillText('Wipe the glass... 🌫️', canvas.width / 2, canvas.height / 2);

    startRain();

    let isDrawing = false;
    let clearedPixels = 0;

    function scratch(e) {
      if (!isDrawing) return;
      const rect = canvas.getBoundingClientRect();
      const clientX = e.clientX || (e.touches && e.touches[0].clientX);
      const clientY = e.clientY || (e.touches && e.touches[0].clientY);
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(x, y, 30, 0, Math.PI * 2);
      ctx.fill();

      clearedPixels++;
      if (clearedPixels > 100) {
        document.getElementById('finish-btn').classList.remove('hidden');
      }
    }

    function startRain() {
      const container = document.getElementById('rain-background');
      if (!container) return;
      for (let i = 0; i < 50; i++) {
        const drop = document.createElement('div');
        drop.className = 'drop';
        drop.style.left = Math.random() * 100 + '%';
        drop.style.animationDuration = Math.random() * 0.5 + 0.5 + 's';
        drop.style.animationDelay = Math.random() * 2 + 's';
        container.appendChild(drop);
      }
    }

    canvas.addEventListener('mousedown', () => (isDrawing = true));
    canvas.addEventListener('mouseup', () => (isDrawing = false));
    canvas.addEventListener('mousemove', scratch);
    canvas.addEventListener('touchstart', (e) => {
      isDrawing = true;
      scratch(e);
    });
    canvas.addEventListener('touchend', () => (isDrawing = false));
    canvas.addEventListener('touchmove', (e) => {
      e.preventDefault();
      scratch(e);
    });
  }
});
