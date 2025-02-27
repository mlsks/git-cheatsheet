# Git Commands Cheat Sheet

A comprehensive, interactive reference guide for Git commands with a clean, responsive interface and powerful search functionality.

![Git Commands Cheat Sheet Screenshot]([https://raw.githubusercontent.com/mlsks/git-cheatsheet/refs/heads/main/screenshot.png])

## Features

- **Comprehensive Command Reference**: Covers basic commands, branching, history, remote operations, and more
- **Interactive UI**: Clean, responsive design that works on all devices
- **Dark/Light Mode**: Toggle between themes for comfortable viewing in any environment
- **Advanced Search**: Chrome-like search with navigation between matches and highlighting
- **Visual Diagrams**: ASCII art diagrams to help understand Git concepts
- **Keyboard Shortcuts**: Convenient keyboard navigation throughout the app
- **Copy to Clipboard**: One-click copying of commands
- **Interactive Examples**: Try different command variations with interactive inputs
- **Detailed Documentation**: Complete documentation of all features and code

## Getting Started

### Local Usage

1. Clone the repository:
   ```bash
   git clone https://github.com/mlsks/git-cheatsheet.git
   ```

2. Open `index.html` in your browser:
   ```bash
   cd git-commands-cheatsheet
   open index.html  # On macOS
   # OR
   start index.html  # On Windows
   ```

### Online Version

Visit the live version at: [https://mlsks.github.io/git-cheatsheet/](https://mlsks.github.io/git-cheatsheet/)

## Using the Cheat Sheet

### Navigation

- Use the table of contents to jump to different sections
- Scroll through commands organized by category
- Use keyboard shortcuts (PgUp/PgDn) to navigate between sections

### Search

1. Click the search icon in the top-right corner
2. Type your search query
3. Use the up/down arrows to navigate between matches
4. Press Enter to move to the next match, Shift+Enter for the previous match
5. The match counter shows your current position (e.g., "3/12")

### Theme Toggle

Click the moon icon in the top-right corner to switch between light and dark modes.

### Command Copying

Click the copy icon next to any command to copy it to your clipboard.

## Project Structure

```
git-commands-cheatsheet/
├── index.html              # Main cheat sheet page
├── documentation.html      # Documentation page
├── style.css               # Main styles
├── enhancements.css        # Additional styling features
├── search-enhancements.css # Search-specific styles
├── documentation.css       # Documentation page styles
├── js/
│   ├── main.js             # Main application initialization
│   ├── search.js           # Search functionality
│   ├── theme.js            # Theme switching
│   ├── navigation.js       # Page navigation
│   ├── clipboard.js        # Copy to clipboard functionality
│   ├── tableOfContents.js  # TOC generation
│   ├── commandNavigation.js # Command section navigation
│   ├── interactiveExamples.js # Interactive command examples
│   ├── docSearch.js        # Documentation search
│   └── utils.js            # Utility functions
└── icons/                  # Icon assets
```

## Search Functionality

The cheat sheet features a Google Chrome-like search experience:

- **Highlighting**: All matches are highlighted in yellow
- **Active Match**: The current match is highlighted in orange
- **Navigation**: Up/down arrows to move between matches
- **Keyboard Shortcuts**:
  - Enter: Next match
  - Shift+Enter: Previous match
  - F3: Next match
  - Shift+F3: Previous match
  - Escape: Close search

## Command Categories

The cheat sheet organizes Git commands into the following categories:

1. **Most Frequently Used Commands**: Essential everyday commands
2. **Repository Setup**: Commands for initializing and cloning repositories
3. **Branch Operations**: Creating, switching, and managing branches
4. **History and Differences**: Viewing history and comparing changes
5. **Undoing Changes**: Commands to revert or reset changes
6. **Remote Repository**: Working with remote repositories
7. **Stashing**: Temporarily storing changes
8. **Tags**: Creating and managing tags
9. **Advanced Log**: Detailed history viewing options
10. **Configuration**: Setting up Git preferences
11. **Advanced Reset**: Different reset options and their effects

## Development

### Adding New Commands

To add a new command to the cheat sheet:

1. Identify the appropriate section in `index.html`
2. Add the command using the following structure:

```html
<div class="command">git your-command</div>
<div class="description">Description of what the command does
  <button class="copy-btn" aria-label="Copy command"><i class="fas fa-copy"></i></button>
</div>
```

### Modifying Styles

The project uses a modular CSS approach:

- `style.css`: Core styling and layout
- `enhancements.css`: Additional features and improvements
- `search-enhancements.css`: Search-specific styling

### Browser Compatibility

The cheat sheet is compatible with:
- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+
- Opera 47+

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -am 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Font Awesome for the icons
- Google Fonts for the Poppins font family
- All contributors who have helped improve this cheat sheet
