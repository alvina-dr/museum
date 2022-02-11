var config = {
    type: Phaser.AUTO,
    width: 1000,
    height: 600,
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

var game = new Phaser.Game(config);

function preload ()
{
    this.load.image('chloe', 'assets/sprites/chloe.png');

    //this.load.setBaseURL('http://labs.phaser.io');

    this.load.image('background', 'assets/background1.jpg');
    /*this.load.image('logo', 'assets/sprites/phaser3-logo.png');
    this.load.image('red', 'assets/particles/red.png');*/
    this.input.addDownCallback(function() {
            
            if (game.sound.context.state === 'suspended') {
                game.sound.context.resume();
            }
            
        });


}

function create ()
{
    
    this.add.image(400, 300, 'background');
    chloe = this.physics.add.sprite(100, 500, 'chloe');
    /*var keyObj = this.input.keyboard.addKey('W');  // Get key object
    keyObj.on('down', function() { 
        chloe.setVelocityX(-160);
    });*/
    cursors = this.input.keyboard.createCursorKeys();


}

function update () {


    if (cursors.left.isDown)
    {
        console.log("je bouge");
        chloe.setVelocityX(-160);
    }
    
    //this.input.on('pointerdown', () => console.log('click'));
}
