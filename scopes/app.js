let warrior1 = 'Ninja';
const warrior2 = 'Viking';
console.log(warrior1, warrior2);

warrior1 = 'Samurai';
console.log(warrior1, warrior2);

const screamWarrior = () => {
  const warrior4 = 'Canon shooter';
  if (warrior2 === 'Viking') {
    console.log(`Our army consists of ${warrior1}, ${warrior2} and ${warrior4}`);
  }
  console.log(warrior4);
};

screamWarrior();

console.log(warrior4);
