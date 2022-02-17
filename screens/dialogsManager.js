var dialogsQueue = [];
var audio = new Audio();

function showDialog(key) {
    dialogBox.style.display = "block";
    var content = DIALOGS[key];
    dialogText.innerText = content;
    var character = CHARACTER[key];
    document.getElementById('dialogImg').src = character;
    var soundEffect = SOUND[key];
    var audio = new Audio(soundEffect);
    audio.play();
    isPlaying = false;
    chloe.play("idle", true);
    lily.play("idle", true);
}

function showDialogs(dialogs) {
    dialogsQueue = dialogs;
    showDialog(dialogsQueue[0]);
    dialogsQueue.shift();
}

function initDialogs() {
    ingameScreen.addEventListener('click', () => {
        if (dialogsQueue.length > 0) {
            showDialog(dialogsQueue[0]);
            dialogsQueue.shift();
        } else {
            dialogBox.style.display = "none";
            isPlaying = true;
        }
    });
}
initDialogs();