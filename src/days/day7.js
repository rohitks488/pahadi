let roseCount = 0;
const plantedPositions = [];

const messages = [
  'I was going to send you a whole garden, but then I realized no rose is as beautiful as your khi khi khi khi smile! 🌹😜',
  "Batman's favorite flower is officially you! 🦇❤️",
  "I'm so lucky to have you in my universe.",
  "You're beautiful!",
  'You make my heart bloom like no one else can! ✨',
  'A rose for my rose.🌹',
  'Blooming for you!',
  'You are the rarest rose in the garden of my life. 🌹',
  'Roses are red, violets are blue, I might be a Batman, but I’m nothing without you. ❤️',
  'To the person who makes my life bloom every single day. Happy Rose Day, my love! 🌸',
];

// Helper to manage unique message delivery
let messageQueue = [];

function getNextMessage() {
  if (messageQueue.length === 0) {
    // Refill and shuffle the queue when empty
    messageQueue = [...messages].sort(() => Math.random() - 0.5);
  }
  return messageQueue.pop();
}

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

      // Show message every 3 roses
      if (roseCount % 3 === 0) {
        const oldMsg = document.querySelector('.sweet-msg');
        if (oldMsg) oldMsg.remove();

        const randomMsg = getNextMessage();
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
