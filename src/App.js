import React, { Component } from "react";
import Navbar from "./Components/Navbar/Navbar";
import Grid from "./Components/Grid/Grid";
import Tutorial from "./Components/Tutorial/Tutorial";
import "./App.scss";

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedAlgorithm: "",
			selectedPattern: "",
			isClearBoardPressed: false,
			isVisualizePressed: false,
			patternClicked: false,
			isAlgorithmRunning: false,
			isTutorial: true,
		};
		this.handleAlgorithmChange = this.handleAlgorithmChange.bind(this);
		this.handlePattern = this.handlePattern.bind(this);
		this.handleClearBoard = this.handleClearBoard.bind(this);
		this.handleVisualize = this.handleVisualize.bind(this);
		this.handlePatternClick = this.handlePatternClick.bind(this);
		this.toggleVisualize = this.toggleVisualize.bind(this);
		this.turnTutorialOff = this.turnTutorialOff.bind(this);
		this.turnTutorialOn = this.turnTutorialOn.bind(this);
	}

	turnTutorialOff() {
		this.setState({ isTutorial: false });
	}

	turnTutorialOn() {
		this.setState({ isTutorial: true });
	}

	handleAlgorithmChange(e) {
		e.preventDefault();
		this.setState({
			selectedAlgorithm: e.target.getAttribute("aria-label"),
		});
	}

	handlePattern(e) {
		e.preventDefault();
		this.setState({
			selectedPattern: e.target.getAttribute("aria-label"),
		});
		this.handlePatternClick(e);
	}

	handlePatternClick() {
		this.setState({
			patternClicked: !this.state.patternClicked,
		});
	}

	handleClearBoard() {
		this.setState({ isClearBoardPressed: !this.state.isClearBoardPressed });
	}

	handleVisualize() {
		this.setState({ isVisualizePressed: !this.state.isVisualizePressed });
	}

	toggleVisualize() {
		this.setState({ isAlgorithmRunning: !this.state.isAlgorithmRunning });
	}

	render() {
		return (
			<>
				<Navbar
					{...this.state}
					selectedAlgorithm={this.state.selectedAlgorithm}
					handleAlgorithmChange={this.handleAlgorithmChange}
					handlePattern={this.handlePattern}
					handleClearBoard={this.handleClearBoard}
					handleVisualize={this.handleVisualize}
					turnTutorialOn={this.turnTutorialOn}
				/>
				{this.state.isTutorial ? (
					<Tutorial turnTutorialOff={this.turnTutorialOff} />
				) : (
					<Grid
						{...this.state}
						handleClearBoard={this.handleClearBoard}
						handleVisualize={this.handleVisualize}
						handlePatternClick={this.handlePatternClick}
						toggleVisualize={this.toggleVisualize}
					/>
				)}
			</>
		);
	}
}
