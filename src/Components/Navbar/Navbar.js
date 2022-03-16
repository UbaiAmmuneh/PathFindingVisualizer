import React from "react";
import "./Navbar.css";

function getAlgorithmDescription(selectedAlgorithm) {
	let isSearch, isWeighted, doesGuarantee;

	switch (selectedAlgorithm) {
		case "Dijkstra":
			selectedAlgorithm += "'s";
			isSearch = false;
			isWeighted = true;
			doesGuarantee = true;
			break;
		case "A*":
			isSearch = false;
			isWeighted = true;
			doesGuarantee = true;
			break;
		case "Bidirectional Dijkstra":
			isSearch = false;
			isWeighted = true;
			doesGuarantee = true;
			break;
		case "Bidirectional A*":
			isSearch = true;
			isWeighted = true;
			doesGuarantee = true;
			break;
		case "Breadth-first":
			isSearch = true;
			isWeighted = false;
			doesGuarantee = true;
			break;
		case "Depth-first":
			isSearch = true;
			isWeighted = false;
			doesGuarantee = false;
			break;
		default:
			return (
				<div className="algorithmDescription">
					Pick an algorithm from the dropdown menu to visualize it!
				</div>
			);
	}

	return (
		<div className="algorithmDescription">
			{selectedAlgorithm} {isSearch ? "Search" : "Algorithm"} is{" "}
			<b>{isWeighted ? "weighted" : "unweighted"}</b> and it{" "}
			<b>does{doesGuarantee ? "" : " not"} guarantee</b> the shortest
			path!
		</div>
	);
}

export default function Navbar(props) {
	return (
		<>
			<nav className="navbar navbar-expand-lg navbar-light bg-info">
				<div className="container">
					<a
						className="navbar-brand"
						href="/#"
						onClick={() => props.turnTutorialOn()}
					>
						Path Finding Visualizer
					</a>
					<button
						className="navbar-toggler collapsed"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#navbarDiv"
						aria-controls="navbarDiv"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span className="navbar-toggler-icon"></span>
					</button>

					<div className="navbar-collapse collapse" id="navbarDiv">
						<ul className="navbar-nav me-auto mb-2 mb-lg-0">
							<li className="nav-item dropdown">
								<a
									className="nav-link dropdown-toggle"
									href="/#"
									id="navbarDropdown"
									role="button"
									data-bs-toggle="dropdown"
									aria-expanded="false"
								>
									Algorithms
								</a>
								<ul
									className="dropdown-menu"
									aria-labelledby="navbarDropdown"
									onClick={(e) =>
										props.handleAlgorithmChange(e)
									}
								>
									<li>
										<a
											className="dropdown-item"
											href="/#"
											aria-label="Dijkstra"
										>
											Dijkstra's Algorithm
										</a>
									</li>
									<li>
										<a
											className="dropdown-item"
											href="/#"
											aria-label="A*"
										>
											A* Search
										</a>
									</li>
									<li>
										<a
											className="dropdown-item"
											href="/#"
											aria-label="Bidirectional Dijkstra"
										>
											Bidirectional Dijkstra Algorithm
										</a>
									</li>
									<li>
										<a
											className="dropdown-item"
											href="/#"
											aria-label="Bidirectional A*"
										>
											Bidirectional A* Search
										</a>
									</li>
									<li>
										<a
											className="dropdown-item"
											href="/#"
											aria-label="Breadth-first"
										>
											Breadth-first Search
										</a>
									</li>
									<li>
										<a
											className="dropdown-item"
											href="/#"
											aria-label="Depth-first"
										>
											Depth-first Search
										</a>
									</li>
								</ul>
							</li>
							<li className="nav-item dropdown">
								<a
									className="nav-link dropdown-toggle"
									href="/#"
									id="patternDropdown"
									role="button"
									data-bs-toggle="dropdown"
									aria-expanded="false"
								>
									Mazes & Patterns
								</a>
								<ul
									className="dropdown-menu"
									aria-labelledby="patternDropdown"
									onClick={(e) => props.handlePattern(e)}
								>
									<li>
										<a
											className="dropdown-item"
											href="/#"
											aria-label="Recursive Division"
										>
											Recursive Division
										</a>
									</li>
									<li>
										<a
											className="dropdown-item"
											href="/#"
											aria-label="Random Maze"
										>
											Random Maze
										</a>
									</li>
									<li>
										<a
											className="dropdown-item"
											href="/#"
											aria-label="Random Weight Maze"
										>
											Random Weight Maze
										</a>
									</li>
									<li>
										<a
											className="dropdown-item"
											href="/#"
											aria-label="Stair Pattern"
										>
											Stair Pattern
										</a>
									</li>
								</ul>
							</li>
							<li className="nav-item">
								<a
									className="nav-link"
									href="/#"
									onClick={() => props.handleClearBoard()}
								>
									Clear Board
								</a>
							</li>
							<li className="nav-item">
								<button
									className="btn btn-warning"
									type="button"
									onClick={() => props.handleVisualize()}
									disabled={
										props.selectedAlgorithm === "" ||
										props.isAlgorithmRunning
									}
								>
									Visualize!
								</button>
							</li>
						</ul>
					</div>
				</div>
			</nav>

			<div className="header">
				<ul>
					<li>
						<div className="start-tile"></div> Start Tile
					</li>
					<li>
						<div className="target-tile"></div> Target Tile
					</li>
					<li>
						<div className="weight-tile"></div> Weight Tile
					</li>
					<li>
						<div className="unvisited-tile"></div> Unvisited Tile
					</li>
					<li>
						<div className="visited-tile"></div> Visited Tile
					</li>
					<li>
						<div className="path-tile"></div> Path Tile
					</li>
					<li>
						<div className="wall-tile"></div> Wall Tile
					</li>
				</ul>
			</div>

			{!props.isTutorial &&
				getAlgorithmDescription(props.selectedAlgorithm)}
		</>
	);
}
