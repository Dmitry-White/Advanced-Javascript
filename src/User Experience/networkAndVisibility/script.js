// TODO: Declare event listeners for the online state change
const updateNetwork = () => {
  const { onLine, connection } = navigator;
  const statusElem = document.getElementById('netState');

  statusElem.className = onLine ? 'onlineState' : 'offlineState';
  statusElem.innerText = onLine ? 'ONLINE' : 'OFFLINE';

  // TODO: check the connection type with the Network Information API
  if (connection) {
    const { effectiveType, downlink, rtt } = connection;
    statusElem.innerText += `
      Effective type: ${effectiveType},
      Downlink speed: ${downlink}MB/s,
      Estimated round-trip time is: ${rtt}ms
    `;
  }
};

const updateVisibility = () => {
  const outputDiv = document.getElementById('targetElem');
  const outputVisibility = (div) => {
    div.innerHTML += `<p>Visibility state: ${document.visibilityState}</p>`;
  };

  document.addEventListener('visibilitychange', () => outputVisibility(outputDiv));

  outputVisibility(outputDiv);
};

// Update the UI with the current network state and information
const updateState = () => {
  updateNetwork();
  updateVisibility();
};

window.addEventListener('online', updateNetwork);
window.addEventListener('offline', updateNetwork);

window.addEventListener('load', updateState);
