/*
  The Set object lets you store unique values and remembers the original insertion order.
  Any primitive values or object references may be used as a value.
  A value in the set may only occur once;
*/

// Letters Guessed
// You are playing a game of snowman with a friend and keep track of
// letters that have been guessed using Set().
// Follow the tasks below to test your knowledge.

// 1. So far, your friend has gussed the following letters: r, s, t, l, n, e.
// Create a Set using the letters guessed thus far.
const guesses = new Set();
guesses.add('r');
guesses.add('s');
guesses.add('t');
guesses.add('l');
guesses.add('n');
guesses.add('e');
console.log('Guesses: ', guesses);

// 2. Your friend takes another guess: p. Before you add it to the set check
// to see if the Set has 'p'. If not, add it to the Set.
const newGuess = 'p';
console.log('New Guess: ', guesses.has(newGuess));
guesses.add(newGuess);
console.log('With New Guess: ', guesses);

// 3. At this point, we will assume your friend hasn't tried to guess the same letter twice.
// The size of the Set will indicate how many guesses he's made. How many guesses
// has your friend made?
console.log('Guesses Number: ', guesses.size);

// 4. Delete the letter 'l' from your Set.
const outdatedGuess = 'l';
guesses.delete(outdatedGuess);
console.log('Guesses without "l": ', guesses);

// 5. What is the second value in your Set?
const guessValues = guesses.values();
guessValues.next();
console.log('Second Guess: ', guessValues.next().value);

// 6. What is the first entry in your Set?
const guessEntries = guesses.entries();
console.log('First Guess Entry: ', guessEntries.next().value);

// 7. For each entry in your Set, log out whether the guess was a consonant or a vowel.
const vowels = ['a', 'e', 'i', 'o', 'u'];
guesses.forEach((guessEntry) => {
  vowels.includes(guessEntry)
    ? console.log(`${guessEntry} is a vowel.`)
    : console.log(`${guessEntry} is a consonant.`);
});

// 8. Clear your Set!
guesses.clear();
console.log('Cleared guesses: ', guesses);
