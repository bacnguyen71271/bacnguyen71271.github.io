var BASE_URL = 'https://gm.kola.vn/api'

if( window.location.href.indexOf('localhost') !== -1){
    var BASE_URL = 'http://127.0.0.1:3333/api'
}

function getRanking() {
    $.ajax({
        url: BASE_URL + '/ranking',
        method: 'GET',
        dataType: 'JSON',
    }).then((res) => {
        if (res.code === 1) {
            var html = ''

            for (let index = 0; index < res.data.length; index++) {
                const element = res.data[index];
                html += '<tr> <td>' + (index+1) + '</td> <td>' + element.fullname + '</td> <td>' + element.score + '</td> <td>' + element.phone + '</td> <td>' + formatTime(element.time) + '</td> </tr>'
            }

            $('#rankList tbody').html(html)
        }
    })
}

function saveHistory (game_part) {
    // check score of game part
    var game_key = localStorage.getItem('tieuhoc_game_key');
    var game_data = {
        game: game_part,
        score: 1,
        time: 1
    }

    if (game_part == 1) {
        game_data.score = GAME_1_SCORE
        game_data.time = GAME_1_TIME
    }
    if (game_part == 2) {
        game_data.score = GAME_2_SCORE
        game_data.time = GAME_2_TIME
    }
    if (game_part == 3) {
        game_data.score = GAME_3_SCORE
        game_data.time = GAME_3_TIME
    }
    if (game_part == 4) {
        game_data.score = GAME_4_SCORE
        game_data.time = GAME_4_TIME
    }

    return $.ajax({
        url: BASE_URL + '/history',
        method: 'POST',
        dataType: 'JSON',
        data: {
            id: game_key,
            game_data
        },
    }).then((res) => {
        if (res.code === 1) {
            console.log('save done !')
        }
    })
    
}

function saveScore (game_part) {

    return 
    // check score of game part
    var game_key = localStorage.getItem('tieuhoc_game_key');
    var updateScore = false;
    var score = 0;

    if (game_part == 1 && GAME_DATA.game_1.score_max < GAME_1_SCORE) { updateScore = true; score = GAME_1_SCORE }
    if (game_part == 2 && GAME_DATA.game_2.score_max < GAME_2_SCORE) { updateScore = true; score = GAME_2_SCORE }
    if (game_part == 3 && GAME_DATA.game_3.score_max < GAME_3_SCORE) { updateScore = true; score = GAME_3_SCORE }
    if (game_part == 4 && GAME_DATA.game_4.score_max < GAME_4_SCORE) { updateScore = true; score = GAME_4_SCORE }

    if (updateScore) {
        return $.ajax({
            url: BASE_URL + '/update-score',
            method: 'POST',
            dataType: 'JSON',
            data: {
                id: game_key,
                game_part,
                score
            },
        }).then((res) => {
            if (res.code === 1) {
                console.log('save done !')
            }
        })
    }
    return false
}

function checkLogin(callback) {
    var game_key = localStorage.getItem('tieuhoc_game_key');

    if (game_key && game_key != '') {
        checkAccount({id: game_key}).then(function (res) {
            if (res.code === 1) {
                IS_LOGIN = true;
                // Luu thong tin nguoi choi
                USER_CLASS = res.data.class
                USER_COUPON = res.data.coupon
                GameUnLocked = res.data.history.game_unlock
                GAME_DATA = res.data.history.game_data

                Object.keys(GAME_DATA).forEach((key) => {
                    if (key == 'game_1') {
                        GAME_1_SCORE = GAME_DATA[key].score_max
                        GAME_1_TIME = GAME_DATA[key].time_min
                    }
                    if (key == 'game_2') {
                        GAME_2_SCORE = GAME_DATA[key].score_max
                        GAME_2_TIME = GAME_DATA[key].time_min
                    }
                    if (key == 'game_3') {
                        GAME_3_SCORE = GAME_DATA[key].score_max
                        GAME_3_TIME = GAME_DATA[key].time_min
                    }
                    if (key == 'game_4') {
                        GAME_4_SCORE = GAME_DATA[key].score_max
                        GAME_4_TIME = GAME_DATA[key].time_min
                    }
                })

                console.log('Logined')
            }
            callback()
        })
    } else {
        callback()
    }
}

function getCoupon(callback) {
    var game_key = localStorage.getItem('tieuhoc_game_key');

    if (game_key && game_key != '') {
        return $.ajax({
            url: BASE_URL + '/get-coupon',
            method: 'POST',
            dataType: 'JSON',
            data: {
                id: game_key
            },
        }).then((res) => {
            if (res.code === 1) {
                USER_COUPON = res.data
            }
            callback(res)
        })
    } else {
        callback()
    }
}

function login (params, callback) {
    return $.ajax({
        url: BASE_URL + '/login',
        method: 'POST',
        dataType: 'JSON',
        data: params,
    }).then((res) => {
        if (res.code === 1) {
            localStorage.setItem('tieuhoc_game_key', res.data.id)
            USER_CLASS = res.data.class;
            USER_NAME = res.data.fullname;
            USER_COUPON = res.data.coupon

            GameUnLocked = res.data.history.game_unlock
            GAME_DATA = res.data.history.game_data
        }
        callback(res)
    })
}

function checkAccount (params) {
    return $.ajax({
        url: BASE_URL + '/check-account',
        method: 'POST',
        dataType: 'JSON',
        data: params,
    })
}

function register (params, callback) {
    return $.ajax({
        url: BASE_URL + '/register',
        method: 'POST',
        dataType: 'JSON',
        data: params,
    }).then((res) => {
        console.log(res)
        if (res.code === 1) {
            localStorage.setItem('tieuhoc_game_key', res.data)
        }
        callback(res)
    })
}

function getQuestion(game, class_id) {
    return $.ajax({
        url: BASE_URL + '/question',
        method: 'GET',
        dataType: 'JSON',
        async: false,
        data: {
            class_id,
            game
        }
    })
}