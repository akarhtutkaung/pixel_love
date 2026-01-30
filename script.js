document.addEventListener('DOMContentLoaded', () => {
    // Auto-Play Music Logic
    const bgMusic = document.getElementById('bg-music');
    const attemptPlay = () => {
        bgMusic.play().catch(() => console.log("Autoplay blocked. Waiting for interaction."));
    };
    attemptPlay();

    const playOnInteraction = () => {
        bgMusic.play().then(() => {
            document.removeEventListener('click', playOnInteraction);
            document.removeEventListener('touchstart', playOnInteraction);
        }).catch(() => { });
    };
    document.addEventListener('click', playOnInteraction);
    document.addEventListener('touchstart', playOnInteraction);

    // Game Logic
    const yesBtn = document.getElementById('yes-btn');
    const noBtn = document.getElementById('no-btn');
    const winScreen = document.getElementById('win-screen');
    const scoreElement = document.getElementById('score');

    let score = 0;

    // "Yes" Button (Start Game)
    yesBtn.addEventListener('click', () => {
        winScreen.classList.remove('hidden');
        // Play victory sound effect here (optional)
    });


    noBtn.addEventListener('click', (e) => {
        e.preventDefault();

        // Show styled Game Over alert/modal
        // We'll create a simple modal dynamically or use a custom confirm
        // For retro feel, let's create a DOM element

        const gameOverDiv = document.createElement('div');
        gameOverDiv.style.position = 'fixed';
        gameOverDiv.style.top = '0';
        gameOverDiv.style.left = '0';
        gameOverDiv.style.width = '100vw';
        gameOverDiv.style.height = '100vh';
        gameOverDiv.style.background = 'rgba(0,0,0,0.9)';
        gameOverDiv.style.display = 'flex';
        gameOverDiv.style.flexDirection = 'column';
        gameOverDiv.style.justifyContent = 'center';
        gameOverDiv.style.alignItems = 'center';
        gameOverDiv.style.zIndex = '300';
        gameOverDiv.style.fontFamily = "'Press Start 2P', cursive";
        gameOverDiv.style.textAlign = 'center';
        gameOverDiv.style.color = '#d32f2f';

        gameOverDiv.innerHTML = `
            <h1 style="font-size: 2rem; margin-bottom: 20px;" class="blink">GAME OVER</h1>
            <p style="color: white; margin-bottom: 30px; line-height: 1.5;">CONTINUE?</p>
            <button id="retry-btn" style="
                background: transparent; 
                color: white; 
                border: 2px solid white; 
                padding: 15px; 
                font-family: inherit; 
                cursor: pointer;
                text-transform: uppercase;">
                TRY AGAIN
                <br><br>
                (FREE FOR YOU)
            </button>
        `;

        document.body.appendChild(gameOverDiv);

        // Penalty score
        score -= 1000;
        updateScore();

        document.getElementById('retry-btn').addEventListener('click', () => {
            gameOverDiv.remove();
        });
    });

    // Removed moveButton function as it's no longer needed for No button


    function updateScore() {
        scoreElement.innerText = score.toString().padStart(6, '0');
    }

    // Funny interactions
    // Konami code listener? (Up Up Down Down Left Right Left Right B A)
    // Maybe later feature :)
});
