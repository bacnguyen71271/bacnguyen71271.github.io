var BASE_URL = 'https://gm.kola.vn/api'

if( window.location.href.indexOf('localhost') !== -1){
    var BASE_URL = 'http://127.0.0.1:3333/api'
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
                console.log('Logined')
            }
            callback()
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
        console.log(res)
        if (res.code === 1) {
            localStorage.setItem('tieuhoc_game_key', res.data.id)
            USER_CLASS = res.data.class;
            USER_NAME = res.data.fullname;
            USER_COUPON = res.data.coupon
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