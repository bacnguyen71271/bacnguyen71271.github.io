var GAME_NAME = [ 'HOMA ĐẬP CHUỘT', 'HOMA ĐUỔI HÌNH BẮT CHỮ', 'HOMA LÀM TOÁN', 'HOMA HỌC TIẾNG ANH'];

var GAME_CHOOSE = 1;

function ScreenChooseGame() {

    var _Listener;
    var _CartToggle;

    var _Fade;
    var _ButtonBack;
    var _LineGameStatus0 = [];
    var _LineGameStatus1 = [];
    var _GameLock = [];
    var _GameUnLock = [];
    var _GameChoose = [];
    var _GameAvatar = [];

    var _GameNameLayer;

    var _GameUnLocked = 4;
    
    
    var _HeightGameStatus = -285;

    this.init = function() {

        var oModePos = {x: CANVAS_WIDTH/2, y: 875};

        // Add background
        _Bg = createBitmap(s_oSpriteLibrary.getSprite('ldp_background'));
        s_oStage.addChild(_Bg);


        // Overlay Layout
        _Fade = new createjs.Shape()
        _Fade.graphics.beginFill('black').drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
        _Fade.alpha = 0.6
        s_oStage.addChild(_Fade);
        _Listener = _Fade.on("click", function () {});


        // Add Background
        var oSprite = s_oSpriteLibrary.getSprite('bg_back');
        _pBackPos = {x: (oSprite.width/2) + 30, y: (oSprite.height/2) + 30}; 
        _ButtonBack = new CTextButton(_pBackPos.x, _pBackPos.y , oSprite, 'QUAY LẠI', "showcard", "#fff", 35, s_oStage);        
        _ButtonBack.addEventListener(ON_MOUSE_UP, s_ChooseGame.screenBack, this);

        var doc = window.document;
        var docEl = doc.documentElement;
        _fRequestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
        _fCancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;


        // Add Audio Button
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            var oSprite = s_oSpriteLibrary.getSprite('audio_icon');
            _pStartPosAudio = {x: CANVAS_WIDTH - (oSprite.height/2) - 30, y: (oSprite.height/2) + 30};
            
            _oAudioToggle = new CToggle(_pStartPosAudio.x,_pStartPosAudio.y,oSprite,s_bAudioActive);
            _oAudioToggle.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this);    
        }

        // Add Cart Button
        var oSprite = s_oSpriteLibrary.getSprite('cart_icon');
        _pCartPos = {x: CANVAS_WIDTH - (oSprite.height/2) - 30, y: (oSprite.height/2) + 30};
        _ButtonCart = new CGfxButton(_pCartPos.x, _pCartPos.y, oSprite, s_oStage);
        _ButtonCart.addEventListener(ON_MOUSE_UP, () => {}, this);    


        // Add Background Level Game       
        new CGImage(oModePos.x, oModePos.y - 280, s_oSpriteLibrary.getSprite('bg_level'), s_oStage);

        // Add Line Connect Level
        _LineGameStatus0.push(new CGImage(oModePos.x - 140, oModePos.y + _HeightGameStatus, s_oSpriteLibrary.getSprite('game_status_0_1'), s_oStage));
        _LineGameStatus0.push(new CGImage(oModePos.x + 10, oModePos.y + _HeightGameStatus, s_oSpriteLibrary.getSprite('game_status_0_2'), s_oStage));
        _LineGameStatus0.push(new CGImage(oModePos.x + 150, oModePos.y + _HeightGameStatus, s_oSpriteLibrary.getSprite('game_status_0_3'), s_oStage));

        _LineGameStatus1.push(new CGImage(oModePos.x - 140, oModePos.y + _HeightGameStatus, s_oSpriteLibrary.getSprite('game_status_1_1'), s_oStage));
        _LineGameStatus1.push(new CGImage(oModePos.x + 10, oModePos.y + _HeightGameStatus, s_oSpriteLibrary.getSprite('game_status_1_2'), s_oStage));
        _LineGameStatus1.push(new CGImage(oModePos.x + 150, oModePos.y + _HeightGameStatus, s_oSpriteLibrary.getSprite('game_status_1_3'), s_oStage));
        _LineGameStatus1.forEach((el)=>{ el.setVisible(false) })

        _GameLock.push(new CGImage(oModePos.x - 210, oModePos.y + _HeightGameStatus, s_oSpriteLibrary.getSprite('game_block'), s_oStage));
        _GameLock.push(new CGImage(oModePos.x - 66.7, oModePos.y + _HeightGameStatus, s_oSpriteLibrary.getSprite('game_block'), s_oStage));
        _GameLock.push(new CGImage(oModePos.x + 76.6, oModePos.y + _HeightGameStatus, s_oSpriteLibrary.getSprite('game_block'), s_oStage));
        _GameLock.push(new CGImage(oModePos.x + 220, oModePos.y + _HeightGameStatus, s_oSpriteLibrary.getSprite('game_block'), s_oStage));

        _GameUnLock.push(new CGImage(oModePos.x - 210, oModePos.y + _HeightGameStatus, s_oSpriteLibrary.getSprite('game_active'), s_oStage));
        _GameUnLock.push(new CGImage(oModePos.x - 66.7, oModePos.y + _HeightGameStatus, s_oSpriteLibrary.getSprite('game_active'), s_oStage));
        _GameUnLock.push(new CGImage(oModePos.x + 76.6, oModePos.y + _HeightGameStatus, s_oSpriteLibrary.getSprite('game_active'), s_oStage));
        _GameUnLock.push(new CGImage(oModePos.x + 220, oModePos.y + _HeightGameStatus, s_oSpriteLibrary.getSprite('game_active'), s_oStage));
        _GameUnLock.forEach((el)=>{ el.setVisible(false) })

        _GameChoose.push(new CGImage(oModePos.x - 210, oModePos.y + _HeightGameStatus, s_oSpriteLibrary.getSprite('game_select'), s_oStage));
        _GameChoose.push(new CGImage(oModePos.x - 66.7, oModePos.y + _HeightGameStatus, s_oSpriteLibrary.getSprite('game_select'), s_oStage));
        _GameChoose.push(new CGImage(oModePos.x + 76.6, oModePos.y + _HeightGameStatus, s_oSpriteLibrary.getSprite('game_select'), s_oStage));
        _GameChoose.push(new CGImage(oModePos.x + 220, oModePos.y + _HeightGameStatus, s_oSpriteLibrary.getSprite('game_select'), s_oStage));
        _GameChoose.forEach((el)=>{ el.setVisible(false) })



        _btnArrowSliderLeft = new CGfxButton(oModePos.x - 520, oModePos.y + 130, s_oSpriteLibrary.getSprite('arrow_2_left'), s_oStage);
        _btnArrowSliderLeft.addEventListener(ON_MOUSE_UP, this.previousGameClick, this, 0);
        
        _btnArrowSliderRight = new CGfxButton(oModePos.x + 520, oModePos.y + 130, s_oSpriteLibrary.getSprite('arrow_2_right'), s_oStage);
        _btnArrowSliderRight.addEventListener(ON_MOUSE_UP, this.nextGameClick, this, 0);

        
        new CGImage(oModePos.x, oModePos.y + 160, s_oSpriteLibrary.getSprite('modal_bg'), s_oStage);

        _GameNameLayer = new CText(oModePos.x, oModePos.y - 50, null, 'TÊN GAME', "showcard", "#fffec9", 50, s_oStage);  

        _GameNameLayer.changeText("HOMA ĐẬP CHUỘT")

        var oSprite = s_oSpriteLibrary.getSprite('background_btn_start_2');
        _pStartPos = {x: (oSprite.width/2) + 30, y: (oSprite.height/2) + 30}; 
        _ButonStart = new CTextButton(oModePos.x, oModePos.y + 430, oSprite, 'CHƠI NGAY', "showcard", "#61230b", 45, s_oStage);      
        _ButonStart.addEventListener(ON_MOUSE_UP, s_ChooseGame.goToGame, this, 0);
        
        _GameAvatar.push(new CGImage(oModePos.x + 20, oModePos.y + 140, s_oSpriteLibrary.getSprite('game_avt_1'), s_oStage));
        _GameAvatar.push(new CGImage(oModePos.x - 41, oModePos.y + 182, s_oSpriteLibrary.getSprite('game_avt_2'), s_oStage));
        _GameAvatar.push(new CGImage(oModePos.x - 13, oModePos.y + 174, s_oSpriteLibrary.getSprite('game_avt_3'), s_oStage));
        _GameAvatar.push(new CGImage(oModePos.x - 3, oModePos.y + 161, s_oSpriteLibrary.getSprite('game_avt_4'), s_oStage));
        _GameAvatar.forEach((el)=>{ el.setVisible(false) })

        if(ENABLE_FULLSCREEN === false){
            _fRequestFullScreen = false;
        }


        this.updateGameUnlocked(_GameUnLocked)
        this.updateGameChoose(GAME_CHOOSE)

        createjs.Ticker.addEventListener("tick", s_oStage);
        this.refreshButtonPos();
    }

    this.screenBack = function () {
        this.unload()
        new ScreenHome()
    }

    this.goToGame = function () {
        this.unload()
        switch (GAME_CHOOSE) {
            case 1:
                new SmashTheMouseScreen1();
                break;
            case 2:
                new ChaseImageCaptureWordScreen1();
                break;
            case 3:
                new Game3Screen1();
                break;
            case 4:
                new Game4Screen1();
                break;
            default:
                break;
        }
    }

    this.unload = function () {
        s_ChooseGame = null;
        s_oStage.removeAllChildren();
    }

    this.previousGameClick = function() {
        GAME_CHOOSE--;
        if (GAME_CHOOSE <= 0) {
            GAME_CHOOSE = GAME_NAME.length
        }
        this.updateGameChoose(GAME_CHOOSE)
    }

    this.nextGameClick = function() {
        GAME_CHOOSE++;
        if (GAME_CHOOSE > GAME_NAME.length) {
            GAME_CHOOSE = 1
        }

        if (GAME_CHOOSE > _GameUnLocked) {
            GAME_CHOOSE = 1
        }
        this.updateGameChoose(GAME_CHOOSE)
    }

    this.updateGameUnlocked = function(gameUnlocked) {
        this._GameUnLocked = gameUnlocked;
        _GameUnLock.forEach((el)=>{ el.setVisible(false) })
        for (let index = 0; index < gameUnlocked; index++) {
            _GameUnLock[index].setVisible(true)
        }
        
        for (let index = 0; index < gameUnlocked - 1; index++) {
            _LineGameStatus1[index].setVisible(true)
        }
    }

    this.updateGameChoose = function(gameChoosed) {
        GAME_CHOOSE = gameChoosed > _GameUnLocked ? _GameUnLocked : gameChoosed
        
        _GameChoose.forEach((el)=>{ el.setVisible(false) })
        _GameChoose[GAME_CHOOSE - 1].setVisible(true)
        
        _GameAvatar.forEach((el)=>{ el.setVisible(false) })
        _GameAvatar[GAME_CHOOSE - 1].setVisible(true)
        
        _GameNameLayer.changeText(GAME_NAME[GAME_CHOOSE-1])
    }

    this._onAudioToggle = function(){
        Howler.mute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive;
    };

    this.refreshButtonPos = function(){
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            _oAudioToggle.setPosition(_pStartPosAudio.x - s_iOffsetX,s_iOffsetY + _pStartPosAudio.y);
        }
        _ButtonCart.setPosition(_pCartPos.x - s_iOffsetX - 130,s_iOffsetY + _pCartPos.y);
        _ButtonBack.setPosition(_pBackPos.x + s_iOffsetX,s_iOffsetY + _pBackPos.y);
    }

    s_ChooseGame = this;
    this.init()
}

var s_ChooseGame = null;