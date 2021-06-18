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
        _oButtonBXH.addEventListener(ON_MOUSE_UP, this._onButStartRelease, this);

        _oButtonLogin = new CTextButton(CANVAS_WIDTH - (oSprite.height/2) - 10, (oSprite.height/2) + 10, oSprite, 'ĐĂNG NHẬP', "MontserratBlack", "#61230b", 25, s_oStage);        
        _oButtonLogin.addEventListener(ON_MOUSE_UP, this._checkLogin, this);

        var oSprite = s_oSpriteLibrary.getSprite('button_background_start');
        _oButtonStart = new CTextButton(oModePos.x, oModePos.y + 450, oSprite, 'BẮT ĐẦU SĂN KHO BÁU', "showcard", "#61230b", 50, s_oStage);        
        _oButtonStart.addEventListener(ON_MOUSE_UP, this._checkLogin, this);
        
        var circle = new createjs.Shape();
        circle.graphics.beginFill("white").drawCircle(oModePos.x - 100, oModePos.y + 100, 100);
        circle.x = 100;
        circle.y = 100;
        s_oStage.addChild(circle);
        // createjs.Tween.get(circle, {loop: true})
        //   .to({x: 0, y: 0}, 1300, createjs.Ease.getPowInOut(4))
        // //   .to({alpha: 0, y: 1000}, 500, createjs.Ease.getPowInOut(2))
        // //   .to({alpha: 0, y: 1040}, 100)
        // //   .to({alpha: 1, y: 1200}, 500, createjs.Ease.getPowInOut(2))
        // //   .to({x: oModePos.x}, 800, createjs.Ease.getPowInOut(2));
        // createjs.Ticker.addEventListener("tick", s_oStage);

        var oSprite = s_oSpriteLibrary.getSprite('button_background_2');
        new CText(oModePos.x, oModePos.y + 330, oSprite, 'BÌNH NƯỚC HOCMAI', "showcard", "#fff", 17, s_oStage);  

        var btnArrowLeft = s_oSpriteLibrary.getSprite('arrow_left');         
        _btnArrowSliderLeft = new CGfxButton(oModePos.x - 400, oModePos.y + 220, btnArrowLeft, s_oStage);
        _btnArrowSliderLeft.addEventListener(ON_MOUSE_UP, function() {}, this, 0);
        
        var btnArrowRight = s_oSpriteLibrary.getSprite('arrow_right');         
        _btnArrowSliderRight = new CGfxButton(oModePos.x + 400, oModePos.y + 220, btnArrowRight, s_oStage);
        _btnArrowSliderRight.addEventListener(ON_MOUSE_UP, function() {}, this, 0);
        
        // var oSpriteStart = s_oSpriteLibrary.getSprite('but_play');
        // _oStart = new CGfxButton(oModePos.x,oModePos.y,oSpriteStart,s_oStage);
        // _oStart.addEventListener(ON_MOUSE_UP, this._onStart, this, 0);
        
        // if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
        //     var oSprite = s_oSpriteLibrary.getSprite('audio_icon');
        //     _pStartPosAudio = {x: CANVAS_WIDTH - (oSprite.height/2) - 10, y: (oSprite.height/2) + 10};
            
        //     _oAudioToggle = new CToggle(_pStartPosAudio.x,_pStartPosAudio.y,oSprite,s_bAudioActive);
        //     _oAudioToggle.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this);    
        // }
        
        // var oSprite = s_oSpriteLibrary.getSprite('but_credits');
        // _pStartPosCredits = {x: (oSprite.width/2) + 10, y: (oSprite.height/2) + 10};            
        // _oCreditsBut = new CGfxButton(_pStartPosCredits.x,_pStartPosCredits.y,oSprite, s_oStage);
        // _oCreditsBut.addEventListener(ON_MOUSE_UP, this._onCreditsBut, this);
        
        var doc = window.document;
        var docEl = doc.documentElement;
        _fRequestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
        _fCancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;

        if(ENABLE_FULLSCREEN === false){
            _fRequestFullScreen = false;
        }

        // if (_fRequestFullScreen && screenfull.enabled){
        //     oSprite = s_oSpriteLibrary.getSprite("but_fullscreen")
        //     _pStartPosFullscreen = {x:_pStartPosCredits.x + oSprite.width/2 + 10,y:(oSprite.height/2) + 10};
        //     _oButFullscreen = new CToggle(_pStartPosFullscreen.x,_pStartPosFullscreen.y,oSprite,s_bFullscreen, s_oStage);
        //     _oButFullscreen.addEventListener(ON_MOUSE_UP,this._onFullscreenRelease,this);
        // }
        
        // this._initHole();
        
        
        
        // var oBestScoreTextBack = new createjs.Text(TEXT_BEST_SCORE + " " + s_iBestScore," 45px "+FONT, "#000");
        // oBestScoreTextBack.x = CANVAS_WIDTH/2;
        // oBestScoreTextBack.y = CANVAS_HEIGHT/2 - 340;
        // oBestScoreTextBack.textAlign = "center";
        // oBestScoreTextBack.textBaseline = "alphabetic";
        // oBestScoreTextBack.outline = 6;
        // s_oStage.addChild(oBestScoreTextBack);
        
        // var oBestScoreText = new createjs.Text(TEXT_BEST_SCORE + " " + s_iBestScore," 45px "+FONT, "#ffb557");
        // oBestScoreText.x = CANVAS_WIDTH/2;
        // oBestScoreText.y = CANVAS_HEIGHT/2 - 340;
        // oBestScoreText.textAlign = "center";
        // oBestScoreText.textBaseline = "alphabetic";
        // s_oStage.addChild(oBestScoreText);
        
        
        
        // if(!s_bStorageAvailable){
        //     new CMsgBox();
        // }else{
        //     var iBestScore = getItem("whackemall_best_score");
        //     if(iBestScore !== null ){
        //         s_iBestScore = iBestScore;
        //     }
        // }
        
        createjs.Ticker.addEventListener("tick", s_oStage);

        this.refreshButtonPos();
        
        _bUpdate = true;
    };  
    
    this.unload = function(){
        _bUpdate = false;
        _oStart.unload();
        _oCreditsBut.unload();
        
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            _oAudioToggle.unload();
            _oAudioToggle = null;
        }
        
        // if (_fRequestFullScreen && screenfull.enabled){
        //         _oButFullscreen.unload();
        // }
        
        s_Home = null;
        s_oStage.removeAllChildren();        
    };
    
    this.refreshButtonPos = function(){   
        _oButtonTheLe.setPosition(_pStartPosButton.x - s_iOffsetX - 460, s_iOffsetY + _pStartPosButton.y);
        _oButtonBXH.setPosition(_pStartPosButton.x - s_iOffsetX - 230, s_iOffsetY + _pStartPosButton.y);
        _oButtonLogin.setPosition(_pStartPosButton.x - s_iOffsetX, s_iOffsetY + _pStartPosButton.y);
        _hmLogo.setPosition(_pStartPosLogo.x + s_iOffsetX,s_iOffsetY + _pStartPosLogo.y);

        // if (_fRequestFullScreen && screenfull.enabled){
        //         _oButFullscreen.setPosition(_pStartPosFullscreen.x + s_iOffsetX, _pStartPosFullscreen.y + s_iOffsetY);
        // }
        

        // _oCreditsBut.setPosition(_pStartPosCredits.x + s_iOffsetX,s_iOffsetY + _pStartPosCredits.y);
         
        // if(s_bLandscape){
        //     _oStart.setPosition(CANVAS_WIDTH/2,CANVAS_HEIGHT/2 + 280);
        //     _oStart.setScale(0.8);
        // }else{
        //     _oStart.setPosition(CANVAS_WIDTH/2,CANVAS_HEIGHT/2 + 400);
        //     _oStart.setScale(1);
        // }
        
    };
    
    this._initHole = function(){
        var aPosHoles = [{x:648,y:930},{x:1240,y:930},{x:648,y:1100},{x:1240,y:1100},{x:648,y:1285},{x:1240,y:1285}];
        
        _aCharacter = new Array();
        for(var i=0;i<6;i++){
            var oCharacter = new CCharacterInHole(aPosHoles[i].x,aPosHoles[i].y,s_oStage);
            _aCharacter[i] = oCharacter;
        }
    };
    
    this.spawnCharacter = function(){
        do{
            var iRandHole = Math.floor(Math.random()*6);
        }while(_aCharacter[iRandHole].getValue());
        var iRandCharacter = Math.floor(Math.random()*4);
        var iRandTime = Math.floor(Math.random() * (500 - 200 + 1)) + 200;
        
        _aCharacter[iRandHole].spawnCharacter(iRandCharacter,iRandTime,500);  
    };
    
    this._checkLogin = function(){
        if (!isLogin) {
            $("#loginPopup").modal({
                fadeDuration: 200
            })
        }
    };

    this._theLe = function() {
        $('#thele').modal({
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
    
    this._onCreditsBut = function(){
        new CCreditsPanel();
    };
    
    this.resetFullscreenBut = function(){
        // if (_fRequestFullScreen && screenfull.enabled){
        //     _oButFullscreen.setActive(s_bFullscreen);
        // }
    };
        
    this._onFullscreenRelease = function(){
        if(s_bFullscreen) { 
            _fCancelFullScreen.call(window.document);
        }else{
            _fRequestFullScreen.call(window.document.documentElement);
        }
        
        sizeHandler();
    };
    
    this.update = function(){
        if(_bUpdate === false){
            return; 
        }
        
        _iTimeElaps += s_iTimeElaps;
        if(_iTimeElaps > 500){
            _iTimeElaps = 0;
            this.spawnCharacter();
        }
    };
    
    s_Home = this;        
    this._init();
    
    
};

var s_Home = null;