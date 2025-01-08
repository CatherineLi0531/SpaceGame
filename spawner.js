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

    class Spawner extends Phaser.Physics.Arcade.Sprite
    {

        constructor(scene, x, y, max, obj, rad)
        {
            super(scene, x, y, null);
            scene.add.existing(this);
            scene.physics.add.existing(this);
            this.max = max
            this.spawned = [];
            this.object = obj;
            this.radius = rad;
        }

        spawn(){
            if (this.object === "asteroid") {
                let albert = new Asteroid(this.scene, this.x + Phaser.Math.Between(-1*this.radius, this.radius), this.y + Phaser.Math.Between(-1*this.radius, this.radius))
                this.spawned.push(albert)
            }
        }

        populate() {
            for (let i = 0; i < this.max; i++) {
                this.spawn();
            }
        }

    }

    class Asteroid extends Phaser.Physics.Arcade.Sprite
    {
        constructor(scene,x,y) {
            super(scene, x, y, null);
            scene.add.existing(this);
            scene.physics.add.existing(this);
        }

    }



    var game = new Phaser.Game(config);
    //Game Objects

    //Keyboard controls

    var gui;
    var guiTimer;

    function preload()
    {

    }

    function create()
    {
        testSpawner = new Spawner(this, 400, 400, 10, "asteroid", 300)
        testSpawner.populate();
    }

    function update()
    {



    }