<?

session_start();
require('./game.php');

$game = new Game();
$playersInfo = $game->getPlayersInfo($_SESSION['code']);
$data = [];
foreach ($playersInfo as $playerInfo) {
    array_push($data, array('id'=>$playerInfo['id'], 'ready'=>$playerInfo['ready']));
}
echo json_encode($data);

?>