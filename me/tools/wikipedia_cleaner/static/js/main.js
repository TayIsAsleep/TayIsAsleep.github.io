
$('#button-cleanup').click(function() {
    let re = new RegExp('\\[.*?]', 'g');

    var text = $('#text-input').val();

    text = text.replaceAll(re, '')


    $('#text-input').val(text);
});


$(window).on("load", function(){
    $(".loader").fadeOut(600);
    $(".main-container").css("opacity","100");
});
