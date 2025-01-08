

    class Player extends Phaser.Physics.Arcade.Sprite
    {
        constructor(scene, x, y)
        {
            super(scene, x, y, 'ship');
            scene.add.existing(this);
            scene.physics.add.existing(this);
            this.setScale(2);
            this.setCollideWorldBounds(false);
            this.setGravityY(0); //We will set gravity *per object* rather than for the scene!
            this.hp = 100;
            this.maxHP = 100;
            this.dead = false
        }

        damage(x) {
            this.hp -= x;
            if (this. hp <= 0) {
                this.kill()
            }
        }

        kill() {
            this.dead = true
            this.setVisible(false);
        }
    }



    //var game = new Phaser.Game(config);
    //Game Objects
    var platforms
    var player;
    var accel = 1000;
    var maxSpeed = 700;
    var cameraX = 0
    var cameraY = 0

    //Keyboard controls
    var cursors;
    var keys;
    var space;
    var star;
    var hpText;
    var xyText;

    var gui;
    var guiTimer;

    class Movement extends Phaser.Scene {
        constructor(scene) {
            super(scene)
            this.scene = scene
            this.hpText;
            this.xyText;
        }
    preload()
    {
        this.scene.load.image('ship', 'assets/playership-1.png.png');
        this.scene.load.image('beam', 'assets/sprite.png');
        this.scene.load.image('star', 'assets/star.png')
    }

    create()
    {
        cursors = this.scene.input.keyboard.createCursorKeys();
        keys = this.scene.input.keyboard.addKeys('A, D, W, S');
        space = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        star = this.scene.add.particles(0, 0, 'star', {speed: 100,
            lifespan: 800,
            scale: 1,
            gravityY: 0})
        player = new Player(this.scene, 64, 64);
        star.startFollow(player);
        this.hpText = this.scene.add.text(400, 0, "HP: " + player.hp, {fontSize: '48px', fill:"#ffffff" })
        this.xyText = this.scene.add.text(325, 50, "X: " + Math.floor(player.body.x) + ", Y: " + Math.floor(player.body.y), {fontSize: '48px', fill:"#ffffff" })


    }

    update()
    {

        this.hpText.destroy();
        this.xyText.destroy();

        this.hpText = this.scene.add.text(0, 50, "HP: " + player.hp, {fontSize: '48px', fill:"#ffffff" })
        this.xyText = this.scene.add.text(0, 0, "X: " + Math.floor(player.body.x) + ", Y: " + -Math.floor(player.body.y), {fontSize: '48px', fill:"#ffffff" })
        this.hpText.scrollFactorX = 0
        this.hpText.scrollFactorY = 0
        this.xyText.scrollFactorX = 0
        this.xyText.scrollFactorY = 0


        //Handle player movements
        if (cursors.left.isDown || keys.A.isDown) {
            player.setAccelerationX(-accel);
        } 
        if (cursors.right.isDown || keys.D.isDown) {
            player.setAccelerationX(accel);
        } 
        
        if (cursors.up.isDown || keys.W.isDown) {
            player.setAccelerationY(-accel);
        } 
        
        if (cursors.down.isDown || keys.S.isDown) {
            player.setAccelerationY(accel);
        } 

        if (space.isDown) {
            player.setAccelerationX(0);
            player.setAccelerationY(0);
            player.body.velocity.x *= 0.95
            player.body.velocity.y *= 0.95
            player.damage(1)
        }
        
        // max speed movement
        if (player.body.velocity.x >= maxSpeed) {
            player.setVelocityX(maxSpeed)
        }
        if (player.body.velocity.y >= maxSpeed) {
            player.setVelocityY(maxSpeed)
        }
        if (player.body.velocity.x <= -maxSpeed) {
            player.setVelocityX(-maxSpeed)
        }
        if (player.body.velocity.y <= -maxSpeed) {
            player.setVelocityY(-maxSpeed)
        }
        
        player.setRotation(Math.atan2(player.body.velocity.y, player.body.velocity.x) + Math.PI/2);
    }    
    }



