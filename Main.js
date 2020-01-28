function Peg() {
	this.isFilled = true;
	this.cord = [];
	this.neighbors = [];
	this.availableMoves = [];
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
Peg.prototype.availableMoves = function(move) {
	this.availableMoves.push(move)
}

var board = [];
var moveQueue = [];
var startingPeg;
var TotalEmptyPegs = 1;

// Main game state
function Main() {
	size = 4
	board = buildBoard(size)
	SetNeighbors()

	var ranX = Math.floor(Math.random() * size)
	var ranY = Math.floor(Math.random() * ranX)
	ranX = 0
	ranY = 0
	SetEmptyPeg(ranX, ranY)

	StartGame()
		// Logic for displaying the board
	board.forEach(function(row) {
		var display = ""
		row.forEach(function(aPeg) {
			display = display + " " + aPeg.isFilled
		})
	})
}

function StartGame() {
	DisplayBoard()
	// Start with the empty peg's neighbors, they're the only ones that can make a first move
	for (var y = 0; y < startingPeg.neighbors.length; y++) {
		var startingNeighbors = startingPeg.neighbors[y]
		for (var i = 0; i < startingNeighbors.neighbors.length; i++) {
			var firstTry = startingNeighbors.neighbors[i]
			if (firstTry.isFilled) {
				moveQueue.push(firstTry)
				break;
			}
		}
		break;
	}
	//console.log(moveQueue)
	let iter = 0;
	while (moveQueue.length > 0) {
		iter++;
		var current = moveQueue.shift();
		if (TotalEmptyPegs == 14) {
			console.log("You win!")
			break;
		}
		var edges = current.neighbors
		for (let i = 0; i < edges.length; i++) {
			//console.log("Edgesstu:")
			//console.log(edges[i]);
			
			// Make a move
			let moveTo = CanIMove(current.cord, edges[i].cord)
			if(moveTo != null) {
				if(current.isFilled && edges[i].isFilled && !moveTo.isFilled) {
					//console.log(current.cord,edges[i].cord,moveTo.cord)
					current.isFilled = false;
					edges[i].isFilled = false;
					moveTo.isFilled = true;
					TotalEmptyPegs++;
					DisplayBoard();
					continue;
				} else {
					if(iter > 10000) {
						console.log(moveQueue.length)
						return;
					}
				}
			}
						
			if (TotalEmptyPegs == 14) {
				console.log("You win!")
				break;	
			}
			// infinite loop, need to determine how to make a move
			moveQueue.push(edges[i])
		}
	}
}

// Shows the current state of the board
function DisplayBoard() {
	console.log("Turn "+(TotalEmptyPegs-1))
	let spacer = "            "
	for (var i = 0; i < board.length; i++) {
		let text = ""
		for (var y = 0; y < board[i].length; y++) {
			if(board[i][y].isFilled) { text+="    X" }
			else text+="    O"
			
			spacer = spacer.substring(0, spacer.length - 1);
		}
		console.log(spacer+text)
	}
	
}

// Set beginning empty peg
function SetEmptyPeg(emptyX, emptyY) {
	startingPeg = board[emptyX][emptyY]
	startingPeg.changePeg(false)
}

function GetNeighbors(x, y) {
	return [
		[x - 1, y - 1],
		[x - 1, y],
		[x, y - 1],
		[x, y + 1],
		[x + 1, y],
		[x + 1, y + 1]
	];
}

function CanIMove(me, dir) {
	var xDif = me[0] - dir[0]
	var yDif = me[1] - dir[1]
	try {
	var checkNode = board[dir[0]-xDif][dir[1]-yDif]
	if (checkNode != undefined) return checkNode
	} catch(e) {}
	return null
	
	
	
	/*
	var availableMoves = []
	dirs.forEach(function(dir) {
		var xDif = me[0] - dir[0]
		var yDif = me[1] - dir[1]
		var dif = [xDif, yDif]
		var checkNode = board[xDif][yDif]
		if (checkNode != undefined) availableMoves.push(checkNode)
	})
	return availableMoves
	*/
}

function SetNeighbors() {
	// Add neighbors
	for (var x = 0; x < board.length; x++) {
		for (var y = 0; y < board[x].length; y++) {
			// Current peg
			var me = board[x][y]

			var neighbors = GetNeighbors(x, y)

			// Go through each neighbor and add it if it's a valid reference
			neighbors.forEach(function(cord) {
				try {
					var ref = board[cord[0]][cord[1]]
						// Make sure not to add false reference
					if (ref == undefined) {} else {
						me.addNeighbor(ref)
					}
				} catch (e) {}
			})
		}
	}
	//console.log(board)
}

// Builds board and inserts nodes with cords
function buildBoard(size) {
	board = [];
	for (var i = 0; i <= size; i++) {
		arr = [];
		for (var j = 0; j <= i; j++) {
			var peg = new Peg()
			peg.setCord([i, j])
			arr.push(peg);
		}
		board.push(arr)
	}
	return board;
}

Main()
