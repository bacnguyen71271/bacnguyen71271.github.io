function PausePanel () {
    var _aCbCompleted;
    
    var _iStartY;
    var _oListener;
    var _oFade;
    var _oPanelContainer;

    var _ButtonReturn;
    var _ButtonHome;
    var _ButtonChooseGame;

    var _oThis;

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

        _ButtonReturn = new CTextButton( 0 , -40,s_oSpriteLibrary.getSprite('panel_button_bg'), "QUAY LẠI GAME", "showcard", "#a04623", 30, _oPanelContainer); 
        _ButtonReturn.addEventListener(ON_MOUSE_UP, this._onButtonReturn, this, 0);

        _ButtonHome = new CTextButton( 0 , 50,s_oSpriteLibrary.getSprite('panel_button_bg'), "VỀ TRANG CHỦ", "showcard", "#a04623", 30, _oPanelContainer); 
        _ButtonHome.addEventListener(ON_MOUSE_UP, this.onGoHome, this, 0);
        
        _ButtonChooseGame = new CTextButton( 0 , 140,s_oSpriteLibrary.getSprite('panel_button_bg'), "CHỌN GAME", "showcard", "#a04623", 30, _oPanelContainer); 
        _ButtonChooseGame.addEventListener(ON_MOUSE_UP, this.onGoChooseGame, this, 0);

        new CText(0, -120, null, 'TẠM DỪNG', "showcard", "#fffec9", 70, _oPanelContainer);

    }

    this.onGoChooseGame = function () {
        this.unload()
        _iState = 'CHOOSE_GAME'
        _ScreenChooseGame = new ScreenChooseGame();
    }

    this.onGoHome = function () {
        this.unload()
        _iState = 'HOME'
        _ScreenHome = new ScreenHome();
    }

    this.unload = function(){
        _ButtonReturn.unload();
        _ButtonHome.unload();
        _ButtonChooseGame.unload();
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

    this.show = function(){
        _oGroup.visible = true;
        
        // _oFade.alpha = 0;
        _oPanelContainer.y = _iStartY;
        createjs.Tween.get(_oFade).to({alpha:0.7},500);
        createjs.Tween.get(_oPanelContainer).to({y:CANVAS_HEIGHT/2},1000, createjs.Ease.bounceOut).call(function(){s_oMain.stopUpdateNoBlock();});
    };

    this.hide = function(){
        s_oMain.startUpdateNoBlock();
        createjs.Tween.get(_oFade).to({alpha:0},300);
        createjs.Tween.get(_oPanelContainer).to({y:_iStartY},200, createjs.Ease.bounceIn).call(function(){ _oGroup.visible = false;});
    };
    
    this.addEventListener = function (iEvent, cbCompleted, cbOwner) {
        _aCbCompleted[iEvent] = cbCompleted;
        _aCbOwner[iEvent] = cbOwner;
    };

    this._onButtonReturn = function () {
        _oThis.hide();
        
        if (_aCbCompleted[ON_BUT_YES_DOWN]) {
            _aCbCompleted[ON_BUT_YES_DOWN].call(_aCbOwner[ON_BUT_YES_DOWN]);
        }
    };

    _oThis = this;
    this._init();
}