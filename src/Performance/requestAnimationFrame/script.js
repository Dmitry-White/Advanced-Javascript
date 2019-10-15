const canvas = document.querySelector('#canvas1');
const context = canvas.getContext('2d');
const stopButton = document.querySelector('#btnStop');
const animationRef = null;

// Erases the given canvas and draws a colored background
const blank = () => {
  // Erase the canvas before each update cycle
  context.fillStyle = '#00ddee';
  context.fillRect(0, 0, context.canvas.width, context.canvas.height);
};

const anim = (timestamp) => {
  // Set up the animation constants and initial state
  let rectX = 0;
  const rectY = 200;
  const rectSide = 40;
  let direction = 2;

  // While the object is still within the canvas, move it by a small amount
  if (direction > 0 && (rectX + rectSide) < context.canvas.width) {
    if ((rectX + rectSide + direction) >= context.canvas.width) {
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

  blank(context);
  context.fillStyle = 'yellow';
  context.strokeStyle = 'red';
  context.lineWidth = 3;
  context.fillRect(rectX, rectY, rectSide, rectSide);
  context.strokeRect(rectX, rectY, rectSide, rectSide);

  // TODO: Request another update frame from the browser
};

// Initializes each canvas drawing state
const init = () => {
  blank(context);

  // TODO: start the animation by requesting a time slice
  // to draw the scene updates
};

// TODO: Stop the current animation when clicked
stopButton.addEventListener('click', () => {

});

window.addEventListener('load', init);
