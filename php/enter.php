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
    <link rel="stylesheet" href="../css/enter.css">
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"
            integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous">
    </script>
</head>

<body>

<?php
if (array_key_exists('enter', $_POST)) {
    $_SESSION['player'] = $_POST['username'];
    $_SESSION['code'] = $_POST['code'];
    $result = $game->enter($_SESSION['player'], $_SESSION['code']);
    if ($result['RESULT']) {
		$_SESSION['id'] = $game->getLastInsertId();
        echo '<meta http-equiv="Location" content="http://lobby.php">';         // <script>
		echo '<meta http-equiv="refresh" content="0;url=lobby.php">';
    } else {
        foreach ($result['MESSAGE'] as $msg) echo $msg . "</br>";
    }
}
?>
<div class="container-fluid min-vh-100 d-flex flex-row justify-content-center align-items-center">
    <img class="kittens-header-img mb-5 mt-3" src="../pictures/multicat.png"/>
    <form id="form" class="w-45 border border-warning p-5 h-50" method="POST">
        <div class="form-group row">
            <label class="col-sm-4 col-form-label" for="username">Username:</label>
            <div class="col-sm-8">
                <input type="text" class="form-control" id="username" aria-describedby="usernameHelp" name="username">
            </div>
        </div>
        <div class="form-group row">
            <label class="col-sm-4 col-form-label" for="code">Your code:</label>
            <div class="col-sm-8">
                <input type="text" class="form-control" id="code" aria-describedby="codeHelp" name="code">
            </div>
        </div>
        <button class="offset-4 mt-3 confirm-button btn" name="enter" type="submit">Enter game</button>
    </form>
</div>
</body>
</html>