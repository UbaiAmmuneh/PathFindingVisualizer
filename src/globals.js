const GRID_WIDTH = 50;
const GRID_HEIGHT = 30;
const START_ROW = 10;
const START_COL = 10;
const TARGET_ROW = 20;
const TARGET_COL = 40;
const WEIGHT = 10;
const VISITED_TIME_GAP = 10;
const PATH_TIME_GAP = 30;
const TUTORIAL_PAGES = 7;

function getNeighbors(grid, node, runningInReverse = false) {
	const neighbors = [];

	if (node.row > 0) neighbors.push(grid[node.row - 1][node.col]);
	if (node.row < grid.length - 1)
		neighbors.push(grid[node.row + 1][node.col]);
	if (node.col > 0) neighbors.push(grid[node.row][node.col - 1]);
	if (node.col < grid[0].length - 1)
		neighbors.push(grid[node.row][node.col + 1]);

	return neighbors.filter(
		(neighbor) =>
			(runningInReverse
				? !neighbor.isReverseVisited
				: !neighbor.isVisited) && neighbor.type !== TYPE.WALL
	);
}

function getShortestPath(grid, targetRow, targetCol, connectionNode) {
	let travel = (start, shortestPath, runningInReverse = false) => {
		let current = start;

		while (current != null) {
			if (runningInReverse) shortestPath.push(current);
			else shortestPath.unshift(current);
			current = current.previous;
		}
	};

	let travelNearest = (runningInReverse, shortestPath) => {
		let neighbors = getNeighbors(
			grid,
			connectionNode,
			runningInReverse
		).filter((x) => (!runningInReverse ? x.isReverseVisited : x.isVisited));

		let closestNode = null;
		for (let i in neighbors)
			if (
				closestNode === null ||
				neighbors[i].distance < closestNode.distance
			)
				closestNode = neighbors[i];

		travel(closestNode, shortestPath, !runningInReverse);
	};

	const shortestPath = [];

	if (connectionNode !== undefined) {
		travelNearest(false, shortestPath);
		shortestPath.unshift(connectionNode);
		travelNearest(true, shortestPath);
	} else travel(grid[targetRow][targetCol], shortestPath);

	return shortestPath;
}

const TYPE = {
	START: "start-tile",
	TARGET: "target-tile",
	WALL: "wall-tile",
	WEIGHT: "weight-tile",
	EMPTY: "",
};

export {
	GRID_HEIGHT,
	GRID_WIDTH,
	START_ROW,
	START_COL,
	TARGET_ROW,
	TARGET_COL,
	WEIGHT,
	VISITED_TIME_GAP,
	PATH_TIME_GAP,
	TYPE,
	TUTORIAL_PAGES,
	getNeighbors,
	getShortestPath,
};
