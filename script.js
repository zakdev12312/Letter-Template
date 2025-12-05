// Configuration
const CONFIG = {
    recipientName: 'friend', // Change this to personalize the letter
    greetingSpeed: 100, // ms per character (80-120ms for slow typing)
    letterSpeed: 30, // ms per character (20-40ms for faster AI-like typing)
};

// Sample letter content (lowercase as required)
const letterText = `i hope this finds you well.

i've been thinking about how we met, and how much has changed since then.

sometimes it feels like time moves too fast...

but then i remember the moments we shared.

the late-night conversations.
the shared silences.
the quiet understanding between us.

i wanted you to know that those memories matter to me.

more than i can put into words.

thank you for being part of my story.

— always`;

// Audio Player Functionality
const audio = document.getElementById('audioElement');
const playPauseBtn = document.getElementById('playPauseBtn');
const playIcon = document.getElementById('playIcon');
const pauseIcon = document.getElementById('pauseIcon');
const progressBar = document.getElementById('progressBar');
const progressSlider = document.getElementById('progressSlider');
const currentTimeDisplay = document.getElementById('currentTime');
const durationDisplay = document.getElementById('duration');

let isPlaying = false;

// Format time helper
function formatTime(seconds) {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// Play/Pause toggle
playPauseBtn.addEventListener('click', () => {
    if (isPlaying) {
        audio.pause();
    } else {
        audio.play();
    }
});

audio.addEventListener('play', () => {
    isPlaying = true;
    playIcon.style.display = 'none';
    pauseIcon.style.display = 'block';
});

audio.addEventListener('pause', () => {
    isPlaying = false;
    playIcon.style.display = 'block';
    pauseIcon.style.display = 'none';
});

// Update progress bar
audio.addEventListener('timeupdate', () => {
    if (!audio.duration) return;
    const percent = (audio.currentTime / audio.duration) * 100;
    progressBar.style.width = `${percent}%`;
    progressSlider.value = percent;
    currentTimeDisplay.textContent = formatTime(audio.currentTime);
});

// Set duration when loaded
audio.addEventListener('loadedmetadata', () => {
    durationDisplay.textContent = formatTime(audio.duration);
    progressSlider.max = 100;
});

// Seek functionality
progressSlider.addEventListener('input', (e) => {
    const percent = e.target.value;
    if (audio.duration) {
        audio.currentTime = (percent / 100) * audio.duration;
    }
});

// Reset when audio ends
audio.addEventListener('ended', () => {
    isPlaying = false;
    playIcon.style.display = 'block';
    pauseIcon.style.display = 'none';
    progressBar.style.width = '0%';
    progressSlider.value = 0;
});

// Terminal Typing Animation
const greetingElement = document.getElementById('greeting');
const letterContentElement = document.getElementById('letterContent');
const cursor = document.getElementById('cursor');

let greetingText = `> hey, ${CONFIG.recipientName}`;
let currentCharIndex = 0;
let isTypingGreeting = false;
let isTypingLetter = false;

// Type the greeting slowly
function typeGreeting() {
    if (isTypingGreeting) return;
    isTypingGreeting = true;
    greetingElement.style.opacity = '1';
    
    function typeChar() {
        if (currentCharIndex < greetingText.length) {
            greetingElement.textContent += greetingText[currentCharIndex];
            currentCharIndex++;
            setTimeout(typeChar, CONFIG.greetingSpeed);
        } else {
            // Greeting complete, start letter after a pause
            setTimeout(startLetterTyping, 800);
        }
    }
    
    typeChar();
}

// Type the letter content faster
function startLetterTyping() {
    if (isTypingLetter) return;
    isTypingLetter = true;
    letterContentElement.classList.add('visible');
    
    let letterCharIndex = 0;
    
    function typeLetterChar() {
        if (letterCharIndex < letterText.length) {
            letterContentElement.textContent += letterText[letterCharIndex];
            letterCharIndex++;
            setTimeout(typeLetterChar, CONFIG.letterSpeed);
        } else {
            // Typing complete, move cursor to end
            cursor.style.marginLeft = '2px';
        }
    }
    
    typeLetterChar();
}

// Intersection Observer for scroll-triggered animation
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.3
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !isTypingGreeting) {
            typeGreeting();
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Start observing the terminal
const terminal = document.querySelector('.terminal-body');
observer.observe(terminal);

// Fallback: Start typing if user doesn't scroll (after 2 seconds)
setTimeout(() => {
    if (!isTypingGreeting) {
        typeGreeting();
    }
}, 2000);
