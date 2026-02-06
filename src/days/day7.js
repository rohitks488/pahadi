let roseCount = 0;
const plantedPositions = [];

const messages = [
  "You're beautiful!",
  'My favorite flower is you.',
  'Every rose reminds me of your smile.',
  "I'm so lucky to have you.",
  'You make my heart bloom!',
  'A rose for my rose.',
  'Blooming for you!',
];

document.addEventListener('DOMContentLoaded', () => {
  const garden = document.getElementById('garden');
  const plantBtn = document.getElementById('plantBtn');
  const counterText = document.getElementById('counter-text');
  const envelope = document.getElementById('envelope');

  if (plantBtn && garden) {
    plantBtn.addEventListener('click', () => {
      let bestX,
        bestY,
        foundSpot = false,
        attempts = 0;
      while (!foundSpot && attempts < 25) {
        const testX = Math.floor(Math.random() * 85) + 5;
        const testY = Math.floor(Math.random() * 35) + 52;
        const tooClose = plantedPositions.some(
          (p) => Math.sqrt((p.x - testX) ** 2 + (p.y - testY) ** 2) < 12,
        );
        if (!tooClose || attempts === 24) {
          bestX = testX;
          bestY = testY;
          foundSpot = true;
        }
        attempts++;
      }
      plantedPositions.push({ x: bestX, y: bestY });
      roseCount++;
      const newRose = document.createElement('span');
      newRose.className = 'rose-pop';
      newRose.innerText = '🌹';
      newRose.style.left = `${bestX}%`;
      newRose.style.top = `${bestY}%`;
      garden.appendChild(newRose);
      if (counterText) counterText.innerText = `Roses planted: ${roseCount}`;

      if (roseCount % 5 === 0) {
        const oldMsg = document.querySelector('.sweet-msg');
        if (oldMsg) oldMsg.remove();

        const randomMsg = messages[Math.floor(Math.random() * messages.length)];
        const msgPopup = document.createElement('p');
        msgPopup.className = 'sweet-msg';
        msgPopup.innerText = randomMsg;

        // Delay adding the message to trigger the animation
        setTimeout(() => {
          garden.after(msgPopup);
        }, 10);
      }
    });
  }

  if (envelope) {
    envelope.addEventListener('click', () => {
      envelope.classList.toggle('open');
    });
  }
});
