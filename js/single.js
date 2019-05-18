$(document).ready(function () {
    configureGame();
    refreshTimer();
    keyBoardHandler();
    dragAndDropHandler();
    checkRiddlecardHandler();
});

function keyBoardHandler() {
    var curTileId = '';

    ////// KEYBOARD HANDLER //////
    $(document).on('keydown', function (e) {
        if (curTileId == '') {
            return;
        }

        Rotate(e.keyCode);
        Flip(e.keyCode);
    });

    function Flip(keyCode) {
        if (keyCode != 83) {
            return;
        }

        var image = $('#' + curTileId).children()[0];

        var strImageUrl = image.src;
        var index = strImageUrl.indexOf('/pictures/');
        var fileName = strImageUrl.substring(index + 10);

        var newFileName = fileName.split('.')[0] + "-back.png";
        if (fileName.includes("back")) {
            var parts = fileName.split("-back");
            newFileName = parts[0] + parts[1];
        }

        $('#' + curTileId).children().attr("src", strImageUrl.substring(0, index + 10) + newFileName);
    }

    function Rotate(keyCode) {
        var rotation = 0;

        var image = $('#' + curTileId).children()[0];
        var str = image.style.transform;

        if (str != '') {
            rotation = parseInt(str.split('(')[1].split('deg)'));
        }

        // A и стрелка влево
        if (keyCode == 65 || keyCode == 37) {
            rotation -= 120;
            if (rotation < 0) {
                rotation += 360;
            }
        }

        // D и стрелка вправо
        if (keyCode == 68 || keyCode == 39) {
            rotation += 120;
            if (rotation >= 360) {
                rotation -= 360;
            }
        }

        if (curTileId == "cat-long") {
            if (rotation == 0) {
                $('#' + curTileId).children().css('transform', 'rotate(' + rotation + 'deg) translateY(-20%)');
            }
            if (rotation == 120) {
                $('#' + curTileId).children().css('transform', 'rotate(' + rotation + 'deg) translate(17%, 10%)');
            }
            if (rotation == 240) {
                $('#' + curTileId).children().css('transform', 'rotate(' + rotation + 'deg) translate(33%, -20%)');
            }
        } 
        else {
            $('#' + curTileId).children().css('transform', 'rotate(' + rotation + 'deg)');
        }   
    }

    $('.tile').mouseenter(function () {
        curTileId = $(this).attr('id');
    });

    $('.tile').mouseleave(function () {
        curTileId = '';
    });
}

function dragAndDropHandler() {
    ////// DRAG&DROP //////
    var dragObject = {};

    document.onmousedown = function (e) {
        if (e.which != 1) return;

        var elem = e.target.closest('.tile');
        if (!elem) return;

        dragObject.elem = elem;

        var coords = getCoords(dragObject.elem);

        var shiftX = e.pageX - coords.left;
        var shiftY = e.pageY - coords.top;

        dragObject.elem.style.position = 'absolute';
        document.body.appendChild(dragObject.elem);
        dragObject.elem.style.zIndex = 1000;

        moveAt(e);

        function moveAt(e) {
            dragObject.elem.style.left = e.pageX - shiftX + 'px';
            dragObject.elem.style.top = e.pageY - shiftY + 'px';
        }

        function getCoords(elem) {
            var box = elem.getBoundingClientRect();
            return {
                top: box.top + pageYOffset,
                left: box.left + pageXOffset
            };
        };

        document.onmousemove = function (e) {
            if (!dragObject.elem) return;

            moveAt(e);
        }

        document.onmouseup = function (e) {
            if (dragObject.elem) {
                finishDrag(e);
            }

            dragObject = {};
        }

        function finishDrag(e) {
            var dropElem = findDroppable(e);

            if (dropElem) {
                dropElem.appendChild(dragObject.elem);
                dragObject.elem.style.left = 0;
                dragObject.elem.style.top = 0;
            }
        }

        function findDroppable(event) {
            dragObject.elem.hidden = true;
            var elem = document.elementFromPoint(event.clientX, event.clientY);
            dragObject.elem.hidden = false;

            return elem.closest('.droppable');
        }

    }
}

function setLongCatView() {
    var width = $('#cat-black').prop('width');
    $('#cat-long').css('width', width * 1.5);
    $("#cat-long").children().css('transform', 'rotate(0deg) translateY(-20%)');
}

// Начальное время таймера
var sec = 0;
var min = 45;

function refreshTimer() {
    sec--;
    if (sec == -01) {
        sec = 59;
        min = min - 1;
    }
    if (sec <= 9) {
        sec = "0" + sec;
    }
    time = (min <= 9 ? "0" + min : min) + ":" + sec;

    if (document.getElementById) {
        timer.innerHTML = time;
    }

    inter = setTimeout("refreshTimer()", 1000);

    if (min == '00' && sec == '00') {
        clearInterval(inter);
        finishGame();
    }
}

function finishGame() {
    $('#endGameModal').modal({
        backdrop: 'static',
        keyboard: false
    });
    $('.endGameModal-title').text("Ваш результат: " + completedCards + ".");
    $("#endGameModal").modal('show');
    $("#back-to-menu").on("click", function () {
        location.href = "../html/start_screen.html"
    });
}

function checkRiddlecardHandler() {
    specialCardsPaths = ['../pictures/g12656.png']

    $('.btn-check').on('click', function () {
        var curRiddleCard = riddleCards[riddleCardId];
        if (isSpecialCard(curRiddleCard)) {
            specialCardsChecker(curRiddleCard);
        } else {
            ordinaryCardsChecker(curRiddleCard)
        }
        resetBtnColor();
    });

    function ordinaryCardsChecker(curRiddleCard) {
        if (Check() == curRiddleCard['codeSequence']) {
            rightAnswer();
            completedCards += 1;
            getNextRiddleCard();
            setKittiesOnStartPosition();
        } else {
            wrongAnswer();
        }
    }

    function centralSpaceChecker() {
        if ($('#cat-yellow').parent().next().length == 1) {
            return true;
        }
    }

    function wrongAnswer() {
        $('.btn-check').css('background-color', 'red');
    }

    function rightAnswer() {
        $('.btn-check').css('background-color', 'green');
    }

    function resetBtnColor() {
        setTimeout(function () {
            $('.btn-check').css('background-color', 'buttonface');
        }, 2000);
    }

    function isSpecialCard(curRiddleCard) {
        return specialCardsPaths.includes(curRiddleCard['path']);
    }

    function specialCardsChecker(curRiddleCard) {
        isCorrect = false;
        if (Check() == curRiddleCard['codeSequence']) {
            switch (curRiddleCard['path']) {
                case '../pictures/g12656.png':
                    if (centralSpaceChecker()) {
                        isCorrect = true;
                    }
                    break;
            }
        }
        if (isCorrect) {
            rightAnswer();
            completedCards += 1;
            getNextRiddleCard();
            setKittiesOnStartPosition();
        } else {
            wrongAnswer();
        }
    }
}

function Check() {
    var checkRow = '';
    $(".tile-border").each(function () {
        if ($(this).children(".tile").length == 0) {
            checkRow += '';
        } else {
            var tile = $(this).children(".tile")[0];
            var catImage = $(this).children(".tile").children()[0];
            switch (tile.id) {
                case 'cat-white':
                    if (isBackSide(catImage)) checkRow += 'W';
                    else checkRow += 'w';
                    break;
                case 'cat-orange':
                    if (isBackSide(catImage)) checkRow += 'O';
                    else checkRow += 'o';
                    break;
                case 'cat-black':
                    if (isBackSide(catImage)) checkRow += 'B';
                    else checkRow += 'b';
                    break;
                case 'cat-blue':
                    if (isBackSide(catImage)) checkRow += 'F';
                    else checkRow += 'f';
                    break;
                case 'cat-grey':
                    if (isBackSide(catImage)) checkRow += 'G';
                    else checkRow += 'g';
                    break;
                case 'cat-yellow':
                    if (isBackSide(catImage)) checkRow += 'Y';
                    else checkRow += 'y';
                    break;
                case 'cat-long':
                    if (isBackSide()) checkRow += 'L';
                    else checkRow += 'l';
                    break;
            }
        }
    });
    console.log('checkRow before deg: ' + checkRow);
    checkRow = getCheckRowWithRotation(checkRow);
    console.log('checkRow after deg: ' + checkRow);

    return checkRow;

    function isBackSide(catImage) {
        return catImage.src.includes('back');
    }

    function getCheckRowWithRotation(codeSequence) {
        modifyedCodeSequence = '';
        for (var i = 0; i < codeSequence.length; i++) {
            modifyedCodeSequence += codeSequence[i];
            switch (codeSequence[i]) {
                case 'W':
                case 'w':
                    modifyedCodeSequence += getTileRotation('cat-white');
                    break;
                case 'O':
                case 'o':
                    modifyedCodeSequence += getTileRotation('cat-orange');
                    break;
                case 'B':
                case 'b':
                    modifyedCodeSequence += getTileRotation('cat-black');
                    break;
                case 'F':
                case 'f':
                    modifyedCodeSequence += getTileRotation('cat-blue');
                    break;
                case 'G':
                case 'g':
                    modifyedCodeSequence += getTileRotation('cat-grey');
                    break;
                case 'Y':
                case 'y':
                    modifyedCodeSequence += getTileRotation('cat-yellow');
                    break;
                case 'L':
                case 'l':
                    modifyedCodeSequence += getTileRotation('cat-long');
                    break;
            }
        }
        return modifyedCodeSequence;
    }

    function getTileRotation(id) {
        transfromStr = $('#' + id).children('img').attr('style');
        if (transfromStr == undefined) {
            return 0;
        }
        return parseInt(transfromStr.split('(')[1].split('deg)'));
    }
}

// Пулл карточек
var riddleCards = [{
        'path': '../pictures/g12656.png',
        'codeSequence': 'b240o240y0g0f240w120'
    },
    {
        'path': '../pictures/g65669.png',
        'codeSequence': 'y0o240g0f240w120'
    }
]
var riddleCardId = -1;
var completedCards = 0;

function configureGame() {
    function compareRandom(a, b) {
        return Math.random() - 0.5;
    }

    riddleCards.sort(compareRandom);
    getNextRiddleCard();
    setLongCatView();
}

function getNextRiddleCard() {
    riddleCardId += 1;
    if (riddleCardId >= riddleCards.length) {
        finishGame();
    };
    $('.riddle-card').attr('src', riddleCards[riddleCardId]['path']);
}

function setKittiesOnStartPosition() {
    var base = $('.cat-tiles-base');
    $('.tile').each(function () {
        $(this).css('position', 'relative');
        $(this).css('left', '0');
        $(this).css('top', '0');
        $(this).children().css('transform', 'rotate(0deg)');
        base.append($(this));
    });
    $("#cat-long").children().css('transform', 'rotate(0deg) translateY(-20%)');
}