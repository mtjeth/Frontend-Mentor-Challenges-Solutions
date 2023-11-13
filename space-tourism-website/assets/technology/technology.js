technology_list(0);
function technology_list(technology_no){  
    var technology_name = document.getElementById("technology-name");
    var technology_description = document.getElementById("technology-description");
    var technology_images = document.getElementById("technology-images");
    for(var i = 0; i < 3 ; i++){ 
        document.getElementById("technology-"+i).style.backgroundColor="";
        document.getElementById("technology-"+i).firstChild.style.color="";
    } 
    document.getElementById("technology-"+technology_no).style.backgroundColor="#fff";
    document.getElementById("technology-"+technology_no).firstChild.style.color="#0B0D17";
    fetch("./assets/data.json") 
            .then((res) => { 
            return res.json(); 
        }) 
        .then((data) => {
            var technology = data["technology"];
            technology_name.innerHTML = technology[technology_no].name;  
            technology_description.innerHTML = technology[technology_no].description;
            var screensize = screen.width
            if(screensize <= 1024 ){
                technology_images.src = technology[technology_no].images.landscape;
            }else{
                technology_images.src = technology[technology_no].images.portrait;
            }
            
            
        }) 
} 