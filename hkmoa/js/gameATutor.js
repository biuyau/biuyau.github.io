import { Scene } from 'phaser';

export class GameATutor extends Scene
{

    constructor ()
    {
        super('GameA-Tutor');
        
        this.language = 0;
    }

    init (data)
    {
        if (data != null)
            this.language = data.language;
        console.log('[GameATutor] init -> language: ' + this.language);
    }

    preload ()
    {        
        /*
        // cht
        this.load.image('tutor-timesup-cht', 'assets/image/A/tutor/cht/timeout.png');
        this.load.image('tutor-a1-intro-cht', 'assets/image/A/tutor/cht/1a.png');
        this.load.image('tutor-a1-correct-cht', 'assets/image/A/tutor/cht/1c.png');
        this.load.image('tutor-a1-wrong-cht', 'assets/image/A/tutor/cht/1b.png');

        this.load.image('tutor-a2-intro-cht', 'assets/image/A/tutor/cht/2a-1.png');
        this.load.image('tutor-a2-intro2-cht', 'assets/image/A/tutor/cht/2a-2.png');
        this.load.image('tutor-a2-correct-cht', 'assets/image/A/tutor/cht/2c.png');
        this.load.image('tutor-a2-wrong-cht', 'assets/image/A/tutor/cht/2b.png');

        this.load.image('tutor-a3-intro-cht', 'assets/image/A/tutor/cht/3a-1.png');
        this.load.image('tutor-a3-intro2-cht', 'assets/image/A/tutor/cht/3a-2.png');
        this.load.image('tutor-a3-correct-cht', 'assets/image/A/tutor/cht/3c.png');

        this.load.image('tutor-a4-intro-cht', 'assets/image/A/tutor/cht/4a.png');
        this.load.image('tutor-a4-correct-cht', 'assets/image/A/tutor/cht/4c-1.png');
        this.load.image('tutor-a4-correct2-cht', 'assets/image/A/tutor/cht/4c-2.png');

        this.load.image('tutor-a5-intro-cht', 'assets/image/A/tutor/cht/5a-1.png');
        this.load.image('tutor-a5-intro2-cht', 'assets/image/A/tutor/cht/5a-2.png');
        this.load.image('tutor-a5-correct-cht', 'assets/image/A/tutor/cht/5c.png');

        this.load.image('tutor-a6-intro-cht', 'assets/image/A/tutor/cht/6a-1.png');
        this.load.image('tutor-a6-intro2-cht', 'assets/image/A/tutor/cht/6a-2.png');
        this.load.image('tutor-a6-correct-cht', 'assets/image/A/tutor/cht/6c.png');
        this.load.image('tutor-a6-wrong-cht', 'assets/image/A/tutor/cht/6b.png');

        // eng
        this.load.image('tutor-timesup-eng', 'assets/image/A/tutor/eng/timeout.png');
        this.load.image('tutor-a1-intro-eng', 'assets/image/A/tutor/eng/1a.png');
        this.load.image('tutor-a1-correct-eng', 'assets/image/A/tutor/eng/1c.png');
        this.load.image('tutor-a1-wrong-eng', 'assets/image/A/tutor/eng/1b.png');

        this.load.image('tutor-a2-intro-eng', 'assets/image/A/tutor/eng/2a-1.png');
        this.load.image('tutor-a2-intro2-eng', 'assets/image/A/tutor/eng/2a-2.png');
        this.load.image('tutor-a2-correct-eng', 'assets/image/A/tutor/eng/2c.png');
        this.load.image('tutor-a2-wrong-eng', 'assets/image/A/tutor/eng/2b.png');

        this.load.image('tutor-a3-intro-eng', 'assets/image/A/tutor/eng/3a-1.png');
        this.load.image('tutor-a3-intro2-eng', 'assets/image/A/tutor/eng/3a-2.png');
        this.load.image('tutor-a3-correct-eng', 'assets/image/A/tutor/eng/3c.png');

        this.load.image('tutor-a4-intro-eng', 'assets/image/A/tutor/eng/4a.png');
        this.load.image('tutor-a4-correct-eng', 'assets/image/A/tutor/eng/4c-1.png');
        this.load.image('tutor-a4-correct2-eng', 'assets/image/A/tutor/eng/4c-2.png');

        this.load.image('tutor-a5-intro-eng', 'assets/image/A/tutor/eng/5a-1.png');
        this.load.image('tutor-a5-intro2-eng', 'assets/image/A/tutor/eng/5a-2.png');
        this.load.image('tutor-a5-correct-eng', 'assets/image/A/tutor/eng/5c.png');

        this.load.image('tutor-a6-intro-eng', 'assets/image/A/tutor/eng/6a-1.png');
        this.load.image('tutor-a6-intro2-eng', 'assets/image/A/tutor/eng/6a-2.png');
        this.load.image('tutor-a6-correct-eng', 'assets/image/A/tutor/eng/6c.png');
        this.load.image('tutor-a6-wrong-eng', 'assets/image/A/tutor/eng/6b.png');
        */
    }

    create (data)
    {
        console.log('GameA-tutor-start');

        this.gameEvents = this.scene.get('GameA').events;

        this.gameEvents.on('step-timesup', () => { this.ShowTimesUp(); });
        this.gameEvents.on('step-end', () => { this.HideTutor(); });
        for (let i = 1; i <= 6; i++)
        {
            this.gameEvents.on('step' + i + '-intro', ()=>{ this.ShowTutor(i, 'intro'); });
            this.gameEvents.on('step' + i + '-intro2', ()=>{ this.ShowTutor(i, 'intro2'); });
            this.gameEvents.on('step' + i + '-correct', ()=>{ this.ShowTutor(i, 'correct'); });
            this.gameEvents.on('step' + i + '-correct2', ()=>{ this.ShowTutor(i, 'correct2'); });
            this.gameEvents.on('step' + i + '-wrong', ()=>{ this.ShowTutor(i, 'wrong'); });
            this.gameEvents.on('step' + i + '-wrong2', ()=>{ this.ShowTutor(i, 'wrong2'); });
        }
        
        this.tutor = this.add.image(500, 580, 'tutor-timesup-cht');
        this.tutor.alpha = 0;
        this.isShown = false;
    }

    ShowTutor(index, action)
    { 
        // check if key exists
        let key = 'tutor-a' + index + '-' + action;
        key += (this.language === 0) ? '-cht' : '-eng';
        console.log('ShowTutor:' + key);
        if (!this.textures.exists(key))
            return;

        this.tutor.setTexture(key);
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
        let key = 'tutor-timesup';
        key += (this.language === 0) ? '-cht' : '-eng';
        if (!this.textures.exists(key))
            return;

        this.tutor.setTexture(key);
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
