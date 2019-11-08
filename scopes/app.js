'use strict'
console.log('Hello Scopes!');

const warrior = {
    name: 'Jujin Take',
    type: 'Ninja',
    weapon: 'Shuriken',
    agility: 79,
};

const screamWarrior = () => {
    const warrior2 = 'Samurai';
    warrior3 = 'Viking';
    return {
        shootWarrior: () => console.log(warrior, warrior2),
    };
};

const newWarrior = screamWarrior();
newWarrior.shootWarrior();

console.log(warrior, warrior3);
