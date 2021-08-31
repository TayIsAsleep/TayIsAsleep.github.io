//#region phasmo_tools
var current_bg_image = 1;
var bg_images = $("#bg-image").children();

function next_bg_image(){
    // console.log("next_bg_image() was ran")
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
    // console.log("run_bg_updater() started")
    while (true){
        await sleep(10000);
        if (!document.hidden){
            next_bg_image();
        }
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
    return;
    // $(".output-field").height($(".selection-field").height());

    let a = ($(window).width() - $(".main-container").width()) / 2
    $(".main-container").css({"left":a,"right":a})
};
//#endregion
//#region item_randomizer
var inPool = [];

function make_all_options(a){
    inPool = [];
    $(".output-field-text").html("");
    let arrayForCookies = [];
    $(".item-option").each(function(i,elem){
        elem.checked = a;
        arrayForCookies.push(a ? "1" : "0");
    });
    createCookie("checked",arrayForCookies,365)
    $(".item-option").children().length
};
function generatePool(){
    inPool = [];
    $(".item-option").each(function(i,elem){
        if (elem.checked){
            inPool.push(elem.id);
        };
    });
    inPool = inPool.sort(() => Math.random() - 0.5);
}
function reset(){
    $(".new-text").fadeOut(250,function(){
        $(".output-field").html("");
    });
    $("#reset-button").addClass("button-off");
    $("#draw-item-button").removeClass("button-off");
    $("#draw-all-button").removeClass("button-off");

    generatePool();
}
function drawItem(){
    if (inPool.length == 0){
        return -1;
    }
    $("#reset-button").removeClass("button-off")
    
    let item = $(`#${inPool.pop()}`).attr("displayName");
    appendText(".output-field",item)

    if (inPool.length == 0){
        $("#draw-all-button").addClass("button-off")
        $("#draw-item-button").addClass("button-off")
    }
    else{
        $("#draw-item-button").removeClass("button-off")
        $("#draw-all-button").removeClass("button-off")
    }
};
function checkCheckBoxes(){
    let allIsOn = true;
    let allIsOff = true;

    let arrayForCookies = [];
    $(".item-option").each(function(i,elem){
        if (elem.checked){
            allIsOff = false;
        }
        else{
            allIsOn = false;
        }
        arrayForCookies.push(elem.checked ? "1" : "0");
    });

    createCookie("checked",arrayForCookies,365)

    if (allIsOn){
        $("#select-all-button").addClass("button-off");
    }
    else{
        $("#select-all-button").removeClass("button-off");
    }
    if (allIsOff){
        $("#deselect-all-button").addClass("button-off");
    }
    else{
        $("#deselect-all-button").removeClass("button-off");
    }
}

$("#reset-button").on("click", function(){
    reset();
});
$("#draw-item-button").on("click", function(){
    drawItem();
});
$("#draw-all-button").on("click",async function(){
    let a = drawItem();
    while (a != -1){
        await sleep(8);
        a = drawItem()
    }
});
$("#select-all-button").on("click", function(){
    make_all_options(true);
    reset();
    $("#select-all-button").addClass("button-off");
    $("#deselect-all-button").removeClass("button-off");
});
$("#deselect-all-button").on("click", function(){
    make_all_options(false);
    reset();
    $("#deselect-all-button").addClass("button-off");
    $("#select-all-button").removeClass("button-off");
});
$(".item-option").on("click", function(){
    reset();
    checkCheckBoxes();
});
//#endregion
//#region evidence_tracker
var evidence_found_emf5 = "0",
    evidence_found_orbs = "0",
    evidence_found_writing = "0",
    evidence_found_freezing_temps = "0",
    evidence_found_spirit_box = "0",
    evidence_found_fingerprints = "0";
var evidence_lookup = {
    "evidence_found_emf5":"EMF Level 5",
    "evidence_found_orbs":"Ghost Orbs",
    "evidence_found_writing":"Ghost Writing",
    "evidence_found_freezing_temps":"Freezing Temperatures",
    "evidence_found_spirit_box":"Spirit Box",
    "evidence_found_fingerprints":"Fingerprints"
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
        "Fingerprints":true
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
        "Fingerprints":"#button-evidence-fingerprints"
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

$(window).resize(function() {
    update_size();
});
$(window).on("load", function(){
    //#region Item Randomizer
    update_size();
    
    if (readCookie("checked") != undefined){
        let a = [];
        readCookie("checked").split(",").forEach(element => {
            a.push(element == "1" ? true : false);
        });

        $(".item-option").each(function(i,elem){
            elem.checked = a[i];
        });

        generatePool()
    }
    else{
        reset();
    }
    
    checkCheckBoxes();

    $("#reset-button").addClass("button-off");
    //#endregion

    //#region Evidence Tracker
    update_ghosts();
    if (false){
        /* Sets the size of the buttons to be the same. I dont know how to code websites :) */
        let buttonSizes = "max(";
        Array.from($(".evidence-button")).forEach(element => {
            buttonSizes += element.clientWidth + "px,";
        });
        buttonSizes += "0px)";
    
        Array.from($(".evidence-button")).forEach(element => {
            element.style.minWidth = buttonSizes;
        });
    }

    $(".ghosts-it-could-be-container").width($(".ghosts-it-could-be-container").width());

    $(".ghosts-it-could-be-container").height($(".ghosts-it-could-be-container").height());

    $(".main-content").width($(".ghosts-cant-be").width());
    // $(".ghosts-cant-be").width($(".ghosts-it-could-be-container").width() + $(".evidence-buttons").width())

    update_size();
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

    loading_done();
});


function list_converter(array_input){
    let to_return = ""
    for (let i = 1; i <= array_input.length; i++) {
        to_return += `${i}. ${array_input[i-1]}\n`
    }
    return to_return.substring(0, to_return.length - 1)
}


// Data from https://pastebin.com/CAi5Z1AV (Credit to "Nexus Spidr#6056")
var challanges = {
    "Photo Randomizer": {
        "name": "Photo Randomizer",
        "rules": [
            "You are allowed to only use photo cameras from the start",
            "Every photo that is registered in the book as a \"proper\" photo (counts as bone, ghost, interaction etc.) allows you to roll for a single item",
            "There are no rerolls except for duplicate items",
            "Each photo \"type\" has a limited number you can obtain; Ghost photo|1, Ouija Board|1, Bone|1, Interaction|2, Footstep|2, Fingerprints|2"
        ]
    },
    "Objective Randomizer": {
        "name": "Objective Randomizer",
        "rules": [
            "You are allowed to only use the items needed for the secondary objectives.",
            "For every SECONDARY objective completed, You roll for one item",
            "You get ONE and ONLY ONE reroll for a bad item per game with the exception of duplicates",
            "You only get a total of 6 items per game and sometimes you don't get ANY evidence equipment. Forces you to know some secondary ghost evidence to clear from time to time"
        ]
    },
    "Thief Randomizer": {
        "name": "Thief Randomizer",
        "rules": [
            "You are not allowed to take ANY items with you into the building at the start",
            "You can roll an item for every \"valuable\" item you take from the house to the truck. This list includes:\n" + list_converter([
                    "Laptops",
                    "Phones",
                    "Stuffed Animals",
                    "Tools",
                    "Special, map specific Items that are rare/only have one of"
                ]),
            "You are limited to a total of 10 items. (Half of the available Item pool for solo)"
        ]
    },
    "Def Man Run": {
        "name": "Def Man Run",
        "rules": [
            "No restrictions with the exception of having to mute the game AND take your headphones off your head"
        ]
    },
    "No Evidence": {
        "name": "No Evidence",
        "rules": [
            "You are not allowed to use items that are used STRICTLY for evidence",
            "This bans:\n" + list_converter([
                    "Spirit Box",
                    "Thermo",
                    "Video Camera",
                    "EMF Reader",
                    "Ghost Writing Book",
                    "D.O.T.S Projector"
                ]),
            "You are only allowed to use the UV light to find foot prints for photo money and you are not allowed to take photos of windows or doors to find out if there are finger prints"
        ]
    },
    "Electronics Only": {
        "name": "Electronics Only",
        "rules": [
            "You are only allowed to use items that run on batteries or use electrical power. This includes:\n" + list_converter([
                "EMF Reader",
                "Both Flashlights",
                "Head Mounted Camera",
                "All Sensors",
                "Parabolic Mic",
                "Photo Camera",
                "Spirit Box",
                "Thermometer",
                "UV Light",
                "Video Camera",
                "D.O.T.S Projector"
            ]),
            "All other items are strictly banned including house candles and the Ouija Board"
        ]
    },
    "No Electronics": {
        "name": "No Electronics",
        "rules": [
            "You are only allowed to use items that do NOT run on any form of power. This includes:\n" + list_converter([
                "Candles",
                "Crucifix",
                "Ghost Writing Book",
                "Glowsticks",
                "Lighter",
                "Salt",
                "Sanity Pills",
                "Smudge Sticks",
                "Tripod"
            ]),
            "All other items are strictly banned including the default cameras of the map AND the breaker. (Ghost actions are out of your control and if it turns on the breaker and lights you can't turn them off. That's up to the ghost to take care of)"
        ]
    },
    "Starter Items Only": {
        "name": "Starter Items Only",
        "rules": [
            "Simple: You can NOT add any extra items on the set up menu before loading in."
        ]
    },
    "Locked In": {
        "name": "Locked In",
        "rules": [
            "You are to bring in all items that you will be using and throw them through the front door. Once you have entered the house you are NOT allowed to leave until you are confident in your decision and MUST leave once you have gone back outside."
        ]
    },
    
}

var maps = {
    "Willow_Street_House":{
        "name": "Willow Street House",
        "image": "https://static.wikia.nocookie.net/phasmophobia/images/5/52/Willow-front-shot.png/revision/latest/scale-to-width-down/1000?cb=20210619214906"
    },
    "Tanglewood_Street_House":{
        "name": "Tanglewood Street House",
        "image": "https://static.wikia.nocookie.net/phasmophobia/images/2/24/Tanglewoodfront.png/revision/latest/scale-to-width-down/1000?cb=20201009160841"
    },
    "Edgefield_Street_House":{
        "name": "Edgefield Street House"
    },
    "Ridgeview_Road_House":{
        "name": "Ridgeview Road House"
    },
    "Grafton_Farmhouse":{
        "name": "Grafton Farmhouse"
    },
    "Bleasdale_Farmhouse":{
        "name": "Bleasdale Farmhouse"
    },
    "Brownstone_High_School":{
        "name": "Brownstone High School"
    },
    "Prison":{
        "name": "Prison"
    },
    "Asylum":{
        "name": "Asylum"
    }
}

// https://stackoverflow.com/a/24137301
Array.prototype.random = function () {return this[Math.floor((Math.random()*this.length))];};

var old_challange = null;
var old_map = null;
function get_random_combo(){
    let new_challange = old_challange;
    let new_map = old_map;

    while (new_challange == old_challange){
        new_challange = challanges[Object.keys(challanges).random()];
    }
    old_challange = new_challange;

    while (new_map == old_map){
        new_map = maps[Object.keys(maps).random()];
    }
    old_map = new_map;

    return {
        "challange": new_challange,
        "map": old_map
    }
}


function generate_challange(){
    let dest = document.querySelector(".challange-display")

    let combo = get_random_combo();


    let challange_text = document.createElement("p")
    challange_text.innerHTML = `
        Your challange is: <span style="color:red;">${combo.challange.name}</span> 
        on the map <a target="_blank" href="https://phasmophobia.fandom.com/wiki/${combo.map.name.replaceAll(' ', '_')}" style="color:red;">${combo.map.name}</a>`

    let challange_rules_list = document.createElement("ol")
    combo.challange.rules.forEach(rule_str => {
        let challange_rule = document.createElement("li")
        challange_rule.innerText = rule_str
        challange_rules_list.appendChild(challange_rule)
    })
    challange_text.appendChild(challange_rules_list)


    dest.innerHTML = ""
    dest.appendChild(challange_text)
    

}

$("#generate-challange").on("click", function(){
    generate_challange()
});

