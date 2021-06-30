function ChaseImageCaptureWordScreen1 () {
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

        
        new CGImage(oModePos.x, oModePos.y + 160, s_oSpriteLibrary.getSprite('modal_bg'), s_oStage);

        new CText(oModePos.x, oModePos.y - 220, null, 'HOMA NHÌN HÌNH ĐOÁN CHỮ', "showcard", "#fffec9", 60, s_oStage);

        new CText(oModePos.x, oModePos.y - 40, null, 'Cách chơi: điền chữ cái để ghép thành câu trả lời đúng', "MontserratSemiBold", "#fff", 25, s_oStage);
        new CText(oModePos.x, oModePos.y - 5, null, 'theo hình ảnh mô tả. Điền đúng được 3 câu trên 5 câu', "MontserratSemiBold", "#fff", 25, s_oStage);
        new CText(oModePos.x, oModePos.y + 30, null, 'sẽ được tính là qua game', "MontserratSemiBold", "#fff", 25, s_oStage);

        new CText(780, oModePos.y + 125, null, 'CÁCH TÍNH ĐIỂM:', "MontserratBlack", "#fff", 35, s_oStage)
        new CText(850, oModePos.y + 165, null, '• Trả lời đúng trong 15s đầu: 30 điểm', "MontserratSemiBold", "#fff", 25, s_oStage)
        new CText(884, oModePos.y + 200, null, '• Trả lời đúng trong 15s tiếp theo: 20 điểm', "MontserratSemiBold", "#fff", 25, s_oStage)
        new CText(860, oModePos.y + 235, null, '• Trả lời đúng trong vòng 60s: 10 điểm', "MontserratSemiBold", "#fff", 25, s_oStage)
        new CText(951, oModePos.y + 270, null, '• Trả lời đúng nhưng quá 60s: Qua bài nhưng không', "MontserratSemiBold", "#fff", 25, s_oStage)
        new CText(716, oModePos.y + 305, null, 'được tính điểm', "MontserratSemiBold", "#fff", 25, s_oStage)

        var oSprite = s_oSpriteLibrary.getSprite('button_background_3');
        _pStartPos = {x: (oSprite.width/2) + 30, y: (oSprite.height/2) + 30}; 
        _ButonStart = new CGfxButton(oModePos.x, oModePos.y + 420, oSprite, s_oStage);      
        _ButonStart.addEventListener(ON_MOUSE_UP, this.goToGame, this, 0);
        _ButonStart.pulseAnimation();
    
        createjs.Ticker.addEventListener("tick", s_oStage);
        this.refreshButtonPos();
    }

    this.goToGame = function () {
        this.unload()
        ScreenGame = new ChaseImageCaptureWordScreen2();
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