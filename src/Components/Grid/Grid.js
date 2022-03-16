import React, { Component } from "react";
import { getAlgorithm } from "../../Algorithms/SearchAlgorithms";
import { getMazeAlgorithm } from "../../MazeAlgorithms/MazeAlgorithms";
import {
	GRID_HEIGHT,
	GRID_WIDTH,
	START_ROW,
	START_COL,
	TARGET_ROW,
	TARGET_COL,
	VISITED_TIME_GAP,
	PATH_TIME_GAP,
	TYPE,
	getShortestPath,
	WEIGHT,
} from "../../globals";
import "./Grid.css";

export default class Grid extends Component {
	constructor(props) {
		super(props);
		this.state = {
			grid: [],
			startRow: START_ROW,
			startCol: START_COL,
			targetRow: TARGET_ROW,
			targetCol: TARGET_COL,
			startSelected: false,
			targetSelected: false,

			isMousePressed: false,
			wherePressed: "",
			mouseLeftTile: false,
			isWPressed: false,

			timeForAlgorithm: 0,
			timeForAnimation: 0,
			algorithmStatus: true,
			algorithmFinished: false,
		};

		this.generateEmptyGrid = this.generateEmptyGrid.bind(this);
		this.generateEmptyTile = this.generateEmptyTile.bind(this);
		this.checkWPressed = this.checkWPressed.bind(this);
		this.checkWReleased = this.checkWReleased.bind(this);
		this.moveStartOrTarget = this.moveStartOrTarget.bind(this);
		this.toggleWall = this.toggleWall.bind(this);
		this.checkClearBoard = this.checkClearBoard.bind(this);
		this.checkVisualize = this.checkVisualize.bind(this);
		this.checkPattern = this.checkPattern.bind(this);
		this.cleanGrid = this.cleanGrid.bind(this);
		this.clearBoard = this.clearBoard.bind(this);
		this.visualizePattern = this.visualizePattern.bind(this);
		this.visualizeAlgorithm = this.visualizeAlgorithm.bind(this);
		this.className = this.className.bind(this);
		this.animatePattern = this.animatePattern.bind(this);
		this.animateVisitedNodes = this.animateVisitedNodes.bind(this);
		this.animateShortestPath = this.animateShortestPath.bind(this);
	}

	componentDidMount() {
		const grid = this.generateEmptyGrid();
		this.setState({ grid });
		document.addEventListener("keydown", this.checkWPressed, false);
		document.addEventListener("keyup", this.checkWReleased, false);
	}

	componentDidUpdate() {
		this.checkClearBoard();
		this.checkVisualize();
		this.checkPattern();
	}

	generateEmptyTile(row, col) {
		return {
			ref: React.createRef(),

			row: row,
			col: col,
			type:
				row === this.state.startRow && col === this.state.startCol
					? TYPE.START
					: row === this.state.targetRow &&
					  col === this.state.targetCol
					? TYPE.TARGET
					: TYPE.EMPTY,

			isPath: false,

			isVisited: false,
			isReverseVisited: false,

			previous: null,

			distance: Infinity,
			f: Infinity,
			g: Infinity,
		};
	}

	generateEmptyGrid() {
		const grid = [];

		for (let row = 0; row < GRID_HEIGHT; row++) {
			const new_row = [];

			for (let col = 0; col < GRID_WIDTH; col++) {
				let new_tile = this.generateEmptyTile(row, col);
				new_row.push(new_tile);
			}

			grid.push(new_row);
		}

		return grid;
	}

	componentWillUnmount() {
		document.removeEventListener("keydown", this.checkWPressed, false);
		document.removeEventListener("keyup", this.checkWReleased, false);
	}

	checkWPressed(e) {
		if (e.key === "w" || e.key === "W") this.setState({ isWPressed: true });
	}

	checkWReleased(e) {
		if (e.key === "w" || e.key === "W")
			this.setState({ isWPressed: false });
	}

	moveStartOrTarget(row, col) {
		if (
			this.state.grid[row][col].type === TYPE.START ||
			this.state.grid[row][col].type === TYPE.TARGET
		)
			return;
		const new_grid = this.state.grid.slice();
		if (this.state.startSelected) {
			const old_start_node =
				this.state.grid[this.state.startRow][this.state.startCol];
			const new_start_node = this.state.grid[row][col];
			old_start_node.type = TYPE.EMPTY;
			old_start_node.ref.current.className =
				this.className(old_start_node);
			new_start_node.type = TYPE.START;
			new_start_node.ref.current.className =
				this.className(new_start_node);

			new_grid[this.state.startRow][this.state.startCol] = old_start_node;
			new_grid[row][col] = new_start_node;

			this.setState({ startRow: row, startCol: col, grid: new_grid });
		} else {
			const old_target_node =
				this.state.grid[this.state.targetRow][this.state.targetCol];
			const new_target_node = this.state.grid[row][col];
			old_target_node.type = TYPE.EMPTY;
			old_target_node.ref.current.className =
				this.className(old_target_node);
			new_target_node.type = TYPE.TARGET;
			new_target_node.ref.current.className =
				this.className(new_target_node);

			new_grid[this.state.targetRow][this.state.targetCol] =
				old_target_node;
			new_grid[row][col] = new_target_node;

			this.setState({ targetRow: row, targetCol: col, grid: new_grid });
		}
	}

	toggleWall(row, col) {
		if (
			this.state.grid[row][col].type === TYPE.START ||
			this.state.grid[row][col].type === TYPE.TARGET
		)
			return;
		const new_grid = this.state.grid.slice();
		const node = new_grid[row][col];
		if (
			this.state.isWPressed &&
			this.props.selectedAlgorithm !== "Breadth-first" &&
			this.props.selectedAlgorithm !== "Depth-first"
		) {
			if (node.type === TYPE.WEIGHT) node.type = TYPE.EMPTY;
			else node.type = TYPE.WEIGHT;
		} else {
			if (node.type === TYPE.WALL) node.type = TYPE.EMPTY;
			else node.type = TYPE.WALL;
		}
		new_grid[row][col] = node;
		this.setState({ grid: new_grid });
	}

	handleMouseDown(e, row, col) {
		if (this.props.isAlgorithmRunning) return;
		if (this.state.grid[row][col].type === TYPE.START)
			this.setState({ startSelected: true });
		else if (this.state.grid[row][col].type === TYPE.TARGET)
			this.setState({ targetSelected: true });
		else {
			this.toggleWall(row, col);
			this.setState({
				isMousePressed: true,
				wherePressed: e.target.getAttribute("id"),
				mouseLeftTile: false,
			});
		}
	}

	handleMouseEnter(e, row, col) {
		if (this.props.isAlgorithmRunning) return;
		if (this.state.startSelected || this.state.targetSelected)
			return this.moveStartOrTarget(row, col);
		if (!this.state.isMousePressed) return;
		if (this.state.mouseLeftTile) return this.toggleWall(row, col);
		if (e.target.getAttribute("id") !== this.state.wherePressed)
			this.setState({ mouseLeftTile: true }, () =>
				this.toggleWall(row, col)
			);
	}

	handleMouseUp() {
		if (this.props.isAlgorithmRunning) return;
		this.setState({
			isMousePressed: false,
			startSelected: false,
			targetSelected: false,
		});
	}

	async cleanGrid(keepType = true) {
		const new_grid = this.state.grid.slice();
		for (let row in new_grid)
			for (let col in new_grid[row]) {
				let node = { ...this.state.grid[row][col] };
				let new_node = this.generateEmptyTile(row, col);

				for (let i in new_node) {
					if (
						((!keepType &&
							node.type !== TYPE.START &&
							node.type !== TYPE.TARGET) ||
							i !== "type") &&
						i !== "row" &&
						i !== "col" &&
						i !== "ref"
					)
						node[i] = new_node[i];
				}

				new_grid[row][col] = node;
			}
		this.setState({ grid: new_grid });
	}

	async clearBoard() {
		const newGrid = this.generateEmptyGrid();
		this.setState({
			grid: newGrid,
			timeForAlgorithm: 0,
			timeForAnimation: 0,
			algorithmStatus: true,
			algorithmFinished: false,
		});
	}

	checkClearBoard() {
		if (this.props.isClearBoardPressed) {
			if (!this.props.isAlgorithmRunning) this.clearBoard();
			this.props.handleClearBoard();
		}
	}

	checkVisualize() {
		if (this.props.isVisualizePressed) {
			if (!this.props.isAlgorithmRunning) this.visualizeAlgorithm();
			this.props.handleVisualize();
		}
	}

	checkPattern() {
		if (this.props.patternClicked) {
			if (!this.props.isAlgorithmRunning) this.visualizePattern();
			this.props.handlePatternClick();
		}
	}

	async visualizePattern() {
		this.props.toggleVisualize();
		this.setState({}, () => {
			this.cleanGrid();
			this.clearBoard();

			const [algorithm, type] = getMazeAlgorithm(
				this.props.selectedPattern
			);
			let nodesToAnimate = algorithm(
				this.state.grid,
				this.state.grid[this.state.startRow][this.state.startCol],
				this.state.grid[this.state.targetRow][this.state.targetCol],
				type
			);

			this.animatePattern(nodesToAnimate, type);
			this.props.toggleVisualize();
		});
	}

	animatePattern(nodesToAnimate, type) {
		for (let i = 0; i < nodesToAnimate.length; i++)
			setTimeout(() => {
				let { row, col } = nodesToAnimate[i];
				let node = this.state.grid[row][col];
				node.type = type;
				node.weight = type === TYPE.WALL ? 0 : WEIGHT;
				node.ref.current.className = this.className(node);
			}, VISITED_TIME_GAP * i);
	}

	async visualizeAlgorithm() {
		let startTime;
		this.setState({}, () => {
			this.cleanGrid();
			this.setState({}, () => this.props.toggleVisualize());

			startTime = Date.now();
			const { grid, startRow, startCol, targetRow, targetCol } =
				this.state;
			let visitedNodesInOrder = [],
				shortestPath = [],
				status = false,
				connectionNode;

			let algorithm = getAlgorithm(this.props.selectedAlgorithm);

			[visitedNodesInOrder, status, connectionNode] = algorithm(
				grid,
				startRow,
				startCol,
				targetRow,
				targetCol
			);

			this.setState({ algorithmStatus: status });
			if (status)
				shortestPath = getShortestPath(
					this.state.grid,
					this.state.targetRow,
					this.state.targetCol,
					connectionNode
				);

			this.setState({
				timeForAlgorithm: Date.now() - startTime,
				algorithmFinished: true,
			});

			for (let i in visitedNodesInOrder)
				visitedNodesInOrder[i].isVisited = false;

			this.animateVisitedNodes(visitedNodesInOrder, status, startTime);
			this.animateShortestPath(
				visitedNodesInOrder,
				shortestPath,
				status,
				startTime
			);
		});
	}

	animateVisitedNodes(visitedNodesInOrder, status, startTime) {
		for (let i = 0; i < visitedNodesInOrder.length; i++) {
			setTimeout(() => {
				let node = visitedNodesInOrder[i];
				node.isVisited = true;
				node.ref.current.className = this.className(node);
			}, VISITED_TIME_GAP * i);
		}
		if (!status)
			this.setState(
				{
					timeForAnimation: Date.now() - startTime,
				},
				() => this.props.toggleVisualize()
			);
	}

	animateShortestPath(visitedNodesInOrder, shortestPath, status, startTime) {
		if (!status) return;
		let endTime;
		setTimeout(() => {
			for (let j = 0; j < shortestPath.length; j++) {
				setTimeout(() => {
					let node = shortestPath[j];
					node.isPath = true;
					node.ref.current.className = this.className(node);
				}, PATH_TIME_GAP * j);
			}
			endTime = Date.now();
			this.setState(
				{
					timeForAnimation: endTime - startTime,
				},
				() => this.props.toggleVisualize()
			);
		}, VISITED_TIME_GAP * visitedNodesInOrder.length);
		return;
	}

	className(tile) {
		let _class_name = "tile";

		switch (tile.type) {
			case TYPE.START:
				_class_name += " start-tile";
				break;
			case TYPE.TARGET:
				_class_name += " target-tile";
				break;
			case TYPE.WALL:
				_class_name += " wall-tile";
				return _class_name;
			case TYPE.WEIGHT:
				_class_name += " weight-tile";
				break;
			default:
				break;
		}

		if (tile.isPath) _class_name += " path-tile";
		else if (tile.isVisited) _class_name += " visited-tile";

		return _class_name;
	}

	render() {
		return (
			<>
				{!this.props.isAlgorithmRunning &&
					this.state.algorithmFinished && (
						<div className="algorithmDescription">
							<b>
								{this.state.algorithmStatus
									? "Path Found!"
									: "Path wasn't Found!"}
							</b>{" "}
							- Algorithm finished in{" "}
							<b>{this.state.timeForAlgorithm} ms</b> , Animation
							finished in{" "}
							<b>{this.state.timeForAnimation / 1000} s</b>
						</div>
					)}
				<div className="grid">
					{this.state.grid.map((row, rowIndex) => {
						return (
							<div key={rowIndex} className="tiles-row">
								{row.map((tile, tileIndex) => {
									return (
										<div
											key={`tile-${tile.row}-${tile.col}-${tile.isVisited}-${tile.isPath}`}
											id={`tile-${tile.row}-${tile.col}`}
											className={this.className(tile)}
											onMouseDown={(e) =>
												this.handleMouseDown(
													e,
													tile.row,
													tile.col
												)
											}
											onMouseEnter={(e) =>
												this.handleMouseEnter(
													e,
													tile.row,
													tile.col
												)
											}
											onMouseUp={() =>
												this.handleMouseUp()
											}
											ref={tile.ref}
										></div>
									);
								})}
							</div>
						);
					})}
				</div>
			</>
		);
	}
}
