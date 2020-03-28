console.log(" - - [@thiagojacinto] Flappy Bird - - ");  // Just a title inside console

// Handle sprites.png image source file:
const imageSrc = new Image();
imageSrc.src = './public/sprites.png';

// Get elements from HTML
const canvas = document.getElementById('game-canvas');
const context = canvas.getContext('2d');

const getReadyScreen = {
  srcX: 134,
  srcY: 0,
  width: 174,
  height: 152,
  x: (canvas.width / 2 ) - 174 / 2,
  y: 50,

  draw() {
    // Drawing inside canvas:
    context.drawImage(
      imageSrc,
      getReadyScreen.srcX, getReadyScreen.srcY,     // OriginX, OriginY
      getReadyScreen.width, getReadyScreen.height,  // Width, Height
      getReadyScreen.x, getReadyScreen.y,
      getReadyScreen.width, getReadyScreen.height,
    );
  },
}

const bird = {
  srcX: 0,
  srcY: 0,
  width: 34,
  height: 24,
  x: 10,
  y: 50,

  gravity: 0.25,
  velocity: 0,
  // function to control movement
  movement() {
    this.velocity = this.velocity + this.gravity; // updates velocity
    this.y = this.y + this.velocity // updates position with velocity
  },

  draw() {
    // Drawing inside canvas:
    context.drawImage(
      imageSrc,
      bird.srcX, bird.srcY,     // OriginX, OriginY
      bird.width, bird.height,  // Width, Height
      bird.x, bird.y,
      bird.width, bird.height,
    );
  },
}

const floor = {
  srcX: 0,
  srcY: 610,
  width: 224,
  height: 112,
  x: 0,
  y: canvas.height - 112,

  draw() {
    context.drawImage(
      imageSrc,
      floor.srcX, floor.srcY,     // OriginX, OriginY
      floor.width, floor.height,  // Width, Height
      floor.x, floor.y,
      floor.width, floor.height,
    );
    // draw a second time to `extend` it 
    context.drawImage(
      imageSrc,
      floor.srcX, floor.srcY,     // OriginX, OriginY
      floor.width, floor.height,  // Width, Height
      (floor.x + floor.width), floor.y,
      floor.width, floor.height,
    );
  },
}

const background = {
  srcX: 390,
  srcY: 0,
  width: 275,
  height: 204,
  x: 0,
  y: canvas.height - 204,

  draw() {
    // paint background of `background`
    context.fillStyle = '#70c5ce';
    context.fillRect(
      0, 0,
      canvas.width, canvas.height
    );

    context.drawImage(
      imageSrc,
      background.srcX, background.srcY,     // OriginX, OriginY
      background.width, background.height,  // Width, Height
      background.x, background.y,
      background.width, background.height,
    );
    // draw a second time to `extend` it 
    context.drawImage(
      imageSrc,
      background.srcX, background.srcY,     // OriginX, OriginY
      background.width, background.height,  // Width, Height
      (background.x + background.width), background.y,
      background.width, background.height,
    );
  },
}

// [Game Screens]:
const Screens = {
  INITIAL: {
    draw() {
      background.draw();
      floor.draw();
      bird.draw();
      getReadyScreen.draw();
    },
    updates() {},
    click() {
      Screens.setActiveScreen(Screens.GAMING);
    },
  },

  GAMING: {
    draw() {
      background.draw();
      floor.draw();
      bird.draw();
    },
    updates() {
      bird.movement()
    },
  }, 

  activeScreen: {},
  setActiveScreen(screen) {
    this.activeScreen = screen;
  },
}

// Recursive function to draw
function loop() {
  Screens.activeScreen.draw();  
  Screens.activeScreen.updates();  

  // Continous loading the image
  requestAnimationFrame(loop)
}

// adds a listener of clicks on canvas to START GAME:
canvas.addEventListener('click', () => {
  // If there is any `click()` on active screen (canvas), runs that `click()` method:
  if (Screens.activeScreen.click) Screens.activeScreen.click();
});

Screens.setActiveScreen(Screens.INITIAL);
loop(); // Runs loop function