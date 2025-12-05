# Onine Letter Design Template

A minimal, retro-styled webpage with a custom HTML5 audio player and terminal-style letter display.

## Features

- **Custom Audio Player**: Clean HTML5 media player with play/pause, progress bar, and time display
- **Terminal-Style Letter**: Slate/dark background with monospace font and typing animations
- **Typing Effects**: 
  - Slow typing for greeting (80-120ms per character)
  - Faster typing for letter content (20-40ms per character)
  - Blinking cursor animation
- **Scroll-Triggered Animation**: Terminal typing starts when scrolled into view
- **Fully Responsive**: Clean mobile support with optimized layouts
- **Zero Dependencies**: Pure HTML/CSS/JS, no external libraries

## Quick Start

1. **Add your audio file**: Place your audio file (MP3 format) in the project directory and name it `audio.mp3`, or update the source in `index.html:31`

2. **Customize the letter**: Open `script.js` and modify:
   - `CONFIG.recipientName`: Change 'friend' to the recipient's name
   - `letterText`: Replace with your own letter content (keep it lowercase for most emotionality)
   - `CONFIG.greetingSpeed`: Adjust typing speed for greeting (default: 100ms)
   - `CONFIG.letterSpeed`: Adjust typing speed for letter (default: 30ms)

3. **Open in browser**: Simply open `index.html` in your web browser

## Project Structure

```
Letter Template/
├── index.html       # Main HTML structure
├── styles.css       # Retro terminal styling
├── script.js        # Typing animations and audio player logic
├── audio.mp3        # Your audio file (not included)
└── README.md        # This file
```

## Customization

### Change Recipient Name
```javascript
// In script.js, line 2:
recipientName: 'friend', // Change to any name
```

### Edit Letter Content
```javascript
// In script.js, lines 8-29:
const letterText = `your letter content here...`;
```

### Adjust Typing Speed
```javascript
// In script.js, lines 3-4:
greetingSpeed: 100, // Slower for greeting (80-120ms recommended)
letterSpeed: 30,    // Faster for letter (20-40ms recommended)
```

### Change Colors
Edit `styles.css`:
- Background: `.terminal-body { background: #1e1e1e; }`
- Text color: `.terminal-body { color: #00ff00; }`
- Accent color: `.control-btn { background: #00ff00; }`

## Browser Compatibility

Works on all modern browsers that support:
- HTML5 Audio
- CSS3 Animations
- ES6 JavaScript
- Intersection Observer API

## License

Open source - feel free to use and modify as needed.

## Notes

- Keep letter text lowercase for consistent retro aesthetic
- Audio file must be in MP3 format (or update the source type)
- Typing animation triggers on scroll or after 2 seconds
- Mobile-optimized with responsive breakpoints at 768px and 480px

