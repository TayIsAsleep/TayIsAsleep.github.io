var evidence_lookup_table = {
    "emf5":{
        "id": "emf5",
        "display_name": "EMF Level 5",
        "found_status": "0",
        "color": "red"
    },
    "orbs":{
        "id": "orbs",
        "display_name": "Ghost Orbs",
        "found_status": "0",
        "color": "green"
    },
    "writing":{
        "id": "writing",
        "display_name": "Ghost Writing",
        "found_status": "0",
        "color": "blue"
    },
    "freezing_temps":{
        "id": "freezing_temps",
        "display_name": "Freezing Temperatures",
        "found_status": "0",
        "color": "orange"
    },
    "spirit_box":{
        "id": "spirit_box",
        "display_name": "Spirit Box",
        "found_status": "0",
        "color": "pink"
    },
    "fingerprints":{
        "id": "fingerprints",
        "display_name": "Fingerprints",
        "found_status": "0",
        "color": "gray"
    },
    "dots":{
        "id": "dots",
        "display_name": "D.O.T.S Projector",
        "found_status": "0",
        "color": "purple"
    }
};

var ghosts_lookup_table = {
    "Shade":[
        "freezing_temps",
        "emf5",
        "writing"
    ],
    "Phantom":[
        "spirit_box",
        "fingerprints",
        "dots"
    ],
    "Jinn":[
        "freezing_temps",
        "emf5",
        "fingerprints"
    ],
    "Yurei":[
        "freezing_temps",
        "orbs",
        "dots"
    ],
    "Mare":[
        "orbs",
        "spirit_box",
        "writing"
    ],
    "Demon":[
        "freezing_temps",
        "writing",
        "fingerprints"
    ],
    "Banshee":[
        "orbs",
        "fingerprints",
        "dots"
    ],
    "Revenant":[
        "freezing_temps",
        "orbs",
        "writing"
    ],
    "Oni":[
        "freezing_temps",
        "emf5",
        "dots"
    ],
    "Poltergeist":[
        "spirit_box",
        "writing",
        "fingerprints"
    ],
    "Spirit":[
        "emf5",
        "spirit_box",
        "writing"
    ],
    "Wraith":[
        "emf5",
        "spirit_box",
        "dots"
    ],

    "Yokai":[
        "spirit_box",
        "orbs",
        "writing"
    ],
    "Hantu":[
        "fingerprints",
        "orbs",
        "writing"
    ],

    "Goryo":[
        "emf5",
        "fingerprints",
        "dots"   
    ],
    "Myling":[
        "emf5",
        "writing",
        "fingerprints"
    ]
};




function get_ghost_status(){
    let to_return = {};

    Object.keys(ghosts_lookup_table).forEach(current_ghost => {

        let this_ghost = {
            "id": current_ghost,
            "can_be": true,
            "evidence_missing": []
        };

        Object.keys(evidence_lookup_table).forEach(current_evidence => {

            let ghost_has_evidence = ghosts_lookup_table[current_ghost].includes(current_evidence);
            let evidence_found_status = evidence_lookup_table[current_evidence]['found_status'];

            if (evidence_found_status == "0" && ghost_has_evidence){
                this_ghost['evidence_missing'].push(current_evidence);
            }
            if ((evidence_found_status == "cant_be" && ghost_has_evidence) ||
                (evidence_found_status == "found" && !ghost_has_evidence)){
                this_ghost['can_be'] = false;
            }
        });

        to_return[current_ghost] = this_ghost;
    });

    return to_return;
}







function update_ghosts_it_could_be_container(){
    let dest = document.querySelector('.ghosts-it-could-be-container');

    dest.innerHTML = ""

    let ghost_data = get_ghost_status();
    Object.keys(ghost_data).forEach(current_ghost => {

        if (ghost_data[current_ghost]['can_be']){

            let div_container = document.createElement("div");

            let a_ghost_name = document.createElement("a");
            a_ghost_name.href = `https://phasmophobia.fandom.com/wiki/${current_ghost}`;
            a_ghost_name.innerHTML = current_ghost;
            
            let p_evidence_missing = document.createElement("p");
            ghost_data[current_ghost]['evidence_missing'].forEach(i => {
                let span_evidence = document.createElement("span");

                span_evidence.innerHTML = evidence_lookup_table[i]['display_name'];
                span_evidence.style.color = evidence_lookup_table[i]['color'];

                p_evidence_missing.appendChild(span_evidence);
            });
    
            div_container.appendChild(a_ghost_name);
            div_container.appendChild(p_evidence_missing);
    
            dest.appendChild(div_container)
        }

    });

}

// update_ghosts_it_could_be_container()




















//#region evidence_tracker
var evidence_found_emf5 = "0",
    evidence_found_orbs = "0",
    evidence_found_writing = "0",
    evidence_found_freezing_temps = "0",
    evidence_found_spirit_box = "0",
    evidence_found_fingerprints = "0",
    evidence_found_dots = "0";
var evidence_lookup = {
    "evidence_found_emf5":"EMF Level 5",
    "evidence_found_orbs":"Ghost Orbs",
    "evidence_found_writing":"Ghost Writing",
    "evidence_found_freezing_temps":"Freezing Temperatures",
    "evidence_found_spirit_box":"Spirit Box",
    "evidence_found_fingerprints":"Fingerprints",
    "evidence_found_dots":"D.O.T.S Projector"
};

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
function update_ghosts(){
    $(".ghosts-it-could-be-container").text(""); /* Reset all text */

    let should_we_make_these_unavable = {
        "EMF Level 5":true,
        "Ghost Orbs":true,
        "Ghost Writing":true,
        "Freezing Temperatures":true,
        "Spirit Box":true,
        "Fingerprints":true,
        "D.O.T.S Projector":true
    };

    let ghosts_it_can_be = [];
    let toAdd = [];
    
    Object.keys(ghosts_evidence).forEach(current_ghost => {
        let i_should_show_up = true;
        let evidence_left = [];
        let my_evidence = ghosts_evidence[current_ghost];

        if ($("#button-ghost-" + current_ghost.toLowerCase()).attr("value") == "1"){
            i_should_show_up = false;
        }

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
            evidence_left.forEach(i => {
                should_we_make_these_unavable[i] = false
            });
            
            let evidenceNeeded = evidence_left.join(", ");

            toAdd.push([current_ghost, evidenceNeeded]);
            ghosts_it_can_be.push(current_ghost);
        }
    });

    if (toAdd.length == 1){
        let new_text_container = document.createElement("p")
        let new_text = document.createElement("p")
        let ghost_link = document.createElement("a")

        ghost_link.target = "_blank"

        if (toAdd[0][1] == ""){
            // appendText(".ghosts-it-could-be-container", `It is a ${toAdd[0][0]}!`);
        
            ghost_link.innerText = toAdd[0][0]
            ghost_link.href = `https://phasmophobia.fandom.com/wiki/${toAdd[0][0]}`
            new_text.innerText = "It is a "

            new_text_container.appendChild(new_text)
            new_text_container.appendChild(ghost_link)

            document.querySelector(".ghosts-it-could-be-container").appendChild(new_text_container)
        }
        else{
            ghost_link.innerText = toAdd[0][0]
            ghost_link.href = `https://phasmophobia.fandom.com/wiki/${toAdd[0][0]}`
            
            new_text.innerText = "It should be a "

            new_text_container.appendChild(new_text)
            new_text_container.appendChild(ghost_link)

            document.querySelector(".ghosts-it-could-be-container").appendChild(new_text_container)

            appendText(".ghosts-it-could-be-container", `Evidence not confirmed yet:`,true);
            appendText(".ghosts-it-could-be-container", toAdd[0][1],true);
        }
    }
    else if (toAdd.length == 0){
        appendText(".ghosts-it-could-be-container", "There is no ghost with that configuration");
    }
    else{
        toAdd.forEach(current => {
            let new_text_container = document.createElement("p")
            let new_text = document.createElement("p")
            let ghost_link = document.createElement("a")

            ghost_link.innerText = current[0]
            ghost_link.href = `https://phasmophobia.fandom.com/wiki/${current[0]}`
            ghost_link.target = "_blank"
            new_text.innerText = " - " + current[1]

            new_text_container.appendChild(ghost_link)
            new_text_container.appendChild(new_text)

            document.querySelector(".ghosts-it-could-be-container").appendChild(new_text_container)
        });
    }

    Array.from($(".ghosts-it-could-be-container p")).forEach(e => {
        $(e).fadeOut(0)
        $(e).fadeIn(200)
    });
    
    /* Update buttons (so that the ones that cant be clicked becomes off) */
    let lookuptablepoopp = {
        "EMF Level 5":"#button-evidence-emf5",
        "Ghost Orbs":"#button-evidence-ghost-orbs",
        "Ghost Writing":"#button-evidence-ghost-writing",
        "Freezing Temperatures":"#button-evidence-freezing-temps",
        "Spirit Box":"#button-evidence-spirit-box",
        "Fingerprints":"#button-evidence-fingerprints",
        "D.O.T.S Projector":"#button-evidence-dots"
    };
    $(".evidence-button").removeClass("button-off");
    Object.keys(should_we_make_these_unavable).forEach(i => {
        if (should_we_make_these_unavable[i] == true){
            let classList = $(lookuptablepoopp[i]).attr('class').split(/\s+/);

            if (!(Array.from(classList).includes("button-found") || Array.from(classList).includes("button-cantbe"))){
                $(lookuptablepoopp[i]).addClass("button-off");
            }
        }
    });

    /* Update buttons (GHOSTS IT CAN NOT BE SELECTOR) (so that the ones that cant be clicked becomes off) */
    $(".button-ghost-cant-be").removeClass("button-off");
    Object.keys(ghosts_evidence).forEach(i => {
        if (!ghosts_it_can_be.includes(i)){
            let this_button = $(`#button-ghost-${i.toLowerCase()}`);

            let classList = this_button.attr('class').split(/\s+/);
            
            if (!(Array.from(classList).includes("button-found") || Array.from(classList).includes("button-cantbe"))){
                this_button.addClass("button-off");
            }
        }
    });
}
function button_evidence_handler(id,rightClick=false){
    let myID = "#" + id;
    let myVariableName = {
        "#button-evidence-emf5":"evidence_found_emf5",
        "#button-evidence-ghost-orbs":"evidence_found_orbs",
        "#button-evidence-ghost-writing":"evidence_found_writing",
        "#button-evidence-freezing-temps":"evidence_found_freezing_temps",
        "#button-evidence-spirit-box":"evidence_found_spirit_box",
        "#button-evidence-fingerprints":"evidence_found_fingerprints",
        "#button-evidence-dots":"evidence_found_dots"
    }[myID];

    if (!Array.from(document.getElementById(id).classList).includes("button-off")){
        $(myID).removeClass("button-off");
        $(myID).removeClass("button-found");
        $(myID).removeClass("button-cantbe");

        if (rightClick){
            if (eval(`${myVariableName}`) == 0){
                $(myID).addClass("button-cantbe");
                eval(`${myVariableName} = "2"`);
                // return;
            }
            else{
                eval(`${myVariableName} = "0"`);
            }
        }
        else{
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
        }

        update_ghosts();
    }
}
$(".evidence-button").on("click", function(){
    
});
$(".evidence-button").mousedown(function(ev){
    button_evidence_handler(this.id, ev.which == 3);
});

$("#button-evidence-reset").on("click", function(){
    evidence_found_emf5 = "0";
    evidence_found_orbs = "0";
    evidence_found_writing = "0";
    evidence_found_freezing_temps = "0";
    evidence_found_spirit_box = "0";
    evidence_found_fingerprints = "0";
    evidence_found_dots = "0";

    $(".button").removeClass("button-off");
    $(".button").removeClass("button-found");
    $(".button").removeClass("button-cantbe");
    $(".button-ghost-cant-be").attr("value","0");

    update_ghosts();
});
$(".button-ghost-cant-be").on("click", function(){
    let me = $(`#${this.id}`);

    if (me.attr("value") == "1"){
        me.attr("value","0");
        me.removeClass("button-cantbe")
    }
    else{
        me.attr("value","1");
        me.addClass("button-cantbe")
    }

    update_ghosts();
});
//#endregion

// $(window).resize(function() {
//     update_size();
// });
$(window).on("load", function(){
    //#region Evidence Tracker
    update_ghosts();

    $(".ghosts-it-could-be-container").width($(".ghosts-it-could-be-container").width());

    $(".ghosts-it-could-be-container").height($(".ghosts-it-could-be-container").height());

    $(".main-content").width($(".ghosts-cant-be").width());
    // $(".ghosts-cant-be").width($(".ghosts-it-could-be-container").width() + $(".evidence-buttons").width())

    // update_size();
    //#endregion

    //Disables rightclicking on evidence buttons
    window.oncontextmenu = function (ev)
    {
        let a = $(".evidence-buttons").children();
        let b = ev['path'];
        let c = false;

        Array.from(a).forEach(i => {
            if (b.includes(i)){
                c = true;
            }
        })
        return !c;
    }

    // loading_done();

});

