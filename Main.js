function Peg() {
	this.isFilled = true;
	this.cord = [];
	this.neighbors = [];
}
Peg.prototype.addNeighbor = function(neighbor) {
	this.neighbors.push(neighbor)
}
Peg.prototype.setCord = function(cord) {
	this.cord = cord
}
Peg.prototype.changePeg = function(state) {
	this.isFilled = state
}

function Main() {
	var board = buildBoard(5)
	board.forEach(function (row) {
		console.log(row)
	})
}

function buildBoard(size) {
	board = [];
	for (var i = 1; i <= size; i++) {
		arr = [];
		for (var j = 1; j <= i; j++) {
			arr.push(j);            
		}
		board.push(arr)
	}
	return board;
}

Main()
