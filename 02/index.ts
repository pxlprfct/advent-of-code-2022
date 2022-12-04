// Rock Paper Scissors - https://adventofcode.com/2022/day/2

// scores for each move
const ROCK = 1;
const PAPER = 2;
const SCISSORS = 3;

// bonus score given on round win
const ROUND_WINNER = 6;
const ROUND_DRAW = 3;
const ROUND_LOST = 0;

const OpponentMoveToScore = {
  A: ROCK,
  B: PAPER,
  C: SCISSORS,
} as const;
type OpponentMove = keyof typeof OpponentMoveToScore;

const PlayerMoveToScore = {
  X: ROCK,
  Y: PAPER,
  Z: SCISSORS,
} as const;
type PlayerMove = keyof typeof PlayerMoveToScore;

const isDraw = (opponentMove: OpponentMove, playerMove: PlayerMove) =>
  OpponentMoveToScore[opponentMove] === PlayerMoveToScore[playerMove];

const calculateDrawScore = (playerMove: PlayerMove) =>
  PlayerMoveToScore[playerMove] + ROUND_DRAW;

const calculateWinScore = (playerMove: PlayerMove) =>
  PlayerMoveToScore[playerMove] + ROUND_WINNER;

const calculateLossScore = (playerMove: PlayerMove) =>
  PlayerMoveToScore[playerMove] + ROUND_LOST;

const WINNING_COMBINATIONS = [
  [OpponentMoveToScore.A, PlayerMoveToScore.Y],
  [OpponentMoveToScore.B, PlayerMoveToScore.Z],
  [OpponentMoveToScore.C, PlayerMoveToScore.X],
] as const;

const calculateScore = (opponentMove: OpponentMove, playerMove: PlayerMove) => {
  // it's a draw if the moves are the same
  if (isDraw(opponentMove, playerMove)) {
    return calculateDrawScore(playerMove);
  }

  // go through the winning combinations and see if the opponent move and player move match
  if (
    WINNING_COMBINATIONS.some(
      ([opponent, player]) =>
        opponent === OpponentMoveToScore[opponentMove] &&
        player === PlayerMoveToScore[playerMove]
    )
  ) {
    return calculateWinScore(playerMove);
  }

  return calculateLossScore(playerMove);
};

export const getRockPaperScissors = async () => {
  // read from file
  const file = await Deno.readTextFile("02/input.txt");
  // template literals! 🎉🎉🎉
  const lines = file.split("\n") as Array<`${OpponentMove} ${PlayerMove}`>;

  let score = 0;
  lines.forEach((line) => {
    // TODO: is there a way _not_ to define this type again?
    const [opponent, player] = line.split(" ") as [OpponentMove, PlayerMove];

    // ignore the last line (it's empty)
    if (opponent && player) {
      score += calculateScore(opponent, player);
    }
  });

  return score;
};
