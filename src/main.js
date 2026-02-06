document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.btn-valentine');

  // Get current date (Year, Month [0-indexed], Day)
  // const today = new Date('2026-02-15');

  const today = new Date();
  // For testing, you can uncomment the line below to "pretend" it's a specific date:
  // const today = new Date('2026-02-09');

  buttons.forEach((button) => {
    const targetDate = new Date(button.getAttribute('data-date'));
    const dayNum = button.id.split('-')[1];

    if (today >= targetDate) {
      // It's time! Unlock the button
      button.style.opacity = '1';
      button.style.cursor = 'pointer';
      button.onclick = () => {
        window.location.href = `./src/days/day${dayNum}.html`;
      };
    } else {
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
