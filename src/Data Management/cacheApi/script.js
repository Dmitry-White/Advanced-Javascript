const init = () => {
  const URL = 'https://httpbin.org/json';
  const CACHE_NAME = 'my-cache';

  const buttonGet = document.getElementById('btnGet');
  const buttonClear = document.getElementById('btnClear');

  const getJSONData = (url, cacheName) => {
    // TODO: First check the cache to see if we already have the data

    // fetch the request normally
    fetch(url).then((result) => {
      // TODO: Make a copy of the response since it can only be read once

      // TODO: Add the result to the cache
      result.text().then((data) => {
        console.log(data);
      });
    });
  };

  const clearCachedData = () => {};

  buttonGet.addEventListener('click', () => getJSONData(URL, CACHE_NAME));

  buttonClear.addEventListener('click', () => clearCachedData(CACHE_NAME));
};

window.addEventListener('load', init);
