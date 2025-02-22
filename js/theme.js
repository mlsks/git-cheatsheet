class ThemeManager {
  constructor() {
    this.button = document.querySelector('.theme-toggle');
    this.init();
  }

  init() {
    this.button.addEventListener('click', () => this.toggleTheme());
  }

  toggleTheme() {
    const html = document.documentElement;
    
    if (html.getAttribute('data-theme') === 'dark') {
      html.setAttribute('data-theme', 'light');
      this.button.innerHTML = '🌙';
    } else {
      html.setAttribute('data-theme', 'dark');
      this.button.innerHTML = '☀️';
    }
  }
}