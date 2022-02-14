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

function preload ()
{
    this.load.spritesheet('chloe', 'assets/sprites/chloe.png', { frameWidth: 331, frameHeight: 360 });
    this.load.spritesheet('lily', 'assets/sprites/lily.png', { frameWidth: 331, frameHeight: 360 });
    this.load.image('background', 'assets/ui/BG.png');
    this.load.image('foule', 'assets/sprites/foule.png');
}

function create() {
    this.cursors = this.input.keyboard.createCursorKeys();


    //BACKGROUND

    for (let i = 0; i < 50; i++) {
        background = this.add.image(i*400, 0, 'background');
        background.setOrigin(0, 0);
        background.displayHeight = window.innerHeight;
        background.scaleX = background.scaleY;
    }
    background = this.add.image(0, 0, 'background');
    background.setOrigin(0, 0);
    background.displayHeight = window.innerHeight;
    background.scaleX = background.scaleY;
    totalBackgroundLength = background.displayWidth * 10; //LA LONGUEUR TOTAL DU BACKGROUND (en fonction de la hauteur de l'écran)

    //CHLOE ANIMATION
    this.anims.create({
        key: 'walk',
        frames: this.anims.generateFrameNumbers('chloe'),
        frameRate: 10,
        repeat: -1
    });
    //CHLOE
    chloe = this.physics.add.sprite(window.innerWidth / 6, window.innerHeight / 6 * 5, 'chloe');
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
    foule = this.physics.add.image(totalBackgroundLength/3, window.innerHeight / 2, 'foule');
    foule.setOrigin(0, 0);
    foule.setScale(background.scaleX / 1.5);

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
        chloe.flipX=true;
    } else {
        chloe.flipX=false;
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
    if (checkOverlap(chloe, foule)) 
    {
        speed = scenographyConfig.crowdSpeed;
        this.cameras.main.shake(7, 0.005);
    }
    else {
        speed = scenographyConfig.walkSpeed;
    }

    //PREMIER PASSAGE DEVANT LE PREMIER TABLEAU
    if (chloe.x > totalBackgroundLength/2 && painting1 === 0) {
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
    if (chloe.x > totalBackgroundLength) {
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