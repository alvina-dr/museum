width = window.innerWidth * window.devicePixelRatio;
height = window.innerHeight * window.devicePixelRatio;


var config = {
    type: Phaser.AUTO,
    width: width,
    height: height,
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

var scenographyConfig = {
    walkSpeed : 1,
    runSpeed : 2,
};

var game = new Phaser.Game(config);
var goForward = false;


function preload ()
{
    this.load.image('chloe', 'assets/sprites/chloe1.png');
    this.load.image('background', 'assets/background1.jpg');

}

function create ()
{
    //SHOW ASSETS
    this.add.image(400, height/2, 'background');

    this.cursors = this.input.keyboard.createCursorKeys();
    this.chloe = this.physics.add.sprite(100, height/2, 'chloe');


    //CAMERA
    this.cameras.main.setBounds(0, 0, 1920 * 2, 1080 * 2);
    this.physics.world.setBounds(0, 0, 1920 * 2, 1080 * 2);



    //CHLOE MOVEMENT
    this.input.on('pointerdown', () => goForward = true);
    this.input.on('pointerup', () => goForward = false);

    this.cameras.main.startFollow(this.chloe, true, 0.05, 0.05);

}

function update () {
    if (goForward)
    {
        this.chloe.x += scenographyConfig.walkSpeed;
    } 
    
}
