# Git Commands Cheat Sheet Web Application

This web application serves as an interactive and comprehensive reference guide for Git commands. It's designed to help developers quickly find and understand common Git operations with their corresponding keyboard shortcuts.

## Key Features

### 1. Interactive Interface
- Dark/Light theme toggle for comfortable viewing
- Search functionality to quickly find specific commands
- Back-to-top button for easy navigation
- Section navigation with keyboard support (PgUp/PgDn)
- Copy buttons for quick command copying

### 2. Command Organization
The commands are organized into logical sections:
- Most Frequently Used Commands
- Repository Setup
- Branch Operations
- History and Differences
- Undoing Changes
- Remote Repository Operations
- Stashing
- Tags
- Advanced Log
- Configuration
- Advanced Reset

### 3. Visual Learning
- ASCII art diagrams illustrating:
  - Basic Git workflow
  - Branch structure
  - Stash stack
  - Reset operations
- Visual representations help understand Git concepts

### 4. Keyboard Shortcuts
- Each command includes relevant keyboard shortcuts
- Integration with common IDE shortcuts (particularly VS Code)
- Quick access to frequently used commands

### 5. Accessibility Features
- ARIA labels for better screen reader support
- Semantic HTML structure
- Keyboard navigation support
- High contrast theme options

### 6. Search Capabilities
- Real-time command search
- Clear search functionality
- Highlights relevant commands as you type

## Technical Implementation

The application is built using:
- HTML5 for structure
- CSS3 for styling and responsive design
- JavaScript for interactivity
- Font Awesome icons for visual elements

The codebase is organized into multiple JavaScript modules:
- utils.js: Utility functions
- theme.js: Theme switching functionality
- search.js: Search implementation
- navigation.js: Navigation controls
- clipboard.js: Copy functionality
- main.js: Main application logic

## User Experience

The interface is designed to be:
- Clean and intuitive
- Easy to navigate
- Responsive across different devices
- Fast and efficient for quick reference
- Visually appealing with proper spacing and typography

Each command entry includes:
1. The command syntax
2. A clear description
3. Associated keyboard shortcuts (where applicable)
4. A copy button for easy command copying

## Educational Value

The application serves as both:
- A quick reference for experienced developers
- A learning tool for Git beginners
- A comprehensive guide for Git operations
- A visual aid for understanding Git concepts