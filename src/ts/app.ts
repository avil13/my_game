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
            } // <== go fullscreen on mobile devices
            this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            // === phisix ===
            this.game.physics.startSystem(Phaser.Physics.NINJA);
            
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