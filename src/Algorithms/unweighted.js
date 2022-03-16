import { getNeighbors } from "../globals";

export function unweighted(
	grid,
	startRow,
	startCol,
	targetRow,
	targetCol,
	isBFS
) {
	const start = grid[startRow][startCol];
	const target = grid[targetRow][targetCol];
	const visitedNodesInOrder = [];

	start.isReverseVisited = true;
	let struct = [start];

	while (struct.length) {
		let current = isBFS ? struct.shift() : struct.pop();
		visitedNodesInOrder.push(current);
		if (!isBFS) current.isReverseVisited = true; // Using isReverseVisited to check if node is explored
		current.isVisited = true;

		if (current === target) return [visitedNodesInOrder, true];

		getNeighbors(grid, current, true).forEach((neighbor) => {
			if (isBFS) neighbor.isReverseVisited = true;
			neighbor.previous = current;
			struct.push(neighbor);
		});
	}

	return [visitedNodesInOrder, false];
}
