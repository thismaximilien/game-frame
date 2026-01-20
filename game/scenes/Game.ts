import Phaser from 'phaser';
import { EventBus } from '../EventBus';

export class Game extends Phaser.Scene
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

        EventBus.emit('current-scene-ready', this);
    }
}
