/// <reference path="../libs/typescript/phaser.d.ts" />

module Game {
    export class ExtrimeWalking {
        game:Phaser.Game;

        private hero:any;
        private background:any;


        constructor() {
            this.game = new Phaser.Game(600, 400, Phaser.AUTO, 'my-game', {
                preload: this.preload,
                create: this.create,
                update: this.update,
                render: this.render
            });
        }

        preload() {
            this.background = this.game.load.image('background', '/img/background.png');
            new Hero.WhiteHero(this.game);
        }

        create() {
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