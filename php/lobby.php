<?
    session_start();
    require('./game.php');
    $game = new Game();
    $playersInfo = $game->getPlayersInfo($_SESSION['code']);
    // $myPlayerInfo = $game->getMyPlayerInfo();
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>KittyRush - Lobby</title>
    <link rel="stylesheet" href="../css/lobby.css">
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
        integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous">
    </script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js"></script>
    <script src="../js/lobby.js" charset="utf-8"></script>
</head>

<body>
    <div class="main">
        <div class="content">
            <div class="title">
                Подтверждение готовности
            </div>

            <div class="players-board">
                <? foreach ($playersInfo as $playerInfo): ?>
                    <div class=<? echo "'player-".$playerInfo['id']." player'" ?> >
                        <? if ($playerInfo['id'] != $_SESSION['id']): ?>
                            <div class="player__name">
                                <? echo $playerInfo['player']; ?>
                            </div>
                            <button class="player__status">Готов!</button>  
                        <? else: ?>
                            <div class="player__name player__name_me">
                                <? echo $playerInfo['player']; ?>
                            </div>
                            <button class="player__status player__status_me">Готов!</button>
                        <? endif; ?>
                    </div>
                <? endforeach; ?>
            </div>

            <div class="start-game-timer">
                <!-- Место для вывода таймера до начала игры -->
            </div>
        </div>
    </div>
</body>
</html>