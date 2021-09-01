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

    /* Fades out the loader (loading screen) */
    setInterval(function(){
        $(".loader").fadeOut(600);
        $(".main-container").css("opacity","100");
    }, 0);
});
