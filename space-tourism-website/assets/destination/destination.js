planet_choice(0)
function planet_choice(choosen_planet){ 
    var planet_images = document.getElementById("planet-images");
    var planet_name = document.getElementById("planet-name");
    var planet_description = document.getElementById("planet-description");
    var planet_distance = document.getElementById("planet-distance");
    var planet_travel = document.getElementById("planet-travel");
    for(var i = 0; i<4; i++){
        document.getElementById("planet_"+i).parentElement.style.borderColor="";
        document.getElementById("planet_"+i).style.color="";
    }
    document.getElementById("planet_"+choosen_planet).parentElement.style.borderColor = "#fff";
    document.getElementById("planet_"+choosen_planet).style.color="#fff";
    fetch("./assets/data.json")
            .then((res) => { 
            return res.json(); 
        }) 
        .then((data) => {
            var destination = data["destinations"];
            planet_name.innerHTML = destination[choosen_planet].name;
            planet_images.src = destination[choosen_planet].images.png;
            planet_description.innerHTML = destination[choosen_planet].description;
            planet_distance.innerHTML = destination[choosen_planet].distance;
            planet_travel.innerHTML = destination[choosen_planet].travel;
        }) 
} 