import * as Phaser from 'phaser';

import { GameA } from './gameA.js';
import { GameAUI } from './gameAUI.js';
import { GameATutor } from './gameATutor.js';
import { GameB } from './gameB.js';
import { GameBUI } from './gameBUI.js';
import { GameBTutor } from './gameBTutor.js';
import { Main } from './game.js';


const config = {
    type: Phaser.AUTO,
    width: 1920,
    height: 1080,
    scale: { 
        mode: Phaser.Scale.FIT,
        //min: { width: 800, height: 450 },
        max: { width: 2560, height: 1440 },
        zoom: 1
    },
    backgroundColor: '#000000',
    parent: 'game-container',
    scene: [ Main, GameA, GameAUI, GameATutor, GameB, GameBUI, GameBTutor]
    //scene: [  GameA]
};

const game = new Phaser.Game(config);