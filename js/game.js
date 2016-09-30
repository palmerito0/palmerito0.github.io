var game = new Phaser.Game(600, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {
    game.load.image('player','assets/dodge/sprites/alien-head.png');
}

var player;

function create() {
    player = game.add.sprite(0, 0, 'player');
    player.scale.setTo(0.15, 0.15)
}

function update() {
}

/*
var cnv;
var player;

function setup() {
    cnv = createCanvas(250, 250);
    cnv.parent("dodgeCanvas");
    player = createSprite(width/2, height-25, 50, 50);
}

function draw() {
    background(0,0,100);
    
    if (keyDown(RIGHT_ARROW) && player.position.x < (width - 25)) {
        player.position.x += 2;
    }
    
    if (keyDown(LEFT_ARROW) && player.position.x > 25) {
        player.position.x -= 2;
    }
}
*/