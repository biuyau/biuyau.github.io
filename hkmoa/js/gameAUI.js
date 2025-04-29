import { Scene } from 'phaser';
//import { LocalizedImage } from './localizedImage.js';

export class GameAUI extends Scene
{

    constructor ()
    {
        super('GameA-UI');
        
        this.language = 0;
        this.stepAwardCount = 0;
    }

    init (data)
    {
        if (data != null)
        {
            this.language = data.language;
            this.reset = data.resetCallback;
        }
        console.log('[GameAUI] init -> language: ' + this.language);
    }

    preload ()
    {
        // this.load.video('gameA', 'assets/video/GameA.mp4');
        /*
        this.load.image('progress-bar-bg', 'assets/image/A/progressBar/progress_bar_bg.png');
        this.load.image('progress-bar-fill', 'assets/image/A/progressBar/progress_bar.png');
        this.load.image('progress-bar-step', 'assets/image/A/progressBar/step.png');
        this.load.image('progress-bar-step-complete', 'assets/image/A/progressBar/step_complete.png');
        this.load.image('progress-bar-step-current', 'assets/image/A/progressBar/current_step.png');
        this.load.image('progress-bar-step-current-frame', 'assets/image/A/progressBar/current_step_frame.png');
        this.load.image('progress-bar-step-current-fill', 'assets/image/A/progressBar/current_step_fill.png');

        
        this.load.image('progress-text1-cht', 'assets/image/A/progressBar/Progress1.png');
        this.load.image('progress-text2-cht', 'assets/image/A/progressBar/Progress2.png');
        this.load.image('progress-text3-cht', 'assets/image/A/progressBar/Progress3.png');
        this.load.image('progress-text4-cht', 'assets/image/A/progressBar/Progress4.png');
        this.load.image('progress-text5-cht', 'assets/image/A/progressBar/Progress5.png');
        this.load.image('progress-text6-cht', 'assets/image/A/progressBar/Progress6.png');
        this.load.image('progress-text1-eng', 'assets/image/A/progressBar/Progress1_en.png');
        this.load.image('progress-text2-eng', 'assets/image/A/progressBar/Progress2_en.png');
        this.load.image('progress-text3-eng', 'assets/image/A/progressBar/Progress3_en.png');
        this.load.image('progress-text4-eng', 'assets/image/A/progressBar/Progress4_en.png');
        this.load.image('progress-text5-eng', 'assets/image/A/progressBar/Progress5_en.png');
        this.load.image('progress-text6-eng', 'assets/image/A/progressBar/Progress6_en.png');

        this.load.image('chtBtn', 'assets/image/Cover/CN-Disable.png');
        this.load.image('engBtn', 'assets/image/Cover/EN-Disable.png');
        this.load.image('chtBtnOn', 'assets/image/Cover/CN-Enable.png');
        this.load.image('engBtnOn', 'assets/image/Cover/EN-Enable.png');

        this.load.image('chtMenu', 'assets/image/Cover/CN-Menu.png');
        this.load.image('engMenu', 'assets/image/Cover/EN-Menu.png');
        */
    }

    create (data)
    {
        console.log('GameA-ui-start');

        this.gameEvents = this.scene.get('GameA').events;

        this.gameEvents.on('award', this.ShowAward, this);
        this.gameEvents.on('timesup', this.ShowTimesUp, this);
        this.gameEvents.on('timer-update', this.SetTimer, this);
        this.gameEvents.on('step-end', this.HideStep, this);
        for (let i = 0; i < 6; i++)
        {
            this.gameEvents.on('step' + (i+1) + '-start', ()=>{ this.StartStep(i); });
            this.gameEvents.on('step' + (i+1) + '-complete', ()=>{ this.CompleteStep(i); });
        }

        // progress bar
        var posY = 140;
        this.progressBar = this.add.container(960, posY);
        this.progressBarBG = this.add.image(0, 0, 'A-progress', 'progress-bar-bg');
        this.progressBarFill = this.add.image(0, 0, 'A-progress', 'progress-bar-fill');
        const fillRect = this.add.rectangle(0, 0, 0, this.progressBarFill.height);
        this.progressBarFill.setCrop(fillRect);
        this.progressBar.add(this.progressBarBG);
        this.progressBar.add(this.progressBarFill);

        // step nodes
        var posX = -this.progressBarBG.width / 2;
        var stepX = this.progressBarBG.width / 5;
        this.stepNodeCompletes = [];
        this.stepNodeTexts = [];
        for (let i = 0; i < 6; i++)
        {
            // create images
            const node = this.add.image(posX + i * stepX, 0, 'A-progress', 'progress-bar-step');
            const complete = this.add.image(posX + i * stepX, 0, 'A-progress', 'progress-bar-step-complete');
            //const text = new LocalizedImage(this, posX + i * stepX, 100, 'progress-text' + (i+1) +'-cht', 'progress-text' + (i+1) + '-eng');
            //text.SetLocalization(this.language);
            const text = this.add.image(posX + i * stepX, 100, 'A-progress', this.language === 0 ? 'progress-text' + (i+1) +'-cht' : 'progress-text' + (i+1) + '-eng');
            // add to container
            this.progressBar.add(node);
            this.progressBar.add(complete);
            this.progressBar.add(text);
            // references for later usage
            this.stepNodeCompletes.push(complete);
            this.stepNodeTexts.push(text);
        }

        // current step node
        this.currentStep = this.add.container();
        //this.currentStepEffect = this.add.sprite(0, 0, 'particle');
        //this.currentStepEffect.setDisplaySize(300, 300);
        const currentStepBG = this.add.image(0, 0, 'A-progress', 'progress-bar-step-current');
        const currentStepFrame = this.add.image(0, 0, 'A-progress', 'progress-bar-step-current-frame');
        this.currentStepFill = this.add.image(0, 0, 'A-progress', 'progress-bar-step-current-fill');
        this.currentStepFillRect = this.add.rectangle(0, 0, 120, 120);
        this.currentStepFill.setCrop(this.currentStepFillRect);
        this.currentStepTimer = this.add.text(0, 0, '30', { 
            font: '800 54px Times New Roman', 
            fill: '#ffffff', 
            align: 'center'
        }).setOrigin(0.5);
        this.currentStep.add([currentStepBG, currentStepFrame, this.currentStepFill, this.currentStepTimer]);
        this.progressBar.add(this.currentStep);        

        let homeButton = this.add.image(149, 138, 'common', 'homeBtn');
        homeButton.setInteractive();
        homeButton.on('pointerdown', () => {

            this.sound.play('click');
            this.reset();
        });

        this.gameEvents.on('flash-homebutton', () => { 
            this.tweens.add({
                targets: homeButton,
                alpha: { from: 1, to: 0.7 },
                scale: { from: 1, to: 1.2 },
                duration: 500,
                repeat: -1,
                yoyo: true
            });

        });

        // create anims
        /*
        this.anims.create({
            key: 'particles-loop',
            frames: this.anims.generateFrameNames('particle', {
                start: 0,
                end: 249,
                zeroPad: 4,
                prefix: 'frame_'
            }),
            frameRate: 25,
            repeat: -1,            
        });
        */
        this.anims.create({
            key: 'award-show',
            frames: this.anims.generateFrameNames('award', {
                start: 0,
                end: 49,
                zeroPad: 4,
                prefix: 'frame_'
            }),
            frameRate: 25,
            repeat: 0,            
        });
        this.anims.create({
            key: 'timesup-show',
            frames: this.anims.generateFrameNames('timesup', {
                start: 0,
                end: 50,
                zeroPad: 4,
                prefix: 'frame_'
            }),
            frameRate: 25,
            repeat: 0,            
        });

        /*
        this.tweens.add({
            targets: this.currentStepFillRect,
            y: { from: 0, to: 120 },
            height: { from: 120, to: 0 },
            duration: 1000,
            loop: -1,
            onUpdate: ()=>{ this.currentStepFill.setCrop(this.currentStepFillRect); }
        });
        */

        this.progressBar.alpha = 0;
    }

    StartStep(index)
    { 
        this.stepAwardCount = 0;
        if (index < 0 || index > this.stepNodeCompletes.length)
        {
            console.log('StartStep: [' + index + '] not valid');
            return;
        }

        this.currentStep.x = this.stepNodeCompletes[index].x;
        this.currentStep.setScale(0);
        //this.currentStepEffect.play('particles-loop');

        this.stepNodeCompletes.forEach((complete, idx) => { 
            complete.setVisible(idx < index);
        });
        this.stepNodeTexts.forEach((text, idx) => { 
            text.setVisible(idx === index);
        });
        this.tweens.add({
            targets: this.progressBar,
            alpha: 1,
            duration: 1000                
        });
        // progress bar no change for first step
        if (index > 0)
        {
            const fillRect = this.add.rectangle(0, 0, this.progressBarFill.width * (index - 1) / (this.stepNodeCompletes.length - 1), this.progressBarFill.height);
            this.progressBarFill.setCrop(fillRect);
            this.tweens.chain({
                tweens: [
                    {
                        targets: fillRect,
                        width: this.progressBarFill.width * index / (this.stepNodeCompletes.length - 1),
                        duration: 1000,
                        onUpdate: () => { this.progressBarFill.setCrop(fillRect); }
                    },
                    {
                        targets: this.currentStep,
                        scale: { from: 0, to: 1 },
                        duration: 1000    
                    }            
                ]
            });
        }
        else
        {
            this.tweens.add({
                targets: this.currentStep,
                scale: { from: 0, to: 1 },
                duration: 1500    
            });
        }
    }

    CompleteStep(index)
    {
        if (index < 0 || index > this.stepNodeCompletes.length)
        {
            console.log('CompleteStep: [' + index + '] not valid');
            return;
        }

        this.stepNodeCompletes[index].setVisible(true);
        this.stepNodeCompletes[index].alpha = 0;
        this.tweens.chain({
            tweens: [
                {
                    targets: this.currentStep,
                    scale: { from: 1, to: 0 },
                    duration: 1000    
                },
                {
                    targets: this.stepNodeCompletes[index],
                    alpha: { from: 0, to: 1 },
                    duration: 500    
                }       
            ]
        });
    }

    HideStep()
    {
        this.tweens.add({
            targets: this.progressBar,
            alpha: { from: 1, to: 0 },
            duration: 1000                
        });
    }

    SetTimer(time, ratio)
    {
        //console.log('time:' + time + ', ratio: ' + ratio);
        this.currentStepTimer.text = time;
        this.currentStepFillRect.y = ratio * this.currentStepFill.height;
        this.currentStepFill.setCrop(this.currentStepFillRect);
    }

    ShowAward()
    {
        const award = this.add.sprite(1550 + this.stepAwardCount * 120, 200, 'award');
        award.setDisplaySize(500, 500);
        award.play('award-show');
        award.once('animationcomplete', () => {
            award.destroy();
        });
        this.stepAwardCount++;
    }

    ShowTimesUp(x, y)
    {
        const timesup = this.add.sprite(x, y, 'timesup');
        timesup.setDisplaySize(500, 500);
        timesup.play('timesup-show');
        timesup.once('animationcomplete', () => {
            timesup.destroy();
        });
    }
}
