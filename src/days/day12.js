document.addEventListener('DOMContentLoaded', () => {
  // Stage Transitions
  const stages = document.querySelectorAll('.stage');
  const goToStage = (num) => {
    stages.forEach((s) => s.classList.add('hidden'));
    document.getElementById(`stage-${num}`).classList.remove('hidden');
  };

  // --- STAGE 1: Random Hug Generator ---
  const hugTypes = [
    'The Bear Hug 🐻',
    'The Lift-and-Twirl 🌪️',
    "The 'Never Let Go' Hug ♾️",
    'The Back Hug 🤗',
    'The Forehead-Rest Hug 💆‍♂️',
    'The Cozy Blanket Hug 🧶',
    "The 'Pick-me-up' Hug 🚀",
  ];
  const spinBtn = document.getElementById('spin-btn');
  const hugDisplay = document.getElementById('hug-display');
  const hugDescription = document.getElementById('hug-description');
  const toStage2 = document.getElementById('to-stage-2');

  const hugDescriptions = {
    'The Bear Hug 🐻': 'A tight, squeeze-all-your-worries-away kind of hug. Ekdum cheep dunga, tb tk cheepunga jb tk hulu lulu k marks mere chest m na ho jaye',
    'The Lift-and-Twirl 🌪️':
      'For when the excitement to see you is just too much! ghumi ghumi krwa dunga, fir chakkar kha k bed m girna and mere kissi se uth jana snow white jaisa',
    "The 'Never Let Go' Hug ♾️":
      'The kind of hug where time stops and nothing else matters. Even the surroundings fade and I just wanna keep holdin you tight close to me',
    'The Back Hug 🤗':
      'A surprise wrap-around to let you know I’m right here. Will hold your gulu mulu tummy from behind while giving you kisses in neck',
    'The Forehead-Rest Hug 💆‍♂️':
      'Quiet, peaceful, and filled with so much tenderness. Will remind you to not think so much, I am here to help you out always, anytime, anywhere with anything',
    'The Cozy Blanket Hug 🧶':
      'Warm, soft, and the best place to be on a rainy day. Will wrap you around my arm and legs and give u lil spanks on bum if you do badmashi 😏',
    "The 'Pick-me-up' Hug 🚀":
      'A little lift to make you feel like you’re on top of the world. ',
  };

  spinBtn.addEventListener('click', () => {
    spinBtn.disabled = true;
    hugDescription.innerText = '';
    let count = 0;
    const interval = setInterval(() => {
      hugDisplay.innerText =
        hugTypes[Math.floor(Math.random() * hugTypes.length)];
      count++;
      if (count > 10) {
        clearInterval(interval);
        const selectedHug = hugDisplay.innerText;
        hugDescription.innerText = hugDescriptions[selectedHug] || '';
        spinBtn.innerText = 'Spin Again? 💫';
        spinBtn.disabled = false;
        toStage2.classList.remove('hidden');
      }
    }, 100);
  });

  document.getElementById('to-stage-2').onclick = () => goToStage(2);

  // --- STAGE 2: Anatomy of a Hug ---
  const hotspots = document.querySelectorAll('.hotspot');
  const anatomyMsg = document.getElementById('anatomy-msg');
  let clickedHotspots = new Set();

  hotspots.forEach((spot, idx) => {
    spot.addEventListener('click', () => {
      anatomyMsg.innerText = spot.getAttribute('data-msg');
      spot.style.animation = 'none';
      spot.style.background = '#ffafcc';
      clickedHotspots.add(idx);

      if (clickedHotspots.size === hotspots.length) {
        document.getElementById('to-stage-3').classList.remove('hidden');
      }
    });
  });

  document.getElementById('to-stage-3').onclick = () => goToStage(4); // Skipping 3 for now as we merged it

  // --- STAGE 4: Hug Greenhouse ---
  const growBtn = document.getElementById('grow-btn');
  const garden = document.getElementById('garden-view');
  const progressBar = document.getElementById('grow-progress');
  let growInterval;
  let progress = 0;
  const flowers = ['🌸', '🌹', '🌷', '🌻', '🌺', '🌼'];

  const startGrowing = () => {
    growInterval = setInterval(() => {
      progress += 1;
      progressBar.style.width = `${progress}%`;

      if (progress % 5 === 0) {
        const f = document.createElement('span');
        f.className = 'flower';
        f.innerText = flowers[Math.floor(Math.random() * flowers.length)];
        f.style.left = Math.random() * 90 + '%';
        f.style.top = Math.random() * 80 + '%';
        garden.appendChild(f);
      }

      if (progress >= 100) {
        stopGrowing();
        growBtn.innerText = 'Garden Full! ❤️';
        growBtn.disabled = true;
        setTimeout(() => goToStage(5), 1500);
      }
    }, 50);
  };

  const stopGrowing = () => clearInterval(growInterval);

  growBtn.addEventListener('mousedown', startGrowing);
  growBtn.addEventListener('mouseup', stopGrowing);
  growBtn.addEventListener('mouseleave', stopGrowing);
  growBtn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    startGrowing();
  });
  growBtn.addEventListener('touchend', stopGrowing);

  // --- STAGE 5: Ultimate Hug Timer ---
  const hugTimerBtn = document.getElementById('hug-timer-btn');
  const timerDisplay = document.getElementById('timer');
  const feedback = document.getElementById('hug-feedback');
  let timerInterval;
  let seconds = 0;

  const messages = [
    { time: 2, msg: 'Warmth loading... 🌡️' },
    { time: 5, msg: 'This feels nice... 😊' },
    { time: 10, msg: "Don't ever let go... ❤️" },
    { time: 20, msg: 'I can feel your heartbeat... 💓' },
    { time: 30, msg: 'Pure bliss. Stay here forever. ✨' },
    { time: 40, msg: 'No doubt the best that I have ever felt in my entire life is when I was wrapped around your arms so tight that I could feel your heart beating fast for me and you kissing on my neck. Love you cutuuuu ❤️' },
  ];

  const startHug = () => {
    timerInterval = setInterval(() => {
      seconds += 0.1;
      timerDisplay.innerText = seconds.toFixed(1) + 's';

      // Warm up the background
      const lightness = Math.max(70, 95 - seconds);
      document.body.style.background = `hsl(340, 100%, ${lightness}%)`;

      const currentMsg = messages.findLast((m) => seconds >= m.time);
      if (currentMsg) feedback.innerText = currentMsg.msg;

      if (seconds >= 10) {
        document.getElementById('final-back-btn').classList.remove('hidden');
      }
    }, 100);
  };

  const endHug = () => {
    clearInterval(timerInterval);
  };

  hugTimerBtn.addEventListener('mousedown', startHug);
  hugTimerBtn.addEventListener('mouseup', endHug);
  hugTimerBtn.addEventListener('mouseleave', endHug);
  hugTimerBtn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    startHug();
  });
  hugTimerBtn.addEventListener('touchend', endHug);

  // --- Background Floating Emojis ---
  const bgContainer = document.getElementById('bg-emojis');
  const emojis = [
    '🤗',
    '🫂',
    '❤️',
    '✨',
    '🧸',
    '🥰',
    '💖',
    '☁️',
    '🌸',
    '🐻',
  ];

  function createEmoji() {
    const emoji = document.createElement('div');
    emoji.className = 'floating-emoji';
    emoji.innerText = emojis[Math.floor(Math.random() * emojis.length)];

    // Random horizontal position
    emoji.style.left = Math.random() * 100 + 'vw';

    // Random size
    const size = Math.random() * (2 - 1) + 1;
    emoji.style.fontSize = `${size}rem`;

    // Random duration and delay
    const duration = Math.random() * (15 - 8) + 8;
    emoji.style.animationDuration = `${duration}s`;

    bgContainer.appendChild(emoji);

    // Remove emoji after animation ends
    setTimeout(() => {
      emoji.remove();
    }, duration * 1000);
  }

  // Spawn a new emoji every 1.5 seconds
  setInterval(createEmoji, 1500);
  // Initial batch
  for(let i=0; i<5; i++) setTimeout(createEmoji, i * 500);
});
