document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.btn-valentine');

  // Get current date in YYYY-MM-DD format (local time)
  const today = new Date();
  const todayStr =
    today.getFullYear() +
    '-' +
    String(today.getMonth() + 1).padStart(2, '0') +
    '-' +
    String(today.getDate()).padStart(2, '0');

  console.log('Current Date (Local):', todayStr);

  buttons.forEach((button) => {
    const targetDateStr = button.getAttribute('data-date');
    const dayNum = button.id.split('-')[1];

    console.log(
      `Checking Day ${dayNum}: Target=${targetDateStr}, Current=${todayStr}`,
    );

    // Compare string vs string (YYYY-MM-DD)
    // This ignores time completely
    if (todayStr >= targetDateStr) {
      console.log(`Day ${dayNum} is UNLOCKED! ✅`);
      button.style.opacity = '1';
      button.style.cursor = 'pointer';
      button.onclick = () => {
        window.location.href = `./src/days/day${dayNum}.html`;
      };
    } else {
      console.log(`Day ${dayNum} is still locked. 🔒`);
      // Not yet... Lock the button
      button.style.opacity = '0.4';
      button.style.cursor = 'not-allowed';
      button.title = 'Not time yet, sleepyhead! 😴';
      button.onclick = () => {
        alert(
          'Patience! This surprise unlocks on ' +
            button.getAttribute('data-date'),
        );
      };
    }
  });
});
