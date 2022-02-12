var homeScreen = document.getElementById('home-screen'),
    ingameScreen = document.getElementById('ingame-screen'),
    endScreen = document.getElementById('end-screen');


// Déclaration 
function initHomeScreen() {
    var button = homeScreen.querySelector('button');

    button.addEventListener('click', () => {
        switchScreen(homeScreen, ingameScreen);
        isPlaying = true;
    });
}

function switchScreen(screenFrom, screenTo) {
    screenFrom.style.display = 'none';
    screenTo.style.display = 'block';
}

// Appel / execution
initHomeScreen();