import PriorityQueue from "../DataStructures/PriorityQueue";
import { TYPE, WEIGHT, getNeighbors } from "../globals";

export function relaxEdges(
	grid,
	current,
	priorityQueue,
	runningInReverse = false,
	target = null
) {
	let neighbors = getNeighbors(grid, current, runningInReverse);
	for (let i in neighbors) {
		let neighbor = neighbors[i];
		let d = current.distance + (neighbor.type !== TYPE.WEIGHT ? 1 : WEIGHT);
		if (d < neighbor.distance) {
			neighbor.distance = d;
			neighbor.previous = current;
			priorityQueue.enqueue(neighbor, neighbor.distance);
		}
	}
}

export function dijkstra(grid, startRow, startCol, targetRow, targetCol) {
	const start = grid[startRow][startCol];
	const target = grid[targetRow][targetCol];
	const visitedNodesInOrder = [];
	let priorityQueue = new PriorityQueue();

	start.distance = 0;
	priorityQueue.enqueue(start, 0);

	while (!priorityQueue.isEmpty()) {
		let current = priorityQueue.dequeue().value;
		visitedNodesInOrder.push(current);
		current.isVisited = true;
		if (current === target) return [visitedNodesInOrder, true];

		relaxEdges(grid, current, priorityQueue);
	}

	return [visitedNodesInOrder, false];
}
