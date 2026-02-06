document.addEventListener('DOMContentLoaded', () => {
  const spawnArea = document.getElementById('spawn-area');
  const jarInside = document.getElementById('chocolates-inside');
  const counterText = document.getElementById('choco-count');
  const victoryModal = document.getElementById('victory-modal');

  let count = 0;
  const target = 13;
  const chocoEmojis = ['🍫', '🍩', '🍪', '🧁', '🍬', '🌰'];

  function spawnChocolate() {
    if (count >= target) return;

    const choco = document.createElement('div');
    choco.className = 'falling-choco';
    choco.innerText =
      chocoEmojis[Math.floor(Math.random() * chocoEmojis.length)];

    // Randomize starting horizontal position
    const startX = Math.random() * 80 + 10; // keep away from edges
    choco.style.left = `${startX}%`;
    choco.style.top = '-60px';

    spawnArea.appendChild(choco);

    // Use Web Animations API for smooth falling
    const duration = Math.random() * 2000 + 4000;
    const animation = choco.animate(
      [
        { transform: `translateY(0) rotate(0deg)` },
        {
          transform: `translateY(${window.innerHeight + 100}px) rotate(${Math.random() * 720}deg)`,
        },
      ],
      {
        duration: duration,
        easing: 'linear',
      },
    );

    let isCaught = false; // Flag to prevent multiple increments for one chocolate

    const handleCatch = (e) => {
      if (isCaught) return; // Exit if already processed
      isCaught = true;

      e.preventDefault();

      // Get coordinates for the spark effect
      const x =
        e.clientX || (e.touches && e.touches[0] ? e.touches[0].clientX : 0);
      const y =
        e.clientY || (e.touches && e.touches[0] ? e.touches[0].clientY : 0);

      createClickSpark(x, y);
      collectChocolate(choco.innerText);
      choco.remove();
    };

    // Adding listeners but only the first one to fire will execute logic due to isCaught flag
    choco.addEventListener('click', handleCatch);
    choco.addEventListener('touchstart', handleCatch, { passive: false });

    animation.onfinish = () => choco.remove();
  }

  function collectChocolate(emoji) {
    count++; // This now increments by exactly 1
    counterText.innerText = `Collected: ${count} / ${target}`;

    // Helper function to create a chocolate element
    const addToJar = (specificEmoji) => {
      const inJar = document.createElement('span');
      inJar.className = 'choco-in-jar';
      inJar.innerText = specificEmoji;

      // Randomize rotation and small horizontal offsets for a "pile" look
      const randomRot = Math.random() * 60 - 30;
      const randomOffset = Math.random() * 30 - 15; // Slightly wider spread for a fuller look

      inJar.style.transform = `rotate(${randomRot}deg) translateX(${randomOffset}px)`;
      jarInside.appendChild(inJar);
    };

    // 1. Add the one the player actually caught
    addToJar(emoji);

    // 2. Add a bonus "shadow" chocolate to fill the jar faster
    const bonusEmoji =
      chocoEmojis[Math.floor(Math.random() * chocoEmojis.length)];
    // Slight delay for the second one so they don't overlap perfectly instantly
    setTimeout(() => addToJar(bonusEmoji), 100);

    if (count === target) {
      setTimeout(() => {
        victoryModal.classList.remove('hidden');
      }, 600);
    }
  }

  function createClickSpark(x, y) {
    const spark = document.createElement('div');
    spark.innerText = '✨';
    spark.style.position = 'fixed';
    spark.style.left = `${x}px`;
    spark.style.top = `${y}px`;
    spark.style.pointerEvents = 'none';
    spark.style.fontSize = '1.5rem';
    spark.style.zIndex = '100';
    document.body.appendChild(spark);

    spark.animate(
      [
        { transform: 'translate(-50%, -50%) scale(1)', opacity: 1 },
        { transform: 'translate(-50%, -150%) scale(2)', opacity: 0 },
      ],
      { duration: 500, easing: 'ease-out' },
    ).onfinish = () => spark.remove();
  }

  // Spawn every 1.2 seconds
  const spawner = setInterval(() => {
    if (count < target) {
      spawnChocolate();
    } else {
      clearInterval(spawner);
    }
  }, 1200);
});
