function showDialog(key) {
    chloe.play("idleChloe");
    dialogBox.style.display = "block";
    var content = DIALOGS[key];
    dialogText.innerText = content;
    isPlaying = false;
    chloe.play("idle", true);
}

