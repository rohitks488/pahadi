document.addEventListener('DOMContentLoaded', () => {
  const stages = document.querySelectorAll('.stage');

  // Stage Transitions
  const goToStage = (num) => {
    stages.forEach((s) => s.classList.add('hidden'));
    const target = document.getElementById(`stage-${num}`);
    if (target) {
      target.classList.remove('hidden');
    }
  };

  // --- Stage 1: Contract ---
  const signBtn = document.getElementById('sign-contract');
  signBtn.addEventListener('click', () => {
    const name = document.getElementById('partner-name').value.trim();
    if (!name) {
      alert('Please sign the contract first! ❤️');
      return;
    }
    document.getElementById('stage-1').classList.add('hidden');
    document.getElementById('stage-2').classList.remove('hidden');
    initStarrySky();
  });

  // --- Stage 2: Starry Night ---
  const promises = [
    'I promise to always be your safe place/arms. ✨',
    'I promise to listen to your long chatpati stories. 🗣️',
    "I promise to never go to sleep angry at you. Because I can't stay angry from you for more than 2 mins. 🌙",
    'I promise to love every version of you and become every version of myself which you ever wished for ❤️',
    'I promise to take you to udaipur mahal and every other place and do umm hmmmm with you😘',
    'I promise to be your biggest cheerleader in everything you do (even when you are beating me) 📣',
  ];
  let starsLit = 0;

  function initStarrySky() {
    const sky = document.getElementById('star-sky');
    const msgArea = document.getElementById('star-message');

    // Add falling stars to the PAGE background
    for (let i = 0; i < 8; i++) {
      const shooter = document.createElement('div');
      shooter.className = 'bg-falling-star';
      shooter.innerText = '✨';
      shooter.style.left = Math.random() * 100 + 'vw';
      shooter.style.animationDelay = Math.random() * 5 + 's';
      document.body.appendChild(shooter);
    }

    // Decoration stars
    for (let i = 0; i < 15; i++) {
      const decoration = document.createElement('div');
      decoration.className = 'star';
      decoration.innerText = '✨';
      decoration.style.left = Math.random() * 90 + 5 + '%';
      decoration.style.top = Math.random() * 90 + 5 + '%';
      decoration.style.fontSize = '0.8rem';
      decoration.style.opacity = '0.5';
      decoration.style.pointerEvents = 'none';
      sky.appendChild(decoration);
    }

    promises.forEach((text, i) => {
      const star = document.createElement('div');
      star.className = 'star';
      star.innerText = '⭐';
      star.style.left = Math.random() * 80 + 10 + '%';
      star.style.top = Math.random() * 80 + 10 + '%';

      star.addEventListener('click', () => {
        if (star.style.opacity === '0.3') return;
        star.style.transform = 'scale(2)';
        star.style.opacity = '0.3';
        msgArea.innerText = text;
        msgArea.classList.remove('hidden');
        starsLit++;

        if (starsLit === promises.length) {
          document.getElementById('to-prank-stage').classList.remove('hidden');
        }
      });
      sky.appendChild(star);
    });
  }

  document.getElementById('to-prank-stage').addEventListener('click', () => {
    document.getElementById('stage-2').classList.add('hidden');
    document.getElementById('stage-prank').classList.remove('hidden');
  });

  // --- Stage: Prank Stage Logic ---
  // ... existing code ...
  // --- Stage: Prank Stage Logic ---
  const prankSignBtn = document.getElementById('prank-sign-btn');
  const prankText = document.getElementById('prank-promise-text');
  const prankFeedback = document.getElementById('prank-feedback');
  let prankStep = 1;

  prankSignBtn.addEventListener('click', () => {
    const sig = document.getElementById('prank-signature').value.trim();
    if (!sig) {
      alert('Aise kaise? Sign karo pehle! ❤️');
      return;
    }

    if (prankStep === 1) {
      // Prank 1: Nangu Pangu
      prankText.innerText =
        'I will stay nangu pangu by your side always liluuuuuuu 😛';
      prankSignBtn.disabled = true;

      setTimeout(() => {
        prankFeedback.innerText =
          'just kidding just kidding cutu, now check ❤️';
        prankFeedback.classList.remove('hidden');

        setTimeout(() => {
          prankText.innerText =
            'I will stay by your side forever mera liluuuuuu ❤️';
          // We keep the feedback visible here while she signs again
          document.getElementById('prank-signature').value = '';
          prankSignBtn.disabled = false;
          prankStep = 2;
        }, 5000);
      }, 1500);
    } else if (prankStep === 2) {
      // Hide previous feedback when she clicks for the second prank
      prankFeedback.classList.add('hidden');

      // Prank 2: Red Bra
      prankText.innerText =
        'I will stay in red bra and phool wale umm hmm by your side always gobarrrrr 😛';
      prankSignBtn.disabled = true;

      setTimeout(() => {
        prankFeedback.innerText =
          'just kiddd just kidding pyarii pahadi meri, ab dekh ❤️';
        prankFeedback.classList.remove('hidden');

        setTimeout(() => {
          prankText.innerText =
            'I will stay by your side forever mera liluuuuuu ❤️';
          // Keep feedback visible for the transition to the final step
          document.getElementById('prank-signature').value = '';
          prankSignBtn.disabled = false;
          prankStep = 3;
        }, 5000);
      }, 1500);
    } else if (prankStep === 3) {
      prankFeedback.classList.add('hidden');

      // Final: 1cm Cheepa k
      prankText.innerText =
        'I will stay 1cm cheepa k by your side always lilumannnn 😘';
      prankSignBtn.disabled = true;
      setTimeout(() => {
        document.getElementById('stage-prank').classList.add('hidden');
        document.getElementById('stage-3').classList.remove('hidden');
      }, 5000);
    }
  });
  // ... existing code ...

  // --- Stage 3: Encryption / Vault ---
  const openBtn = document.getElementById('open-vault');
  const correctCode = '3021';

  openBtn.addEventListener('click', () => {
    const input = document.getElementById('vault-code').value;
    if (input === correctCode) {
      document.querySelector('.vault-input').classList.add('hidden');
      document.getElementById('vault-content').classList.remove('hidden');
      document.getElementById('final-text').innerText =
        'You unlocked my heart! I promise to stay by your side forever, through every high and low and middle/medium ALSOOO... ♾️❤️. And as long as you are with me(i.e. atleast 4-5 lives), I promise to keep you breathless time to time 😜';
    } else {
      alert('Wrong code! Think about a special date... 🤔');
    }
  });

  // --- Background Floating Emojis ---
  const bgContainer = document.getElementById('bg-emojis');
  const promiseEmojis = ['🤙', '✨', '💖', '🫂', '🤝', '🔒', '🗝️'];

  function spawnEmoji() {
    if (!bgContainer) return;
    const emoji = document.createElement('div');
    emoji.className = 'floating-emoji';
    emoji.innerText =
      promiseEmojis[Math.floor(Math.random() * promiseEmojis.length)];
    emoji.style.left = Math.random() * 100 + 'vw';
    const size = Math.random() * (2 - 1) + 1;
    emoji.style.fontSize = `${size}rem`;
    const duration = Math.random() * (15 - 8) + 8;
    emoji.style.animationDuration = `${duration}s`;
    emoji.style.opacity = Math.random() * (0.5 - 0.2) + 0.2;
    bgContainer.appendChild(emoji);
    setTimeout(() => emoji.remove(), duration * 1000);
  }

  setInterval(spawnEmoji, 2500);
  for (let i = 0; i < 5; i++) setTimeout(spawnEmoji, i * 500);
});
