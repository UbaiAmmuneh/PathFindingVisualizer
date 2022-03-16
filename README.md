# Pathfinding Visualizer

Welcome to Pathfinding Visualizer! I built this application because I was fascinated by pathfinding algorithms, and I wanted to visualize them in action. I hope that you enjoy playing around with this visualization tool just as much as I enjoyed building it.

## Meet the Algorithms

This application supports the following algorithms:

**Dijkstra's Algorithm** (weighted): the father of pathfinding algorithms; guarantees the shortest path

**A\* Search** (weighted): arguably the best pathfinding algorithm; uses heuristics to guarantee the shortest path much faster than Dijkstra's Algorithm

**Bidirectional Dijkstra Algorithm** (weighted): Dijkstra from both sides; does guarantee the shortest path

**Bidirectional A\* Algorithm** (weighted): A\* from both sides; does guarantee the shortest path

**Breath-first Search** (unweighted): a great algorithm; guarantees the shortest path

**Depth-first Search** (unweighted): a very bad algorithm for pathfinding; has other uses in the computer science field; does not guarantee the shortest path

On top of the pathfinding algorithms listed above, I implemented a **Recursive Division** Maze Generation algorithm.

## How to run

To run this application you need to download Node.js (npm).

1. Clone the repository using: `git clone https://github.com/UbaiAmmuneh/PathFindingVisualizer`
2. Move to the main directory: `cd PathFindingVisualizer`
3. Run the server on localhost: `npm start`
