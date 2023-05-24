/*
  A WeakSet is a collection of values that must be objects.

  Object's presence as a value in a WeakSet does not prevent the object
  from being garbage collected. Once an object used as a value has been collected,
  its corresponding values in any WeakSet become candidates for garbage collection as well.

  Most primitive data types can be arbitrarily created and don't have a lifetime,
  so they cannot be stored.

  Usage:
    - Detecting circular references
      Functions that call themselves recursively need a way of
      guarding against circular data structures by
      tracking which objects have already been processed.
      The number of objects or their traversal order is immaterial,
      so a WeakSet is more suitable (and performant) than a Set for tracking object references,
      especially if a very large number of objects is involved.
*/

// Survey Respondents
const resOne = { id: 1234 };
const resTwo = { id: 5678 };
const resThree = { id: 9012 };
const resFour = { id: 3456 };

// Create a new WeakSet and add the above values to your newly created WeakSet.
const responses = new WeakSet();
responses.add(resOne);
responses.add(resTwo);
responses.add(resThree);
responses.add(resFour);
console.log('Responses: ', responses);

// Does your WeakSet have any responses tied to the {id: 9012}?
console.log(`Has response with ID ${resThree.id}: ${responses.has(resThree)}`);

// Does your WeakSet have any responses tied to the {id: 0123}?
const newResponse = { id: 123 };
console.log(
  `Has response with ID ${newResponse.id}: ${responses.has(newResponse)}`,
);

// We need to delete resThree from the WeakSet.
responses.delete(resThree);
console.log('No Response 3 responses: ', responses);
