<?

session_start();

srand($_SESSION['code'] * 239 + intdiv(time(), 120));

// $rand_indexes = [];
// foreach (range(0, 13) as $i) {
//     $rand_indexes.array_push(rand(0, 13));
// }
$rand_indexes = range(0, 13);
shuffle($rand_indexes);

echo json_encode($rand_indexes);

?>