// Exercise 02: RNGolf
// Name:
// Date:

'use strict'

let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 960,
    scene: [ Play ],
    physics:{
        default:"arcade",
        arcade:{
            debug:false
        }
    }
}

let game = new Phaser.Game(config)
let shotsTaken = 0, holeIn = 0

let { width, height } = game.config