$(document).ready(function() {
    var curTileId = '';


    ////// ROTATION //////
    $(document).on('keydown', function(e) {
        if (curTileId == '') {
            return;
        }

        Rotate(e.keyCode);
    });

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
            if (rotation > 360) {
                rotation -= 360;
            }
        }
        
        $('#' + curTileId).children().css('transform', 'rotate(' + rotation + 'deg)');
    }


    ////// DRAG&DROP //////
    $('.tile').mouseenter(function() {
        curTileId = $(this).attr('id');
    });
    
    $('.tile').mouseleave(function() {
        curTileId = '';
    });

    $('.tile').each(function() {
        $(this).mousedown(function(e) {
            var tile = $(this)[0];

            var coords = getCoords(tile);
            var shiftX = e.pageX - coords.left;
            var shiftY = e.pageY - coords.top;

            tile.style.position = 'absolute';
            moveAt(e);
            document.body.appendChild(tile);

            tile.style.zIndex = 1000;

            function moveAt(e) {
                tile.style.left = e.pageX - shiftX + 'px';
                tile.style.top = e.pageY - shiftY + 'px';
            }

            document.onmousemove = function(e) {
                moveAt(e);
            }

            tile.onmouseup = function() {
                document.onmousemove = null;
                tile.onmouseup = null;
            }

            tile.ondragstart = function() {
                return false;
            };

            function getCoords(elem) {   // кроме IE8-
                var box = elem.getBoundingClientRect();
                return {
                    top: box.top + pageYOffset,
                    left: box.left + pageXOffset
                };
            };
        })
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



 
