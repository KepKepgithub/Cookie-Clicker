// This is the text DOM for the points
let points_text = document.querySelector(".points");
// this is here so when the user loads up the page again the cookies are instantly uppdated to last saved instead 
// of showing 0 and uppdating after the interval tick
points_text.innerHTML = point_save_check();
// This is the actual points counter (how many points are in total)
let points = point_save_check();
// how many points per click the person gets
let points_per_click = points_per_click_check();
// This is the clickable cookies
const cookie = document.querySelector(".cookie");

// Section for all the uppgrades declerations
const plus_ten_click_button = document.querySelector(".points_plus_ten");
let plust_ten_click_level_text = document.querySelector(".points_plus_ten__level");
let plust_ten_click_level = click_level_check();
plust_ten_click_level_text.innerHTML = click_level_check();

// adds 1 point every second
setInterval(() => {
    points ++;
    localStorage.setItem('saved','true');
    localStorage.setItem('total_points', JSON.stringify(points));
    points_text.innerHTML = points;
}, 5000);

cookie.onclick = ()=>{
    // calculates will the number be double or standart
    let x = Math.floor(Math.random() * 2)
    switch(x){
        // standart
        case 0:
            points += points_per_click;
            points_text.innerHTML = points;
            break;
        // double
        case 1:
            points += points_per_click * 2;
            break;
    }
    // displays the points gained from click
    points_on_click(x);
}

// this handles the animation / display of how many points I gained per click
function points_on_click(x){
    // finds the location of the mouse
    let x_mouse = event.clientX;
    let y_mouse = event.clientY;
    // Creates a new div whenever the user clicks to display the points gained
    let points_gained = document.createElement('div');
    points_gained.classList.add('points__click',"display_point");
    document.body.appendChild(points_gained);
    // applies the coordinates to the div to move it on cursor
    points_gained.style.top = y_mouse - 20 + "px";
    points_gained.style.left = x_mouse - 20 + "px";
    // checks if the points are double or not and does the appropriate thing
    switch(x){
        case 0:
            points_gained.innerHTML = "+" + points_per_click;
            break;
        case 1:
            points_gained.innerHTML = "+" + points_per_click * 2;
            points_gained.style.color = 'hsla(11, 70%, 58%, 1)';
            break;
    }
    // Timeout before the number fades out and gets removed from the HTML to not bottle performance
    function point_timeout(){
        points_gained.classList.remove("display_point");
        setTimeout(div_timeout,500);
        function div_timeout(){
        points_gained.remove();
        }
    }
    setTimeout(point_timeout,400);
}

// Gain +10 cookies per click
plus_ten_click_button.onclick = ()=>{
    plust_ten_click_level_text.innerHTML = plust_ten_click_level += 1;
    localStorage.setItem('saved_click_level', 'true');
    localStorage.setItem('click_level',JSON.stringify(plust_ten_click_level));
    points_per_click += 10;
    localStorage.setItem('saved_points_per_click', 'true');
    localStorage.setItem('points_per_click',JSON.stringify(points_per_click));
    if(plust_ten_click_level >= 10){
        plus_ten_click_button.style.opacity = '0.5';
        plus_ten_click_button.style.pointerEvents = 'none';
        plust_ten_click_level_text.innerHTML = "MAX";
    }
}


// Checks if the player has played before , if not sets the values to 0
// if the player has played sets points total points to those saved in local storage
function point_save_check(){
    if(localStorage.getItem('saved') === 'true'){
        return parseInt(localStorage.getItem('total_points'));
    }
    else{
        return 0;
    }
}
// checks the click level
function click_level_check(){
    if(localStorage.getItem('saved_click_level') === 'true'){
        return parseInt(localStorage.getItem('click_level'));
    }
    else{
        return 0;
    }
}
// when scipt get's loaded checks what the click level is
if(parseInt(localStorage.getItem('click_level')) >= 10){
    plus_ten_click_button.style.opacity = '0.5';
    plus_ten_click_button.style.pointerEvents = 'none';
    plust_ten_click_level_text.innerHTML = "MAX";
}
// 

function points_per_click_check(){
    if(localStorage.getItem('saved_points_per_click') === 'true'){
        return parseInt(localStorage.getItem('points_per_click'));
    }
    else{
        return 1;
    }
}