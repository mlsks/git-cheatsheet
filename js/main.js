// Initialize all modules
document.addEventListener('DOMContentLoaded', () => {
  // Initialize error handling first
  ErrorHandler.init();
  
  // Core functionality
  const search = new Search();
  const navigation = new Navigation();
  const clipboard = new Clipboard();
  
  // Enhanced functionality
  const lazyLoader = new LazyLoader();
  const tableOfContents = new TableOfContents();
  const commandNav = new CommandNavigation();
  const interactiveExamples = new InteractiveExamples();
});