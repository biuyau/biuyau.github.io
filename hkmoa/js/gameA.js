import { Scene } from 'phaser';
import * as Phaser from 'phaser';
import { LocalizedImage } from './localizedImage.js';
import { RevealImage } from './revealImage.js';

export class GameA extends Scene
{

    constructor ()
    {
        super('GameA');
        
        this.language = 0;
        this.state = 0;
        this.awards = [0, 0, 0, 0, 0, 0, 0, 0];
        this.timeLimits = [30, 30, 30, 30, 30, 30];
    }

    init (data)
    {
        if (data != null)
        {
            this.language = data.language;
            //this.videoObj = data.videoObj; 
            //this.add.existing(this.videoObj);
        }
        console.log('[GameA] init -> language: ' + this.language);
    }

    preload ()
    {
        /*
        this.load.video('A1-end', 'assets/video/A/A1.mp4', true);
        this.load.video('A3-end', 'assets/video/A/A3.mp4', true);
        this.load.video('A4-end', 'assets/video/A/A4.mp4', true);
        this.load.video('A5-end', 'assets/video/A/A5.mp4', true);
        this.load.video('gameA-end', 'assets/video/A/gameAEnd.mp4', true);

        // step1
        this.load.image('A1-base', 'assets/image/A/step1/Step_1-BG.jpg');
        this.load.image('A1-bg', 'assets/image/A/step1/Step_1-Paint.png');
        this.load.image('A1-cloth1', 'assets/image/A/step1/cloth1.png');
        this.load.image('A1-cloth2', 'assets/image/A/step1/cloth2.png');
        this.load.image('A1-cloth3', 'assets/image/A/step1/cloth3.png');
        this.load.image('A1-cloth4', 'assets/image/A/step1/cloth4.png');
        this.load.image('A1-cloth5', 'assets/image/A/step1/cloth5.png');
        this.load.image('A1-cloth6', 'assets/image/A/step1/cloth6.png');
        
        // step2
        this.load.image('A2-bg', 'assets/image/A/step2/bg.png');
        //this.load.image('A2-water', 'assets/image/A/step2/water.png');
        this.load.image('A2-brush1', 'assets/image/A/step2/brush1.png');
        this.load.image('A2-brush2', 'assets/image/A/step2/brush2.png');
        this.load.image('A2-brush3', 'assets/image/A/step2/brush3.png');
        this.load.image('A2-brush4', 'assets/image/A/step2/brush4.png');
        this.load.image('A2-text1-cht', 'assets/image/A/step2/text1.png');
        this.load.image('A2-text2-cht', 'assets/image/A/step2/text2.png');
        this.load.image('A2-text3-cht', 'assets/image/A/step2/text3.png');
        this.load.image('A2-text4-cht', 'assets/image/A/step2/text4.png');
        this.load.image('A2-text1-eng', 'assets/image/A/step2/text1_en.png');
        this.load.image('A2-text2-eng', 'assets/image/A/step2/text2_en.png');
        this.load.image('A2-text3-eng', 'assets/image/A/step2/text3_en.png');
        this.load.image('A2-text4-eng', 'assets/image/A/step2/text4_en.png');

        // step3
        this.load.image('A3-brush', 'assets/image/A/step3/correctBrush.png');
        this.load.image('A3-guideline', 'assets/image/A/step3/guideline.png');
        this.load.image('A3-revealmark', 'assets/image/A/step3/WaterMark.png');
        
        // step4
        this.load.image('A4-bg', 'assets/image/A/step4/bg.png');
        this.load.image('A4-center', 'assets/image/A/step4/center.png');
        this.load.image('A4-paper1', 'assets/image/A/step4/1.png');
        this.load.image('A4-paper2', 'assets/image/A/step4/2.png');
        this.load.image('A4-paper3', 'assets/image/A/step4/3.png');
        this.load.image('A4-paper4', 'assets/image/A/step4/4.png');
        this.load.image('A4-paper5', 'assets/image/A/step4/5.png');
        this.load.image('A4-paper6', 'assets/image/A/step4/6.png');
        this.load.image('A4-paper7', 'assets/image/A/step4/7.png');
        this.load.image('A4-paper8', 'assets/image/A/step4/8.png');
        this.load.image('A4-paper9', 'assets/image/A/step4/9.png');
        this.load.image('A4-paper10', 'assets/image/A/step4/10.png');

        // step5
        this.load.image('A5-bg', 'assets/image/A/step5/bg.png');
        this.load.image('A5-guideline', 'assets/image/A/step5/guideline.png');
        this.load.image('A5-paper', 'assets/image/A/step5/paper.png');
        this.load.image('A5-revealmark', 'assets/image/A/step5/paper_glue.png');
        this.load.image('A5-brush', 'assets/image/A/step5/brush.png');
        
        // step6
        this.load.video('A6-item1', 'assets/video/A/A6_item1.mp4', true);
        this.load.video('A6-item2', 'assets/video/A/A6_item2.mp4', true);
        this.load.video('A6-item3', 'assets/video/A/A6_item3.mp4', true);
        this.load.video('A6-item4', 'assets/video/A/A6_item4.mp4', true);
        this.load.image('A6-bg', 'assets/image/A/step6/bg.png');
        this.load.image('A6-item1', 'assets/image/A/step6/item1.png');
        this.load.image('A6-item2', 'assets/image/A/step6/item2.png');
        this.load.image('A6-item3', 'assets/image/A/step6/item3.png');
        this.load.image('A6-item4', 'assets/image/A/step6/item4.png');
        this.load.image('A6-text1-cht', 'assets/image/A/step6/item1_text.png');
        this.load.image('A6-text2-cht', 'assets/image/A/step6/item2_text.png');
        this.load.image('A6-text3-cht', 'assets/image/A/step6/item3_text.png');
        this.load.image('A6-text4-cht', 'assets/image/A/step6/item4_text.png');
        this.load.image('A6-text1-eng', 'assets/image/A/step6/item1_text_en.png');
        this.load.image('A6-text2-eng', 'assets/image/A/step6/item2_text_en.png');
        this.load.image('A6-text3-eng', 'assets/image/A/step6/item3_text_en.png');
        this.load.image('A6-text4-eng', 'assets/image/A/step6/item4_text_en.png');

        // ending
        this.load.image('gameA-end-cht', 'assets/image/A/end/G1-End-cn.png');
        this.load.image('gameA-end-eng', 'assets/image/A/end/G1-End-en.png');

        // result
        this.load.image('gameA-result-bg', 'assets/image/A/result/bg.png');
        this.load.image('gameA-result-icon', 'assets/image/A/result/icon.png');
        this.load.image('gameA-result-award1-cht', 'assets/image/A/result/award1.png');
        this.load.image('gameA-result-award2-cht', 'assets/image/A/result/award2.png');
        this.load.image('gameA-result-award3-cht', 'assets/image/A/result/award3.png');
        this.load.image('gameA-result-award4-cht', 'assets/image/A/result/award4.png');
        this.load.image('gameA-result-award5-cht', 'assets/image/A/result/award5.png');
        this.load.image('gameA-result-award6-cht', 'assets/image/A/result/award6.png');
        this.load.image('gameA-result-award7-cht', 'assets/image/A/result/award7.png');
        this.load.image('gameA-result-award8-cht', 'assets/image/A/result/award8.png');
        this.load.image('gameA-result-award1-eng', 'assets/image/A/result/award1_en.png');
        this.load.image('gameA-result-award2-eng', 'assets/image/A/result/award2_en.png');
        this.load.image('gameA-result-award3-eng', 'assets/image/A/result/award3_en.png');
        this.load.image('gameA-result-award4-eng', 'assets/image/A/result/award4_en.png');
        this.load.image('gameA-result-award5-eng', 'assets/image/A/result/award5_en.png');
        this.load.image('gameA-result-award6-eng', 'assets/image/A/result/award6_en.png');
        this.load.image('gameA-result-award7-eng', 'assets/image/A/result/award7_en.png');
        this.load.image('gameA-result-award8-eng', 'assets/image/A/result/award8_en.png');
        this.load.image('gameA-result-rank1-cht', 'assets/image/A/result/rank1.png');
        this.load.image('gameA-result-rank2-cht', 'assets/image/A/result/rank2.png');
        this.load.image('gameA-result-rank3-cht', 'assets/image/A/result/rank3.png');
        this.load.image('gameA-result-rank1-eng', 'assets/image/A/result/rank1_en.png');
        this.load.image('gameA-result-rank2-eng', 'assets/image/A/result/rank2_en.png');
        this.load.image('gameA-result-rank3-eng', 'assets/image/A/result/rank3_en.png');
        this.load.image('chtBtn', 'assets/image/Cover/CN-Disable.png');
        this.load.image('engBtn', 'assets/image/Cover/EN-Disable.png');
        this.load.image('chtBtnOn', 'assets/image/Cover/CN-Enable.png');
        this.load.image('engBtnOn', 'assets/image/Cover/EN-Enable.png');
        this.load.image('chtMenu', 'assets/image/Cover/CN-Menu.png');
        this.load.image('engMenu', 'assets/image/Cover/EN-Menu.png');
        */
    }

    create ()
    {
        /*
        this.video = this.add.video(960, 540);
        this.video.setScale(1.5);
        this.log = this.add.text(960, 540, 
            'Debug message', 
            { 
                font: '50px Courier', 
                fill: '#ff0000', 
                align: 'center',
            });
        this.log.setDepth(10);
        */
        console.log('GameA: create()');
        this.scene.launch('GameA-Tutor', { language: this.language });
        this.scene.launch('GameA-UI', { language: this.language, resetCallback: this.ReturnHome });

        //this.introGroup = this.add.group();
        this.step1Group = this.add.group();
        this.step2_3Group = this.add.group();
        this.step4Group = this.add.group();
        this.step5Group = this.add.group();
        this.step6Group = this.add.group();

        //this.StartIntro();
        this.time.delayedCall(200, () => { this.StartIntro(); });
        //this.StartStep2();
    }

    StartIntro()
    {
        const intro = this.add.video(960, 540);//, 'gameA');
        intro.setScale(1.5);

        const introText = new LocalizedImage(this, 960, 540, 'gameA-intro-cht', 'gameA-intro-eng');
        introText.SetLocalization(this.language);   
        introText.setScale(1.5);  
        introText.alpha = 0;

        this.LoadUrlForVideo(intro, 'assets/video/GameA.mp4');
            //intro.loadURL('assets/video/GameA.mp4', true);
        //intro.play();
        intro.once('complete', () => {            
            // intro message
            this.tweens.chain({
                targets: introText,
                tweens: [
                    {
                        alpha: { from: 0, to: 1 },
                        ease: 'Linear',
                        duration: 1000
                    },
                    {
                        alpha: { from: 1, to: 0 },
                        ease: 'Linear',
                        duration: 1000,
                        delay: 5000
                    }
                ],
                onComplete: ()=> { 
                    intro.destroy();
                    introText.destroy();
                    //layer.destroy();
                    arrow.destroy();
                    rect.destroy();
                    //arrowMask.destroy();

                    this.StartStep1(); 
                }
            });        
            
            // message arrow
            //let layer = this.add.layer();
            let arrow = this.add.image(1020, 330, 'gameA-arrow');
            let rect = this.add.rectangle(0, 0, 0, arrow.height);
            arrow.setCrop(rect);
            //let rect = this.make.graphics();
            //rect.fillStyle(0xffffff);
            //rect.fillRect(400, 250, 400, 200);
            //let arrowMask = rect.createGeometryMask();
            //layer.setMask(arrowMask);   
            //layer.add(arrow);         

            this.tweens.chain({
                tweens: [
                    {                
                        targets: rect,        
                        width: arrow.width,
                        duration: 2000,
                        onUpdate: () => arrow.setCrop(rect)
                    },
                    {                
                        targets: arrow,  
                        alpha: { from: 1, to: 0 },
                        ease: 'Linear',
                        duration: 1000,
                        delay: 4000
                    }
                ]
            });

            //introGroup.add(intro);
            //introGroup.add(introText);
            //introGroup.add(arrow);
            //introGroup.add(rect);
        });
        
    }

    StartStep1()
    {
        this.events.emit('step1-start');
        this.events.emit('step1-intro');
        
        var firstTrial = true;
        var selectedCloth = -1;
        const correctCloth = 3;

        const step1ClothColors = [0x98A080, 0xA18764, 0xC2C5A1, 0xF9DFBC, 0xCFAD80, 0xE0D7C3];

        const step1Base = this.add.image(960, 540, 'A1-base');
        step1Base.setScale(1.5);
        // fade in
        this.tweens.add({
            targets: step1Base,
            alpha: {from: 0, to: 1},
            duration: 500
        });

        const step1Color = this.add.rectangle(1280, 360, 400, 400);
        step1Color.setFillStyle(0xffffff, 0);
        const step1BG = this.add.image(960, 540, 'A1-bg');
        step1BG.setScale(1.5);
        this.step1ConfirmBtn = this.CreateConfirmButton();
        this.step1ConfirmBtn.setVisible(false);

        var posX = 760;
        var stepX = 190;
        var posY = 1000;
        var posYOnSelect = 860;
        var confirmPosY = 950;
        this.step1Cloths = [];
        for (let i = 0; i < 6; i++)
        {
            const cloth = this.add.image(posX + i * stepX, posY, 'A1-cloth' + (i+1));
            cloth.setDisplaySize(305, 331);
            cloth.setInteractive(this.input.makePixelPerfect(150));
            cloth.on('pointerdown', () => {
                this.sound.play('click');
                // reset positions
                this.step1Cloths.forEach((img) => { this.tweens.add({ targets: img, y: posY, duration: 500 }); });
                this.tweens.add({ targets: cloth, y: posYOnSelect, duration: 500 });
                this.step1ConfirmBtn.setPosition(posX + i * stepX, confirmPosY);
                this.step1ConfirmBtn.setVisible(true);
                selectedCloth = i;
                step1Color.setFillStyle(step1ClothColors[i]);
            });
            // fade in
            this.tweens.add({
                targets: cloth,
                alpha: {from: 0, to: 1},
                duration: 500
            });

            this.step1Cloths.push(cloth);
            this.step1Group.add(cloth);
        }

        this.step1ConfirmBtn.on('pointerdown', () => {
            this.step1ConfirmBtn.setVisible(false);
            if (selectedCloth === correctCloth)
            {
                if (firstTrial)
                {
                    // 1st award
                    this.awards[0] = 1;
                    this.events.emit('award');
                }
                // 2nd award
                this.awards[1] = 1;
                this.events.emit('award');
                this.events.emit('step1-correct');
                this.sound.play('correct');
                this.CompleteStep1();
            }
            else
            {
                // incorrect
                firstTrial = false;
                this.events.emit('step1-wrong');
                this.sound.play('wrong');
                // reset positions
                this.step1Cloths.forEach((img) => { this.tweens.add({ targets: img, y: posY, duration: 500 }); });                
            }
        });

        this.step1Group.add(step1Base);
        this.step1Group.add(step1Color);
        this.step1Group.add(step1BG);
        this.step1Group.add(this.step1ConfirmBtn);

        // timer update
        this.events.emit('timer-update', this.timeLimits[0], 0); // init timer
        this.delayStart = this.time.delayedCall(5000, () => { 
            this.updateTimer = this.time.addEvent({
                delay: 1000,
                callback: () => { 
                    this.events.emit('timer-update', this.updateTimer.getRepeatCount(), this.updateTimer.getOverallProgress());
                    if (this.updateTimer.getRepeatCount() === 0)
                    {
                        this.events.emit('step-timesup');
                        this.events.emit('timesup', step1Color.x, step1Color.y);
                        this.CompleteStep1(); 
                    }
                },
                repeat: this.timeLimits[0]
            });
        });
        /*
        // step timer
        this.stepTimer = this.time.delayedCall(1000 * this.timeLimits[0], () => { 
            this.CompleteStep1(); 
        });
        */

    }

    CompleteStep1()
    {
        // complete
        this.events.emit('step1-complete');

        // stop timers
        this.time.removeAllEvents();
        //this.time.removeEvent(this.delayStart);
        //this.time.removeEvent(this.updateTimer);

        // remove interactives
        this.step1Cloths.forEach((cloth) => { cloth.setVisible(false); });
        this.step1ConfirmBtn.setVisible(false);

        //const end = this.add.video(960, 540, 'A1-end');
        //end.setScale(1.5);
        const end = this.add.video(960, 540);
        end.setScale(1.5);
        
        this.time.delayedCall(2500, () =>{ 
            this.events.emit('step-end');
            this.LoadUrlForVideo(end, 'assets/video/A/A1.mp4');
            //end.loadURL('assets/video/A/A1.mp4', true);
            //end.play(); 
            this.tweens.add({
                targets: end,
                alpha: {from: 0, to: 1},
                duration: 1000
            });
        });        
        
        end.once('complete', () => {
            end.destroy();
            this.step1Group.destroy(true, true);
            this.StartStep2();
        });
    }

    StartStep2()
    {
        this.events.emit('step2-start');
        this.events.emit('step2-intro');

        this.time.delayedCall(3000, () => this.events.emit('step2-intro2'));
        
        var firstTrial = true;
        var selectedBrush = -1;
        const correctBrush = 0;

        const step2BG = this.add.image(960, 540, 'A2-bg');
        step2BG.setScale(1.5);
        //const step2Water = this.add.image(960, 540, 'A2-water');
        this.step2ConfirmBtn = this.CreateConfirmButton();
        this.step2ConfirmBtn.setVisible(false);

        var posX = 760;
        var stepX = 320;
        var posY = 1130;
        var posYOnSelect = 990;
        var confirmPosY = 950;
        this.step2Brushes = [];
        for (let i = 0; i < 4; i++)
        {
            const brushBtn = this.add.container(posX + i * stepX, posY);
            const brush = this.add.image(0, 0, 'A2-brush' + (i+1));
            brush.setScale(850 / brush.height);
            const brushTextBG = new LocalizedImage(this, 0, -180, 'textBG-cht', 'textBG-eng');
            brushTextBG.SetLocalization(this.language);
            const brushText = new LocalizedImage(this, 0, -180, 'A2-text' + (i+1) + '-cht', 'A2-text' + (i+1) + '-eng');
            brushText.SetLocalization(this.language);
            brushBtn.add([brush, brushTextBG, brushText]);

            brushBtn.setSize(Math.max(brush.displayWidth, 250), brush.displayHeight);
            brushBtn.setInteractive();

            brushBtn.on('pointerdown', () => {
                this.sound.play('click');
                // reset positions
                this.step2Brushes.forEach((brush) => { this.tweens.add({ targets: brush, y: posY, duration: 500 }); });
                this.tweens.add({ targets: brushBtn, y: posYOnSelect, duration: 500 });
                this.step2ConfirmBtn.setPosition(posX + i * stepX, confirmPosY);
                this.step2ConfirmBtn.setVisible(true);
                selectedBrush = i;
            });
            // fade in
            this.tweens.add({
                targets: brushBtn,
                alpha: {from: 0, to: 1},
                duration: 500
            });

            this.step2Brushes.push(brushBtn);
            this.step2_3Group.add(brushBtn);
        }

        this.step2ConfirmBtn.on('pointerdown', () => {
            this.sound.play('click');
            this.step2ConfirmBtn.setVisible(false);
            if (selectedBrush === correctBrush)
            {
                if (firstTrial)
                {
                    // 3rd award
                    this.awards[2] = 1;
                    this.events.emit('award');
                }
                // 4th award
                this.awards[3] = 1;
                this.events.emit('award');
                this.events.emit('step2-correct');
                this.sound.play('correct');
                this.CompleteStep2();
            }
            else
            {
                // incorrect
                firstTrial = false;
                this.events.emit('step2-wrong');
                this.sound.play('wrong');
                // reset positions
                this.step2Brushes.forEach((brush) => { this.tweens.add({ targets: brush, y: posY, duration: 500 }); });                
            }
        });

        this.step2_3Group.add(step2BG);
        this.step2_3Group.add(this.step2ConfirmBtn);

        // timer update
        this.events.emit('timer-update', this.timeLimits[1], 0); // init timer
        // buffer time
        this.delayStart = this.time.delayedCall(5000, () => { 
            this.updateTimer = this.time.addEvent({
                delay: 1000,
                callback: () => { 
                    this.events.emit('timer-update', this.updateTimer.getRepeatCount(), this.updateTimer.getOverallProgress());
                    if (this.updateTimer.getRepeatCount() === 0)
                    {
                        this.events.emit('step-timesup');
                        this.events.emit('timesup', 960, 540);
                        this.CompleteStep2(); 
                    }
                },
                repeat: this.timeLimits[1]
            });
        });
    }

    CompleteStep2()
    {
        // complete
        this.events.emit('step2-complete');

        // stop timers
        this.time.removeAllEvents();
        //this.time.removeEvent(this.delayStart);
        //this.time.removeEvent(this.updateTimer);

        // remove interactives
        this.step2Brushes.forEach((brush) => { brush.setVisible(false); });
        this.step2ConfirmBtn.setVisible(false);

        //const end = this.add.video(960, 540, 'A2-end');
        
        this.time.delayedCall(2500, () =>{ 
            // go to step 3 directly, step 2 & 3 share same setup
            //this.events.emit('step-end');
            this.StartStep3();
        });        
        
        /*
        end.once('complete', () => {
            this.step2Group.destroy(true, true);
            this.StartStep3();
        });
        */
    }

    StartStep3()
    {
        this.events.emit('step3-start');
        this.events.emit('step3-intro');

        this.step3brush = this.add.image(960, 540, 'A3-brush');
        this.step3brush.setDisplaySize(628, 628);
        this.step3brush.setOrigin(0);
        this.step3brush.setDepth(1);

        const progressUI = this.add.container(1320, 540);
        const progressValue = this.add.text(-40, 20, '0', { 
            font: '120px Courier', 
            fill: '#ffffff', 
            align: 'right'
        }).setOrigin(0.5, 1);
        const progressPercent = this.add.text(100, 0, '%', { 
            font: '60px Courier', 
            fill: '#ffffff', 
            align: 'left'
        }).setOrigin(0.5, 1);
        const progressText = new LocalizedImage(this, 0, 100, 'progress-cht', 'progress-eng');
        progressText.SetLocalization(this.language);
        progressUI.add([progressValue, progressPercent, progressText]);
        progressUI.alpha = 0;

        //const guideline = this.add.image(0, 0, 'A3-guideline');
        //const reveal = this.add.image(0, 0, 'A3-revealmark');
        var points = [ 
            { x: -35, y: 82 },
            { x: -20, y: 96 },
            { x: 4, y: 103 },
            { x: 24, y: 96 },
            { x: 41, y: 82 },
            { x: 60, y: 78 },
            { x: 80, y: 72 },
            { x: 102, y: 54 },
            { x: 107, y: 35 },
            { x: 114, y: 11 },
            { x: 113, y: -8 },
            { x: 102, y: -29 },
            { x: 88, y: -45 },
            { x: 67, y: -57 },
            { x: 49, y: -63 },
            { x: 33, y: -76 },
            { x: 16, y: -89 },
            { x: 1, y: -99 },
            { x: -19, y: -102 },
            { x: -39, y: -102 },
            { x: -58, y: -100 },
            { x: -76, y: -92 },
            { x: -89, y: -75 },
            { x: -105, y: -60 },
            { x: -120, y: -45 },
            { x: -129, y: -25 },
            { x: -128, y: -5 },
            { x: -108, y: 30 },
            { x: -121, y: 14 },
            { x: -92, y: 49 },
            { x: -69, y: 54 },
            { x: -51, y: 67 } 
        ];
        this.step3Reveal = new RevealImage(this, 1608, 472, 'A3-guideline', 'A3-revealmark', 'brush', 80, points, 40, (progress) => {
            //console.log(progress);
            progressValue.text = Math.round(progress * 100);
            if (progress >= 0.999)
            {
                // 5th award
                this.awards[4] = 1;
                this.events.emit('award');
                this.events.emit('step3-correct');
                this.sound.play('correct');
                this.CompleteStep3();
            }
        });

        this.step3Arrow = this.CreateArrow(660, 390, 180);

        var waterPosX = 290;
        var waterPosY = 400;
        var waterRadius = 140;
        var isRevealing = false;

        this.input.on('pointermove', (pointer) => {
            if (pointer.isDown)
            {
                //console.log(pointer.x + ', ' + pointer.y);
                this.step3brush.x = pointer.x;
                this.step3brush.y = pointer.y;
                // check if touch water
                if (!isRevealing && Phaser.Math.Distance.Between(waterPosX, waterPosY, pointer.x, pointer.y) < waterRadius)
                {                    
                    // start reveal
                    isRevealing = true;
                    this.events.emit('step3-intro2');

                    this.step3Arrow.setVisible(false);
                    this.step3Reveal.Start();

                    this.tweens.add({
                        targets: progressUI,
                        alpha: 1,
                        duration: 500
                    });
                }
            }
        });
        
        this.step2_3Group.add(this.step3brush);
        this.step2_3Group.add(progressUI);
        this.step2_3Group.add(this.step3Reveal);
        this.step2_3Group.add(this.step3Arrow);
        
        // timer update
        this.events.emit('timer-update', this.timeLimits[2], 0); // init timer
        // buffer time
        this.delayStart = this.time.delayedCall(5000, () => { 
            this.updateTimer = this.time.addEvent({
                delay: 1000,
                callback: () => { 
                    this.events.emit('timer-update', this.updateTimer.getRepeatCount(), this.updateTimer.getOverallProgress());
                    if (this.updateTimer.getRepeatCount() === 0)
                    {
                        this.events.emit('step-timesup');
                        this.events.emit('timesup', this.step3Reveal.x, this.step3Reveal.y);
                        this.CompleteStep3(); 
                    }
                },
                repeat: this.timeLimits[2]
            });
        });
    }

    CompleteStep3()
    {
        // complete
        this.events.emit('step3-complete');

        // stop timers
        this.time.removeAllEvents();
        //this.time.removeEvent(this.delayStart);
        //this.time.removeEvent(this.updateTimer);

        // remove interactives
        this.step3Arrow.setVisible(false);
        this.step3brush.setVisible(false);
        this.input.off('pointermove');

        // auto complete the reveal image
        this.step3Reveal.Complete();

        const end = this.add.video(960, 540);//, 'A3-end');
        end.setScale(1.5);
        
        this.time.delayedCall(2500, () => { 
            this.events.emit('step-end');
            this.LoadUrlForVideo(end, 'assets/video/A/A3.mp4');
            //end.loadURL('assets/video/A/A3.mp4', true);
            //end.play();
            this.tweens.add({
                targets: end,
                alpha: {from: 0, to: 1},
                duration: 1000
            });
        });                

        end.once('complete', () => {
            end.destroy();
            this.step2_3Group.destroy(true, true);
            this.StartStep4();
        });
    }

    StartStep4()
    {
        this.events.emit('step4-start');
        this.events.emit('step4-intro');
        
        const step4BG = this.add.image(960, 540, 'A4-bg');
        step4BG.setScale(1.5);

        var posList = [
            {x: 580, y: 253},
            {x: 753, y: 229},
            {x: 1241, y: 237},
            {x: 1337, y: 259},
            {x: 1363, y: 680},
            {x: 1345, y: 824},
            {x: 1019, y: 839},
            {x: 626, y: 828},
            {x: 582, y: 748},
            {x: 565, y: 523}
        ];
        var arrowData = [
            {x: 130, y: 133, angle: -149},
            {x: 164, y: 41, angle: -96},
            {x: -139, y: 69, angle: -58},
            {x: -103, y: 153, angle: -25},
            {x: -96, y: -108, angle: 12},
            {x: -161, y: -87, angle: 48},
            {x: -9, y: -33, angle: 82},
            {x: 206, y: -83, angle: 127},
            {x: 112, y: -77, angle: 151},
            {x: 102, y: 18, angle: 180}
        ];
        var dragThreshold = 100;
        var dragCount = 0;
        var papers = [];
        for (let i = 0; i < 10; i++)
        {
            const paper = this.add.container(posList[i].x, posList[i].y);
            const paperImg = this.add.image(0, 0, 'A4-paper' + (i+1));
            const arrow = this.CreateArrow(arrowData[i].x, arrowData[i].y, arrowData[i].angle, 0.6);
            paper.add([paperImg, arrow]);
            paperImg.setInteractive(this.input.makePixelPerfect(50));
            this.input.setDraggable(paperImg);
            paperImg.on('drag', (pointer, dragX, dragY) => {
                paperImg.x = dragX;
                paperImg.y = dragY;

                if (Phaser.Math.Distance.Between(dragX, dragY, 0, 0) > dragThreshold)
                {
                    arrow.setVisible(false);
                    paperImg.disableInteractive();
                    this.tweens.add({ targets: paper, alpha: 0, duration: 500});
                    
                    dragCount++;
                    if (dragCount === 10)
                    {
                        // 6th award
                        this.awards[5] = 1;
                        this.events.emit('award');
                        this.events.emit('step4-correct');
                        this.sound.play('correct');
                        // complete
                        this.CompleteStep4();
                    }
                }
            });
            papers.push(paper);
            this.step4Group.add(paper);
        }
        this.step4Papers = papers;

        const center = this.add.image(960, 540, 'A4-center');

        this.tweens.add({
            targets: center,
            alpha: { from: 0.8, to: 1 },
            duration: 500
        });
        
        this.step4Group.add(step4BG);
        this.step4Group.add(center);

        // timer update
        this.events.emit('timer-update', this.timeLimits[3], 0); // init timer
        // buffer time
        this.delayStart = this.time.delayedCall(5000, () => { 
            this.updateTimer = this.time.addEvent({
                delay: 1000,
                callback: () => { 
                    this.events.emit('timer-update', this.updateTimer.getRepeatCount(), this.updateTimer.getOverallProgress());
                    if (this.updateTimer.getRepeatCount() === 0)
                    {
                        this.events.emit('step-timesup');
                        this.events.emit('timesup', 960, 540);
                        this.CompleteStep4(); 
                    }
                },
                repeat: this.timeLimits[3]
            });
        });
    }

    CompleteStep4()
    {
        // complete
        this.events.emit('step4-complete');

        // stop timers
        this.time.removeAllEvents();
        //this.time.removeEvent(this.delayStart);
        //this.time.removeEvent(this.updateTimer);

        // remove interactives
        this.step4Papers.forEach((paper) => { paper.setVisible(false); });
                        
        const end = this.add.video(960, 540);//, 'A4-end');     
        end.setScale(1.5);   
        
        this.time.delayedCall(2000, () =>{ 
            this.events.emit('step4-correct2');

            const arrow = this.CreateArrow(1200, 540, -90);
            const overlay = this.add.image(960, 540, 'A4-bg');
            overlay.alpha = 0.01;
            overlay.setInteractive();
            this.input.setDraggable(overlay);
            overlay.on('drag', (pointer, x, y) => {
                //console.log(y);
                if (y < 440)
                {
                    overlay.destroy();
                    arrow.destroy();
    
                    this.LoadUrlForVideo(end, 'assets/video/A/A4.mp4');
                    //end.loadURL('assets/video/A/A4.mp4', true);
                    //end.play();
                }
    
            });
        });       

        end.once('complete', () => {
            end.destroy();
            this.step4Group.destroy(true, true);
            this.StartStep5();
        });
    }

    StartStep5()
    {
        this.events.emit('step5-start');
        this.events.emit('step5-intro');

        const step5BG = this.add.image(960, 540, 'A5-bg');
        step5BG.setScale(1.5);
        const paper = this.add.image(1263, 566, 'A5-paper');

        this.step5brush = this.add.image(960, 540, 'A5-brush');
        this.step5brush.setOrigin(0.04, 0.05);
        this.step5brush.setDepth(1);

        const progressUI = this.add.container(890, 500);
        const progressValue = this.add.text(-40, 20, '0', { 
            font: '120px Courier', 
            fill: '#ffffff', 
            align: 'right'
        }).setOrigin(0.5, 1);
        const progressPercent = this.add.text(100, 0, '%', { 
            font: '60px Courier', 
            fill: '#ffffff', 
            align: 'left'
        }).setOrigin(0.5, 1);
        const progressText = new LocalizedImage(this, 0, 100, 'progress-cht', 'progress-eng');
        progressText.SetLocalization(this.language);
        progressUI.add([progressValue, progressPercent, progressText]);
        progressUI.alpha = 0;

        //const guideline = this.add.image(0, 0, 'A3-guideline');
        //const reveal = this.add.image(0, 0, 'A3-revealmark');
        var points = [ 
            { x: 37, y: 113 },
            { x: 14, y: 132 },
            { x: -12, y: 146 },
            { x: -46, y: 137 },
            { x: -69, y: 118 },
            { x: -99, y: 108 },
            { x: -132, y: 98 },
            { x: -161, y: 65 },
            { x: -171, y: 34 },
            { x: -173, y: -3 },
            { x: -153, y: -37 },
            { x: -130, y: -59 },
            { x: -102, y: -75 },
            { x: -75, y: -89 },
            { x: -55, y: -109 },
            { x: -33, y: -126 },
            { x: -9, y: -138 },
            { x: 18, y: -143 },
            { x: 45, y: -141 },
            { x: 74, y: -140 },
            { x: 99, y: -127 },
            { x: 120, y: -109 },
            { x: 137, y: -86 },
            { x: 152, y: -60 },
            { x: 161, y: -34 },
            { x: 167, y: -2 },
            { x: 138, y: 49 },
            { x: 157, y: 24 },
            { x: 112, y: 65 },
            { x: 84, y: 81 },
            { x: 59, y: 92 }
        ];
        this.step5Reveal = new RevealImage(this, 1263, 566, 'A5-guideline', 'A5-revealmark', 'brush', 90, points, 40, (progress) => {
            //console.log(progress);
            progressValue.text = Math.round(progress * 100);
            if (progress >= 0.999)
            {
                // 7th award
                this.awards[6] = 1;
                this.events.emit('award');
                this.events.emit('step5-correct');
                this.sound.play('correct');
                this.CompleteStep5();
            }
        });

        this.step5Arrow = this.CreateArrow(880, 560, 180);

        var waterPosX = 430;
        var waterPosY = 570;
        var waterRadius = 200;
        var isRevealing = false;

        this.input.on('pointermove', (pointer) => {
            if (pointer.isDown)
            {
                //console.log(pointer.x + ', ' + pointer.y);
                this.step5brush.x = pointer.x;
                this.step5brush.y = pointer.y;
                // check if touch water
                if (!isRevealing && Phaser.Math.Distance.Between(waterPosX, waterPosY, pointer.x, pointer.y) < waterRadius)
                {                    
                    // start reveal
                    isRevealing = true;
                    this.events.emit('step5-intro2');

                    this.step5Arrow.setVisible(false);
                    this.step5Reveal.Start();

                    this.tweens.add({
                        targets: progressUI,
                        alpha: 1,
                        duration: 500
                    });
                }
            }
        });
        
        this.step5Group.add(step5BG);
        this.step5Group.add(paper);
        this.step5Group.add(this.step5brush);
        this.step5Group.add(progressUI);
        this.step5Group.add(this.step5Reveal);
        this.step5Group.add(this.step5Arrow);
        
        // timer update
        this.events.emit('timer-update', this.timeLimits[4], 0); // init timer
        // buffer time
        this.delayStart = this.time.delayedCall(5000, () => { 
            this.updateTimer = this.time.addEvent({
                delay: 1000,
                callback: () => { 
                    this.events.emit('timer-update', this.updateTimer.getRepeatCount(), this.updateTimer.getOverallProgress());
                    if (this.updateTimer.getRepeatCount() === 0)
                    {
                        this.events.emit('step-timesup');
                        this.events.emit('timesup', this.step5Reveal.x, this.step5Reveal.y);
                        this.CompleteStep5(); 
                    }
                },
                repeat: this.timeLimits[4]
            });
        });
    }

    CompleteStep5()
    {
        // complete
        this.events.emit('step5-complete');

        // stop timers
        this.time.removeAllEvents();
        //this.time.removeEvent(this.delayStart);
        //this.time.removeEvent(this.updateTimer);

        // remove interactives
        this.step5Arrow.setVisible(false);
        this.step5brush.setVisible(false);
        this.input.off('pointermove');

        // auto complete the reveal image
        this.step5Reveal.Complete();

        const end = this.add.video(960, 540);//, 'A5-end');
        end.setScale(1.5);
        
        this.time.delayedCall(2500, () => { 
            this.events.emit('step-end');
            this.LoadUrlForVideo(end, 'assets/video/A/A5.mp4');
            //end.loadURL('assets/video/A/A5.mp4', true);
            //end.play();
            this.tweens.add({
                targets: end,
                alpha: {from: 0, to: 1},
                duration: 1000
            });
        });        
        

        end.once('complete', () => {
            end.destroy();
            this.step5Group.destroy(true, true);
            this.StartStep6();
        });
    }

    StartStep6()
    {
        console.log('GameA: StartStep6()');
        this.events.emit('step6-start');
        this.events.emit('step6-intro');
        

        var firstTrial = true;
        this.step6NextItem = 0;
        var selectedItem = -1;

        const step6BG = this.add.image(960, 540, 'A6-bg');
        step6BG.setScale(1.5);
        this.step6ConfirmBtn = this.CreateConfirmButton();
        this.step6ConfirmBtn.setVisible(false);

        var posX = 760;
        var stepX = 320;
        var posY = 960;
        var posYOnSelect = 820;
        var confirmPosY = 950;
        this.step6ItemVideos = [];
        this.step6items = [];
        for (let i = 0; i < 4; i++)
        {
            const itemBtn = this.add.container(posX + i * stepX, posY);
            const item = this.add.image(0, 0, 'A6-item' + (i+1));
            item.setDisplaySize(360, 360);
            item.setAngle(30);
            const itemTextBG = new LocalizedImage(this, 0, 0, 'textBG-cht', 'textBG-eng');
            itemTextBG.SetLocalization(this.language);
            const itemText = new LocalizedImage(this, 0, 0, 'A6-text' + (i+1) + '-cht', 'A6-text' + (i+1) + '-eng');
            itemText.SetLocalization(this.language);
            itemBtn.add([item, itemTextBG, itemText]);

            itemBtn.setSize(320, 450);
            itemBtn.setInteractive();

            //item.setInteractive(this.input.makePixelPerfect(10));
            itemBtn.on('pointerdown', () => {
                this.sound.play('click');
                // reset positions
                this.step6items.forEach((img) => { this.tweens.add({ targets: img, y: posY, duration: 500 }); });
                this.tweens.add({ targets: itemBtn, y: posYOnSelect, duration: 500 });
                this.step6ConfirmBtn.setPosition(posX + i * stepX, confirmPosY);
                this.step6ConfirmBtn.setVisible(true);
                selectedItem = i;
            });

            // fade in
            this.tweens.add({
                targets: itemBtn,
                alpha: {from: 0, to: 1},
                duration: 500
            });

            this.step6items.push(itemBtn);
            this.step6Group.add(itemBtn);

            const video = this.add.video(960, 540);//,  'A6-item' + (i+1));
            video.setScale(1.5);
            this.step6ItemVideos.push(video);
            this.step6Group.add(video);
        }

        this.step6ConfirmBtn.on('pointerdown', () => {
            this.sound.play('click');
            this.step6ConfirmBtn.setVisible(false);
            if (selectedItem === this.step6NextItem)
            {
                // check if last item
                if (selectedItem === this.step6items.length - 1)
                {
                    if (firstTrial)
                    {
                        // 8th award
                        this.awards[7] = 1;
                        this.events.emit('award');
                    }
                    this.events.emit('step6-correct');
                    this.sound.play('correct');
                    // stop timer
                    this.time.removeAllEvents();
                }

                // disable / hide items
                this.step6items.forEach((item) => { item.disableInteractive(); })
                this.tweens.add({
                    targets: this.step6items[this.step6NextItem],
                    alpha: 0,
                    duration: 500
                });

                // play item video
                this.LoadUrlForVideo(this.step6ItemVideos[this.step6NextItem], 'assets/video/A/A6_item' + (this.step6NextItem+1) + '.mp4');
                //this.step6ItemVideos[this.step6NextItem].loadURL('assets/video/A/A6_item' + (this.step6NextItem+1) + '.mp4', true);
                //this.step6ItemVideos[this.step6NextItem].play();
                this.step6ItemVideos[this.step6NextItem].once('complete', () => {                    
                    selectedItem = -1;
                    this.step6NextItem++;
                    // go for next item
                    if (this.step6NextItem < this.step6items.length)
                    {
                        this.step6items.forEach((item, index) => { 
                            if (index >= this.step6NextItem)
                                item.setInteractive(this.input.makePixelPerfect(10)); 
                        });    
                    }
                    else
                    // no more item
                    {
                        this.CompleteStep6();
                    }
                });
            }
            else
            {
                // incorrect
                firstTrial = false;
                this.events.emit('step6-wrong');
                this.sound.play('wrong');
                // reset positions
                this.step6items.forEach((img) => { this.tweens.add({ targets: img, y: posY, duration: 500 }); });                
            }
        });

        this.step6Group.add(step6BG);
        this.step6Group.add(this.step6ConfirmBtn);

        // timer update
        this.events.emit('timer-update', this.timeLimits[5], 0); // init timer
        this.delayStart = this.time.delayedCall(5000, () => { 
            this.updateTimer = this.time.addEvent({
                delay: 1000,
                callback: () => { 
                    this.events.emit('timer-update', this.updateTimer.getRepeatCount(), this.updateTimer.getOverallProgress());
                    if (this.updateTimer.getRepeatCount() === 0)
                    {
                        this.events.emit('step-timesup');
                        this.events.emit('timesup', 960, 540);
                        this.CompleteStep6(); 
                    }
                },
                repeat: this.timeLimits[5]
            });
        });
        /*
        // step timer
        this.stepTimer = this.time.delayedCall(1000 * this.timeLimits[0], () => { 
            this.CompleteStep1(); 
        });
        */

    }

    PlayStep6RemainingVideoAndEnd()
    {
        // play item video
        if (this.step6NextItem < this.step6items.length)
        {
            if (!this.step6ItemVideos[this.step6NextItem].isPlaying())
            {
                this.LoadUrlForVideo(this.step6ItemVideos[this.step6NextItem], 'assets/video/A/A6_item' + (this.step6NextItem+1) + '.mp4');
                //this.step6ItemVideos[this.step6NextItem].loadURL('assets/video/A/A6_item' + (this.step6NextItem+1) + '.mp4', true);
                //this.step6ItemVideos[this.step6NextItem].play();
            }
            this.step6ItemVideos[this.step6NextItem].off('complete');
            this.step6ItemVideos[this.step6NextItem].once('complete', () => {       
                this.step6NextItem++;
                this.PlayStep6RemainingVideoAndEnd();
            });
        }
        else
        {      
            this.events.emit('step-end');  

            this.time.delayedCall(2000, () => { 
                this.StartEnding();
            });              
            
            this.time.delayedCall(5000, () => { 
                this.step6Group.destroy(true, true);
            });       
        }
    }

    CompleteStep6()
    {
        // complete
        this.events.emit('step6-complete');

        // stop timers
        this.time.removeAllEvents();
        //this.time.removeEvent(this.delayStart);
        //this.time.removeEvent(this.updateTimer);

        // remove interactives
        this.step6items.forEach((item) => { item.setVisible(false); });
        this.step6ConfirmBtn.setVisible(false);

        this.PlayStep6RemainingVideoAndEnd();           
    }

    StartEnding()
    {
        const ending = this.add.video(960, 540);//, 'gameA-end');
        ending.setScale(1.5);
        const endingText = new LocalizedImage(this, 960, 540, 'gameA-end-cht', 'gameA-end-eng');
        endingText.setScale(1.5);
        endingText.SetLocalization(this.language);     
        endingText.alpha = 0;

        this.LoadUrlForVideo(ending, 'assets/video/A/GameAEnd.mp4');
        //ending.loadURL('assets/video/A/GameAEnd.mp4', true);
        //ending.play();
        ending.once('complete', () => {            
            // intro message
            this.tweens.chain({
                tweens: [
                    {
                        targets: endingText,
                        alpha: { from: 0, to: 1 },
                        ease: 'Linear',
                        duration: 1000
                    },
                    {
                        targets: [ending, endingText],
                        alpha: { from: 1, to: 0 },
                        ease: 'Linear',
                        duration: 1000,
                        delay: 5000
                    }
                ],
                onComplete: ()=> { 
                    ending.destroy();
                    endingText.destroy();
                    arrow.destroy();
                    rect.destroy();

                    this.ShowResult(); 
                }
            });        
            
            // message arrow
            let arrow = this.add.image(1020, 330, 'gameA-arrow');
            let rect = this.add.rectangle(0, 0, 0, arrow.height);
            arrow.setCrop(rect);

            this.tweens.chain({
                tweens: [
                    {                
                        targets: rect,        
                        width: arrow.width,
                        duration: 2000,
                        onUpdate: () => arrow.setCrop(rect)
                    },
                    {                
                        targets: arrow,  
                        alpha: { from: 1, to: 0 },
                        ease: 'Linear',
                        duration: 1000,
                        delay: 4000
                    }
                ]
            });
        });
    }

    ShowResult()
    {
        this.events.emit('flash-homebutton');

        const bg = this.add.image(960, 540, 'gameA-result-bg');
        bg.setScale(1.5);

        var iconPosList = [
            {x: 950, y: 170},
            {x: 1205, y: 280},
            {x: 1315, y: 540},
            {x: 1205, y: 800},
            {x: 950, y: 910},
            {x: 695, y: 800},
            {x: 585, y: 540},
            {x: 695, y: 280}
        ];
        var textPosList = [
            {x: 950, y: 60},
            {x: 1400, y: 280},
            {x: 1510, y: 540},
            {x: 1400, y: 800},
            {x: 950, y: 1020},
            {x: 500, y: 800},
            {x: 390, y: 540},
            {x: 500, y: 280}
        ];

        var awardCount = 0;
        for (let i = 0; i < 8; i++)
        {
            const icon = this.add.image(iconPosList[i].x, iconPosList[i].y, 'gameA-result-icon');
            const text = new LocalizedImage(this, textPosList[i].x, textPosList[i].y, 'gameA-result-award' + (i+1) + '-cht', 'gameA-result-award' + (i+1) + '-eng');
            text.SetLocalization(this.language);
            let a = this.awards[i] ? 1 : 0.5;
            //icon.setAlpha(alpha);
            //text.setAlpha(alpha);
            icon.setDepth(1);
            text.setDepth(1);
            
            if (this.awards[i])
                awardCount++;

            this.tweens.add({
                targets: [icon, text],
                alpha: { from: 0, to: a },
                duration: 1000
            });
        }

        if (awardCount < 3)
            var rank = new LocalizedImage(this, 950, 720, 'gameA-result-rank3-cht', 'gameA-result-rank3-eng');
        else if (awardCount < 7)
            rank = new LocalizedImage(this, 950, 720, 'gameA-result-rank2-cht', 'gameA-result-rank2-eng');
        else
            rank = new LocalizedImage(this, 950, 720, 'gameA-result-rank1-cht', 'gameA-result-rank1-eng');
        rank.SetLocalization(this.language);
        
        this.tweens.add({
            targets: [bg, rank],
            alpha: { from: 0, to: 1 },
            duration: 1000
        });
    }

    CreateConfirmButton()
    {
        const button = this.add.container();
        const bg = this.add.image(0, 0, 'button');
        const text = new LocalizedImage(this, 0, 0, 'confirm-cht', 'confirm-eng');
        text.SetLocalization(this.language);
        button.add([bg, text]);

        button.setSize(bg.width, bg.height);
        button.setDepth(1); // bring to top
        button.setInteractive();

        return button;
    }

    CreateArrow(x, y, angle, size = 1)
    {
        const container = this.add.container(x, y);
        const arrow = this.add.image(0, 0, 'arrow');
        arrow.angle = angle;
        let rect = this.add.rectangle(0, 0, 0, arrow.height);
        arrow.setCrop(rect);
        container.setScale(size);

        this.tweens.add({                
            targets: rect,        
            width: { from: 0, to: arrow.width },
            duration: 1500,
            repeat: -1,
            onUpdate: () => arrow.setCrop(rect)
        });

        container.add([arrow, rect]);
        return container;
    }

    ReturnHome()
    {
        console.log('GameA: ReturnHome()');
        this.tweens.killAll();
        this.time.removeAllEvents();
        this.sound.stopAll();
        this.events.removeAllListeners();

        this.scene.stop('GameA-Tutor');
        this.scene.stop('GameA-UI');
        this.scene.stop();
        
        this.sound.play('click');

        location.reload();
    }

    LoadUrlForVideo(video, url)
    {
        if (this.sys.game.device.browser.safari)
        {
            console.log('safari!');
            //url = url.replace('.mp4', '.mov');
            video.loadURL(url, true);
            video.play();
        }
        //console.log('video loadURL: ' + url);
        video.loadURL(url, true);
        this.time.delayedCall(100, () => { video.play(); });
        
        /*
        video.on('unsupported', function(video, error){
            console.log('unsupported: ' + error);
        }, this);

        video.on('unlocked', function(video, error){
            console.log('unlocked: ' + error);        
        }, this);

        video.on('error', function(video, error){
            console.log('error: ' + error);
        
        }, this);

        video.on('metadata', function(video){
            console.log('metadata');
        
        }, this);
        
        video.on('timeout', function(video){
            console.log('timeout');        
        }, this);
        
        video.on('play', function(video){
        
        }, this);
        
        video.on('playing', function(video){
        
        }, this);
        
        video.on('textureready', function(video){
            console.log('textureready');
        }, this);
        
        video.on('complete', function(video){
            console.log('complete');
        
        }, this);
        
        video.on('loop', function(video){
        
        }, this);
        
        video.on('seeking', function(video){
            console.log('seeking');
        
        }, this);
        
        video.on('seeked', function(video){
            console.log('seeked');
        
        }, this);
        
        video.on('created', function(video, width, height){
            console.log('created');
        
        }, this);
        
        video.on('stalled', function(video, width, height){
            console.log('stalled');
        
        }, this);
        
        video.on('stop', function(video){
            console.log('stop');
        
        }, this);
        */
    }
}
