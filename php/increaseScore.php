<?

session_start();
require('./game.php');

$game = new Game();
$playersInfo = $game->increaseScore($_POST['id']);

?>