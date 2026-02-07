document.addEventListener('DOMContentLoaded', () => {
  const starsBg = document.getElementById('stars-bg');
  const constellationArea = document.getElementById('constellation-area');
  const svg = document.getElementById('constellation-lines');

  // 1. Generate background stars
  for (let i = 0; i < 150; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    const size = Math.random() * 3;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.setProperty('--duration', `${2 + Math.random() * 4}s`);
    starsBg.appendChild(star);
  }

  // 2. Constellation Game Logic (Heart Shape)
  const points = [
    { x: 150, y: 100 }, // Top middle notch
    { x: 220, y: 50 }, // Right hump
    { x: 270, y: 100 }, // Right side
    { x: 150, y: 250 }, // Bottom point
    { x: 30, y: 100 }, // Left side
    { x: 80, y: 50 }, // Left hump
    { x: 150, y: 100 }, // Back to start
  ];

  const starMessages = [
    "You're the brightest star in my sky, my bluestar... ✨",
    'Your smile lights up my whole world... 😊',
    'Every moment with you is magical and will stay with me till the end... 🪄',
    'I wish I had found you with the very first breath you took in this world... 🍀',
    "You've captured my Koro Koro... ❤️",
    'And now, I have a question... 💍',
  ];

  let currentStep = 0;
  const gameStars = [];

  points.forEach((p, i) => {
    if (i === points.length - 1) return; // Don't create a duplicate star for the closing point

    const star = document.createElement('div');
    star.className = 'game-star';
    star.style.left = `${p.x - 6}px`;
    star.style.top = `${p.y - 6}px`;

    star.addEventListener('click', (e) => {
      if (i === currentStep) {
        star.classList.add('active');

        // Small click burst
        createBurst(e.clientX, e.clientY, '#ff4081', 15, false);

        // Grand background fireworks!
        triggerBackgroundFireworks();

        const msgElement = document.getElementById('star-message');
        if (msgElement && starMessages[currentStep]) {
          msgElement.style.animation = 'none';
          msgElement.offsetHeight; // trigger reflow
          msgElement.innerText = starMessages[currentStep];
          msgElement.style.animation = 'popIn 0.5s ease';
        }

        if (currentStep > 0) {
          drawLine(points[currentStep - 1], points[currentStep]);
        }
        currentStep++;

        if (currentStep === points.length - 1) {
          // Final line to close the heart
          drawLine(points[currentStep - 1], points[currentStep]);
          setTimeout(revealProposal, 1000);
        }
      }
    });

    constellationArea.appendChild(star);
    gameStars.push(star);
  });

  function triggerBackgroundFireworks() {
    const colors = ['#ff4081', '#00e5ff', '#ffeb3b', '#ffffff'];
    const burstCount = 3; // Number of separate firework bursts

    for (let i = 0; i < burstCount; i++) {
      setTimeout(() => {
        // Pick a random spot outside the center (so it's not hidden by the card)
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        const color = colors[Math.floor(Math.random() * colors.length)];
        createBurst(x, y, color, 30, true);
      }, i * 200);
    }
  }

  function createBurst(x, y, color, count, isFirework) {
    for (let i = 0; i < count; i++) {
      const particle = document.createElement('div');
      particle.className = isFirework ? 'firework-particle' : 'particle';

      const size = isFirework ? Math.random() * 5 + 2 : Math.random() * 4 + 2;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.background = color;
      particle.style.boxShadow = `0 0 ${isFirework ? 10 : 5}px ${color}`;

      // Firework physics: further distance
      const angle = Math.random() * Math.PI * 2;
      const velocity = isFirework
        ? Math.random() * 300 + 100
        : Math.random() * 100 + 50;
      const destinationX = Math.cos(angle) * velocity;
      const destinationY = Math.sin(angle) * velocity;

      particle.style.left = `${x}px`;
      particle.style.top = `${y}px`;
      particle.style.opacity = '1';

      const duration = isFirework ? 1 + Math.random() : 0.6 + Math.random();
      particle.style.transition = `all ${duration}s cubic-bezier(0.1, 0.5, 0.3, 1)`;

      document.body.appendChild(particle);

      requestAnimationFrame(() => {
        particle.style.transform = `translate(${destinationX}px, ${destinationY}px) scale(0)`;
        particle.style.opacity = '0';
      });

      setTimeout(() => particle.remove(), duration * 1000);
    }
  }

  function drawLine(p1, p2) {
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', p1.x);
    line.setAttribute('y1', p1.y);
    line.setAttribute('x2', p2.x);
    line.setAttribute('y2', p2.y);
    svg.appendChild(line);
  }

  function revealProposal() {
    document.getElementById('game-stage').classList.add('hidden');
    document.getElementById('proposal-stage').classList.remove('hidden');
  }

  // 3. Button Actions
  const yesBtn = document.getElementById('yesBtn');
  const noBtn = document.getElementById('noBtn');
  // ... existing code ...
  let noClickCount = 0;

  yesBtn.addEventListener('click', () => {
    // Skipping message-stage directly to celebration-stage for now
    document.getElementById('proposal-stage').classList.add('hidden');
    document.getElementById('celebration-stage').classList.remove('hidden');

    // Update the caption for the celebration stage
    const caption = document.querySelector('.orbit-caption');
    if (caption) {
      caption.innerText =
        'now both of us are revolving around whole worlds doing random stuff and still laughing like idiots all day ❤️';
    }

    createSupernova();
    startMeteors();
    startLoveRockets(); // New effect!
  });

  function startLoveRockets() {
    setInterval(() => {
      if (
        document
          .getElementById('celebration-stage')
          .classList.contains('hidden')
      )
        return;

      const rocket = document.createElement('div');
      rocket.className = 'love-rocket';

      // Randomly choose between rocket and flying kiss
      const items = ['🚀', '😘', '✨', '💖'];
      rocket.innerText = items[Math.floor(Math.random() * items.length)];

      // Randomize start position around the edges
      const side = Math.floor(Math.random() * 4);
      let startX, startY, destX, destY;

      if (side === 0) {
        // Bottom
        startX = Math.random() * window.innerWidth;
        startY = window.innerHeight + 50;
        destX = (Math.random() - 0.5) * 1000;
        destY = -1000;
      } else if (side === 1) {
        // Left
        startX = -50;
        startY = Math.random() * window.innerHeight;
        destX = 1000;
        destY = (Math.random() - 0.5) * 1000;
      } else {
        // Right or Top
        startX = window.innerWidth + 50;
        startY = Math.random() * window.innerHeight;
        destX = -1000;
        destY = (Math.random() - 0.5) * 1000;
      }

      rocket.style.left = `${startX}px`;
      rocket.style.top = `${startY}px`;
      rocket.style.setProperty('--travel', `translate(${destX}px, ${destY}px)`);

      // Rotate slightly for the kiss/sparkles, or full rotation for rocket
      if (rocket.innerText === '🚀') {
        const angle = Math.atan2(destY, destX) * (180 / Math.PI) + 90;
        rocket.style.transform = `rotate(${angle}deg)`;
      } else {
        rocket.style.transform = `rotate(${Math.random() * 360}deg)`;
      }

      document.body.appendChild(rocket);
      setTimeout(() => rocket.remove(), 4000);
    }, 600); // Slightly faster for more "magic"
  }

  sendBtn.addEventListener('click', async () => {
    const message = loveLetter.value;
    if (!message.trim()) {
      alert('Please write a little something! ❤️');
      return;
    }

    sendBtn.innerText = 'Sending...';
    sendBtn.disabled = true;

    try {
      // Replace 'YOUR_FORMSPREE_ID' with the ID you get from Formspree.io
      // Or use this direct mailto approach if you don't want a service:
      const response = await fetch('https://formspree.io/f/xdaajynw', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'visitor@valentines.com',
          message: message,
          _subject: 'A message from your Valentine! ❤️',
        }),
      });

      if (response.ok) {
        document.getElementById('message-stage').classList.add('hidden');
        document.getElementById('celebration-stage').classList.remove('hidden');
      } else {
        throw new Error();
      }
    } catch (error) {
      // Fallback: If service fails, just show the celebration anyway
      console.error('Email failed, showing celebration anyway.');
      document.getElementById('message-stage').classList.add('hidden');
      document.getElementById('celebration-stage').classList.remove('hidden');
    }
  });

  // The runaway "No" button logic
  noBtn.addEventListener('mouseover', () => {
    noClickCount++;

    if (noClickCount <= 4) {
      // Dodge within a small area near the card
      const x = (Math.random() - 0.5) * 300; // Move up to 150px left or right
      const y = (Math.random() - 0.5) * 200; // Move up to 100px up or down
      noBtn.style.transform = `translate(${x}px, ${y}px)`;
      noBtn.style.transition = 'transform 0.2s ease-out';
    } else {
      // Fly far away out of the screen
      const directions = [
        { x: -1000, y: -1000 },
        { x: 1000, y: -1000 },
        { x: -1000, y: 1000 },
        { x: 1000, y: 1000 },
      ];
      const dir = directions[Math.floor(Math.random() * directions.length)];
      noBtn.style.transform = `translate(${dir.x}px, ${dir.y}px)`;
      noBtn.style.transition = 'transform 1s ease-in';
      noBtn.style.opacity = '0';
      setTimeout(() => {
        noBtn.style.display = 'none';
      }, 1000);
    }
  });

  function createSupernova() {
    // Purely visual flair
    starsBg.style.transition = 'background 2s';
    starsBg.style.background =
      'radial-gradient(circle, #4a148c 0%, #090a0f 100%)';
  }

  // --- New Interactive Features ---

  function startMeteors() {
    setInterval(() => {
      const meteor = document.createElement('div');
      meteor.className = 'meteor';
      meteor.style.left = `${Math.random() * 100}%`;
      meteor.style.top = `${Math.random() * 40}%`;
      starsBg.appendChild(meteor);
      setTimeout(() => meteor.remove(), 2000);
    }, 1500);
  }

  // Make astronauts react to cursor
  const astroContainer = document.getElementById('astro-container');
  const astro1 = document.getElementById('astro-1');
  const astro2 = document.getElementById('astro-2');

  document.addEventListener('mousemove', (e) => {
    if (
      !document.getElementById('celebration-stage').classList.contains('hidden')
    ) {
      // Make the astronauts "float" towards the mouse slightly
      const moveX = (e.clientX - window.innerWidth / 2) / 50;
      const moveY = (e.clientY - window.innerHeight / 2) / 50;
      astroContainer.style.transform = `translate(${moveX}px, ${moveY}px)`;

      // Show the second astronaut (the pair) in celebration mode
      astro2.classList.remove('hidden');
    }
  });
});
