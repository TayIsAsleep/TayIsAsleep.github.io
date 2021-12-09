var e_lookup = {
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
var e_id_lookup = [];
Object.keys(e_lookup).forEach(i => {
    e_id_lookup.push(i);

    e_lookup[i] = {
        "id": i,
        "display_name": e_lookup[i]['display_name'],
        "found_status": "0"
    };
});

var g_lookup = {
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
        "dots"
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
    ],

    "The Twins":[
        "emf5",
        "spirit_box",
        "freezing_temps"
    ],
    "Raiju":[
        "emf5",
        "orbs",
        "dots"
    ],
    "Onryo":[
        "spirit_box",
        "orbs",
        "freezing_temps"
    ],
    "Obake":[
        "emf5",
        "fingerprints",
        "orbs"
    ]
};
var g_id_lookup = [];
Object.keys(g_lookup).forEach(i => {
    let new_id = i.replaceAll(" ", "_").toLowerCase();

    g_id_lookup.push(new_id);

    g_lookup[new_id] = {
        "id": new_id,
        "display_name": i,
        "found_status": "0",
        "evidence": g_lookup[i]
    };

    delete g_lookup[i];
});


function get_ghost_status(){
    /**
     * c = current
     * g = ghost
     * e = evidence 
     */

    let to_return = {};

    g_id_lookup.forEach(c_g_id => {
        let this_ghost = {
            "id": c_g_id,
            "can_be": true,
            "evidence_missing": [],
            "evidence_has_found": []
        };

        e_id_lookup.forEach(c_e_id => {
            let c_g_has_c_e = g_lookup[c_g_id]['evidence'].includes(c_e_id);
            let c_e_found_status = e_lookup[c_e_id]['found_status'];
            
            if (c_e_found_status == "0" && c_g_has_c_e){
                this_ghost['evidence_missing'].push(c_e_id);
            }
            else if (c_e_found_status == "found" && c_g_has_c_e){
                this_ghost['evidence_has_found'].push(c_e_id)
            }

            if ((c_e_found_status == "cant_be" && c_g_has_c_e) ||
                (c_e_found_status == "found" && !c_g_has_c_e)){
                this_ghost['can_be'] = false;
            }
        });

        if (g_lookup[c_g_id]['found_status'] == "cant_be"){
            this_ghost['can_be'] = false;
        }

        to_return[c_g_id] = this_ghost;
    });

    return to_return;
}




function create_element(tag, attr){
    let e = document.createElement(tag);

    Object.keys(attr).forEach(key => {
        if (key == "children" && Array.isArray(attr[key])){
            attr[key].forEach(child_2_append => {
                e.appendChild(child_2_append);
            });
        }
        else{
            if (eval(`e.${key}`) == undefined){
                e.setAttribute(key, attr[key]);
            }
            else{
                eval(`e.${key} = attr[key]`);
            }
        }
    });

    return e;
}


function update_ghost_status_display(){
    let ghost_status = get_ghost_status();

    g_id_lookup.forEach(current_ghost => {
        current_ghost = ghost_status[current_ghost];

        if (current_ghost['can_be']){
            let missing_evidence_children = []

            current_ghost['evidence_missing'].forEach(e => {
                missing_evidence_children.push(
                    create_element("span", {
                        class:"ghost-evidence-missing",
                        innerText:e_lookup[e]['display_name']
                    })
                );
                

            });

            document.querySelector(".ghost-status-container").appendChild(
                create_element("div", {"children":[
                    create_element("span", {class:"ghost-name", innerText:current_ghost['id']}),
                    create_element("span", {class:"ghost-status-text", innerText:" | "}),
                    create_element("span", {class:"missing-evidence", "children": missing_evidence_children})

                ]})
            );
        }
    });
}

// e_lookup['emf5']['found_status'] = "found";

console.log(get_ghost_status());

update_ghost_status_display()