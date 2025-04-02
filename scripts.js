// Array of phrases
const phrases = [
    { text: "Why isn't this working?!", author: "by a frustrated coder called Wanwix" },
    { text: "I know you won't read this :)", author: "by a sneaky artist called Wanwix" },
    { text: "What the hell is a script?", author: "by a confused gamer called Wanwix" },
    { text: "You're still here? Impressive!", author: "by a surprised Wanwix" },
    { text: "This text is just here to look cool.", author: "by a stylish Wanwix" },
    { text: "Did you know you can refresh the page for a new phrase?", author: "by a helpful Wanwix" },
    { text: "I see you scrolling...", author: "by a watchful Wanwix" },
    { text: "404: Profound message not found.", author: "by a glitchy Wanwix" },
    { text: "I bet you didn't expect this text to change!", author: "by a mischievous Wanwix" },
    { text: "You're not supposed to read this...", author: "by a secretive Wanwix" },
    { text: "This is the part where I pretend to be deep.", author: "by a self-aware Wanwix" },
    { text: "This text is 100% organic and gluten-free.", author: "by a health-conscious Wanwix" },
    { text: "This phrase is sponsored by no one.", author: "by an independent Wanwix" },
    { text: "You're my favorite visitor today!", author: "by a lying Wanwix" },
    { text: "This text is legally required to be here.", author: "by a compliant Wanwix" },
    { text: "I hope you're having a great day!", author: "by a wholesome Wanwix" },
    { text: "This is the last phrase, I promise.", author: "by a lying Wanwix (again)" },

    // Art and coding-related funny phrases
    { text: "CTRL + Z is my best friend.", author: "by a Blender artist called Wanwix" },
    { text: "I don't always test my code, but when I do, I do it in production.", author: "by a reckless coder called Wanwix" },
    { text: "Blender is loading... please hold.", author: "by a patient Wanwix" },
    { text: "Why does this script have 47 nested loops?", author: "by a confused Wanwix" },
    { text: "I spent 3 hours fixing a typo. Worth it.", author: "by a detail-oriented Wanwix" },
    { text: "My code works, but I have no idea why.", author: "by a lucky Wanwix" },
    { text: "I just rendered for 8 hours and forgot to save.", author: "by a devastated Wanwix" },
    { text: "Art is never finished, only abandoned.", author: "by a Leonardo da Vinci-inspired Wanwix" },
    { text: "I could fix this bug, or I could just call it a feature.", author: "by a pragmatic Wanwix" },
    { text: "Why does this mesh have 1 million polygons?", author: "by an overwhelmed Wanwix" },
    { text: "I don't make mistakes, I make happy accidents.", author: "by a Bob Ross-inspired Wanwix" },
    { text: "This script is powered by caffeine and chaos.", author: "by a sleep-deprived Wanwix" },
    { text: "I followed a tutorial, but it still doesn't work.", author: "by a frustrated Wanwix" },
    { text: "I just discovered a new shortcut... after 2 years.", author: "by a late-to-the-party Wanwix" },
    { text: "I could optimize this, but it works, so...", author: "by a lazy Wanwix" },
    { text: "Blender crashed. Again.", author: "by a resigned Wanwix" },
    { text: "I don't need sleep, I need to fix this shader.", author: "by a determined Wanwix" },
    { text: "Why does this texture look like a potato?", author: "by a confused Wanwix" },
    { text: "I just spent 4 hours on a 5-minute task.", author: "by a time-blind Wanwix" },
    { text: "This code is self-documenting... said no one ever.", author: "by a sarcastic Wanwix" },

    // Special Spanish phrase
    { text: "Sabes que mi idioma nativo es español, ¿verdad? No? Bueno, ahora lo sabes :)", author: "by a bilingual Wanwix" },
];

// Random phrase functions - UNCHANGED
function getRandomPhrase() {
    const randomIndex = Math.floor(Math.random() * phrases.length);
    return phrases[randomIndex];
}

function displayRandomPhrase() {
    const phraseText = document.getElementById('phrase-text');
    const phraseAuthor = document.getElementById('phrase-author');
    const randomPhrase = getRandomPhrase();

    phraseText.textContent = `"${randomPhrase.text}"`;
    phraseAuthor.textContent = `— ${randomPhrase.author}`;
}

/* ====================== */
/* PINTEREST-STYLE MASONRY GRID */
/* ====================== */
function initMasonryGrid() {
    const grid = document.querySelector('.art-container');
    if (!grid) return;

    // Initialize Lightbox with smooth transitions
    if (typeof lightbox !== 'undefined') {
        lightbox.option({
            'resizeDuration': 200,
            'wrapAround': true,
            'fadeDuration': 250,
            'imageFadeDuration': 250
        });
    }

    // Wait for images to load before layout
    const images = grid.querySelectorAll('img');
    const totalImages = images.length;
    let loadedImages = 0;

    const checkImagesLoaded = () => {
        loadedImages++;
        if (loadedImages === totalImages) {
            layoutGrid();
        }
    };

    images.forEach(img => {
        if (img.complete) {
            checkImagesLoaded();
        } else {
            img.addEventListener('load', checkImagesLoaded);
            img.addEventListener('error', checkImagesLoaded); // Handle broken images
        }
    });

    function layoutGrid() {
        // Calculate column count based on viewport width
        const containerWidth = grid.offsetWidth;
        const columnWidth = 250; // Your preferred column width
        const gap = 20; // Gap between items
        const columnCount = Math.max(2, Math.floor(containerWidth / (columnWidth + gap)));
        const columns = new Array(columnCount).fill(0).map(() => []); // Store items per column
        const columnHeights = new Array(columnCount).fill(0); // Track column heights
        
        // Position each item in the shortest column
        const items = grid.querySelectorAll('.art-item');
        items.forEach(item => {
            const shortestColumn = columnHeights.indexOf(Math.min(...columnHeights));
            columns[shortestColumn].push(item);
            
            item.style.position = 'absolute';
            item.style.width = `calc(${100 / columnCount}% - ${gap * (columnCount - 1) / columnCount}px)`;
            item.style.left = `${(100 / columnCount) * shortestColumn}%`;
            item.style.top = `${columnHeights[shortestColumn]}px`;
            
            columnHeights[shortestColumn] += item.offsetHeight + gap;
        });

        // Set container height
        grid.style.height = `${Math.max(...columnHeights)}px`;
    }

    // Responsive layout adjustments
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            layoutGrid();
        }, 100);
    });

    // Initial layout
    layoutGrid();
}

// Initialize everything
window.addEventListener('load', () => {
    displayRandomPhrase(); // Your existing random phrases
    initMasonryGrid();     // New Pinterest-style grid
});