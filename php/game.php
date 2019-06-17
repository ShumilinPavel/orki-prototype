<?php

class Game {	
	private $username;
	private $code;
	
	private $mysqlconnect;
	
	private function getLastInsertId() {
		$query = 'SELECT id FROM game ORDER BY id DESC LIMIT 1';
		$result = $this->mysqlconnect->query($query);
		$row = mysqli_fetch_assoc($result);
		return $row['id'];
	}

	public function __construct()
    {   
        $this->mysqlconnect = new mysqli('localhost', 'root', 'password', 'kittyRush');
        if ($this->mysqlconnect->connect_errno)
            die("Connection to database failed");
    }
	
// Auth block                                                                             
          
	public function enter($username, $code)
	{
		$err = [];
		$this->username = $this->mysqlconnect->real_escape_string($username);
		$this->code = $this->mysqlconnect->real_escape_string($code);

		// проверям логин
		if (!preg_match("/^[a-zA-Z0-9]+$/", $this->username))
		{
			$err[] = "Логин может состоять только из букв английского алфавита и цифр";
		}

		if (strlen($this->username) < 3 or strlen($this->username) > 15)
		{
			$err[] = "Логин должен быть не меньше 3-х символов и не больше 15";
		}
		
		// Если нет ошибок, то добавляем в БД нового пользователя
		if (count($err) == 0)
		{
			$this->mysqlconnect->query("INSERT INTO game(player, code) VALUES ("."'$this->username'".","."'$this->code'".")");
			
			$result['RESULT'] = true;
			$result['MESSAGE'] = 'Вы присоединились к игре';
		}
		else
		{
            $result['RESULT'] = false;
            $result['MESSAGE'] = $err;
        }
        return $result;
	}
	
	public function logout()
	{
		session_unset();
		session_destroy();
		unset($_COOKIE);
	}
	
	public function getPlayersInfo($code) {
		$query = "SELECT id, player, ready FROM game WHERE code=".$code;
		$playersInfo = [];
		if ($result = $this->mysqlconnect->query($query)) {
			while ($row = mysqli_fetch_assoc($result)) {
				$playerInfo = array('id'=> $row['id'], 'player'=>$row['player'], 'ready'=>$row['ready']);
				array_push($playersInfo, $playerInfo);
			}
		}
		return $playersInfo;
	}

	public function getMyPlayerInfo() {
		$id = $this->getLastInsertId();
		$query = "SELECT id, player FROM game WHERE id=".$id;
		$result = $this->mysqlconnect->query($query);
		$row = mysqli_fetch_assoc($result);
		return array('id'=>$row['id'], 'player'=>$row['player']);
	}

	public function setReady($id) {
		$query = "UPDATE game SET ready=1 WHERE id=".$id; 
		$this->mysqlconnect->query($query);
	}
}

?>