    var config = {
        type: Phaser.AUTO,
        width: 1024,
        height: 768,
        physics: {
            default: 'arcade',
        },

        scene: {
            preload: preload,
            create: create,
            update: update,
        }

    };

    class Emitter extends Phaser.Physics.Arcade.Sprite
    {
        // attributes:
        // friendly: is it linked to a player or an enemy? does it attack autonomously or only while holding?
        // rate: how many frames between attacks?
        // velocity: total velocity of resulting Beam
        constructor(scene, x, y, vel, friendly, rate)
        {
            super(scene, x, y, null);
            scene.add.existing(this);
            scene.physics.add.existing(this);
            this.vel = vel;
            this.friendly = friendly;
            this.rate = rate
        } //constructs a thing

        rateGetter() {
            return this.rate
        }
        velocityGetter() {
            return this.vel
        }

        playerShoot(ex, ey, tx, ty, vel) {
            if (playercount % this.rate === 0) {
            if (tx < ex) {
                angle = (Math.PI) + Math.atan((ty - ey)/(tx - ex))
            } else {
                angle = Math.atan((ty - ey)/(tx - ex))
            }
            //calcs angle between emitter and cursor
            this.blast = new Beam(this.scene, ex, ey, vel * Math.cos(angle), vel * Math.sin(angle), this.type)       }
            }
            //

        autoShoot(ex, ey, tx, ty, vel) {
            //ex, ey: emitter x, emitter y
            //tx, ty: target x, target y
            //vel: velocity
            if (tx < ex) {
                angle = (Math.PI) + Math.atan((ty - ey)/(tx - ex))
            } else {
                angle = Math.atan((ty - ey)/(tx - ex))
            }
            //calcs angle between emitter and cursor
            this.blast = new Beam(this.scene, ex, ey, vel * Math.cos(angle), vel * Math.sin(angle), this.type)       }
            //



    }
    
    class Beam extends Phaser.Physics.Arcade.Sprite
    {
        //the actual projectile object
        //vx, vy: x-velocity, y-velocity
        //type: to be changed. should just be friendly/unfriendly
        constructor(scene, x, y, vx, vy, type)
        {
            super(scene, x, y, 'beam')
            scene.add.existing(this);
            scene.physics.add.existing(this);
            this.setScale(1);
            this.setCollideWorldBounds(false);
            this.setVelocityX(vx);
            this.setVelocityY(vy);
            if (this.type === 0) {
                this.friendly = true
            }
            console.log("beam created  " + this.body.velocity)
            console.log(vx + "   " + vy)
        }

        
    }



    var game = new Phaser.Game(config);
    //Game Objects
    var platforms
    var player;
    var friendlyemits = [];
    // array of all emitters that use player input
    var autonomousemits = [];
    // array of all emitters that don't use player input
    var count = 0
    // amount of frames since the scene was loaded
    var playercount = 0
    // amount of frames since a click has occured
    var shooting = false
    // are you shooting right now or not

    //Keyboard controls
    var cursors;
    var keys;
    var space;
    var pointer;
    var angle;

    var gui;
    var guiTimer;

    function preload()
    {

    }

    function create()
    {
        cursors = this.input.keyboard.createCursorKeys();
        keys = this.input.keyboard.addKeys('A, D, W, S');
        space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        pointer = this.input.activePointer;
        //cursor and keys and pointer
        spawnEmitter(this, 400, 400, 500, true, 10);
        spawnEmitter(this, 1600, 400, 1200, true, 3);
        spawnEmitter(this, 1000, 1000, 2000, false, 30);
        //spawns three test emitters, feel free to take this out
    }

    function update()
    {
        count += 1;
        playercount += 1;
        //count is the number of frames since the program started
        //playercount is the number of frames since the player has clicked; resets after every click
        for (let i in autonomousemits) {
            obj = autonomousemits[i]
            if ((count % obj.rateGetter() )=== 0) {
                obj.autoShoot(obj.body.x, obj.body.y, pointer.x, pointer.y, obj.velocityGetter())
                //autonomous emitters always shoot at your curse. sorry about that. once we get some rudimentary enemy ai working switch this to player.x and player.y
            }
        }
        if (shooting === true) {
            for (let i in friendlyemits) {
                frog = friendlyemits[i]
                //frog = FRiendly Object 
                frog.playerShoot(frog.x, frog.y, pointer.x, pointer.y, frog.vel)
                // always shooting at the pointer
            }
       
        }





    }

    function spawnEmitter(scene, x, y, vel, friendly, rate) {
        emitter = new Emitter(scene, x, y, vel, friendly, rate);
        if (friendly === true) {
            friendlyemits.push(emitter);
            scene.input.on("pointerdown", function(pointer) { 
shooting = true; playercount = 0 } , scene);
            scene.input.on("pointerup", function(pointer) { 
shooting = false } , scene); //if mouse is down, shooting is true, count timer reset; if mouse is up, shooting is false, no shooting occurs
            console.log(x + " " + y + " " + pointer.x + " " + pointer.y)
        } else if (friendly === false) {
            autonomousemits.push(emitter)      
        }
        return false
    }
