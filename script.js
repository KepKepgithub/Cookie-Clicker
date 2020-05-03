// This is the text for the points
let points_text = document.querySelector(".points");
// This is the actual points counter
let points = 0;
// This is the clickable cookies
const cookie = document.querySelector(".cookie");


// adds 1 point every second
setInterval(() => {
    points +=1
    points_text.innerHTML = points;
}, 1000);

cookie.onclick = ()=>{
    // adds one point per click
    points += 1;
    points_text.innerHTML = points;
    // takes the coordiantes of the mouse
    points_on_click();
}

// this handles adding points on click
function points_on_click(){
    let x_mouse = event.clientX;
    let y_mouse = event.clientY;
    // Creates a new div whenever the user clicks to display the points gained
    let points_gained = document.createElement('div');
    points_gained.classList.add('points__click',"display_point");
    document.body.appendChild(points_gained);
    // applies the coordinates to the div to move it on cursor
    points_gained.style.top = y_mouse - 20 + "px";
    points_gained.style.left = x_mouse - 20 + "px";
    points_gained.innerHTML = "+1";
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