// Array of phrases
const phrases = [
    { text: "A spark defies the darkness, and so do I.", author: "by a lucky fool called Wanwix" },
    { text: "From the ashes, I rise—not as I was, but as I am.", author: "by a lucky fool called Wanwix" },
    { text: "The path is unwritten, and that’s where I thrive.", author: "by a lucky fool called Wanwix" },
    { text: "In the chaos, I found my melody.", author: "by a lucky fool called Wanwix" },
    { text: "The storm took much, but it left me stronger.", author: "by a lucky fool called Wanwix" },
    { text: "The horizon is endless, and so am I.", author: "by a lucky fool called Wanwix" },
    { text: "Through the cracks, I bloom—wild and untamed.", author: "by a lucky fool called Wanwix" },
    { text: "The dawn comes, but never as expected.", author: "by a lucky fool called Wanwix" },
    { text: "A flame that knows no bounds, and neither do I.", author: "by a lucky fool called Wanwix" },
    { text: "The flower grows where the wind takes it, and so do I.", author: "by a lucky fool called Wanwix" }
];

// Function to get a random phrase
function getRandomPhrase() {
    const randomIndex = Math.floor(Math.random() * phrases.length);
    return phrases[randomIndex];
}

// Function to display the random phrase
function displayRandomPhrase() {
    const phraseText = document.getElementById('phrase-text');
    const phraseAuthor = document.getElementById('phrase-author');
    const randomPhrase = getRandomPhrase();

    phraseText.textContent = `"${randomPhrase.text}"`;
    phraseAuthor.textContent = `— ${randomPhrase.author}`;
}

// Run the function when the page loads
window.onload = displayRandomPhrase;