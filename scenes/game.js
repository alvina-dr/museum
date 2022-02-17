// width = window.innerWidth * window.devicePixelRatio;
// height = window.innerHeight * window.devicePixelRatio;

var config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var isPlaying = false;
var scenographyConfig = {
    walkSpeed: 10,
    crowdSpeed: 20,
    direction: 1
};
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

var game = new Phaser.Game(config);
var goForward = false;
var dialog1 = 0;
var dialog2 = 0;
var dialog3 = 0;
var dialog4 = 0;
var dialog5 = 0;
var dialog6 = 0;
var dialog7 = 0;
var dialog8 = 0;
var dialog9 = 0;
var dialog10 = 0;
var dialog11 = 0;

var speed = scenographyConfig.walkSpeed;
var meetLily = false;
var chloeAnimationWalk = null;
var varEndGame = 0;

function preload() {
    this.load.audio('guide', ['assets/sound/Guide.mp3']);
    this.load.spritesheet('chloe', 'assets/sprites/chloe.png', { frameWidth: 277.6, frameHeight: 354 });
    this.load.spritesheet('chloeSob', 'assets/sprites/Chloewalksob.png', { frameWidth: 277.6, frameHeight: 354 });
    this.load.spritesheet('idlechloe', 'assets/sprites/chloeIdle.png', { frameWidth: 306, frameHeight: 344 });
    this.load.spritesheet('lily', 'assets/sprites/lily.png', { frameWidth: 341, frameHeight: 382 });
    this.load.image('background', 'assets/ui/BG.png');
    this.load.image('foule', 'assets/sprites/foule.png');
    this.load.image('oeuvredepart', 'assets/ui/oeuvredépart.png');
    this.load.image('fenetre1', 'assets/ui/fenêtre1.png');
    this.load.spritesheet('lion', 'assets/ui/Lion.png', { frameWidth: 1179, frameHeight: 856 });
    this.load.image('fenetre2', 'assets/ui/fenêtre.png');
    this.load.spritesheet('enfant', 'assets/ui/Vierge.png', { frameWidth: 736, frameHeight: 856 });
    this.load.image('statue1', 'assets/ui/statue.png');
    this.load.spritesheet('vagues', 'assets/ui/Bateau.png', { frameWidth: 1490, frameHeight: 856 });
    this.load.image('statue2', 'assets/ui/Apollon.png');
    this.load.image('maman', 'assets/sprites/Maman2.png');
    this.load.spritesheet('press', 'assets/ui/press.png', { frameWidth: 239, frameHeight: 239 });
    this.load.spritesheet('taptap', 'assets/sprites/tap.png', { frameWidth: 239, frameHeight: 239 });
}

function create() {
    this.cursors = this.input.keyboard.createCursorKeys();

    //BACKGROUND

    for (let i = 0; i < 50; i++) {
        background = this.add.image(i * 400, 0, 'background');
        background.setOrigin(0, 0);
        background.displayHeight = window.innerHeight;
        background.scaleX = background.scaleY;
    }

    background = this.add.image(0, 0, 'background');
    background.setOrigin(0, 0);
    background.displayHeight = window.innerHeight;
    background.scaleX = background.scaleY;
    totalBackgroundLength = background.displayWidth * 9; //LA LONGUEUR TOTAL DU BACKGROUND (en fonction de la hauteur de l'écran)

    //TABLEAU DÉPART
    oeuvredepart = this.add.image(background.displayWidth * 0, window.innerHeight / 10, 'oeuvredepart');
    oeuvredepart.setOrigin(0, 0);
    oeuvredepart.setScale(background.scaleX / 1.1);

    //FENETRE1
    Fenetre1 = this.add.image(background.displayWidth * 1.2, window.innerHeight / 7, 'fenetre1');
    Fenetre1.setOrigin(0, 0);
    Fenetre1.setScale(background.scaleX / 1.05);

    //TABLEAU LION
    lion = this.add.sprite(background.displayWidth * 2.3, window.innerHeight / 10, 'lion');
    lion.setOrigin(0, 0);
    lion.setScale(background.scaleX / 1.1);
    lion.setTexture('lion', 1);

    //FENETRE2
    Fenetre2 = this.add.image(background.displayWidth * 3.6, window.innerHeight / 7, 'fenetre2');
    Fenetre2.setOrigin(0, 0);
    Fenetre2.setScale(background.scaleX / 1.05);

    //TABLEAU ENFANT
    enfant = this.add.sprite(background.displayWidth * 4.5, window.innerHeight / 10, 'enfant');
    enfant.setOrigin(0, 0);
    enfant.setScale(background.scaleX / 1.1);
    enfant.setTexture('enfant', 1);

    //TABLEAU VAGUES
    vagues = this.add.image(background.displayWidth * 6.2, window.innerHeight / 10, 'vagues');
    vagues.setOrigin(0, 0);
    vagues.setScale(background.scaleX / 1.1);
    vagues.setTexture('vagues', 1);


    //CHLOE ---------------------------------------------------------------------------------------------------------------------
    chloe = this.add.sprite(window.innerWidth / 6, window.innerHeight / 6 * 4.95, 'chloe');
    chloe.setOrigin(0, 0);
    chloe.setScale(background.scaleX / 2);

    //CHLOE ANIMATION
    this.anims.create({
        key: 'walkChloe',
        frames: this.anims.generateFrameNumbers('chloe', {
            start: 0,
            end: 5
        }),
        frameRate: 10,
        repeat: -1
    });
    //CHLOE SOB
    this.anims.create({
        key: 'walkChloeSOB',
        frames: this.anims.generateFrameNumbers('chloeSob', {
            start: 0,
            end: 5
        }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'idleChloe',
        frames: [{ key: 'idlechloe', frame: getRandomInt(3) }],
        frameRate: 10,
    });
    this.anims.create({
        key: 'idleChloeSob',
        frames: [{ key: 'chloeSob', frame: 2 }],
        frameRate: 10
    });
    //CHLOE MOVEMENT
    this.input.on('pointerdown', () => goForward = true);
    this.input.on('pointerup', () => goForward = false);


    //LILY ---------------------------------------------------------------------------------------------------------------------
    lily = this.add.sprite(totalBackgroundLength / 10 * 9, window.innerHeight / 6 * 4.85, 'lily');
    lily.setOrigin(0, 0);
    lily.setScale(background.scaleX / 2);
    //LILY ANIMATION
    this.anims.create({
        key: 'walkLily',
        frames: this.anims.generateFrameNumbers('lily'),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'idleLily',
        frames: [{ key: 'lily', frame: 2 }],
        frameRate: 10
    });

    //MAMAN ---------------------------------------------------------------------------------------------------------------------
    maman = this.add.sprite(window.innerWidth / 11, window.innerHeight / 6 * 4.5, 'maman');
    maman.setOrigin(0, 0);
    maman.setScale(background.scaleX / 1.75);

    //FOULE
    foule = this.add.image(background.displayWidth * 1.1, window.innerHeight / 1.85, 'foule');
    foule.setOrigin(0, 0);
    foule.setScale(background.scaleX / 1.6);

    //PRESS BUTTON
    press = this.add.sprite(window.innerWidth * 0.90, window.innerHeight / 6 * 4.95, 'press');
    press.setOrigin(0, 0);
    press.setScale(background.scaleX / 1.5);
    this.anims.create({
        key: 'pressAnim',
        frames: this.anims.generateFrameNumbers('press', {
            start: 0,
            end: 1
        }),
        frameRate: 5,
        repeat: -1
    });

    taptap = this.add.sprite(window.innerWidth * 0.90, window.innerHeight / 6 * 1.5, 'taptap');
    taptap.setOrigin(0, 0);
    taptap.setScale(0);
    this.anims.create({
        key: 'taptapAnim',
        frames: this.anims.generateFrameNumbers('taptap', {
            start: 0,
            end: 1
        }),
        frameRate: 5,
        repeat: -1
    });

    //STATUE1
    statue1 = this.add.image(background.displayWidth * 3.8, window.innerHeight / 5, 'statue1');
    statue1.setOrigin(0, 0);
    statue1.setScale(background.scaleX / 1.05);

    //STATUE2
    statue2 = this.add.image(background.displayWidth * 5.4, window.innerHeight / 5, 'statue2');
    statue2.setOrigin(0, 0);
    statue2.setScale(background.scaleX / 1.05);

    //CAMERA
    this.cameras.main.setBounds(0, 0, totalBackgroundLength, window.innerHeight);
    this.cameras.main.startFollow(chloe, true, 0.05, 0.05);

    press.play('pressAnim');
    taptap.play('taptapAnim');
}

function update() {
    //GAME IS PLAYING
    if (!isPlaying) {
        return null;
    }

    //ORIENTATION DU SPRITE
    if (scenographyConfig.direction === -1) {
        chloe.flipX = true;
        lily.flipX = true;
    } else {
        chloe.flipX = false;
        if (meetLily === false) {
            lily.flipX = true;
        } else {
            lily.flipX = false;
        }
    }

    //AVANCER
    if (goForward) {
        chloe.x += speed * scenographyConfig.direction;
        if (meetLily === true) {
            lily.play("walkLily", true);
            chloe.play("walkChloe", true);
        } else { // meetLily === false
            if (chloe.x > totalBackgroundLength / 1.4) {
                chloe.play("walkChloeSOB", true);
            } else {
                lily.play("idleLily", true);
                chloe.play("walkChloe", true);
            }
        }
    } else {
        if (chloe.x > totalBackgroundLength / 1.4 && meetLily === false) {
            chloe.play("idleChloeSob", true);
        }
        else {
            chloe.play("idleChloe", true);
            lily.play("idleLily", true);
        }
    }

    //CHECK SI CHLOÉ PASSE À TRAVERS LA FOULE
    if (checkOverlap(chloe, foule)) {
        speed = scenographyConfig.crowdSpeed;
        this.cameras.main.shake(7, 0.005);
        goForward = false;
        if (meetLily === true) {
            lily.setScale(0)
        }
    }
    else {
        speed = scenographyConfig.walkSpeed;
    }

    //Premier dialogue 
    if (chloe.x > totalBackgroundLength / 12 && meetLily === false && dialog1 === 0) {
        chloe.play("idleChloe", true);
        press.setScale(0);
        showDialogs(["introduction1", "introduction2", "tutoriel1"]);
        dialog1 += 1;
    }

    if (chloe.x > totalBackgroundLength / 10 && meetLily === false && dialog2 === 0) {
        chloe.play("idleChloe", true);
        showDialogs(['introduction3']);
        dialog2 += 1;
        taptap.setScale(1);
    }

    if (chloe.x > totalBackgroundLength / 4.3 && meetLily === false && dialog2 === 1) {
        taptap.setScale(0);
    }

    if (chloe.x > totalBackgroundLength / 3.5 && meetLily === false && dialog3 === 0) {
        chloe.play("idleChloe", true);
        showDialogs(['tableau1']);
        dialog3 += 1;
    }

    if (chloe.x > totalBackgroundLength / 2.5 && meetLily === false && dialog4 === 0) {
        chloe.play("idleChloe", true);
        showDialogs(['statue1']);
        dialog4 += 1;
    }

    if (chloe.x > totalBackgroundLength / 1.9 && meetLily === false && dialog5 === 0) {
        chloe.play("idleChloe", true);
        showDialogs(['tableau2']);
        dialog5 += 1;
    }

    if (chloe.x > totalBackgroundLength / 1.7 && meetLily === false && dialog6 === 0) {
        chloe.play("idleChloe", true);
        showDialogs(['statue2']);
        dialog6 += 1;
    }

    if (chloe.x > totalBackgroundLength / 1.4 && meetLily === false && dialog7 === 0) {
        chloe.play("idleChloe", true);
        showDialogs(['tableau3', 'tableau3bis']);
        dialog7 += 1;
    }

    //ARRIVÉ DEVANT LILY
    if (chloe.x > totalBackgroundLength / 10 * 9 - 150 && meetLily === false) {
        chloe.play("idleChloeSob", true);
        showDialog('meetLily1');
        ingameScreen.addEventListener('click', () => {
            if (chloe.x > totalBackgroundLength / 10 * 9 - 150 && meetLily === false) {
                showDialog('meetLily2');
                ingameScreen.addEventListener('click', () => {
                    if (chloe.x > totalBackgroundLength / 10 * 9 - 150 && meetLily === false) {
                        showDialog('meetLily3');
                        ingameScreen.addEventListener('click', () => {
                            if (chloe.x > totalBackgroundLength / 10 * 9 - 150 && meetLily === false) {
                                showDialog('meetLily4');
                                ingameScreen.addEventListener('click', () => {
                                    if (chloe.x > totalBackgroundLength / 10 * 9 - 150 && meetLily === false) {
                                        dialogBox.style.display = "none";
                                        scenographyConfig.direction = -1;
                                        timer = setInterval(animateLily, 10);
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    }

    if (meetLily === true) { //suivre chloé
        lily.x = chloe.x - difference;
        vagues.setTexture('vagues', 0);
        enfant.setTexture('enfant', 0);
        lion.setTexture('lion', 0);
    }

    if (chloe.x < totalBackgroundLength / 1.2 && dialog8 === 0 && meetLily === true) {
        chloe.play("idleChloe", true);
        lily.play("idleLily", true);
        showDialogs(['retour1', 'retour2', 'retour3', 'retour4']);
        dialog8++;
    }

    if (chloe.x < totalBackgroundLength / 1.8 && dialog9 === 0 && meetLily === true) {
        chloe.play("idleChloe", true);
        lily.play("idleLily", true);
        showDialogs(['retour5', 'retour6']);
        dialog9++;
    }

    if (chloe.x < totalBackgroundLength / 2.8 && dialog10 === 0 && meetLily === true) {
        chloe.play("idleChloe", true);
        lily.play("idleLily", true);
        showDialogs(['retour7', 'retour8', 'retour9', 'retour10']);
        dialog10++;
    }

    //Chloé sort de la foule et retrouve sa maman
    if (chloe.x < totalBackgroundLength / 10 && dialog11 === 0 && meetLily === true) {
        chloe.play("idleChloe", true);
        lily.play("idleLily", true);
        isPlaying = false;
        timer = setInterval(animateChloe, 10);
        ingameScreen.addEventListener('click', () => {
            if (varEndGame === 1) {
                console.log("premier clic")
                showDialog(['maman2']);
                varEndGame = 2;
                ingameScreen.addEventListener('click', () => {
                    if (varEndGame === 2) {
                        console.log("deuxième clic")
                        endGame();
                    }
                })
            }

        });
        dialog11++;
    }
}


//MES FONCTIONS -----------------------------------------------------------------------------------------------------------------

function endGame() { //FIN DU JEU
    switchScreen(ingameScreen, endScreen);
}

function checkOverlap(spriteA, spriteB) { //SUPERPOSITION DE DEUX SPRITES
    var boundsA = spriteA.getBounds();
    var boundsB = spriteB.getBounds();
    return Phaser.Geom.Intersects.RectangleToRectangle(boundsA, boundsB);
}


function animateLily() {
    lily.x = lily.x - 1; //lily avance de 1 vers la gauche
    lily.play("walkLily", true);
    if (lily.x < chloe.x - innerWidth / 15) {
        isPlaying = true;
        meetLily = true;
        difference = chloe.x - lily.x;
        lily.play("idleLily", true);
        clearInterval(timer);
    }
}


function animateChloe() {
    chloe.x = chloe.x - 1; //chloe avance de 1 vers la gauche
    chloe.play("walkChloe", true);
    if (chloe.x < window.innerWidth / 11 * 2) {
        chloe.play("idleChloe", true);
        showDialog(['maman1']);
        varEndGame = 1;
        clearInterval(timer);
    }
}


