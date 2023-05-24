/* eslint-disable no-restricted-syntax, no-prototype-builtins, guard-for-in */

/*
  Object: A data structure in which data is stored as key value pairs.
  - In an object the key has to be a number, string, or symbol.
  - The value can be anything so also other objects, functions, etc.
  - An object is a nonordered data structure,
    i.e. the sequence of insertion of key value pairs is not remembered.
  - Regular objects have toString, constructor, valueOf, hasOwnProperty,
    isPrototypeOf and a bunch of other pre-existing properties.
  - You can iterate over the keys using for..in syntax.
  - We cannot directly determine the number of properties in a plain object.
  - Direct support with JSON.

  Map: A data structure in which data is stored as key value pairs.
  - Unique key maps to a value.
  - Both the key and the value can be in any data type.
  - Is an iterable data structure.
    This means that the sequence of insertion is remembered and
    that we can access the elements in e.g. a for..of loop.
  - Direct access to the size of the Map using the map.size property.
  - Not supported with JSON directly, need to provide custom Replacer and Reviver.
*/

console.log('// ====================== Object ==========================');
(() => {
  // Creation
  const o = {};
  // OR if you want to avoid Prototype Pollution/Garbage
  const empty = Object.create(null);
  console.log('Creation: ', o);

  // Single Value Update
  o.key = 1;
  empty.key = 1;
  o.key += 10;
  empty.key += 10;
  console.log('Single Value Update: ', o);

  // Bulk Value Update
  for (const k in o) o[k] += 1;
  // OR if you want to avoid Prototype Pollution/Garbage
  for (const k in empty) empty[k] += 1;
  console.log('Bulk Value Update: ', o);

  // Value Sum
  let sum = 0;
  for (const v of Object.values(o)) sum += v;
  console.log('Value Sum: ', sum);

  // Existance
  console.log('Existance: ', 'key' in o);
  // OR if you want to avoid Prototype Pollution/Garbage
  console.log('Existance, no Prototype Garbage: ', o.hasOwnProperty('key'));

  // Removal
  delete o.key;
  console.log('Removal: ', o);

  // Length
  console.log('Length: ', Object.keys(o).length);
})();
console.log('// ========================================================');

console.log('// ======================== Map ===========================');
(() => {
  // Creation
  const m = new Map();
  console.log('Creation: ', m);

  // Single Value Update
  m.set('key', 1);
  m.set('key', m.get('key') + 10);
  console.log('Single Value Update: ', m);

  // Bulk Value Update
  m.forEach((v, k) => m.set(k, m.get(k) + 1));
  // OR
  for (const k of m.keys()) m.set(k, m.get(k) + 1);
  console.log('Bulk Value Update: ', m);

  // Value Sum
  let sum = 0;
  for (const v of m.values()) sum += v;
  console.log('Value Sum: ', sum);

  // Existance
  console.log('Existance: ', m.has('key'));

  // Removal
  m.delete('key');
  console.log('Removal: ', m);

  // Length
  console.log('Length: ', m.size);
})();
console.log('// ========================================================');
