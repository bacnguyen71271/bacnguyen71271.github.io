function CHammer(oParentContainer){
    var _oHammer;
    var _oHammerSprite;
    
    this._init = function(oParentContainer){
        _oHammerSprite = {        
            images: [s_oSpriteLibrary.getSprite('hammer1')], 
            // width, height & registration point of each sprite
            frames: {width: HAMMER_WIDTH, height: HAMMER_HEIGHT, regX: HAMMER_WIDTH/2, regY: HAMMER_HEIGHT},
            framerate: 60,
            animations: { 
                start:1,
                hit:[1, 11, "stop"],
                stop:11
            }
        };
                
                
        var oSpriteSheetHammer = new createjs.SpriteSheet(_oHammerSprite);
        _oHammer = createSprite(oSpriteSheetHammer, "start", HAMMER_WIDTH/2, HAMMER_HEIGHT, HAMMER_WIDTH, HAMMER_HEIGHT);
        _oHammer.x = 1800;
        _oHammer.y = 525;
        _oHammer.alpha = 0;
        oParentContainer.addChild(_oHammer);
    };
    
    this.unload = function(){
        createjs.Tween.removeAllTweens();
        oParentContainer.removeAllChildren(); 
    };
    
    this._showHammer = function(iRow, iCol){
        _oHammer.y = iRow + 40;
        _oHammer.x = iCol + 0;
        _oHammer.visible = true;
        _oHammer.alpha = 1
        _oHammer.gotoAndPlay("hit");
        
        createjs.Tween.get(_oHammer ).wait(200).to({alpha: 0 }, 400);
    };
    
    
    this._init(oParentContainer);
    
}