// Maps: Challenge

// Below is a list of Oscar-winning Best Pictures from the last several years.
// 2020 - "Parasite"
// 2019 - "Green Book"
// 2018 - "The Shape of Water"
// 2017 - "Moonlight"
// 2016 - "Spotlight"
// 2015 - "Birdman"
// 2014 - "12 Years a Slave"
// 2013 - "Argo"

// 1. Create a new Map with the Best Pictures list from above.
// Make sure your keys are the year, BUT they can be any format.
const films = new Map();
films.set(2020, 'Parasite');
films.set(2019, 'Green Book');
films.set(2018, 'The Shape of Water');
films.set(2017, 'Moonlight');
films.set(2016, 'Spotlight');
films.set(2015, 'Birdman');
films.set(2014, '12 Years a Slave');
films.set(2013, 'Argo');
console.log('Films: ', films);

// 2. What film won best picture in 2015?
const bestPicture2015 = films.get(2015);
console.log('Best Picture 2015: ', bestPicture2015);

// 3. Does this list contain Best Picture from 2010? 2018?
console.log('Best Picture 2010: ', films.has(2010));
console.log('Best Picture 2018: ', films.has(2018));

// 4. How many films are included in this list?
const numberOfFilms = films.size;
console.log('Number of Films: ', numberOfFilms);

// 5. What is the second key in this movies Map?
const filmKeys = films.keys();
filmKeys.next();
console.log('Second Year: ', filmKeys.next().value);

// 6. What is the third value in this movies Map?
const filmValues = films.values();
filmValues.next();
filmValues.next();
console.log('Third Film: ', filmValues.next().value);

// 7. What is the first set of entries in this movies Map?
const filmEntries = films.entries();
console.log('First Film Data: ', filmEntries.next().value);

// 8. Loop over the map, and if the movie won Best Picture before 2017,
// log it in the console. Include the year and the movie.
films.forEach(
  (value, key) =>
    key < 2017 && console.log(`Film "${value}" won Best Picture in ${key}`),
);

// 9. Delete the Best Picture from 2013 from your movies Map.
films.delete(2013);
console.log('No 2013 films: ', films);

// 10. Clear your movies Map.
films.clear();
console.log('Cleared films: ', films);
