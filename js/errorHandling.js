const ErrorHandler = (function() {
  function logError(error, context = '') {
    console.error(`[Git Cheatsheet] ${context}:`, error);
    
    // Could send to analytics or error tracking service
    if (window.gtag) {
      gtag('event', 'error', {
        'event_category': 'javascript',
        'event_label': context,
        'value': error.message
      });
    }
  }
  
  function init() {
    // Global error handler
    window.addEventListener('error', (event) => {
      logError(event.error, 'Uncaught Exception');
    });
    
    // Promise rejection handler
    window.addEventListener('unhandledrejection', (event) => {
      logError(event.reason, 'Unhandled Promise Rejection');
    });
  }
  
  return {
    init,
    logError
  };
})();