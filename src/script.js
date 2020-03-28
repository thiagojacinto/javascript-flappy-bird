console.log(" - - [@thiagojacinto] Flappy Bird - - ");  // Just a title inside console

// Handle sprites.png image source file:
const imageSrc = new Image();
imageSrc.src = './public/sprites.png';

// Get elements from HTML
const canvas = document.getElementById('game-canvas');
const context = canvas.getContext('2d');

