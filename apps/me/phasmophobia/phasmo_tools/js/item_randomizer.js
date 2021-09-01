var inPool = [];

function make_all_options(a){
    inPool = [];
    $(".output-field-text").html("");
    let arrayForCookies = [];
    $(".item-option").each(function(i,elem){
        elem.checked = a;
        arrayForCookies.push(a ? "1" : "0");
    });
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
    if (inPool.length == 0){return -1;}

    $("#reset-button").removeClass("button-off")
    
    let item = $(`#${inPool.pop()}`).attr("displayName");
    appendText(".output-field", item)

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

function generate_selection_field(){
    let dest = document.getElementsByClassName("selection-field")[0];
    [
        "EMF Reader",
        "Flashlight",
        "Photo Camera",
        "Lighter",
        "Candle",
        "UV Light",
        "Crucifix",
        "Video Camera",
        "Spirit Box",
        "Salt",
        "Smudge Sticks",
        "Tripod",
        "Strong Flashlight",
        "Motion Sensor",
        "Sound Sensor",
        "Thermometer",
        "Sanity Pills",
        "Ghost Writing Book",
        "Parabolic Microphone",
        "Glowstick",
        "Head Mounted Camera",
        "D.O.T.S. Projector"
    ].sort().forEach(current => {
        
        let new_div = document.createElement("div");
        let new_input = document.createElement("input");
        let new_label = document.createElement("label");

        new_input.id = current.toLowerCase().replaceAll(" ","-").replaceAll(".","-");
        new_input.classList.add("item-option");
        new_input.setAttribute('displayname', current);
        new_input.setAttribute('type', "checkbox");
        new_input.setAttribute('name', current.toLowerCase().replaceAll(" ","-"));
        new_input.setAttribute('value', current.toLowerCase().replaceAll(" ","-"));
        new_input.setAttribute('checked', "");

        new_label.innerHTML = current;
        new_label.setAttribute('for', current.toLowerCase().replaceAll(" ","-"));

        new_div.appendChild(new_input);
        new_div.appendChild(new_label);
        new_div.appendChild(document.createElement("br"));

        dest.appendChild(new_div);
    });
};

generate_selection_field();

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