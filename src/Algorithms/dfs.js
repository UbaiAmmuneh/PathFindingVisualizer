import { unweighted } from "./unweighted";

export function dfs(grid, startRow, startCol, targetRow, targetCol) {
	return unweighted(grid, startRow, startCol, targetRow, targetCol, false);
}
