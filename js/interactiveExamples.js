class InteractiveExamples {
  constructor() {
    this.init();
  }

  init() {
    // Add interactive examples where users can modify parameters
    const examples = document.querySelectorAll('.interactive-example');
    examples.forEach(example => {
      const template = example.getAttribute('data-template');
      const inputs = example.querySelectorAll('input');
      const output = example.querySelector('.example-output');
      
      if (!template || !output) return;
      
      // Update output when inputs change
      inputs.forEach(input => {
        input.addEventListener('input', () => {
          let result = template;
          inputs.forEach(inp => {
            result = result.replace(`{${inp.name}}`, inp.value);
          });
          output.textContent = result;
        });
      });
      
      // Initialize with default values
      let result = template;
      inputs.forEach(inp => {
        result = result.replace(`{${inp.name}}`, inp.value);
      });
      output.textContent = result;
      
      // Add copy functionality
      const copyBtn = example.querySelector('.copy-btn');
      if (copyBtn) {
        copyBtn.addEventListener('click', async () => {
          try {
            await navigator.clipboard.writeText(output.textContent);
            
            // Visual feedback
            copyBtn.classList.add('copied');
            copyBtn.innerHTML = '<i class="fas fa-check"></i>';
            
            setTimeout(() => {
              copyBtn.classList.remove('copied');
              copyBtn.innerHTML = '<i class="fas fa-copy"></i>';
            }, 2000);
          } catch (err) {
            console.error('Failed to copy text: ', err);
          }
        });
      }
    });
  }
}