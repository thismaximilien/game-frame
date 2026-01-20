import { Game as MainGame } from './scenes/Game';
import { AUTO, Game, Scale } from 'phaser';

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config: Phaser.Types.Core.GameConfig = {
    type: AUTO,
    parent: 'game-container',
    backgroundColor: '#ffffff',
    scale: {
        mode: Scale.FIT,
        autoCenter: Scale.CENTER_BOTH,
        width: 1024,
        height: 768
    },
    scene: [MainGame]
};

const StartGame = (parent: string) => {

    return new Game({ ...config, parent });

}

export default StartGame;
