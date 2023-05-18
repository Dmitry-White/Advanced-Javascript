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

console.log('-------- ES6 Generator ---------');
const it_es6 = foo_es6('https://jsonplaceholder.typicode.com/todos');
const value_es6 = it_es6.next();
console.log('Final: ', it_es6.next(value_es6));
console.log('--------------------------------');
// ---------------------------------------------

// ------------ Pre-ES6 Generator --------------

// Function needs to return a generator
function foo_pre(url) {
  // Generator state
  var state;

  // Generator-wide variable declaration
  var sharedValue;

  // Handle each state
  function handleState(value) {
    switch (state) {
      case 1:
        // STATE 1
        // Initial state
        console.log('Requesting: ', url);
        return fetch(url);
      case 2:
        // STATE 2
        // Success state
        sharedValue = value;
        console.log('Value: ', sharedValue);
        return;
      case 3:
        // STATE 3
        // Failure state
        var error = value;
        console.log('Oops: ', error);
        return false;
    }
  }

  // Make and return a generator
  return {
    next: function (value) {
      if (!state) {
        // STATE 1
        // Initial state
        state = 1;
        return {
          done: false,
          value: handleState()
        }
      } else if (state === 1) {
        // STATE 2
        // Success state
        state = 2;
        return {
          done: true,
          value: handleState(value)
        }
      };

      // Generator completed
      return {
        done: true,
        value: undefined
      }
    },
    throw: function (error) {
      if (state === 1) {
        // STATE 3
        // Failure state
        state = 3;
        return {
          done: true,
          value: handleState(error)
        }
      }

      // Case for error NOT during the request
      throw error;
    }
  }
}

console.log('------- Pre-ES6 Generator ------');
const it_pre = foo_pre('https://jsonplaceholder.typicode.com/todos');
const value_pre = it_pre.next();
console.log('Final: ', it_pre.next(value_pre));
console.log('--------------------------------');
// ---------------------------------------------