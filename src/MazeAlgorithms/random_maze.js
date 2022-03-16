import { TYPE } from "../globals";

export function RandomMaze(grid, start, target, type = TYPE.WALL) {
	let nodesToAnimate = [];
	grid.forEach((row) => {
		row.forEach((node) => {
			let relevant = [start, target];

			if (
				Math.random() < (type === TYPE.WALL ? 0.25 : 0.35) &&
				!relevant.includes(node)
			)
				nodesToAnimate.push({ row: node.row, col: node.col });
		});
	});

	return nodesToAnimate;
}
