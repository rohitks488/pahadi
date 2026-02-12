document.addEventListener('DOMContentLoaded', () => {
  const goToStage = (num) => {
    document
      .querySelectorAll('.stage')
      .forEach((s) => s.classList.add('hidden'));
    const target = document.getElementById(`stage-${num}`);
    if (target) target.classList.remove('hidden');

    if (num === 1) startScanner();
    if (num === 3) initMemoryGame();
    if (num === 4) initTimeline();
  };

  // --- STAGE 1: Scanner ---
  function startScanner() {
    const bar = document.getElementById('scan-bar');
    const result = document.getElementById('scan-result');
    const errorAlert = document.getElementById('error-alert');
    const nextBtn = document.getElementById('to-stage-2');
    const digitalBg = document.getElementById('digital-bg');

    let width = 0;
    const interval = setInterval(() => {
      width += 1;
      bar.style.width = width + '%';

      if (width >= 100) {
        clearInterval(interval);
        result.classList.remove('hidden');

        setTimeout(() => {
          errorAlert.classList.remove('hidden');

          // Trigger the Matrix-style digital rain
          if (digitalBg) {
            digitalBg.classList.remove('hidden');
            initDigitalRain();
          }

          setTimeout(() => {
            nextBtn.classList.remove('hidden');
          }, 1500);
        }, 1500);
      }
    }, 40);
  }

  function initDigitalRain() {
    const bg = document.getElementById('digital-bg');
    if (!bg) return;
    let content = '';
    // Custom chars for the rain
    const chars = '01LOVE01BBG01CUTU❤️✨';
    for (let i = 0; i < 3000; i++) {
      content += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    bg.innerText = content;

    // Add a subtle flicker effect
    setInterval(() => {
      bg.style.opacity = Math.random() * 0.15 + 0.05;
    }, 150);
  }

  document.getElementById('to-stage-2').onclick = () => {
    const digitalBg = document.getElementById('digital-bg');
    if (digitalBg) digitalBg.classList.add('hidden');
    goToStage(2);
  };

  // --- STAGE 2: Interview ---
  document.getElementById('submit-app').onclick = () => {
    const checked = document.querySelectorAll('.skill-cb:checked').length;
    const feedback = document.getElementById('app-feedback');
    if (checked < 4) {
      feedback.innerText =
        'Application Denied. All skills are mandatory for the CEO position! 😤';
      feedback.classList.remove('hidden');
    } else {
      feedback.innerText =
        'Perfect! Application Approved. Moving to verification... ❤️';
      feedback.classList.remove('hidden');
      setTimeout(() => goToStage(3), 1500);
    }
  };

  // --- STAGE 3: Memory Game ---
  function initMemoryGame() {
    const grid = document.getElementById('memory-grid');
    // Using your specific photos for the pairs
    const photos = [
      '../../public/nomNom.jpeg',
      '../../public/nomNom3.jpeg',
      '../../public/anotherChocolate.jpeg',
      '../../public/Bestchocolate.jpeg',
    ];

    // Duplicate the photos to create pairs (total 8 items)
    let items = [...photos, ...photos];
    let flippedCards = [];
    let matched = 0;

    // Shuffle
    items.sort(() => Math.random() - 0.5);

    grid.innerHTML = '';
    items.forEach((photoPath, index) => {
      const card = document.createElement('div');
      card.className = 'memory-card';
      card.dataset.photo = photoPath;

      // Create the image element
      const img = document.createElement('img');
      img.src = photoPath;
      card.appendChild(img);

      card.onclick = () => {
        if (flippedCards.length < 2 && !card.classList.contains('flipped')) {
          card.classList.add('flipped');
          flippedCards.push(card);

          if (flippedCards.length === 2) {
            if (
              flippedCards[0].dataset.photo === flippedCards[1].dataset.photo
            ) {
              matched++;
              flippedCards = [];
              if (matched === 4) {
                setTimeout(() => {
                  // Show the personalized message
                  const victoryMsg =
                    document.getElementById('memory-victory-msg');
                  victoryMsg.innerText =
                    'My cutu bbg solving puzzles as if she was born for it. I bet you could do it faster than me with one eye closed and from toes ❤️';
                  victoryMsg.classList.remove('hidden');

                  document
                    .getElementById('to-stage-4')
                    .classList.remove('hidden');
                }, 500);
              }
            } else {
              setTimeout(() => {
                flippedCards.forEach((c) => c.classList.remove('flipped'));
                flippedCards = [];
              }, 1000);
            }
          }
        }
      };
      grid.appendChild(card);
    });
  }

  document.getElementById('to-stage-4').onclick = () => goToStage(4);

  // --- STAGE 4: Timeline & Runaway Button ---
  function initTimeline() {
    const timeline = document.getElementById('timeline');
    const history = [
      'Day 7: Where we planted a garden of rose🌹',
      'Day 8: When you linked the stars to my heart',
      'Day 9: Making our custom chocolate bar. 🍫',
      'Day 10: Choosing your own fav teddy. 🧸',
      'Day 11: Made a list of promises.  🤝',
      'Day 12: Hugged for 69 seconds. 🤗',
      'Day 13: That silly pucker scan prank! 🐠',
      'Today: The day everything becomes official once and forever❤️',
    ];
    timeline.innerHTML = '';
    history.forEach((text, i) => {
      setTimeout(() => {
        const item = document.createElement('div');
        item.className = 'timeline-item';
        item.innerText = text;
        timeline.appendChild(item);
        timeline.scrollTop = timeline.scrollHeight;
      }, i * 1000);
    });
  }

  const noBtn = document.getElementById('no-btn');
  const yesBtn = document.getElementById('yes-btn');
  let noCount = 0;
  let hoverTimer;

  const noMessages = [
    'think again cutu 🤨',
    'are you sure? 🥺',
    'really? rethink! 🧐',
    "don't do this... 😭",
    'LAST CHANCE! 🚨',
  ];

  function handleNoEffect() {
    if (noCount < 5) {
      noCount++;

      // 1. Grow Yes, Shrink No
      const yesScale = 1 + noCount * 0.4;
      const noScale = 1 - noCount * 0.15;

      yesBtn.style.transform = `scale(${yesScale})`;
      noBtn.style.transform = `scale(${noScale})`;

      // 2. Update Text
      noBtn.innerText = noMessages[noCount - 1] || 'nope! 🏃‍♀️';

      // 3. Optional: Add a little jiggle to show it's reacting
      noBtn.animate(
        [
          { transform: `scale(${noScale}) translateX(0px)` },
          { transform: `scale(${noScale}) translateX(5px)` },
          { transform: `scale(${noScale}) translateX(-5px)` },
          { transform: `scale(${noScale}) translateX(0px)` },
        ],
        { duration: 200 },
      );

      if (noCount === 5) {
        setTimeout(() => {
          noBtn.style.display = 'none';
          yesBtn.style.transform = `scale(3)`;
          yesBtn.innerText = 'YES! (ONLY OPTION) 😍❤️';
        }, 300);
      }
    }
  }

  // Action 1: If she clicks "No"
  noBtn.onclick = (e) => {
    e.preventDefault();
    handleNoEffect();
  };

  // Action 2: If she hovers for 3 seconds
  noBtn.onmouseenter = () => {
    // Clear any existing timer just in case
    clearTimeout(hoverTimer);

    hoverTimer = setTimeout(() => {
      handleNoEffect();
    }, 3000); // 3 seconds delay
  };

  // Stop the timer if she moves the mouse away before 3 seconds
  noBtn.onmouseleave = () => {
    clearTimeout(hoverTimer);
  };

  yesBtn.onclick = () => {
    alert('I KNEW IT! Welcome home, my Queen. ❤️');
    goToStage(5);
  };
  // Start at Stage 1
  goToStage(1);
});
