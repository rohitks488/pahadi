document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.btn-valentine');

  // Get current date and set it to the very start of the day (midnight)
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  buttons.forEach((button) => {
    // Set the target date to the start of its day as well
    const targetDate = new Date(button.getAttribute('data-date'));
    targetDate.setHours(0, 0, 0, 0);

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
