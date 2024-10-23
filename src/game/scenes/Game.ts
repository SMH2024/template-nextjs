import { EventBus } from '../EventBus';
import { Scene } from 'phaser';

export class Game extends Scene
{
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    gameText: Phaser.GameObjects.Text;
    boxer: Phaser.Physics.Arcade.Sprite;
    cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    jabRightKey: Phaser.Input.Keyboard.Key;
    jabLeftKey: Phaser.Input.Keyboard.Key;
    uppercutKey: Phaser.Input.Keyboard.Key;
    blockKey: Phaser.Input.Keyboard.Key;

    constructor ()
    {
        super('Game');
    }

    create ()
    {
        this.camera = this.cameras.main;
        this.camera.setBackgroundColor(0x00ff00);

        this.background = this.add.image(512, 384, 'background');
        this.background.setAlpha(0.5);

        this.gameText = this.add.text(512, 384, 'Make something fun!\nand share it with us:\nsupport@phaser.io', {
            fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5).setDepth(100);

        // Add boxer sprite
        this.boxer = this.physics.add.sprite(400, 300, 'boxerIdle');

        // Create animations
        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('boxerIdle', { start: 0, end: 9 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'forward',
            frames: this.anims.generateFrameNumbers('boxerForward', { start: 0, end: 9 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'backward',
            frames: this.anims.generateFrameNumbers('boxerBackward', { start: 0, end: 9 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'jabRight',
            frames: this.anims.generateFrameNumbers('boxerJabRight', { start: 0, end: 7 }),
            frameRate: 10,
            repeat: 0
        });

        this.anims.create({
            key: 'jabLeft',
            frames: this.anims.generateFrameNumbers('boxerJabLeft', { start: 0, end: 7 }),
            frameRate: 10,
            repeat: 0
        });

        this.anims.create({
            key: 'uppercut',
            frames: this.anims.generateFrameNumbers('uppercut', { start: 0, end: 7 }),
            frameRate: 10,
            repeat: 0
        });

        this.anims.create({
            key: 'block',
            frames: this.anims.generateFrameNumbers('block', { start: 0, end: 7 }),
            frameRate: 10,
            repeat: 0
        });

        // Set up controls
        this.cursors = this.input.keyboard!.createCursorKeys();
        this.jabRightKey = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.jabLeftKey = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.uppercutKey = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.blockKey = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.S);

        EventBus.emit('current-scene-ready', this);
    }

    update ()
    {
        if (this.boxer) {
            if (this.cursors.left!.isDown)
            {
                this.boxer!.setVelocityX(-160);
                this.boxer!.anims.play('backward', true);
            }
            else if (this.cursors.right!.isDown)
            {
                this.boxer!.setVelocityX(160);
                this.boxer!.anims.play('forward', true);
            }
            else
            {
                this.boxer!.setVelocityX(0);
                this.boxer!.anims.play('idle', true);
            }

            if (Phaser.Input.Keyboard.JustDown(this.jabRightKey))
            {
                this.boxer!.anims.play('jabRight', true);
            }

            if (Phaser.Input.Keyboard.JustDown(this.jabLeftKey))
            {
                this.boxer!.anims.play('jabLeft', true);
            }

            if (Phaser.Input.Keyboard.JustDown(this.uppercutKey))
            {
                this.boxer!.anims.play('uppercut', true);
            }

            if (Phaser.Input.Keyboard.JustDown(this.blockKey))
            {
                this.boxer!.anims.play('block', true);
            }
        }
    }

    changeScene ()
    {
        this.scene.start('GameOver');
    }
}
