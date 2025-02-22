class Clipboard {
  constructor() {
    this.init();
  }

  init() {
    document.querySelectorAll('.copy-btn').forEach(button => {
      button.addEventListener('click', async () => this.copyCommand(button));
    });
  }

  async copyCommand(button) {
    const command = button.parentElement.previousElementSibling.textContent;
    
    try {
      await navigator.clipboard.writeText(command);
      
      // Visual feedback
      button.classList.add('copied');
      button.innerHTML = '<i class="fas fa-check"></i>';
      
      setTimeout(() => {
        button.classList.remove('copied');
        button.innerHTML = '<i class="fas fa-copy"></i>';
      }, 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  }
}