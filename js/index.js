$(document).ready(function() {
    redirectHandler();
    btnSoundsHandler();
})

function btnSoundsHandler() {
    $('.btn').click(function() {
        playSound("../audio/neutralClick.mp3");
    });

    function playSound(source) {
        let audio = new Audio();
        audio.src = source;
        audio.volume = 0.3;
        audio.autoplay = true;
    }
}

function redirectHandler() {
    $('#single-mode-btn').click(function() {
        setTimeout(function() {
            goTo("../html/single.html");
        }, 200);
    })

    $('#multiplayer-mode-btn').click(function() {
        setTimeout(function() {
            goTo("../php/enter.php");
        }, 200);
    })

    function goTo(url) {
        location.href = url;
    }
}

