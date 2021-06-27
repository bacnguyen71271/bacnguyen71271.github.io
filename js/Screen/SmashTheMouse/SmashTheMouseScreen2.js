function SmashTheMouseScreen2 () {
    var _ButtonBack;
    var _iScore;
    var _aGrid;
    var _aCharacterToSpawn;
    var _aCharacterSelected;
    var _bOnHitArea = false;
    var _bUpdate;
    var _iTimeElapsed;
    var _iTimeLevelUpElapsed
    var _iTimeSpawnElaps
    var s_iTimeElaps = 0;
    // var _oInterface;

    this.init = function() {
        _iScore = 0;
        _iCurCharacterHit = 0;
        _iTimeLevelUpElapsed = 0
        _aCharacterSelected = new Array(0, 0, 0, 0, 0, 0);
        _iTimeElapsed = 60000;
        _iCurTimeSpawn = _iTimeSpawnElaps = 1000;
        s_iPrevTime = new Date().getTime();
        

        var oModePos = {x: CANVAS_WIDTH/2, y: 875};
        // Add background
        _Bg = createBitmap(s_oSpriteLibrary.getSprite('game1_bg'));
        s_oStage.addChild(_Bg);

        // Add Audio Button
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            var oSprite = s_oSpriteLibrary.getSprite('audio_icon');
            _pStartPosAudio = {x: CANVAS_WIDTH - (oSprite.height/2) - 30, y: (oSprite.height/2) + 30};
            
            _oAudioToggle = new CToggle(_pStartPosAudio.x,_pStartPosAudio.y,oSprite,s_bAudioActive);
            _oAudioToggle.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this);    
        }

        // Add Cart Button
        var oSprite = s_oSpriteLibrary.getSprite('cart_icon');
        _pCartPos = {x: CANVAS_WIDTH - (oSprite.height/2) - 30, y: (oSprite.height/2) + 30};
        _ButtonCart = new CGfxButton(_pCartPos.x, _pCartPos.y, oSprite, s_oStage);
        _ButtonCart.addEventListener(ON_MOUSE_UP, () => {}, this);    

        _Time = new GameInfo(_pCartPos.x, _pCartPos.y, s_oSpriteLibrary.getSprite('clock'), s_oSpriteLibrary.getSprite('game_info_bg'), '00:00', '#602708', s_oStage)
        _Scores = new GameInfo(_pCartPos.x, _pCartPos.y, s_oSpriteLibrary.getSprite('start'), s_oSpriteLibrary.getSprite('game_info_bg'), '0', '#602708', s_oStage)
    
        // _oInterface = new CInterface();

        _oContainerGrid = new createjs.Container();
        s_oStage.addChild(_oContainerGrid);

        _aCharacterToSpawn = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3];

        this._createCells();
        _oHammer = new CHammer(_oContainerGrid);

        _bUpdate = true;
        this._selectCharacter();

        createjs.Ticker.addEventListener("tick", this.update);
        createjs.Ticker.framerate = FPS;
        this.refreshButtonPos();
    }

    this._update = function(event){
        s_SmashTheMouseScreen2.update();
    };

    this.updateTime = function (timeString) {
        _Time.changeText(timeString)
    }

    this.updateScore = function (score) {
        _Scores.changeText(score)
    }

    this.update = function(){
        
        if(_bUpdate){
            var iCurTime = new Date().getTime();
            
            s_iTimeElaps = iCurTime - s_iPrevTime;
            s_iCntTime += s_iTimeElaps;
            // console.log(s_iCntFps);
            s_iCntFps++;
            s_iPrevTime = iCurTime;

            if ( s_iCntTime >= 1000 ){
                // console.log(s_iCntTime)
                s_iCurFps = s_iCntFps;
                s_iCntTime-=1000;
                s_iCntFps = 0;
            }
            
            //REFRESH TIME BAR
            _iTimeElapsed -= s_iTimeElaps;
            // _oInterface.refreshTime(_iTimeElapsed / (TIME_LEVEL) ); 
            if (_iTimeElapsed < 0){
                _bUpdate = false;
                // _oInterface.refreshTimeText(formatTime(0));
                // this.gameOver();
            }else{
                s_SmashTheMouseScreen2.updateTime(formatTime(_iTimeElapsed))
                // _oInterface.refreshTimeText(formatTime(_iTimeElapsed));
            }
            
            //REFRESH TIME FOR LEVEL UP
            _iTimeLevelUpElapsed += s_iTimeElaps;
            if(_iTimeLevelUpElapsed > TIME_OFFSET_PER_SPAWN_DECREASE){
                _iTimeLevelUpElapsed = 0;
                _iCurTimeSpawn -= OFFSET_SPAWN_TIME;
                if(_iCurTimeSpawn < 0){
                    _iCurTimeSpawn = 0;
                }
            }
            
            //REFRESH TIME FOR NEXT SPAWN
            // console.log(_iTimeElapsed / 1000)
            _iTimeSpawnElaps -= s_iTimeElaps;
            // console.log(s_iTimeElaps);
            
            // console.log(_iTimeLevelUpElapsed)
            if(_iTimeSpawnElaps < 0){
                _iTimeSpawnElaps = _iCurTimeSpawn;
                s_SmashTheMouseScreen2._selectCharacter();
            }
            
            s_oStage.update(event);
        }
    };

    this._scoreModifier = function(iValue){
        _iScore += (GAME_1_POINT[iValue]);
        if(_iScore < 0 ){
            _iScore = 0;
        }else if(_iScore > s_iBestScore){
            s_iBestScore = _iScore;
            // _oInterface.refreshBestScore();
        }
        
        this.updateScore(_iScore)
        
        if(GAME_1_POINT[iValue] > 0){
            _iCurCharacterHit++;
        }
    };

    this._hammerOn = function(event, iData){
        if(!_bOnHitArea) {
            _bOnHitArea = true;
            
            _aGrid[iData.iRow][iData.iCol]._hitCell(_aCharacterSelected[(NUM_COLS*iData.iRow)+iData.iCol], 1);
            _oHammer._showHammer(START_Y_GRID+(HOLE_HEIGHT*iData.iRow)-150, START_X_GRID+(HOLE_WIDTH*iData.iCol));
            
            playSound("hammer",1,false);
            
            _bOnHitArea = false;
        }
    };

    this._createCells = function(){
        var iX = START_X_GRID;
        var iY = START_Y_GRID;
        
        _aGrid = new Array();
        for(var iRow=0; iRow < NUM_ROWS; iRow++){
            _aGrid[iRow] = new Array();
            for(var iCol=0; iCol < NUM_COLS; iCol++){
                _aGrid[iRow][iCol] = new CCharacterInHole(iX,iY,_oContainerGrid, "hole");
                //SHAPE FOR HIT AREA
                _oHitArea = new createjs.Shape();
                _oHitArea.graphics.beginFill("rgba(255,255,255,0.01)").drawRect(iX-(HOLE_WIDTH/2), iY-HOLE_HEIGHT, HOLE_WIDTH, HOLE_HEIGHT);
                _oContainerGrid.addChild(_oHitArea);
                _oHitArea.on("mousedown", s_SmashTheMouseScreen2._hammerOn, this, false, {iRow: iRow, iCol: iCol});
                iX += HOLE_WIDTH;
            }
            iY += HOLE_HEIGHT;
            iX = START_X_GRID;
        } 
    };

    this._selectCharacter = function(){

        var iX;
        var iY;

        var iAttempt =0;
        do{
            iX = Math.floor(Math.random() * (NUM_COLS));
            iY = Math.floor(Math.random() * (NUM_ROWS));
            iAttempt++;
            if(iAttempt === 20){
                return;
            }
        }while(_aGrid[iX][iY].getValue());



        var iRandIndex = Math.floor(Math.random()*_aCharacterToSpawn.length);
        _aCharacterSelected[((iX*NUM_COLS)+iY)] = _aCharacterToSpawn[iRandIndex];
        var iRandTime = Math.floor(Math.random() * 1500);
        var iRandTimeWait = Math.floor(Math.random() * (1000 - 200 + 1)) + 200;
        _aGrid[iX][iY].spawnCharacter(_aCharacterSelected[((iX*NUM_COLS)+iY)], iRandTime, iRandTimeWait);
    };

    this._onAudioToggle = function(){
        Howler.mute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive;
    };

    this.tremble = function(){
        var xShifting = 10;
        var yShifting = 30;

        createjs.Tween.get(s_oStage).to({x: Math.round(Math.random()*xShifting), y: Math.round(Math.random()*yShifting) }, 50).call(function() {
            createjs.Tween.get(s_oStage).to({x: Math.round(Math.random()*xShifting*0.8), y:-Math.round(Math.random()*yShifting*0.8) }, 50).call(function() {
                createjs.Tween.get(s_oStage).to({y:0, x:0 }, 50);
            });
        });
        
    };

    this.refreshButtonPos = function(){
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            _oAudioToggle.setPosition(_pStartPosAudio.x - s_iOffsetX,s_iOffsetY + _pStartPosAudio.y);
        }
        _ButtonCart.setPosition(_pCartPos.x - s_iOffsetX - 130,s_iOffsetY + _pCartPos.y);
        _Time.setPosition(s_iOffsetX + 200, s_iOffsetY + 80);
        _Scores.setPosition(s_iOffsetX + 500, s_iOffsetY + 80);
        // _ButtonBack.setPosition(_pBackPos.x + s_iOffsetX,s_iOffsetY + _pBackPos.y);
    }

    s_SmashTheMouseScreen2 = this;
    this.init()
}

var s_SmashTheMouseScreen2 = null;