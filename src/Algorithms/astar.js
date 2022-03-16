import PriorityQueue from "../DataStructures/PriorityQueue";
import { TYPE, WEIGHT, getNeighbors } from "../globals";

// Manhatten distance
export function heuristic(node, target) {
	return Math.abs(node.row - target.row) + Math.abs(node.col - target.col);
}

export function relaxEdges(
	grid,
	current,
	openSet,
	target,
	runningInReverse = false
) {
	let neighbors = getNeighbors(grid, current, runningInReverse);
	for (let i in neighbors) {
		let neighbor = neighbors[i];

		let tentativeG =
			current.g + (neighbor.type !== TYPE.WEIGHT ? 1 : WEIGHT);
		if (tentativeG < neighbor.g) {
			neighbor.previous = current;
			neighbor.g = tentativeG;
			neighbor.f = tentativeG + heuristic(neighbor, target);
			openSet.enqueue(neighbor, neighbor.g);
		}
	}
}

export function astar(grid, startRow, startCol, targetRow, targetCol) {
	const start = grid[startRow][startCol];
	const target = grid[targetRow][targetCol];

	let visitedNodesInOrder = [];
	let openSet = new PriorityQueue();

	start.g = 0;
	start.f = heuristic(start, target);
	openSet.enqueue(start, start.g);

	while (!openSet.isEmpty()) {
		let current = openSet.dequeue().value;
		visitedNodesInOrder.push(current);
		current.isVisited = true;
		if (current === target) return [visitedNodesInOrder, true];

		relaxEdges(grid, current, openSet, target);
	}

	return [visitedNodesInOrder, false];
}
