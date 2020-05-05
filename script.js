// uppgrade levels, sets inner html to their values
let click_lvl, passive_lvl, crit_lvl, speed_lvl;
document.querySelector('.click_lvl__lvl').innerHTML = click_lvl = click_lvl_check();
document.querySelector('.passive_lvl__lvl').innerHTML = passive_lvl = passive_lvl_check();
document.querySelector('.crit_lvl__lvl').innerHTML = crit_lvl = crit_lvl_check();
document.querySelector('.speed_lvl__lvl').innerHTML = speed_lvl = speed_lvl_check();
// uppgrade costs
let click_cost, passive_cost, crit_cost, speed_cost;
document.querySelector('.click_lvl__cost').innerHTML = click_cost = click_cost_check();
document.querySelector('.passive_lvl__cost').innerHTML = passive_cost = passive_cost_check();
document.querySelector('.crit_lvl__cost').innerHTML = crit_cost = crit_cost_check();
document.querySelector('.speed_lvl__cost').innerHTML = speed_cost = speed_cost_check();
// points,points per click,
let points, points_click, passive_points, passive_speed, crit_value;
document.querySelector('.cookie__points').innerHTML = points = points_check();
points_click = points_click_check();
passive_points = passive_points_check();
passive_speed = passive_speed_check();
crit_value = crit_value_check();

// This is the constant point adding
setInterval(() => {
    points += passive_points;
    localStorage.setItem('points_saved','true');
    localStorage.setItem('points',JSON.stringify(points));
    document.querySelector('.cookie__points').innerHTML = points;
}, passive_speed);

// big cookie clicking logic
document.querySelector('.cookie').addEventListener('click',()=>{
    // 25% chance to crit
    crit = Math.floor(Math.random() * 5);
    console.log(crit);
    // if critical hit increese the gained points by the crit val
    if(crit == 4){
        points += points_click * crit_value;
    }
    // else just add whatever points per click you have
    else{
        points += points_click
    }
    // so it uppdates real time every time you click
    document.querySelector('.cookie__points').innerHTML = points;
    // shows how many points player gained
    points_gained(crit);
})

// Click lvl uppgrade
document.querySelector('.click_lvl__img').addEventListener('click',()=>{
    if(click_cost < points){
        click_lvl++;
        document.querySelector('.click_lvl__lvl').innerHTML = click_lvl;
        // saves the click lvl
        localStorage.setItem('click_lvl_saved','true');
        localStorage.setItem('click_lvl', JSON.stringify(click_lvl));
        // saves how many points per click you gain now
        points_click += 10;
        localStorage.setItem('points_click_saved','true');
        localStorage.setItem('points_click', JSON.stringify(points_click));
        // saves the new click price
        points = points - click_cost;
        document.querySelector('.cookie__points').innerHTML = points;
        click_cost = click_cost * 5;
        document.querySelector('.click_lvl__cost').innerHTML = click_cost
        localStorage.setItem('click_cost_saved','true');
        localStorage.setItem('click_cost', JSON.stringify(click_cost));
    }
    if(click_lvl >= 10){
        document.querySelector(".click_lvl").style.opacity = 0.5;
        document.querySelector(".click_lvl").style.pointerEvents = "none";
    }
})

// passive income level uppgrade
document.querySelector('.passive_lvl__img').addEventListener('click',()=>{
    if(passive_cost < points){
        passive_lvl++;
        document.querySelector('.passive_lvl__lvl').innerHTML = passive_lvl;
        localStorage.setItem('passive_lvl_saved', 'true');
        localStorage.setItem('passive_lvl',JSON.stringify(passive_lvl));
        passive_points = passive_points * 2;
        points = points - passive_cost;
        localStorage.setItem('passive_points_saved', 'true');
        localStorage.setItem('passive_points', JSON.stringify(passive_points));
        document.querySelector('.cookie__points').innerHTML = points;
        passive_cost = passive_cost * 5;
        document.querySelector('.passive_lvl__cost').innerHTML = passive_cost;
        localStorage.setItem('passive_cost_saved', 'true');
        localStorage.setItem('passive_cost', JSON.stringify(passive_cost));
    }
    if(passive_lvl >= 10){
        document.querySelector(".passive_lvl").style.opacity = 0.5;
        document.querySelector(".passive_lvl").style.pointerEvents = "none";
    }
})

// Crit level uppgrade
document.querySelector('.crit_lvl__img').addEventListener('click',()=>{
    if(crit_cost < points){
        crit_lvl++;
        document.querySelector('.crit_lvl__lvl').innerHTML = crit_lvl;
        localStorage.setItem('crit_lvl_saved', 'true');
        localStorage.setItem('crit_lvl',JSON.stringify(crit_lvl));
        crit_value += 0.5;
        points = points - crit_cost;
        localStorage.setItem('crit_value_saved', 'true');
        localStorage.setItem('crit_value', JSON.stringify(crit_value));
        document.querySelector('.cookie__points').innerHTML = points;
        crit_cost = crit_cost * 5;
        document.querySelector('.crit_lvl__cost').innerHTML = crit_cost;
        localStorage.setItem('crit_cost_saved', 'true');
        localStorage.setItem('crit_cost', JSON.stringify(crit_cost));
    }
    if(crit_lvl >= 10){
        document.querySelector(".crit_lvl").style.opacity = 0.5;
        document.querySelector(".crit_lvl").style.pointerEvents = "none";
    }
})

// speed level uppgrade
document.querySelector('.speed_lvl__img').addEventListener('click',()=>{
    if(speed_cost < points){
        speed_lvl++;
        document.querySelector('.speed_lvl__lvl').innerHTML = speed_lvl;
        localStorage.setItem('speed_lvl_saved', 'true');
        localStorage.setItem('speed_lvl',JSON.stringify(speed_lvl));
        passive_speed = passive_speed - 100;
        points = points - speed_cost;
        localStorage.setItem('passive_speed_saved', 'true');
        localStorage.setItem('passive_speed', JSON.stringify(passive_speed));
        document.querySelector('.cookie__points').innerHTML = points;
        speed_cost = speed_cost * 5;
        document.querySelector('.speed_lvl__cost').innerHTML = speed_cost;
        localStorage.setItem('speed_cost_saved', 'true');
        localStorage.setItem('speed_cost', JSON.stringify(speed_cost));
    }
    if(speed_lvl >= 10){
        document.querySelector(".speed_lvl").style.opacity = 0.5;
        document.querySelector(".speed_lvl").style.pointerEvents = "none";
    }
})

// shows how many points the player gained
function points_gained(crit){
    // takes mouse coordinates
    let mouse_x = event.clientX;
    let mouse_y = event.clientY;
    // creates a div and appends it to the body with all the classes
    let flying_number = document.createElement('div');
    document.body.appendChild(flying_number);
    flying_number.classList.add('cookie_gained','fade');
    // positions where the point should be
    flying_number.style.top = mouse_y - 40 + "px";
    flying_number.style.left = mouse_x - 40 + "px";
    // checks if user crit
    if(crit == 4){
        flying_number.innerHTML = "+" + points_click * crit_value;
        flying_number.style.color = 'red';
    }
    else{
        flying_number.innerHTML = "+" + points_click;
    }
    // this removes the class to create the fadeout effect then after it's done removes the created div
    setTimeout(() => {
        flying_number.classList.remove('fade');
        setTimeout(() => {
            flying_number.remove();
        }, 300);
    }, 300);
}




// The RESET button

document.querySelector('.reset').addEventListener('click',()=>{
    localStorage.clear();

    document.querySelector('.click_lvl__lvl').innerHTML = click_lvl = click_lvl_check();
    document.querySelector('.passive_lvl__lvl').innerHTML = passive_lvl = passive_lvl_check();
    document.querySelector('.crit_lvl__lvl').innerHTML = crit_lvl = crit_lvl_check();
    document.querySelector('.speed_lvl__lvl').innerHTML = speed_lvl = speed_lvl_check();
    document.querySelector('.click_lvl__cost').innerHTML = click_cost = click_cost_check();
    document.querySelector('.passive_lvl__cost').innerHTML = passive_cost = passive_cost_check();
    document.querySelector('.crit_lvl__cost').innerHTML = crit_cost = crit_cost_check();
    document.querySelector('.speed_lvl__cost').innerHTML = speed_cost = speed_cost_check();
    document.querySelector('.cookie__points').innerHTML = points = points_check();
    points_click = points_click_check();
    passive_points = passive_points_check();
    passive_speed = passive_speed_check();
    crit_value = crit_value_check();
})

// Everything below here is just saving and loading(if saved);
// These check if player has played before , if they haven't then set the values to default/starter
// This one checks for uppgrade lvls
function click_lvl_check(){
    if(localStorage.getItem('click_lvl_saved') === 'true'){
        return parseInt(localStorage.getItem('click_lvl'));
    }
    else{
        return 0;
    }
}

function passive_lvl_check(){
    if(localStorage.getItem('passive_lvl_saved') === 'true'){
        return parseInt(localStorage.getItem('passive_lvl'));
    }
    else{
        return 0;
    }
}

function crit_lvl_check(){
    if(localStorage.getItem('crit_lvl_saved') === 'true'){
        return parseInt(localStorage.getItem('crit_lvl'));
    }
    else{
        return 0;
    }
}

function speed_lvl_check(){
    if(localStorage.getItem('speed_lvl_saved') === 'true'){
        return parseInt(localStorage.getItem('speed_lvl'));
    }
    else{
        return 0;
    }
}


// this one checks for uppgrade costs
function click_cost_check(){
    if(localStorage.getItem('click_cost_saved') === 'true'){
        return parseInt(localStorage.getItem('click_cost'));
    }
    else{
        return 200;
    }
}
function passive_cost_check(){
    if(localStorage.getItem('passive_cost_saved') === 'true'){
        return parseInt(localStorage.getItem('passive_cost'));
    }
    else{
        return 200;
    }
}
function crit_cost_check(){
    if(localStorage.getItem('crit_cost_saved') === 'true'){
        return parseInt(localStorage.getItem('crit_cost'));
    }
    else{
        return 200;
    }
}
function speed_cost_check(){
    if(localStorage.getItem('speed_cost_saved') === 'true'){
        return parseInt(localStorage.getItem('speed_cost'));
    }
    else{
        return 200;
    }
}

// checks for points,poin ts per click, passive poits, passive_speed, crit value;

function points_check(){
    if(localStorage.getItem('points_saved') === 'true'){
        return parseInt(localStorage.getItem('points'));
    }
    else{
        return 0;
    }
}
function points_click_check(){
    if(localStorage.getItem('points_click_saved') === 'true'){
        return parseInt(localStorage.getItem('points_click'));
    }
    else{
        return 1;
    }
}
function passive_points_check(){
    if(localStorage.getItem('passive_points_saved') === 'true'){
        return parseInt(localStorage.getItem('passive_points'));
    }
    else{
        return 1;
    }
}
function passive_speed_check(){
    if(localStorage.getItem('passive_speed_saved') === 'true'){
        return parseInt(localStorage.getItem('passive_speed'));
    }
    else{
        return 2000;
    }
}
function crit_value_check(){
    if(localStorage.getItem('crit_value_saved') === 'true'){
        return parseInt(localStorage.getItem('crit_value'));
    }
    else{
        return 1.5;
    }
}


// Code here is just so the player can't re-load the page and keep leveling up
if(click_lvl >= 10){
    document.querySelector(".click_lvl").style.opacity = 0.5;
    document.querySelector(".click_lvl").style.pointerEvents = "none";
}
if(crit_lvl >= 10){
    document.querySelector(".crit_lvl").style.opacity = 0.5;
    document.querySelector(".crit_lvl").style.pointerEvents = "none";
}
if(passive_lvl >= 10){
    document.querySelector(".passive_lvl").style.opacity = 0.5;
    document.querySelector(".passive_lvl").style.pointerEvents = "none";
}
if(speed_lvl >= 10){
    document.querySelector(".passive_lvl").style.opacity = 0.5;
    document.querySelector(".passive_lvl").style.pointerEvents = "none";
}


