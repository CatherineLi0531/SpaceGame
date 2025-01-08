const WIDTH = 400
const HEIGHT = 400

const gameConfig = {
    zoomed_out : {

    },
    zoomed_in : {

    }
}

class Game extends Phaser.Scene {
    preload() {

    }

    create() {

    }

    update() {
	
    }
}

const config = {
    type : Phaser.AUTO,
    width : WIDTH,
    height : HEIGHT,
    physics : {
	default : 'arcade',
	arcade : {

	}
    },
    scene : Game
}

var game = new Phaser.Game(config)
