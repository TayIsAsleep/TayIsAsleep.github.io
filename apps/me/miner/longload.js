function long_load(img_ammount, img_url){
    var loadingImage = false;

    function LoadImage(imageName,imageFile)
        {
        if ((!document.images) || loadingImage) return;
        loadingImage = true;

        if (document.images[imageName].src.indexOf(imageFile)<0)
        {
            document.images[imageName].src = imageFile;
        }
        loadingImage = false;
    }

    for (let i = 0; i < img_ammount; i++) {
        let img = document.createElement("img")

        img.setAttribute("style", `
            width: ${100/img_ammount}%;
            height: 1em;
        `)
        img.name = "image"+i;
        img.onload = ()=>{
            console.log("Loaded "+i);
            if (i+1 < img_ammount){
                LoadImage(`image${i+1}`, `${img_url}?a=${i+1}`);
            }
        }

        if (i == 0){
            img.src = `${img_url}?a=${i+1}` 
        }
        
        document.body.insertBefore(img, document.body.firstChild)
    }
}