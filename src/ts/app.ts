/// <reference path="../libs/typescript/phaser.d.ts" />

module Game {
    export class ExtrimeWalking {
        game:Phaser.Game;

        private hero:any;
        private background:any;


        constructor() {
            this.game = new Phaser.Game(500, 400, Phaser.AUTO, 'my-game', {
                preload: this.preload,
                create: this.create,
                update: this.update,
                render: this.render
            });
        }

        preload() {
            this.background = this.game.load.image('background', '/img/background.png');
            this.game.load.atlasJSONHash('hero', '/sprite/hero/hero.png', '/sprite/hero/hero.json');
        }

        create() {
            var h = this.hero = this.game.add.sprite(100, 180, 'hero');

            h.animations.add('run', Phaser.Animation.generateFrameNames('hero/', 1, 21, '', 2), 10, true, false);
            h.animations.play('run');

            h.anchor.set(0.5, 0.5);
            h.scale.setTo(1, 1);
        }

        update() {
            var h = this.hero;

            if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
                h.x -= 4;
                if(h.scale.x < 0){
                    h.scale.x *= -1;
                }
            } else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
                h.x += 4;
                if(h.scale.x > 0){
                    h.scale.x *= -1;
                }
            }

            if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
                h.y -= 4;
            } else if (this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
                h.y += 4;
            }
        }

        render() {
            this.game.debug.spriteInfo(this.hero, 20, 32);
        }
    }
}


window.onload = () => {
    var game = new Game.ExtrimeWalking();
};