class CommandNavigation {
  constructor() {
    this.commands = document.querySelectorAll('.command');
    this.init();
  }

  init() {
    // Make commands focusable
    this.commands.forEach(command => {
      command.setAttribute('tabindex', '0');
      
      // Add keyboard event to copy command when Enter is pressed
      command.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          const copyBtn = command.nextElementSibling.querySelector('.copy-btn');
          if (copyBtn) {
            copyBtn.click();
          }
        }
      });
    });
  }
}