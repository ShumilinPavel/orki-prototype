$(document).ready(function () {
    configureGame();
    startTimer(Date.now());
    keyboardHandler();
    dragAndDropHandler();
    checkRiddleCardHandler();
});

function keyboardHandler() {
    var curTileId = '';
    curTileIdHandler();
    
    $(document).on('keydown', function (e) {
        if (curTileId == '') {
            return;
        }
        rotate(e.keyCode);
        flip(e.keyCode);
    });

    function rotate(keyCode) {
        var rotation = 0;

        var image = $('#' + curTileId).children()[0];
        var str = image.style.transform;

        if (str != '') {
            rotation = parseInt(str.split('(')[1].split('deg)'));
        }

        // A и стрелка влево
        if (keyCode == 65 || keyCode == 37) {
            if (curTileId == 'cat-long') {
                rotation -= 60;
            } else {
            rotation -= 120;}
            if (rotation < 0) {
                rotation += 360;
            }
        }

        // D и стрелка вправо
        if (keyCode == 68 || keyCode == 39) {
            if (curTileId == 'cat-long') {
                rotation += 60;
            } else {
            rotation += 120;}
            if (rotation >= 360) {
                rotation -= 360;
            }
        }

        if (curTileId == "cat-long") {
            if (rotation == 0) {
                $('#' + curTileId).children().css('transform', 'rotate(' + rotation + 'deg) translateY(-20%)');
            }
            if (rotation == 60) {
                $('#' + curTileId).children().css('transform', 'rotate(' + rotation + 'deg) translateY(-0%)');
            }
            if (rotation == 120) {
                $('#' + curTileId).children().css('transform', 'rotate(' + rotation + 'deg) translate(17%, 10%)');
            }
            if (rotation == 180) {
                $('#' + curTileId).children().css('transform', 'rotate(' + rotation + 'deg) translateX(33%)');
            }
            if (rotation == 240) {
                $('#' + curTileId).children().css('transform', 'rotate(' + rotation + 'deg) translate(33%, -20%)');
            }
            if (rotation == 300) {
                $('#' + curTileId).children().css('transform', 'rotate(' + rotation + 'deg) translate(17%,-30%)');
            }
        }
        else {
            $('#' + curTileId).children().css('transform', 'rotate(' + rotation + 'deg)');
        }   
    }

    function flip(keyCode) {
        if (keyCode != 83 && keyCode != 32) {
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

    function curTileIdHandler() {
        $('.tile').mouseenter(function () {
            curTileId = $(this).attr('id');
        });
    
        $('.tile').mouseleave(function () {
            curTileId = '';
        });
    }
}

function dragAndDropHandler() {
    var dragObject = {};

    document.onmousedown = function (e) {
        if (e.which != 1) return;

        var elem = e.target.closest('.tile');
        if (!elem) return;

        var audio = new Audio();
        var rand =  4 * Math.random() - 0.5;
        rand = Math.round(rand);
        audio.src = sounds[rand];
        audio.autoplay = true;

        dragObject.elem = elem;

        var coords = getCoords(dragObject.elem);

        var shiftX = e.pageX - coords.left;
        var shiftY = e.pageY - coords.top;

        dragObject.elem.style.position = 'absolute';
        document.body.appendChild(dragObject.elem);
        dragObject.elem.style.zIndex = 1000;

        moveAt(e);

        function getCoords(elem) {
            var box = elem.getBoundingClientRect();
            return {
                top: box.top + pageYOffset,
                left: box.left + pageXOffset
            };
        };

        function moveAt(e) {
            dragObject.elem.style.left = e.pageX - shiftX + 'px';
            dragObject.elem.style.top = e.pageY - shiftY + 'px';
        }

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
var startTime = Date.now();
var millisecInterval;
var elapsedTime;

function startTimer() {
    millisecInterval = setInterval(function() {
        elapsedTime = Date.now() - startTime;
        if (document.getElementById) {
            timer.innerHTML = (elapsedTime / 1000).toFixed(3);
        }
    }, 1);
}
            
function finishGame() {
    clearInterval(millisecInterval);
    $('#endGameModal').modal({
        backdrop: 'static',
        keyboard: false
    });
    $('.endGameModal-title').text("Ваш результат: " + completedCards + " карточек за " + (elapsedTime / 1000).toFixed(3));
    $("#endGameModal").modal('show');
    $("#back-to-menu").on("click", function () {
        location.href = "../index.php";
    });
}

function checkRiddleCardHandler() {
    $('.btn-check').on('click', function () {
        var curRiddleCard = riddleCards[riddleCardId];
        cardsChecker(curRiddleCard);
        resetBtnColor();
    });

    function cardsChecker(curRiddleCard) {
        var codeSequence = getCodeSequence();
        var isCorrect = false;
        for (var i = 0; i < curRiddleCard['codeSequences'].length; i++) {
            if (codeSequence == curRiddleCard['codeSequences'][i]) {
                rightAnswer();
                completedCards += 1;
                getNextRiddleCard();
                setKittiesOnStartPosition();
                isCorrect = true;
                break;
            }
        }
        if (!isCorrect) {
            wrongAnswer();
        }
        //  if (getCodeSequence() == curRiddleCard['codeSequence']) {
        //      rightAnswer();
        //      completedCards += 1;
        //      getNextRiddleCard();
        //      setKittiesOnStartPosition();
        //  } else {
        //      wrongAnswer();
        //  }

        function rightAnswer() {
            $('.btn-check').css('background-color', 'green');
        }

        function wrongAnswer() {
            $('.btn-check').css('background-color', 'red');
            startTime -= 50000;
        }

        function setKittiesOnStartPosition() {
            var base = $('.cat-tiles-base');
            $('.tile').each(function () {
                $(this).css('position', 'relative');
                $(this).css('left', '0');
                $(this).css('top', '0');
                $(this).children().css('transform', 'rotate(0deg)');
                flipOnFrontSide($(this).children());
                base.append($(this));
            });
            $("#cat-long").children().css('transform', 'rotate(0deg) translateY(-20%)');

            function flipOnFrontSide(jQuery_image) {    
                let splitted_path = jQuery_image.attr('src').split('/');
                let picture_name = splitted_path[splitted_path.length - 1];
                if (picture_name.includes('back')) {
                    splitted_path[splitted_path.length - 1] = picture_name.split('-')[0] + '.png';
                    path = splitted_path.join('/');
                    jQuery_image.attr('src', path);
                }
            }
        }

        function getCodeSequence() {
            var codeSequence = '';
            readCodeSequenceWithSpaces();
            removeSpacePatterns();
            addRotation();
            return codeSequence;
        
            function readCodeSequenceWithSpaces() {
                $(".tile-border").each(function () {
                    if ($(this).children(".tile").length == 0) {
                        codeSequence += 's';
                    } else {
                        var tile = $(this).children(".tile")[0];
                        var catImage = $(this).children(".tile").children()[0];
                        switch (tile.id) {
                            case 'cat-white':
                                if (isBackSide(catImage)) codeSequence += 'W';
                                else codeSequence += 'w';
                                break;
                            case 'cat-orange':
                                if (isBackSide(catImage)) codeSequence += 'O';
                                else codeSequence += 'o';
                                break;
                            case 'cat-black':
                                if (isBackSide(catImage)) codeSequence += 'B';
                                else codeSequence += 'b';
                                break;
                            case 'cat-blue':
                                if (isBackSide(catImage)) codeSequence += 'F';
                                else codeSequence += 'f';
                                break;
                            case 'cat-grey':
                                if (isBackSide(catImage)) codeSequence += 'G';
                                else codeSequence += 'g';
                                break;
                            case 'cat-yellow':
                                if (isBackSide(catImage)) codeSequence += 'Y';
                                else codeSequence += 'y';
                                break;
                            case 'cat-long':
                                if (isBackSide(catImage)) codeSequence += 'L';
                                else codeSequence += 'l';
                                break;
                        }
                    }
                });
                console.log('codeSequence before remove s: ' + codeSequence);
        
                function isBackSide(catImage) {
                    return catImage.src.includes('back');
                }
            }
        
            function removeSpacePatterns() {
                // Массив индексов, которые нам нужно проверить на пустоту
                var removePatternsList = [[0,4,9], [1,5,10], [2,7,11], [3,8,12], [0,1,2,3], [9,10,11,12]];
                var isPatternInCodeSequence = true;
                for (var i = 0; i < removePatternsList.length; i++) {
                    isPatternInCodeSequence = true;
                    curPattern = removePatternsList[i];
                    for (var j = 0; j < curPattern.length; j++) {
                        if (codeSequence[curPattern[j]] != 's' && codeSequence[curPattern[j]] != '#') {
                            isPatternInCodeSequence = false;
                            break;
                        }
                    }
                    if (isPatternInCodeSequence) {
                        var charsList = codeSequence.split("");
                        for (var j = 0; j < curPattern.length; j++) {
                            charsList[curPattern[j]] = '#';
                        }
                        codeSequence = charsList.join("");
                    }
                }
                codeSequence = codeSequence.replace(/#/g, '');
                console.log('codeSequence after remove s: ' + codeSequence);
            }
        
            function addRotation() {
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
                codeSequence = modifyedCodeSequence;
                console.log('codeSequence after add rotation: ' + codeSequence);
                
                function getTileRotation(id) {
                    transfromStr = $('#' + id).children('img').attr('style');
                    if (transfromStr == undefined) {
                        return 0;
                    }
                    return parseInt(transfromStr.split('(')[1].split('deg)'));
                }
            }
        }
    }
    
    function resetBtnColor() {
        setTimeout(function() {
            $('.btn-check').css('background-color', 'buttonface');
        }, 2000);
    }
}

// Пулл карточек
var riddleCards = [
    {
        'path': '../pictures/pic1.png',
        'codeSequences': ['sF240sG240L0O240sY240', 'sF240L0sG240ssO240ssY240'],
        'boxId': 2
    },
    {
        'path': '../pictures/pic2.png',
        'codeSequences': ['w0sb240l300G240f240O240y120'],
        'boxId': 1
    },
    {
        'path': '../pictures/pic3.png',
        'codeSequences': ['b240L300G120y0f120W0sO0', 'sb240L300G120y0f120W0O0'],
        'boxId': 2
    },
    // {
    //     'path': '../pictures/pic4.png',
    //     'codeSequences': ['y0f0o0ssl180s', 'y0f0o0sl180']
    // },
    // {
    //     'path': '../pictures/pic5.png',
    //     'codeSequences': ['G240f0W240sl180sy0sb240s']
    // },
    // {
    //     'path': '../pictures/pic6.png',
    //     'codeSequences': ['sl0ssb240G240sf240O240W120']
    // },
    // {
    //     'path': '../pictures/pic7.png',
    //     'codeSequences': ['o0f0l0b0sss', 'so0f0l0b0ss']
    // },
    // {
    //     'path': '../pictures/pic8.png',
    //     'codeSequences': ['y240g240o0sl180f120b0']
    // },
    // {
    //     'path': '../pictures/pic9.png',
    //     'codeSequences': ['y0o240G240sl180sw240sf120b0']
    // },
    // {
    //     'path': '../pictures/pic10.png',
    //     'codeSequences': ['L240O240F240Y240s', 'L240O240sF240Y240', 'sL240O240F240Y240']
    // },
    // {
    //     'path': '../pictures/pic11.png',
    //     'codeSequences': ['l0sw240sf120b0ssy0s']
    // },
    // {
    //     'path': '../pictures/pic12.png',
    //     'codeSequences': ['Y240w240F120o0sg240sL60ss']
    // },
    // {
    //     'path': '../pictures/pic13.png',
    //     'codeSequences': ['G240f0W240ssb0sl240y0s']
    // },
    // {
    //     'path': '../pictures/pic14.png',
    //     'codeSequences': ['b240o240y0sg0f240w120']
    // },
    // {
    //     'path': '../pictures/pic15.png',
    //     'codeSequences': ['y0o240g0f240w120', 'y0o240g0sf240w120s']
    // },
    // {
    //     'path': '../pictures/pic16.png',
    //     'codeSequences': ['y0o0f0l0', 'sssssy0o0f0l0', 'y0o0f0l0sssss']
    // }
]
var sounds = ['kitty1.wav', 'kitty2.wav', 'kitty3.wav', 'kitty4.wav'];

var riddleCardId = -1;
var completedCards = 0;
 
function configureGame() {
    riddleCards.sort(compareRandom); // Сортировка карточек случайным образом
    getNextRiddleCard();
    setLongCatView();

    function compareRandom(a, b) {
        return Math.random() - 0.5;
    }
    
    function setLongCatView() {
        var width = $('#cat-black').prop('width');
        $('#cat-long').css('width', width * 1.5);
        $("#cat-long").children().css('transform', 'rotate(0deg) translateY(-20%)');
    }
}

var cardOnGame = 3;

function getNextRiddleCard() {
    riddleCardId += 1;
    if (riddleCardId >= cardOnGame || riddleCardId >= riddleCards.length) {
        finishGame();
    };
    $('.riddle-card').attr('src', riddleCards[riddleCardId]['path']);
    setBox();

    function setBox() {
        $('.box-background').css('background-image', 'url("../pictures/box' + riddleCards[riddleCardId]['boxId'] + '.png")');
    }
}

function soundClick() {
    console.log('dsfdsfsdf');
    var audio = new Audio(); // Создаём новый элемент Audio
    audio.src = 'kitty1.wav'; // Указываем путь к звуку "клика"
    audio.autoplay = true; // Автоматически запускаем
}