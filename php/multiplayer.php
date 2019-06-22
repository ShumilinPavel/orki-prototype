<?php
session_start();
require('./game.php');
$game = new Game();
?>
<!DOCTYPE html>
<html>

<head>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
          integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <link rel="stylesheet" href="../css/multiplayer.css">
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"
            integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous">
    </script>
</head>

<body>

<?php
if (array_key_exists('enter', $_POST)) {
    $_SESSION['username'] = $_POST['username'];
    $_SESSION['code'] = $_POST['code'];
    $result = $game->enter($_POST['username'], $_POST['code']);
    if ($result['RESULT']) {
        echo $result['RESULT'];
        echo $_POST;
    } else {
        foreach ($result['MESSAGE'] as $msg) echo $msg . "</br>";
    }
}
?>
<div class="container-fluid min-vh-100 d-flex flex-row justify-content-center align-items-center">
    <img class="kittens-header-img mb-5 mt-3" src="../pictures/God-cat.png"/>
    <img class="kittens-header-img-2 mb-5 mt-3" src="../pictures/when-you-walking.png"/>
    <img class="kittens-header-img-3 mb-5 mt-3" src="../pictures/yuy-cat.png"/>
    <img class="kittens-header-img-4 mb-5 mt-3" src="../pictures/cat-up.png"/>
    <img class="kittens-header-img-5 mb-5 mt-3" src="../pictures/cat-bread.png"/>
    <form id="form" class="w-35 border border-warning p-5 h-50" method="POST">
        <div class="form-group row">
            <label class="col-sm-4 col-form-label" for="username">Username:</label>
            <div class="col-sm-8">
                <input type="text" class="form-control" id="username" aria-describedby="usernameHelp">
            </div>
        </div>
        <div class="form-group row">
            <label class="col-sm-4 col-form-label" for="code">Your code:</label>
            <div class="col-sm-8">
                <input type="text" class="form-control" id="code" aria-describedby="codeHelp">
            </div>
        </div>
        <button class="offset-4 mt-3 confirm-button btn" name="enter" type="submit">Enter game</button>
    </form>
</div>
</body>
</html>