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
    size = 2
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
    console.log(moveQueue)

    while (moveQueue.length > 0) {
        var current = moveQueue.shift();
        if (TotalEmptyPegs == 5) {
            console.log("You win!")
            break;
        }
        var edges = current.neighbors
        for (let i = 0; i < edges.length; i++) {
            console.log("Edges:")
            console.log(edges[i]);
            // infinite loop, need to determine how to make a move
            //moveQueue.push(edges[i])
        }
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

function GetAvailableMoves(me, dirs) {
    var availableMoves = []
    dirs.forEach(function(dir) {
        var xDif = me[0] - dir[0]
        var yDif = me[1] - dir[1]
        var dif = [xDif, yDif]
        var checkNode = board[xDif][yDif]
        if (checkNode != undefined) availableMoves.push(checkNode)
    })
    return availableMoves
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
    console.log(board)
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
