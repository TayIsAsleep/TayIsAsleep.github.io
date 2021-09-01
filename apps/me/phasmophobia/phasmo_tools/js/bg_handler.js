const bg_image_count = 13;
const bg_fade_time_ms = 3000;
const bg_wait_time_s = 10;

async function bg_handler_start(){
    // Create bg image holder
    var bg_image = document.createElement("div");
    bg_image.id = "bg-image";

    // Create background images
    for (let i = 1; i <= bg_image_count; i++) {
        let new_image = document.createElement("img");
        
        new_image.src = `./img/bg/bg${i}.jpg`;
        new_image.alt = `background image nr ${i}`;
        new_image.classList.add("bg-image");

        bg_image.appendChild(new_image);
    }
    document.body.appendChild(bg_image);


    let current_bg_index = 1;
    let bg_images = $("#bg-image").children();

    /* Shuffles the background images and then fades all of them out except for one */
    shuffle(bg_images);
    for (let i=1; i < bg_images.length; i++) {
        $(bg_images[i]).fadeOut(0);
    }

    // Main Loop
    while (true){
        await sleep(bg_wait_time_s * 1000);

        // Checks if user is tabbed in to the tab or not
        if (!document.hidden){
            // Fade out old BG...
            $(bg_images[current_bg_index-1]).fadeOut(bg_fade_time_ms);

            // Check if we ran out of the list, and if so, it shuffles the list again and resets the index
            if (current_bg_index >= bg_images.length){
                current_bg_index = 0;
                shuffle(bg_images);
            }

            $(bg_images[current_bg_index]).fadeIn(bg_fade_time_ms);
            current_bg_index += 1;
        }
    }
}

/* Starts going through all the background images */
bg_handler_start();
