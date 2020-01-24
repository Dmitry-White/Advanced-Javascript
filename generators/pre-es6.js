// --------------- ES6 Generator ---------------

function* foo_es6(url) {
  // STATE 1
  // Initial state
  try {
    console.log('Requesting: ', url);
    const tmp1 = fetch(url);

    // STATE 2
    // Success state
    const value = yield tmp1;
    console.log('Value: ', value);
  } catch (error) {
    // STATE 3
    // Failure state
    console.log('Oops: ', error);
    return false;
  }
}

const it = foo_es6('https://jsonplaceholder.typicode.com/todos');
console.log(it.next());
console.log(it.next());
// ---------------------------------------------


// ------------ Pre-ES6 Generator --------------

// Function needs to return a generator
function foo_pre(url) {

  // Make and return a generator
  return {
    next: function (value) { },
    throw: function (error) { }
  }
}

const it = foo_pre('https://jsonplaceholder.typicode.com/todos');
console.log(it.next());
console.log(it.next());
// ---------------------------------------------