var CANVAS_WIDTH = 1920;
var CANVAS_HEIGHT = 1920;

var EDGEBOARD_X = 200;
var EDGEBOARD_Y = 200;

var FONT = "MontserratSemiBold";

var FPS      = 30;
var DISABLE_SOUND_MOBILE = false;

var NUM_ROWS = 3;
var NUM_COLS = 3;
var CHARACTER_NUM = 4;
var BIGGER_HEIGHT = 267;
var START_X_GRID = 650;
var START_Y_GRID = 830;

var HOLE_WIDTH = 297;
var HOLE_HEIGHT = 253;
var HAMMER_WIDTH = 258;
var HAMMER_HEIGHT = 225;
var SUPER_HAMMER_MULT;
var SUPER_HAMMER_TIME;


var CHARACTER_WIDTH = new Array();
    CHARACTER_WIDTH[0] = 192;
    CHARACTER_WIDTH[1] = 192;
    CHARACTER_WIDTH[2] = 192;
    CHARACTER_WIDTH[3] = 212;
    CHARACTER_WIDTH[4] = 212;


var CHARACTER_HEIGHT = new Array();
    CHARACTER_HEIGHT[0] = 170;    
    CHARACTER_HEIGHT[1] = 170;
    CHARACTER_HEIGHT[2] = 170;
    CHARACTER_HEIGHT[3] = 191;
    CHARACTER_HEIGHT[4] = 191;
    
var CHARACTER_POINTS = new Array();

// DIEM SO GAME 1
var GAME_1_POINT = [10, 20, 30, -100]


// EVENT
var ON_MOUSE_DOWN  = 0;
var ON_MOUSE_UP    = 1;
var ON_MOUSE_OVER  = 2;
var ON_MOUSE_OUT   = 3;
var ON_DRAG_START  = 4;
var ON_DRAG_END    = 5;
var ON_BUT_YES_DOWN = 6;

var START_SPAWN_TIME;
var TIME_OFFSET_PER_SPAWN_DECREASE;
var OFFSET_SPAWN_TIME;
var TIME_SUPER_HAMMER_CHECK;
                                                
var ENABLE_FULLSCREEN;


// Ten game
var GAME_NAME = [ 'HOMA ĐẬP CHUỘT', 'HOMA ĐUỔI HÌNH BẮT CHỮ', 'HOMA LÀM TOÁN', 'HOMA HỌC TIẾNG ANH'];

// Game dang chon
var GAME_CHOOSE = 1;

// So game da unlock
var GameUnLocked = 1;
var IS_LOGIN = false;
var USER_NAME = '';
var USER_PHONE = '';
var USER_CLASS = 0;
var USER_COUPON = '';
var USER_GAME_UNLOCK = 1;
var USER_TOTAL_TIME = 0;
var USER_TOTAL_SCORE = 0;

var GAME_1_TIME = 0;
var GAME_1_SCORE = 0;

var GAME_2_TIME = 0;
var GAME_2_SCORE = 0;

var GAME_3_TIME = 0;
var GAME_3_SCORE = 0;

var GAME_4_TIME = 0;
var GAME_4_SCORE = 0;

var GAME_TOTAL_TIME = 0;
var GAME_TOTAL_SCORE = 0;


var GAME_DATA = {
    game_1: {
        score_max: 0,
        time_min: 0,
    },
    game_2: {
        score_max: 0,
        time_min: 0,
    },
    game_3: {
        score_max: 0,
        time_min: 0,
    },
    game_4: {
        score_max: 0,
        time_min: 0,
    },
}

function openCouponPopup() {
    if (USER_COUPON != '') {
        $('.coupon_code').html(USER_COUPON)
        $('#coupon_code_input').val(USER_COUPON)
        $("#couponPopup").modal({
            fadeDuration: 200
        })
    }
}