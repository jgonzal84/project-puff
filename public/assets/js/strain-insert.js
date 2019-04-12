$('form').submit(function (weed) {
    weed.preventDefault();

    var sn = $("input[name='strain_name']").val();

    $.ajax({
        url: '/strain-insert',
        method: "GET",
        data: { strain_name: sn }
    }).then(function (message) {
        getStrains();
    });
});