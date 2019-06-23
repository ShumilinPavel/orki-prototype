<?
    session_start();
    require('./game.php');
    $game = new Game();
    $playersInfo = $game->getPlayersInfo($_SESSION['code']);
?>


<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

    <title>Game</title>

    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <link rel="stylesheet" href="../css/single.css">
    <link rel="stylesheet" href="../css/multiplayer.css">

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"
        integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous">
    </script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-cookie/1.4.1/jquery.cookie.js"></script>
    <script src="../js/play.js" charset="utf-8"></script>
</head>

<body>
    <audio id="theme-music" autoplay loop>
        <source src="../audio/kittyRush.m4a">
    </audio>
    <div class="main-wrapper">
        <div class="main-wrapper__row main-wrapper__row_first">
            <div class="tile-grid">
                <div class="tile-grid__row tile-grid__row_first">
                    <div class="tile-border droppable">
                        <div class="tile-border__visual"></div>
                    </div>
                    <div class="tile-border droppable">
                        <div class="tile-border__visual"></div>
                    </div>
                    <div class="tile-border droppable">
                        <div class="tile-border__visual"></div>
                    </div>
                    <div class="tile-border droppable">
                        <div class="tile-border__visual"></div>
                    </div>
                </div>
                <div class="tile-grid__row tile-grid__row_second">
                    <div class="tile-border droppable">
                        <div class="tile-border__visual"></div>
                    </div>
                    <div class="tile-border droppable">
                        <div class="tile-border__visual"></div>
                    </div>
                    <div class="tile-border droppable">
                        <div class="tile-border__visual"></div>
                    </div>
                    <div class="tile-border droppable">
                        <div class="tile-border__visual"></div>
                    </div>
                    <div class="tile-border droppable">
                        <div class="tile-border__visual"></div>
                    </div>
                </div>
                <div class="tile-grid__row tile-grid__row_third">
                    <div class="tile-border droppable">
                        <div class="tile-border__visual"></div>
                    </div>
                    <div class="tile-border droppable">
                        <div class="tile-border__visual"></div>
                    </div>
                    <div class="tile-border droppable">
                        <div class="tile-border__visual"></div>
                    </div>
                    <div class="tile-border droppable">
                        <div class="tile-border__visual"></div>
                    </div>
                </div>
            </div>

            <div class="content">
                <div class="content__header">
                    <div class="timer-wrapper">
                        <div id="timer" class="timer">
                            <!-- Место для таймера -->
                        </div>
                        <div class="sec">sec.</div>
                    </div>
                    <div class="controls">
                        <button class="controls__btn controls__btn_music">
                            <img src="../pictures/volume-icon.png" alt="" class="volume-icon">
                        </button>
                    </div>
                </div>
               
                <img src="" alt="" class="riddle-card">
                <div class="content__row">
                    <div class="box-background">
                        <div class="tile-border droppable">
                            <div class="tile-border__visual"></div>
                        </div>
                    </div>
                    <div class="progress-table">
                        <div class="progress-table__headers">
                            <div class="progress-table__headers_player">Игрок</div>
                            <div class="progress-table__headers_score">Счет</div>
                        </div>
                        <div class="progress-table__content">
                            <? foreach ($playersInfo as $playerInfo): ?>
                                <div class=<? echo "'player-".$playerInfo['id']." player'" ?> >
                                    <? if ($playerInfo['id'] != $_SESSION['id']): ?>
                                        <div class="player__name">
                                            <? echo $playerInfo['player']; ?>
                                        </div>
                                    <? else: ?>
                                        <div class="player__name player__name_me">
                                            <? echo $playerInfo['player']; ?>
                                        </div>
                                    <? endif; ?>
                                    <div class="player__score">0</div>
                                </div>
                            <? endforeach; ?>
                        </div>
                    </div>
                </div>
            </div>

        </div>

        <div class="main-wrapper__row main-wrapper__row_second">
            <div class="cat-tiles-base">
                <div class="tile" id="cat-orange">
                    <img class="tile__image" src="../pictures/orange.png" alt="">
                </div>
                <div class="tile" id="cat-black">
                    <img class="tile__image" src="../pictures/black.png" alt="" onclick="soundClick()">
                </div>
                <div class="tile" id="cat-yellow">
                    <img class="tile__image" src="../pictures/yellow.png" alt="">
                </div>
                <div class="tile" id="cat-grey">
                    <img class="tile__image" src="../pictures/grey.png" alt="">
                </div>
                <div class="tile" id="cat-white">
                    <img class="tile__image" src="../pictures/white.png" alt="">
                </div>
                <div class="tile" id="cat-long">
                    <img class="tile__image" src="../pictures/long.png" alt="">
                </div>
                <div class="tile" id="cat-blue">
                    <img class="tile__image" src="../pictures/blue.png" alt="">
                </div>
            </div>

            <button class="btn-check">Проверить</button>

        </div>


        <!-- <div class="flip-card">
                <div class="flip-card__inner">
                    <div class="flip-card__front">
                        <img class="front" id="cat-blue1" src="../pictures/blue.png" alt="">
                    </div>
                    <div class="flip-card__back">
                        <img class="back" id="cat-blue-back1" src="../pictures/blue-back.png" alt="">
                    </div>
                </div>
            </div> -->

    </div>
    <div class="modal fade" id="endGameModal" tabindex="-1" role="dialog" aria-labelledby="endGameModalLabel"
        aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="endGameModalLabel">Конец игры</h5>
                </div>
                <div class="modal-body">
                    <div class="endGameModal-title">
                        <!-- Место под итоги -->
                    </div>
                    <div class="progress-table">
                        <div class="progress-table__headers">
                            <div class="progress-table__headers_player">Игрок</div>
                            <div class="progress-table__headers_score">Счет</div>
                            <div class="progress-table__headers_time">Результат</div>
                        </div>
                        <div class="progress-table__content">
                            <? foreach ($playersInfo as $playerInfo): ?>
                                <div class=<? echo "'player-".$playerInfo['id']." player'" ?> >
                                    <? if ($playerInfo['id'] != $_SESSION['id']): ?>
                                        <div class="player__name">
                                            <? echo $playerInfo['player']; ?>
                                        </div>
                                    <? else: ?>
                                        <div class="player__name player__name_me">
                                            <? echo $playerInfo['player']; ?>
                                        </div>
                                    <? endif; ?>
                                    <div class="player__score">0</div>
                                    <div class="player__time">-</div>
                                </div>
                            <? endforeach; ?>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" id="back-to-menu" class="btn btn-secondary"
                        data-dismiss="modal">В меню</button>
                </div>
            </div>
        </div>
    </div>
</body>

</html>