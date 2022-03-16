export class PriorityQueueNode {
	constructor(value, priority) {
		this.value = value;
		this.priority = priority;
	}
}

export default class PriorityQueue {
	constructor() {
		this.values = [];
	}

	print() {
		console.log(this.values);
	}

	isEmpty() {
		return this.values.length === 0;
	}

	enqueue(value, priority) {
		let newNode = new PriorityQueueNode(value, priority);
		this.values.push(newNode);
		this.bubbleUp();
	}

	bubbleUp(index = this.values.length - 1) {
		if (this.isEmpty()) return;

		const element = this.values[index];
		while (index > 0) {
			let parentIndex = Math.floor((index - 1) / 2);
			let parent = this.values[parentIndex];

			if (element.priority >= parent.priority) break;

			this.values[parentIndex] = element;
			this.values[index] = parent;
			index = parentIndex;
		}
	}

	dequeue() {
		if (this.isEmpty()) return null;

		const min = this.values[0];
		const end = this.values.pop();

		if (this.values.length > 0) {
			this.values[0] = end;
			this.sinkDown();
		}

		return min;
	}

	sinkDown(index = 0) {
		const length = this.values.length;
		const element = this.values[index];
		while (true) {
			let leftChildIndex = 2 * index + 1;
			let rightChildIndex = 2 * index + 2;
			let leftChild, rightChild;
			let swap = null;

			if (leftChildIndex < length) {
				leftChild = this.values[leftChildIndex];
				if (leftChild.priority < element.priority)
					swap = leftChildIndex;
			}

			if (rightChildIndex < length) {
				rightChild = this.values[rightChildIndex];
				if (
					(swap === null && rightChild.priority < element.priority) ||
					(swap !== null && rightChild.priority < leftChild.priority)
				)
					swap = rightChildIndex;
			}

			if (swap === null) break;

			this.values[index] = this.values[swap];
			this.values[swap] = element;
			index = swap;
		}
	}

	searchFor(row, col) {
		for (let i in this.values)
			if (
				this.values[i].value.row === row &&
				this.values[i].value.col === col
			)
				return i;
		return -1;
	}

	decreaseKey(item, val) {
		let pos = this.values.indexOf(item);
		if (pos === -1) return;

		this.values[pos].priority = val;

		this.sinkDown(pos);
		return this.bubbleUp(pos);
	}
}
