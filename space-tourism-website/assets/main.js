
var menu_open = document.getElementById("menu-open");
var menu_close = document.getElementById("menu-close");
var nav_menu = document.getElementById("nav-menu"); 

function open_nav(){
    menu_open.style.display="none";
    menu_close.style.display="block"; 
    nav_menu.style.width="67.8vw";
}
function close_nav(){
    menu_open.style.display="block";
    menu_close.style.display="none"; 
    nav_menu.style.width="0";
}



