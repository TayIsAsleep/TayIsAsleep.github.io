Array.from(document.querySelectorAll("link[href]")).concat(
Array.from(document.querySelectorAll("script[src]")))
.forEach(e => {
    let attrs = e.getAttributeNames();
    if (attrs.includes("ignore")){return;};

    let t = "?t=" + Math.round(Date.now() / 1000);
    if (attrs.includes("href")){
        e.href += t;
    }
    else if (attrs.includes("src")){
        e.src += t;
    }
});
