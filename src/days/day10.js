document.addEventListener('DOMContentLoaded', () => {
  const choices = document.querySelectorAll('.teddy-choice');
  const namingArea = document.getElementById('naming-area');
  const confirmBtn = document.getElementById('confirm-adoption');
  const teddyNameInput = document.getElementById('teddy-name');

  const bigTeddy = document.getElementById('big-teddy');
  const hugProgress = document.getElementById('hug-progress');
  const hugTitle = document.getElementById('hug-title');
  const stage2 = document.getElementById('stage-2');
  const hugMessage = document.getElementById('hug-message');

  // FIXED: Flipped goth and romantic messages to match your selection
  const teddyMessages = {
    cute: '"I am soft, squishy, and ready to keep you warm whenever you feel lonely. I promise to be your cutest companion! 🎀"',
    romantic:
      '"I might look tough, but I have a huge heart for you. I\'ll protect you from the dark and keep your secrets safe. 🖤💀"',
    goth: '"I carry all the love that Batman sends your way(although his love cannot be measured). Every time you hug me, remember how much you are cherished! 🌹❤️"',
  };

  let hugLevel = 0;
  let hugInterval = null;
  let finalTeddyName = '';

  // --- STAGE 1: Selection ---
  choices.forEach((choice) => {
    choice.addEventListener('click', () => {
      choices.forEach((c) => c.classList.remove('selected'));
      choice.classList.add('selected');
      namingArea.classList.remove('hidden');
    });
  });

  confirmBtn.addEventListener('click', () => {
    const selectedItem = document.querySelector('.teddy-choice.selected');
    const selectedImg = selectedItem ? selectedItem.querySelector('img') : null;
    if (!selectedImg) return;

    const teddyType = selectedItem.getAttribute('data-type'); // Get the type (cute/goth/romantic)
    finalTeddyName = teddyNameInput.value.trim() || 'Teddy';

    document.getElementById('stage-1').classList.add('hidden');
    stage2.classList.remove('hidden');
    hugTitle.innerText = `Give ${finalTeddyName} a hug! 🤗`;

    // Set the specific message
    hugMessage.innerText =
      teddyMessages[teddyType] || 'A special friend for a special person!';

    // Inject image
    bigTeddy.innerHTML = `<img src="${selectedImg.src}" style="width: 200px; pointer-events: none; user-select: none;">`;

    // Reset bar visually
    hugLevel = 0;
    hugProgress.style.width = '0%';
  });

  // --- STAGE 2: Hugging Logic (The Fix) ---
  const startHugging = (e) => {
    if (e.cancelable) e.preventDefault();
    console.log('Hugging started...'); // Debug check

    bigTeddy.classList.add('hugging');
    clearInterval(hugInterval);

    hugInterval = setInterval(() => {
      hugLevel += 3; // Make it faster so it's obvious
      if (hugLevel > 100) hugLevel = 100;

      hugProgress.style.width = hugLevel + '%';
      console.log('Current level:', hugLevel); // Debug check

      if (hugLevel >= 100) {
        clearInterval(hugInterval);
        finishHugging();
      }
    }, 50);
  };

  const stopHugging = () => {
    bigTeddy.classList.remove('hugging');
    clearInterval(hugInterval);
  };

  const finishHugging = () => {
    if (bigTeddy.dataset.done === 'true') return;
    bigTeddy.dataset.done = 'true';

    const heart = document.createElement('span');
    heart.innerText = '💖';
    heart.style.cssText =
      'position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); font-size:5rem; z-index:100;';
    bigTeddy.appendChild(heart);

    setTimeout(() => {
      stage2.classList.add('hidden');
      document.getElementById('stage-3').classList.remove('hidden');
      document.getElementById('backpack-owner').innerText =
        `${finalTeddyName} brought a secret backpack for you!`;
    }, 1000);
  };

  // Add listeners to the WHOLE card area for stage 2 to be safe
  bigTeddy.addEventListener('mousedown', startHugging);
  bigTeddy.addEventListener('touchstart', startHugging, { passive: false });
  window.addEventListener('mouseup', stopHugging);
  window.addEventListener('touchend', stopHugging);

  // --- STAGE 3: Backpack ---
  const backpack = document.getElementById('backpack-trigger');
  const secretItems = document.querySelectorAll('.secret-item');
  const msgArea = document.getElementById('backpack-msg-area');

  backpack.addEventListener('click', () => backpack.classList.toggle('open'));
  secretItems.forEach((item) => {
    item.addEventListener('click', (e) => {
      e.stopPropagation();
      if (item.dataset.msg) msgArea.innerText = item.dataset.msg;
      else if (item.dataset.img)
        msgArea.innerHTML = `<img src="${item.dataset.img}" style="width:220px; border-radius:15px; border:3px solid white; box-shadow:0 10px 20px rgba(0,0,0,0.2)">`;
    });
  });
});
