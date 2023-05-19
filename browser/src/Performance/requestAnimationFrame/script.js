const startButton = document.querySelector('#btnStart');
const stopButton = document.querySelector('#btnStop');
const canvas = document.querySelector('#canvas1');
const BACKGROUND_COLOR = '#00ddee';
const RECTANGLE_COLOR = 'yellow';
const RECTANGLE_BORDER_COLOR = 'red';
const RECTANGLE_BORDER_WIDTH = 3;

const context = canvas.getContext('2d');
const canvasWidth = context.canvas.width;
const canvasHeight = context.canvas.height;

// Set up the animation constants and initial state
let animationRef = null;
let direction = 2;
let rectX = 0;
const RECTANGLE_Y = 200;
const RECTANGLE_SIDE = 40;

// Erases the given canvas and draws a colored background
const blank = () => {
  // Erase the canvas before each update cycle
  context.fillStyle = BACKGROUND_COLOR;
  context.fillRect(0, 0, canvasWidth, canvasHeight);
};

const anim = () => {
  // While the object is still within the canvas, move it by a small amount
  if (direction > 0 && rectX + RECTANGLE_SIDE < canvasWidth) {
    if (rectX + RECTANGLE_SIDE + direction >= canvasWidth) {
      direction = -direction;
    } else {
      rectX += direction;
    }
  } else if (direction < 0 && rectX >= 0) {
    rectX += direction;
    if (rectX < 0) {
      direction = -direction;
    }
  }

  blank();

  context.fillStyle = RECTANGLE_COLOR;
  context.strokeStyle = RECTANGLE_BORDER_COLOR;
  context.lineWidth = RECTANGLE_BORDER_WIDTH;

  context.fillRect(rectX, RECTANGLE_Y, RECTANGLE_SIDE, RECTANGLE_SIDE);
  context.strokeRect(rectX, RECTANGLE_Y, RECTANGLE_SIDE, RECTANGLE_SIDE);

  // Request another update frame from the browser
  animationRef = requestAnimationFrame(anim);
};

// Initializes each canvas drawing state
const init = () => {
  blank();

  // Start the animation by requesting a time slice to draw the scene updates
  animationRef = requestAnimationFrame(anim);
};

// Start the animation when clicked
startButton.addEventListener('click', () => {
  if (!animationRef) animationRef = requestAnimationFrame(anim);
});

// Stop the current animation when clicked
stopButton.addEventListener('click', () => {
  cancelAnimationFrame(animationRef);
  animationRef = null;
});

window.addEventListener('DOMContentLoaded', init);
