// TODO: Declare event listeners for the online state change


// Update the UI with the current network state and information
function updateNetState(evt) {
  const statusElem = document.getElementById('netState');
  // TODO: get the online status


  // TODO: update the online status


  // TODO: check the connection type with the Network Information API
  if (navigator.connection) {

  }


  outputDiv = document.getElementById('targetElem');

  // TODO: record the initial visibility state of the tab


  // TODO: set up event listeners for visibility changes
}

window.addEventListener('load', updateNetState);
