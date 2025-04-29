import * as Phaser  from 'phaser';

export class RevealImage extends Phaser.GameObjects.GameObject 
{
    constructor(scene, x, y, imgKey, guideKey, revealKey, brushSize, points, threshold, onChange) 
    {
        super(scene);

        this.scene = scene;
        this.x = x;
        this.y = y;
        //this.setPosition(x, y);
        this.refPoints = points;
        this.threshold = threshold;
        this.onProgressChanged = onChange;

        // guideline underlaid
		this.guideline = this.scene.add.image(x, y, imgKey,guideKey);
        // image to be revealed
		this.reveal = this.scene.add.image(x, y, imgKey,revealKey);
        // full revealed image
        this.complete = this.scene.add.image(x, y, imgKey,revealKey);
        this.complete.alpha = 0;
        //this.add([guideline, reveal, this.complete]);
        this.scene.add.existing(this);

        this.width = this.reveal.width;
        this.height = this.reveal.height;

		this.brush = this.scene.make.image({
			key: 'common',
            frame: 'brush',
			add: false
		});
        this.brush.setScale(brushSize / this.brush.width);

		this.renderTexture = this.scene.make.renderTexture({x: x, y: y, width: this.width, height: this.height, add: false});
		this.reveal.mask = new Phaser.Display.Masks.BitmapMask(this.scene, this.renderTexture);

        this.Reset();
	}

    Reset()
    {
        this.guideline.alpha = 0;
        this.reveal.alpha = 0;
        this.complete.alpha = 0;
        this.progress = 0;
        this.renderTexture.clear();

        var hit = 0;
        var total = this.refPoints.length;
        var points = Array.from(this.refPoints);

        this.reveal.off('pointermove');
		this.reveal.on('pointermove', (pointer) => {
            
            if (pointer.isDown)
            {
                //console.log(pointer.x + ', ' + pointer.y);
                const _x = pointer.x - this.x;
                const _y = pointer.y - this.y;
                this.renderTexture.draw(this.brush, _x + this.width * 0.5, _y + this.height * 0.5);                
                //console.log(_x + ', ' + _y);

                // check and update progress
                for (let i = points.length - 1; i >= 0; i--)
                {
                    if (Phaser.Math.Distance.Between(points[i].x, points[i].y, _x, _y) < this.threshold)
                    {
                        hit++;
                        this.progress = hit / total;
                        this.onProgressChanged(this.progress);
                        points.splice(i, 1);
                    }
                }
            }
        });

    }

    Start()
    {
        this.reveal.setInteractive();
        //this.setVisible(true);
        this.scene.tweens.add({
            targets: [ this.guideline, this.reveal],
            alpha: {from: 0, to: 1},
            duration: 500
        });
    }

    Complete()
    {
        this.guideline.alpha = 0;
        this.reveal.off('pointermove');
        //this.setVisible(true);
        //this.alpha = 1;
        this.scene.tweens.add({
            targets: this.reveal,
            alpha: 0,
            duration:1000
        });

        this.complete.alpha = 0;
        this.scene.tweens.add({
            targets: this.complete,
            alpha: 1,
            duration:1000
        });
    }

    destroy()
    {
        super.destroy();

        this.guideline.destroy();
        this.reveal.destroy();
        this.complete.destroy();
        this.renderTexture.destroy();

    }
}