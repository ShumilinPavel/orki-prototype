$(document).ready(function() {
    var curElement = "";


    $(document).on("keydown", function(e) {
        if (curElement == "") {
            return;
        }

        Rotate(e.keyCode);
    });
    

    function Rotate(keyCode) {
        var rotation = 0;

        var elem = $("#" + curElement)[0];
        var str = elem.style.transform;
        
        if (str != "") {
            rotation = parseInt(str.split('(')[1].split('deg)'));
        }

        // A и стрелка влево
        if (keyCode == 65 || keyCode == 37) {
            rotation -= 90;
            if (rotation < 0) {
                rotation += 360;
            }
        }
        
        // D и стрелка вправо
        if (keyCode == 68 || keyCode == 39) {
            rotation += 90;
            if (rotation > 360) {
                rotation -= 360;
            }
        }

        $("#" + curElement).css("transform", "rotate(" + rotation + "deg)");
    }


    $(".tile").mouseenter(function() {
        curElement = $(this).attr("id");
    });
    

    $(".tile").mouseleave(function() {
        curElement = "";
    });


    $(".tile").each(function() {
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

});

function setLongCatWidth() {
    var width = $("#cat-orange").prop("width");
    $("#cat-long").css("width", width * 1.5);
}



// window.onload = function() {
//     var tile = document.getElementById('cat1');

//     tile.onmousedown = function(e) { 
//         var coords = getCoords(tile);
//         var shiftX = e.pageX - coords.left;
//         var shiftY = e.pageY - coords.top;

//       tile.style.position = 'absolute';
//       moveAt(e);
//       document.body.appendChild(tile);

//       tile.style.zIndex = 1000;

//       function moveAt(e) {
//             tile.style.left = e.pageX - shiftX + 'px';
//             tile.style.top = e.pageY - shiftY + 'px';
//       }

//       document.onmousemove = function(e) {
//         moveAt(e);
//       }

//       tile.onmouseup = function() {
//         document.onmousemove = null;
//         tile.onmouseup = null;
//       }
//     }

//     tile.ondragstart = function() {
//         return false;
//     };

//     function getCoords(elem) {   // кроме IE8-
//       var box = elem.getBoundingClientRect();
//       return {
//         top: box.top + pageYOffset,
//         left: box.left + pageXOffset
//       };
//     }
// }

 
