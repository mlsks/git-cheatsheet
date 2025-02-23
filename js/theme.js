function applyTheme(theme) {
    const html = document.documentElement;
    const themeButton = document.querySelector('.theme-toggle');
    
    html.setAttribute('data-theme', theme);
    if (themeButton) {
        themeButton.innerHTML = theme === 'dark' ? '☀️' : '🌙';
    }
    localStorage.setItem('theme', theme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
}

// Apply initial theme on load
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme);
});