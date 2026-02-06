document.addEventListener('DOMContentLoaded', () => {
  const bar = document.getElementById('chocolate-bar');
  const baseBtns = document.querySelectorAll('.base-btn');
  const toppingBtns = document.querySelectorAll('.topping-btn');
  const wrapBtn = document.getElementById('wrap-btn');
  const makerStage = document.getElementById('maker-stage');
  const revealStage = document.getElementById('reveal-stage');
  const finalContainer = document.getElementById('final-bar-container');

  // 1. Base Selection Logic
  baseBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const color = btn.getAttribute('data-color');
      bar.style.background = color;

      // Visual feedback for selection
      baseBtns.forEach((b) => (b.style.outline = 'none'));
      btn.style.outline = '3px solid gold';
      btn.style.outlineOffset = '2px';
    });
  });

  // 2. Topping Sprinkle Logic
  toppingBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const emoji = btn.getAttribute('data-emoji');
      if (!emoji) return;

      // Add 4 pieces of topping per click
      for (let i = 0; i < 4; i++) {
        const topping = document.createElement('span');
        topping.className = 'topping-item';
        topping.innerText = emoji;

        const rot = Math.random() * 360;
        topping.style.setProperty('--rot', `${rot}deg`);

        topping.style.left = Math.random() * 85 + 5 + '%';
        topping.style.top = Math.random() * 75 + 10 + '%';
        topping.style.transform = `rotate(${rot}deg)`;

        bar.appendChild(topping);
      }
    });
  });

  // 3. Wrapping & Final Reveal Logic
  wrapBtn.addEventListener('click', () => {
    wrapBtn.innerText = 'Wrapping your love in gold... ✨';
    wrapBtn.disabled = true;

    // Transition delay to simulate "processing"
    setTimeout(() => {
      makerStage.classList.add('hidden');
      revealStage.classList.remove('hidden');

      // Transform bar to Vertical Gift state
      bar.classList.add('bar-vertical');
      bar.style.boxShadow = '0 0 50px rgba(255, 215, 0, 0.6)';
      finalContainer.appendChild(bar);

      // Trigger text fade-in and set up the Photo Swap Button
      setTimeout(() => {
        revealStage.classList.add('reveal-active');

        // Setup the "Perfect Chocolate" swap logic
        const swapBtn = document.getElementById('swap-photo-btn');
        const initialMsg = document.getElementById('initial-message');
        const questionArea = document.getElementById('interactive-question');
        const dynamicText = document.getElementById('dynamic-text');
        const yesBtn = document.getElementById('yesBtn');
        const noBtn = document.getElementById('noBtn');
        const finalMsg = document.getElementById('final-love-msg');

        let noCount = 0;
        const noResponses = [
          'Ok then, is this the only chocolate you would want to rub on your hulu lulu? 😏',
          'Ok ok got it now, this is the only chocolate jisko kha k nashe m chali jati h tu.. right? 🥴🍫',
        ];

        if (swapBtn) {
          swapBtn.addEventListener('click', () => {
            bar.classList.add('perfect-chocolate');

            // Hide the initial message and show the interactive question
            initialMsg.classList.add('hidden');
            questionArea.classList.remove('hidden');
          });
        }

        // "Naiii" button logic
        if (noBtn) {
          noBtn.addEventListener('click', () => {
            if (noCount < noResponses.length) {
              dynamicText.innerText = noResponses[noCount];
              noCount++;
            } else {
              // If they keep saying no, hide the button and make them say yes!
              noBtn.style.display = 'none';
              dynamicText.innerText = 'Ab toh haan bolna hi padega! 😤';
            }
          });
        }

        // "Yes obviously" button logic
        if (yesBtn) {
          yesBtn.addEventListener('click', () => {
            questionArea.classList.add('hidden');
            finalMsg.classList.remove('hidden');

            // Add some extra sparkle to the bar
            bar.style.boxShadow = '0 0 60px #ff0040';
          });
        }
      }, 200);
    }, 1500);
  });
});
