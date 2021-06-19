function SmashTheMouseScreen1 () {
    var _ButtonBack;

    this.init = function() {

        var oModePos = {x: CANVAS_WIDTH/2, y: 875};
        // Add background
        _Bg = createBitmap(s_oSpriteLibrary.getSprite('game1_bg'));
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
        _ButtonBack.addEventListener(ON_MOUSE_UP, this._theLe, this);
        
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

        
        new CGImage(oModePos.x, oModePos.y + 160, s_oSpriteLibrary.getSprite('modal_bg'), s_oStage);
        new CGImage(oModePos.x, oModePos.y - 190, s_oSpriteLibrary.getSprite('homa_dapchuot_title'), s_oStage);

        new CGImage(oModePos.x - 240, oModePos.y + 10, s_oSpriteLibrary.getSprite('hammer_icon_1'), s_oStage)
        new CText(oModePos.x - 240, oModePos.y + 100, s_oSpriteLibrary.getSprite('button_background_4'), '+10 ĐIỂM', "showcard", "#fff", 25, s_oStage);  

        new CGImage(oModePos.x, oModePos.y + 10, s_oSpriteLibrary.getSprite('hammer_icon_2'), s_oStage)
        new CText(oModePos.x, oModePos.y + 100, s_oSpriteLibrary.getSprite('button_background_4'), '+20 ĐIỂM', "showcard", "#fff", 25, s_oStage);  

        new CGImage(oModePos.x + 240, oModePos.y + 10, s_oSpriteLibrary.getSprite('hammer_icon_3'), s_oStage)
        new CText(oModePos.x + 240, oModePos.y + 100, s_oSpriteLibrary.getSprite('button_background_4'), '+30 ĐIỂM', "showcard", "#fff", 25, s_oStage);  

        new CText(oModePos.x, oModePos.y + 200, null, '*CÁCH CHƠI: DÙNG CHUỘT CHẠM VÀO MÀN HÌNH ĐỂ ĐẬP CHUỘT', "showcard", "#fff", 25, s_oStage);
        new CText(oModePos.x, oModePos.y + 240, null, '*THỜI GIAN CHƠI: 60 GIÂY', "showcard", "#fff", 25, s_oStage);
        new CText(oModePos.x, oModePos.y + 280, null, '*ĐIỂM CẦN ĐẠT TỐI THIỂU: 50 ĐIỂM', "showcard", "#fff", 25, s_oStage);

        var oSprite = s_oSpriteLibrary.getSprite('button_background_3');
        _pStartPos = {x: (oSprite.width/2) + 30, y: (oSprite.height/2) + 30}; 
        _ButonStart = new CGfxButton(oModePos.x, oModePos.y + 380, oSprite, s_oStage);      
        _ButonStart.addEventListener(ON_MOUSE_UP, this.goToGame(), this, 0);
        _ButonStart.pulseAnimation();
    
        createjs.Ticker.addEventListener("tick", s_oStage);
        this.refreshButtonPos();
    }

    this.goToGame = function () {
        this.unload()
        ScreenGame = new SmashTheMouseScreen2();
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

    this.unload = function() {
        s_SmashTheMouseScreen1 = null;
        s_oStage.removeAllChildren();
    }    

    s_SmashTheMouseScreen1 = this;
    this.init()
}

var s_SmashTheMouseScreen1 = null;