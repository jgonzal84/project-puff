function getStrains() {
    $('div').empty();

    $.ajax({
        url: '/strain',
        method: 'GET'
    }).then(function (strains) {
        for (var strainIndex in strains) {

            var p = $('<p>');

            p.text(`ID: ${strains[strainIndex].id}, Strain Name: ${strains[strainIndex].strain_name}`)

            $('div').append(p);
        }
    })
}