import { GRID_HEIGHT, GRID_WIDTH, TYPE } from "../globals";

export function StairPattern(grid, start, target, type = TYPE.WALL) {
	let nodesToAnimate = [];
	let relevant = [start, target];
	let isUpward = Math.random() >= 0.5;

	let currentY = 0,
		currentX = 1 + Math.floor(Math.random() * (GRID_HEIGHT - 2));

	while (currentY < GRID_WIDTH - 1) {
		let node = grid[currentX][currentY];

		if (!relevant.includes(node))
			nodesToAnimate.push({ row: node.row, col: node.col });

		if (currentX === 1 || currentX === GRID_HEIGHT - 2)
			isUpward = !isUpward;

		++currentY;
		isUpward ? --currentX : ++currentX;
	}

	return nodesToAnimate;
}
