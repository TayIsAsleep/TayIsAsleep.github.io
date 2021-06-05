var randomness = 10; // how much extra angle that can be added on a bounce
var speed = 1; // how many pixels to go on per tick
var refreshrate = 1;
var startValues = [
    300,300,
    // 45 * 5
    Math.floor(Math.random() * 3600) /  10
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
    fix_dir(){
        while (this.dir < 0){
            this.dir += 360;
        };
        while (this.dir > 360){
            this.dir -= 360;
        };
        
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

        // Save the different corner hits:
        xL_hit = dvd_logo.x  < 0, 
        xR_hit = document.body.clientWidth - (dvd_logo.x + dvd_logo.obj.clientWidth) < 0,
        yT_hit = dvd_logo.y < 0,
        yB_hit = document.body.clientHeight - (dvd_logo.y + dvd_logo.obj.clientHeight) < 0;
    
    if (
        (xL_hit && yT_hit) || (xL_hit && yB_hit) ||
        (xR_hit && yT_hit) || (xR_hit && yB_hit)
        ){

        // IT HIT A CORNER!
        dvd_logo.dir += 180;
        new_x *= -1;
        new_y *= -1;
        
        // Special rainbow effect for corner hits
        dvd_logo.obj.style.fill = "white";
        document.body.classList.add("rainbow");
        clearInterval(loop);
    }
    else{

        let hit = (xL_hit ? 0 : (xR_hit ? 180 : (yT_hit ? 270 : (yB_hit ? 90 : null))));
        if (typeof hit == 'number'){

            // Move back a step so it wont get stuck
            dvd_logo.x -= new_x;
            dvd_logo.y -= new_y;

            // Calc new direction
            dvd_logo.dir = 2 * hit - dvd_logo.dir - 180;

            // Fix direction value to a value that is (0 =< dir <= 360)
            dvd_logo.fix_dir()

            // Add Randomness
            dvd_logo.dir += (Math.floor(Math.random() * (randomness * 10) * 2) - (randomness * 10)) / 10;

            // Calc new thing
            a = (Math.PI / 180) * (dvd_logo.dir);
            new_x = Math.cos(a) * speed;
            new_y = Math.sin(a) * speed;

            // Update color
            dvd_logo.obj.style.fill = getRandomColor();
            document.body.classList.remove("rainbow");
        };
    };

    dvd_logo.x += new_x;
    dvd_logo.y += new_y;
    dvd_logo.obj.style.transform = `translate(${dvd_logo.x}px, ${dvd_logo.y}px)`;
};



            // let going_up = dvd_logo.dir > 180 && dvd_logo.dir < 360
            // let going_right = dvd_logo.dir > 270 || (dvd_logo.dir >= 0 && dvd_logo.dir < 90)
            // let going_down = dvd_logo.dir > 0 && dvd_logo.dir < 180
            // let going_left = dvd_logo.dir > 90 && dvd_logo.dir < 270

            // if ((going_up || going_down) && !(going_left || going_right) ||
            //     (going_left || going_right) && !(going_up || going_down)){

            //     dvd_logo.dir += (Math.floor(Math.random() * (randomness * 10) * 2) - (randomness * 10)) / 10;
            // }
            // else{
            //     // if ((yT_hit || yB_hit) && !(xL_hit || xR_hit)){
            //     //     if ((going_down && going_right) || (going_up && going_left)){
            //     //         dvd_logo.dir += randomness * -1
            //     //     }        
            //     //     if ((going_down && going_left) || (going_up && going_right)){
            //     //         dvd_logo.dir += randomness
            //     //     }

            //     // }
            //     // else{
            //     //     if ((going_down && going_right) || (going_up && going_left)){
            //     //         dvd_logo.dir += randomness
            //     //     }
            //     //     if ((going_down && going_left) || (going_up && going_right)){
            //     //         dvd_logo.dir += randomness * -1
            //     //     }
            //     // }

            //     if ((going_down && going_right) || (going_up && going_left)){
            //         dvd_logo.dir += randomness * ((yT_hit || yB_hit) && !(xL_hit || xR_hit) ? -1 : 1)
            //     }        
            //     else if ((going_down && going_left) || (going_up && going_right)){
            //         dvd_logo.dir += randomness * ((yT_hit || yB_hit) && !(xL_hit || xR_hit) ? 1 : -1)
            //     }
            // }

