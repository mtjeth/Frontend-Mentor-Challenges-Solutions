var ip_address_input = document.getElementById("ip-address-input");
var ip_address_output = document.getElementById("ip-address-output");
var ip_address_location = document.getElementById("ip-address-location");
var ip_address_timezone = document.getElementById("ip-address-timezone");
var ip_address_isp = document.getElementById("ip-address-isp");
var ip_address_api = "https://geo.ipify.org/api/v2/country,city?apiKey=at_BtWv4jFQDEaRVZnjscAPn5iaLfpUF"
var ip_address_lat;
var ip_address_lng;
var map;
track_ip();
 
 
ip_address_input.addEventListener("keypress", function(event) { 
  if (event.key === "Enter") { 
    event.preventDefault(); 
    track_ip();
  }
});



function track_ip(){
    var ip_address_sent = "&ipAddress=";
    if((ip_address_input.value).trim() === ""){
        ip_address_sent="";
    }
    else{
        ip_address_sent += ip_address_input.value;
        map.remove();
    }
    fetch(ip_address_api+ip_address_sent)
    .then((res) => {
        return res.json();
    })
    .then((data) => {
        var info = data;
        console.log(data);
        ip_address_output.innerHTML = info["ip"] ; 
        if(info["location"].city === info["location"].region){
            ip_address_location.innerHTML = info["location"].city+", "+info["location"].country;
        }
        else{
            ip_address_location.innerHTML = info["location"].city+", "+ info["location"].region;
        }
        if((info["location"].postalCode).trim !== "" ){
            ip_address_location.innerHTML += " "+ info["location"].postalCode;
        }
        ip_address_timezone.innerHTML = "UTC " + info["location"].timezone;
        ip_address_lat = parseFloat(info["location"].lat);
        ip_address_lng = parseFloat(info["location"].lng);
        ip_address_isp.innerHTML = info["isp"];
    })
    .then(() => {
        map = L.map('map').setView([ip_address_lat , ip_address_lng], 15);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map); 

    var customIcon = L.icon({
        iconUrl: './images/icon-location.svg'
    });
    L.marker([ip_address_lat , ip_address_lng], {icon: customIcon}).addTo(map);
    })
}







