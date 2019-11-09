const numberOfPlatoon = 45;

const platoon = () => {
  const warriorsPerPlatoon = 60;
  const totalWarriors = numberOfPlatoon * warriorsPerPlatoon;
  return `Our army is ${totalWarriors} strong!`;
};

console.log(platoon());
