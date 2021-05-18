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
function appendText(location,text) {
    let a = $(location).append($('<p class="new-text"></p>').text(text));
    a = a.children();
    a = $(a[a.length - 1]);
    a.fadeOut(0);
    a.fadeIn(200)
    return a;
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
        if (toAdd[0][1] == ""){
            appendText(".ghosts-it-could-be-container", `It is a ${toAdd[0][0]}!`);
        }
        else{
            appendText(".ghosts-it-could-be-container", `It should be a ${toAdd[0][0]}!`);
            appendText(".ghosts-it-could-be-container", `Evidence not confirmed yet:`);
            appendText(".ghosts-it-could-be-container", toAdd[0][1]);
        }
    }
    else if (toAdd.length == 0){
        appendText(".ghosts-it-could-be-container", "No ghost with that configuration");
    }
    else{
        toAdd.forEach(current => {
            appendText(".ghosts-it-could-be-container", `${current[0]} - ${current[1]}`);
        });
    }

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

    if (!Array.from(document.getElementById(id).classList).includes("button-off")){
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
}
$(".evidence-button").on("click", function(){
    button_evidence_handler(this.id);
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

    loading_done();
});
