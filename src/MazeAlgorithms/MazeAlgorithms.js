import { RecursiveDivision } from "./recursive_division";
import { TYPE } from "../globals";
import { RandomMaze } from "./random_maze";
import { StairPattern } from "./stair_pattern";

export function getMazeAlgorithm(name) {
	switch (name) {
		case "Recursive Division":
			return [RecursiveDivision, TYPE.WALL];
		case "Random Maze":
			return [RandomMaze, TYPE.WALL];
		case "Random Weight Maze":
			return [RandomMaze, TYPE.WEIGHT];
		case "Stair Pattern":
			return [
				StairPattern,
				Math.random() > 0.7 ? TYPE.WALL : TYPE.WEIGHT,
			];
		default:
			break;
	}
}
