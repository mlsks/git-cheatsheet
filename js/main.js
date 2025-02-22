import { Search } from './search.js';
import { ThemeManager } from './theme.js';
import { Navigation } from './navigation.js';
import { Clipboard } from './clipboard.js';

// Initialize all modules
document.addEventListener('DOMContentLoaded', () => {
  const search = new Search();
  const themeManager = new ThemeManager();
  const navigation = new Navigation();
  const clipboard = new Clipboard();
});