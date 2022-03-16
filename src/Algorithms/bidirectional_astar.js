import { findBidirectionalPath } from "./bidirectional_dijkstra";
import { relaxEdges, heuristic } from "./astar";

export function bidirectionalAstar(
	grid,
	startRow,
	startCol,
	targetRow,
	targetCol
) {
	const start = grid[startRow][startCol];
	const target = grid[targetRow][targetCol];

	start.g = 0;
	start.f = heuristic(start, target);

	target.g = 0;
	target.f = heuristic(target, start);

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
