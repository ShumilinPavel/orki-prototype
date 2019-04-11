var players;
var dragFrom;
var dragID;
var debug = false;
function allowDrop(ev) {
    ev.preventDefault();
    if (!document.getElementById('ghostDice')) createGhost(ev.target);
    if (ev.target.className.includes('playerBoard')) lockDrag(ev.target);
}
function takeDice(ev) {
    dragID = ev.target.id;
    dragFrom = ev.target.parentNode.id;
}
function dropDice(ev) {
    ev.preventDefault();
    var target = (ev.target.className.includes('playerBoard')) ? ev.target : ev.target.parentNode;
    unlockDrag(target);
    target.appendChild(document.getElementById(dragID));
    deleteGhost();
}
function createGhost(target){
    if (!target.className.includes('playerBoard')) target = target.parentNode;
    if (!document.getElementById('ghostDice') && (target.id != dragFrom)) {
        var ghostDice = document.createElement("div");
        ghostDice.setAttribute("id","ghostDice");
        ghostDice.innerHTML = '&nbsp;';
        target.appendChild(ghostDice);
        ghostDice.setAttribute("id","ghostDice");
    }
}
function unlockDrag(target) {
    if (debug) console.log("#" + target.id + " unlocked");
    for(var i=0;i <= target.children.length - 1;i++) target.children[i].style.pointerEvents = "auto";
}
function lockDrag(target) {
    if (target.children[0].style.pointerEvents != "none") {
        if (debug) console.log("#" + target.id + " locked");
        for(var i=0;i < target.children.length;i++) target.children[i].style.pointerEvents = "none";
    }
}
function deleteGhost(){
    if (ghostDice = document.getElementById("ghostDice")) ghostDice.parentNode.removeChild(ghostDice);
}
function checkMid(){
	if (document.getElementById('board').children.length == players * 2) {
        //WIP: reRoll + countDiff
        var message ="Время встряски!\n";
        for(var i = 1;i<=players;i++){
            reRoll('pb' + i);
            message += "Игрок " + i + ": " + countDiff('pb' + i) + "\n";
        }
        if (debug) console.log(message);
            else alert(message);
    }	
}
function countDiff(target){
	var arChilds = document.getElementById(target).children;
	var sum = 0;
	//playerBoard contains <span> with playerName and <br>
	for (var i = 2; i <= arChilds.length - 1; i++){
		if (arChilds[i].classList[1] == 'white')
			sum += Number(arChilds[i].innerHTML)
		else
			sum -= Number(arChilds[i].innerHTML);
	}
	if (sum > 0) return sum + " белые"
	else if (sum < 0) return -sum + " черные"
	else return sum;
}
function reRoll(target){
	var arChilds = document.getElementById(target).children;
	//playerBoard contains <span> with playerName and <br>
	var i = (document.getElementById(target).classList[0] == 'playerBoard' ? 2 : 0);
	for (i; i <= arChilds.length - 1; i++)	{
        arChilds[i].innerHTML = getNum();
    }
}
function getNum(){
	return Math.floor(Math.random() * (7 - 1)) + 1;
}
function drawDice(id){
	var color;
	var newDice;
	if (id <= players * 2) color = 'black';
				else 	   color = 'white';        
    if (id == players + 1) {
		//when set as many dices, as players, count board's width and fix it. (instead of </br>)
		var diceSide = (window.getComputedStyle(document.getElementById('board')).getPropertyValue('width'));
		document.getElementById('board').style.width= diceSide;
	}
	var newDice = document.createElement("div");
    newDice.setAttribute("id",id);
    newDice.className = "dice " + color;
    newDice.setAttribute("draggable","true");
    newDice.setAttribute("ondragstart","takeDice(event)");
    newDice.innerHTML = getNum();
    document.getElementById("board").appendChild(newDice);
}
function setPlayerNames(){
    for (var i=1;i<=players;i++){
        document.getElementById('pn'+i).innerHTML = prompt('Введите имя игрока '+i, 'Игрок '+i);
    }
}
function startGame(tempPlayers){
	players = tempPlayers;
	var div = document.getElementById('board');
	div.innerHTML = '';
	if (!debug) setPlayerNames();
	for (var i = 1; i <= players * 4; i++) drawDice(i);

    document.getElementById("pb1").style.visibility = 'visible';
    document.getElementById("pb2").style.visibility = 'visible';
    document.getElementById("pb3").style.visibility = 'visible';
    document.getElementById("trash").style.visibility = 'visible';
	if (players == 3) {
		document.getElementById("pb1").classList.add('place2');
		document.getElementById("pb2").classList.add('place3');
		document.getElementById("pb3").classList.add('place4');
	} else if (players == 4) {
		document.getElementById("pb1").classList.add('place1');
		document.getElementById("pb2").classList.add('place2');
		document.getElementById("pb3").classList.add('place4');
		document.getElementById("pb4").classList.add('place5');
		document.getElementById("pb4").style.visibility = 'visible';
	}
    else {    
		document.getElementById("pb1").classList.add('place1');
		document.getElementById("pb2").classList.add('place2');
		document.getElementById("pb3").classList.add('place3');
		document.getElementById("pb4").classList.add('place4');
		document.getElementById("pb5").classList.add('place5');
        document.getElementById("pb4").style.visibility = 'visible';
        document.getElementById("pb5").style.visibility = 'visible';
    }
}