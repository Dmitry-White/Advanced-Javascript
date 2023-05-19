/*
  If we want to limit how many times "importMP3" funciton can be called and
  be runnnig concurrently and whenever one file finishes - queue up another one,
  we could create a decorator (or HOF yet again) that is going to take
  any async function that usually runs with unlimited concurrency and
  return the same function but now composed with throtteling behaviour.
  And if you keep calling limited version of the async task, it just keeps
  queueing up these asyncs in the background.
*/

const limit = (max, fn) => {
  const semaphore = Semaphore(max);
  return (...args) => semaphore(() => fn(...args));
};

//  Usage
const importMP3 = async (file) => {
  /* ... */
};

const limitedImportMP3 = limit(2, importMP3);

limitedImportMP3(file1);
// starts immediately
limitedImportMP3(file2);
// starts immediately

limitedImportMP3(file3);
// waits for file1 or file2 to finish
