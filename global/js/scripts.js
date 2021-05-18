function sortObjectByKeys(o){
	//Code from https://www.codegrepper.com/code-examples/python/sort+dict+by+key+js
    return Object.keys(o).sort().reduce((r, k) => (r[k] = o[k], r), {});
}

function shuffle(array){
    //Code from https://stackoverflow.com/a/2450976
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
function sleep(ms){
    //Code from https://stackoverflow.com/a/39914235
    return new Promise(resolve => setTimeout(resolve, ms));
}

//cookie handling functions
function createCookie(name,value,days,path=""){
	var expires = "";
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		expires = "; expires="+date.toGMTString();
	}
	document.cookie = name+"="+value+expires+"; path=/" + path;
};

function readCookie(name){
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
};

function eraseCookie(name,path=""){
	createCookie(path + name,"",-1);
};

