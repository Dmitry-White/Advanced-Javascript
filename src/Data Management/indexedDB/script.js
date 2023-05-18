const init = () => {
  const buttonSet = document.getElementById('btnSet');
  const buttonGet = document.getElementById('btnGet');
  const buttonDelete = document.getElementById('btnDel');
  const buttonList = document.getElementById('btnList');
  const buttonMulti = document.getElementById('btnMulti');
  const buttonStore = document.getElementById('btnStore');
  const buttonGetData = document.getElementById('btnGetData');

  let instance1;
  let instance2;

  const iterateListHandler = (value, key, index) => console.log(index, [key, value]);
  const loggingHandler = (str) => (val = '') => console.log(`${str}: ${val}`);

  // set up event handlers
  buttonSet.addEventListener('click', () => {
    const val = document.getElementById('lfVal').value;
    const key = document.getElementById('lfKey').value;

    // TODO: Store the data locally
    // eslint-disable-next-line
    localforage.setItem(key, val)
      .then(loggingHandler('SetItem stored'));
  });

  buttonGet.addEventListener('click', () => {
    const key = document.getElementById('lfKey').value;

    // TODO: Retrieve the data
    // eslint-disable-next-line
    localforage.getItem(key)
      .then(loggingHandler('GetItem retrieved'));
  });

  buttonDelete.addEventListener('click', () => {
    const key = document.getElementById('lfKey').value;

    // TODO: Delete the stored key
    // eslint-disable-next-line
    localforage.removeItem(key)
      .then(loggingHandler('RemoveItem removed'));
  });

  buttonList.addEventListener('click', () => {
    // TODO: Use iterate to list all the stored data
    // eslint-disable-next-line
    localforage.iterate(iterateListHandler)
      .then(loggingHandler('Itereation complete'));
  });

  // TODO: LocalForage also supports multiple database instances
  buttonMulti.addEventListener('click', () => {
    // eslint-disable-next-line
    instance1 = localforage.createInstance({ name: 'instance1' });
    // eslint-disable-next-line
    instance2 = localforage.createInstance({ name: 'instance2' });
  });

  // TODO: Store data using the same key name into different database instances
  buttonStore.addEventListener('click', () => {
    instance1.setItem('key1', 'instance 1 value');
    instance2.setItem('key1', 'instance 2 value');
  });

  // TODO: Retrieve the data from separate instances using the same key name
  buttonGetData.addEventListener('click', () => {
    instance1.iterate(iterateListHandler);
    instance2.iterate(iterateListHandler);
  });
};

window.addEventListener('load', init);
