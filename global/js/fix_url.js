function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}

function fix_url(){
    readTextFile(window.location.origin + "/apps.json", function(text){
        all_apps = JSON.parse(text);
        history.pushState({}, null,`/?app=${Object.keys(all_apps)[Object.values(all_apps).indexOf(window.location.href.slice(window.location.origin.length).slice(1))]}`);
    });   
}
