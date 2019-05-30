<?
	session_start();
	require('./game.php');
	$game = new Game();
?>

<!DOCTYPE html>
<html>

<head></head>

<body>	
<?
	if ($_POST['enter']) {
		$_SESSION['username'] = $_POST['username'];
		$_SESSION['code'] = $_POST['code'];
		$result = $game->enter($_POST['username'],$_POST['code']);
		if ($result['RESULT']) {
			echo '<meta http-equiv="Location" content="http://lobby.php">';
			echo '<meta http-equiv="refresh" content="0;url=lobby.php">';
		}
		else {
			foreach($result['MESSAGE'] as $msg) echo $msg."</br>";
		}
	} 
?>

	<form method="POST">
		Username: <input name="username" type="text" maxlength="15" required/></br>
		Code: <input name="code" type="text"  maxlength="20" required/></br>
		<input name="enter" type="submit" value="Enter game"/>
	</form>

</body>
</html>