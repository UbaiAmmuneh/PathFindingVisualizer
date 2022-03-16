import React, { Component } from "react";
import { TUTORIAL_PAGES } from "../../globals";
import "./Tutorial.scss";

export default class Tutorial extends Component {
	constructor(props) {
		super(props);

		this.state = {
			page: 1,
		};

		this.getTitles = this.getTitles.bind(this);
		this.getBody = this.getBody.bind(this);
		this.getButtonGroup = this.getButtonGroup.bind(this);
	}

	getTitles() {
		switch (this.state.page) {
			case 1:
				return [
					"Welcome to Path Finding Visualizer",
					"This short tutorail will walk you through all of the features of this application",
				];
			case 2:
				return [
					"What is path finding algorithm?",
					"At its core, a pathfinding algorithm seeks to find the shortest path between two points. This application visualizes various pathfinding algorithms in action, and more!",
				];
			case 3:
				return [
					"Picking an algorithm",
					'Choose an algorithm from the "Algorithms" drop-down menu.',
				];
			case 4:
				return [
					"Meet the algorithms",
					"Not all algorithms are created equal.",
				];
			case 5:
				return [
					"Adding walls and weights",
					'Click on the grid to add a wall. Click on the grid while pressing W to add a weight. Generate mazes and patterns from the "Mazes & Patterns" drop-down menu.',
				];
			case 6:
				return [
					"Visualizing and more",
					"Use the navbar buttons to visualize algorithms and clear the board!",
				];
			case 7:
				return [
					"Enjoy!",
					"I hope you have just as much fun playing around with this visualization tool as I had building it!",
				];
			default:
				return ["", ""];
		}
	}

	getBody() {
		switch (this.state.page) {
			case 1:
				return (
					<>
						<p>
							If you want to dive right in, feel free to press the
							"Skip Tutorial" button below. Otherwise, press
							"Next"!
						</p>
						<img alt="Logo" src="/images/logo.png" />
					</>
				);
			case 2:
				return (
					<>
						<p>
							All of the algorithms on this application are
							adapted for a 2D grid, where 90 degree turns have a
							"cost" of 1 and movements from a node to another
							have a "cost" of 1
						</p>
						<img alt="Route" src="/images/route.png" />
					</>
				);
			case 3:
				return (
					<>
						<p>
							Note that some algorithms are unweighted, while
							others are weighted. Unweighted algorithms do not
							take turns or weight nodes into account, whereas
							weighted ones do. Additionally, not all algorithms
							guarantee the shortest path.
						</p>
						<img
							className="large"
							alt="Algorithms"
							src="/images/algorithms.png"
						/>
					</>
				);
			case 4:
				return (
					<>
						<ul>
							<li>
								<b>Dijkstra's Algorithm</b> (weighted): the
								father of pathfinding algorithms; guarantees the
								shortest path
							</li>
							<li>
								<b>A* Search</b> (weighted): arguably the best
								pathfinding algorithm; uses heuristics to
								guarantee the shortest path much faster than
								Dijkstra's Algorithm
							</li>
							<li>
								<b>Bidirectional Dijkstra Algorithm</b>{" "}
								(weighted): Dijkstra from both sides; does
								guarantee the shortest path
							</li>
							<li>
								<b>Bidirectional A* Algorithm</b> (weighted): A*
								from both sides; does guarantee the shortest
								path
							</li>
							<li>
								<b>Breadth-first Search</b> (unweighted): a
								great algorithm; guarantees the shortest path
							</li>
							<li>
								<b>Depth-first Search</b> (unweighted): a very
								bad algorithm for pathfinding; has other uses in
								the computer science field; does not guarantee
								the shortest path
							</li>
						</ul>
					</>
				);
			case 5:
				return (
					<>
						<p>
							Walls are impenetrable, meaning that a path cannot
							cross through them. Weights, however, are not
							impassable. They are simply more "costly" to move
							through. In this application, moving through a
							weight node has a "cost" of 10.
						</p>
						<img
							className="larger"
							alt="walls"
							src="/images/walls.gif"
						/>
					</>
				);
			case 6:
				return (
					<>
						<p>
							You can clear the board from previous runs and
							visualize the selected algorithms using the
							"Visualize" button. If you want to access this
							tutorial again, click on "Path Finding Visualizer"
							in the top left corner of your screen.
						</p>
						<img
							className="largest"
							alt="Navbar"
							src="/images/navbar.png"
						/>
					</>
				);
			case 7:
				return (
					<>
						<p>
							If you want the source code for this application,
							chech out my{" "}
							<a
								target="_blank"
								rel="noreferrer"
								href="https://github.com/UbaiAmmuneh/PathFindingVisualizer"
							>
								github.
							</a>
						</p>
					</>
				);
			default:
				return <></>;
		}
	}

	getButtonGroup() {
		return (
			<>
				<button
					className="btn btn-default skipButton"
					type="button"
					onClick={() => this.props.turnTutorialOff()}
				>
					Skip Tutorial
				</button>

				{this.state.page > 1 && (
					<button
						className={`btn btn-default previousButton${
							this.state.page < TUTORIAL_PAGES ? "" : "2"
						}`}
						type="button"
						onClick={() =>
							this.setState({ page: this.state.page - 1 })
						}
					>
						Previous
					</button>
				)}

				<button
					className="btn btn-default nextButton"
					type="button"
					onClick={() =>
						this.state.page < TUTORIAL_PAGES
							? this.setState({ page: this.state.page + 1 })
							: this.props.turnTutorialOff()
					}
				>
					{this.state.page < TUTORIAL_PAGES
						? "Next"
						: "Finish tutorial"}
				</button>
			</>
		);
	}

	render() {
		return (
			<>
				<div className="tutorial">
					<div className="pageCounter">
						{this.state.page} / {TUTORIAL_PAGES}
					</div>

					<h3>{this.getTitles()[0]}</h3>
					<h6>{this.getTitles()[1]}</h6>
					{this.getBody()}

					{this.getButtonGroup()}
				</div>
			</>
		);
	}
}
