import { Scene } from 'phaser';

export class GameBTutor extends Scene
{

    constructor ()
    {
        super('GameB-Tutor');
        
        this.language = 0;
    }

    init (data)
    {
        if (data != null)
            this.language = data.language;
        console.log('[GameBTutor] init -> language: ' + this.language);
    }

    preload ()
    {        
        // preloaded in gameB
    }

    create (data)
    {
        console.log('GameB-tutor-start');

        this.gameEvents = this.scene.get('GameB').events;

        this.gameEvents.on('step-timesup', () => { this.ShowTimesUp(); });
        this.gameEvents.on('step-end', () => { this.HideTutor(); });
        for (let i = 1; i <= 6; i++)
        {
            this.gameEvents.on('step' + i + '-intro', ()=>{ this.ShowTutor(i, 'a'); });
            this.gameEvents.on('step' + i + '-intro2', ()=>{ this.ShowTutor(i, 'a-2'); });
            this.gameEvents.on('step' + i + '-correct', ()=>{ this.ShowTutor(i, 'c'); });
            this.gameEvents.on('step' + i + '-correct2', ()=>{ this.ShowTutor(i, 'c-2'); });
            this.gameEvents.on('step' + i + '-wrong', ()=>{ this.ShowTutor(i, 'b'); });
            this.gameEvents.on('step' + i + '-wrong2', ()=>{ this.ShowTutor(i, 'b-2'); });
        }
        
        this.tutor = this.add.image(500, 580);
        this.tutor.setScale(1.25);
        this.tutor.alpha = 0;
        this.isShown = false;
    }

    ShowTutor(index, action)
    { 
        // check if key exists
        //let key = 'tutor-a' + index + '-' + action;
        //key += (this.language === 0) ? '-cht' : '-eng';
        let key = index + action;
        console.log('ShowTutor:' + key);
        let img = (this.language === 0) ? 'B-tutor-cht' : 'B-tutor-eng';
        //if (!this.textures.exists(key))
        //    return;
        if (this.textures.getFrame(img, key) == null)
            return;

        this.tutor.setTexture(img, key);
        if (!this.isShown)
        {
            this.isShown = true;
            this.tweens.add({
                targets: this.tutor,
                alpha: 1,
                duration: 1000
            });
        }
    }

    ShowTimesUp()
    {
        //let key = 'tutor-timesup';
        //key += (this.language === 0) ? '-cht' : '-eng';
        let key = 'timesup';
        let img = (this.language === 0) ? 'B-tutor-cht' : 'B-tutor-eng';
        //if (!this.textures.exists(key))
        //    return;
        if (!this.textures.getFrame(img, key))
            return;

        this.tutor.setTexture(img, key);
    }

    HideTutor()
    {
        if (this.isShown)
        {
            this.tweens.add({
                targets: this.tutor,
                alpha: 0,
                duration: 1000,
                callbacks: () => {
                    this.isShown = false;
                }
            });
        }
    }
}
