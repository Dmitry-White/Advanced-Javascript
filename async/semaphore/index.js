/*
  Semaphores are simply just a special way to represent limited resources.
  With a semaphore you can limit concurrent access to 
  a shared resource (CPU, database, network IO, even a client).
  In JS we can initialise a semaphore with a maximum amount of
  concurrent clients that are allowed to acquire the semaphore at the same time.
  Then using "await" we acquire (wait for) a place in a queue and
  once the spot is available, we do some work and
  release a place for other clients.
*/

const semaphore = new semaphore(4);

await semaphore.acquire();
// do things
semaphore.release();
