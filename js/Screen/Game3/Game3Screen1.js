function Game3Screen1 () {

    var _ButtonBack;
    var _fRequestFullScreen = null;
    var _fCancelFullScreen = null;

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
        _ButtonBack.addEventListener(ON_MOUSE_UP, s_Game3Screen1.screenBack, this);
        
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
        _ButtonCart.pulseAnimation2()
        _ButtonCart.addEventListener(ON_MOUSE_UP, openCouponPopup, this);    

        // Fullscreen
        var doc = window.document;
        var docEl = doc.documentElement;
        _fRequestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
        _fCancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;

        if(ENABLE_FULLSCREEN === false){
            _fRequestFullScreen = false;
        }

        if (_fRequestFullScreen && screenfull.enabled){
            oSprite = s_oSpriteLibrary.getSprite("but_fullscreen")
            _pStartPosFullscreen = {x: oSprite.width/4 + 10,y:(oSprite.height/2) + 10};
            _oButFullscreen = new CToggle(_pStartPosFullscreen.x,_pStartPosFullscreen.y,oSprite,s_bFullscreen, s_oStage);
            _oButFullscreen.addEventListener(ON_MOUSE_UP,this._onFullscreenRelease,this);
        }
        
        new CGImage(oModePos.x, oModePos.y + 140, s_oSpriteLibrary.getSprite('modal_bg'), s_oStage);

        new CText(oModePos.x, oModePos.y - 240, null, 'ÔN LUYỆN CÙNG HOMA', "showcard", "#fffec9", 60, s_oStage);

        new CText(oModePos.x, oModePos.y - 60, null, 'Chào mừng các bé đã đến với thử thách', "MontserratSemiBold", "#fff", 30, s_oStage);
        new CText(oModePos.x, oModePos.y - 20, null, 'Ôn luyện cùng HOMA!', "MontserratSemiBold", "#fff", 30, s_oStage);

        new CGImage(oModePos.x - 190, oModePos.y + 120, s_oSpriteLibrary.getSprite('game3_score_define1'), s_oStage);
        new CGImage(oModePos.x + 190, oModePos.y + 120, s_oSpriteLibrary.getSprite('game3_score_define2'), s_oStage);

        new CText(oModePos.x, oModePos.y + 250, null, '*Thời gian trả lời mỗi câu hỏi: 15s', "MontserratSemiBold", "#fff", 25, s_oStage);
        new CText(oModePos.x, oModePos.y + 295, null, '*Điểm số tối thiểu cần đạt: 50 điểm', "MontserratSemiBold", "#fff", 25, s_oStage);
        

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
        ScreenGame_3 = new Game3Screen2();
        _iState = 'GAME3'
    }

    this.screenBack = function () {
        this.unload()
        _ScreenChooseGame = new ScreenChooseGame()
    }


    this._onAudioToggle = function(){
        Howler.mute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive;
    };
    
    this.resetFullscreenBut = function(){
        if (_fRequestFullScreen && screenfull.enabled){
            _oButFullscreen.setActive(s_bFullscreen);
        }
    };
    
    this._onFullscreenRelease = function(){
        if(s_bFullscreen) { 
            _fCancelFullScreen.call(window.document);
        }else{
            _fRequestFullScreen.call(window.document.documentElement);
        }
    }

    this.refreshButtonPos = function(){
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            _oAudioToggle.setPosition(_pStartPosAudio.x - s_iOffsetX,s_iOffsetY + _pStartPosAudio.y);
        }

        if (_fRequestFullScreen && screenfull.enabled){
            _oButFullscreen.setPosition(_pStartPosAudio.x - s_iOffsetX - 260,s_iOffsetY + _pStartPosAudio.y - 5);
        }
        
        _ButtonCart.setPosition(_pCartPos.x - s_iOffsetX - 130,s_iOffsetY + _pCartPos.y);
        _ButtonBack.setPosition(_pBackPos.x + s_iOffsetX,s_iOffsetY + _pBackPos.y);
    }

    this.unload = function() {

        if (_fRequestFullScreen && screenfull.enabled){
            _oButFullscreen.unload();
        }
        
        s_Game3Screen1 = null;
        s_oStage.removeAllChildren();
    }    

    s_Game3Screen1 = this;
    this.init()
}

var s_Game3Screen1 = null;