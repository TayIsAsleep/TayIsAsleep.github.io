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

$(window).resize(function() {
    update_size();
});
$(window).on("load", function(){
    // $("#bg-image").css("background-image",'radial-gradient(transparent, rgba(0,0,0,30%)),url("/static/bg0.jpg")')
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

    loading_done();
});