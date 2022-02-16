function showDialog(key) {
    chloe.play("idleChloe");
    dialogBox.style.display = "block";
    var content = DIALOGS[key];
    dialogText.innerText = content;
    var character = CHARACTER[key];
    document.getElementById('dialogImg').src = character;
    isPlaying = false;
    chloe.play("idle", true);
}

