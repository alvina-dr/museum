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
    walkSpeed : 10,
    runSpeed : 2,
    direction : 1
};
var game = new Phaser.Game(config);
var goForward = false;
var painting1 = 0;

function preload ()
{
    this.load.image('chloe', 'assets/sprites/chloe1.png');
    this.load.image('background', 'assets/background1.jpg');

}

function create ()
{
    this.cursors = this.input.keyboard.createCursorKeys();

    //BACKGROUND
    background = this.add.image(0, 0, 'background');
    background.setOrigin(0, 0);
    background.displayHeight = window.innerHeight;
    background.scaleX = background.scaleY;

    //CHLOE
    chloe = this.physics.add.sprite(window.innerWidth/6, window.innerHeight/6*5, 'chloe');
    chloe.setOrigin(0, 0);
    chloe.setScale(background.scaleX/2);
    //CHLOE MOVEMENT
    this.input.on('pointerdown', () => goForward = true);
    this.input.on('pointerup', () => goForward = false);

    //CAMERA
    this.cameras.main.setBounds(0, 0, background.displayWidth, window.innerHeight);
    this.physics.world.setBounds(0, 0, background.displayWidth, window.innerHeight);
    this.cameras.main.startFollow(chloe, true, 0.05, 0.05);

}

function update () {
    if (!isPlaying) {
        return null;
    }

    if (goForward) {
        chloe.x += scenographyConfig.walkSpeed * scenographyConfig.direction;
    }
    if (chloe.x > background.displayWidth/2 && painting1 === 0) { //half of corridor 
        //await delay(5000); wait and animate somehow ?
        //camera tremble
        this.cameras.main.shake(0.05, 500);
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

    if (chloe.x > background.displayWidth) { //end of corridor
        scenographyConfig.direction = -1;
    }
    if (chloe.x < 100 && scenographyConfig.direction === -1) { // coming back 
        endGame();
        
    }

}


function endGame () {
    isPlaying = false;
    switchScreen(ingameScreen, endScreen);
    //set all values back to zero
    painting1 = 0;
    chloe.x = 200;
    scenographyConfig.direction = 1;  

}