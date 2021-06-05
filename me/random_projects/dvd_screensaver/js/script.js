var randomness = 5; // how much extra angle that can be added on a bounce
var speed = 1; // how many pixels to go on per tick
var refreshrate = 1;
var startValues = [
    10,10,
    45
    // Math.floor(Math.random() * 3600) /  10
];

function getRandomColor(){
    // TODO replace with better thing
    return '#' + Math.random().toString(16).substr(-6);
};


class dvd_logo_class{
    constructor(obj, x, y, dir) {
        this.obj = obj;
        this.x = x;
        this.y = y;
        this.dir = dir;
    }
}

const dvd_logo = new dvd_logo_class(
    document.querySelector("svg.dvd-logo"),
    startValues[0],startValues[1],startValues[2]
);

dvd_logo.obj.style.fill = getRandomColor();

var loop = window.setInterval(loop_func, refreshrate);
function loop_func(){
    let // Do some math:
        a = (Math.PI / 180) * (dvd_logo.dir),
        new_x = Math.cos(a) * speed,
        new_y = Math.sin(a) * speed,

        // Check for the other sides:
        bottom_y = document.body.clientHeight - (dvd_logo.y + dvd_logo.obj.clientHeight),
        right_x = document.body.clientWidth - (dvd_logo.x + dvd_logo.obj.clientWidth),

        // Save the different corner hits:
        xL_hit = dvd_logo.x < 0, 
        xR_hit = right_x < 0,
        yT_hit = dvd_logo.y < 0,
        yB_hit = bottom_y < 0;
    
    if (
        (xL_hit && yT_hit) || (xL_hit && yB_hit) ||
        (xR_hit && yT_hit) || (xR_hit && yB_hit)
        ){

        // IT HIT A CORNER!
        dvd_logo.dir += 180;
        new_x = new_x * -1;
        new_y = new_y * -1;

        dvd_logo.obj.style.fill = getRandomColor();
    }
    else{
        let hit = (xL_hit ? 0 : (xR_hit ? 180 : (yT_hit ? 270 : (yB_hit ? 90 : null))));
        if (typeof hit == 'number'){
            dvd_logo.dir = 2 * hit - dvd_logo.dir - 180;
            dvd_logo.dir += (Math.floor(Math.random() * randomness * 2) - randomness) / 10;
            
            a = (Math.PI / 180) * (dvd_logo.dir);
            new_x = Math.cos(a) * speed;
            new_y = Math.sin(a) * speed;

            dvd_logo.obj.style.fill = getRandomColor();
        };
    };

    dvd_logo.x += new_x;
    dvd_logo.y += new_y;
    dvd_logo.obj.style.transform = `translate(${dvd_logo.x}px, ${dvd_logo.y}px)`;
};