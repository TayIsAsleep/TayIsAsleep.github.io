var evidence_lookup_table = {
    "emf5":{
        "display_name": "EMF Level 5"
    },
    "orbs":{
        "display_name": "Ghost Orbs"
    },
    "writing":{
        "display_name": "Ghost Writing"
    },
    "freezing_temps":{
        "display_name": "Freezing Temperatures"
    },
    "spirit_box":{
        "display_name": "Spirit Box"
    },
    "fingerprints":{
        "display_name": "Fingerprints"
    },
    "dots":{
        "display_name": "D.O.T.S Projector"
    }
};
Object.keys(evidence_lookup_table).forEach(i => {
    evidence_lookup_table[i] = {
        "id": i,
        "display_name": evidence_lookup_table[i]['display_name'],
        "found_status": "0"
    }
});

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
        "freezing_temps"
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
Object.keys(ghosts_lookup_table).forEach(i => {
    ghosts_lookup_table[i] = {
        "id": i,
        "found_status": "0",
        "evidence": ghosts_lookup_table[i]
    }
});


// returns the current status of all the ghosts in raw data
function get_ghost_status(){
    let to_return = {};

    Object.keys(ghosts_lookup_table).forEach(current_ghost => {

        let this_ghost = {
            "id": current_ghost,
            "can_be": true,
            "evidence_missing": []
        };

        Object.keys(evidence_lookup_table).forEach(current_evidence => {

            let ghost_has_evidence = ghosts_lookup_table[current_ghost]['evidence'].includes(current_evidence);
            let evidence_found_status = evidence_lookup_table[current_evidence]['found_status'];

            if (evidence_found_status == "0" && ghost_has_evidence){
                this_ghost['evidence_missing'].push(current_evidence);
            }
            if ((evidence_found_status == "cant_be" && ghost_has_evidence) ||
                (evidence_found_status == "found" && !ghost_has_evidence)){
                this_ghost['can_be'] = false;
            }
        });

        if (ghosts_lookup_table[current_ghost]['found_status'] == "cant_be"){
            this_ghost['can_be'] = false;
        }

        to_return[current_ghost] = this_ghost;
    });

    return to_return;
};
function update_ghosts_it_could_be_container(){
    let dest = document.querySelector('.ghosts-it-could-be-container');

    dest.innerHTML = "";
    let to_print = {};

    let ghost_data = get_ghost_status();

    let ghosts_it_can_be_count = 0;
    Object.keys(ghost_data).forEach(i => {
        let ghost_button = document.querySelector(`[id="button-ghost-${i.toLowerCase()}"]`);
        let classList = $(ghost_button).attr('class').split(/\s+/);

        if (ghost_data[i]['can_be']){
            ghost_button.classList.remove("button-off")
            ghosts_it_can_be_count += 1;
        }
        else if (!(Array.from(classList).includes("button-found") || Array.from(classList).includes("button-cantbe"))){
                ghost_button.classList.add("button-off")
        }
    });


    let evidence_it_can_be = {};
    Object.keys(evidence_lookup_table).forEach(i => {
        evidence_it_can_be[i] = false;
    });

    if (ghosts_it_can_be_count == 1){
        Object.keys(ghost_data).forEach(current_ghost_id => {
            if (ghost_data[current_ghost_id]['can_be']){
                let p_entry = document.createElement("p");

                if (ghost_data[current_ghost_id]['evidence_missing'].length == 0){
                    p_entry.innerHTML = `It is a <a href="https://phasmophobia.fandom.com/wiki/${current_ghost_id}" taget="_blank">${current_ghost_id}</a>!`
                }
                else{
                    p_entry.innerHTML = `It should be a <a href="https://phasmophobia.fandom.com/wiki/${current_ghost_id}" taget="_blank">${current_ghost_id}</a><br><br>Evidence missing: `
    
                    ghost_data[current_ghost_id]['evidence_missing'].forEach(i => {
                        p_entry.innerHTML += evidence_lookup_table[i]['display_name'] + ", "
                        evidence_it_can_be[i] = true;
                    });

                    p_entry.innerHTML = p_entry.innerHTML.substring(0, p_entry.innerHTML.length - 2)
                }

                to_print[p_entry.innerHTML] = p_entry;
                // dest.appendChild(p_entry)
            }
        });
    }
    else if (ghosts_it_can_be_count == 0){
        dest.innerHTML = "There is no ghost with that configuration";
    }
    else{
        Object.keys(ghost_data).forEach(current_ghost_id => {
            if (ghost_data[current_ghost_id]['can_be']){
                let p_entry = document.createElement("p");
    
                p_entry.innerHTML = `<a href="https://phasmophobia.fandom.com/wiki/${current_ghost_id}" taget="_blank">${current_ghost_id}</a> - `
    
                ghost_data[current_ghost_id]['evidence_missing'].forEach(i => {
                    p_entry.innerHTML += evidence_lookup_table[i]['display_name'] + ", "
                    evidence_it_can_be[i] = true;
                });

                p_entry.innerHTML = p_entry.innerHTML.substring(0, p_entry.innerHTML.length - 2)
                
                to_print[p_entry.innerHTML] = p_entry;
                // dest.appendChild(p_entry)
            };
        });
    };

    Object.keys(evidence_it_can_be).forEach(i => {
        let current_button = document.querySelector(`[evidence-id="${i}"]`);

        current_button.classList.remove("button-off")

        if (!evidence_it_can_be[i]){
            let classList = $(current_button).attr('class').split(/\s+/);
            if (!(Array.from(classList).includes("button-found") || Array.from(classList).includes("button-cantbe"))){
                current_button.classList.add("button-off")
            }
        }
    });

    Object.keys(to_print).sort().forEach(i => {
        dest.appendChild(to_print[i])
    })
};
function init(){
    let dest = null;
    //#region generate_evidence_buttons
    dest = document.getElementsByClassName("evidence-buttons")[0];

    Object.keys(evidence_lookup_table).forEach(i => {
        let new_button = document.createElement("div");
        let new_button_text = document.createElement("p");
        
        new_button_text.innerHTML = evidence_lookup_table[i]["display_name"];

        new_button.appendChild(new_button_text);
        new_button.classList.add("button", "evidence-button");
        new_button.setAttribute("evidence-id", i)
        new_button.id = `button-evidence-${i}`;

        dest.appendChild(new_button);
    });

    let new_button = document.createElement("div");
    let new_button_text = document.createElement("p");
    new_button.id = "button-evidence-reset";
    new_button.classList.add("button")
    new_button_text.innerHTML = "Reset";
    new_button.appendChild(new_button_text);
    dest.appendChild(new_button);
    //#endregion
    //#region generate_ghosts_cant_be
    dest = document.getElementsByClassName("ghosts-cant-be")[0];
    
    Object.keys(ghosts_lookup_table).sort().forEach(i => {
        let new_button = document.createElement("div");
        let new_button_text = document.createElement("p");

        new_button_text.innerHTML = i;

        new_button.appendChild(new_button_text);
        new_button.classList.add("button", "button-ghost-cant-be");
        new_button.id = `button-ghost-${i.toLowerCase()}`;

        dest.appendChild(new_button);
    });
    //#endregion

    //Disables rightclicking on evidence buttons
    window.oncontextmenu = function (ev){   
        let c = false;
        Array.from($(".evidence-buttons").children()).forEach(i => {
            if (ev['path'].includes(i)){
                c = true;
            };
        });
        return !c;
    }

    update_ghosts_it_could_be_container();

    $(".ghosts-it-could-be-container").width($(".ghosts-it-could-be-container").width());
    $(".ghosts-it-could-be-container").height($(".ghosts-it-could-be-container").height());

    $(".main-content").width($(".ghosts-cant-be").width());  
};

$(window).on("load", function(){
    init();

    $(".button-ghost-cant-be").on("click", function(){
        let me = ghosts_lookup_table[document.querySelector(`#${this.id} > p`).innerHTML];
        
        if (me["found_status"] == "cant_be"){
            me["found_status"] = "0"
            
            this.classList.remove("button-cantbe")
        }
        else{
            me["found_status"] = "cant_be"
            this.classList.add("button-cantbe")
        }
    
        update_ghosts_it_could_be_container();
    });
    $(".evidence-button").mousedown(function(ev){
        console.log("test")
    
        let this_evidence_object = evidence_lookup_table[this.getAttribute("evidence-id")];
    
        if (Array.from(this.classList).includes("button-off")){return;};
    
        this.classList.remove("button-off");
        this.classList.remove("button-found");
        this.classList.remove("button-cantbe");
    
        if (ev.which == 3){ // If rightclick
            if (this_evidence_object.found_status == "0"){
                this.classList.add("button-cantbe");
                this_evidence_object.found_status = "cant_be"
            }
            else{
                this_evidence_object.found_status = "0"
            }
        }
        else{ // If leftclick
            if (this_evidence_object.found_status == "0"){
                this.classList.add("button-found");
                this_evidence_object.found_status = "found"
            }
            else if (this_evidence_object.found_status == "found"){
                this.classList.add("button-cantbe");
                this_evidence_object.found_status = "cant_be"
            }
            else{
                this_evidence_object.found_status = "0"
            }
        }
    
        update_ghosts_it_could_be_container()
    });
    $("#button-evidence-reset").on("click", function(){
        Object.keys(evidence_lookup_table).forEach(i => {
            evidence_lookup_table[i]['found_status'] = "0";
        })
        Object.keys(ghosts_lookup_table).forEach(i => {
            ghosts_lookup_table[i]['found_status'] = "0";
        })
    
        $(".button").removeClass("button-off");
        $(".button").removeClass("button-found");
        $(".button").removeClass("button-cantbe");
    
        update_ghosts_it_could_be_container();
    });
    
});
