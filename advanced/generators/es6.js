function* generateDataES6(url) {
  // STATE 1
  // Initial state
  try {
    console.log('Requesting: ', url);
    const tmp1 = fetch(url);

    // STATE 2
    // Success state
    const value = yield tmp1;
    console.log('Value: ', value);
    return null;
  } catch (error) {
    // STATE 3
    // Failure state
    console.log('Oops: ', error);
    return error;
  }
}

console.log('-------- ES6 Generator ---------');
const itES6 = generateDataES6('https://jsonplaceholder.typicode.com/todos');
const valueES6 = itES6.next();
console.log('Final: ', itES6.next(valueES6));
console.log('--------------------------------');
