const animals = [
    { name: 'cow', image: 'https://i.pinimg.com/564x/e8/1f/a6/e81fa6133cbebb03bfaeba503dc930ab.jpg' },
    { name: 'sheep', image: 'https://i.pinimg.com/474x/93/30/11/933011529ee8b1bc7f3d4838251b55ff.jpg' },
    { name: 'chicken', image: 'https://i.pinimg.com/474x/69/1e/57/691e57b276482cb0a097b52cf1918fd0.jpg' },
    { name: 'pig', image: 'https://i.pinimg.com/474x/df/5e/2a/df5e2a8a8743e71e4e6229b107390e93.jpg' },
    { name: 'horse', image: 'https://i.pinimg.com/564x/c9/27/0e/c9270e46e5ac9141fb088927af545092.jpg' },
    { name: 'goat', image: 'https://i.pinimg.com/474x/35/d1/22/35d122fa3ade34fdf830cf7c933519f4.jpg' },
    { name: 'duck', image: 'https://i.pinimg.com/474x/76/17/33/761733cb0e649b2bfc60198c7fff3dc5.jpg' },
    { name: 'turkey', image: 'https://i.pinimg.com/474x/2a/f1/3d/2af13dfc1b5445055739e8206945e328.jpg' },
    { name: 'rabbit', image: 'https://i.pinimg.com/474x/8e/21/f6/8e21f612dfe9b847ae8853ef11e4bec9.jpg' },
    { name: 'donkey', image: 'https://i.pinimg.com/474x/99/57/39/995739f2c546c8d537f828b0fe07b94d.jpg' },
    { name: 'rooster', image: 'https://i.pinimg.com/564x/db/d1/29/dbd129659fda33e3eedd27903945dd95.jpg' },
    { name: 'geese', image: 'https://i.pinimg.com/474x/fa/92/9c/fa929cd79b2786da3f946f3d96117248.jpg' },
    { name: 'alpaca', image: 'https://i.pinimg.com/474x/70/4b/a6/704ba62707558ed122628ccd6f2e177c.jpg' },
    { name: 'ferret', image: 'https://i.pinimg.com/474x/74/6a/0b/746a0bf824461454ca4a514c625f5f66.jpg' },
    { name: 'peacock', image: 'https://i.pinimg.com/564x/ca/1f/1e/ca1f1e0a897b581cc907caddbf75e9ea.jpg' },
    { name: 'bison', image: 'https://i.pinimg.com/474x/32/83/f7/3283f7a8b06eda398fb2e5ae840d9c5f.jpg' },
    { name: 'pigeon', image: 'https://i.pinimg.com/474x/e6/23/a9/e623a94551b2ce4efe7c50341b47422a.jpg' },
];

let selectedAnimal;
let guessedLetters = [];
let wrongGuesses = 0;

function startGame() {
    guessedLetters = [];
    wrongGuesses = 0;
    selectedAnimal = animals[Math.floor(Math.random() * animals.length)];
    document.getElementById('animal-image').src = selectedAnimal.image;
    document.getElementById('word-display').innerText = getWordDisplay();
    document.getElementById('message').innerText = '';
    document.getElementById('letter-input').value = ''; // Limpiar el campo de entrada
    document.getElementById('letter-input').disabled = false; // Habilitar el campo de entrada
    document.getElementById('letter-input').focus(); // Enfocar el campo de entrada
}

function getWordDisplay() {
    return selectedAnimal.name.split('').map(letter => {
        return guessedLetters.includes(letter) ? letter : '_';
    }).join(' ');
}

document.getElementById('letter-input').addEventListener('input', function (event) {
    const letter = event.target.value.toLowerCase();
    if (letter && /^[a-z]$/.test(letter)) {
        guessLetter(letter);
        event.target.value = ''; // Limpiar el campo de entrada después de ingresar la letra
    }
});

function guessLetter(letter) {
    if (!guessedLetters.includes(letter)) {
        guessedLetters.push(letter);
        if (!selectedAnimal.name.includes(letter)) {
            wrongGuesses++;
        }
        updateGameStatus();
    }
}

function updateGameStatus() {
    document.getElementById('word-display').innerText = getWordDisplay();
    document.getElementById('message').innerText = `Wrong guesses: ${wrongGuesses}`;

    if (wrongGuesses >= 6) {
        document.getElementById('message').innerText = `You lost! The animal was ${selectedAnimal.name}.`;
        disableInput();
    } else if (!getWordDisplay().includes('_')) {
        document.getElementById('message').innerText = 'You won!';
        disableInput();
    }
}

function disableInput() {
    document.getElementById('letter-input').disabled = true; // Deshabilitar el campo de entrada
}

document.getElementById('restart-button').onclick = startGame;

startGame();
