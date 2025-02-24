class TableOfContents {
  constructor() {
    this.tocContainer = document.getElementById('tableOfContents');
    this.tocToggle = document.querySelector('.toc-toggle');
    this.headings = document.querySelectorAll('h2');
    this.isNavigating = false;
    
    // Make instance globally available for other components
    window.tableOfContentsInstance = this;
    
    this.init();
  }

  init() {
    if (!this.tocContainer || !this.tocToggle) return;
    
    // Create TOC content
    const ul = document.createElement('ul');
    this.headings.forEach((heading, index) => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      
      // Add ID to heading if it doesn't have one
      if (!heading.id) {
        heading.id = `section-${index}`;
      }
      
      a.href = `#${heading.id}`;
      a.textContent = heading.textContent;
      a.addEventListener('click', (e) => {
        e.preventDefault();
        this.isNavigating = true;
        
        // Calculate position accounting for fixed header if present
        const headerHeight = 20; // Adjust based on your header height
        const targetPosition = heading.getBoundingClientRect().top + window.scrollY - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: "smooth"
        });
        
        // Close TOC after clicking
        this.toggleTOC(false);
        
        // Reset navigation flag after animation completes
        setTimeout(() => {
          this.isNavigating = false;
        }, 1000);
      });
      
      li.appendChild(a);
      ul.appendChild(li);
    });
    
    this.tocContainer.appendChild(ul);
    
    // Toggle TOC visibility
    this.tocToggle.addEventListener('click', (e) => {
      e.stopPropagation(); // Prevent document click from immediately closing it
      this.toggleTOC();
    });
    
    // Close TOC when clicking outside
    document.addEventListener('click', (e) => {
      if (!this.tocContainer.contains(e.target) && 
          !this.tocToggle.contains(e.target) && 
          !this.tocContainer.hidden) {
        this.toggleTOC(false);
      }
    });
    
    // Close TOC on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !this.tocContainer.hidden) {
        this.toggleTOC(false);
      }
    });
    
    // Highlight current section in TOC
    window.addEventListener('scroll', this.highlightCurrentSection.bind(this));
  }
  
  toggleTOC(force) {
    const isExpanded = this.tocToggle.getAttribute('aria-expanded') === 'true';
    const newState = force !== undefined ? force : !isExpanded;
    
    this.tocToggle.setAttribute('aria-expanded', newState);
    this.tocContainer.hidden = !newState;
    
    if (newState) {
      this.tocContainer.classList.add('toc-visible');
      this.highlightCurrentSection();
    } else {
      this.tocContainer.classList.remove('toc-visible');
    }
  }
  
  highlightCurrentSection() {
    if (this.tocContainer.hidden || this.isNavigating) return;
    
    const links = this.tocContainer.querySelectorAll('a');
    if (!links.length) return;
    
    // Find current section
    const headerHeight = 100; // Approximate header height
    const currentPosition = window.scrollY + headerHeight;
    let currentSectionId = null;
    
    // Find the last section that is above the current position
    for (let i = this.headings.length - 1; i >= 0; i--) {
      if (this.headings[i].getBoundingClientRect().top + window.scrollY <= currentPosition) {
        currentSectionId = this.headings[i].id;
        break;
      }
    }
    
    // If at the top of the page, highlight first section
    if (!currentSectionId && this.headings.length > 0) {
      currentSectionId = this.headings[0].id;
    }
    
    // Remove active class from all links
    links.forEach(link => {
      link.classList.remove('active');
    });
    
    // Add active class to current section link
    if (currentSectionId) {
      const currentLink = this.tocContainer.querySelector(`a[href="#${currentSectionId}"]`);
      if (currentLink) {
        currentLink.classList.add('active');
      }
    }
  }
}