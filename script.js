// Create tictactoe board 3x3 square
    // create for loop that creates 3 columns and 3 rows dynamically and that have an event listner
    // when each player clicks on the square it gets assigned the game piece and cannot be reassigned until game over. 

// Create pieces 'x' and 'o'
// Create computer player using algo = player b
// Create player a = human 

(function () {
    const theGame = {
        init: function () {
            console.log('Initializing game...');
            this.gameEnded = false; // Track if the game is over
            this.cacheDom();
            this.createStatusBar();
            this.gameCover();
            this.gameboard();
            this.bindEvents();
            this.players();
            this.updateStatus('Game initialized. Press Start to begin.');
        },
        createStatusBar: function () {
             // Check if statusDiv already exists
        if (!document.getElementById('statusDiv')) {
            const statusDiv = document.createElement('div');
            statusDiv.id = 'statusDiv';
            const statusInfo = document.createElement('p');
            statusInfo.id = 'statusInfo';
            statusDiv.appendChild(statusInfo);
            document.body.appendChild(statusDiv);
    }
        },
        updateStatus: function (message) {
            const statusInfo1 = document.getElementById('statusInfo');
            statusInfo1.innerHTML = message;
        },
        gameboard: function () {
            this.updateStatus('Setting up gameboard...');
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
        gameCover: function () {
            this.updateStatus('Creating game cover...');
            const gameStartCover = document.createElement('div');
            const gameCoverText = document.createElement('p');
            gameCoverText.className = 'gameCoverText';
            gameStartCover.className = 'game-cover';
            gameStartCover.appendChild(gameCoverText);
            this.$gameBoard.appendChild(gameStartCover);
            this.$cover = gameStartCover;
            gameCoverText.innerHTML = 'Get Ready <br> Press Start';
        },
        cacheDom: function () {
            console.log('Caching DOM elements...');
            this.$gameBoard = document.querySelector('.gameBoard');
            this.$computer = document.querySelector('#Computer');
            this.$playerPiece = document.querySelector('#xPieceInput').checked ? 'X' : 'O';
            this.computerSelected = this.$computer.checked;
            this.$startGame = document.querySelector('.startGameButton');
            this.$playerScore = document.querySelector('.playerScore');
            this.$opScore = document.querySelector('.opScore');
        },
        bindEvents: function () {
            // Bind click event for the gameboard squares (only once)
            if (!this.clickBound) {
                this.$gameBoard.addEventListener('click', (event) => {
                    if (event.target.classList.contains('dynamic-squares')) {
                        this.player(event);
                    }
                });
                this.clickBound = true; // Mark the event as bound to prevent rebinding
            }
        
            // Bind mouseover event for hover behavior (only once)
            if (!this.hoverBound) {
                this.$gameBoard.addEventListener('mouseover', (event) => {
                    if (event.target.classList.contains('dynamic-squares')) {
                        if (event.target.innerHTML === '') {
                            this.updateStatus('Please Choose Wisely');
                        } else {
                            this.updateStatus('This square is taken!');
                        }
                    }
                });
                this.hoverBound = true; // Mark the event as bound to prevent rebinding
            }
        
            // Bind start game button click (only once)
            if (!this.startBound) {
                this.$startGame.addEventListener('click', () => {
                    this.gameStarted = true;
                    this.gameEnded = false;
                    this.removeGameCover();
                    this.updateStatus('Game started. Make your move!');
                });
                this.startBound = true; // Mark the event as bound to prevent rebinding
            }
        },
        players: function () {
            this.computerPiece = 'O';
            this.computer = () => {
                if (this.computerSelected) {
                    this.updateStatus('Computer making a move...');
                    const allSquares = Array.from(this.$gameBoard.children);
                    const emptySquares = allSquares.filter(square => square.innerHTML === '');

                    // Randomly pick an empty square
                    const moveIndex = Math.floor(Math.random() * emptySquares.length);
                    const selectedSquare = emptySquares[moveIndex];

                    if (selectedSquare) {
                        selectedSquare.innerHTML = this.computerPiece;
                        this.updateStatus('Computer made a move.');
                    }
                }
            };
            this.player = (event) => {
                if (this.gameEnded) {
                    this.updateStatus('Game is over! Please restart.');
                    return;
                }
                if (event.target.innerHTML !== '') {
                    this.updateStatus('This square is already taken! Try another one.');
                    return;
                }
                this.updateStatus('Player making a move...');
                const xSelected = document.querySelector('#xPieceInput').checked;
                const oSelected = document.querySelector('#oPieceInput').checked;

                if (xSelected) {
                    event.target.innerHTML = 'X';
                    this.computerPiece = 'O';
                } else if (oSelected) {
                    event.target.innerHTML = 'O';
                    this.computerPiece = 'X';
                }
                this.updateStatus('Player made a move.');
                if (this.computerSelected) {
                    this.computer();
                }
                this.checkGameOver();
            };
        },
        checkGameOver: function () {
            this.updateStatus('Checking if game is over...');
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
                this.updateStatus(winner + ' wins!');
                setTimeout(() => this.restart(), 2000); // Restart the game after 2 seconds
            };

            if (checkWin(this.$playerPiece)) {
                updateScoreboard('Player');
                let playerScoreCard = parseInt(this.$playerScore.innerHTML) || 0; // Parse and handle NaN
                this.$playerScore.innerHTML = ++playerScoreCard; // Increment player score
                this.gameEnded = true;
                return 'win';
            } else if (checkWin(this.computerPiece)) {
                updateScoreboard('Computer');
                let opScoreCard = parseInt(this.$opScore.innerHTML) || 0; // Parse and handle NaN
                this.$opScore.innerHTML = ++opScoreCard; // Increment computer score
                this.gameEnded = true;
                return 'win';
            } else if (checkDraw()) {
                updateScoreboard('Draw');
                setTimeout(() => this.restart(), 2000); // Restart the game after 2 seconds
                this.gameEnded = true;
                return 'draw';
            }

            return 'continue';
        },
        removeGameCover: function () {
            if (this.gameStarted && this.$cover) {
                console.log('Removing game cover...');
                this.$cover.remove();
            }
        },
        restart: function () {
            this.$gameBoard.innerHTML = ''; // Clear the game board
            this.init(); // Reinitialize the game
            
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

