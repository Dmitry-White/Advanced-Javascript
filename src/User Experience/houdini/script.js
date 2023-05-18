const init = () => {
  // use feature detection to see if paintWorklet is supported
  if ('paintWorklet' in CSS) {
    console.log('paintWorklet supported');

    // TODO: add the paint worklet to our page
    CSS.paintWorklet.addModule('painter.js');
  } else {
    console.log('paintWorklet not supported');
  }
};

window.addEventListener('load', init);
