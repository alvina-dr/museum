width = window.innerWidth * window.devicePixelRatio;
height = window.innerHeight * window.devicePixelRatio;

var config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 }
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var isPlaying = false;
var scenographyConfig = {
    walkSpeed: 10,
    crowdSpeed: 5,
    direction: 1
};
var game = new Phaser.Game(config);
var goForward = false;
var painting1 = 0;
var speed = scenographyConfig.walkSpeed;

function preload() {
    this.load.spritesheet('chloe', 'assets/sprites/chloe.png', { frameWidth: 331, frameHeight: 360 });
    this.load.spritesheet('lily', 'assets/sprites/lily.png', { frameWidth: 331, frameHeight: 360 });
    this.load.image('background', 'assets/ui/BG.png');
    this.load.image('foule', 'assets/sprites/foule.png');
    this.load.image('oeuvredepart', 'assets/ui/oeuvredépart.png');
    this.load.image('fenetre1', 'assets/ui/fenêtre1.png');
    this.load.image('lionpeur', 'assets/ui/Lionpeur.png');
    this.load.image('fenetre2', 'assets/ui/fenêtre.png');
    this.load.image('enfant', 'assets/ui/Vierge_peur.png');
    this.load.image('statue1', 'assets/ui/statue.png');
    this.load.image('vagues', 'assets/ui/bateaunormal.png');
    this.load.image('statue2', 'assets/ui/Apollon.png');
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
    totalBackgroundLength = background.displayWidth * 10; //LA LONGUEUR TOTAL DU BACKGROUND (en fonction de la hauteur de l'écran)

    //TABLEAU DÉPART
    oeuvredepart = this.physics.add.image(background.displayWidth * 0, window.innerHeight / 10, 'oeuvredepart');
    oeuvredepart.setOrigin(0, 0);
    oeuvredepart.setScale(background.scaleX / 1.1);

    //FENETRE1
    Fenetre1 = this.physics.add.image(background.displayWidth * 1.2, window.innerHeight / 7, 'fenetre1');
    Fenetre1.setOrigin(0, 0);
    Fenetre1.setScale(background.scaleX / 1.05);

    //TABLEAU LION PEUR
    lionpeur = this.physics.add.image(background.displayWidth * 2.3, window.innerHeight / 10, 'lionpeur');
    lionpeur.setOrigin(0, 0);
    lionpeur.setScale(background.scaleX / 1.1);

    //FENETRE2
    Fenetre2 = this.physics.add.image(background.displayWidth * 3.6, window.innerHeight / 7, 'fenetre2');
    Fenetre2.setOrigin(0, 0);
    Fenetre2.setScale(background.scaleX / 1.05);

    //TABLEAU ENFANT
    enfant = this.physics.add.image(background.displayWidth * 4.5, window.innerHeight / 10, 'enfant');
    enfant.setOrigin(0, 0);
    enfant.setScale(background.scaleX / 1.1);

    //TABLEAU VAGUES
    vagues = this.physics.add.image(background.displayWidth * 6.2, window.innerHeight / 10, 'vagues');
    vagues.setOrigin(0, 0);
    vagues.setScale(background.scaleX / 1.1);

    //CHLOE ANIMATION
    this.anims.create({
        key: 'walk',
        frames: this.anims.generateFrameNumbers('chloe'),
        frameRate: 10,
        repeat: -1
    });

    //CHLOE
    chloe = this.physics.add.sprite(window.innerWidth / 6, window.innerHeight / 6 * 4.95, 'chloe');
    chloe.setOrigin(0, 0);
    chloe.setScale(background.scaleX / 2);

    //CHLOE MOVEMENT
    this.input.on('pointerdown', () => goForward = true);
    this.input.on('pointerup', () => goForward = false);

    //LILY
    lily = this.physics.add.sprite(window.innerWidth / 6, window.innerHeight / 6 * 5, 'lily');
    lily.setOrigin(0, 0);
    lily.setScale(background.scaleX / 2);

    //FOULE
    foule = this.physics.add.image(background.displayWidth * 1.1, window.innerHeight / 1.85, 'foule');
    foule.setOrigin(0, 0);
    foule.setScale(background.scaleX / 1.6);

    //STATUE1
    statue1 = this.physics.add.image(background.displayWidth * 3.8, window.innerHeight / 5, 'statue1');
    statue1.setOrigin(0, 0);
    statue1.setScale(background.scaleX / 1.05);

    //STATUE2
    statue2 = this.physics.add.image(background.displayWidth * 5.4, window.innerHeight / 5, 'statue2');
    statue2.setOrigin(0, 0);
    statue2.setScale(background.scaleX / 1.05);

    //CAMERA
    this.cameras.main.setBounds(0, 0, totalBackgroundLength, window.innerHeight);
    this.physics.world.setBounds(0, 0, totalBackgroundLength, window.innerHeight);
    this.cameras.main.startFollow(chloe, true, 0.05, 0.05);

}

function update() {
    //GAME IS PLAYING
    if (!isPlaying) {
        return null;
    }

    //ORIENTATION DU SPRITE
    if (scenographyConfig.direction === -1) {
        chloe.flipX = true;
    } else {
        chloe.flipX = false;
    }

    //AVANCER
    if (goForward) {
        chloe.x += speed * scenographyConfig.direction;
        chloe.play("walk", true);
    }
    else {
        chloe.play("idle", true);
    }

    //CHECK SI CHLOÉ PASSE À TRAVERS LA FOULE
    if (checkOverlap(chloe, foule)) {
        speed = scenographyConfig.crowdSpeed;
        this.cameras.main.shake(7, 0.005);
    }
    else {
        speed = scenographyConfig.walkSpeed;
    }

    //PREMIER PASSAGE DEVANT LE PREMIER TABLEAU
    if (chloe.x > totalBackgroundLength / 2 && painting1 === 0) {
        //await delay(5000); wait and animate somehow ?
        chloe.play("idle", true);
        showDialog('introduction1');
        ingameScreen.addEventListener('click', () => {
            showDialog('introduction2');
            ingameScreen.addEventListener('click', () => {
                showDialog('introduction3');
                ingameScreen.addEventListener('click', () => {
                    dialogBox.style.display = "none";
                    isPlaying = true;
                    painting1 += 1;
                });
            });
        });
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
    isPlaying = false;
    switchScreen(ingameScreen, endScreen);
    //set all values back to zero to cleanly restart the game
    painting1 = 0;
    chloe.x = 200;
    scenographyConfig.direction = 1;
}

function checkOverlap(spriteA, spriteB) { //SUPERPOSITION DE DEUX SPRITES
    var boundsA = spriteA.getBounds();
    var boundsB = spriteB.getBounds();
    return Phaser.Geom.Intersects.RectangleToRectangle(boundsA, boundsB);
}