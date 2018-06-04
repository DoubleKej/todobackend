
$(document).ready(function () {
    var currentItem = '';
    var inputValue = '';
    console.log('ahihi');
    $('form').on('submit', function () {
        var item = $('form input');
        var todo = { name: item.val() };
        console.log('my data' + todo);
        $.ajax({
            type: 'POST',
            url: '/',
            data: todo,
            success: function (data) {
                //
                location.reload();
            }
        });
        // console.log('my data after' + data);
        return false;
    });

    $('.delete').on('click', function () {
        var item = $(this).attr('id');
        console.log(item)
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "http://localhost:8000/" + item,
            "method": "DELETE"
        }
        $.ajax(settings).done(function (response) {
            console.log(response);
            location.reload();
        });
    });

    $('.edit-modal').on('click', function () {
        currentItem = $(this).attr('id');
    })

    $('edit-input').on('change', function () {

    })

    $('.edit').on('click', function () {
        // var item = $(this).attr('id');
        console.log('item id', currentItem);
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "http://localhost:8000/edit/" + currentItem,
            "method": "PUT",
            "data": {
                name: $('.edit-input').val()
            }
        }

        $.ajax(settings).done(function (response) {
            console.log(response);
            location.reload()
        });
    });

    $('.checkbox').on('click', function () {


        currentItem = $(this).attr('id');

        if ($(this).is(':checked')) {
            status = true
        } else { status = false; }
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "http://localhost:8000/check/" + currentItem,
            "method": "PUT",
            "data": {
                status,
            }
        }

        $.ajax(settings).done(function (response) {
            console.log(response);
        });

    });



});