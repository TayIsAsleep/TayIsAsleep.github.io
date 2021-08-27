const image_count = 12;

// Create bg image holder
var bg_image = document.createElement("div");
bg_image.id = "bg-image";
bg_image.style.opacity = "0";


for (let i = 1; i < image_count; i++) {
    let new_image = document.createElement("img");
    
    new_image.src = `./img/bg/bg${i}.jpg`;
    new_image.alt = `bg${i}`;
    new_image.classList.add("bg-image");

    bg_image.appendChild(new_image);
}

document.body.appendChild(bg_image);


var current_bg_image = 1;
var bg_images = $("#bg-image").children();

function next_bg_image(){
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
    while (true){
        await sleep(10000);
        next_bg_image();
    }
}

function loading_done(){
    /* Shuffles the background images and then fades all of them out except for one */
    shuffle(bg_images);
    for (let i=1; i < bg_images.length; i++) {
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

loading_done()