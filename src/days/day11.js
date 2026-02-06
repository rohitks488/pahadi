document.addEventListener('DOMContentLoaded', () => {
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

    // Add falling stars to the PAGE background (outside the card)
    for (let i = 0; i < 8; i++) {
      const shooter = document.createElement('div');
      shooter.className = 'bg-falling-star';
      shooter.innerText = '✨';
      shooter.style.left = Math.random() * 100 + 'vw';
      shooter.style.animationDelay = Math.random() * 5 + 's';
      document.body.appendChild(shooter);
    }

    // --- KEEPING YOUR FAVORITE ANIMATION BELOW ---
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
          document.getElementById('to-stage-3').classList.remove('hidden');
        }
      });
      sky.appendChild(star);
    });
  }

  document.getElementById('to-stage-3').addEventListener('click', () => {
    document.getElementById('stage-2').classList.add('hidden');
    document.getElementById('stage-3').classList.remove('hidden');
  });

  // --- Stage 3: Encryption ---
  const openBtn = document.getElementById('open-vault');
  const correctCode = '3021'; // Set your secret code here (e.g., Feb 14)

  openBtn.addEventListener('click', () => {
    const input = document.getElementById('vault-code').value;
    if (input === correctCode) {
      document.querySelector('.vault-input').classList.add('hidden');
      document.getElementById('vault-content').classList.remove('hidden');
      document.getElementById('final-text').innerText =
        'You unlocked my heart! I promise to stay by your side forever, through every high and low. ♾️❤️';
    } else {
      alert('Wrong code! Think about a special date... 🤔');
    }
  });
});
