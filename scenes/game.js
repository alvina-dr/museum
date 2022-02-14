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
    this.load.image('chloe', 'assets/sprites/chloe1.png');
    this.load.image('background', 'assets/ui/BG.png');
    this.load.image('foule', 'assets/sprites/foule.png');
}

function create() {
    this.cursors = this.input.keyboard.createCursorKeys();


    //BACKGROUND
    let str = '';

    for (let i = 0; i < 50; i++) {
        background = this.add.image(i*400, 0, 'background');
        background.setOrigin(0, 0);
        background.displayHeight = window.innerHeight;
        background.scaleX = background.scaleY;
        str = str + i;

    }
    background = this.add.image(0, 0, 'background');
    background.setOrigin(0, 0);
    background.displayHeight = window.innerHeight;
    background.scaleX = background.scaleY;


    //CHLOE
    chloe = this.physics.add.sprite(window.innerWidth / 6, window.innerHeight / 6 * 5, 'chloe');
    chloe.setOrigin(0, 0);
    chloe.setScale(background.scaleX / 2);
    //CHLOE MOVEMENT
    this.input.on('pointerdown', () => goForward = true);
    this.input.on('pointerup', () => goForward = false);

    //FOULE
    foule = this.physics.add.image(background.displayWidth * 5, window.innerHeight / 2, 'foule');
    foule.setOrigin(0, 0);
    foule.setScale(background.scaleX / 1.5);

    //this.physics.add.overlap(chloe, foule, throughCrowd, null, this);
    this.physics.add.overlap(chloe, foule);

    //CAMERA
    this.cameras.main.setBounds(0, 0, background.displayWidth*10, window.innerHeight);
    this.physics.world.setBounds(0, 0, background.displayWidth*10, window.innerHeight);
    this.cameras.main.startFollow(chloe, true, 0.05, 0.05);

}

function update() {
    //GAME IS PLAYING
    if (!isPlaying) {
        return null;
    }

    //AVANCER
    if (goForward) {
        chloe.x += speed * scenographyConfig.direction;
    }

    //CHECK SI CHLOÉ PASSE À TRAVERS LA FOULE
    console.log(speed);
    if (checkOverlap(chloe, foule)) {
        speed = scenographyConfig.crowdSpeed;
        this.cameras.main.shake(7, 0.005);
    }
    else {
        speed = scenographyConfig.walkSpeed;
    }

    //PREMIER PASSAGE DEVANT LE PREMIER TABLEAU
    if (chloe.x > background.displayWidth * 5 && painting1 === 0) {
        //await delay(5000); wait and animate somehow ?
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
    if (chloe.x > background.displayWidth * 10) {
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