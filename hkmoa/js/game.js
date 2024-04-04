import { Scene } from 'phaser';

export class Main extends Scene
{
    constructor ()
    {
        super('Main');
        this.language = 0;
    }

    preload ()
    {
        var progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 1);
        progressBox.fillRect(500, 500, 920, 80);
        var progressBar = this.add.graphics();
        var loadingText = this.make.text({
            x: 960,
            y: 420,
            text: '\n載入中...\nLoading...\n',
            style: {
                font: '30px Courier',
                fill: '#ffffff',
                align: 'center',
                lineSpacing: 20,
                wordWrap: { width: 1200, useAdvancedWrap: true }
            }
        });
        loadingText.setOrigin(0.5, 0.5);

        ////////////////////
        // main
        ////////////////////

        // video
        this.load.video('cover', 'assets/video/Cover.mp4', true);
        this.load.video('trigger', 'assets/video/Trigger.mp4', true);

        // audio / sound
        //this.load.audio('bgm', 'assets/audio/bgm.wav');
        this.load.audio('click', 'assets/audio/Click.wav');
        this.load.audio('correct', 'assets/audio/Win.wav');
        this.load.audio('wrong', 'assets/audio/Wrong.wav');

        // sprite sheets
        //this.load.atlas('particle', 'assets/image/particle.png', 'assets/image/particle.json');
        this.load.atlas('award', 'assets/image/award.png', 'assets/image/award.json');
        this.load.atlas('timesup', 'assets/image/timesup.png', 'assets/image/timesup.json');

        // images
        this.load.image('coverText', 'assets/image/Cover/Cover-text.png');
        this.load.image('chtBtn', 'assets/image/Cover/CN-Disable.png');
        this.load.image('engBtn', 'assets/image/Cover/EN-Disable.png');
        this.load.image('chtBtnOn', 'assets/image/Cover/CN-Enable.png');
        this.load.image('engBtnOn', 'assets/image/Cover/EN-Enable.png');
        this.load.image('chtMenu', 'assets/image/Cover/CN-Menu.png');
        this.load.image('engMenu', 'assets/image/Cover/EN-Menu.png');
        
        this.load.image('homeBtn', 'assets/image/Home.png');
        this.load.image('button', 'assets/image/confirmButton.png');
        this.load.image('confirm-cht', 'assets/image/confirm_text.png');
        this.load.image('confirm-eng', 'assets/image/confirm_text_en.png');
        this.load.image('textBG-cht', 'assets/image/text_bg.png');
        this.load.image('textBG-eng', 'assets/image/text_bg_en.png');
        this.load.image('brush', 'assets/image/reveal_brush.png');
        this.load.image('arrow', 'assets/image/arrow.png');
        this.load.image('progress-cht', 'assets/image/progress.png');
        this.load.image('progress-eng', 'assets/image/progress_en.png');

        ////////////////////
        // Game A
        ////////////////////

        // intro and videos
        this.load.video('gameA', 'assets/video/GameA.mp4', true);
        this.load.image('gameA-intro-cht', 'assets/image/A/intro/intro.png');
        this.load.image('gameA-intro-eng', 'assets/image/A/intro/intro_en.png');
        this.load.image('gameA-arrow', 'assets/image/A/intro/Arrow.png');

        this.load.video('A1-end', 'assets/video/A/A1.mp4', true);
        this.load.video('A3-end', 'assets/video/A/A3.mp4', true);
        this.load.video('A4-end', 'assets/video/A/A4.mp4', true);
        this.load.video('A5-end', 'assets/video/A/A5.mp4', true);
        this.load.video('gameA-end', 'assets/video/A/GameAEnd.mp4', true);

        // ui
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

        // tutor        
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


        this.load.on('progress', function (value) {
            //console.log(value);
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(510, 510, 900 * value, 60);
            
        });
                    
        //this.load.on('fileprogress', function (file) {
        //    console.log(file.src);
        //});

        this.load.on('complete', function () {
            console.log('loading completed');
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
        });
    }

    create ()
    {
        this.time.delayedCall(500, () => {
            this.scale.setParentSize(window.innerWidth, window.innerHeight);
            //this.registry.set('language', this.language);
            //this.cover = this.add.video(960, 540, 'cover');
            //this.cover.setScale(1.5);                
            //this.cover.play(true);
        // grand manual focus on the game canvas
        //this.cover.on('locked', () => {
            let messageBG = this.add.rectangle(960, 540, 1920, 1080, '#000000', 0.8);
            let message = this.add.text(960, 540, 
                '\n遊戲最佳解像度為1920x1080，如你正在使用 手機/平板電腦等流動裝置，建議啟用 自動旋轉螢幕/橫向模式 以換取較好遊戲體驗。\n\n點擊繼續\n\n\n\
                The game is best fit in 1920x1080, you could enable Auto-Rotate/Landscape if you are running on a mobile device to gain better experience.\n\nTouch to continue', 
                { 
                    font: '32px Courier', 
                    fill: '#ffffff', 
                    align: 'center',
                    lineSpacing: 20,
                    wordWrap: { width: 1200, useAdvancedWrap: true }
                }).setShadow(1, 1).setOrigin(0.5);
           
            messageBG.setInteractive();
            messageBG.on('pointerdown', () => {

                messageBG.destroy();
                message.destroy();
                console.log('Calling StartCover');
                this.StartCover();
            });
        });    
        //});
    }

    StartCover()
    { 
        console.log('StartCover');
        this.scale.setParentSize(window.innerWidth, window.innerHeight);
        this.cover = this.add.video(960, 540, 'cover');
        this.cover.setScale(1.5);                
        this.cover.play(true);

        //this.sound.play('bgm', { loop: true });

        const trigger = this.add.video(960, 540, 'trigger');
        trigger.setScale(1.5);
        const coverText = this.add.image(960, 800, 'coverText');

        this.tweens.add({
            targets: coverText,
            alpha: { from: 1, to: 0 },
            ease: 'Sine.InOut',
            duration: 1000,
            repeat: -1,
            yoyo: true
        });


        //  Listen for the 'play' event to create our pause/resume handler
        //cover.once('play', () => {

            this.input.once('pointerdown', () => {

                console.log('pointerdown');

                this.sound.play('click');

                this.cover.destroy();
                coverText.destroy();
                trigger.play();
                trigger.once('complete', () => {

                    let homeButton = this.add.image(149, 138, 'homeBtn');
                    homeButton.setInteractive();
                    homeButton.on('pointerdown', () => {

                        homeButton.disableInteractive();
                        this.sound.stopAll();
                        this.sound.play('click');
                        this.scene.restart();
                    });
                    

                    let chtButton = this.add.image(1690, 120, 'chtBtn');
                    let engButton = this.add.image(1800, 120, 'engBtn');
                    let menu = this.add.image(960, 540, 'chtMenu');
                    let gameAButton = this.add.rectangle(550, 600, 500, 580, 0x000000, 0);

                    chtButton.setDisplaySize(80, 80);
                    engButton.setDisplaySize(80, 80);
                    if (this.language === 0) 
                    {
                        chtButton.setTexture('chtBtnOn');
                    }
                    else
                    {
                        engButton.setTexture('engBtnOn');
                        menu.setTexture('engMenu');
                    }
                    chtButton.setInteractive();
                    engButton.setInteractive();

                    chtButton.on('pointerdown', () => { 

                        this.sound.play('click');

                        this.language = 0;
                        chtButton.setTexture('chtBtnOn');
                        engButton.setTexture('engBtn');
                        menu.setTexture('chtMenu');                        

                    });

                    engButton.on('pointerdown', () => { 

                        this.sound.play('click');

                        this.language = 1;
                        chtButton.setTexture('chtBtn');
                        engButton.setTexture('engBtnOn');
                        menu.setTexture('engMenu');                        

                    });

                    gameAButton.setInteractive();
                    gameAButton.on('pointerdown', () => { 

                        gameAButton.disableInteractive();
                        this.sound.play('click');
                        //trigger.destroy();

                        // launch and remove this scene later to prevent dark screen
                        this.scene.launch('GameA', { language: this.language });                        
                        this.time.delayedCall(5000, () => { this.scene.stop(); });     
                    });
                });

            });

        //});
    }
}
