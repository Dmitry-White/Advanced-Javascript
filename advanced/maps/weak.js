/*
  A WeakMap is a collection of key/value pairs whose keys must be objects.

  Object's presence as a key in a WeakMap does not prevent the object
  from being garbage collected. Once an object used as a key has been collected,
  its corresponding values in any WeakMap become candidates for garbage collection as well.

  Why such a limitation? If an object has lost all other references,
  then it is to be garbage-collected automatically.
  But technically it’s not exactly specified when the cleanup happens.
  So, technically, the current element count of a WeakMap is not known.
  Element list depends on the state of garbage collection,
  and as a result - non-deterministic in nature.
  For that reason, methods that access all keys/values are not supported.

  Usage:
    - third-party code data storage
    - object caching
    - memory leak and performance optimazation
*/

const newYork = { city: 'New York' };
const nola = { city: 'New Orleans' };
const chicago = { city: 'Chicago' };
const losAngeles = { city: 'Los Angeles' };

// Create a WeakMap using the provided variables as keys.
// Set the value to whatever term you think of when you hear
// those cities. The value can be anything. Hint: use set()
const gameCities = new WeakMap();
gameCities.set(newYork, 'GTA 4');
gameCities.set(nola, 'Mafia 3');
gameCities.set(chicago, 'Watch Dogs');
gameCities.set(losAngeles, 'GTA 5');
console.log('Game Cities: ', gameCities);

// Get the value associated with the key: nola.
const nolaGame = gameCities.get(nola);
console.log(`Game set in ${nola.city}: ${nolaGame}`);

// Get the value associated with the key: dallas.
const dallas = { city: 'Dallas' };
const dallasGame = gameCities.get(dallas);
console.log(`Game set in ${dallas.city}: ${dallasGame}`);

// Does this WeakMap have the key: newYork?
console.log(`Has games set in ${newYork.city}: ${gameCities.has(newYork)}`);

// Delete the following key from your WeakMap: chicago
gameCities.delete(chicago);
console.log('No Chicago Game Cities: ', gameCities);
