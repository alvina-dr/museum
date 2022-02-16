var homeScreen = document.getElementById('home-screen'),
    ingameScreen = document.getElementById('ingame-screen'),
    endScreen = document.getElementById('end-screen'),
    credits = document.getElementById('credits'),
    dialogBox = ingameScreen.querySelector('div');
    dialogText = ingameScreen.querySelector('p');


// Déclaration 
function initHomeScreen() {
    var button = document.getElementById('gameButton');

    button.addEventListener('click', () => {
        switchScreen(homeScreen, ingameScreen);
        isPlaying = true;
    });
}

function goMainMenu() {
    var button = endScreen.querySelector('button');
    button.addEventListener('click', () => {
        switchScreen(endScreen, homeScreen);
        location.reload();
    });
}

function goCredits() {
    var button = document.getElementById('creditsButton');
    button.addEventListener('click', () => {
        switchScreen(homeScreen, credits);
    });
}

function goMainMenuFromCredits() {
    var button = document.getElementById('backCreditsButton');
    button.addEventListener('click', () => {
        switchScreen(credits, homeScreen);
    });
}

function switchScreen(screenFrom, screenTo) {
    screenFrom.style.display = 'none';
    screenTo.style.display = 'block';
}



// Appel / execution
initHomeScreen();
goMainMenu();
goCredits();
goMainMenuFromCredits();
