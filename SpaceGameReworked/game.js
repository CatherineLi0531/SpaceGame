const gameConfig = {
    zoomed_out : {

    },
    zoomed_in : {

    }
}

var worldsize = 1024

class Game extends Phaser.Scene {
    preload() {
        this.movement = new Movement(this);
        this.movement.preload();
        this.shooter = new EmitterShooter(this);
        this.shooter.preload();
        this.enemyRework = new enemyRework(this);
        this.enemyRework.preload();
    }

    create() {
        this.movement.create();
        this.shooter.create();
        this.enemyRework.create();


        this.cameras.main.startFollow(player);
        this.cameras.main.setSize(1024, 768);
        this.cameras.main.setBounds(-worldsize, -worldsize, 2*worldsize, 2*worldsize);
    }

    update() {
        this.movement.update();
        this.shooter.update();
        this.enemyRework.update();
    }
}

var config = {
    type : Phaser.AUTO,
    width : 1024,
    height : 768,
    physics : {
    default : 'arcade',
    arcade : {

    }
    },
    scene : Game
}

var game = new Phaser.Game(config)