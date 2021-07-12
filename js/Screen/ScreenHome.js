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

    var sliderItem = []
    var sliderPos = [];
    var sliderStartItem = 0;

    var oModePos;

    
    this._init = function(){
        _bUpdate = false;
        _iTimeElaps = 0;
        
        oModePos = {x: CANVAS_WIDTH/2, y: 875};
        
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
        .to({ rotation: 0,scaleX: 0.8, scaleY: 0.8}, 0,createjs.Ease.linear)
        .to({rotation: 20, scaleX: 1.3, scaleY: 1}, 2000, createjs.Ease.linear)
        .to({rotation: 50, scaleX: 0, scaleY: 0}, 4000, createjs.Ease.linear)
        .to({rotation: -20, scaleX: 0.5, scaleY: 0.5}, 0, createjs.Ease.linear)
        .to({ rotation: 0,scaleX: 0.8, scaleY: 0.8}, 2000, createjs.Ease.linear)

        // Add logo chuong trinh
        var oSpriteLogoProgram = s_oSpriteLibrary.getSprite('homa_head');         
        var _oHead = new CGImage(oModePos.x - 185, oModePos.y - 250, oSpriteLogoProgram, s_oStage);
        createjs.Tween.get(_oHead.getImage(), { loop: true })
        .to({ y:_oHead.getY() }, 0,createjs.Ease.linear)
        .to({ y:_oHead.getY() }, 5000,createjs.Ease.linear)
        .to({ y:_oHead.getY() +35 }, 2000,createjs.Ease.linear)
        .to({ y:_oHead.getY() +35},2000,createjs.Ease.linear)
        .to({ y:_oHead.getY() }, 300,createjs.Ease.linear)

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
        
        // var circle = new createjs.Shape();
        // circle.graphics.beginFill("white").drawCircle(oModePos.x - 100, oModePos.y + 100, 100);
        // circle.x = 100;
        // circle.y = 100;
        // s_oStage.addChild(circle);
        
        // var oSprite = s_oSpriteLibrary.getSprite('button_background_2');
        // new CText(oModePos.x, oModePos.y + 330, oSprite, 'BÌNH NƯỚC HOCMAI', "showcard", "#fff", 17, s_oStage);

        this.initSlider()

        var btnArrowLeft = s_oSpriteLibrary.getSprite('arrow_left');         
        _btnArrowSliderLeft = new CGfxButton(oModePos.x - 400, oModePos.y + 220, btnArrowLeft, s_oStage);
        _btnArrowSliderLeft.addEventListener(ON_MOUSE_UP, this.sliderPre, this, 0);
        
        var btnArrowRight = s_oSpriteLibrary.getSprite('arrow_right');         
        _btnArrowSliderRight = new CGfxButton(oModePos.x + 400, oModePos.y + 220, btnArrowRight, s_oStage);
        _btnArrowSliderRight.addEventListener(ON_MOUSE_UP, this.sliderNext, this, 0);
        
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
        
        this.sliderPre()
    };

    this.sliderPre = function () {

        if (sliderStartItem < 0) { sliderStartItem = sliderItem.length - 1 }
        
        var slideIndex = sliderStartItem

        for (let index = 0; index < 4; index++) {
            if (index == 3) {
                sliderItem[slideIndex].setPositionEffect(sliderPos[index-1], oModePos.y + 200, index, 'pre')
            } else {
                sliderItem[slideIndex].setPositionEffect(sliderPos[index], oModePos.y + 200, index, 'pre')
            }
            slideIndex++
            if(slideIndex == sliderItem.length) {slideIndex = 0}
        }

        sliderStartItem--;
    }

    
    this.sliderNext = function () {
        
        if (sliderStartItem < 0) { sliderStartItem = sliderItem.length - 1 }
        if (sliderStartItem > sliderItem.length - 1) { sliderStartItem = 0 }
        
        var slideIndex = sliderStartItem
        
        for (let index = 0; index < 4; index++) {
            if (index == 0) {
                var temp = slideIndex - 1 < 0 ? 0 : slideIndex - 1
                sliderItem[temp].setPositionEffect(sliderPos[index], oModePos.y + 200, index, 'next')
                sliderItem[slideIndex].setPositionEffect(sliderPos[index], oModePos.y + 200, index, 'next')
            } else {
                sliderItem[slideIndex].setPositionEffect(sliderPos[index], oModePos.y + 200, index, 'next')
            }
            slideIndex++
            if(slideIndex == sliderItem.length) {slideIndex = 0}
        }
        sliderStartItem++;
    }

    this.initSlider = function () {
        sliderItem.push(new SlideItem(oModePos.x - 250, oModePos.y + 200, s_oSpriteLibrary.getSprite('gt_1'), 'ĐỒNG HỒ ĐỊNH VỊ TRẺ EM'))
        sliderItem.push(new SlideItem(oModePos.x, oModePos.y + 200, s_oSpriteLibrary.getSprite('gt_2'), 'BỘ SÁCH GIÚP BÉ KHÁM PHÁ THẾ GIỚI'))
        sliderItem.push(new SlideItem(oModePos.x + 250, oModePos.y + 200, s_oSpriteLibrary.getSprite('gt_3'), 'KHÓA HỌC GIỎI TIỂU HỌC TỪ LỚP 1 - LỚP 5'))
        sliderItem.push(new SlideItem(oModePos.x + 500, oModePos.y + 200, s_oSpriteLibrary.getSprite('gt_4'), 'BỘ SÁCH NUÔI DƯỠNG TÂM HỒN CHO BÉ'))

        for (let index = 0; index < sliderItem.length; index++) {
            // sliderItem[index].setVisible(false)
            sliderPos.push(sliderItem[index].getX())
            sliderItem[index].setScale(0.7, 0.7)
        }

        // sliderItem[0].setScale(0.7, 0.7)
        // sliderItem[2].setScale(0.7, 0.7)
    }

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
            _ScreenChooseGame = new ScreenChooseGame()
        }
    };

    this._registerPopup = function(){
        if (!IS_LOGIN) {
            $('.register-info').css('display', 'flex')
            $('.otp-form').css('display', 'none')
            $('.time_otp').css('display', 'none')
            $('#registerPopup button.verifi_btn').css('display', 'none')
            $('#registerPopup button.register_btn').css('display', 'initial')
            $("#registerPopup").modal({
                fadeDuration: 200
            })
        } else {
            this.unload()
            _ScreenChooseGame = new ScreenChooseGame()
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


function SlideItem(iXPos, iYPos, oSprite, Text) {
    
    var _itemContainer = null;
    var _oTextBack
    var _oText;
    var _oButtonBg;
    var _oItemImage;
    var iFontSize = 18;
    var shadowColor = "#61230b"
    var _iWidth;
    var _iHeight;
    var szColor = '#fff';

    this.init = function (iXPos, iYPos, oSprite, Text) {

        _itemContainer = new createjs.Container()
        
        _oItemImage = createBitmap(oSprite)

        _iWidth = oSprite.width;
        _iHeight = oSprite.height;

        var iStepShadow = Math.ceil(iFontSize/15);

        var oSprite = s_oSpriteLibrary.getSprite('button_background_2')
        _oButtonBg = createBitmap( oSprite);

        _oTextBack = new createjs.Text(Text,iFontSize + "px showcard", shadowColor);
        var oBounds = _oTextBack.getBounds();
        _oTextBack.textAlign = "center";
        _oTextBack.lineWidth = _iWidth *0.9;
        _oTextBack.lineHeight = iFontSize * 1.2;
        _oTextBack.textBaseline = "alphabetic";
        _oTextBack.x = oSprite.width/2;
        

        _oText = new createjs.Text(Text, iFontSize + "px showcard", szColor);
        _oText.textAlign = "center";
        _oText.textBaseline = "alphabetic";  
        _oText.lineWidth = _iWidth *0.9;
        _oText.lineHeight = iFontSize * 1.2;
        _oText.x = oSprite.width/2;

        
        _oButtonBg.y = _iHeight - oSprite.height
        _oTextBack.y = _iHeight - Math.floor((oSprite.height)/2)+ iStepShadow;
        _oText.y = _iHeight - Math.floor((oSprite.height)/2);
        _oItemImage.x = (oSprite.width - _iWidth) / 2 

        _itemContainer.x = iXPos;
        _itemContainer.y = iYPos;
        _itemContainer.regX = _iWidth / 2
        _itemContainer.regY = _iHeight / 2

        // _oButton.addChild(_oButtonBg,_oTextBack,_oText);
        _itemContainer.addChild(_oItemImage, _oButtonBg, _oTextBack, _oText);
        _itemContainer.scaleX = 0.9
        _itemContainer.scaleY = 0.9
        
        s_oStage.addChild(_itemContainer)
    }

    this.setScale = function (x, y) {
        _itemContainer.scaleX = x
        _itemContainer.scaleY = y
    }

    this.setPositionEffect = function (iXPos, iYPos, index, type) {
        if (type == 'pre') {
            if (index == 0) {
                _itemContainer.x = iXPos - 50
                createjs.Tween.get(_itemContainer)
                .to({x: iXPos, }, 200, createjs.Ease.quadOut)
    
                createjs.Tween.get(_itemContainer)
                .to({alpha: 1, }, 200, createjs.Ease.quadIn)
            } else if (index == 3) {
                // console.log(type)
                createjs.Tween.get(_itemContainer)
                .to({x: iXPos + 50, }, 200, createjs.Ease.quadOut)
    
                createjs.Tween.get(_itemContainer)
                .to({alpha: 0, }, 200, createjs.Ease.quadOut)
            } else if (index == 1) {
                createjs.Tween.get(_itemContainer)
                .to({x: iXPos, }, 200, createjs.Ease.quadOut)
    
                createjs.Tween.get(_itemContainer)
                .to({scaleX: 1, scaleY: 1 }, 200, createjs.Ease.quadOut)
            } else {
                createjs.Tween.get(_itemContainer)
                .to({x: iXPos, }, 200, createjs.Ease.quadOut)
    
                createjs.Tween.get(_itemContainer)
                .to({scaleX: 0.7, scaleY: 0.7 }, 200, createjs.Ease.quadOut)
            }
        }

        if (type == 'next') {
            
            if (index == 0) {
                // _itemContainer.x = iXPos
                createjs.Tween.get(_itemContainer)
                .to({x: iXPos, }, 200, createjs.Ease.quadOut)

                createjs.Tween.get(_itemContainer)
                .to({alpha: 1, }, 200, createjs.Ease.quadIn)

                createjs.Tween.get(_itemContainer)
                .to({scaleX: 0.7, scaleY: 0.7 }, 200, createjs.Ease.quadOut)
            } else if (index == -1) {
                // console.log(type)
                createjs.Tween.get(_itemContainer)
                .to({x: iXPos, }, 200, createjs.Ease.quadOut)
    
                createjs.Tween.get(_itemContainer)
                .to({alpha: 0, }, 200, createjs.Ease.quadOut)
            } else if (index == 1) {
                createjs.Tween.get(_itemContainer)
                .to({x: iXPos, }, 200, createjs.Ease.quadOut)
    
                createjs.Tween.get(_itemContainer)
                .to({scaleX: 1, scaleY: 1 }, 200, createjs.Ease.quadOut)
            } else if (index == 2) {
                createjs.Tween.get(_itemContainer)
                .to({x: iXPos, }, 200, createjs.Ease.quadOut)
    
                createjs.Tween.get(_itemContainer)
                .to({scaleX: 0.7, scaleY: 0.7 }, 200, createjs.Ease.quadOut)
    
                // createjs.Tween.get(_itemContainer)
                // .to({alpha: 0, }, 200, createjs.Ease.quadIn)
            }
        }


        

        // createjs.Tween.get(_itemContainer)
        // .to({scaleX: _iScale*1.05, scaleY: _iScale*1.05}, 1500, createjs.Ease.quadOut)
        // .to({scaleX: _iScale, scaleY: _iScale}, 1500, createjs.Ease.quadIn).call(function () {
        // });
    }

    this.setPosition = function(iXPos,iYPos){
        _itemContainer.x = iXPos;
        _itemContainer.y = iYPos;
   };

   this.getX = function(){
        return _itemContainer.x;
    };

    this.getY = function(){
        return _itemContainer.y;
    };

    this.setVisible = function(bVisible){
        _itemContainer.visible = bVisible;
    };

    this.init(iXPos, iYPos, oSprite, Text)
}