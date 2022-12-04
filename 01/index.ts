// Calorie Counting - https://adventofcode.com/2022/day/1

export const getCalorieCount = async () => {
  // read from file
  const file = await Deno.readTextFile("01/input.txt");

  // break on new line
  const lines = file.split("\n");

  const elves = [];
  let elf = [];

  // loop through every line
  for (let index = 0; index < lines.length; index++) {
    // get the calorie on each line
    const calorieCount = lines[index];

    // if there's a value, add it to the the 'elf'
    if (calorieCount) {
      elf.push(Number(calorieCount));
    } else {
      // if there's no value, add the elf to the elves array
      elves.push(elf);
      // reset the 'elf'
      elf = [];
    }
  }

  // loop over each elf and add up all their calories
  const calorieCountPerElf = elves.map((elf) => elf.reduce((a, b) => a + b, 0));

  // return the elf with the most calories
  return Math.max(...calorieCountPerElf);
};
