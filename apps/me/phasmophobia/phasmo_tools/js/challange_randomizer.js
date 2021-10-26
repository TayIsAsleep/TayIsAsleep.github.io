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
        "name": "Willow Street House"
    },
    "Tanglewood_Street_House":{
        "name": "Tanglewood Street House"
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
    },
    "Maple_Lodge_Campsite":{
        "name": "Maple Lodge Campsite"
    }
}

// Converts a list of items to a list of 
function list_converter(array_input, ordered=true){
    let to_return = ""
    for (let i = 1; i <= array_input.length; i++) {
        to_return += `${ordered ? i : '•'}. ${array_input[i-1]}\n`
    }
    return to_return.substring(0, to_return.length - 1)
}

// https://stackoverflow.com/a/24137301
// Gets random item from list
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
        challange_rules_list.appendChild(challange_rule);
    })
    challange_text.appendChild(challange_rules_list);


    dest.innerHTML = "";
    dest.appendChild(challange_text);
}

$("#generate-challange").on("click", function(){
    generate_challange();
});