$(document).ready(function() {
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

var sec=21;
// выставляем минуты
var min=10;

function refresh()
{
    sec--;
    if(sec==-01){sec=59; min=min-1;}
    //else{min=min;}
    if(sec<=9){sec="0" + sec;}
    time=(min<=9 ? "0"+min : min) + ":" + sec;
    if(document.getElementById){timer.innerHTML=time;}
    inter=setTimeout("refresh()", 1000);
    // действие, если таймер 00:00
    if(min=='00' && sec=='00'){
        sec="00";
        clearInterval(inter);
        /* выводим сообщение в элемент с id="tut", например <div id="tut"></div> */
        /* либо любой другой Ваш код */
        $('#aboutModal').modal({
            backdrop: 'static',
            keyboard: false
        });
        $("#aboutModal").modal('show');
    }
}