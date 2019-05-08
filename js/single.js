$(document).ready(function() {
    configureGame();
    refreshTimer();

    var curTileId = '';
    $("#cat-long").children().css('transform', 'rotate(0deg) translateY(-20%)');

    ////// KEYBOARD HANDLER //////
    $(document).on('keydown', function(e) {
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
            if (curTileId == "cat-long") rotation -= 60;
                                    else rotation -= 120;
            if (rotation < 0) {
                rotation += 360;
            }
        }
        
        // D и стрелка вправо
        if (keyCode == 68 || keyCode == 39) {
            if (curTileId == "cat-long") rotation += 60;
                                    else rotation += 120;
            if (rotation > 360) {
                rotation -= 360;
            }
        }

        if (curTileId == "cat-long") {
            console.log("done");
            if (rotation == 0 || rotation == 360) {
                $('#' + curTileId).children().css('transform', 'rotate(' + rotation + 'deg) translateY(-20%)');
            }
            if (rotation == 60) {
                $('#' + curTileId).children().css('transform', 'rotate(' + rotation + 'deg) translate(0, 0)');
            }
            if (rotation == 120) {
                $('#' + curTileId).children().css('transform', 'rotate(' + rotation + 'deg) translate(17%, 10%)');
            }
            if (rotation == 180) {
                $('#' + curTileId).children().css('transform', 'rotate(' + rotation + 'deg) translate(33%, 0%)');
            }
            if (rotation == 240) {
                $('#' + curTileId).children().css('transform', 'rotate(' + rotation + 'deg) translate(33%, -20%)');
            }
            if (rotation == 300) {
                $('#' + curTileId).children().css('transform', 'rotate(' + rotation + 'deg) translate(17%,-30%)');
            }
        }
        else
        //    if (rotation == 120) {
        //        $('#' + curTileId).children().css('transform', 'rotate(' + rotation + 'deg)');
       //         translate (16%,10%);}
        //    if (rotation == 240) {$('#' + curTileId).children().css('transform', 'rotate(' + rotation + 'deg)'); translate (0,0);}
       // } else
        $('#' + curTileId).children().css('transform', 'rotate(' + rotation + 'deg)');
    }

    // function placeLongCatTileBack() {
    //     var place = $('#cat-long').parent();
    //     if (place.hasClass('tile-border')) {
    //         place.css('z-index', 1);
    //     }
    // }

    ////// DRAG&DROP //////
    var dragObject = {};

    document.onmousedown = function(e) {
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

        document.onmousemove = function(e) {
            if (!dragObject.elem) return;

            moveAt(e);
        }

        document.onmouseup = function(e) {
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


    // TODO: Всю клетку с длинными котом z-index - 1


    $('.tile').mouseenter(function() {
        curTileId = $(this).attr('id');
    });
    
    $('.tile').mouseleave(function() {
        curTileId = '';
    });



    setLongCatWidth();
    // setGridPosition();


    // $('.tile').on('dragstart', function(e) {
    //     $(this).css('opacity', '0.5');

    //     e.originalEvent.dataTransfer.effectAllowed = 'move';
    //     e.originalEvent.dataTransfer.setData('text/html', $(this)[0].innerHTML);
    // });

    // $('.tile').on('dragend', function(e) {
    //     $(this).css('opacity', '1');
    // });

    // $('.tile-border').on('dragenter', function(e) {
    //     $(this).addClass('tile-border_active');
    // })

    // $('.tile-border').on('dragleave', function(e) {
    //     $(this).removeClass('tile-border_active');
    // })

    // $('.tile').on('drop', function(e) {
    //     $(this)[0].innerHTML = e.originalEvent.dataTransfer.getData('text/html');
    // })
    $("#back-to-menu").on("click", function(){
        location.href="../html/start_screen.html"
    });

    $('.btn-check').on('click', function() {
        var curRiddleCard = riddleCards[riddleCardId];
        if (Check() == curRiddleCard['codeSequence']) {
            $('.btn-check').css('background-color', 'green');
            completedCards += 1;
            getNextRiddleCard();
            setKittiesOnStartPosition();
        }
        else {
            $('.btn-check').css('background-color', 'red');
        }
        setTimeout(function() {
            $('.btn-check').css('background-color', 'buttonface');
        }, 2000);
    });

});

function setLongCatWidth() {
    var width = $('#cat-black').prop('width');
    $('#cat-long').css('width', width * 1.5);
}


function setGridPosition() {
    $('.tile-grid__row').each(function(index) {
        $(this).css('top', (-14 * index).toString() + 'px');
    })
}

// Начальное время таймера
var sec = 30;
var min = 300;

function refreshTimer()
{
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
}

function Check() {
    var Checkrow = '';
    $(".tile-border").each(function() {
        if ($(this).children(".tile").length == 0) {
            Checkrow += 's';
        } else {
            var tile = $(this).children(".tile")[0];
            switch (tile.id) {
                case 'cat-white':
                    Checkrow += 'w';break;
                case 'cat-orange':
                    Checkrow += 'o';break;
                case 'cat-black':
                    Checkrow += 'b'; break;
                case 'cat-blue':
                    Checkrow += 'f'; break;
                case 'cat-grey':
                    Checkrow += 'g'; break;
                case 'cat-yellow':
                    Checkrow += 'y'; break;
                case 'cat-long':
                    Checkrow += 'l'; break;
            }
        }
    });
    //Массив индексов, которые нам нужно проверить на пустоту
    var CheckMas = [[0,4,9], [1,5,10], [2,7,11], [3,8,12], [0,1,2,3], [9,10,11,12]];
    var ifs = true;
    $(CheckMas).each(function(a) {
        ifs = true;
        $(CheckMas[a]).each(function(c) {
            if (Checkrow[CheckMas[a][c]] != 's') {
                ifs = false;
                // break?
            }
        });
        if (ifs) {
            var b = Checkrow.split("");
            $(CheckMas[a]).each(function (c) {
                b[CheckMas[a][c]] = 'e';
            });
            Checkrow = b.join("");
        }
    });
    Checkrow = Checkrow.replace(/e/g, '');

    Checkrow = getCheckRowWithRotation(Checkrow);

    return Checkrow;
}

// Пулл карточек
var riddleCards = [
    {
        'path': '../pictures/g12656.png',
        'codeSequence': 'b240o240y360sg360f240w120'
    },
    {
        'path': '../pictures/g2016.png',
        'codeSequence': 's'
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
    $('.tile').each(function() {
        $(this).css('position', 'relative');
        base.append($(this));
    });
}

function getTileRotation(id) {
    transfromStr = $('#' + id).children('img').attr('style');
    if (transfromStr == undefined) {
        return 360;
    }
    return parseInt(transfromStr.split('(')[1].split('deg)'));
}

function getCheckRowWithRotation(codeSequence) {
    modifyedCodeSequence = '';
    for (var i = 0; i < codeSequence.length; i++) {
        modifyedCodeSequence += codeSequence[i];
        switch (codeSequence[i]) {
            case 'w':
                modifyedCodeSequence += getTileRotation('cat-white');
                break;
            case 'o':
                modifyedCodeSequence += getTileRotation('cat-orange');
                break;
            case 'b':
                modifyedCodeSequence += getTileRotation('cat-black');
                break;
            case 'f':
                modifyedCodeSequence += getTileRotation('cat-blue');
                break;
            case 'g':
                modifyedCodeSequence += getTileRotation('cat-grey');
                break;
            case 'y':
                modifyedCodeSequence += getTileRotation('cat-yellow');
                break;
            case 'l':
                modifyedCodeSequence += getTileRotation('cat-long');
                break;
        }
    }
    return modifyedCodeSequence;
}