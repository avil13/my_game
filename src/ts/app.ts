/// <reference path="../libs/typescript/phaser.d.ts" />

module Game {
    export class ExtrimeWalking {
        game:Phaser.Game;

        private hero: Phaser.Sprite;
        // private background: Phaser.Game;
        private ground: Phaser.Sprite;
        private clouds: any;


        constructor() {
            this.game = new Phaser.Game(800, 600, Phaser.AUTO, 'my-game', {
                preload: this.preload,
                create: this.create,
                update: this.update,
                render: this.render
            });
        }

        preload() {
            // this.background = this.game.load.image('background', '/img/background.png');
            this.game.load.image('ground', '/img/2048x48-ground.png');
            new Hero.WhiteHero(this.game);
        }

        create() {
            var gofull = function () {
                this.game.scale.startFullScreen(false);
            }
            if (!this.game.device.desktop) {
                this.game.input.onDown.add(gofull, this);
            } //go fullscreen on mobile devices

            this.game.physics.startSystem(Phaser.Physics.P2JS); //activate physics
            this.game.physics.p2.gravity.y = 1200; //realistic gravity
            this.game.world.setBounds(0, 0, 2000, 600); //(x, y, width, height)
            this.game.physics.p2.setBoundsToWorld(true, true, false, true, false); //(left, right, top, bottom, setCollisionGroup)
            this.game.physics.p2.friction = 5; // default friction between ground and player or fireballs

            // this.clouds = this.game.add.tileSprite(0, 0, 2048, 600, 'clouds'); //add tiling sprite to cover the whole this.game world
            this.ground = this.game.add.sprite(this.game.world.width / 2, this.game.world.height - 24, 'ground');
            this.game.physics.p2.enable(this.ground); //enable physics so our player will not fall through ground but collide with it
            this.ground.body.static = true; // ground should not move
            this.game.physics.p2.friction = 5; // default friction between ground and player or fireballs

            this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

            // personages:
            this.hero = Hero.WhiteHero.create(this.game);
        }

        update() {
            Hero.WhiteHero.update(this.game);
        }

        render() {
            this.game.debug.spriteInfo(this.hero, 20, 32);
        }
    }
}


window.onload = () => {
    var game = new Game.ExtrimeWalking();
};