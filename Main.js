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
    size = 4
    board = buildBoard(size)
    SetNeighbors()

    var ranX = Math.floor(Math.random() * size)
    var ranY = Math.floor(Math.random() * ranX)

    SetEmptyPeg(ranX, ranY)

    // Logic for displaying the board
    board.forEach(function(row) {
        var display = ""
        row.forEach(function(aPeg) {
            display = display + " " + aPeg.isFilled
        })
    })
}

// Set beginning empty peg
function SetEmptyPeg(emptyX, emptyY) {
    board[emptyX][emptyY].changePeg(false)
}

function SetNeighbors() {
    // Add neighbors
    for (var x = 0; x < board.length; x++) {
        for (var y = 0; y < board[x].length; y++) {
            // Current peg
            var me = board[x][y]

            var neighbors = [
                [x - 1, y - 1],
                [x - 1, y],
                [x, y - 1],
                [x, y + 1],
                [x + 1, y],
                [x + 1, y + 1]
            ];

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
