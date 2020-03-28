console.log(" - - [@thiagojacinto] Flappy Bird - - ");  // Just a title inside console

// Handle sprites.png image source file:
const imageSrc = new Image();
imageSrc.src = './public/sprites.png';

// Get elements from HTML
const canvas = document.getElementById('game-canvas');
const context = canvas.getContext('2d');

const bird = {
  srcX: 0,
  srcY: 0,
  width: 34,
  height: 24,
  x: 10,
  y: 50,

}

// Recursive function to draw
function loop() {

// Drawing inside canvas:
context.drawImage(
  imageSrc,
  bird.srcX, bird.srcY,     // OriginX, OriginY
  bird.width, bird.height,  // Width, Height
  bird.x, bird.y,
  bird.width, bird.height,
);

  // Continous loading the image
  requestAnimationFrame(loop)
}

loop(); // Runs loop function