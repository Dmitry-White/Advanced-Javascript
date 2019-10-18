const init = () => {
  const buttonRequesInfo = document.querySelector('#btnReqPers');
  const deviceMemory = document.querySelector('#devMem');

  // TODO: See how much space my origin has available
  if (navigator.storage && navigator.storage.estimate) {

  }

  // TODO: detect whether the app's data is marked as persistent
  if (navigator.storage && navigator.storage.persisted) {

  }

  // TODO: Request storage persistence from the browser
  buttonRequesInfo.addEventListener('click', () => {

  });

  // TODO: Determine the device memory available
  // For security purposes, this API only reports  0.25, 0.5, 1, 2, 4, 8
};

window.addEventListener('load', init);
