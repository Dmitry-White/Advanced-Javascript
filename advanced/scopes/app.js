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

const screamWarrior = () => {
  console.log(warriors);
  warriors.forEach((warrior) => {
    const { name, type, agility } = warrior;
    console.log(`${name}, who is a ${type}, has an agility of ${agility}`);
  });
};

screamWarrior();
