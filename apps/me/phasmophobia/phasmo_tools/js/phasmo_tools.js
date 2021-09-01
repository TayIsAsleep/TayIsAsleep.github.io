function appendText(location,text,dont_fade_in=false) {
    let a = $(location).append($('<p class="new-text"></p>').text(text));
    a = a.children();
    a = $(a[a.length - 1]);
    a.fadeOut(0);
    if (!dont_fade_in){
        a.fadeIn(200)
    }
    return a;
}

$(window).on("load", function(){
    $(".tool").css("display","none"); // Hides all tools by default

    let url_params = new URLSearchParams(window.location.search);
    let initial_app = url_params.get('app');
    let options = {
        "evidence_tracker":[
            ".tool-evidence-tracker","Evidence Tracker"
        ],
        "item_randomizer":[
            ".tool-item-randomizer","Item Randomizer"
        ],
        "challange_randomizer":[
            ".tool-challange-randomizer", "Challange Randomizer"
        ]
    }
    if (Object.keys(options).includes(initial_app)){
        initial_app = options[initial_app];
    }
    else{
        initial_app = [".tool-selector","Phasmophobia Tools"];
    }
    $(initial_app[0]).css("display","inline"); // Only shows the selected
    document.title = initial_app[1];


    if (initial_app[1] == "Evidence Tracker"){
        update_ghosts_it_could_be_container()

        $(".ghosts-it-could-be-container").width($(".ghosts-it-could-be-container").width());
        $(".ghosts-it-could-be-container").height($(".ghosts-it-could-be-container").height());
    
        $(".main-content").width($(".ghosts-cant-be").width());
        // // $(".ghosts-cant-be").width($(".ghosts-it-could-be-container").width() + $(".evidence-buttons").width())
        
    }
    else if (initial_app[1] == "Item Randomizer"){
        reset();

        checkCheckBoxes();
    
        $("#reset-button").addClass("button-off");
    }
    else{
        // pass
    }


    /* Fades out the loader (loading screen) */
    setInterval(function(){
        $(".loader").fadeOut(600);
        $(".main-container").css("opacity","100");
    }, 0);
});
