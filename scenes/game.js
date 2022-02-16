width = window.innerWidth * window.devicePixelRatio;
height = window.innerHeight * window.devicePixelRatio;

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
var game = new Phaser.Game(config);
var goForward = false;
var dialog1 = 0;
var dialog2 = 0;
var dialog3 = 0;
var dialog4 = 0;
var dialog5 = 0;
var dialog6 = 0;
var dialog7 = 0;

var speed = scenographyConfig.walkSpeed;
var meetLily = false;
var chloeAnimationWalk = null;

function preload() {
    /*this.load.atlasJSONHash;
    this.load.multiatlas('lily', 'assets/anims/lily.json', 'assets/anims');*/

    this.load.spritesheet('chloe', 'assets/sprites/chloe.png', { frameWidth: 331, frameHeight: 360 });
    this.load.spritesheet('lily', 'assets/sprites/lily.png', { frameWidth: 341, frameHeight: 382 });
    //this.load.spritesheet('lilyIdle', 'assets/sprites/lilyIdle.png', { frameWidth: 341, frameHeight: 382 });
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
    this.load.image('press', 'assets/ui/press.png');
    // this.load.image('vignette', 'assets/images.jpg');
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

    // vignette = this.physics.add.image(0, 0, 'vignette');
    // vignette.setOrigin(0, 0);
    // vignette.setScale(background.scaleX * 10);
    // vignette.setAlpha(0.5);

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


    //CHLOE
    chloe = this.add.sprite(window.innerWidth / 6, window.innerHeight / 6 * 4.95, 'chloe');
    chloe.setOrigin(0, 0);
    chloe.setScale(background.scaleX / 2);
    //CHLOE ANIMATION
    this.anims.create({
        key: 'walkChloe',
        frames: this.anims.generateFrameNumbers('chloe', {
            start: 0,
            end: 3
        }),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'idleChloe',
        frames: [ { key: 'chloe', frame: 1 } ],
        frameRate: 10
    });


    //MAMAN
    maman = this.add.sprite(window.innerWidth / 11, window.innerHeight / 6 * 4.5, 'maman');
    maman.setOrigin(0, 0);
    maman.setScale(background.scaleX / 1.75);

    //CHLOE MOVEMENT
    this.input.on('pointerdown', () => goForward = true);
    this.input.on('pointerup', () => goForward = false);


    //LILY
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
        frames: [ { key: 'lily', frame: 2 } ],
        frameRate: 10
    });

    //FOULE
    foule = this.add.image(background.displayWidth * 1.1, window.innerHeight / 1.85, 'foule');
    foule.setOrigin(0, 0);
    foule.setScale(background.scaleX / 1.6);

    //PRESS BUTTON
    press = this.add.sprite(window.innerWidth * 0.90, window.innerHeight / 6 * 4.95, 'press');
    press.setOrigin(0, 0);
    press.setScale(background.scaleX / 1.5);

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
    //this.physics.world.setBounds(0, 0, totalBackgroundLength, window.innerHeight);
    this.cameras.main.startFollow(chloe, true, 0.05, 0.05);
    // vignette.startFollow(chloe, true, 0.05, 0.05);


}

function update() {
    //GAME IS PLAYING
    if (!isPlaying) {
        return null;
    }

    var pointer = this.input.activePointer;


//ORIENTATION DU SPRITE
    if (scenographyConfig.direction === -1) { 
        chloe.flipX=true;
        lily.flipX=true;
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
        chloe.play("walkChloe", true);
        if (meetLily === true) {
            lily.play("walkLily", true);
        } else {
            lily.play("idleLily", true);
        }
    }
    else {
        chloe.play("idleChloe", true);
        lily.play("idleLily", true);
    }

    //CHECK SI CHLOÉ PASSE À TRAVERS LA FOULE
    if (checkOverlap(chloe, foule)) {
        speed = scenographyConfig.crowdSpeed;
        this.cameras.main.shake(7, 0.005);
        goForward = false;
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

    if (chloe.x > totalBackgroundLength / 9 && meetLily === false && dialog2 === 0) {
        chloe.play("idleChloe", true);
        showDialogs(['introduction3']);
        dialog2 += 1;
    }

    if (chloe.x > totalBackgroundLength / 4 && meetLily === false && dialog3 === 0) {
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
        showDialogs(['meetLily1', 'meetLily2', 'meetLily3', 'meetLily4']);
        scenographyConfig.direction = -1;
        timer = setInterval(animateLily, 10);
    }

    if (meetLily === true) { //suivre chloé
        lily.x = chloe.x - difference;
        vagues.setTexture('vagues', 0);
        enfant.setTexture('enfant', 0);
        lion.setTexture('lion', 0);
    }

    //DEMI-TOUR À LA FIN DU COULOIR
    if (chloe.x > background.displayWidth * 8) {
        scenographyConfig.direction = -1;
    }

    //CHLOE RETROUVE SA MAMAN 
    if (chloe.x < 100 && scenographyConfig.direction === -1) {
        endGame();
    }
}


//MES FONCTIONS -----------------------------------------------------------------------------------------------------------------

function endGame() { //FIN DU JEU
    switchScreen(ingameScreen, endScreen);
    //set all values back to zero to cleanly restart the game
    dialog1 = 0;
    chloe.x = 200;
    scenographyConfig.direction = 1;
    meetLily = false;
    lily.x = totalBackgroundLength / 10 * 9;
    isPlaying = false;
    //this.scene.restart();
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
        clearInterval(timer);
        isPlaying = true;
        meetLily = true;
        difference = chloe.x - lily.x;
        lily.play("idleLily", true);

    }
}

function showDialogs() {
    //show first dialog
    //check if click
        //if there is another dialog then show other dialog
        //else close dialog
}


