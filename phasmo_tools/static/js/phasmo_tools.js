var current_bg_image = 1;
var bg_images = $("#bg-image").children();

function next_bg_image(){
    console.log("next_bg_image() was ran")
    if (!bg_images[current_bg_image]){
        $(bg_images[current_bg_image-1]).fadeOut(3000);
        current_bg_image = 0;
        shuffle(bg_images);
    }
    else{
        $(bg_images[current_bg_image-1]).fadeOut(3000);
    }
    $(bg_images[current_bg_image]).fadeIn(3000);
    current_bg_image += 1;
}      
async function run_bg_updater(){
    console.log("run_bg_updater() started")
    while (true){
        await sleep(10000);
        next_bg_image();
    }
}

function loading_done(){
    /* Shuffles the background images and then fades all of them out except for one */
    shuffle(bg_images);
    for (let i=1;i<bg_images.length;i++) {
        $(bg_images[i]).fadeOut(0);
    }

    /* Fades out the loader (loading screen) */
    setInterval(function(){
        $(".loader").fadeOut(600);
        $(".main-container").css("opacity","100");
        $("#bg-image").css("opacity","100")
    }, 0);

    /* Starts going through all the background images */
    run_bg_updater();
};

function update_size(){
    // $(".output-field").height($(".selection-field").height());

    let a = ($(window).width() - $(".main-container").width()) / 2
    $(".main-container").css({"left":a,"right":a})
};
