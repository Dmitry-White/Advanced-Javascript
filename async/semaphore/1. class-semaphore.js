/*
  The problem with this implementation is that we can easily write the code
  that acquires a semaphore but never release it.
  E.g:
    await semaphore.acquire();
    throw new Error('Boom!');
    semaphore.release();
  The work-around would be to wrap this entire chunk of code with a try-catch
  and do this every time.
*/

class Semaphore {
  constructor(max) {
    this.tasks = [];
    this.counter = max;
  }
  dispatch = () => {
    if (this.counter > 0 && this.tasks.length > 0) {
      this.counter--;
      this.tasks.shift()();
    }
  }
  release() {
    this.counter++;
    this.dispatch();
  }
  acquire() {
    return new Promise((resolve => {
      this.tasks.push(resolve);
      setImmediate(this.dispatch);
    }));
  }
}