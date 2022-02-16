var dialogsQueue = [];

function showDialog(key) {
    dialogBox.style.display = "block";
    var content = DIALOGS[key];
    dialogText.innerText = content;
    var character = CHARACTER[key];
    document.getElementById('dialogImg').src = character;
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
    window.addEventListener('click', () => {
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