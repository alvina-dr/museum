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

var dialogsQueue = [];

function showDialogs(dialogs) {
    dialogsQueue = dialogs;
    //dialogs = ['introduction1', 'nana']
    showDialog(dialogsQueue[0]);
    dialogsQueue.shift();
}

function initDialogs() {
    window.addEventListener('click', () => {
        console.log('ooooo')
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