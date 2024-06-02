// Create tictactoe board 3x3 square
    // create for loop that creates 3 columns and 3 rows dynamically and that have an event listner
    // when each player clicks on the square it gets assigned the game piece and cannot be reassigned until game over. 

// Create pieces 'x' and 'o'
// Create computer player using algo = player b
// Create player a = human 

(function() {
    const theGame = {
        init: function() {
            this.cacheDom();
            this.gameboard(); // Set up the game board
            this.bindEvents();
            this.players();
            
        },
        gameboard: function() {
            this.createSquares = () => {
                const columns = 3;
                const rows = 3;

                
                // Create squares for each cell in the grid
                for (let i = 0; i < columns; i++) {
                    for (let j = 0; j < rows; j++) {
                        const newSquare = document.createElement('div');
                        newSquare.className = 'dynamic-squares';
                        this.$gameBoard.appendChild(newSquare);
                    }
                }
            };
            
            
            // Immediately invoke createSquares to set up the board
            this.createSquares();
        },
        cacheDom: function() {
            // Cache DOM elements for later use
            this.$gameBoard = document.querySelector('.gameBoard');
            this.$computer = document.querySelector('#Computer');
            
            

        },
        bindEvents: function() {
            // Bind event listeners to the game board
            this.$gameBoard.addEventListener('click', (event) => {
                // Event handling logic for clicks on the game board
                if (event.target.classList.contains('dynamic-squares')) {
                    // Handle square click
                    console.log('Square clicked:', event.target);
                    this.player(event);
                }
            });
        },
        players: function() {
            // Player objects or identifiers
            this.computer = () => {
                //create computer algo
                //this computer places a piece randomly anywhere on the gameboard
                //probablity 50% of the time it will place a piece next to player 1 piece
                const computerSelected = document.querySelector('#Computer').checked;
                if(computerSelected) {
                //after player 1 places a piece on the board, this.computer will place a piece based on algo
                    const allSquares = Array.from(this.$gameBoard.children);
                    const emptySquares = allSquares.filter(square => square.innerHTML === '');
                    let playerSquares;


                    if(this.player === 'X') {
                        playerSquares = allSquares.filter(square => square.innerHTML === 'X');
                    } else if(this.player === 'O'){
                        playerSquares = allSquares.filter(square => square.innerHTML === 'O');
                    }

                    const adjacentSquares = playerSquares.flatMap(square => {
                        const index = allSquares.indexOf(square);
                        const row = Math.floor(index / 3);
                        const col = index % 3;
                        return [
                            allSquares[row * 3 + (col - 1)],
                            allSquares[row * 3 + (col + 1)],
                            allSquares[(row - 1) * 3 + col],
                            allSquares[(row + 1) * 3 + col]
                        ].filter(adjSquare => adjSquare && adjSquare.innerHTML === '');
                    });

                    const potentialMoves = [...emptySquares, ...adjacentSquares, ...adjacentSquares];

                    const moveIndex = Math.floor(Math.random() * potentialMoves.length);
                    const selectedSquare = potentialMoves[moveIndex];

                    if(selectedSquare === 'O'){
                        selectedSquare.innerHTML = 'O';
                    } else if (selectedSquare === 'X'){
                        selectedSquare.innerHTML = 'X';
                    }
               }
            };
            this.human = () => {
                //turn piece into opposite piece for human opponent turn, then record results to scoreboard
            };
            this.player = (event) => {
                //player 1 always equals current mouseover user
                const xSelected = document.querySelector('#xPieceInput').checked;
                const oSelected = document.querySelector('#oPieceInput').checked;

                if(xSelected) {
                    event.target.innerHTML = 'X';
                } else if(oSelected){
                    event.target.innerHTML = 'O';
                }
                
                this.computer();
            };
        },
    };
    
    // Initialize the game
    theGame.init();
})();




console.log('This is working');









// const Gameboard = {
//     gameboard: [],
//     players: {
//         a: '',
//         b: ''
//     },
//     pieces: {
//         x: 'x',
//         o: 'o'
//     }
    
// }

