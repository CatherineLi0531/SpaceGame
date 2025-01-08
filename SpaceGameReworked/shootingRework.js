        /*var config = {
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

        };*/


        var emenmy = [];

        //var ship;
        var accel = 1000;
        var maxSpeed = 700;
        var friendlyemits = [];
        var autonomousemits = [];
        var count = 0

        var playerBeams = [];


        //Keyboard controls
        var cursors;
        var keys;
        var space;
        var pointer;
        var shooting;
        var playercount;
        var frog;
        var angle;

        var gui;
        var guiTimer;
        


        class Emitter extends Phaser.Physics.Arcade.Sprite
        {
            // attributes:
            // friendly: is it linked to a player or an enemy?
            // rate: how many frames between attacks?
            // velocity: total velocity or resulting Beam
            constructor(parent, scene, x, y, vel, friendly, rate)
            {
                super(scene, x, y, null);
                scene.add.existing(this);
                scene.physics.add.existing(this);
                this.vel = vel;
                this.friendly = friendly;
                this.rate = rate
                this.blast;
                this.parent = parent;
            }

            rateGetter() {
                return this.rate
            }
            velocityGetter() {
                return this.vel
            }

            /*shoot(ex, ey, px, py, vel) {
                //console.log(ex + " " + ey + " " + px + " " + py + " ")
                if (px < ex) {
                    angle = (Math.PI) + Math.atan((py - ey)/(px - ex))
                } else {
                    angle = Math.atan((py - ey)/(px - ex))
                }
                console.log(Math.cos(angle))
                console.log(Math.sin(angle))
                console.log(angle)
                this.blast = new Beam(this.scene, ex, ey, vel * Math.cos(angle), vel * Math.sin(angle), this.type)
                console.log(px + "  " + py)        
            }*/
            playerShoot(ex, ey, tx, ty, vel) {
            if (playercount % this.rate === 0) {
                if (tx < ex) {
                    angle = (Math.PI) + Math.atan((ty - ey)/(tx - ex))
                } else {
                    angle = Math.atan((ty - ey)/(tx - ex))
                }
                //calcs angle between emitter and cursor
                this.blast = new Beam(this.scene, ex, ey, vel * Math.cos(angle), vel * Math.sin(angle), this.type, 'green', 3)       
                playerBeams.push(this.blast); 
                }

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
            this.blast = new Beam(this.scene, ex, ey, vel * Math.cos(angle), vel * Math.sin(angle), this.type, 'red', 3)       
                enemyBeams.push(this.blast)}

            }

            

        class Beam extends Phaser.Physics.Arcade.Sprite
        {
            
            constructor(scene, x, y, vx, vy, type, sprite, scale)
            {
                super(scene, x, y, sprite)
                scene.add.existing(this);
                scene.physics.add.existing(this);
                this.setScale(scale);
                this.setCollideWorldBounds(false);
                this.setVelocityX(vx);
                this.setVelocityY(vy);
                if (this.type === 0) {
                    this.friendly = true
                }
                this.lifespan = 10;
                this.setRotation(Math.atan2(this.body.velocity.y, this.body.velocity.x) + Math.PI/2);
            }

            
        }

        //var game = new Phaser.Game(config);
class EmitterShooter extends Phaser.Scene {


        constructor(scene) {
            super(scene)
            this.scene = scene
            this.emitter;
            this.obj;
        }

        preload ()
        {
            this.scene.load.image('green', 'assets/green.png');
            this.scene.load.image('red', 'assets/red.png');
            
            keys = this.scene.input.keyboard.addKeys('W, A, S, D');
            pointer = this.scene.input.mousePointer;

        }

        create () 
        {
            this.spawnEmitter(null, this.scene, player.body.x, player.body.y, 1000, true, 10);
            this.spawnEmitter("Enemy1", this.scene, player.body.x, player.body.y, 2000, true, 2);  //player



        }

        update ()
        {
            
            count += 1;
            playercount += 1;
            for (let i in autonomousemits) {
                this.obj = autonomousemits[i];
                if ((count % this.obj.rateGetter() )=== 0) {
                    this.obj.autoShoot(this.obj.body.x, this.obj.body.y, player.x, player.y, this.obj.velocityGetter())
                }

            }
            if (shooting === true) {
            for (let i in friendlyemits) {
                frog = friendlyemits[i]
                //frog = FRiendly Object 
                frog.playerShoot(frog.x, frog.y, pointer.x+this.scene.cameras.main.scrollX, pointer.y+this.scene.cameras.main.scrollY, frog.vel)
                // always shooting at the pointer
                frog.body.x = player.body.x+30;
                frog.body.y = player.body.y+30;
            }
       

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
        }
    }

        spawnEmitter(parent, scene, x, y, vel, friendly, rate) {
            this.emitter = new Emitter(parent, scene, x, y, vel, friendly, rate);
            this.emitter.setVisible(false);
            if (friendly === true) {
                friendlyemits.push(this.emitter);
                scene.input.on("pointerdown", (pointer) => { 
shooting = true; playercount = 0 } , scene);
            scene.input.on("pointerup", pointer => { 
shooting = false } , scene); //if mouse is down, shooting is true, count timer reset; if mouse is up, shooting is false, no shooting occurs
            console.log(x + " " + y + " " + pointer.x + " " + pointer.y)
            } else if (friendly === false) {
                autonomousemits[parent] = this.emitter;   
                //console.log(autonomousemits)   
                return 
            }
            return false
        }
}


