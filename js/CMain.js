var ScreenGame_1;
var ScreenGame_2;
var ScreenGame_3;
var ScreenGame_4;
var ScreenGame_1_1;
var ScreenGame_2_1;
var ScreenGame_3_1;
var ScreenGame_4_1;
var _ScreenHome;
var _ScreenChooseGame;

var _iState = "LOADING";

function CMain(oData){
    var _bUpdate;
    var _pauseGame = false;
    var _iCurResource = 0;
    var RESOURCE_TO_LOAD = 0;
    var _oData;
    
    var _oPreloader;
    var _oMenu;
    var _oHelp;
    var _oGame;

    this.initContainer = function(){
        s_oCanvas = document.getElementById("canvas");
        s_oStage = new createjs.Stage(s_oCanvas);
        createjs.Touch.enable(s_oStage);
		
	    s_bMobile = jQuery.browser.mobile;
        if(s_bMobile === false){
            s_oStage.enableMouseOver(50);  
        }

        // screen.orientation.lock('landscape');
		
        // s_oStage.regX = CANVAS_WIDTH/2;
        // s_oStage.regY = CANVAS_HEIGHT/2;
        // s_oStage.rotation = 10
        
        // s_oStage.regY = 1400;

        // s_iPrevTime = new Date().getTime();

        createjs.Ticker.addEventListener("tick", this._update);
        createjs.Ticker.framerate = FPS;
        
        if(navigator.userAgent.match(/Windows Phone/i)){
            DISABLE_SOUND_MOBILE = true;
        }
        
        s_oSpriteLibrary  = new CSpriteLibrary();

        //ADD PRELOADER
        _oPreloader = new CPreloader();
    };
    
    this.preloaderReady = function(){
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            this._initSounds();
        }
        
        this._loadImages();
        _bUpdate = true;
    };
    
    this.soundLoaded = function(){
        _iCurResource++;
        var iPerc = Math.floor(_iCurResource/RESOURCE_TO_LOAD *100);
        _oPreloader.refreshLoader(iPerc);
    };
    
    this._initSounds = function(){
        var aSoundsInfo = new Array();
        aSoundsInfo.push({path: './sounds/',filename:'game_over',loop:false,volume:1, ingamename: 'game_over'});
        aSoundsInfo.push({path: './sounds/',filename:'click',loop:false,volume:1, ingamename: 'click'});
        aSoundsInfo.push({path: './sounds/',filename:'hammer',loop:false,volume:1, ingamename: 'hammer'});
        aSoundsInfo.push({path: './sounds/',filename:'hit',loop:false,volume:1, ingamename: 'hit'});
        aSoundsInfo.push({path: './sounds/',filename:'bomb',loop:false,volume:1, ingamename: 'bomb'});
        aSoundsInfo.push({path: './sounds/',filename:'hover1',loop:false,volume:0.4, ingamename: 'hover1'});
        aSoundsInfo.push({path: './sounds/',filename:'ball_tap',loop:false,volume:0.4, ingamename: 'ball_tap'});
        aSoundsInfo.push({path: './sounds/',filename:'bonus-collect',loop:false,volume:0.4, ingamename: 'bonus-collect'});
        aSoundsInfo.push({path: './sounds/',filename:'lose_game',loop:false,volume:0.4, ingamename: 'lose_game'});
        aSoundsInfo.push({path: './sounds/',filename:'lose_game_2',loop:false,volume:1, ingamename: 'lose_game_2'});
        aSoundsInfo.push({path: './sounds/',filename:'game_4_checked',loop:false,volume:1, ingamename: 'game_4_checked'});
        aSoundsInfo.push({path: './sounds/',filename:'game_1',loop:true,volume:1, ingamename: 'game_1'});
        aSoundsInfo.push({path: './sounds/',filename:'game_2',loop:true,volume:1, ingamename: 'game_2'});
        aSoundsInfo.push({path: './sounds/',filename:'game_3',loop:true,volume:1, ingamename: 'game_3'});
        aSoundsInfo.push({path: './sounds/',filename:'game_4',loop:true,volume:1, ingamename: 'game_4'});
        
        RESOURCE_TO_LOAD += aSoundsInfo.length;

        s_aSounds = new Array();
        for(var i=0; i<aSoundsInfo.length; i++){
            s_aSounds[aSoundsInfo[i].ingamename] = new Howl({ 
                src: [aSoundsInfo[i].path+aSoundsInfo[i].filename+'.mp3'],
                autoplay: false,
                preload: true,
                loop: aSoundsInfo[i].loop, 
                volume: aSoundsInfo[i].volume,
                onload: s_oMain.soundLoaded
            });
        }
        
    };

    this._loadImages = function(){
        s_oSpriteLibrary.init( this._onImagesLoaded,this._onAllImagesLoaded, this );

        s_oSpriteLibrary.addSprite("ldp_background","./assets/ldp_background.jpg");
        s_oSpriteLibrary.addSprite("choi-game-me-say","./assets/choi-game-me-say.png");
        s_oSpriteLibrary.addSprite("logo_chuong_trinh","./assets/logo_chuong_trinh.png");
        s_oSpriteLibrary.addSprite("homa_head","./assets/homa_head.png");
        s_oSpriteLibrary.addSprite("hm_logo_2","./assets/hm_logo_2.png");
        s_oSpriteLibrary.addSprite("light_1","./assets/light_1.png");
        s_oSpriteLibrary.addSprite("button_background","./assets/button_background.png");
        s_oSpriteLibrary.addSprite("button_background_2","./assets/button_background_2.png");
        s_oSpriteLibrary.addSprite("button_background_start","./assets/button_background_start.png");
        s_oSpriteLibrary.addSprite("background_slider","./assets/background-slider.png");
        s_oSpriteLibrary.addSprite("arrow_left","./assets/arrow_left.png");
        s_oSpriteLibrary.addSprite("arrow_right","./assets/arrow_right.png");
        s_oSpriteLibrary.addSprite("arrow_2_left","./assets/arrow_2_left.png");
        s_oSpriteLibrary.addSprite("arrow_2_right","./assets/arrow_2_right.png");
        s_oSpriteLibrary.addSprite("qua_tang","./assets/qua_tang.png");
        s_oSpriteLibrary.addSprite("bg_back","./assets/bg_back.png");
        s_oSpriteLibrary.addSprite("audio_icon","./assets/audio_icon.png");
        s_oSpriteLibrary.addSprite("cart_icon","./assets/cart_icon.png");
        s_oSpriteLibrary.addSprite("game_pause","./assets/game_pause.png");
        s_oSpriteLibrary.addSprite("bg_level","./assets/bg_level.png");
        s_oSpriteLibrary.addSprite("game_status_0_1","./assets/game_status_0_1.png");
        s_oSpriteLibrary.addSprite("game_status_0_2","./assets/game_status_0_2.png");
        s_oSpriteLibrary.addSprite("game_status_0_3","./assets/game_status_0_3.png");
        s_oSpriteLibrary.addSprite("game_status_1_1","./assets/game_status_1_1.png");
        s_oSpriteLibrary.addSprite("game_status_1_2","./assets/game_status_1_2.png");
        s_oSpriteLibrary.addSprite("game_status_1_3","./assets/game_status_1_3.png");
        s_oSpriteLibrary.addSprite("game_active","./assets/game_active.png");
        s_oSpriteLibrary.addSprite("game_block","./assets/game_block.png");
        s_oSpriteLibrary.addSprite("game_select","./assets/game_select.png");
        s_oSpriteLibrary.addSprite("modal_bg","./assets/modal_bg.png");
        s_oSpriteLibrary.addSprite("background_btn_start_2","./assets/background_btn_start_2.png");
        s_oSpriteLibrary.addSprite("panel_button_bg","./assets/panel_button_bg.png");
        s_oSpriteLibrary.addSprite("game_avt_1","./assets/game_avt_1.png");
        s_oSpriteLibrary.addSprite("game_avt_2","./assets/game_avt_2.png");
        s_oSpriteLibrary.addSprite("game_avt_3","./assets/game_avt_3.png");
        s_oSpriteLibrary.addSprite("panel_bg","./assets/panel_bg.png");
        s_oSpriteLibrary.addSprite("home_button","./assets/home_button.png");

        s_oSpriteLibrary.addSprite("game_avt_4","./assets/game_avt_4.png");

        s_oSpriteLibrary.addSprite("game1_bg","./assets/game1_bg.jpg");
        s_oSpriteLibrary.addSprite("homa_dapchuot_title","./assets/homa_dapchuot_title.png");
        s_oSpriteLibrary.addSprite("hammer_icon_1","./assets/hammer_icon_1.png");
        s_oSpriteLibrary.addSprite("hammer_icon_2","./assets/hammer_icon_2.png");
        s_oSpriteLibrary.addSprite("hammer_icon_3","./assets/hammer_icon_3.png");
        s_oSpriteLibrary.addSprite("button_background_4","./assets/button_background_4.png");
        s_oSpriteLibrary.addSprite("button_background_3","./assets/button_background_3.png");
        s_oSpriteLibrary.addSprite("game_info_bg","./assets/game_info_bg.png");
        s_oSpriteLibrary.addSprite("clock","./assets/clock.png");
        s_oSpriteLibrary.addSprite("start","./assets/start.png");

        s_oSpriteLibrary.addSprite("mouse_sheet_1","./assets/mouse_sheet_1.png");
        s_oSpriteLibrary.addSprite("mouse_sheet_2","./assets/mouse_sheet_2.png");
        s_oSpriteLibrary.addSprite("mouse_sheet_3","./assets/mouse_sheet_3.png");
        s_oSpriteLibrary.addSprite("mouse_sheet_4","./assets/mouse_sheet_4.png");

        s_oSpriteLibrary.addSprite("terrain_hole","./assets/terrain_hole.png");
        s_oSpriteLibrary.addSprite("terrain_hole_back","./assets/terrain_hole_back.png");
        s_oSpriteLibrary.addSprite("hammer1","./assets/hammer1.png");

        s_oSpriteLibrary.addSprite("game_info_bg_2","./assets/game_info_bg_2.png");
        s_oSpriteLibrary.addSprite("bg_time_process","./assets/bg_time_process.png");
        s_oSpriteLibrary.addSprite("game_board","./assets/game_board.png");
        s_oSpriteLibrary.addSprite("time_point","./assets/time_point.png");
        s_oSpriteLibrary.addSprite("text_box_1","./assets/text_box_1.png");
        s_oSpriteLibrary.addSprite("text_box_2","./assets/text_box_2.png");
        s_oSpriteLibrary.addSprite("bg_back_2","./assets/bg_back_2.png");

        s_oSpriteLibrary.addSprite("next_game","./assets/next_game.png");
        s_oSpriteLibrary.addSprite("next_frame","./assets/next_frame.png");
        s_oSpriteLibrary.addSprite("game3_score_define1","./assets/game3_score_define1.png");
        s_oSpriteLibrary.addSprite("game3_score_define2","./assets/game3_score_define2.png");
        s_oSpriteLibrary.addSprite("background_score","./assets/background_score.png");
        s_oSpriteLibrary.addSprite("question_mask","./assets/question_mask.png");
        s_oSpriteLibrary.addSprite("answer_bg","./assets/answer_bg.png");

        s_oSpriteLibrary.addSprite("game_4_bg","./assets/game_4_bg.png");
        s_oSpriteLibrary.addSprite("text_select","./assets/text_select.png");
        s_oSpriteLibrary.addSprite("text_select_bg","./assets/text_select_bg.png");
        s_oSpriteLibrary.addSprite("text_selected","./assets/text_selected.png");
        s_oSpriteLibrary.addSprite("notifi_bg","./assets/notifi_bg.png");
        s_oSpriteLibrary.addSprite("sugges_bg","./assets/sugges_bg.png");
        
        s_oSpriteLibrary.addSprite("gt_1","./assets/gt_1.png");
        s_oSpriteLibrary.addSprite("gt_2","./assets/gt_2.png");
        s_oSpriteLibrary.addSprite("gt_3","./assets/gt_3.png");
        s_oSpriteLibrary.addSprite("gt_4","./assets/gt_4.png");
        s_oSpriteLibrary.addSprite("but_fullscreen","./assets/but_fullscreen.png");


        for(var i = 1 ;i< 11 ;i++){
            s_oSpriteLibrary.addSprite("image_word_"+i,"./assets/image_word_"+i+".png");
        }

        RESOURCE_TO_LOAD += s_oSpriteLibrary.getNumSprites();
        s_oSpriteLibrary.loadSprites();
    };
    
    this._onImagesLoaded = function(){
        _iCurResource++;
        var iPerc = Math.floor(_iCurResource/RESOURCE_TO_LOAD *100);
        //console.log("PERC: "+iPerc);
        _oPreloader.refreshLoader(iPerc);
    };
    
    this._onRemovePreloader = function(){
        try{
            saveItem("ls_available","ok");
        }catch(evt){
            // localStorage not defined
            s_bStorageAvailable = false;
        }

        _oPreloader.unload();

        // s_oSoundTrack = playSound("soundtrack", 0, true);


        this.goToHome();
    };
    
    this._onAllImagesLoaded = function(){
        
    };
    
    this.onAllPreloaderImagesLoaded = function(){
        this._loadImages();
    };

    this.goToHome = function() {
        _ScreenHome =  new ScreenHome();
        //Data helper
        checkLogin(function () {
            _ScreenHome.checkLogin()
            getRanking()
        })
    }
    
    this.gotoHelp = function(){
        _oHelp = new CHelp();
        _iState = STATE_HELP;
    };
	
    this.stopUpdateNoBlock = function(){
        _bUpdate = false;
        createjs.Ticker.paused = true;
    };

    this.startUpdateNoBlock = function(){
        s_iPrevTime = new Date().getTime();
        _bUpdate = true;
        createjs.Ticker.paused = false; 
    };

    this.stopUpdate = function(){
        _bUpdate = false;
        createjs.Ticker.paused = true;
        $("#block_game").css("display","block");
        Howler.mute(true);
    };

    this.startUpdate = function(){
        s_iPrevTime = new Date().getTime();
        _bUpdate = true;
        createjs.Ticker.paused = false;
        $("#block_game").css("display","none");
        
		if(s_bAudioActive){
			Howler.mute(false);
		}
    };
    
    this._update = function(event){
        if(_bUpdate === false){
                return;
        }
        var iCurTime = new Date().getTime();
        
        s_iTimeElaps = iCurTime - s_iPrevTime;
        
        s_iCntTime += s_iTimeElaps;
        s_iCntFps++;
        s_iPrevTime = iCurTime;

        if ( s_iCntTime >= 1000 ){
            s_iCurFps = s_iCntFps;
            s_iCntTime-=1000;
            s_iCntFps = 0;
        }

        if (_iState === 'GAME1') {
            if (ScreenGame_1) {
                ScreenGame_1.update();
            }
        }

        if (_iState === 'GAME2') {
            if (ScreenGame_2) {
                ScreenGame_2.update();
            }
        }
        
        if (_iState === 'GAME3') {
            if (ScreenGame_3) {
                ScreenGame_3.update();
            }
        }
        
        if (_iState === 'GAME4') {
            if (ScreenGame_4) {
                ScreenGame_4.update();
            }
        }

        s_oStage.update(event);
       
    };

    this.checkLogin = function() {
        return true;
    }
    
    s_oMain = this;
    
    _oData = oData;
    START_SPAWN_TIME = oData.start_spawn_time;
    TIME_OFFSET_PER_SPAWN_DECREASE = oData.time_offset;
    OFFSET_SPAWN_TIME = oData.offset_spawn_time;
    TIME_SUPER_HAMMER_CHECK = oData.super_hammer_time;
    SUPER_HAMMER_MULT= oData.super_hammer_mult;
    SUPER_HAMMER_TIME = oData.time_super_hammer;

    ENABLE_FULLSCREEN = oData.fullscreen;
    
    this.initContainer();
}
var s_bMobile;
var s_bAudioActive = true;
var s_iCntTime = 0;
var s_iTimeElaps = 0;
var s_iPrevTime = 0;
var s_iCntFps = 0;
var s_iCurFps = 0;

var s_oDrawLayer;
var s_oStage;
var s_oMain;
var s_oSpriteLibrary;
var s_oSoundTrack = null;
var s_oCanvas;
var s_bFullscreen = false;
var s_aSounds;
var s_bStorageAvailable = true;
var s_iBestScore = 0;
