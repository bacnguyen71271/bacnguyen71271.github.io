function CText(iXPos,iYPos,oSprite,szText,szFont,szColor,iFontSize,bAttach, shadowColor = "#903d0a"){
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
    
    this._init =function(iXPos,iYPos,oSprite,szText,szFont,szColor,iFontSize,bAttach, shadowColor){
        _bDisable = false;
        _aCbCompleted=new Array();
        _aCbOwner =new Array();

        if (oSprite) {
            _oButtonBg = createBitmap( oSprite);
            _iWidth = oSprite.width;
            _iHeight = oSprite.height;
        }
		
        var iStepShadow = Math.ceil(iFontSize/20);

        _oTextBack = new createjs.Text(szText,iFontSize+"px "+szFont, shadowColor);
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
            _oButton.addChild(_oButtonBg,_oTextBack,_oText);
        } else {
            _oButton.addChild(_oTextBack,_oText);
        }
        
        if(bAttach !== false){
            bAttach.addChild(_oButton);
        } else {
            s_oStage.addChild(_oButton);
        }
        
        this._initListener()
    };
    
    this.addEventListener = function( iEvent,cbCompleted, cbOwner ){
        _aCbCompleted[iEvent]=cbCompleted;
        _aCbOwner[iEvent] = cbOwner; 
    };

    this._initListener = function(){
        _oButton.on("mousedown", this.buttonDown);
        _oButton.on("pressup" , this.buttonRelease);      
     };

     this.buttonDown = function(){
        if(_bDisable){
            return;
        }
        // _oButton.scaleX = 0.9;
        // _oButton.scaleY = 0.9;

       if(_aCbCompleted[ON_MOUSE_DOWN]){
           _aCbCompleted[ON_MOUSE_DOWN].call(_aCbOwner[ON_MOUSE_DOWN]);
       }
    };

    this.buttonRelease = function(){
        if(_bDisable){
            return;
        }
        
        // playSound("click",1,false);
        
        // _oButton.scaleX = 1;
        // _oButton.scaleY = 1;

        if(_aCbCompleted[ON_MOUSE_UP]){
            _aCbCompleted[ON_MOUSE_UP].call(_aCbOwner[ON_MOUSE_UP],_oParams);
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

    this.pulseAnimation2 = function () {
        createjs.Tween.get(_oButton).to({scaleX: 1.1, scaleY: 1.1}, 100, createjs.Ease.quadOut).to({scaleX: 1, scaleY: 1}, 300, createjs.Ease.quadIn).call(function () {
        });
    };

    this.pulseAnimation1 = function () {
        createjs.Tween.get(_oButton)
            .to({rotation: 20}, 100, createjs.Ease.quadOut)
            .to({rotation: -20}, 100, createjs.Ease.quadIn)
            .to({rotation: 0}, 200, createjs.Ease.quadIn)
    }
    
    this.pulseAnimation3 = function (callback) {
        createjs.Tween.get(_oButton)
            .to({x: _oButton.x + 20}, 100, createjs.Ease.quadOut)
            .to({x: _oButton.x + -20}, 100, createjs.Ease.quadIn)
            .to({x: _oButton.x + 20}, 100, createjs.Ease.quadIn)
            .to({x: _oButton.x + -20}, 100, createjs.Ease.quadIn)
            .to({x: _oButton.x + 0}, 200, createjs.Ease.quadOut)
            .call(callback)
    }

    this.getText = function () {
        return _oText.text
    }
    
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

    this._init(iXPos, iYPos, oSprite, szText, szFont, szColor, iFontSize, bAttach, shadowColor);
    
    return this;
    
}