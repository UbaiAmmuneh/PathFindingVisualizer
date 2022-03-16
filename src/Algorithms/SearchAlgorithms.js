import { dijkstra } from "./dijkstra";
import { astar } from "./astar";
import { bidirectionalDijkstra } from "./bidirectional_dijkstra";
import { bidirectionalAstar } from "./bidirectional_astar";
import { bfs } from "./bfs";
import { dfs } from "./dfs";

export function getAlgorithm(name) {
	switch (name) {
		case "Dijkstra":
			return dijkstra;
		case "A*":
			return astar;
		case "Bidirectional Dijkstra":
			return bidirectionalDijkstra;
		case "Bidirectional A*":
			return bidirectionalAstar;
		case "Breadth-first":
			return bfs;
		case "Depth-first":
			return dfs;
		default:
			break;
	}
}
