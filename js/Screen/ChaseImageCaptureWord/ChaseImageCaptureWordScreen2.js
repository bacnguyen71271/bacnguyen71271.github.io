function ChaseImageCaptureWordScreen2 () {
    
    var _ButtonBack;
    var _wordPre = -1;
    var _wordUsed = []
    var _pointCusor = 0;
    var _wordSelectIndex = -1;
    var _inputLength = 7;
    var _buttonSelectLength = 14;
    var _buttonSelect = []
    var _buttonSelected = []
    var _inputWidth = 0;
    var _input = []
    var _stringArr = []
    var _iScore = 0;
    var _totalTime = 0;
    var _iTimeLevelUpElapsed

    var oModePos;
    
    var _FailedPartPanel = null;
    var _PassPartPanel = null;

    var _iTimeElapsed;

    var scorePoint_1
    var scorePointText_1
    var scorePoint_2
    var scorePointText_2
    var scorePoint_3
    var scorePointText_3

    var _imageWord = [
        {
            image: 'image_word_1',
            word: 'baocao',
        },
        {
            image: 'image_word_2',
            word: 'yenbinh',
        },
        {
            image: 'image_word_3',
            word: 'bongda',
        },
        {
            image: 'image_word_4',
            word: 'cadao',
        },
        {
            image: 'image_word_5',
            word: 'cangua',
        },
        {
            image: 'image_word_6',
            word: 'caumay',
        },
        {
            image: 'image_word_7',
            word: 'chidiem',
        },
        {
            image: 'image_word_8',
            word: 'cobap',
        },
        {
            image: 'image_word_9',
            word: 'hoahau',
        },
        {
            image: 'image_word_10',
            word: 'nguao',
        },
    ]

    var _fRequestFullScreen = null;
    var _fCancelFullScreen = null;

    this.init = function() {

        _iTimeElapsed = 60000;
        _iTimeLevelUpElapsed = 0
        _totalTime = 0;

        oModePos = {x: CANVAS_WIDTH/2, y: 875};
        // Add background
        _Bg = createBitmap(s_oSpriteLibrary.getSprite('ldp_background'));
        s_oStage.addChild(_Bg);

        // Overlay Layout
        _Fade = new createjs.Shape()
        _Fade.graphics.beginFill('black').drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
        _Fade.alpha = 0.6
        s_oStage.addChild(_Fade);
        _Listener = _Fade.on("click", function () {});

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
        _ButtonCart.pulseAnimation2()
        _ButtonCart.addEventListener(ON_MOUSE_UP, openCouponPopup , this);

        // Fullscreen
        var doc = window.document;
        var docEl = doc.documentElement;
        _fRequestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
        _fCancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;

        if(ENABLE_FULLSCREEN === false){
            _fRequestFullScreen = false;
        }

        if (_fRequestFullScreen && screenfull.enabled){
            oSprite = s_oSpriteLibrary.getSprite("but_fullscreen")
            _pStartPosFullscreen = {x: oSprite.width/4 + 10,y:(oSprite.height/2) + 10};
            _oButFullscreen = new CToggle(_pStartPosFullscreen.x,_pStartPosFullscreen.y,oSprite,s_bFullscreen, s_oStage);
            _oButFullscreen.addEventListener(ON_MOUSE_UP,this._onFullscreenRelease,this);
        }

        var oSprite = s_oSpriteLibrary.getSprite('game_pause');
        _pPausePos = {x: CANVAS_WIDTH - (oSprite.height/2) - 30, y: (oSprite.height/2) + 30};
        _ButtonPause = new CGfxButton(_pPausePos.x, _pPausePos.y, oSprite, s_oStage);

        _Scores = new GameInfo(_pCartPos.x, _pCartPos.y, s_oSpriteLibrary.getSprite('start'), s_oSpriteLibrary.getSprite('game_info_bg_2'), '0', '#fce48a', s_oStage)

        scorePointText_1 = new CText(280, s_iOffsetY + 35 , null, '+100 ĐIỂM', "showcard", "#fff", 25, s_oStage)
        scorePoint_1 =new CGImage(280, s_iOffsetY + 60 , s_oSpriteLibrary.getSprite('time_point'), s_oStage);
        
        scorePointText_2 = new CText(450, s_iOffsetY + 35, null, '+200 ĐIỂM', "showcard", "#fff", 25, s_oStage)
        scorePoint_2 = new CGImage(450, s_iOffsetY + 60, s_oSpriteLibrary.getSprite('time_point'), s_oStage);

        scorePointText_3 = new CText(600, s_iOffsetY + 35, null, '+300 ĐIỂM', "showcard", "#fff", 25, s_oStage)
        scorePoint_3 = new CGImage(600, s_iOffsetY + 60, s_oSpriteLibrary.getSprite('time_point'), s_oStage);

        _Time = new TimeProcess(_pCartPos.x, _pCartPos.y, '00:00', 70, s_oStage)

        var sprite = s_oSpriteLibrary.getSprite('game_board')
        new CGImage(oModePos.x - 390, oModePos.y + 160, sprite, s_oStage);

        // Create image
        for (let index = 0; index < _imageWord.length; index++) {
            _imageWord[index].imageView = new CGImage(550, oModePos.y + 150, s_oSpriteLibrary.getSprite('image_word_' + (index+1)), s_oStage)
            _imageWord[index].imageView.setVisible(false)
        }

        // Create input
        for (let index = 0; index < _inputLength; index++) {
            _input.push(new CText(1170 + (100 * index), oModePos.y , s_oSpriteLibrary.getSprite('text_box_1'), 'W', "showcard", "#fffec9", 40, s_oStage))
        }

        // Create select button
        for (let index = 0; index < _buttonSelectLength; index++) {
            var col = index % 4;
            var row = parseInt(index / 4)
            var button = new CTextButton(1260 + (160 * col) , oModePos.y + 20 + (row * 110), s_oSpriteLibrary.getSprite('text_box_2'), ' ', "MontserratBlack", "#7d2308", 35, s_oStage)
            button.addEventListenerWithParams(ON_MOUSE_UP, this.selectText , this, index);
            _buttonSelect.push(button)
        }

        // Add button backspace
        _buttonBackSpace = new CTextButton(1660, oModePos.y + 40 + (3 * 105) , s_oSpriteLibrary.getSprite('bg_back_2'), 'XÓA', "MontserratBlack", "#7d2308", 35, s_oStage)
        _buttonBackSpace.addEventListener(ON_MOUSE_UP, this.backSpace , this);

        // Button next game
        _buttonNextGame = new CTextButton(1320, oModePos.y + 460 , s_oSpriteLibrary.getSprite('next_game'), ' ', "MontserratBlack", "#7d2308", 35, s_oStage)
        _buttonNextGame.addEventListener(ON_MOUSE_UP, this.nextGame , this);
        _buttonNextGame.disable()

        // Button next frame
        _buttonNextFrame = new CTextButton(1640, oModePos.y + 460 , s_oSpriteLibrary.getSprite('next_frame'), ' ', "MontserratBlack", "#7d2308", 35, s_oStage)
        _buttonNextFrame.addEventListener(ON_MOUSE_UP, this.refreshGame , this);

        _input[5].changeText('')

        _PassPartPanel = new PassPartPanel2();
        _FailedPartPanel = new FailedPartPanel();
        _PausePanel = new PausePanel();

        _ButtonPause.addEventListener(ON_MOUSE_UP, s_ChaseImageCaptureWordScreen2.onPauseGame, this);

        this.refreshGame()
        this.refreshButtonPos();
        playSound('game_2', 1, true)
    }

    this.nextGame = function () {
        if (_iState === 'GAME2') {
            if (GameUnLocked == 2) { GameUnLocked = 3; GAME_CHOOSE = 3 }
            new Game3Screen1();
        }
    }

    this.onPauseGame = function() {
        _PausePanel.show()
    }

    this.update = function() {
        //REFRESH TIME BAR
        _iTimeElapsed -= s_iTimeElaps;
        
        _totalTime += s_iTimeElaps;
        GAME_2_TIME = _totalTime;

        if (_iTimeElapsed < 0){
            _bUpdate = false;
            // this.gameOver();

            // Danh dau cau da choi
            if (_wordUsed.length < 5) {
                // Chuyen cau khac
                _wordUsed.push(_wordPre)
                s_ChaseImageCaptureWordScreen2.refreshGame()
            }
        }else{
            // Change time text
            _Time.changeText(formatTime(_iTimeElapsed))
            // Change time process
            _Time.updateProcess((_iTimeElapsed / 60000) * 100 )
        }
    }

    this.inputAnimation = function (animation) {
        for (let index = 0; index < _input.length; index++) {
            if (animation == 2) {
                playSound('bonus-collect', 1, false)
                _input[index].pulseAnimation2()
            }
            if (animation == 1) {
                playSound('lose_game', 1, false)
                _input[index].pulseAnimation1()
            }
        }
    }

    this.backSpace = function() {
        if (_pointCusor == 0) return
        _pointCusor--
        _input[_pointCusor].changeText(' ')
        _buttonSelect[_buttonSelected[_buttonSelected.length - 1]].changeColor('#7d2308')
        _buttonSelect[_buttonSelected[_buttonSelected.length - 1]].enable()
        // Xoa phan tu cuoi cung da chon
        _buttonSelected.splice(-1,1)
    }

    
    // Tinh diem
    this.sCore = function() {
        if (_iTimeElapsed > 45000) {
            _iScore += 300
        } else if (_iTimeElapsed > 30000) {
            _iScore += 200
        } else if (_iTimeElapsed > 0) {
            _iScore += 100
        }
        // Cap nhat lai diem so
        GAME_2_SCORE = _iScore
        _Scores.changeText(_iScore)
        saveScore(2)
    }


    this.checkResult = function () {
        var textInput = '';

        for (let index = 0; index < _pointCusor; index++) {
            textInput += _input[index].getText()
        }
        // Neu tra loi dung
        if (textInput.toUpperCase() == _imageWord[_wordPre].word.toUpperCase()) {

            // Danh dau cau da choi
            _wordUsed.push(_wordPre)
            
            this.inputAnimation(2)

            // Cap nhat diem
            this.sCore()

            // Refresh game
            setTimeout(() => {
                this.refreshGame()
            }, 500)
        } else {
            // Xoay input 
            this.inputAnimation(1)
        }
        
    }

    this.selectText = function(index) {
        if (_buttonSelected.find(value => value === index) == undefined && (_pointCusor < _imageWord[_wordPre].word.length)) {
            this._insertTextToInput(_stringArr[index])
            _buttonSelect[index].changeColor('#8a8a8a')
            _buttonSelect[index].disable()
            _buttonSelected.push(index)
        }

        if (_pointCusor == _imageWord[_wordPre].word.length) {
            this.checkResult()
        }
    }

    this._insertTextToInput = function (char) {
        if (_pointCusor > _imageWord[_wordSelectIndex].word.length) return;
        _input[_pointCusor].changeText(char)
        _pointCusor++
    }

    this.refreshGame = function () {
        _wordSelectIndex = this.randomWord()
        _wordPre = _wordSelectIndex
        _inputWidth = 0
        _pointCusor = 0
        _buttonSelected = []
        _iTimeElapsed = 60000

        // Show image
        for (let index = 0; index < _imageWord.length; index++) {
            _imageWord[index].imageView.setVisible(false)
        }
        _imageWord[_wordSelectIndex].imageView.setVisible(true)

        // Clear Input
        this._refreshInput(_imageWord[_wordSelectIndex].word)

        // Enable button
        for (let index = 0; index < _buttonSelect.length; index++) {
            _buttonSelect[index].enable()
            _buttonSelect[index].changeColor('#7d2308')
        }

        // Insert word to button text
        this._insertWordToButton(_imageWord[_wordSelectIndex].word)

        _pointCusor = 0;

        if (_wordUsed.length >= 3) {
            _buttonNextGame.enable()
        }

        // Check neu da qu 4 cau
        if (_wordUsed.length == 5) {
            this.gameOver()
        }
    }

    this.gameOver = function(){
        stopSound('game_2')
        // Nếu đủ điểm
        if (_iScore >= 30) {
            saveHistory(2)
            _PassPartPanel.show(_iScore, 2, _totalTime)
        } else {
            _FailedPartPanel.show(_iScore)
        }
    };

    this._insertWordToButton = function (word) {
        var stringTemp = (word + this._randomString(14 - word.length)).toUpperCase()
        _stringArr = this._randomArrayIndex(stringTemp.split(''))
        
        //
        for (let index = 0; index < _buttonSelect.length; index++) {
            _buttonSelect[index].changeText(_stringArr[index])
        }
    }

    this._randomArrayIndex = function(array) {
        var arrTemp = array;

        for (var index = 0; index < arrTemp.length; index++) {
            var randomIndex1 = Math.floor(Math.random() * arrTemp.length - 1) + 1;
            var randomIndex2 = Math.floor(Math.random() * arrTemp.length - 1) + 1;
            if (randomIndex1 !== randomIndex2) {
                var charTemp = arrTemp[randomIndex1]
                arrTemp[randomIndex1] = arrTemp[randomIndex2]
                arrTemp[randomIndex2] = charTemp
            }
        }

        return arrTemp
    }

    this._randomString = function (length) {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    this._refreshInput = function (word) {
        
        _inputWidth = word.length * 100
        //Clear text and visible
        for (let index = 0; index < _inputLength; index++) {
            _input[index].changeText('')
            _input[index].setVisible(false)
        }
        for (let index = 0; index < word.length; index++) {
            _input[index].setPosition( 1550 - (_inputWidth/2) + (100 * index) ,oModePos.y - 120)
            _input[index].setVisible(true)
        }

    }

    this.createTextButton = function () {
        for (let index = 0; index < array.length; index++) {
            const element = array[index];
            
        }
    }

    this.randomWord = function () {
        var numRandom = -1
        while (true) {
            numRandom = Math.floor(Math.random() * _imageWord.length - 1) + 1;
            if (numRandom != _wordPre && !this._findArray(numRandom, _wordUsed)) {
                break;
            }
        }

        return numRandom;
    }

    this._findArray = function (value, array) {
        for (let index = 0; index < array.length; index++) {
            if (array[index] == value) {
                return true
            }
        }
        return false
    }

    this._onAudioToggle = function(){
        Howler.mute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive;
    };

    
    this.resetFullscreenBut = function(){
        if (_fRequestFullScreen && screenfull.enabled){
            _oButFullscreen.setActive(s_bFullscreen);
        }
    };
    
    this._onFullscreenRelease = function(){
        if(s_bFullscreen) { 
            _fCancelFullScreen.call(window.document);
        }else{
            _fRequestFullScreen.call(window.document.documentElement);
        }
    }

    this.refreshButtonPos = function(){
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            _oAudioToggle.setPosition(_pStartPosAudio.x - s_iOffsetX,s_iOffsetY + _pStartPosAudio.y);
        }

        if (_fRequestFullScreen && screenfull.enabled){
            _oButFullscreen.setPosition(_pStartPosAudio.x - s_iOffsetX - 390,s_iOffsetY + _pStartPosAudio.y - 5);
        }
        
        _ButtonCart.setPosition(_pCartPos.x - s_iOffsetX - 260,s_iOffsetY + _pCartPos.y);
        _ButtonPause.setPosition(_pPausePos.x - s_iOffsetX - 130,s_iOffsetY + _pCartPos.y);
        _Scores.setPosition(s_iOffsetX + 970, s_iOffsetY + 120);

        _Time.setPosition(s_iOffsetX + 400, s_iOffsetY + 120);

        scorePointText_1.setPosition(s_iOffsetX + 280, s_iOffsetY + 35);
        scorePoint_1.setPosition(s_iOffsetX + 280, s_iOffsetY + 60);
        scorePointText_2.setPosition(s_iOffsetX + 450, s_iOffsetY + 35);
        scorePoint_2.setPosition(s_iOffsetX + 450, s_iOffsetY + 60);
        scorePointText_3.setPosition(s_iOffsetX + 600, s_iOffsetY + 35);
        scorePoint_3.setPosition(s_iOffsetX + 600, s_iOffsetY + 60);
    }

    this.unload = function() {

        if (_fRequestFullScreen && screenfull.enabled){
            _oButFullscreen.unload();
        }

        stopSound('game_2');
        
        _ButtonCart.unload()
        _ButtonPause.unload()
        _Scores.unload()
        _Time.unload()
        scorePointText_1.unload()
        scorePoint_1.unload()
        scorePointText_2.unload()
        scorePoint_2.unload()
        scorePointText_3.unload()
        scorePoint_3.unload()
        _buttonBackSpace.unload()
        _buttonNextGame.unload()
        _buttonNextFrame.unload()

        for (let index = 0; index < _imageWord.length; index++) {
            _imageWord[index].imageView.unload()
        }
        for (let index = 0; index < _inputLength; index++) {
            _input[index].unload()
        }
        for (let index = 0; index < _buttonSelectLength; index++) {
            _buttonSelect[index].unload()
        }

        // s_ChaseImageCaptureWordScreen2 = null;
        s_oStage.removeAllChildren();
    }    

    s_ChaseImageCaptureWordScreen2 = this;
    this.init()
}

var s_ChaseImageCaptureWordScreen2 = null;