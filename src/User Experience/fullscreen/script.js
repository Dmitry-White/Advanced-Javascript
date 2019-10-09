const enterFullscreen = (elem) => {
  console.log('Enter');
};

const exitFullscreen = () => {
  console.log('Exit');
};

const logFullscreenInfo = (message, event) => {
  console.log(message, event);
  console.log('The current full-screen element is: ',
    document.fullscreenElement
    || document.mozFullScreenElement
    || document.webkitFullscreenElement
    || document.msFullscreenElement);
};

// Register event handlers to listen for fullscreen change events
document.addEventListener('fullscreenchange', (e) => logFullscreenInfo('fullscreenchange event! ', e));
document.addEventListener('mozfullscreenchange', (e) => logFullscreenInfo('mozfullscreenchange event! ', e));
document.addEventListener('webkitfullscreenchange', (e) => logFullscreenInfo('webkitfullscreenchange event! ', e));
document.addEventListener('msfullscreenchange', (e) => logFullscreenInfo('msfullscreenchange event! ', e));

const init = () => {
  const imageFS = document.getElementById('btnImgFs');
  const documentFS = document.getElementById('btnDocFs');
  const exitFS = document.getElementById('btnExitFs');
  const targetImage = document.getElementById('targetImg');
  const targetDocument = document.documentElement;

  imageFS.addEventListener('click', () => enterFullscreen(targetImage));
  documentFS.addEventListener('click', () => enterFullscreen(targetDocument));

  exitFS.addEventListener('click', exitFullscreen);
};

window.addEventListener('load', init);
