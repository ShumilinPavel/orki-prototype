<?

require('./game.php');

if (isset($_POST['id'])) {
    $id = $_POST['id'];
    $game = new Game();
    $game->setReady($id);
    echo json_encode(array('success'=>1, 'msg'=>'Recorded in database'));
}
else {
    echo json_encode(array('success'=>0, 'msg'=>'Did not get player id'));
}

?>