import * as Phaser  from 'phaser';

export class LocalizedImage extends Phaser.GameObjects.Container 
{
    constructor(scene, x, y, key1, key2) 
    {
        super(scene);

        this.scene = scene;
        this.setPosition(x, y);

        const image1 = this.scene.add.image(0, 0, key1);
        const image2 = this.scene.add.image(0, 0, key2);
        this.add(image1);
        this.add(image2);

        this.imageList = [];
        this.imageList.push(image1);
        this.imageList.push(image2);

        this.scene.add.existing(this);

        this.SetLocalization(0);
    }

    SetLocalization(localization)
    {
        if (localization >= this.imageList.length)
            return;

        this.imageList.forEach((image, index)=>{
            image.setVisible(index === localization);            
        })
    }
}