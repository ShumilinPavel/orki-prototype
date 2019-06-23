<?

session_start();
require('./game.php');

$game = new Game();
$game->setTimeAndFinishedRecordsInDB($_POST['id'], $_POST['time']);

?>