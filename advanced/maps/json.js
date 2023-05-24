/*
  Problem:
  The keys of a Map can be anything, including objects.
  But JSON syntax only allows strings as keys.

  Solution:
  Both JSON.stringify and JSON.parse support a second argument
  replacer and reviver respectively.
  With replacer and reviver below it's possible to add support for native Map object,
  including deeply nested values.
*/

function replacer(key, value) {
  if (value instanceof Map) {
    return {
      dataType: 'Map',
      value: Array.from(value.entries()), // or with spread: value: [...value]
    };
  }

  return value;
}

function reviver(key, value) {
  if (typeof value === 'object' && value !== null) {
    if (value.dataType === 'Map') {
      return new Map(value.value);
    }
  }
  return value;
}

const originalValue = [
  new Map([
    [
      'a',
      {
        b: {
          c: new Map([['d', 'text']]),
        },
      },
    ],
  ]),
];
const str = JSON.stringify(originalValue, replacer);
const newValue = JSON.parse(str, reviver);

console.log('Original Value: ', originalValue);
console.log('String: ', str);
console.log('New Value: ', newValue);
