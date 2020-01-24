function* foo_es6(url) {
  try {
    console.log('Requesting: ', url);
    const value = yield fetch(url);
    console.log('Value: ', value);
  } catch (error) {
    console.log('Oops: ', error);
    return false;
  }
}

const it = foo_es6('https://jsonplaceholder.typicode.com/todos');
console.log(it.next());
console.log(it.next());
