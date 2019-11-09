
console.log('Hello Scopes!');

const warrior = {
  name: 'Jujin Take',
  type: 'Ninja',
  weapon: 'Shuriken',
  agility: 79,
};
let warrior3;

const screamWarrior = () => {
  const warrior2 = 'Samurai';
  warrior3 = 'Viking';
  return {
    shootWarrior: () => console.log(warrior, warrior2),
  };
};

const newWarrior = screamWarrior();
newWarrior.shootWarrior();

console.log(warrior);

const warriors = [
  {
    name: 'Jujin Take',
    type: 'Ninja',
    weapon: 'Shuriken',
    agility: 79,
  },
  {
    name: 'Viggo Rusen',
    type: 'Viking',
    weapon: 'Swing blade',
    agility: 60,
  },
  {
    name: 'Ro Rake',
    type: 'Samurai',
    weapon: 'Boken',
    agility: 82,
  },
];

const listWarriors = () => console.log(warriors);

listWarriors();
