/// <reference path="../libs/typescript/phaser.d.ts" />

module Game {
    export class ExtrimeWalking {
        game: Phaser.Game;

        constructor(){
            this.game =new Phaser.Game(800, 600, Phaser.AUTO, 'my-game', {
               create: this.create,
                preload: this.preload,
                update: this.update
            });
        }

        create(){}

        preload(){}

        update(){}
    }
}


window.onload = () => {
    var game = new Game.ExtrimeWalking();
};