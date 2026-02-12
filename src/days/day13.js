document.addEventListener('DOMContentLoaded', () => {
  const stages = document.querySelectorAll('.stage');

  const goToStage = (num) => {
    stages.forEach((s) => s.classList.add('hidden'));
    const target = document.getElementById(`stage-${num}`);
    if (target) {
      target.classList.remove('hidden');
    }
    if (num === 4) initFogCanvas();
  };

  // Start with Stage 1
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

  // --- STAGE 2: Pucker-Up Prank ---
  const startScanBtn = document.getElementById('start-calibration');
  const loadingOverlay = document.getElementById('loading-overlay');
  const prankResult = document.getElementById('prank-result');
  const nextBtn2 = document.getElementById('to-stage-3');
  const scanLine = document.querySelector('.scan-line-horizontal');

  startScanBtn.onclick = () => {
    startScanBtn.innerText = 'Scanning... HOLD STILL!';
    startScanBtn.disabled = true;

    // Step 1: Fake scanning for 2.5 seconds
    setTimeout(() => {
      // Step 2: "Freeze" the system
      loadingOverlay.classList.remove('hidden');
      scanLine.style.animationPlayState = 'paused';

      // Step 3: Let her hold the face for 4 seconds of confusion
      setTimeout(() => {
        loadingOverlay.innerHTML =
          "<div style='font-size:3rem'>📸</div><br>CLICK! <br><br> Captured!";

        setTimeout(() => {
          loadingOverlay.classList.add('hidden');
          prankResult.classList.remove('hidden');
          startScanBtn.classList.add('hidden');
          nextBtn2.classList.remove('hidden');
        }, 1500);
      }, 4000);
    }, 2500);
  };

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
      kiss.style.position = 'absolute';
      kiss.style.fontSize = '2.5rem';
      kiss.style.left = `${Math.random() * 85}%`;
      kiss.style.top = `${Math.random() * 85}%`;
      kiss.style.cursor = 'pointer';

      kiss.onclick = () => {
        score++;
        scoreDisplay.innerText = score;
        kiss.innerText = '💖';
        kiss.style.transform = 'scale(2)';
        kiss.style.opacity = '0';
        kiss.style.transition = 'all 0.4s ease';
        setTimeout(() => kiss.remove(), 400);
      };

      zone.appendChild(kiss);
      setTimeout(() => {
        if (kiss.parentNode) kiss.remove();
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
      { t: '15%', l: '15%' },
      { t: '15%', l: '85%' },
      { t: '85%', l: '15%' },
      { t: '85%', l: '85%' },
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

    ctx.fillStyle = 'rgba(200, 214, 229, 0.95)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = '24px Caveat';
    ctx.fillStyle = 'rgba(100, 100, 100, 0.3)';
    ctx.textAlign = 'center';
    ctx.fillText('Wipe the glass... 🌫️', canvas.width / 2, canvas.height / 2);

    startRain('rain-background');

    let isDrawing = false;
    let clearedPixels = 0;

    function scratch(e) {
      if (!isDrawing) return;
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX || (e.touches && e.touches[0].clientX)) - rect.left;
      const y = (e.clientY || (e.touches && e.touches[0].clientY)) - rect.top;

      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(x, y, 35, 0, Math.PI * 2);
      ctx.fill();

      clearedPixels++;
      if (clearedPixels > 80)
        document.getElementById('flip-to-back-btn').classList.remove('hidden');
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

  // --- FINAL: Flip Trigger ---
  const flipBtn = document.getElementById('flip-to-back-btn');
  const mainCard = document.getElementById('main-flip-card');

  if (flipBtn) {
    flipBtn.onclick = () => {
      mainCard.classList.add('is-flipped');
      startRain('photo-rain-overlay');
    };
  }

  function startRain(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = '';
    for (let i = 0; i < 60; i++) {
      const drop = document.createElement('div');
      drop.className = 'drop';
      drop.style.left = Math.random() * 100 + '%';
      drop.style.animationDuration = Math.random() * 0.5 + 0.5 + 's';
      drop.style.animationDelay = Math.random() * 2 + 's';
      container.appendChild(drop);
    }
  }

  // Background Floating Kiss Emojis
  const bgContainer = document.getElementById('bg-emojis');
  const kissEmojis = ['💋', '😘', '🥰', '💖', '💄', '🌹', '✨', '💘'];

  function spawnKissEmoji() {
    if (!bgContainer) return;
    const emoji = document.createElement('div');
    emoji.className = 'floating-emoji';
    emoji.innerText = kissEmojis[Math.floor(Math.random() * kissEmojis.length)];

    // Random horizontal position
    emoji.style.left = Math.random() * 100 + 'vw';

    // Random size
    const size = Math.random() * (2.5 - 1) + 1;
    emoji.style.fontSize = `${size}rem`;

    // Random duration
    const duration = Math.random() * (15 - 8) + 8;
    emoji.style.animationDuration = `${duration}s`;

    // Random opacity
    emoji.style.opacity = Math.random() * (0.5 - 0.2) + 0.2;

    bgContainer.appendChild(emoji);

    // Remove emoji after animation ends
    setTimeout(() => emoji.remove(), duration * 1000);
  }

  // Initial spawn and interval
  setInterval(spawnKissEmoji, 2000);
  for (let i = 0; i < 6; i++) setTimeout(spawnKissEmoji, i * 400);
});
