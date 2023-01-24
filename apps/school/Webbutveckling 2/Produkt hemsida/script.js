var egg = 0;
document.getElementsByClassName("menu-icon")[0].onclick = function(){
    window.location.href = "index.html?random=1727331525"
};

function egg_check(me){
    if (me.style.color == 'red'){return;};

    me.style.color = 'red';
    egg += 1;

    if (egg == 6){
        document.getElementsByClassName("egg1")[0].style.display = "block";
    };
}