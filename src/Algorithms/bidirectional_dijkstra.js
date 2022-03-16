import PriorityQueue from "../DataStructures/PriorityQueue";
import { getNeighbors } from "../globals";
import { relaxEdges } from "./dijkstra";

export function join(startVisitedNodes, targetVisitedNodes, status, current) {
	let startLength = startVisitedNodes.length;
	let targetLength = targetVisitedNodes.length;
	let visitedNodesInOrder = [];

	targetVisitedNodes[targetLength - 1].previous =
		startVisitedNodes[startLength - 1];

	for (let i = 0; i < targetLength; i++) {
		visitedNodesInOrder.push(startVisitedNodes[i]);
		visitedNodesInOrder.push(targetVisitedNodes[i]);
	}

	if (startLength > targetLength)
		visitedNodesInOrder.push(startVisitedNodes[startLength - 1]);

	return [visitedNodesInOrder, status, current];
}

export function checkIfNeighborsVisited(grid, current, movingForward) {
	let neighbors = getNeighbors(grid, current, !movingForward);

	for (let i in neighbors)
		if (
			movingForward
				? neighbors[i].isReverseVisited
				: neighbors[i].isVisited
		)
			return true;

	return false;
}

export function findBidirectionalPath(
	grid,
	start,
	target,
	startVisitedNodes,
	targetVisitedNodes,
	relaxEdges
) {
	let startPriorityQueue = new PriorityQueue();
	let targetPriorityQueue = new PriorityQueue();

	startPriorityQueue.enqueue(start, 0);
	targetPriorityQueue.enqueue(target, 0);

	while (!startPriorityQueue.isEmpty() && !targetPriorityQueue.isEmpty()) {
		let sCurrent = startPriorityQueue.dequeue().value;
		startVisitedNodes.push(sCurrent);
		sCurrent.isVisited = true;

		if (checkIfNeighborsVisited(grid, sCurrent, true))
			return join(startVisitedNodes, targetVisitedNodes, true, sCurrent);

		relaxEdges(grid, sCurrent, startPriorityQueue, false, target);

		let tCurrent = targetPriorityQueue.dequeue().value;
		targetVisitedNodes.push(tCurrent);
		tCurrent.isReverseVisited = true;

		if (checkIfNeighborsVisited(grid, tCurrent, false))
			return join(startVisitedNodes, targetVisitedNodes, true, tCurrent);

		relaxEdges(grid, tCurrent, targetPriorityQueue, true, target);
	}

	return join(startVisitedNodes, targetVisitedNodes, false);
}

export function bidirectionalDijkstra(
	grid,
	startRow,
	startCol,
	targetRow,
	targetCol
) {
	const start = grid[startRow][startCol];
	const target = grid[targetRow][targetCol];

	start.distance = 0;
	target.distance = 0;

	let startVisitedNodes = [];
	let targetVisitedNodes = [];

	return findBidirectionalPath(
		grid,
		start,
		target,
		startVisitedNodes,
		targetVisitedNodes,
		relaxEdges
	);
}
