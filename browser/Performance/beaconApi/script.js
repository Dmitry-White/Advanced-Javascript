(() => {
  const beaconURL = 'https://putsreq.com/o68jJ35Is0GdNuhiVnMc';

  const LOAD_MESSAGE = 'loadEvent';
  const UNLOAD_MESSAGE = 'unloadEvent';
  const BUTTON_CLICK_MESSAGE_1 = 'Button 1 click';
  const BUTTON_CLICK_MESSAGE_2 = 'Button 2 click';

  const buttonOne = document.querySelector('#btn1');
  const buttonTwo = document.querySelector('#btn2');

  const sendEvent = (strEvent) =>
    navigator.sendBeacon && navigator.sendBeacon(beaconURL, strEvent);

  window.addEventListener('load', () => sendEvent(LOAD_MESSAGE));

  buttonOne.addEventListener('click', () => sendEvent(BUTTON_CLICK_MESSAGE_1));
  buttonTwo.addEventListener('click', () => sendEvent(BUTTON_CLICK_MESSAGE_2));

  window.addEventListener('unload', () => sendEvent(UNLOAD_MESSAGE));
})();
