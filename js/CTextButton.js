function CTextButton(iXPos,iYPos,oSprite,szText,szFont,szColor,iFontSize,bAttach, textAlign = 'center'){
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
    var _textBounds;
    var _iStepShadow;
    // var _textMetric;
    
    this._init =function(iXPos,iYPos,oSprite,szText,szFont,szColor,iFontSize,bAttach, textAlign){
        _bDisable = false;
        _aCbCompleted=new Array();
        _aCbOwner =new Array();

        _oButtonBg = createBitmap( oSprite);
        _iWidth = oSprite.width;
        _iHeight = oSprite.height;
		
        _iStepShadow = Math.ceil(iFontSize/20);
        
        if (szColor == '#fff') {
            _shadowColor = '#93420a'
        } else {
            _shadowColor = '#ffdb88'
        }
        
        _oTextBack = new createjs.Text(szText,iFontSize+"px "+szFont, _shadowColor);
        _textBounds = _oTextBack.getBounds();
        _textMetric = _oTextBack.getMetrics();
        _oTextBack.textAlign = textAlign;
        _oTextBack.lineWidth = _iWidth *0.85;
        _oTextBack.textBaseline = "alphabetic";
        if (textAlign !== 'center') {
            _oTextBack.x = oSprite.width/2 - _oTextBack.getMetrics().width / 2
        } else {
            _oTextBack.x = oSprite.width/2;
        }
        
        _oTextBack.y = Math.floor((oSprite.height)/2) +(_textBounds.height/3) + _iStepShadow;

        _oText = new createjs.Text(szText,iFontSize+"px "+szFont, szColor);
        _oText.textAlign = textAlign;
        _oText.textBaseline = "alphabetic";  
        _oText.lineWidth = _iWidth *0.85;

        if (textAlign !== 'center') {
            _oText.x = oSprite.width/2 - _oText.getMetrics().width / 2
        } else {
            _oText.x = oSprite.width/2;
        }
        _oText.y = Math.floor((oSprite.height)/2) +(_textBounds.height/3);

        _oButton = new createjs.Container();
        _oButton.x = iXPos;
        _oButton.y = iYPos;
        _oButton.regX = oSprite.width/2;
        _oButton.regY = oSprite.height/2;
        
        if (!s_bMobile){
            _oButton.cursor = "pointer";
        }
        _oButton.addChild(_oButtonBg,_oTextBack,_oText);
        
        if(bAttach !== false){
            bAttach.addChild(_oButton);
        } else {
            bAttach.addChild(_oButton);
        }
        
        this._initListener();
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
    
    this._initListener = function(){
       _oButton.on("mousedown", this.buttonDown);
       _oButton.on("pressup" , this.buttonRelease);      
    };
    
    this.addEventListener = function( iEvent,cbCompleted, cbOwner ){
        _aCbCompleted[iEvent]=cbCompleted;
        _aCbOwner[iEvent] = cbOwner; 
    };
    
    this.addEventListenerWithParams = function(iEvent,cbCompleted, cbOwner,oParams){
        _aCbCompleted[iEvent]=cbCompleted;
        _aCbOwner[iEvent] = cbOwner;
        
        _oParams = oParams;
    };
    
    this.buttonRelease = function(){
        if(_bDisable){
            return;
        }
        
        playSound("click",1,false);
        
        _oButton.scaleX = 1;
        _oButton.scaleY = 1;

        if(_aCbCompleted[ON_MOUSE_UP]){
            _aCbCompleted[ON_MOUSE_UP].call(_aCbOwner[ON_MOUSE_UP],_oParams);
        }
    };
    
    this.buttonDown = function(){
        if(_bDisable){
            return;
        }
        _oButton.scaleX = 0.9;
        _oButton.scaleY = 0.9;

       if(_aCbCompleted[ON_MOUSE_DOWN]){
           _aCbCompleted[ON_MOUSE_DOWN].call(_aCbOwner[ON_MOUSE_DOWN]);
       }
    };
    
    this.setPosition = function(iXPos,iYPos){
         _oButton.x = iXPos;
         _oButton.y = iYPos;
    };
    
    this.changeFont = function (font) {
        _oText.font = font
        _oTextBack.font = font
    }

    this.changeText = function(szText, textAlign = 'center'){
        _oText.text = szText;
        _oTextBack.text = szText;
        _oText.y = _oText.getMetrics().lines.length === 1 ? Math.floor((oSprite.height)/2) + (_oText.getMeasuredHeight()/3) : Math.floor((oSprite.height)/2) - (_oText.getMeasuredHeight() / (_oText.getMetrics().lines.length * 5));
        _oTextBack.y = _oText.getMetrics().lines.length === 1 ? Math.floor((oSprite.height)/2) + (_oText.getMeasuredHeight()/3) : Math.floor((oSprite.height)/2) - (_oText.getMeasuredHeight() / (_oText.getMetrics().lines.length * 5)) + _iStepShadow;

        if (textAlign == 'auto') {
            var _textAlign = _oText.getMetrics().lines.length === 1 ? 'center' : 'left'
            _oText.textAlign = _textAlign
            _oTextBack.textAlign = _textAlign
        } else {
            _oText.textAlign = textAlign
            _oTextBack.textAlign = textAlign
        }

        if (textAlign !== 'center') {
            _oText.x = oSprite.width/2 - _oText.getMetrics().width / 2
            _oTextBack.x = oSprite.width/2 - _oTextBack.getMetrics().width / 2
        } else {
            _oText.x = oSprite.width/2;
            _oTextBack.x = oSprite.width/2;
        }
    };
    
    this.changeColor = function(color){
        _oText.color = color;
    };

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

    this._init(iXPos,iYPos,oSprite,szText,szFont,szColor,iFontSize,bAttach, textAlign);
    
    return this;
    
}