function showDialog(key) {
    dialogBox.style.display = "block";
    var content = DIALOGS[key];
    dialogText.innerText = content;
    isPlaying = false;
}

