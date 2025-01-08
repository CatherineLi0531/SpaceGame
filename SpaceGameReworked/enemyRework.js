var enemyBeams = [];
var enemies = {};
var enemy;
var iframe = 0;
var enemyiframe = 0;
var angle = 0;
var tx;
var ty;
var ex;
var ey;

class Enemy extends Phaser.Physics.Arcade.Sprite{
    //animations
    constructor(scene, name, x, y, spritesheet, animation){
        super(scene, x, y, spritesheet);
        //this.animation = animation;
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setScale(.3);
        this.play(animation);
        this.hp = 100
        this.dead = false;
        this.name = name
    }

        damage() {
            this.hp -= 10;
            if (this. hp <= 0) {
                this.kill()
            }
        }

        kill() {
            this.dead = true
            this.setVisible(false);
            delete autonomousemits[this.name]
            delete enemies[this.name]
            this.destroy()
            console.log(this.name)
        }
}

class enemyRework extends Phaser.Scene {
	constructor(scene) {
            super(scene)
            this.scene = scene
        }

	preload() {
		this.scene.load.atlas('enemy', 'assets/En1.png', 'assets/En1.json');
	}

	create() {
		this.scene.anims.create({key: 'enemy', frames: this.scene.anims.generateFrameNames('enemy', {prefix: 'ship', end: 2, zeroPad: 2}), repeat: -1});
        this.scene.enemy = new Enemy(this.scene, 'Enemy1', 800, 800, 'enemy', 'enemy'); 
        this.scene.shooter.spawnEmitter('Enemy1', this.scene, this.scene.enemy.x, this.scene.enemy.y+10, 1200, false, 10); 
        this.scene.enemy2 = new Enemy(this.scene, 'Enemy2', 0, 0, 'enemy', 'enemy'); 
        this.scene.shooter.spawnEmitter('Enemy2', this.scene, this.scene.enemy.x, this.scene.enemy.y+10, 1600, false, 10); 
        enemies["Enemy1"] = this.scene.enemy;  
        enemies["Enemy2"] = this.scene.enemy2;


	}

	update() {
		iframe += 1;            
		for (let i in playerBeams) {
                if (Math.abs(playerBeams[i].x) >= worldsize || Math.abs(playerBeams[i].y) >= worldsize) {
                    playerBeams[i].destroy()
                }
            }

        for (let i in enemyBeams) {
            if (Math.abs(enemyBeams[i].x) >= worldsize || Math.abs(enemyBeams[i].y) >= worldsize) {
                enemyBeams[i].destroy()
            }
        }
	enemyiframe += 1

	this.scene.physics.add.overlap(player, enemyBeams, function() { 
        	if (iframe > 20) {
        	player.hp -= 10
        	iframe = 0;
        	}



        }, null, this);

	for (let i in enemies) {
		enemy = enemies[i]
		this.scene.physics.add.overlap(enemy, playerBeams, function() { 
        	if (enemyiframe > 10) {
        	enemy.hp -= 10
        	enemyiframe = 0;
        	}



        }, null, this);



        enemy.setRotation(Math.atan2(enemy.body.velocity.y, enemy.body.velocity.x)+ Math.PI);

        tx = player.body.x;
        ty = player.body.y;
        ex = enemy.body.x;
        ey = enemy.body.y;



        if (tx < ex) {
                    angle = (Math.PI) + Math.atan((ty - ey)/(tx - ex))
                } else {
                    angle = Math.atan((ty - ey)/(tx - ex))
                }
        enemy.setVelocityX(500 * Math.cos(angle))
        enemy.setVelocityY(500 * Math.sin(angle))

        if (enemy.hp <= 0) {
            enemy.kill()
        }

        }

        if(autonomousemits['Enemy1'] != null) {
        	        autonomousemits['Enemy1'].body.x = ex
        			autonomousemits['Enemy1'].body.y = ey
        if(autonomousemits['Enemy2'] != null) {
        	        autonomousemits['Enemy2'].body.x = ex
        			autonomousemits['Enemy2'].body.y = ey

	}

    }
}
	




	enemyDeath(enemy){
            enemy.disableBody(true, true);

        }

    playerDeath(player){
            player.disableBody(true, true);
        }

}