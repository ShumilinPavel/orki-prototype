<?

session_start();
require('./game.php');

$game = new Game();
$playersInfo = $game->setTimeAndFinishedRecordsInDB($_POST['id'], $_POST['time']);

?>