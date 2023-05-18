/*
  Instead of returning an object like with class-based semaphore,
  we could return a high-order function that wraps around other functions
  with a call to acquire and release.
  We do the same thing with acquiring a place in a queue,
  catch any potential errors and make sure to always release a spot (finally).
*/

const Semaphore = (max) => {
  const tasks = [];
  let counter = max;

  const dispatch = () => {
    if (counter > 0 && tasks.length > 0) {
      counter--;
      tasks.shift()();
    }
  };

  const release = () => {
    counter++;
    dispatch();
  };

  const acquire = () => {
    return new Promise((resolve => {
      tasks.push(resolve);
      setImmediate(dispatch);
    }));
  };

  hofHandler = async (fn) => {
    const spot = await acquire();
    let result;
    try {
      result = await spot(fn);
    } catch (error) {
      throw error;
    } finally {
      release();
    }
  };
  
  return hofHandler;
};

// Usage
const importMP3 = async (file) => {/* ... */}

const semaphore = Semaphore(4);
const result = await semaphore(
  async () => {
    console.log('Acquired!');
    return await importMP3(file);
  }
);