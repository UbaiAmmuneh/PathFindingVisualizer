import { unweighted } from "./unweighted";

export function bfs(grid, startRow, startCol, targetRow, targetCol) {
	return unweighted(grid, startRow, startCol, targetRow, targetCol, true);
}
