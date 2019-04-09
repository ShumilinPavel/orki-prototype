function goToSingleModeScreen() {
	$("#single-mode-btn").click(function(){
		location.href="../html/single.html"
	});
}

$(document).ready(function(){
	goToSingleModeScreen();
});