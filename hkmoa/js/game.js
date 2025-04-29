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
        this.load.image('coverBG', 'assets/image/Cover/cover.png');    
    }

    // load after landing cover is loaded and displayed
    postLoad()
    {
        var progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.7);
        progressBox.fillRect(500, 950, 920, 40);
        var progressBar = this.add.graphics();
        
        ////////////////////
        // main
        ////////////////////

        // video
        //this.load.video('cover', 'assets/video/Cover.mp4', true);
        //this.load.video('trigger', 'assets/video/Trigger.mp4', true);

        // audio / sound
        //this.load.audio('bgm', 'assets/audio/bgm.wav');
        this.load.audio('click', 'assets/audio/Click.wav');
        this.load.audio('correct', 'assets/audio/Win.wav');
        this.load.audio('wrong', 'assets/audio/Wrong.wav');

        // sprite sheets
        //this.load.atlas('particle', 'assets/image/particle.png', 'assets/image/particle.json');
        //this.load.atlas('award', 'assets/image/award.png', 'assets/image/award.json');
        //this.load.atlas('timesup', 'assets/image/timesup.png', 'assets/image/timesup.json');
        this.load.atlas('common', 'assets/image/common.png', 'assets/image/common.json');

        /*
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
*/
        
        this.load.on('progress', function (value) {
            //console.log(value);
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 0.7);
            progressBar.fillRect(510, 960, 900 * value, 20);
            
        });
                    
        //this.load.on('fileprogress', function (file) {
        //    console.log(file.src);
        //});

        this.load.once('complete', () => {
            console.log('loading completed');
            progressBar.destroy();
            progressBox.destroy();
        });
        this.load.start();
    }

    create ()
    {
        this.coverBG = this.add.image(960, 540, 'coverBG');
        this.coverBG.setDisplaySize(1920, 1080);  
        this.tweens.add({
            targets: this.coverBG, 
            alpha: {from: 0, to: 1}, 
            duration: 500,
            callbacks: () => { this.postLoad(); }
        });
        /*
        this.log = this.add.text(960, 540, 
            'Debug message', 
            { 
                font: '50px Georgia', 
                fill: '#ff0000', 
                align: 'center',
            });
        this.log.setDepth(10);
        */

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
                    font: '32px Georgia', 
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
            
            this.tweens.add({targets: messageBG, alpha: {from: 0, to: 1}, duration: 500});
        });    
        //});
    }

    StartCover()
    { 
        console.log('StartCover');
        this.scale.setParentSize(window.innerWidth, window.innerHeight);
        this.cover = this.add.video(960, 540);//, 'cover');
        this.LoadUrlForVideo(this.cover, 'assets/video/Cover.mp4');
        //this.cover.loadURL('assets/video/Cover.mp4', true);
        this.cover.setScale(1.5);
        this.cover.play(true);

        //this.sound.play('bgm', { loop: true });

        //const trigger = this.add.video(960, 540, 'trigger');
        //trigger.setScale(1.5);
        
        const coverText = this.add.image(960, 800, 'common', 'coverText');

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

                //this.cover.destroy();
                coverText.destroy();
                this.LoadUrlForVideo(this.cover, 'assets/video/Trigger.mp4');
                //this.cover.loadURL('assets/video/Trigger.mp4', true);
                this.cover.play(false);
                this.cover.once('complete', () => {

                    let homeButton = this.add.image(149, 138, 'common', 'homeBtn');
                    homeButton.setInteractive();
                    homeButton.on('pointerdown', () => {

                        homeButton.disableInteractive();
                        this.sound.stopAll();
                        this.sound.play('click');
                        this.scene.restart();
                    });
                    

                    let chtButton = this.add.image(1690, 120, 'common', 'chtBtn');
                    let engButton = this.add.image(1800, 120, 'common', 'engBtn');
                    let menu = this.add.image(960, 540, 'common', 'chtMenu');
                    let gameAButton = this.add.rectangle(550, 600, 500, 580, 0x000000, 0);
                    let gameBButton = this.add.rectangle(1380, 600, 500, 580, 0x000000, 0);

                    chtButton.setDisplaySize(80, 80);
                    engButton.setDisplaySize(80, 80);
                    if (this.language === 0) 
                    {
                        chtButton.setTexture('common', 'chtBtnOn');
                    }
                    else
                    {
                        engButton.setTexture('common', 'engBtnOn');
                        menu.setTexture('common', 'engMenu');
                    }
                    chtButton.setInteractive();
                    engButton.setInteractive();

                    chtButton.on('pointerdown', () => { 

                        this.sound.play('click');

                        this.language = 0;
                        chtButton.setTexture('common', 'chtBtnOn');
                        engButton.setTexture('common', 'engBtn');
                        menu.setTexture('common', 'chtMenu');                        

                    });

                    engButton.on('pointerdown', () => { 

                        this.sound.play('click');

                        this.language = 1;
                        chtButton.setTexture('common', 'chtBtn');
                        engButton.setTexture('common', 'engBtnOn');
                        menu.setTexture('common', 'engMenu');                        

                    });

                    gameAButton.setInteractive();
                    gameAButton.on('pointerdown', () => { 

                        gameAButton.disableInteractive();
                        gameBButton.disableInteractive();
                        homeButton.disableInteractive();
                        chtButton.disableInteractive();
                        engButton.disableInteractive();

                        this.sound.play('click');
                        //trigger.destroy();
                        
                        // launch and remove this scene later to prevent dark screen
                        this.scene.launch('GameA', { language: this.language });                        
                        //this.time.delayedCall(5000, () => { this.scene.stop(); });     
                    });

                    gameBButton.setInteractive();
                    gameBButton.on('pointerdown', () => { 

                        gameAButton.disableInteractive();
                        gameBButton.disableInteractive();
                        homeButton.disableInteractive();
                        chtButton.disableInteractive();
                        engButton.disableInteractive();

                        this.sound.play('click');
                        
                        // launch and remove this scene later to prevent dark screen
                        this.scene.launch('GameB', { language: this.language });       
                    });
                });

            });

        //});
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
        video.loadURL(url, true);
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
