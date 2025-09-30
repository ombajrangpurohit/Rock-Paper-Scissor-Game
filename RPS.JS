 const playerScoreEl = document.getElementById('player-score');
        const computerScoreEl = document.getElementById('computer-score');
        const playerChoiceEl = document.getElementById('player-choice');
        const computerChoiceEl = document.getElementById('computer-choice');
        const resultMessageEl = document.getElementById('result-message');
        
        const rockBtn = document.getElementById('rock');
        const paperBtn = document.getElementById('paper');
        const scissorsBtn = document.getElementById('scissors');
        const choiceButtons = [rockBtn, paperBtn, scissorsBtn];
        const resetBtn = document.getElementById('reset-btn');

        let playerScore = 0;
        let computerScore = 0;
        const WINNING_SCORE = 5;
        let isGameOver = false;

        const choices = ['rock', 'paper', 'scissors'];
        const choiceEmojis = {
            rock: '✊',
            paper: '✋',
            scissors: '✌️'
        };

        function getComputerChoice() {
            const randomIndex = Math.floor(Math.random() * choices.length);
            return choices[randomIndex];
        }

        function playRound(playerSelection) {
            if (isGameOver) return;

            // 1. Disable buttons and mark selected
            const selectedBtn = document.getElementById(playerSelection);
            choiceButtons.forEach(btn => {
                btn.disabled = true;
                btn.classList.remove('selected');
            });
            selectedBtn.classList.add('selected');
            
            // 2. Reset UI from previous round
            resultMessageEl.classList.add('opacity-0');
            playerChoiceEl.classList.remove('pop-in');
            computerChoiceEl.classList.remove('pop-in');

            // 3. Show shaking fists for anticipation
            playerChoiceEl.textContent = '✊';
            computerChoiceEl.textContent = '✊';
            playerChoiceEl.classList.add('shaking');
            computerChoiceEl.classList.add('shaking');

            // 4. Reveal result after a delay
            setTimeout(() => {
                playerChoiceEl.classList.remove('shaking');
                computerChoiceEl.classList.remove('shaking');

                const computerSelection = getComputerChoice();
                let resultText = '';
                let resultColor = '';

                playerChoiceEl.textContent = choiceEmojis[playerSelection];
                computerChoiceEl.textContent = choiceEmojis[computerSelection];
                playerChoiceEl.classList.add('pop-in');
                computerChoiceEl.classList.add('pop-in');

                if (playerSelection === computerSelection) {
                    resultText = "It's a tie!";
                    resultColor = 'text-gray-400';
                } else if (
                    (playerSelection === 'rock' && computerSelection === 'scissors') ||
                    (playerSelection === 'paper' && computerSelection === 'rock') ||
                    (playerSelection === 'scissors' && computerSelection === 'paper')
                ) {
                    playerScore++;
                    resultText = "You win this round!";
                    resultColor = 'text-green-400';
                } else {
                    computerScore++;
                    resultText = "Computer wins this round!";
                    resultColor = 'text-red-400';
                }

                playerScoreEl.textContent = playerScore;
                computerScoreEl.textContent = computerScore;

                resultMessageEl.textContent = resultText;
                resultMessageEl.className = `text-2xl md:text-3xl font-bold opacity-100 ${resultColor}`;

                // Check for game over
                if (playerScore === WINNING_SCORE || computerScore === WINNING_SCORE) {
                    endGame();
                } else {
                    choiceButtons.forEach(btn => btn.disabled = false);
                }

                setTimeout(() => selectedBtn.classList.remove('selected'), 400);

            }, 800);
        }
        
        function endGame() {
            isGameOver = true;
            let finalMessage = '';
            let finalColor = '';
            if (playerScore === WINNING_SCORE) {
                finalMessage = "You Won The Game! 🎉";
                finalColor = 'text-green-400';
            } else {
                finalMessage = "Computer Won The Game! 🤖";
                finalColor = 'text-red-400';
            }

            setTimeout(() => {
                resultMessageEl.textContent = finalMessage;
                resultMessageEl.className = `text-3xl md:text-4xl font-bold opacity-100 transition-all duration-300 scale-110 ${finalColor}`;
                resetBtn.textContent = 'Play Again?';
            }, 500); // Short delay to show the round result first
        }

        function resetGame() {
            playerScore = 0;
            computerScore = 0;
            isGameOver = false;

            playerScoreEl.textContent = playerScore;
            computerScoreEl.textContent = computerScore;
            playerChoiceEl.textContent = '';
            computerChoiceEl.textContent = '';

            playerChoiceEl.classList.remove('pop-in', 'shaking');
            computerChoiceEl.classList.remove('pop-in', 'shaking');

            resultMessageEl.textContent = '';
            resultMessageEl.className = 'text-2xl md:text-3xl font-bold opacity-0';

            resetBtn.textContent = 'Reset Game';
            choiceButtons.forEach(btn => {
                btn.disabled = false;
                btn.classList.remove('selected');
            });
        }

        // Event Listeners
        rockBtn.addEventListener('click', () => playRound('rock'));
        paperBtn.addEventListener('click', () => playRound('paper'));
        scissorsBtn.addEventListener('click', () => playRound('scissors'));
        resetBtn.addEventListener('click', resetGame);
