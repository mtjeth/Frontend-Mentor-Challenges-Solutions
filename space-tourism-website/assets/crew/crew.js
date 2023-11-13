crew_list(0);
function crew_list(crew_no){ 
    var crew_role = document.getElementById("crew-role");
    var crew_name = document.getElementById("crew-name");
    var crew_bio = document.getElementById("crew-bio");
    var crew_images = document.getElementById("crew-images");
    for(var i = 0; i < 4 ; i++){ 
        document.getElementById("crew-"+i).style.backgroundColor="";
    } 
    document.getElementById("crew-"+crew_no).style.backgroundColor="#fff";
    fetch("./assets/data.json") 
            .then((res) => { 
            return res.json(); 
        }) 
        .then((data) => {
            var crew = data["crew"];
            crew_name.innerHTML = crew[crew_no].name; 
            crew_role.innerHTML = crew[crew_no].role;
            crew_images.src = crew[crew_no].images.png;
            crew_bio.innerHTML = crew[crew_no].bio;
            
        }) 
} 