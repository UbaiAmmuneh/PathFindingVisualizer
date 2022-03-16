import { GRID_HEIGHT, GRID_WIDTH, TYPE } from "../globals";

export function RecursiveDivision(
	grid,
	start,
	target,
	type,
	boundRowStart = 2,
	boundRowFinish = GRID_HEIGHT - 2,
	boundColStart = 2,
	boundColFinish = GRID_WIDTH - 2,
	surroundingWalls = false,
	isHorizontal = true,
	nodesToAnimate = []
) {
	if (boundRowFinish < boundRowStart || boundColFinish < boundColStart)
		return;

	if (!surroundingWalls) {
		let relevant = [start, target];
		grid.forEach((row) => {
			row.forEach((node) => {
				if (!relevant.includes(node)) {
					if (
						node.row === 0 ||
						node.row === GRID_HEIGHT - 1 ||
						node.col === 0 ||
						node.col === GRID_WIDTH - 1
					)
						nodesToAnimate.push({ row: node.row, col: node.col });
				}
			});
		});

		surroundingWalls = true;
	}

	if (isHorizontal) {
		let possibleRows = [],
			possibleCols = [];

		for (let number = boundRowStart; number <= boundRowFinish; number += 2)
			possibleRows.push(number);
		for (
			let number = boundColStart - 1;
			number <= boundColFinish + 1;
			number += 2
		)
			possibleCols.push(number);

		let randomRowIndex = Math.floor(Math.random() * possibleRows.length);
		let randomColIndex = Math.floor(Math.random() * possibleCols.length);
		let currentRow = possibleRows[randomRowIndex];
		let colRandom = possibleCols[randomColIndex];

		grid.forEach((row) => {
			row.forEach((node) => {
				if (
					node.row === currentRow &&
					node.col !== colRandom &&
					node.col >= boundColStart - 1 &&
					node.col <= boundColFinish + 1
				)
					if (node.type === TYPE.EMPTY)
						nodesToAnimate.push({ row: node.row, col: node.col });
			});
		});

		RecursiveDivision(
			grid,
			start,
			target,
			type,
			boundRowStart,
			currentRow - 2,
			boundColStart,
			boundColFinish,
			surroundingWalls,
			currentRow - 2 - boundRowStart > boundColFinish - boundColStart,
			nodesToAnimate
		);

		RecursiveDivision(
			grid,
			start,
			target,
			type,
			currentRow + 2,
			boundRowFinish,
			boundColStart,
			boundColFinish,
			surroundingWalls,
			boundRowFinish - 2 - currentRow > boundColFinish - boundColStart,
			nodesToAnimate
		);
	} else {
		let possibleRows = [],
			possibleCols = [];

		for (let number = boundColStart; number <= boundColFinish; number += 2)
			possibleCols.push(number);
		for (
			let number = boundRowStart - 1;
			number <= boundRowFinish + 1;
			number += 2
		)
			possibleRows.push(number);

		let randomRowIndex = Math.floor(Math.random() * possibleRows.length);
		let randomColIndex = Math.floor(Math.random() * possibleCols.length);
		let currentCol = possibleCols[randomColIndex];
		let rowRandom = possibleRows[randomRowIndex];

		grid.forEach((row) => {
			row.forEach((node) => {
				if (
					node.col === currentCol &&
					node.row !== rowRandom &&
					node.row >= boundRowStart - 1 &&
					node.row <= boundRowFinish + 1
				)
					if (node.type === TYPE.EMPTY)
						nodesToAnimate.push({ row: node.row, col: node.col });
			});
		});

		RecursiveDivision(
			grid,
			start,
			target,
			type,
			boundRowStart,
			boundRowFinish,
			boundColStart,
			currentCol - 2,
			surroundingWalls,
			boundRowFinish - boundRowStart > currentCol - 2 - boundColStart,
			nodesToAnimate
		);

		RecursiveDivision(
			grid,
			start,
			target,
			type,
			boundRowStart,
			boundRowFinish,
			currentCol + 2,
			boundColFinish,
			surroundingWalls,
			boundRowFinish - boundRowStart > boundColFinish - 2 - currentCol,
			nodesToAnimate
		);
	}

	return nodesToAnimate;
}
