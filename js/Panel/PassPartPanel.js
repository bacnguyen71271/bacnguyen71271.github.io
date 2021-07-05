function PassPartPanel () {
    var _aCbCompleted;
    
    var _iStartY;
    var _oListener;
    var _oFade;
    var _oPanelContainer;

    var _ButtonNextGame;
    var _ButtonHome;

    var _TextScore;

    var _TextCoupon;

    var _oThis = this;

    this._init = function () {

        _aCbCompleted = new Array();

        _oGroup = new createjs.Container();
        _oGroup.alpha = 0;
        _oGroup.visible=false;
        s_oStage.addChild(_oGroup);

        _oFade = new createjs.Shape();
        _oFade.graphics.beginFill("black").drawRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
        _oFade.alpha = 0;
        _oListener = _oFade.on("mousedown",function(){});
        s_oStage.addChild(_oFade);

        _oPanelContainer = new createjs.Container();   
        s_oStage.addChild(_oPanelContainer);
        
        var oSprite = s_oSpriteLibrary.getSprite('panel_bg');
        var oPanel = createBitmap(oSprite);        
        oPanel.regX = oSprite.width/2;
        oPanel.regY = oSprite.height/2;
        _oPanelContainer.addChild(oPanel);

        _oPanelContainer.x = CANVAS_WIDTH/2;
        _oPanelContainer.y = _iStartY = - oSprite.height/2;

        new CText(0, -280, null, 'QUA MÀN', "showcard", "#fffec9", 100, _oPanelContainer);

        _TextScore = new CText(0, -100, null, '90', "MontserratBlack", "#ffdf80", 140, _oPanelContainer, "#59173e");

        new CText(0, -60, null, 'Phần thưởng của bạn là học bổng 1 khóa', "MontserratBlack", "#FFF", 20, _oPanelContainer);
        new CText(0, -35, null, '"học giỏi thiểu học" 01 tháng từ HOCMAI', "MontserratBlack", "#FFF", 20, _oPanelContainer);

        new CText(0, 10, null, 'MÃ QUÀ TẶNG CỦA BẠN LÀ:', "MontserratBlack", "#FFF", 20, _oPanelContainer);
        

        _extraPanel = new createjs.Shape()
        _extraPanel.graphics
        .beginFill('#ffc46b')
        .setStrokeStyle(2)
        .beginLinearGradientStroke(["#6b1c4a","#6b1c4a"], [0, 1], 0, 4, 0, 120)
        .drawRoundRect(0, 0, 260, 40, 5)
        _extraPanel.shadow = new createjs.Shadow("#0000005c", 0, 3, 5);
        _extraPanel.x = -130
        _extraPanel.y = 30
        _oPanelContainer.addChild(_extraPanel);

        _TextCoupon = new CText(0, 60, null, 'ABCDEFGH', "MontserratBlack", "#6e172a", 30, _oPanelContainer);

        new CText(0, 100, null, 'Mã quà tặng của bạn đã được lưu vào giỏ hàng hãy xem', "MontserratSemiBold", "#fff", 18, _oPanelContainer);
        new CText(-105, 130, null, 'hướng dẫn sử dụng theo ', "MontserratSemiBold", "#fff", 18, _oPanelContainer);
        var _hyperlink = new CText( 105, 130, null, 'VIDEO HƯỚNG DẪN', "MontserratSemiBold", "#fff", 18, _oPanelContainer);
        _hyperlink.addEventListener(ON_MOUSE_UP, this.gotoLink, this, 0);

        _ButtonHome = new CGfxButton( -175 , 190, s_oSpriteLibrary.getSprite('home_button'), _oPanelContainer);
        _ButtonHome.addEventListener(ON_MOUSE_UP, this.onGoHome, this, 0);

        _ButtonNextGame = new CTextButton( 45, 190,s_oSpriteLibrary.getSprite('panel_button_bg'), 'QUA MÀN MỚI', "showcard", "#61230b", 35, _oPanelContainer);
        _ButtonNextGame.addEventListener(ON_MOUSE_UP, this._onButtonNextGame, this, 0);

    }

    this.gotoLink = function () {
        window.open('https://hocmai.vn')
    }

    this.onGoHome = function () {
        _oThis.hide();
        this.unload()
        _iState = 'HOME'
        _ScreenHome = new ScreenHome();
    }

    this.unload = function(){
        _ButtonNextGame.unload();
        _ButtonHome.unload();
        _oFade.off("click",_oListener);
        
        s_oStage.removeAllChildren();

        if (ScreenGame_1) {
            ScreenGame_1.unload()
        }
        if (ScreenGame_2) {
            ScreenGame_2.unload()
        }
        if (ScreenGame_3) {
            ScreenGame_3.unload()
        }
        if (ScreenGame_4) {
            ScreenGame_4.unload()
        }

        s_oMain.startUpdateNoBlock();
    };

    this.show = function(iScore){
        getCoupon(function(res) {
            if (res.code == 1) {
                _TextCoupon.changeText(res.data)
            }
            _TextScore.changeText(iScore)
            _oGroup.visible = true;
            
            // _oFade.alpha = 0;
            _oPanelContainer.y = _iStartY;
            createjs.Tween.get(_oFade).to({alpha:0.7},500);
            createjs.Tween.get(_oPanelContainer).to({y:CANVAS_HEIGHT/2},1000, createjs.Ease.bounceOut).call(function(){s_oMain.stopUpdateNoBlock();});
        })
    };

    this.hide = function(){
        s_oMain.startUpdateNoBlock();
        createjs.Tween.get(_oFade).to({alpha:0},200);
        createjs.Tween.get(_oPanelContainer).to({y:_iStartY},200, createjs.Ease.bounceIn).call(function(){ _oGroup.visible = false;});
    };
    
    this.addEventListener = function (iEvent, cbCompleted, cbOwner) {
        _aCbCompleted[iEvent] = cbCompleted;
        _aCbOwner[iEvent] = cbOwner;
    };

    this._onButtonNextGame = function () {
        _oThis.hide();
        if (_iState === 'GAME1') {
            if (GameUnLocked == 1) { GameUnLocked = 2; GAME_CHOOSE = 2 }
            new ChaseImageCaptureWordScreen1()
        }

        if (_iState === 'GAME2') {
            if (GameUnLocked == 2) { GameUnLocked = 3; GAME_CHOOSE = 3 }
            new Game3Screen1();
        }
        
        if (_iState === 'GAME3') {
            if (GameUnLocked == 3) { GameUnLocked = 4; GAME_CHOOSE = 4 }
            new Game4Screen1();
        }
    };
    
    _oThis = this;
    this._init();
}