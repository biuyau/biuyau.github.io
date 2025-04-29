import { Scene } from 'phaser';
import * as Phaser from 'phaser';
//import { LocalizedImage } from './localizedImage.js';
import { RevealImage } from './revealImage.js';

export class GameB extends Scene
{

    constructor ()
    {
        super('GameB');
        
        this.language = 0;
        this.awards = [0, 0, 0, 0, 0, 0, 0, 0];
        this.timeLimits = [40, 30, 30, 30, 40, 30];
    }

    init (data)
    {
        if (data != null)
        {
            this.language = data.language;
        }
        console.log('[GameB] init -> language: ' + this.language);
    }

    preload ()
    {
        var loadingBG = this.add.graphics();
        loadingBG.fillStyle(0x000000, 0.8);
        loadingBG.fillRect(0, 0, 1920, 1080);
        loadingBG.setInteractive();
        var progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 1);
        progressBox.fillRect(500, 500, 920, 80);
        var progressBar = this.add.graphics();
        var loadingText = this.make.text({
            x: 960,
            y: 420,
            text: '\n載入中...\nLoading...\n',
            style: {
                font: '30px Georgia',
                fill: '#ffffff',
                align: 'center',
                lineSpacing: 20,
                wordWrap: { width: 1200, useAdvancedWrap: true }
            }
        });
        loadingText.setOrigin(0.5, 0.5);

        ////////////////////
        // Game A
        ////////////////////
        this.load.atlas('award', 'assets/image/award.png', 'assets/image/award.json');
        this.load.atlas('timesup', 'assets/image/timesup.png', 'assets/image/timesup.json');
        this.load.atlas('B-intro_end', 'assets/image/B/intro_end.png', 'assets/image/B/intro_end.json');
        this.load.atlas('B-progress', 'assets/image/B/progressBar/progress_ui.png', 'assets/image/B/progressBar/progress_ui.json');
        this.load.atlas('B-step1', 'assets/image/B/step1/step1.png', 'assets/image/B/step1/step1.json');
        this.load.atlas('B-step2', 'assets/image/B/step2/step2.png', 'assets/image/B/step2/step2.json');
        this.load.atlas('B-step3', 'assets/image/B/step3/step3.png', 'assets/image/B/step3/step3.json');
        this.load.atlas('B-step4', 'assets/image/B/step4/step4.png', 'assets/image/B/step4/step4.json');
        this.load.atlas('B-step5', 'assets/image/B/step5/step5.png', 'assets/image/B/step5/step5.json');
        this.load.atlas('B-step6', 'assets/image/B/step6/step6.png', 'assets/image/B/step6/step6.json');
        this.load.atlas('B-tutor-cht', 'assets/image/B/tutor/tutor_cht.png', 'assets/image/B/tutor/tutor_cht.json');
        this.load.atlas('B-tutor-eng', 'assets/image/B/tutor/tutor_eng.png', 'assets/image/B/tutor/tutor_eng.json');
        this.load.atlas('B-result', 'assets/image/B/result/result.png', 'assets/image/B/result/result.json');
       
        this.load.on('progress', function (value) {
            //console.log(value);
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(510, 510, 900 * value, 60);
            
        });
                    
        //this.load.on('fileprogress', function (file) {
        //    console.log(file.src);
        //});

        this.load.on('complete', () => {
            console.log('loading completed');
            loadingBG.destroy();
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
        });
    }

    create ()
    {
        /*
        this.video = this.add.video(960, 540);
        this.video.setScale(1.5);
        this.log = this.add.text(960, 540, 
            'Debug message', 
            { 
                font: '50px Times New Roman', 
                fill: '#ff0000', 
                align: 'center',
            });
        this.log.setDepth(10);
        */
        console.log('GameB: create()');
        this.scene.launch('GameB-Tutor', { language: this.language });
        this.scene.launch('GameB-UI', { language: this.language, resetCallback: this.ReturnHome });

        //this.introGroup = this.add.group();
        this.step123Group = this.add.group();
        this.step4Group = this.add.group();
        this.step5Group = this.add.group();
        this.step6Group = this.add.group();
                      
        this.time.delayedCall(3000, () => { 
            this.scene.stop('Main'); 
        });     
        //this.StartIntro();
        this.time.delayedCall(100, () => { 
            this.StartIntro(); 
        });
        //this.StartStep2();
    }

    StartIntro()
    {
        const intro = this.add.video(960, 540);//, 'gameB');
        intro.setScale(1.5);

        //const introText = new LocalizedImage(this, 960, 540, 'gameB-intro-cht', 'gameB-intro-eng');
        //introText.SetLocalization(this.language);   
        const introText = this.add.image(960, 540, 'B-intro_end', this.language === 0 ? 'gameB-intro-cht' : 'gameB-intro-eng');
        introText.setScale(1.5);  
        introText.alpha = 0;

        this.LoadUrlForVideoAndPlay(intro, 'assets/video/GameB.mp4');
            //intro.loadURL('assets/video/GameB.mp4', true);
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
                    //arrowMask.destroy();

                    const intro2 = this.add.video(960, 540);//, 'gameB');
                    intro2.setScale(1.5);
                    this.LoadUrlForVideoAndPlay(intro2, 'assets/video/B/B_intro.mp4');
                    intro2.once('complete', () => {
                        intro.destroy();
                        intro2.destroy();
                        introText.destroy();
                        arrow.destroy();
                        rect.destroy();

                        this.StartStep1(); 
                    });                    
                }
            });        
            
            // message arrow
            let arrow = this.add.image(380, 550, 'B-intro_end', 'gameB-arrow');
            let rect = this.add.rectangle(0, 0, 0, arrow.height);
            arrow.setCrop(rect);

            this.tweens.chain({
                tweens: [
                    {                
                        targets: rect,        
                        width: arrow.width,
                        duration: 1500,
                        onUpdate: () => arrow.setCrop(rect)
                    },
                    {                
                        targets: arrow,  
                        alpha: { from: 1, to: 0 },
                        ease: 'Linear',
                        duration: 1000,
                        delay: 4500
                    }
                ]
            });
        });        
    }

    StartStep1()
    {
        this.events.emit('step1-start');
        this.events.emit('step1-intro');
        
        var firstTrial = true;
        var selectedBrush = -1;
        const correctBrush = 1;

        const step1BG = this.add.image(960, 540, 'B-step1', 'bg');
        step1BG.setScale(1.5);
        
        // part 1
        this.step1ConfirmBtn = this.CreateConfirmButton();
        this.step1ConfirmBtn.setVisible(false);

        var posX = 760;
        var stepX = 330;
        var posY = 960;
        var posYOnSelect = 820;
        var confirmPosY = 950;
        this.step1Brushes = [];
        for (let i = 0; i < 4; i++)
        {
            const brushBtn = this.add.container(posX + i * stepX, posY);
            const brush = this.add.image(0, 0, 'B-step1', 'brush' + (i+1));
            brush.setDisplaySize(380, 380);
            const brushTextBG = this.add.image(0, 0, 'common', this.language === 0 ? 'textBG-cht' : 'textBG-eng');
            const brushText = this.add.image(0, 0, 'B-step1', this.language === 0 ? 'text' + (i+1) : 'text' + (i+1) + '_en');
            brushBtn.add([brush, brushTextBG, brushText]);

            brushBtn.setSize(330, 340);
            brushBtn.setInteractive();

            brushBtn.on('pointerdown', () => {
                this.sound.play('click');
                // reset positions
                this.step1Brushes.forEach((brush) => { this.tweens.add({ targets: brush, y: posY, duration: 500 }); });
                this.tweens.add({ targets: brushBtn, y: posYOnSelect, duration: 500 });
                this.step1ConfirmBtn.setPosition(posX + i * stepX, confirmPosY);
                this.step1ConfirmBtn.setVisible(true);
                selectedBrush = i;
            });
            // fade in
            this.tweens.add({
                targets: brushBtn,
                alpha: {from: 0, to: 1},
                duration: 500
            });

            this.step1Brushes.push(brushBtn);
            this.step123Group.add(brushBtn);
        }

        this.step1ConfirmBtn.on('pointerdown', () => {
            this.sound.play('click');
            this.step1ConfirmBtn.setVisible(false);
            if (selectedBrush === correctBrush)
            {
                if (firstTrial)
                {
                    // 1st award
                    this.awards[0] = 1;
                    this.events.emit('award');
                }
                //this.events.emit('step1-correct2');
                this.sound.play('correct');
                this.StartStep1Paint();
            }
            else
            {
                // incorrect
                firstTrial = false;
                this.events.emit('step1-wrong2');
                this.sound.play('wrong');
                // reset positions
                this.step1Brushes.forEach((brush) => { this.tweens.add({ targets: brush, y: posY, duration: 500 }); });                
            }
        });

        // part 2
        this.step1brush = this.add.image(960, 540, 'B-step1', 'brush2');
        this.step1brush.setDisplaySize(350, 350);
        this.step1brush.setOrigin(0.2, 0.52);
        this.step1brush.setDepth(1);
        this.step1brush.setVisible(false);

        var indicatorStartX = -325;
        var indicatorGoodX = 165;
        var indicatorBadX = 245;
        var indicatorEndX = 325;
        var indicatorY = -50;
        this.step1ProgressUI = this.add.container(960, 990);
        this.step1Arrow = this.CreateArrow(-425, 0, 0, 0.5, 1000);
        const progressBar = this.add.image(0, 0, 'B-step1', 'humidityBar');
        this.step1ProgressIndicator = this.add.image(indicatorStartX, indicatorY, 'B-step1', 'pointer');
        this.step1ProgressUI.add([this.step1Arrow, progressBar, this.step1ProgressIndicator]);
        this.step1ProgressUI.setVisible(false);

        var humidityState = 0; // 0 = insufficient, 1 = good, 2 = over
        var goodDuration = 3000;
        var badDuration = 2000;

        var points = [ 
            { x: -372, y: 256 },
            { x: -378, y: 167 },
            { x: -386, y: 62 },
            { x: -386, y: -43 },
            { x: 256, y: 118 },
            { x: -380, y: -145 },
            { x: -359, y: -249 },
            { x: -201, y: -206 },
            { x: -273, y: -273 },
            { x: -201, y: -102 },
            { x: -196, y: -20 },
            { x: -189, y: 63 },
            { x: -195, y: 161 },
            { x: -184, y: 249 },
            { x: -69, y: 249 },
            { x: -63, y: 148 },
            { x: -47, y: -52 },
            { x: -58, y: 44 },
            { x: -31, y: -158 },
            { x: -1, y: -247 },
            { x: 82, y: -241 },
            { x: 88, y: -157 },
            { x: 100, y: -75 },
            { x: 103, y: 26 },
            { x: 111, y: 121 },
            { x: 127, y: 240 },
            { x: 244, y: 232 },
            { x: 271, y: -71 },
            { x: 266, y: 23 },
            { x: 277, y: -158 },
            { x: 278, y: -241 },
            { x: 382, y: -239 },
            { x: 399, y: -133 },
            { x: 385, y: -32 },
            { x: 383, y: 45 },
            { x: 379, y: 136 },
            { x: 376, y: 233 }
        ];
        this.step1Reveal = new RevealImage(this, 951, 584, 'B-step1', 'guide', 'WaterSpray', 250, points, 100, (progress) => {
            //console.log(progress);
            this.step1ProgressIndicator.x = indicatorStartX + (indicatorGoodX - indicatorStartX) * progress;
            if (progress >= 0.999)
            {
                humidityState = 1;
                // times up for good humidity
                const goodTimer = this.time.addEvent({
                    delay: goodDuration,
                    callback: () => { 
                        humidityState = 2;
                    }
                });
                // check touch up
                this.input.on('pointerup', () => {

                    this.time.removeEvent(goodTimer);
                    // check for state
                    if (humidityState === 1)
                    {
                        // 2nd award
                        this.awards[1] = 1;
                        this.events.emit('award');
                        this.events.emit('step1-correct');
                        this.sound.play('correct');
                        this.CompleteStep1();
                    }
                    else
                    {
                        this.events.emit('step1-wrong');
                        this.sound.play('wrong');
                        this.CompleteStep1();                        
                    }
                });
                // move indicator
                this.tweens.chain({
                    targets: this.step1ProgressIndicator,  
                    tweens: [
                        {                      
                            x: { from: indicatorGoodX, to: indicatorBadX },
                            duration: goodDuration
                        },
                        {                        
                            x: { from: indicatorBadX, to: indicatorEndX },
                            duration: badDuration
                        }
                    ]
                });
            }
        });

        this.step123Group.add(step1BG);
        this.step123Group.add(this.step1ConfirmBtn);
        this.step123Group.add(this.step1brush);
        this.step123Group.add(this.step1ProgressUI);
        this.step123Group.add(this.step1Reveal);
        this.step123Group.add(this.step1Arrow);

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
                        this.events.emit('timesup', 960, 540);
                        this.CompleteStep1(); 
                    }
                },
                repeat: this.timeLimits[0]
            });
        });
    }

    StartStep1Paint()
    {        
        this.step1Brushes.forEach((brush) => { brush.setVisible(false); });
        this.step1ConfirmBtn.setVisible(false);

        this.events.emit('step1-intro2');

        this.step1brush.setVisible(true);

        this.step1ProgressUI.setVisible(true);
        this.tweens.add({
            targets: this.step1ProgressUI,
            alpha: { from: 0, to: 1 },
            duration: 1000
        });
        this.tweens.add({
            targets: this.step1ProgressIndicator,
            scale: { from: 0.8, to: 1 },
            duration: 500,
            repeat: -1,
            yoyo: true
        });

        this.step1Reveal.Start();

        this.input.on('pointermove', (pointer) => {
            if (pointer.isDown)
            {
                this.step1brush.x = pointer.x;
                this.step1brush.y = pointer.y;
            }
        });        
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
        this.step1Brushes.forEach((brush) => { brush.setVisible(false); });
        this.step1ConfirmBtn.setVisible(false);
        this.step1brush.setVisible(false);
        this.step1ProgressUI.setVisible(false);
        this.input.off('pointermove');
        this.input.off('pointerup');

        // auto complete the reveal image
        this.step1Reveal.Complete();

        const end = this.add.video(960, 540);
        end.setScale(1.5);
        
        this.time.delayedCall(2500, () =>{ 
            
            this.StartStep2();
        });        
    }

    StartStep2()
    {
        this.events.emit('step2-start');
        this.events.emit('step2-intro');
        
        var selectedBrush = -1;
        const correctBrush = 2;

        //const step2BG = this.add.image(960, 540, 'B-step2', 'bg');
        //step2BG.setScale(1.5);
        const step2Paste = this.add.image(290, 430, 'B-step2', 'paste');
        this.tweens.add({
            targets: step2Paste,
            alpha: { from: 0, to: 1 },
            duration: 500
        });

        this.step2ConfirmBtn = this.CreateConfirmButton();
        this.step2ConfirmBtn.setVisible(false);

        var posX = 760;
        var stepX = 320;
        var posY = 1080;
        var posYOnSelect = 940;
        var confirmPosY = 950;
        this.step2Brushes = [];
        for (let i = 0; i < 4; i++)
        {
            const brushBtn = this.add.container(posX + i * stepX, posY);
            const brush = this.add.image(0, -300, 'B-step2', 'brush' + (i+1));
            brush.setOrigin(0.5, 0);
            const brushTextBG = this.add.image(0, -120, 'common', this.language === 0 ? 'textBG-cht' : 'textBG-eng');
            const brushText = this.add.image(0, -120, 'B-step2', this.language === 0 ? 'text' + (i+1) : 'text' + (i+1) + '_en');
            brushBtn.add([brush, brushTextBG, brushText]);

            brushBtn.setSize(Math.max(brush.displayWidth, 250), 600);
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
            this.step123Group.add(brushBtn);
        }

        this.step2ConfirmBtn.on('pointerdown', () => {
            this.sound.play('click');
            this.step2ConfirmBtn.setVisible(false);
            if (selectedBrush === correctBrush)
            {
                this.events.emit('step2-correct');
                this.sound.play('correct');
                this.CompleteStep2();
            }
            else
            {
                // incorrect
                this.events.emit('step2-wrong');
                this.sound.play('wrong');
                // reset positions
                this.step2Brushes.forEach((brush) => { this.tweens.add({ targets: brush, y: posY, duration: 500 }); });                
            }
        });

        this.step123Group.add(step2Paste);
        this.step123Group.add(this.step2ConfirmBtn);

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

        this.step3brush = this.add.image(960, 540, 'B-step3', 'correctBrush');
        this.step3brush.setDisplaySize(280, 280);
        this.step3brush.setOrigin(0.5, 1);
        this.step3brush.setDepth(1);

        this.step3ProgressUI = this.add.container(1650, 540);
        const progressValue = this.add.text(-40, 20, '0', { 
            font: '800 120px Times New Roman', 
            fill: '#ffffff', 
            align: 'right'
        }).setOrigin(0.5, 1);
        const progressPercent = this.add.text(100, 0, '%', { 
            font: '800 60px Times New Roman', 
            fill: '#ffffff', 
            align: 'left'
        }).setOrigin(0.5, 1);
        //const progressText = new LocalizedImage(this, 0, 100, 'progress-cht', 'progress-eng');
        //progressText.SetLocalization(this.language);
        const progressText = this.add.image(0, 100, 'common', this.language === 0 ? 'progress-cht' : 'progress-eng');
        this.step3ProgressUI.add([progressValue, progressPercent, progressText]);
        this.step3ProgressUI.alpha = 0;

        var points = [ 
            { x: -372, y: 256 },
            { x: -378, y: 167 },
            { x: -386, y: 62 },
            { x: -386, y: -43 },
            { x: 256, y: 118 },
            { x: -380, y: -145 },
            { x: -359, y: -249 },
            { x: -201, y: -206 },
            { x: -273, y: -273 },
            { x: -201, y: -102 },
            { x: -196, y: -20 },
            { x: -189, y: 63 },
            { x: -195, y: 161 },
            { x: -184, y: 249 },
            { x: -69, y: 249 },
            { x: -63, y: 148 },
            { x: -47, y: -52 },
            { x: -58, y: 44 },
            { x: -31, y: -158 },
            { x: -1, y: -247 },
            { x: 82, y: -241 },
            { x: 88, y: -157 },
            { x: 100, y: -75 },
            { x: 103, y: 26 },
            { x: 111, y: 121 },
            { x: 127, y: 240 },
            { x: 244, y: 232 },
            { x: 271, y: -71 },
            { x: 266, y: 23 },
            { x: 277, y: -158 },
            { x: 278, y: -241 },
            { x: 382, y: -239 },
            { x: 399, y: -133 },
            { x: 385, y: -32 },
            { x: 383, y: 45 },
            { x: 379, y: 136 },
            { x: 376, y: 233 }
        ];
        this.step3Reveal = new RevealImage(this, 951, 584, 'B-step3', 'guide', 'PasteApplied', 250, points, 100, (progress) => {
            //console.log(progress);
            progressValue.text = Math.round(progress * 100);
            if (progress >= 0.999)
            {
                // 3rd award
                this.awards[2] = 1;
                this.events.emit('award');
                this.events.emit('step3-correct');
                this.sound.play('correct');
                this.CompleteStep3();
            }
        });

        this.step3Arrow = this.CreateArrow(620, 430, 180);

        var waterPosX = 290;
        var waterPosY = 430;
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
                        targets: this.step3ProgressUI,
                        alpha: 1,
                        duration: 500
                    });
                }
            }
        });
        
        this.step123Group.add(this.step3brush);
        this.step123Group.add(this.step3ProgressUI);
        this.step123Group.add(this.step3Reveal);
        this.step123Group.add(this.step3Arrow);
        
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
        this.step3ProgressUI.setVisible(false);
        this.input.off('pointermove');

        // auto complete the reveal image
        this.step3Reveal.Complete();

        const end = this.add.video(960, 540);//, 'A3-end');
        end.setScale(1.5);
        
        this.time.delayedCall(2500, () => { 
            this.events.emit('step-end');
            this.LoadUrlForVideoAndPlay(end, this.language === 0 ? 'assets/video/B/B3.mp4' : 'assets/video/B/B3_en.mp4');
            //end.loadURL('assets/video/B/A3.mp4', true);
            //end.play();
            this.tweens.add({
                targets: end,
                alpha: {from: 0, to: 1},
                duration: 1000
            });
        });                

        end.once('complete', () => {
            end.destroy();
            this.step123Group.destroy(true, true);
            this.StartStep4();
        });
    }

    StartStep4()
    {
        this.events.emit('step4-start');
        this.events.emit('step4-intro');
        
        this.time.delayedCall(2000, () => { this.events.emit('step4-intro2'); });

        this.step4NextTarget = 0;

        const step4BG = this.add.image(960, 540, 'B-step4', 'bg');
        step4BG.setScale(1.5);

        const rect1a = this.add.rectangle(955, 304, 868, 30, 0xA8CFA5);
        const rect1b = this.add.rectangle(955, 880, 868, 30, 0xA8CFA5);
        const rect1c = this.add.rectangle(536, 592, 30, 605, 0xA8CFA5);
        const rect1d = this.add.rectangle(1374, 592, 30, 605, 0xA8CFA5);

        const rect2a = this.add.rectangle(955, 210, 870, 60, 0xA8CFA5);
        const rect2b = this.add.rectangle(955, 890, 870, 60, 0xA8CFA5);

        const rect3a = this.add.rectangle(340, 550, 330, 730, 0xA8CFA5);
        const rect3b = this.add.rectangle(1570, 550, 330, 730, 0xA8CFA5);

        this.step4Targets = [
            { rects: [rect1a, rect1b, rect1c, rect1d], item: 1 },
            { rects: [rect2a, rect2b], item: 2 },
            { rects: [rect3a, rect3b], item: 3 },
        ];

        this.step4Targets.forEach((target, id) => {
            target.rects.forEach((rect) => { 
                rect.setVisible(id === this.step4NextTarget); 
                rect.setDepth(1);
                this.step4Group.add(rect);
                if (id === this.step4NextTarget)
                    this.tweens.add({ 
                        targets: rect, 
                        alpha: { from: 0.5, to: 1 },
                        duration: 500,
                        repeat: -1,
                        yoyo: true
                    });
            });
        });

        var posXList = [580, 880, 1180, 1630];
        //var posX = 760;
        //var stepX = 330;
        var posY = 1060;
        this.step4Items = [];
        this.step4Draggables = [];
        this.step4Videos = [];
        this.step4Videos.push(this.add.video(960, 540));
        this.step4Videos.push(this.add.video(960, 540));
        this.step4Videos.forEach((video) => { 
            video.setScale(1.5); 
            this.step4Group.add(video);
        });
        for (let i = 0; i < 4; i++)
        {
            const item = this.add.container(posXList[i], posY);
            const itemImg = this.add.image(0, 0, 'B-step4', 'item' + i);
            const itemTextBG = this.add.image(0, -100, 'common', this.language === 0 ? 'textBG-cht' : 'textBG-eng');
            const itemText = this.add.image(0, -100, 'B-step4', this.language === 0 ? 'text' + i : 'text' + i + '_en');
            item.add([itemImg, itemTextBG, itemText]);
            item.setDepth(2);

            itemImg.setInteractive();
            this.input.setDraggable(itemImg);
            itemImg.on('drag', (pointer, dragX, dragY) => {
                itemImg.x = dragX;
                itemImg.y = dragY;
            });
            itemImg.on('dragend', (pointer, dragX, dragY) => {

                const target = this.step4Targets[this.step4NextTarget];
                let correct = false;
                for (let a = 0; a < target.rects.length; a++)
                {
                    if(Phaser.Geom.Intersects.RectangleToRectangle(itemImg.getBounds(), target.rects[a].getBounds()))
                    {
                        if (target.item === i)
                        {
                            // correct item
                            correct = true;
                            this.sound.play('correct');

                            item.setVisible(false);
                            itemImg.off('drag');
                            itemImg.off('dragend');
                            let targetID = this.step4NextTarget;
                            this.step4Targets.forEach((target) => {
                                target.rects.forEach((rect) => { 
                                    rect.setVisible(false); 
                                    this.tweens.killTweensOf(rect);
                                });
                            });
                            
                            this.step4Draggables.forEach((item) => { item.disableInteractive(); })
                            if (this.step4NextTarget < this.step4Videos.length)
                            {
                                // play video
                                this.LoadUrlForVideoAndPlay(this.step4Videos[targetID], 'assets/video/B/B4_item' + (targetID + 1) + '.mp4');
                                
                                this.step4Videos[targetID].once('complete', () => {
                                    // enable draggables
                                    this.step4NextTarget++;
                                    this.step4Draggables.forEach((item, id) => { 
                                        if (id === 0 || id >= this.step4NextTarget) 
                                            item.setInteractive(); 
                                    });
                                    // show target rects
                                    this.step4Targets.forEach((target, id) => {
                                        target.rects.forEach((rect) => { 
                                            rect.setVisible(id === this.step4NextTarget); 
                                            if (id === this.step4NextTarget)
                                                this.tweens.add({ 
                                                    targets: rect, 
                                                    alpha: { from: 0.5, to: 1 },
                                                    duration: 500,
                                                    repeat: -1,
                                                    yoyo: true
                                                });
                                        });
                                    });
                                });
                            }
                            else
                            {
                                // all target completed
                                // 4th award
                                this.awards[3] = 1;
                                this.events.emit('award');
                                this.events.emit('step4-correct');
                                // complete
                                this.CompleteStep4();
                            }
                        }
                        else
                        {
                            // wrong item
                            //this.events.emit('step4-wrong');
                            this.sound.play('wrong');
                        }
                        break;
                    }
                }
                if (!correct)
                {
                    // reset position
                    itemImg.x = 0;
                    itemImg.y = 0;
                }
            });
            // fade in
            this.tweens.add({
                targets: item,
                alpha: {from: 0, to: 1},
                duration: 500
            });

            this.step4Draggables.push(itemImg);
            this.step4Items.push(item);
            this.step4Group.add(item);
        }
        
        this.step4Group.add(step4BG);

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


    PlayStep4RemainingVideoAndEnd()
    {
        // play item video
        if (this.step4NextTarget < this.step4Videos.length)
        {
            if (!this.step4Videos[this.step4NextTarget].isPlaying())
            { 
                this.LoadUrlForVideoAndPlay(this.step4Videos[this.step4NextTarget], 'assets/video/B/B4_item' + (this.step4NextTarget + 1) + '.mp4');
            }
            this.step4Videos[this.step4NextTarget].off('complete');
            this.step4Videos[this.step4NextTarget].once('complete', () => {       
                this.step4NextTarget++;
                this.PlayStep4RemainingVideoAndEnd();
            });
        }
        else
        {      
            this.events.emit('step-end');  
                        
            const end = this.add.video(960, 540);//, 'A4-end');     
            end.setScale(1.5);                

            this.LoadUrlForVideoAndPlay(end, this.language === 0 ? 'assets/video/B/B4.mp4' : 'assets/video/B/B4_en.mp4');

            end.once('complete', () => {
                end.destroy();
                this.step4Group.destroy(true, true);
                this.StartStep5();
            });
        }
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
        this.step4Items.forEach((item) => { item.setVisible(false); });
        this.step4Targets.forEach((target) => {
            target.rects.forEach((rect) => { rect.setVisible(false); });
            this.tweens.killTweensOf(target.rects);
        });
                        
        this.PlayStep4RemainingVideoAndEnd();
    }

    StartStep5()
    {
        this.events.emit('step5-start');
        this.events.emit('step5-intro');

        const step5BG = this.add.image(960, 540, 'B-step5', 'bg');
        step5BG.setScale(1.5);
        
        var firstTrial = true;
        var selectedItem = -1;
        var nextItem = 0;

        // part 1
        this.step5ConfirmBtn = this.CreateConfirmButton();
        this.step5ConfirmBtn.setVisible(false);

        var posX = 1100;
        var stepX = 500;
        var posY = 990;
        var posYOnSelect = 850;
        var confirmPosY = 950;
        this.step5Items = [];
        for (let i = 0; i < 2; i++)
        {
            const itemBtn = this.add.container(posX + i * stepX, posY);
            const item = this.add.image(0, 0, 'B-step5', 'item' + (i+1));
            item.setDisplaySize(480, 480);
            item.setAngle(45);
            const itemTextBG = this.add.image(0, 0, 'common', this.language === 0 ? 'textBG-cht' : 'textBG-eng');
            const itemText = this.add.image(0, 0, 'B-step5', this.language === 0 ? 'item' + (i+1) + '_text' : 'item' + (i+1) + '_text_en');
            itemBtn.add([item, itemTextBG, itemText]);

            itemBtn.setSize(500, 550);
            itemBtn.setInteractive();

            itemBtn.on('pointerdown', () => {
                this.sound.play('click');
                // reset positions
                this.step5Items.forEach((item) => { this.tweens.add({ targets: item, y: posY, duration: 500 }); });
                this.tweens.add({ targets: itemBtn, y: posYOnSelect, duration: 500 });
                this.step5ConfirmBtn.setPosition(posX + i * stepX, confirmPosY);
                this.step5ConfirmBtn.setVisible(true);
                selectedItem = i;
            });
            // fade in
            this.tweens.add({
                targets: itemBtn,
                alpha: {from: 0, to: 1},
                duration: 500
            });

            this.step5Items.push(itemBtn);
            this.step5Group.add(itemBtn);
        }

        this.step5ConfirmBtn.on('pointerdown', () => {
            this.sound.play('click');
            this.step5ConfirmBtn.setVisible(false);
            if (selectedItem === nextItem)
            {
                if (nextItem === 1 && firstTrial)
                {
                    // 5th award
                    this.awards[4] = 1;
                    this.events.emit('award');
                }
                //this.events.emit('step1-correct2');
                this.sound.play('correct');
                this.StartStep5Paint(nextItem);
            }
            else
            {
                // incorrect
                firstTrial = false;
                this.sound.play('wrong');
                // reset positions
                this.step5Items.forEach((item) => { this.tweens.add({ targets: item, y: posY, duration: 500 }); });                
            }
        });

        // part 2
        this.step5Wax = this.add.image(960, 540, 'B-step5', 'item1');
        this.step5Wax.setOrigin(0.5, 0.76);
        this.step5Wax.setDisplaySize(300, 300);
        this.step5Wax.setDepth(1);
        this.step5Wax.setVisible(false);

        this.step5Stone = this.add.image(960, 540, 'B-step5', 'stone_top');
        this.step5Stone.setOrigin(0.5, 0.52);
        this.step5Stone.setDisplaySize(300, 300);
        this.step5Stone.setDepth(1);
        this.step5Stone.setVisible(false);

        this.step5ProgressUI = this.add.container(1520, 590);
        this.step5ProgressValue = this.add.text(30, 20, '0', { 
            font: '800 120px Times New Roman', 
            fill: '#ffffff', 
            align: 'right'
        }).setOrigin(1, 1);
        const progressPercent = this.add.text(50, 0, '%', { 
            font: '800 60px Times New Roman', 
            fill: '#ffffff', 
            align: 'left'
        }).setOrigin(0, 1);
        const arrow = this.add.image(0, -150, 'common', 'arrow');
        arrow.setAngle(180);
        arrow.setScale(0.6);
        const progressText = this.add.image(0, 80, 'common', this.language === 0 ? 'progress-cht' : 'progress-eng');
        this.step5ProgressUI.add([this.step5ProgressValue, progressPercent, arrow, progressText]);
        this.step5ProgressUI.setVisible(false);

        //const guideline = this.add.image(0, 0, 'A3-guideline');
        //const reveal = this.add.image(0, 0, 'A3-revealmark');
        var points = [ 
            { x: -364, y: 213 },
            { x: -390, y: 130 },
            { x: -405, y: 26 },
            { x: -402, y: -86 },
            { x: 217, y: 172 },
            { x: -370, y: -182 },
            { x: -299, y: -234 },
            { x: -210, y: -92 },
            { x: -232, y: -187 },
            { x: -198, y: 10 },
            { x: -188, y: 112 },
            { x: -152, y: 209 },
            { x: -81, y: 175 },
            { x: -68, y: 79 },
            { x: -54, y: -24 },
            { x: -32, y: -132 },
            { x: 20, y: -210 },
            { x: 69, y: -161 },
            { x: 85, y: -75 },
            { x: 92, y: 9 },
            { x: 102, y: 93 },
            { x: 122, y: 173 },
            { x: 164, y: 226 },
            { x: 261, y: -7 },
            { x: 245, y: 88 },
            { x: 273, y: -96 },
            { x: 296, y: -177 },
            { x: 356, y: -192 },
            { x: 386, y: -105 },
            { x: 391, y: -9 },
            { x: 386, y: 96 },
            { x: 371, y: 185 }
        ];
        this.step5Reveal = new RevealImage(this, 890, 555, 'B-step5', 'guideline', 'wax_rub', 230, points, 100, (progress) => {
            //console.log(progress);
            this.step5ProgressValue.text = Math.round(progress * 100);
            if (progress >= 0.999)
            {
                this.sound.play('correct');
                if (nextItem === 0)
                {
                    nextItem++;
                    this.events.emit('step5-correct');
                    this.sound.play('correct');
                    this.step5Reveal.Reset();
                    this.step5Wax.setVisible(false);
                    this.step5ProgressUI.setVisible(false);
                    this.step5Items[nextItem].setInteractive();
                }
                else
                {
                    // 6th award
                    this.awards[5] = 1;
                    this.events.emit('award');
                    this.events.emit('step5-correct2');
                    this.sound.play('correct');
                    this.CompleteStep5();
                }
            }
        });
        
        this.step5Group.add(step5BG);
        this.step5Group.add(this.step5Wax);
        this.step5Group.add(this.step5Stone);
        this.step5Group.add(this.step5ConfirmBtn);
        this.step5Group.add(this.step5ProgressUI);
        this.step5Group.add(this.step5Reveal);
        
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

    StartStep5Paint(itemID)
    {        
        this.step5Items.forEach((item, id) => { 
            item.disableInteractive();
            if (id === itemID)
                item.setVisible(false); 
        });
        this.step5ConfirmBtn.setVisible(false);

        var currentitem = (itemID === 0) ? this.step5Wax : this.step5Stone;
        currentitem.setVisible(true);

        this.step5ProgressUI.setVisible(true);
        this.step5ProgressValue.text = 0;
        this.tweens.add({
            targets: this.step5ProgressUI,
            alpha: { from: 0, to: 1 },
            duration: 1000
        });

        this.step5Reveal.Start();

        this.input.on('pointermove', (pointer) => {
            if (pointer.isDown)
            {
                currentitem.x = pointer.x;
                currentitem.y = pointer.y;
            }
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
        this.step5Items.forEach((item) => { item.setVisible(false); });
        this.step5Wax.setVisible(false);
        this.step5Stone.setVisible(false);
        this.step5ProgressUI.setVisible(false);
        this.step5ConfirmBtn.setVisible(false);
        this.input.off('pointermove');

        // auto complete the reveal image
        this.step5Reveal.Complete();

        const end = this.add.video(960, 540);
        end.setScale(1.5);
        
        this.time.delayedCall(2500, () => { 
            this.events.emit('step-end');
            this.LoadUrlForVideoAndPlay(end, 'assets/video/B/B5.mp4');
            //end.loadURL('assets/video/B/A5.mp4', true);
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
        this.events.emit('step6-start');
        this.events.emit('step6-intro');        
        
        this.time.delayedCall(3000, () => { this.events.emit('step6-intro2'); });

        var firstTrial = true;
        this.step6NextTarget = 0;

        const step6BG = this.add.image(960, 540, 'B-step6', 'bg');
        step6BG.setScale(1.5);

        const rect1a = this.add.rectangle(1600, 560, 65, 565, 0xA8CFA5);

        const rect2a = this.add.rectangle(263, 556, 70, 565, 0xA8CFA5);

        this.step6Targets = [
            { rects: [rect1a], item: 1 },
            { rects: [rect2a], item: 2 }
        ];

        this.step6Targets.forEach((target, id) => {
            target.rects.forEach((rect) => { 
                rect.setVisible(id === this.step6NextTarget); 
                rect.setDepth(1);
                this.step6Group.add(rect);
                if (id === this.step6NextTarget)
                    this.tweens.add({ 
                        targets: rect, 
                        alpha: { from: 0.5, to: 1 },
                        duration: 500,
                        repeat: -1,
                        yoyo: true
                    });
            });
        });

        var posXList = [1080, 1750, 1410];
        //var posX = 760;
        //var stepX = 330;
        var posY = 1120;
        this.step6Items = [];
        this.step6Draggables = [];
        this.step6Videos = [];
        this.step6Videos.push(this.add.video(960, 540));
        this.step6Videos.forEach((video) => { 
            video.setScale(1.5); 
            this.step6Group.add(video);
        });
        for (let i = 0; i < 3; i++)
        {
            console.log('step6');
            const item = this.add.container(posXList[i], posY);
            const itemImg = this.add.image(50, -300, 'B-step6', 'item' + i);
            itemImg.setOrigin(0.5, 0);
            const itemTextBG = this.add.image(0, -150, 'common', this.language === 0 ? 'textBG-cht' : 'textBG-eng');
            const itemText = this.add.image(0, -150, 'B-step6', this.language === 0 ? 'text' + i : 'text' + i + '_en');
            item.add([itemImg, itemTextBG, itemText]);
            item.setDepth(2);

            itemImg.setInteractive();
            this.input.setDraggable(itemImg);
            itemImg.on('drag', (pointer, dragX, dragY) => {
                itemImg.x = dragX;
                itemImg.y = dragY;
            });
            itemImg.on('dragend', (pointer, dragX, dragY) => {

                const target = this.step6Targets[this.step6NextTarget];
                let correct = false;
                for (let a = 0; a < target.rects.length; a++)
                {
                    if(Phaser.Geom.Intersects.RectangleToRectangle(itemImg.getBounds(), target.rects[a].getBounds()))
                    {
                        if (target.item === i)
                        {
                            // correct item
                            correct = true;
                            this.sound.play('correct');

                            item.setVisible(false);
                            itemImg.off('drag');
                            itemImg.off('dragend');
                            let targetID = this.step6NextTarget;
                            this.step6Targets.forEach((target) => {
                                target.rects.forEach((rect) => { 
                                    rect.setVisible(false); 
                                    this.tweens.killTweensOf(rect);
                                });
                            });
                            
                            this.step6Draggables.forEach((item) => { item.disableInteractive(); })
                            if (this.step6NextTarget < this.step6Videos.length)
                            {
                                // play video
                                this.LoadUrlForVideoAndPlay(this.step6Videos[targetID], 'assets/video/B/B6.mp4');
                                
                                this.step6Videos[targetID].once('complete', () => {
                                    // enable draggables
                                    this.step6NextTarget++;
                                    this.step6Draggables.forEach((item, id) => { 
                                        if (id === 0 || id >= this.step6NextTarget) 
                                            item.setInteractive(); 
                                    });
                                    // show target rects
                                    this.step6Targets.forEach((target, id) => {
                                        target.rects.forEach((rect) => { 
                                            rect.setVisible(id === this.step6NextTarget); 
                                            if (id === this.step6NextTarget)
                                                this.tweens.add({ 
                                                    targets: rect, 
                                                    alpha: { from: 0.5, to: 1 },
                                                    duration: 500,
                                                    repeat: -1,
                                                    yoyo: true
                                                });
                                        });
                                    });
                                });
                            }
                            else
                            {
                                // all target completed
                                if (firstTrial)
                                {
                                    // 7th award
                                    this.awards[6] = 1;
                                    this.events.emit('award');
                                }
                                // 8th award
                                this.awards[7] = 1;
                                this.events.emit('award');
                                this.events.emit('step6-correct');
                                // complete
                                this.CompleteStep6();
                            }
                        }
                        else
                        {
                            firstTrial = false;
                            // wrong item
                            if (this.step6NextTarget === 0)
                                this.events.emit('step6-wrong');
                            this.sound.play('wrong');
                        }
                        break;
                    }
                }
                if (!correct)
                {
                    // reset position
                    itemImg.x = 50;
                    itemImg.y = -300;
                }
            });
            // fade in
            this.tweens.add({
                targets: item,
                alpha: {from: 0, to: 1},
                duration: 500
            });

            this.step6Draggables.push(itemImg);
            this.step6Items.push(item);
            this.step6Group.add(item);
        }
        
        this.step6Group.add(step6BG);

        // timer update
        this.events.emit('timer-update', this.timeLimits[5], 0); // init timer
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
                        this.CompleteStep6(); 
                    }
                },
                repeat: this.timeLimits[5]
            });
        });
    }

    PlayStep6RemainingVideoAndEnd()
    {
        // play item video
        if (this.step6NextTarget < this.step6Videos.length)
        {
            if (!this.step6Videos[this.step6NextTarget].isPlaying())
            {
                this.LoadUrlForVideoAndPlay(this.step6Videos[this.step6NextTarget], 'assets/video/B/B6.mp4');
            }
            this.step6Videos[this.step6NextTarget].off('complete');
            this.step6Videos[this.step6NextTarget].once('complete', () => {       
                this.step6NextTarget++;
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
        this.time.removeAllEvents();6

        // remove interactives
        this.step6Items.forEach((item) => { item.setVisible(false); });
        this.step6Targets.forEach((target) => {
            target.rects.forEach((rect) => { rect.setVisible(false); });
            this.tweens.killTweensOf(target.rects);
        });
                        
        this.PlayStep6RemainingVideoAndEnd();          
    }

    StartEnding()
    {
        const ending = this.add.video(960, 540);//, 'gameB-end');
        ending.setScale(1.5);
        //const endingText = new LocalizedImage(this, 960, 540, 'gameB-end-cht', 'gameB-end-eng');
        //endingText.setScale(1.5);
        //endingText.SetLocalization(this.language);     
        const endingText = this.add.image(960, 540, 'B-intro_end', this.language === 0 ? 'gameB-end-cht' : 'gameB-end-eng');
        endingText.setScale(1.5);
        endingText.alpha = 0;

        this.LoadUrlForVideoAndPlay(ending, 'assets/video/B/GameBEnd.mp4');
        //ending.loadURL('assets/video/B/GameBEnd.mp4', true);
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
            let arrow = this.add.image(380, 550, 'B-intro_end', 'gameB-arrow');
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

        const bg = this.add.image(960, 540, 'B-result', 'bg');
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
            {x: 1450, y: 280},
            {x: 1520, y: 540},
            {x: 1450, y: 800},
            {x: 950, y: 1020},
            {x: 450, y: 800},
            {x: 340, y: 540},
            {x: 450, y: 280}
        ];

        var awardCount = 0;
        for (let i = 0; i < 8; i++)
        {
            const icon = this.add.image(iconPosList[i].x, iconPosList[i].y, 'B-result', 'icon');
            const text = this.add.image(textPosList[i].x, textPosList[i].y, 'B-result', this.language === 0 ? 'award' + (i+1) : 'award' + (i+1) + '_en');
            icon.setDepth(1);
            text.setDepth(1);

            let a = this.awards[i] ? 1 : 0.5;
            
            if (this.awards[i])
                awardCount++;

            this.tweens.add({
                targets: [icon, text],
                alpha: { from: 0, to: a },
                duration: 1000
            });
        }

        if (awardCount < 3)
            var rank = this.add.image(950, 720, 'B-result', this.language === 0 ? 'Rank3' : 'Rank3_en');
        else if (awardCount < 7)
            rank = this.add.image(950, 720, 'B-result', this.language === 0 ? 'Rank2' : 'Rank2_en');
        else
            rank = this.add.image(950, 720, 'B-result', this.language === 0 ? 'Rank1' : 'Rank1_en');

        this.tweens.add({
            targets: [bg, rank],
            alpha: { from: 0, to: 1 },
            duration: 1000
        });
    }

    CreateConfirmButton()
    {
        const button = this.add.container();
        const bg = this.add.image(0, 0, 'common', 'button');
        //const text = new LocalizedImage(this, 0, 0, 'confirm-cht', 'confirm-eng');
        //text.SetLocalization(this.language);
        const text = this.add.image(0, 0, 'common', this.language === 0 ? 'confirm-cht' : 'confirm-eng');
        button.add([bg, text]);

        button.setSize(bg.width, bg.height);
        button.setDepth(1); // bring to top
        button.setInteractive();

        return button;
    }

    CreateArrow(x, y, angle, scale = 1, duration = 1500)
    {
        const container = this.add.container(x, y);
        const arrow = this.add.image(0, 0, 'common', 'arrow');
        arrow.angle = angle;
        let rect = this.add.rectangle(0, 0, 0, arrow.height);
        arrow.setCrop(rect);
        container.setScale(scale);

        this.tweens.add({                
            targets: rect,        
            width: { from: 0, to: arrow.width },
            duration: duration,
            repeat: -1,
            onUpdate: () => arrow.setCrop(rect)
        });

        container.add([arrow, rect]);
        return container;
    }

    ReturnHome()
    {
        console.log('GameB: ReturnHome()');

        var overlay = this.add.graphics();
        overlay.fillStyle(0x000000, 0.8);
        overlay.fillRect(0, 0, 1920, 1080);

        this.tweens.killAll();
        this.time.removeAllEvents();
        this.sound.stopAll();
        this.events.removeAllListeners();

        this.scene.stop('GameB-Tutor');
        this.scene.stop('GameB-UI');
        this.scene.stop();
        
        this.sound.play('click');

        location.reload();
    }

    LoadUrlForVideoAndPlay(video, url)
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
