function Game4Screen1 () {
    var _ButtonBack;

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

        
        new CGImage(oModePos.x, oModePos.y + 140, s_oSpriteLibrary.getSprite('modal_bg'), s_oStage);

        new CText(oModePos.x, oModePos.y - 240, null, 'HOMA HỌC TIẾNG ANH', "showcard", "#fffec9", 60, s_oStage);

        new CText(oModePos.x - 200, oModePos.y - 60, null, '• CÁCH CHƠI: ', "MontserratBlack", "#fff", 30, s_oStage);
        new CText(oModePos.x + 30, oModePos.y - 20, null, 'Tìm 5 từ tiếng anh được ẩn trong bảng. Chơi đủ 4', "MontserratSemiBold", "#fff", 25, s_oStage);
        new CText(oModePos.x - 133, oModePos.y + 20, null, 'bàn để được qua game.', "MontserratSemiBold", "#fff", 25, s_oStage);

        new CText(oModePos.x - 200, oModePos.y + 100, null, '• THỜI GIAN: ', "MontserratBlack", "#fff", 30, s_oStage);
        new CText(oModePos.x - 235, oModePos.y + 140, null, '60 giây', "MontserratSemiBold", "#fff", 25, s_oStage);

        new CText(oModePos.x - 145, oModePos.y + 240, null, '• CÁCH TÍNH ĐIỂM: ', "MontserratBlack", "#fff", 30, s_oStage);
        new CText(oModePos.x - 65, oModePos.y + 280, null, 'Mỗi từ tìm được sẽ được 10 điểm', "MontserratSemiBold", "#fff", 25, s_oStage);
        

        var oSprite = s_oSpriteLibrary.getSprite('button_background_3');
        _pStartPos = {x: (oSprite.width/2) + 30, y: (oSprite.height/2) + 30}; 
        _ButonStart = new CGfxButton(oModePos.x, oModePos.y + 400, oSprite, s_oStage);      
        _ButonStart.addEventListener(ON_MOUSE_UP, this.goToGame, this, 0);
        _ButonStart.pulseAnimation();
    
        createjs.Ticker.addEventListener("tick", s_oStage);
        this.refreshButtonPos();
    }

    this.goToGame = function () {
        this.unload()
        ScreenGame = new Game4Screen2();
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