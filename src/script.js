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


// GameOver
const gameOver = {
  srcX: 134,
  srcY: 152,
  width: 226,
  height: 200,
  x: (canvas.width / 2 ) - 225 / 2,
  y: 50,

  draw() {
    // Drawing inside canvas:
    context.drawImage(
      imageSrc,
      gameOver.srcX, gameOver.srcY,     // OriginX, OriginY
      gameOver.width, gameOver.height,  // Width, Height
      gameOver.x, gameOver.y,
      gameOver.width, gameOver.height,
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

  jump: 2,

  gravity: 0.1,
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

var pipeGap = 90;

const pipeSouth = {
  srcX: 0,
  srcY: 169,
  width: 54,
  height: 400,
  x: canvas.width - 54,
  y: canvas.height - floor.height - pipeGap,

  draw(x, y) {
    // Drawing inside canvas:
    context.drawImage(
      imageSrc,
      pipeSouth.srcX, pipeSouth.srcY,     // OriginX, OriginY
      pipeSouth.width, pipeSouth.height,  // Width, Height
      x, y, // -> Position inputs
      pipeSouth.width, pipeSouth.height,
    );
  },
  movement() {
    this.x --;
  }
}

const pipeNorth = {
  srcX: 52,
  srcY: 169,
  width: 54,
  height: 400,
  x: canvas.width - 54,
  y: - pipeSouth.y,

  draw(x, y) {
    // Drawing inside canvas:
    context.drawImage(
      imageSrc,
      pipeNorth.srcX, pipeNorth.srcY,     // OriginX, OriginY
      pipeNorth.width, pipeNorth.height,  // Width, Height
      x, y, // -> Position inputs
      pipeNorth.width, pipeNorth.height,
    );
  },
  movement() {
    this.x --;
  }
}

const movingPipes = {
  pipes: [{
    x: canvas.width - pipeNorth.width,
    y: canvas.height - floor.height - pipeGap,
  }],

  DISTANCE_BETWEEN_PAIRS: 180,

  movement() {
    // Increasing pipes drawings
    for (let index = 0; index < this.pipes.length; index++) {
      
      // draw:
      pipeNorth.draw(this.pipes[index].x, - pipeNorth.height + this.pipes[index].y - pipeGap);
      pipeSouth.draw(this.pipes[index].x, this.pipes[index].y);

      // movement of pipes:
      this.pipes[index].x --;

      // score counting:
      if (this.pipes[index].x == bird.x) scoreCount.score[scoreCount.size].now++;
      console.log(`Score now: ${scoreCount.score[scoreCount.size].now}`);
      const maximum = scoreCount.maximumScore();
      scoreCount.draw(scoreCount.score[scoreCount.size].now, maximum);

      // verify collision
      if (Screens.GAMEOVER.crashPipes(index)) {
        // saves this round score
        scoreCount.addScore({now: 0, max: scoreCount.score[scoreCount.size].now});
        // calls gameover screen
        Screens.setActiveScreen(Screens.GAMEOVER);
      }
      
      // increase:
      if (this.pipes[index].x === movingPipes.DISTANCE_BETWEEN_PAIRS) {
        this.pipes.push({
          x: canvas.width,
          y: Math.floor( Math.random()*pipeGap ) + pipeSouth.y,
        });
        // console.log(`New pipe @ (${this.pipes[index + 1].x}, ${this.pipes[index + 1].y})`); // DEBUG
        
      }
    }
  }
}

// PLAYER SCORE:
const scoreCount = {
  
  score: [
    {
      now: 0,
      max: 0
    },
  ], 

  addScore(newScore) {
    scoreCount.score.push({
      now: newScore.now,
      max: this.score.max >= newScore.max ? this.score.max : newScore.max,
    });
    this.increaseSize();
    const max = this.maximumScore();
    console.log(`Maximum SCORE: ${max}`);
    
    window.localStorage.setItem('flappyMaxScore', max);
  }, 

  size: 0,
  increaseSize() {this.size++},

  maximumScore() {
    let result = 0;
    // compares localStorage info with running max score:
    if (window.localStorage && window.localStorage.getItem('flappyMaxScore')) {
      result = this.score[this.size].max > window.localStorage.getItem('flappyMaxScore') ?
        this.score[this.size].max
        : window.localStorage.getItem('flappyMaxScore');
    } else {
      result = this.score[this.size].max;
    }

    return result;
  },

  draw(value, max) {

    context.fillStyle = "#000";
    context.font = "20px Verdana";
    context.fillText(
      `Score: ${value} \n
      Max: ${max}`,
      20,
      20
    );
  }
}

// [Game Screens]:
const Screens = {
  INITIAL: {
    draw() {
      background.draw();
      pipeSouth.draw(pipeSouth.x, pipeSouth.y);
      pipeNorth.draw(pipeNorth.x, pipeNorth.y);
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
      // pipeSouth.draw();
      // pipeNorth.draw();
      movingPipes.movement();
      floor.draw();
      bird.draw();
    },
    updates() {
      bird.movement();

      // pipeSouth.movement();
      // pipeNorth.movement();

      if (Screens.GAMEOVER.crashFloor()) {
        // console.log("GAME IS OVER, PAL!");  // DEBUG
        Screens.setActiveScreen(Screens.GAMEOVER);
      }
    },
    click() {
      // soften bird jump movement
      bird.velocity = - bird.jump;
      // console.log(`Bird Y: ${bird.y} & Floor Y: ${floor.y}`);  // DEBUG
    }
  }, 

  GAMEOVER: {
    draw() {
      gameOver.draw();
    },
    updates() {},
    click() {
      // Clicking after gameOver, will refresh browser
      location.reload();
    },
    crashFloor() {
      return bird.y + bird.height >= floor.y;
    },
    crashPipes(index) {
      xAxisVerification = bird.x + bird.width >= movingPipes.pipes[index].x 
          || bird.x <= movingPipes.pipes[index].x + movingPipes.pipes[index].width;
        // console.log(`Crashed X-Axis: ${xAxisVerification}`);  // DEBUG
          
        
      yAxisVerification = bird.y + bird.height >= movingPipes.pipes[index].y
          || bird.y <= movingPipes.pipes[index].y - pipeGap;
        // console.log(`Crashed Y-Axis: ${yAxisVerification}`);  // DEBUG

      // Somehow solved @TBD:
      return movingPipes 
      && movingPipes.pipes[index].x > 0 ?
        xAxisVerification && yAxisVerification
        : movingPipes.pipes[index].x + movingPipes.pipes[index].width > 0 ?
        xAxisVerification && yAxisVerification
        : false ;
    },
  },

  activeScreen: {},
  setActiveScreen(screen) {
    this.activeScreen = screen;
  },
}

// Recursive function to draw
function loop() {
  Screens.activeScreen.updates();  
  Screens.activeScreen.draw();  

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