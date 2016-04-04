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
            var h = WhiteHero.hero = game.add.sprite(game.world.centerX, game.world.centerY, 'hero');

            // h.animations.add('run', Phaser.Animation.generateFrameNames('hero/', 1, 21, '', 2), 1, true, false);
            h.animations.add('run', Phaser.Animation.generateFrameNames('hero/', 11, 16, '', 2), 1, true, false);
            h.animations.play('run', 7);

            h.anchor.set(0.5, 0.5);
            h.scale.setTo(1, 1);

            return WhiteHero.hero;
        }

        static update(game: Phaser.Game) {
            var h = WhiteHero.hero;

            if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
                h.x -= 4;
                if(h.scale.x < 0){
                    h.scale.x *= -1;
                }
            } else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
                h.x += 4;
                if(h.scale.x > 0){
                    h.scale.x *= -1;
                }
            }

            if (game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
                h.y -= 4;
            } else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
                h.y += 4;
            }
        }

        static get() {
            return WhiteHero.hero;
        }
    }
}