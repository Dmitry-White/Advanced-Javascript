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

  // set up event handlers
  buttonSet.addEventListener('click', () => {
    const val = document.getElementById('lfVal').value;
    const key = document.getElementById('lfKey').value;

    // TODO: Store the data locally
  });
  buttonGet.addEventListener('click', () => {
    const key = document.getElementById('lfKey').value;

    // TODO: Retrieve the data
  });
  buttonDelete.addEventListener('click', () => {
    const key = document.getElementById('lfKey').value;

    // TODO: Delete the stored key
  });
  buttonList.addEventListener('click', () => {
    // TODO: Use iterate to list all the stored data

  });

  // TODO: LocalForage also supports multiple database instances
  buttonMulti.addEventListener('click', () => {

  });

  // TODO: Store data using the same key name into different database instances
  buttonStore.addEventListener('click', () => {

  });

  // TODO: Retrieve the data from separate instances using the same key name
  buttonGetData.addEventListener('click', () => {

  });
};

window.addEventListener('load', init);
