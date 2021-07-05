function ScreenHome(){
    var _bUpdate;
    var _iTimeElaps;
    var _aCharacter;
    
    var _oStart;
    var _oCreditsBut;
    var _hmLogo;
    var _oButtonTheLe;
    var _oButtonBXH;
    var _oButtonLogin;
    var _oButtonLogOut;
    var _oButtonStart;
    var _btnArrowSliderLeft;
    var _btnArrowSliderRight;

    var _fRequestFullScreen = null;
    var _fCancelFullScreen = null;
    var _oBg;
    var _oAudioToggle;
    var _oButFullscreen;
    
    var _pStartPosAudio;
    var _pStartPosCredits;
    var _pStartPosFullscreen;
    var _pStartPosLogo;
    
    this._init = function(){
        _bUpdate = false;
        _iTimeElaps = 0;
        
        var oModePos = {x: CANVAS_WIDTH/2, y: 875};
        
        // Add background
        _oBg = createBitmap(s_oSpriteLibrary.getSprite('ldp_background'));
        s_oStage.addChild(_oBg);


        // Slider Backgound
        var oSpriteBackSlider = s_oSpriteLibrary.getSprite('background_slider');         
        new CGImage(oModePos.x, oModePos.y + 220, oSpriteBackSlider, s_oStage);
        
        // Add logo
        var oSpriteLogo = s_oSpriteLibrary.getSprite('hm_logo_2');
        _pStartPosLogo = {x: (oSpriteLogo.width/2) + 20, y: (oSpriteLogo.height/2) - 40};            
        _hmLogo = new CGImage(_pStartPosLogo.x,_pStartPosLogo.y,oSpriteLogo, s_oStage);

        // Add light
        var oSpriteLogoProgram = s_oSpriteLibrary.getSprite('light_1');         
        var _oLight = new CGImage(oModePos.x - 250, oModePos.y - 100, oSpriteLogoProgram, s_oStage);
        createjs.Tween.get(_oLight.getImage(), { loop: true })
        .to({rotation: 10, scaleX: 1.1, scaleY: 1.1}, 1000,)
        .to({rotation: 20, scaleX: 1, scaleY: 1}, 1000,)
        .to({rotation: 30, scaleX: 1.1, scaleY: 1.1}, 1000,)
        .to({rotation: 40, scaleX: 1, scaleY: 1}, 1000,)
        .to({rotation: 50, scaleX: 1.1, scaleY: 1.1}, 1000,)
        .to({rotation: 60, scaleX: 1, scaleY: 1}, 1000,)
        .to({rotation: 70, scaleX: 1.1, scaleY: 1.1}, 1000,)
        .to({rotation: 80, scaleX: 1, scaleY: 1}, 1000,)
        .to({rotation: 90, scaleX: 1.1, scaleY: 1.1}, 1000,)
        .to({rotation: 100, scaleX: 1, scaleY: 1}, 1000,)
        .to({rotation: 110, scaleX: 1.1, scaleY: 1.1}, 1000,)
        .to({rotation: 120, scaleX: 1, scaleY: 1}, 1000,)
        .to({rotation: 130, scaleX: 1.1, scaleY: 1.1}, 1000,)
        .to({rotation: 140, scaleX: 1, scaleY: 1}, 1000,)
        .to({rotation: 150, scaleX: 1.1, scaleY: 1.1}, 1000,)
        .to({rotation: 160, scaleX: 1, scaleY: 1}, 1000,)
        .to({rotation: 170, scaleX: 1.1, scaleY: 1.1}, 1000,)
        .to({rotation: 180, scaleX: 1, scaleY: 1}, 1000,)
        .to({rotation: 190, scaleX: 1.1, scaleY: 1.1}, 1000,)
        .to({rotation: 200, scaleX: 1, scaleY: 1}, 1000,)
        .to({rotation: 210, scaleX: 1.1, scaleY: 1.1}, 1000,)
        .to({rotation: 220, scaleX: 1, scaleY: 1}, 1000,)
        .to({rotation: 230, scaleX: 1.1, scaleY: 1.1}, 1000,)
        .to({rotation: 240, scaleX: 1, scaleY: 1}, 1000,)
        .to({rotation: 250, scaleX: 1.1, scaleY: 1.1}, 1000,)
        .to({rotation: 260, scaleX: 1, scaleY: 1}, 1000,)
        .to({rotation: 270, scaleX: 1.1, scaleY: 1.1}, 1000,)
        .to({rotation: 280, scaleX: 1, scaleY: 1}, 1000,)
        .to({rotation: 290, scaleX: 1.1, scaleY: 1.1}, 1000,)
        .to({rotation: 300, scaleX: 1, scaleY: 1}, 1000,)
        .to({rotation: 310, scaleX: 1.1, scaleY: 1.1}, 1000,)
        .to({rotation: 320, scaleX: 1, scaleY: 1}, 1000,)
        .to({rotation: 330, scaleX: 1.1, scaleY: 1.1}, 1000,)
        .to({rotation: 340, scaleX: 1, scaleY: 1}, 1000,)
        .to({rotation: 350, scaleX: 1.1, scaleY: 1.1}, 1000,)
        .to({rotation: 360, scaleX: 1, scaleY: 1}, 1000,)

        // Add logo chuong trinh
        var oSpriteLogoProgram = s_oSpriteLibrary.getSprite('logo_chuong_trinh');         
        new CGImage(oModePos.x, oModePos.y - 130, oSpriteLogoProgram, s_oStage);

        var oSpriteChoiGameMeSay = s_oSpriteLibrary.getSprite('choi-game-me-say');         
        var _choiGameMeSay = new CGImage(oModePos.x, oModePos.y + 40, oSpriteChoiGameMeSay, s_oStage);
        createjs.Tween.get(_choiGameMeSay.getImage(), { loop: true })
        .to({y: _choiGameMeSay.getY() + 3, scaleX: 1.02}, 800, createjs.Ease.sineIn)
        .to({y: _choiGameMeSay.getY(), scaleX: 1}, 1000, createjs.Ease.sineOut)
        

        var oSprite = s_oSpriteLibrary.getSprite('button_background');
        _pStartPosButton = {x: CANVAS_WIDTH - (oSprite.height/2) - 100, y: (oSprite.height/2) + 10};

        _oButtonTheLe = new CTextButton(CANVAS_WIDTH - (oSprite.height/2) - 10, (oSprite.height/2) + 10, oSprite, 'THỂ LỆ', "MontserratBlack", "#61230b", 25, s_oStage);        
        _oButtonTheLe.addEventListener(ON_MOUSE_UP, this._theLe, this);

        _oButtonBXH = new CTextButton(CANVAS_WIDTH - (oSprite.height/2) - 10, (oSprite.height/2) + 10, oSprite, 'BXH', "MontserratBlack", "#61230b", 25, s_oStage);        
        _oButtonBXH.addEventListener(ON_MOUSE_UP, this._ranking, this);

        _oButtonLogin = new CTextButton(CANVAS_WIDTH - (oSprite.height/2) - 10, (oSprite.height/2) + 10, oSprite, 'ĐĂNG NHẬP', "MontserratBlack", "#61230b", 25, s_oStage);        
        _oButtonLogin.addEventListener(ON_MOUSE_UP, this._loginPopup, this);
        
        _oButtonLogOut = new CTextButton(CANVAS_WIDTH - (oSprite.height/2) - 10, (oSprite.height/2) + 10, oSprite, 'ĐĂNG XUẤT', "MontserratBlack", "#61230b", 25, s_oStage);        
        _oButtonLogOut.addEventListener(ON_MOUSE_UP, this.logOut, this);

        // this.checkLogin()

        var oSprite = s_oSpriteLibrary.getSprite('button_background_start');
        _oButtonStart = new CTextButton(oModePos.x, oModePos.y + 450, oSprite, 'BẮT ĐẦU SĂN KHO BÁU', "showcard", "#61230b", 50, s_oStage);        
        _oButtonStart.addEventListener(ON_MOUSE_UP, this._registerPopup, this);
        
        var circle = new createjs.Shape();
        circle.graphics.beginFill("white").drawCircle(oModePos.x - 100, oModePos.y + 100, 100);
        circle.x = 100;
        circle.y = 100;
        s_oStage.addChild(circle);

        var oSprite = s_oSpriteLibrary.getSprite('button_background_2');
        new CText(oModePos.x, oModePos.y + 330, oSprite, 'BÌNH NƯỚC HOCMAI', "showcard", "#fff", 17, s_oStage);  

        var btnArrowLeft = s_oSpriteLibrary.getSprite('arrow_left');         
        _btnArrowSliderLeft = new CGfxButton(oModePos.x - 400, oModePos.y + 220, btnArrowLeft, s_oStage);
        _btnArrowSliderLeft.addEventListener(ON_MOUSE_UP, function() {}, this, 0);
        
        var btnArrowRight = s_oSpriteLibrary.getSprite('arrow_right');         
        _btnArrowSliderRight = new CGfxButton(oModePos.x + 400, oModePos.y + 220, btnArrowRight, s_oStage);
        _btnArrowSliderRight.addEventListener(ON_MOUSE_UP, function() {}, this, 0);
        
        var doc = window.document;
        var docEl = doc.documentElement;
        _fRequestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
        _fCancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;

        if(ENABLE_FULLSCREEN === false){
            _fRequestFullScreen = false;
        }
        
        // _PassPartPanel = new FailedPartPanel(s_oStage);
        // _PassPartPanel.show()
        createjs.Ticker.addEventListener("tick", s_oStage);
        this.refreshButtonPos();
        _bUpdate = true;
    };  

    this.logOut = function () {
        IS_LOGIN = false
        localStorage.setItem('tieuhoc_game_key', '');
        this.checkLogin()
    }
    
    this.unload = function(){
        _bUpdate = false;
        // _oStart.unload();
        // _oCreditsBut.unload();
        
        // if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
        //     _oAudioToggle.unload();
        //     _oAudioToggle = null;
        // }
        
        s_Home = null;
        s_oStage.removeAllChildren();        
    };
    
    this.refreshButtonPos = function(){   
        _oButtonTheLe.setPosition(_pStartPosButton.x - s_iOffsetX - 460, s_iOffsetY + _pStartPosButton.y);
        _oButtonBXH.setPosition(_pStartPosButton.x - s_iOffsetX - 230, s_iOffsetY + _pStartPosButton.y);
        _oButtonLogin.setPosition(_pStartPosButton.x - s_iOffsetX, s_iOffsetY + _pStartPosButton.y);
        _oButtonLogOut.setPosition(_pStartPosButton.x - s_iOffsetX, s_iOffsetY + _pStartPosButton.y);
        _hmLogo.setPosition(_pStartPosLogo.x + s_iOffsetX,s_iOffsetY + _pStartPosLogo.y);
    };

    this.checkLogin = function () {
        if (IS_LOGIN) {
            _oButtonLogin.setVisible(false)
            _oButtonLogOut.setVisible(true)
        } else {
            _oButtonLogin.setVisible(true)
            _oButtonLogOut.setVisible(false)
        }
    }
    
    this._loginPopup = function(){
        if (!IS_LOGIN) {
            $("#loginPopup").modal({
                fadeDuration: 200
            })
        } else {
            this.unload()
            _ChooseGameScreen = new ScreenChooseGame()
        }
    };

    this._registerPopup = function(){
        if (!IS_LOGIN) {
            $("#registerPopup").modal({
                fadeDuration: 200
            })
        } else {
            this.unload()
            _ChooseGameScreen = new ScreenChooseGame()
        }
    };

    this._theLe = function() {
        $('#thele').modal({
            fadeDuration: 200
        })
    }

    this._ranking = function() {
        getRanking()
        $('#rankingPopup').modal({
            fadeDuration: 200
        })
    }

    this._onStart = function(){
        
        $(s_oMain).trigger("start_session");
        s_Home.unload();
        s_oMain.gotoHelp();
    };
    
    this._onAudioToggle = function(){
        Howler.mute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive;
    };
    
    s_Home = this;        
    this._init();
};

var s_Home = null;