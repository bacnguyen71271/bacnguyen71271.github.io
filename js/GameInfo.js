function GameInfo(iXPos, iYPos, oSprite, szText, bAttach){
    var _bDisable;
    var _iWidth;
    var _iHeight;
    var _aCbCompleted;
    var _aCbOwner;
    var _oParams;
    var _oButton;
    var _oTextBack;
    var _oText;
    var _oButtonBg;
    var iFontSize = 35;
    var szColor = '#602708';
    var szFont = 'showcard'
    
    this._init =function(iXPos, iYPos, oSprite, szText, bAttach){
        _bDisable = false;
        _aCbCompleted=new Array();
        _aCbOwner =new Array();

        // new CText(_pCartPos.x, _pCartPos.y, s_oSpriteLibrary.getSprite('game_info_bg'), '+20 ĐIỂM', "showcard", "#fff", 25, s_oStage);  
        // new CGImage(_pCartPos.x, _pCartPos.y, s_oSpriteLibrary.getSprite('clock'), s_oStage)

        if (oSprite) {
            _oButtonIcon = createBitmap( oSprite);
            _oButtonIcon.x = oSprite.width/2 - 100;
            _oButtonIcon.y = oSprite.height/2 - 60;
        }

        oSprite = s_oSpriteLibrary.getSprite('game_info_bg')
        if (oSprite) {
            _oButtonBg = createBitmap( oSprite);
            _iWidth = oSprite.width;
            _iHeight = oSprite.height;
        }
		
        var iStepShadow = Math.ceil(iFontSize/20);

        _oTextBack = new createjs.Text(szText,iFontSize+"px "+szFont, "#903d0a");
        var oBounds = _oTextBack.getBounds();
        _oTextBack.textAlign = "center";
        _oTextBack.lineWidth = _iWidth *0.9;
        _oTextBack.textBaseline = "alphabetic";

        if (oSprite) {
            _oTextBack.x = oSprite.width/2;
            _oTextBack.y = Math.floor((oSprite.height)/2) +(oBounds.height/3) + iStepShadow;
        } else {
            _oTextBack.y = iStepShadow;
        }

        _oText = new createjs.Text(szText,iFontSize+"px "+szFont, szColor);
        _oText.textAlign = "center";
        _oText.textBaseline = "alphabetic";  
        _oText.lineWidth = _iWidth *0.9;

        if (oSprite) {
            _oText.x = oSprite.width/2;
            _oText.y = Math.floor((oSprite.height)/2) +(oBounds.height/3);
        }

        _oButton = new createjs.Container();
        _oButton.x = iXPos;
        _oButton.y = iYPos;
        
        if (oSprite) {
            _oButton.regX = oSprite.width/2;
            _oButton.regY = oSprite.height/2;
        }

        if (oSprite) {
            _oButton.addChild(_oButtonBg, _oButtonIcon, _oTextBack,_oText);
        } else {
            _oButton.addChild(_oTextBack,_oText);
        }
        
        if(bAttach !== false){
            s_oStage.addChild(_oButton);
        }
    };
    
    this.unload = function(){
       _oButton.off("mousedown");
       _oButton.off("pressup");
       
       s_oStage.removeChild(_oButton);
    };
    
    this.setVisible = function(bVisible){
        _oButton.visible = bVisible;
    };
    
    this.setAlign = function(szAlign){
        _oText.textAlign = szAlign;
        _oTextBack.textAlign = szAlign;
    };
    
    this.enable = function(){
        _bDisable = false;
		
	_oButtonBg.filters = [];

        _oButtonBg.cache(0,0,_iWidth,_iHeight);
    };
    
    this.disable = function(){
        _bDisable = true;
		
	var matrix = new createjs.ColorMatrix().adjustSaturation(-100).adjustBrightness(40);
        _oButtonBg.filters = [
                                new createjs.ColorMatrixFilter(matrix)
                             ];
        _oButtonBg.cache(0,0,_iWidth,_iHeight);
    };
    
    this.setPosition = function(iXPos,iYPos){
         _oButton.x = iXPos;
         _oButton.y = iYPos;
    };
    
    this.changeText = function(szText){
        _oText.text = szText;
        _oTextBack.text = szText;
    };
    
    this.setX = function(iXPos){
         _oButton.x = iXPos;
    };
    
    this.setY = function(iYPos){
         _oButton.y = iYPos;
    };
    
    this.getButtonImage = function(){
        return _oButton;
    };

    this.getX = function(){
        return _oButton.x;
    };
    
    this.getY = function(){
        return _oButton.y;
    };
    
    this.getSprite = function(){
        return _oButton;
    };

    this._init(iXPos, iYPos, oSprite, szText, bAttach);
    
    return this;
    
}