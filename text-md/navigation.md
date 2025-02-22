# Navigation System Documentation

The navigation.js file implements a sophisticated navigation system for the Git Commands Cheat Sheet application, providing smooth section navigation, scroll indicators, and keyboard shortcuts.

## Core Components

### 1. Navigation Class
The main class that handles all navigation-related functionality:
```javascript
class Navigation {
  constructor() {
    this.backToTopButton = document.querySelector(".back-to-top");
    this.prevIndicator = document.querySelector(".nav-indicator.prev");
    this.nextIndicator = document.querySelector(".nav-indicator.next");
    this.scrollTimeout = null;
  }
}
```

### 2. Footer Class
A simple class that adds a copyright footer to the page:
```javascript
class Footer {
  constructor() {
    this.createFooter();
  }
}
```

## Key Features

### 1. Scroll-to-Top Functionality
- Global `scrollToTop()` function
- Smooth scrolling animation
- Button visibility based on scroll position
- Appears after scrolling 300px down

### 2. Section Navigation
- Previous/Next section indicators
- Visual feedback for available navigation directions
- Smooth scrolling between sections
- Auto-hiding indicators after 2 seconds of inactivity

### 3. Keyboard Navigation
- PageUp/PageDown support
- Prevents default browser behavior
- Smooth scrolling between sections
- Synchronized with visual indicators

## Implementation Details

### 1. Initialization
```javascript
init() {
  // Event listeners for scroll and keyboard
  window.addEventListener("scroll", () => {
    this.handleScroll();
    this.updateNavigationIndicators();
  });
  document.addEventListener("keydown", (e) => this.handleKeyNavigation(e));
  // Click handlers for navigation indicators
}
```

### 2. Navigation Indicators
The system maintains two indicators:
- Previous section indicator (↑)
- Next section indicator (↓)

Each indicator shows:
- Direction arrow
- Section name (truncated if too long)
- Keyboard shortcut hint

### 3. Section Detection
```javascript
updateNavigationIndicators() {
  const sections = Array.from(document.querySelectorAll("h2"));
  const currentPosition = window.scrollY + window.innerHeight / 3;
  let currentSectionIndex = sections.findIndex(
    (section) => section.offsetTop > currentPosition
  ) - 1;
}
```

### 4. Text Handling
```javascript
truncateText(text, maxChars = 21) {
  if (text.length <= maxChars) {
    return text;
  }
  return text.substring(0, maxChars) + '...';
}
```

## User Experience Features

### 1. Visual Feedback
- Smooth scrolling animations
- Visible navigation indicators
- Auto-hiding elements
- Clear section labels

### 2. Interaction Methods
- Mouse clicks on indicators
- Keyboard shortcuts
- Scroll-to-top button
- Automatic position detection

### 3. Accessibility
- Keyboard navigation support
- Clear visual indicators
- Smooth transitions
- Intuitive controls

## Technical Implementation

### 1. Scroll Handling
- Efficient scroll event handling
- Debounced indicator updates
- Smooth scrolling behavior
- Position-based visibility control

### 2. Section Management
- Dynamic section detection
- Accurate position calculation
- Boundary condition handling
- Smooth transitions

### 3. Event Management
- Proper event delegation
- Clean event listener setup
- Memory leak prevention
- Performance optimization

## Best Practices

### 1. Code Organization
- Class-based architecture
- Clear method separation
- Logical functionality grouping
- Clean initialization process

### 2. Performance
- Debounced scroll handling
- Efficient DOM queries
- Optimized calculations
- Smooth animations

### 3. Maintainability
- Well-documented code
- Clear variable names
- Modular design
- Reusable components

## Footer Implementation

### 1. Structure
```javascript
createFooter() {
  const footer = document.createElement("footer");
  footer.style.textAlign = "center";
  footer.style.padding = "20px";
  footer.style.marginTop = "40px";
  footer.innerHTML = "©2025  Michel Sakkas";
  document.body.appendChild(footer);
}
```

### 2. Features
- Dynamically created
- Consistent styling
- Copyright information
- Proper positioning

## Usage Guidelines

### 1. Navigation
- Use PageUp/PageDown for keyboard navigation
- Click indicators for mouse navigation
- Scroll normally for manual navigation
- Use back-to-top button for quick return

### 2. Customization
- Adjust truncation length in truncateText()
- Modify scroll thresholds
- Update indicator timeout
- Customize animations

### 3. Extension
- Add new navigation features
- Modify indicator behavior
- Enhance keyboard support
- Implement new scroll behaviors

## Error Handling

### 1. Boundary Conditions
- Handles first/last section edge cases
- Prevents invalid section navigation
- Manages scroll limits
- Handles missing elements

### 2. Event Safety
- Proper event cleanup
- Safe DOM manipulation
- Error prevention
- Fallback behaviors

This navigation system provides a robust and user-friendly way to navigate through the Git Commands Cheat Sheet, combining multiple interaction methods with smooth animations and clear visual feedback.