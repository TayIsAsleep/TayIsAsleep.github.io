console.log("am ran first time");
function get_fresh_run(){
    console.log("am ran");
    Array.from(document.querySelectorAll("link[href]")).concat(
    Array.from(document.querySelectorAll("script[src]")))
    .forEach(e => {
        let attrs = e.getAttributeNames();
        
        if (attrs.includes("ignore")){return;};
    
        let t = "?t=" + Math.round(Date.now() / 1000);
        let new_thing = document.createElement(e.tagName)
        new_thing.setAttribute("ignore","1");
    
        attrs.forEach(a => {
            let new_val = ""
            if (a == "href"){
                new_val = e.href += t;
            }
            else if (a == "src"){
                new_val = e.src + t;
            }
            else{
                new_val = eval("e." + a)
            }
            new_thing.setAttribute(a,new_val);
        });
    
        console.log(new_thing);
        document.head.appendChild(new_thing)
        
        // if (attrs.includes("href")){
        //     e.href += t;
        // }
        // else if (attrs.includes("src")){
        //     e.src += t;
        // }
    });
}