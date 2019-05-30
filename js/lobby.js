$(document).ready(function() {
    readyClickHandler();
});

function readyClickHandler() {
    $('.player__status').each(function() {
        $(this).on('click', function() {
            var id = $(this).parent().attr('id').split('-')[1];
            var data = {'id': id};
            var jquery_btn = $(this);
            $.ajax({
                type: 'POST',
                url: 'setReady.php',
                data: data,
                success: function(data) {
                    data = JSON.parse(data);
                    console.log(data['msg']);
                    if (data['success']) {
                        colorizeReadyBtn(jquery_btn);
                    }
                },
                error: function() {
                    console.log('Ошибка ajax запроса');
                }
            });
        });
    });
}

function colorizeReadyBtn(jquery_obj) {
    jquery_obj.css('background-color', 'green');
}