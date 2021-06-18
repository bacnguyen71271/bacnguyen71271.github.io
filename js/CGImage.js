function CGImage(iXPos,iYPos,oSprite,oParentContainer){
    
    var _iScale;
	var _oListenerDown;
	var _oListenerUp;
    
    var _aCbCompleted;
    var _aCbOwner;
    var _aParams = [];
    var _oImage;
    var _oParentContainer;
    
    var _oParent = this;
    
    this._init =function(iXPos,iYPos,oSprite){
        
        _iScale = 1;
        
        _aCbCompleted=new Array();
        _aCbOwner =new Array();
        
        _oImage = createBitmap( oSprite);
        _oImage.x = iXPos;
        _oImage.y = iYPos; 
                                   
        _oImage.regX = oSprite.width/2;
        _oImage.regY = oSprite.height/2;
       
        _oParentContainer.addChild(_oImage);
        
    };
    
    this.unload = function(){       
       _oParentContainer.removeChild(_oImage);
    };
    
    this.setVisible = function(bVisible){
        _oImage.visible = bVisible;
    };
    
    this.setScale = function(iScale){
        _iScale = iScale;
        _oImage.scaleX = _oImage.scaleY = _iScale;
    };
    
    this.buttonRelease = function(){
        _oImage.scaleX = _iScale;
        _oImage.scaleY = _iScale;

        if(_aCbCompleted[ON_MOUSE_UP]){
            _aCbCompleted[ON_MOUSE_UP].call(_aCbOwner[ON_MOUSE_UP],_aParams);
        }
    };
    
    this.setScale = function(iValue){
        _iScale = iValue;
        _oImage.scaleX = iValue;
        _oImage.scaleY = iValue;
    };
    
    this.setPosition = function(iXPos,iYPos){
         _oImage.x = iXPos;
         _oImage.y = iYPos;
    };
    
    this.setX = function(iXPos){
         _oImage.x = iXPos;
    };
    
    this.setY = function(iYPos){
         _oImage.y = iYPos;
    };
    
    this.getImage = function(){
        return _oImage;
    };
    
    
    this.getX = function(){
        return _oImage.x;
    };
    
    this.getY = function(){
        return _oImage.y;
    };
    
    _oParentContainer = oParentContainer;
    
    this._init(iXPos,iYPos,oSprite);
    
    return this;
}