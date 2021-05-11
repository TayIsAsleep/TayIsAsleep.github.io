var evidence_found_emf5 = "0",
    evidence_found_orbs = "0",
    evidence_found_writing = "0",
    evidence_found_freezing_temps = "0",
    evidence_found_spirit_box = "0",
    evidence_found_fingerprints = "0";

var ghosts_evidence = {
    "Shade":[
        "evidence_found_emf5",
        "evidence_found_orbs",
        "evidence_found_writing"
    ],
    "Phantom":[
        "evidence_found_emf5",
        "evidence_found_orbs",
        "evidence_found_freezing_temps"
    ],
    "Jinn":[
        "evidence_found_emf5",
        "evidence_found_orbs",
        "evidence_found_spirit_box"
    ],
    "Yurei":[
        "evidence_found_freezing_temps",
        "evidence_found_orbs",
        "evidence_found_writing"
    ],
    "Mare":[
        "evidence_found_freezing_temps",
        "evidence_found_orbs",
        "evidence_found_spirit_box"
    ],
    "Demon":[
        "evidence_found_freezing_temps",
        "evidence_found_spirit_box",
        "evidence_found_writing"
    ],
    "Banshee":[
        "evidence_found_emf5",
        "evidence_found_freezing_temps",
        "evidence_found_fingerprints"
    ],
    "Revenant":[
        "evidence_found_emf5",
        "evidence_found_fingerprints",
        "evidence_found_writing"
    ],
    "Oni":[
        "evidence_found_emf5",
        "evidence_found_spirit_box",
        "evidence_found_writing"
    ],
    "Poltergeist":[
        "evidence_found_fingerprints",
        "evidence_found_orbs",
        "evidence_found_spirit_box"
    ],
    "Spirit":[
        "evidence_found_spirit_box",
        "evidence_found_fingerprints",
        "evidence_found_writing"
    ],
    "Wraith":[
        "evidence_found_freezing_temps",
        "evidence_found_spirit_box",
        "evidence_found_fingerprints"
    ],
};

var evidence_lookup = {
    "evidence_found_emf5":"EMF Level 5",
    "evidence_found_orbs":"Ghost Orbs",
    "evidence_found_writing":"Ghost Writing",
    "evidence_found_freezing_temps":"Freezing Temperatures",
    "evidence_found_spirit_box":"Spirit Box",
    "evidence_found_fingerprints":"Fingerprints"
};

function appendText(location,text) {
    let a = $(location).append($('<p class="new-text"></p>').text(text));
    a = a.children();
    a = $(a[a.length - 1]);
    a.fadeOut(0);
    a.fadeIn(200)
    return a;
}


function update_ghosts(){
    $(".ghosts-it-could-be-container").text(""); /* Reset all text */

    let thereIsSomeGhost = false;

    Object.keys(ghosts_evidence).forEach(current_ghost => {
        let i_should_show_up = true;
        let evidence_left = [];
        let my_evidence = ghosts_evidence[current_ghost];

        Object.keys(evidence_lookup).forEach(evidence_variable_name => {
            if (!my_evidence.includes(evidence_variable_name) && eval(evidence_variable_name) == "1"){
                i_should_show_up = false;
            }
        });

        my_evidence.forEach(current_evidence => {
            if (eval(current_evidence) == "2"){
                i_should_show_up = false;
            }
            if (eval(current_evidence) == "0"){
                evidence_left.push(evidence_lookup[current_evidence])
            }
        });

        if (i_should_show_up){
            thereIsSomeGhost = true;
            let evidenceNeeded = evidence_left.join(", ");

            if (evidenceNeeded == ""){
                appendText(".ghosts-it-could-be-container", `It is a ${current_ghost}!`);
            }
            else{
                appendText(".ghosts-it-could-be-container", `${current_ghost} - ${evidenceNeeded}`);
            }
        }
    });

    if (!thereIsSomeGhost){
        appendText(".ghosts-it-could-be-container","No ghost with that configuration")
    }
}

function button_evidence_handler(id){
    let myID = "#" + id;
    let myVariableName = {
        "#button-evidence-emf5":"evidence_found_emf5",
        "#button-evidence-ghost-orbs":"evidence_found_orbs",
        "#button-evidence-ghost-writing":"evidence_found_writing",
        "#button-evidence-freezing-temps":"evidence_found_freezing_temps",
        "#button-evidence-spirit-box":"evidence_found_spirit_box",
        "#button-evidence-fingerprints":"evidence_found_fingerprints",
    }[myID];

    $(myID).removeClass("button-off");
    $(myID).removeClass("button-found");
    $(myID).removeClass("button-cantbe");

    if (eval(myVariableName) == "0"){
        $(myID).addClass("button-found");
        eval(`${myVariableName} = "1"`);
    }
    else if (eval(myVariableName) == "1"){
        $(myID).addClass("button-cantbe");
        eval(`${myVariableName} = "2"`);
    }
    else{
        eval(`${myVariableName} = "0"`);
    }

    update_ghosts();
}

$("#button-evidence-emf5").on("click", function(){
    button_evidence_handler(this.id);
});
$("#button-evidence-ghost-orbs").on("click", function(){
    button_evidence_handler(this.id);
});
$("#button-evidence-ghost-writing").on("click", function(){
    button_evidence_handler(this.id);
});
$("#button-evidence-freezing-temps").on("click", function(){
    button_evidence_handler(this.id);
});
$("#button-evidence-spirit-box").on("click", function(){
    button_evidence_handler(this.id);
});
$("#button-evidence-fingerprints").on("click", function(){
    button_evidence_handler(this.id);
});

$("#button-evidence-reset").on("click", function(){
    evidence_found_emf5 = "0";
    evidence_found_orbs = "0";
    evidence_found_writing = "0";
    evidence_found_freezing_temps = "0";
    evidence_found_spirit_box = "0";
    evidence_found_fingerprints = "0";
    update_ghosts();

    $(".evidence-button").removeClass("button-off");
    $(".evidence-button").removeClass("button-found");
    $(".evidence-button").removeClass("button-cantbe");

});

$(window).resize(function() {
    update_size();
});
$(window).on("load", function(){
    update_ghosts();
    
    $(".ghosts-it-could-be-container").width($(".ghosts-it-could-be-container").width())

    $(".ghosts-it-could-be-container").height($(".evidence-buttons").height() - 23)
    

    update_size();
    loading_done();
});
