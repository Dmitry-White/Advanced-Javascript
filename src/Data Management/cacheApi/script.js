const init = () => {
  const URL = 'https://httpbin.org/json';
  const CACHE_NAME = 'my-cache';

  const buttonGet = document.getElementById('btnGet');
  const buttonClear = document.getElementById('btnClear');

  const cacheHandler = (cache, result, url) => {
    if (result === undefined) {
      console.log('Not found in cache: ', url);
      fetch(url).then((res) => {
        const responseClone = res.clone();

        cache.put(url, res);
        responseClone.text()
          .then((data) => console.log('Network hit: ', data));
      });
    } else {
      console.log('Found in cache: ', url);

      result.text()
        .then((data) => console.log('Cache hit: ', data));
    }
  };

  const getJSONData = (url, cacheName) => {
    if ('caches' in window) {
      caches.open(cacheName)
        .then(
          (cache) => cache.match(url)
            .then((res) => cacheHandler(cache, res, url)),
        );
    } else {
      console.log('Cache API is not available');
    }
  };

  const clearCachedData = (cacheName) => {
    if ('caches' in window) {
      caches.delete(cacheName)
        .then((res) => console.log(res ? 'Cache Deleted' : 'Error'));
    } else {
      console.log('Cache API is not available');
    }
  };

  buttonGet.addEventListener('click', () => getJSONData(URL, CACHE_NAME));

  buttonClear.addEventListener('click', () => clearCachedData(CACHE_NAME));
};

window.addEventListener('load', init);
