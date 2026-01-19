import { EventBus } from '../EventBus';
import { Scene } from 'phaser';

export class Game extends Scene
{
    camera: Phaser.Cameras.Scene2D.Camera;
    gameText: Phaser.GameObjects.Text;

    constructor ()
    {
        super('Game');
    }

    create ()
    {
        this.camera = this.cameras.main;
        this.camera.setBackgroundColor(0xffffff);

        this.gameText = this.add.text(512, 384, 'Game Frame', {
            fontFamily: '"SF Pro Rounded"', fontSize: 38, color: '#000000',
            align: 'center'
        }).setOrigin(0.5).setDepth(100).setResolution(window.devicePixelRatio || 1);

        EventBus.emit('current-scene-ready', this);
    }
}
