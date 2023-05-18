/*
  Async IIFE

  Async IIFE allows us to group together sequential code into
  a single unit called "task" - and then it immediately invokes this task.
  A task can depend on other tasks as a source of input and
  in produces one output as its return value as its result.

  Since it's an async function "task" variable will be a promise (future value),
  which means we can use it in other parts of our code.

  Key observation:
  We immediately start running the task, 
  but the very first line in the task - we wait,
  potentially for other tasks to finish, other promises.
  After that we finally do some work.
*/

const task = (async () => {
  // Await for dependency
  const thing = await otherTask;

  // Complete own objective
  const result = await doThings(thing);
  return result;
})();