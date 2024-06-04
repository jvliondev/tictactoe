// Create tictactoe board 3x3 square
    // create for loop that creates 3 columns and 3 rows dynamically and that have an event listner
    // when each player clicks on the square it gets assigned the game piece and cannot be reassigned until game over. 

// Create pieces 'x' and 'o'
// Create computer player using algo = player b
// Create player a = human 

(function() {
    const theGame = {
        init: function() {
            console.log('Initializing game...');
            this.cacheDom();
            this.gameCover();
            this.gameboard();
            this.bindEvents();
            this.players();
        },
        gameboard: function() {
            console.log('Setting up gameboard...');
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
        gameCover: function() {
            console.log('Creating game cover...');
            const gameStartCover = document.createElement('div');
            const gameCoverText = document.createElement('p');
            gameCoverText.className = 'gameCoverText';
            gameStartCover.className = 'game-cover';
            gameStartCover.appendChild(gameCoverText);
            this.$gameBoard.appendChild(gameStartCover);
            this.$cover = gameStartCover;
            gameCoverText.innerHTML = 'Get Ready <br> Press Start';
        },
        cacheDom: function() {
            console.log('Caching DOM elements...');
            this.$gameBoard = document.querySelector('.gameBoard');
            this.$computer = document.querySelector('#Computer');
            this.$playerPiece = document.querySelector('#xPieceInput').checked ? 'X' : 'O';
            this.computerSelected = this.$computer.checked;
            this.$startGame = document.querySelector('.startGameButton');
        },
        bindEvents: function() {
            console.log('Binding events...');
            this.$gameBoard.addEventListener('click', (event) => {
                if (event.target.classList.contains('dynamic-squares')) {
                    console.log('Square clicked:', event.target);
                    this.player(event);
                }
            });
            this.$startGame.addEventListener('click', () => {
                console.log('Start button clicked');
                this.gameStarted = true;
                this.removeGameCover();
            });
        },
        players: function() {
            this.computerPiece = 'O';
            this.computer = () => {
                if(this.computerSelected) {
                    console.log('Computer making a move...');
                    const allSquares = Array.from(this.$gameBoard.children);
                    const emptySquares = allSquares.filter(square => square.innerHTML === '');
                    const playerSquares = allSquares.filter(square => square.innerHTML === this.$playerPiece);

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

                    if(selectedSquare && selectedSquare.innerHTML === '') {
                        selectedSquare.innerHTML = this.computerPiece;
                    }
                }
            };
            this.human = () => {
                console.log('Human turn (placeholder function)...');
            };
            this.player = (event) => {
                console.log('Player making a move...');
                const xSelected = document.querySelector('#xPieceInput').checked;
                const oSelected = document.querySelector('#oPieceInput').checked;

                if(xSelected) {
                    event.target.innerHTML = 'X';
                    this.computerPiece = 'O';
                } else if(oSelected){
                    event.target.innerHTML = 'O';
                    this.computerPiece = 'X';
                }

                if(this.computerSelected){
                    this.computer();
                }
                this.checkGameOver();
            };
        },
        checkGameOver: function() {
            console.log('Checking if game is over...');
            const squares = Array.from(this.$gameBoard.children).map(square => square.innerHTML);
            const winConditions = [
                [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
                [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
                [0, 4, 8], [2, 4, 6]             // Diagonals
            ];

            const checkWin = (player) => {
                return winConditions.some(condition => {
                    return condition.every(index => squares[index] === player);
                });
            };

            const checkDraw = () => {
                return squares.every(square => square !== '');
            };

            const updateScoreboard = (winner) => {
                console.log(winner + ' wins!'); // Placeholder
            };

            if (checkWin(this.$playerPiece)) {
                updateScoreboard('Player');
                return 'win';
            } else if (checkWin(this.computerPiece)) {
                updateScoreboard('Computer');
                return 'win';
            } else if (checkDraw()) {
                updateScoreboard('Draw');
                return 'draw';
            }

            return 'continue';
        },
        removeGameCover: function() {
            if(this.gameStarted && this.$cover){
                console.log('Removing game cover...');
                this.$cover.remove();
            }
        }
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

