function CEndPanel(){
    var _iStartY;
    var _oListener;
    var _oFade;
    var _oGroup;
    
    var _oMsgTextBack;
    var _oScoreTextBack;
    var _oMsgText;
    var _oScoreText;
    var _oBestScoreText;
    var _oBestScoreTextBack;
    var _oButHome;
    var _oButRestart;
    var _oPanelContainer;
    var _oThis;
    
    this._init = function(){
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
        
        var oSprite = s_oSpriteLibrary.getSprite('msg_box');
        var oPanel = createBitmap(oSprite);        
        oPanel.regX = oSprite.width/2;
        oPanel.regY = oSprite.height/2;
        _oPanelContainer.addChild(oPanel);
        
        _oPanelContainer.x = CANVAS_WIDTH/2;
        _oPanelContainer.y = _iStartY = - oSprite.height/2;    
        
        _oMsgTextBack = new createjs.Text(""," 76px "+FONT, "#000");
        _oMsgTextBack.x = 0;
        _oMsgTextBack.y = -80;
        _oMsgTextBack.textAlign = "center";
        _oMsgTextBack.textBaseline = "alphabetic";
        _oMsgTextBack.lineWidth = 800; 
        _oMsgTextBack.outline = 6;
        _oPanelContainer.addChild(_oMsgTextBack);
        
        _oMsgText = new createjs.Text(""," 76px "+FONT, "#ffb557");
        _oMsgText.x = 0;
        _oMsgText.y = -80;
        _oMsgText.textAlign = "center";
        _oMsgText.textBaseline = "alphabetic";
        _oMsgText.lineWidth = 800;        
        _oPanelContainer.addChild(_oMsgText);
        
        _oScoreTextBack = new createjs.Text(""," 45px "+FONT, "#000");
        _oScoreTextBack.x = 0;
        _oScoreTextBack.y = 10;
        _oScoreTextBack.textAlign = "center";
        _oScoreTextBack.textBaseline = "alphabetic";
        _oScoreTextBack.lineWidth = 800;
        _oScoreTextBack.outline = 6;
        _oPanelContainer.addChild(_oScoreTextBack);
        
        _oScoreText = new createjs.Text(""," 45px "+FONT, "#ffb557");
        _oScoreText.x = 0;
        _oScoreText.y = 10;
        _oScoreText.textAlign = "center";
        _oScoreText.textBaseline = "alphabetic";
        _oScoreText.lineWidth = 800;
        _oPanelContainer.addChild(_oScoreText);
        
        _oBestScoreTextBack = new createjs.Text(""," 45px "+FONT, "#000");
        _oBestScoreTextBack.x = 0;
        _oBestScoreTextBack.y = 70;
        _oBestScoreTextBack.textAlign = "center";
        _oBestScoreTextBack.textBaseline = "alphabetic";
        _oBestScoreTextBack.lineWidth = 800;
        _oBestScoreTextBack.outline = 6;
        _oPanelContainer.addChild(_oBestScoreTextBack);
        
        _oBestScoreText = new createjs.Text(""," 45px "+FONT, "#ffb557");
        _oBestScoreText.x = 0;
        _oBestScoreText.y = 70;
        _oBestScoreText.textAlign = "center";
        _oBestScoreText.textBaseline = "alphabetic";
        _oBestScoreText.lineWidth = 800;
        _oPanelContainer.addChild(_oBestScoreText);
        
        _oButHome = new CGfxButton( -200 ,170,s_oSpriteLibrary.getSprite('but_home'),_oPanelContainer);
        _oButHome.addEventListener(ON_MOUSE_UP, this._onHome, this, 0);
        
        _oButRestart = new CGfxButton( 200 ,170,s_oSpriteLibrary.getSprite('but_restart'),_oPanelContainer);
        _oButRestart.addEventListener(ON_MOUSE_UP, this._onRestart, this, 0);
    };
    
    this.unload = function(){
        _oButHome.unload();
        _oButRestart.unload();
        _oFade.off("click",_oListener);
        
        s_oStage.removeChild(_oGroup);
    };
    
    this.show = function(iScore){
	playSound("game_over",1,false);
        
        _oMsgTextBack.text = TEXT_GAMEOVER;
        _oScoreTextBack.text = TEXT_SCORE + " " + iScore;
        _oMsgText.text = TEXT_GAMEOVER;
        _oScoreText.text = TEXT_SCORE + " " + iScore;
        _oBestScoreText.text = TEXT_BEST_SCORE + " " + s_iBestScore;
        _oBestScoreTextBack.text = TEXT_BEST_SCORE + " " + s_iBestScore;
        
        _oGroup.visible = true;
        
        _oFade.alpha = 0;
        _oPanelContainer.y = _iStartY;
        createjs.Tween.get(_oFade).to({alpha:0.7},500);
        createjs.Tween.get(_oPanelContainer).to({y:CANVAS_HEIGHT/2},1000, createjs.Ease.bounceOut);
        
        $(s_oMain).trigger("share_event",iScore);
        $(s_oMain).trigger("save_score",[iScore]);
        $(s_oMain).trigger("end_session");
    };

    this._onHome = function(){
        $(s_oMain).trigger("show_interlevel_ad");
        s_oGame.onConfirmExit();
    };
    
    this._onRestart = function(){
        $(s_oMain).trigger("show_interlevel_ad");
        _oGroup.visible = false;
        s_oGame._init();
    };
    
    _oThis = this;
    this._init();
    
    return this;
}
