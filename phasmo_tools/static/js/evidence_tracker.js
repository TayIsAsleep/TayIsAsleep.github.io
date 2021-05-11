$(window).resize(function() {
    update_size();
});
$(window).on("load", function(){
    update_size();
    loading_done();
});
