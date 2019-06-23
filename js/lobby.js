$(document).ready(function() {
    readyClickHandler();
    // setTimeout('monitorReady', 500);
    monitorReady();
});


// Поменять значение поля ready моего игрока в БД (Сделать готовым можно только своего игрока)
function readyClickHandler() {
    $('.player__status_me').on('click', function() {
            var id = $(this).parent().attr('class').split(' ')[0].split('-')[1];
            var data = {'id': id};
            var jquery_btn = $(this);
            $.ajax({
                type: 'POST',
                url: 'setReady.php',
                data: data,
                success: function(data) {
                    data = JSON.parse(data);
                    console.log(data['msg']);
                    if (data['success']) {
                        jquery_btn.css('background-color', 'green');
                    }
                },
                error: function() {
                    console.log('Ошибка ajax запроса');
                }
            });
    });
}

// Опрос значений ready для всех игроков
function monitorReady() {
    $.ajax({
        type: 'POST',
        url: 'fetchDataFromDB.php',
        success: function(data) {
            data = JSON.parse(data);
            addNewPlayers(data);
            colorizeReadyBtns(data);
            if (arePlayersReady(data) && noNotificationYet()) {
                startGame();
            }
        },
        complete: function() {
            setTimeout(monitorReady, 2000);
        }
    });
}

// Добавления подключившихся игроков
function addNewPlayers(data) {
    console.log(data);
    data.forEach(el => {
        let isAppend = true;
        $(".player").each(function() {
            if ($(this).attr('class').split(' ')[0] == 'player-' + el['id']) {
                console.log(isAppend);
                isAppend = false;
                return false;
            }
        })
        if (isAppend) {
            console.log(el);
            $(".players-board").append(
                "<div class=\"player-" + el['id'] + " player\"" + ">" +
                    "<div class=\"player__name\">" + el['player'] + "</div>" +
                    "<button class=\"player__status\">Готов!</button>" +
                "</div>"
            )
        }
    });
}


// Раскраска кнопок в соответствие с их готовностью
function colorizeReadyBtns(data) {
    for (let i = 0; i < data.length; i++) {
        let playerId = data[i]['id'];
        jqueryBtn = $('.player-' + playerId).children('.player__status');
        if (data[i]['ready'] == 1) {
            jqueryBtn.css('background-color', 'green');
        }
        else {
            jqueryBtn.css('background-color', 'red');
        }
    }
}

function arePlayersReady(data) {
    for (let i = 0; i < data.length; i++) {
        if (data[i]['ready'] != 1) {
            return false;
        }
    }
    return true;
}

function noNotificationYet() {
    return $('.start-game-timer__number').length == 0;
}

function startGame() {
    var timeLeft = 5;
    generateRandomCardsIndexes();
    SetNotification();
    setTimeout(refreshTimer, 1000);

    function generateRandomCardsIndexes() {
        $.ajax({
            type: 'POST',
            url: 'generateRandomCardsIndexes.php',
            success: function(res) {
                $.cookie("cardsOrderIndexes", res);
            },
            error: function() {
                console.log('Ошибка ajax запроса');
            }
        });
    }
 
    function refreshTimer() {
        if (timeLeft == 0) {
            window.location.href = "../php/multiplayer.php";
        }
        else {
            timeLeft--;
            $(".start-game-timer__number").text(timeLeft);
            setTimeout(refreshTimer, 1000);
        }
    }

    function SetNotification() {
        obj = $('.start-game-timer');
        obj.append("Игра начнется через <span class=\"start-game-timer__number\">" + timeLeft + "</span> секунд");
        obj.css('padding', '10px');
    }
}