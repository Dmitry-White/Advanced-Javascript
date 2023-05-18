const init = () => {
  const buttonRequesInfo = document.querySelector('#btnReqPers');
  const deviceMemory = document.querySelector('#devMem');
  const storageEstimate = document.querySelector('#dtEst');
  const storageUsage = document.querySelector('#dtUsage');
  const storagePersisted = document.querySelector('#dtPersisted');

  if (navigator.storage && navigator.storage.estimate) {
    navigator.storage.estimate()
      .then((estimate) => {
        storageEstimate.textContent = estimate.quota;
        storageUsage.textContent = estimate.usage;
      });
  }

  if (navigator.storage && navigator.storage.persisted) {
    navigator.storage.persisted()
      .then((persisted) => {
        storagePersisted.textContent = persisted ? 'true' : 'false';
      });
  }

  if (navigator.deviceMemory) {
    deviceMemory.textContent = navigator.deviceMemory;
  }

  buttonRequesInfo.addEventListener('click', () => {
    if (navigator.storage) {
      navigator.storage.persist()
        .then((res) => (res
          ? console.log('Storage is persistent')
          : console.log('Unable to make storage persistent')));
    }
  });
};

window.addEventListener('load', init);
