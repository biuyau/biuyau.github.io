import * as Phaser  from 'phaser';

export class RevealImage extends Phaser.GameObjects.GameObject 
{
    constructor(scene, x, y, guideKey, revealKey, brushKey, brushSize, points, threshold, onChange) 
    {
        super(scene);

        this.scene = scene;
        this.x = x;
        this.y = y;
        //this.setPosition(x, y);

        // guideline underlaid
		this.guideline = this.scene.add.image(x, y, guideKey);
        // image to be revealed
		this.reveal = this.scene.add.image(x, y, revealKey);
        // full revealed image
        this.complete = this.scene.add.image(x, y, revealKey);
        this.complete.setVisible(false);
        this.complete.alpha = 0;
        //this.add([guideline, reveal, this.complete]);
        this.scene.add.existing(this);

        const width = this.reveal.width;
        const height = this.reveal.height;
        //this.setSize(width, height);

		const renderTexture = this.scene.make.renderTexture({x: x, y: y, width: width, height: height, add: false});

        /*
		const maskImage = this.scene.make.image({
			x: x,
			y: y,
			key: renderTexture.texture.key,
			add: true
		});        
        */
		const brush = this.scene.make.image({
			key: brushKey,
			add: false
		});
        brush.setScale(brushSize / brush.width);

		this.reveal.mask = new Phaser.Display.Masks.BitmapMask(this.scene, renderTexture);
        //reveal.mask = renderTexture.createBitmapMask();
        //reveal.mask.invertAlpha = true;

        this.progress = 0;
        var hit = 0;
        var total = points.length;

		//this.reveal.setInteractive();
		this.reveal.on('pointermove', (pointer) => {
            
            if (pointer.isDown)
            {
                //console.log(pointer.x + ', ' + pointer.y);
                const _x = pointer.x - x;
                const _y = pointer.y - y;
                renderTexture.draw(brush, _x + width * 0.5, _y + height * 0.5);
                
                //console.log(_x + ', ' + _y);
                // check and update progress
                for (let i = points.length - 1; i >= 0; i--)
                {
                    if (Phaser.Math.Distance.Between(points[i].x, points[i].y, _x, _y) < threshold)
                    {
                        hit++;
                        this.progress = hit / total;
                        onChange(this.progress);
                        points.splice(i, 1);
                    }
                }
            }
        });

        //this.setVisible(false);
        this.guideline.alpha = 0;
        this.reveal.alpha = 0;
	}

    Start()
    {
        this.reveal.setInteractive();
        //this.setVisible(true);
        this.scene.tweens.add({
            targets: [ this.guideline, this.reveal],
            alpha: 1,
            duration: 500
        });
    }

    Complete()
    {
        //this.setVisible(true);
        //this.alpha = 1;
        this.scene.tweens.add({
            targets: this.reveal,
            alpha: 0,
            duration:1000
        });

        this.complete.setVisible(true);
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
    }
}