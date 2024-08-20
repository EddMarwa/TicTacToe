document.addEventListener('DOMContentLoaded', () => {
    const nameForm = document.getElementById('nameForm');
    const usernameInput = document.getElementById('username');
    const greetingDiv = document.getElementById('greeting');
    const displayNameSpan = document.getElementById('displayName');

    
    nameForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = usernameInput.value.trim();
        if (username) {
            displayNameSpan.textContent = username;
            nameForm.classList.add('hidden');
            greetingDiv.classList.remove('hidden');
        }
    });

    document.getElementById('playTwoPlayer').addEventListener('click', () => {
        window.location.href = 'twoPlayer.html';
    });

    document.getElementById('playVsComputer').addEventListener('click', () => {
        window.location.href = 'vsComputer.html';
    });
});
