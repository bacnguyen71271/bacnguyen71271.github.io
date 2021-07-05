function Game3Screen2 () {

    var _questionUsed = []
    var _question;
    var _option = []
    var _questionExtra;
    var oModePos
    var Score = 0;
    var _bUpdate = false;
    var _questionTitle
    var _questionIndex
    var _totalTime;
    var questionList = [
        {
            question: 'Vườn nhà Mai có 316 cây, trong đó có 148 cây cam còn lại là cây chanh. Tỉ số cây cam : cây chanh = ...',
            question_extra: null,
            answer_option: [
                'A. 37 : 54',
                'B. 37 : 42',
                'C. 37 : 79',
                'D. 42 : 79',
            ],
            right_answer: 1
        }
    ]

    var _iTimeElapsed
    var _Time;
    
    var _FailedPartPanel = null;
    var _PassPartPanel = null;

    this.init = function() {
        _questionIndex = -1
        oModePos = {x: CANVAS_WIDTH/2, y: 875};
        _iTimeElapsed = 15000;
        Score = 0;
        _bUpdate = true;
        _questionUsed = [];
        _totalTime = 0;

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
        _ButtonCart.addEventListener(ON_MOUSE_UP, openCouponPopup, this);    

        var oSprite = s_oSpriteLibrary.getSprite('game_pause');
        _pPausePos = {x: CANVAS_WIDTH - (oSprite.height/2) - 30, y: (oSprite.height/2) + 30};
        _ButtonPause = new CGfxButton(_pPausePos.x, _pPausePos.y, oSprite, s_oStage);
        
        new CGImage(oModePos.x, oModePos.y + 140, s_oSpriteLibrary.getSprite('modal_bg'), s_oStage);

        new CText(oModePos.x, oModePos.y - 240, null, 'ÔN LUYỆN CÙNG HOMA', "showcard", "#fffec9", 60, s_oStage);

        _Time = new GameInfo(oModePos.x - 257, oModePos.y - 100, s_oSpriteLibrary.getSprite('clock'), s_oSpriteLibrary.getSprite('game_info_bg'), '00:00', '#602708', s_oStage)
        _Time.setRotate(-3)
        _Time.setScale(0.8, 0.8)
        
        _Score = new GameInfo(oModePos.x + 274, oModePos.y - 100, s_oSpriteLibrary.getSprite('start'), s_oSpriteLibrary.getSprite('background_score'), '0', '#602708', s_oStage, 'right')
        _Score.setRotate(3)
        _Score.setScale(0.8, 0.8)

        _questionTitle = new CText(oModePos.x, oModePos.y - 95, null, 'CÂU HỎI SỐ: 10/10', "MontserratBlack", "#fff", 30, s_oStage);

        _question = new createjs.Text(' ' , "25px MontserratSemiBold", "#fff");
        _question.textAlign = "center";
        _question.lineHeight = 25;
        _question.textBaseline = "alphabetic";
        _question.lineWidth = 660
        _question.x = oModePos.x
        _question.y = oModePos.y
        s_oStage.addChild(_question)

        _questionExtra = new QuestionExtra(oModePos.x, oModePos.y + 150)
        _questionExtra.changeText(' ')
        _questionExtra.setVisible(false)

        _option = []
        for (let index = 0; index < 4; index++) {
            var col = index % 2;
            var row = parseInt(index / 2)
            var button = new CTextButton( 750 + (col * 440) , oModePos.y + 260 + (row * 90) , s_oSpriteLibrary.getSprite('answer_bg'), ' ', "MontserratBlack", "#7d2308", 18, s_oStage, 'left')
            button.addEventListenerWithParams(ON_MOUSE_UP, s_Game3Screen2.selectAnswer , this, index);
            button.setVisible(false)
            _option.push(button);
        }

        _PassPartPanel = new PassPartPanel2();
        _FailedPartPanel = new FailedPartPanel();
        _PausePanel = new PausePanel(s_oStage);
        _ButtonPause.addEventListener(ON_MOUSE_UP, s_Game3Screen2.onPauseGame, this);

        this.refreshButtonPos();

        questionList = []
        getQuestion(3, USER_CLASS).then((res) => {
            if (res.code == 1) {
                for (let index = 0; index < res.data.length; index++) {
                    var optionParse = JSON.parse(res.data[index].options)

                    var question = {
                        question: res.data[index].question,
                        question_extra: null,
                        answer_option: [],
                        right_answer: null
                    }

                    for (let index2 = 0; index2 < optionParse.length; index2++) {
                        question.answer_option.push(optionParse[index2].content)
                        if (optionParse[index2].answer == 'true') {
                            question.right_answer = index2
                        }
                    }
                    questionList.push(question)                    
                }
                
                this._nextQuestion()

            }
        })

        playSound('game_3', 1, true)
    }

    this.onPauseGame = function() {
        _PausePanel.show()
    }

    this._findArray = function (value, array) {
        for (let index = 0; index < array.length; index++) {
            if (array[index] == value) {
                return true
            }
        }
        return false
    }

    this.selectAnswer = function (index) {
        if (index == questionList[_questionIndex].right_answer) {

            console.log('tra loi dung')
            // Cong diem
            Score += 10
        } else {
            console.log('tra loi sai')
            // Tru diem
            Score -= 20
            if (Score < 0) { Score = 0 }
        }

        if (_questionIndex == questionList.length - 1) {
            this.gameOver()
        }
        
        GAME_3_SCORE = Score
        // Update diem so
        _Score.changeText(Score)
        // Chuyen cau tiep theo
        s_Game3Screen2._nextQuestion()
        _iTimeElapsed = 15000;
        saveScore(2)
    }

    this.gameOver = function(){   
        // Nếu đủ điểm
        stopSound('game_3')
        if (Score >= 50) {
            _PassPartPanel.show(Score, 3, _totalTime)
            saveHistory(3)
        } else {
            _FailedPartPanel.show(Score)
        }
    };

    this.update = function() {

        if (_questionIndex == questionList.length) {
            return;
        }
        
        if (!_bUpdate) { return }

        //REFRESH TIME BAR
        _iTimeElapsed -= s_iTimeElaps;

        _totalTime += s_iTimeElaps;
        GAME_3_TIME = _totalTime;
        
        if (_iTimeElapsed < 0){

            if (_questionUsed.length == 10) {
                _bUpdate = false;
                this.gameOver();
            }

            s_Game3Screen2._nextQuestion()
            _iTimeElapsed = 15000;

            // // Chuyen cau khac
            // if (_questionIndex < questionList.length - 1) {
                
            // } else {
            //     s_Game3Screen2.questionSuccess()
            //     return
            // }
        }else{
            // Change time text
            _Time.changeText(formatTime(_iTimeElapsed))
        }
    }

    this.questionSuccess = function () {
        console.log('xong')
    }

    this._nextQuestion = function () {
        _questionIndex++;

        if (_questionIndex == questionList.length) {
            _questionIndex--;
            return;
        }
        
        if (questionList[_questionIndex].question) {
            _question.text = questionList[_questionIndex].question
        }

        if (questionList[_questionIndex].question_extra) {
            _questionExtra.changeText(questionList[_questionIndex].question_extra)
            _questionExtra.setVisible(true)
            _question.y = oModePos.y
        } else {
            _question.y = oModePos.y + 30
        }

        if (questionList[_questionIndex].answer_option) {
            for (let index = 0; index < _option.length; index++) {
                _option[index].setVisible(false)
            }
            var answerTextLenght = 0;
            for (let index = 0; index < questionList[_questionIndex].answer_option.length; index++) {
                _option[index].changeText(questionList[_questionIndex].answer_option[index])
                _option[index].setVisible(true, 'auto')
                if (questionList[_questionIndex].answer_option[index].length > answerTextLenght) { answerTextLenght = questionList[_questionIndex].answer_option[index].length }
            }

            for (let index = 0; index < _option.length; index++) {
                if (answerTextLenght < 11) {
                    _option[index].changeFont('25px MontserratBlack')
                } else {
                    _option[index].changeFont('18px MontserratBlack')
                }
            }
        }

        
        _questionUsed.push(_questionIndex)
        _questionTitle.changeText('CÂU HỎI SỐ: ' + (_questionIndex + 1) + '/' +questionList.length )

    }

    this._onAudioToggle = function(){
        Howler.mute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive;
    };

    this.refreshButtonPos = function(){
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            _oAudioToggle.setPosition(_pStartPosAudio.x - s_iOffsetX,s_iOffsetY + _pStartPosAudio.y);
        }
        _ButtonCart.setPosition(_pCartPos.x - s_iOffsetX - 260,s_iOffsetY + _pCartPos.y);
        _ButtonPause.setPosition(_pPausePos.x - s_iOffsetX - 130,s_iOffsetY + _pCartPos.y);
        // _Time.setPosition(_pCartPos.x - s_iOffsetX , oModePos.y - 80 );
    }

    this.unload = function() {
        stopSound('game_3');
        for (let index = 0; index < _option.length; index++) {
            _option[index].unload()
        }
        s_Game3Screen2 = null;
        s_oStage.removeAllChildren();
    }    

    s_Game3Screen2 = this;
    this.init()
}

var s_Game3Screen2 = null;

function QuestionExtra(iXPos, iYPos) {

    var _extraText = []
    var _textWidth = 0;
    var _textHeight = 0;
    var _panelWidth = 0
    var _extraPanel;
    var _panelHeight;
    var _extraContainer;
    var _questionMask;
    var _questionMaskSprite = s_oSpriteLibrary.getSprite('question_mask')

    this._init = function (iXPos, iYPos) {
        _extraContainer = new createjs.Container()
        // Init question extra
        for (let index = 0; index < 8; index++) {
            var _text = new createjs.Text(' ', "50px MontserratBlack", "#ffcd7d")
            _text.textAlign = "center";
            _text.textBaseline = "alphabetic";

            // _text.y = Math.floor((panelHeight)/2) + (_textHeight/3);
            _extraText.push(_text)
        }

        _textHeight = _extraText[0].getBounds().height

        // _extraText[index].y = Math.floor((panelHeight)/2) + (_textHeight/3);
        
        _panelHeight = _textHeight + 40;
        for (let index = 0; index < _extraText.length; index++) {
            _textWidth += _extraText[index].getBounds().width + 40
            _extraText[index].x = _textWidth
            _extraText[index].y = Math.floor((_panelHeight)/2) + (_textHeight/3);
        }
        _panelWidth = _textWidth;

        _extraPanel = new createjs.Shape()
        _extraPanel.graphics
        .beginFill('#983c34')
        .setStrokeStyle(4)
        .beginLinearGradientStroke(["#e5ab00","#f29a24"], [0, 1], 0, 4, 0, 120)
        .drawRoundRect(0, 0, _panelWidth, _panelHeight, 5)

        _extraPanel.shadow = new createjs.Shadow("#0000005c", 0, 3, 5);
        
        // insert question mask
        _questionMask = createBitmap(_questionMaskSprite)
        _questionMask.y = Math.floor((_panelHeight)/2) - (_questionMaskSprite.height/2);
        _questionMask.visible = false
        // _oText.x = panelWidth / 2

        _extraContainer.x = iXPos;
        _extraContainer.y = iYPos;
        _extraContainer.regX = _panelWidth / 2
        _extraContainer.regY = _panelHeight / 2

        _extraContainer.addChild(_extraPanel, _questionMask)
        for (let index = 0; index < _extraText.length; index++) {
            _extraContainer.addChild(_extraText[index])
            _extraText[index].visible = false
        }
        
        s_oStage.addChild(_extraContainer)
    }

    this.setVisible = function(bVisible){
        _extraContainer.visible = bVisible;
    };

    this.changeText = function (text) {
        var textArr = text.split(' ')
        if (text == '' || text == ' ') {
            _extraContainer.visible = false;
            return
        }

        _panelWidth = 0
        _questionMask.visible = false

        for (let index = 0; index < _extraText.length; index++) {
            _extraText[index].visible = false
        }

        for (let index = 0; index < textArr.length; index++) {
            if (textArr[index] == '?') {
                _questionMask.visible = true
                _questionMask.x = _panelWidth + 20
                _panelWidth += _questionMaskSprite.width + 40
            } else {
                _extraText[index].text = textArr[index]
                _extraText[index].visible = true
                _extraText[index].x = _panelWidth + 40
                _panelWidth += _extraText[index].getBounds().width + 40
            }
        }

        _extraPanel.graphics.clear()
        _extraPanel.graphics
        .beginFill('#983c34')
        .setStrokeStyle(4)
        .beginLinearGradientStroke(["#e5ab00","#f29a24"], [0, 1], 0, 4, 0, 120)
        .drawRoundRect(0, 0, _panelWidth, _panelHeight, 5)
        
        _extraContainer.regX = _panelWidth / 2
    }

    this._init(iXPos, iYPos)
}