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

var board = [];
// Main game state
function Main() {
	board = buildBoard(5)
	SetNeighbors()
	
	var ranX = Math.floor(Math.random() * 5)
	var ranY = Math.floor(Math.random() * ranX)
	
	Start(ranX,ranY)
	
	// Logic for displaying the board
	board.forEach(function (row) {
		var display = ""
		row.forEach(function (aPeg) {
			display = display + " " + aPeg.isFilled
		})
		//console.log(display)
	})
}

function Start(emptyX,emptyY) {
	// Set beginning empty peg
	board[emptyX][emptyY].changePeg(false)
}

function SetNeighbors() {
	// Add neighbors
	board.forEach(function (row) {
		var display = ""
		row.forEach(function (me) {
			display = display + " " + me.isFilled
			
			//console.log(me)
			var x = me.cord[0]
			var y = me.cord[1]
			
			var neighbors = [[x-1,y-1],[x-1,y],
							[x,y-1],[x,y+1],
							[x+1,y],[x+1,y+1]]
			
			//console.log(neighbors)
			neighbors.forEach(function (cord) {
				try {
					me.addNeighbor(board[cord[0],cord[1]])
				} catch(e) {}
			})
		})
		console.log(board[1])
	})
}

// Builds board and inserts nodes with cords
function buildBoard(size) {
	board = [];
	for (var i = 1; i <= size; i++) {
		arr = [];
		for (var j = 1; j <= i; j++) {
			var peg = new Peg()
			peg.setCord([i,j])
			arr.push(peg);            
		}
		board.push(arr)
	}
	return board;
}

Main()
