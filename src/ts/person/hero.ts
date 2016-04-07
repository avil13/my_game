/// <reference path="../../libs/typescript/phaser.d.ts" />

module Hero {
    export class WhiteHero {
        private static hero: any;
        private game: Phaser.Game;

        // preload
        constructor(game: Phaser.Game) {
            this.game = game;
            this.game.load.atlasJSONHash('hero', '/sprite/hero/hero.png', '/sprite/hero/hero.json');
            return this;
        }

        // create
        static create(game: Phaser.Game) {
            //create and position player
            var h = WhiteHero.hero = game.add.sprite(350, game.world.centerY, 'hero');

            h.name = 'WhiteHero';
            // game.physics.p2.enable(h);
            // h.body.setCircle(22); // collision circle
            // h.body.fixedRotation = true; // do not rotate on collision
            // h.body.mass = 4;


            game.camera.follow(h);

            h.animations.add('all', Phaser.Animation.generateFrameNames('hero/', 1, 21, '', 2), 1, true, false);
            h.animations.add('wait', Phaser.Animation.generateFrameNames('hero/', 1, 5, '', 2), 1, true, false);
            h.animations.add('jump', Phaser.Animation.generateFrameNames('hero/', 6, 10, '', 2), 1, true, false);
            h.animations.add('run', Phaser.Animation.generateFrameNames('hero/', 11, 16, '', 2), 1, true, false);
            h.animations.add('hit', Phaser.Animation.generateFrameNames('hero/', 17, 21, '', 2), 1, true, false);



            // h.animations.play('hit', 10);


            h.anchor.set(0.5, 0.5);
            h.scale.setTo(1, 1);

            return WhiteHero.hero;
        }

        static update(game: Phaser.Game) {
            var h = WhiteHero.hero;
            var speed = 8;

            h.animations.play('wait', speed);

            game.input.keyboard.onUpCallback = (e)=>{
            };

            if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
                h.scale.x = 1;
                h.body.moveLeft(500);
                h.animations.play('run', speed);
            } else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
                h.scale.x = -1;
                h.body.moveRight(500);
                h.animations.play('run', speed);
            }

            // if (game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
            //     h.y -= 4;
            // } else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
            //     h.y += 4;
            // }
            var nextJump = 0;
            if (game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
                if (game.time.now > nextJump ){
                    WhiteHero.hero.body.moveUp(600);
                    nextJump = game.time.now + 900;
                }
            }
        }

        static get() {
            return WhiteHero.hero;
        }
    }
}