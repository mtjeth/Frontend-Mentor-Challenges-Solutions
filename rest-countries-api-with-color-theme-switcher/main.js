switch_theme();
document.getElementById("region_filter_selected").innerHTML = "Filter by Region";
function switch_theme() {
    var theme = document.getElementsByTagName("body")[0];
    switch (sessionStorage.getItem('theme_choice')) {
        case '1':
            document.getElementById("darkmode").className = "fa-solid fa-moon";
            theme.className = "dark";
            break;
        case '2':
            document.getElementById("darkmode").className = "fa-regular fa-moon";
            theme.className = "light";
            break;
        default:
            if (window.matchMedia("(prefers-color-scheme:light)").matches) {
                sessionStorage.setItem('theme_choice', '2');
            } else {
                sessionStorage.setItem('theme_choice', '1');
            }
            switch_theme();
            break;
    }
}
function darkmode() {
    if (sessionStorage.getItem('theme_choice') === '1') {
        sessionStorage.setItem('theme_choice', '2');
    } else {
        sessionStorage.setItem('theme_choice', '1');
    }
    switch_theme();
}
var country_list;
fetch("./data.json")
    .then((res) => {
        return res.json();
    })
    .then((data) => {
        country_list = data;
        for (var i = 0; i < country_list.length; i++) {
            country_add(i)
        }
    })

var search_input = document.getElementById("search-country");
search_input.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault(); 
        search_country();
    }
});
function search_country(){
    if(search_input.value.trim() === ""){
        return 0;
    }
    document.getElementById("remove_search").style.display="block"; 
    function equivalent(a) {
        if (a) {
            if (a.toUpperCase() === (search_input.value).toUpperCase()) {
                return 1;
            }
        }
        return 0;
    }
    for (var i = 0; i < country_list.length; i++) {
        var occurance = 0;
        if (document.getElementById("country_" + i)) {
            document.getElementById("country_" + i).remove();
        }
        occurance += equivalent(country_list[i].name);
        occurance += equivalent(country_list[i].subregion);
        occurance += equivalent(country_list[i].demonym);
        occurance += equivalent(country_list[i].nativeName);
        occurance += equivalent(country_list[i].capital);
        if (country_list[i].altSpellings) {
            var temp = country_list[i].altSpellings;
            for (var j = 0; j < temp.length; j++) {
                occurance += equivalent(temp.j);
            }
        }
        if (country_list[i].translations) {
            var temp = country_list[i].translations;
            var keys = Object.keys(temp);
            keys.forEach(function (key) {
                occurance += equivalent(temp[key]); 
            });
        }
        if (occurance > 0) {
            country_add(i)
        }
    }
}

function selected_region(selection) { 
    document.getElementById("region_filter_selected").innerHTML = selection;
    document.getElementById("filter-box").className = "filter-box selected";
    for (var i = 0; i < country_list.length; i++) {
        if (country_list[i].region !== selection) {
            if(document.getElementById("country_" + i)){
                document.getElementById("country_" + i).remove();
            }
        }
    }

}
function remove_filter(type) {
    for (var i = 0; i < country_list.length; i++) {
        if (document.getElementById("country_" + i)) {
            document.getElementById("country_" + i).remove();
        }
    }
    switch(type){
        case 'search':
            document.getElementById("remove_search").style.display=""; 
            search_input.value ="";
            if(document.getElementById("region_filter_selected").innerHTML === "Filter by Region"){
                for (var i = 0; i < country_list.length; i++) {
                    country_add(i)
                }
            }else{
                for (var i = 0; i < country_list.length; i++) {
                    country_add(i)
                }
                selected_region(document.getElementById("region_filter_selected").innerHTML);
            }
            break;
        case 'region':
            if(search_input.value === null || (search_input.value.trim()) === "" ){
                for (var i = 0; i < country_list.length; i++) {
                    country_add(i)
                }
            }else{
                search_country();
            }
            document.getElementById("region_filter_selected").innerHTML = "Filter by Region";
            document.getElementById("filter-box").className = "filter-box";  
            break;
    }

}
function return_main(){
    document.getElementById("main-section").className = "main-section";
    document.getElementById("detail_country").remove();
} 
function detail_country(i){
    document.getElementById("main-section").className += " sub-section";
    detail_show(i);
}
function detail_country_border(i){ 
    document.getElementById("detail_country").remove();
    detail_show(i);
}
function find_name(value){
    for(var i=0;i<country_list.length;i++){
        if(value===country_list[i].alpha3Code){
            return i;
        }
    }
}

function country_add(i) {
    population_number = parseFloat(country_list[i].population).toLocaleString();
    var flag_src = country_list[i].flags;
    if (flag_src.svg !== null) {
        flag_src = flag_src.svg;
    } else {
        flag_src = flag_src.png;
    }
    var flag = document.createElement("img");
    flag.src = flag_src;
    flag.alt = country_list[i].name + "_flag";
    var flag_box = document.createElement("div");
    flag_box.className = "img-box";
    flag_box.appendChild(flag);
    var country = document.createElement("h2");
    country.innerHTML = country_list[i].name; 
    var text_box = document.createElement("div");
    text_box.className = "text";
    text_box.appendChild(country);
    text_box.appendChild(add_info("Population", population_number));
    text_box.appendChild(add_info("Region", country_list[i].region));
    text_box.appendChild(add_info("Capital", country_list[i].capital));
    var country_box = document.createElement("div");
    country_box.className = "country";
    country_box.appendChild(flag_box);
    country_box.appendChild(text_box); 
    country_box.id = "country_" + i;
    country_box.onclick=function() { detail_country(i); };
    (document.getElementById("main-section")).appendChild(country_box);
}

function detail_show(i){
    population_number = parseFloat(country_list[i].population).toLocaleString();
    var flag_src = country_list[i].flags;
    if (flag_src.svg !== null) {
        flag_src = flag_src.svg;
    } else {
        flag_src = flag_src.png;
    }
    var flag = document.createElement("img");
    flag.src = flag_src;
    flag.alt = country_list[i].name + "_flag";
    var flag_box = document.createElement("div");
    flag_box.className = "img-box";
    flag_box.appendChild(flag);
    var country = document.createElement("h2");
    country.innerHTML = country_list[i].name; 
    var text_box = document.createElement("div");
    text_box.className = "text";
    text_box.appendChild(country);
    var text_box_left = document.createElement("div");
    text_box_left.className = "text-left";
    text_box_left.appendChild(add_info("Native Name", country_list[i].nativeName));
    text_box_left.appendChild(add_info("Population", population_number));
    text_box_left.appendChild(add_info("Region", country_list[i].region));
    text_box_left.appendChild(add_info("Sub Region", country_list[i].subregion));
    text_box_left.appendChild(add_info("Capital", country_list[i].capital));
    var text_box_right = document.createElement("div");
    text_box_right.className = "text-right";
    text_box_right.appendChild(add_info("Top Level Domains", country_list[i].topLevelDomain)); 
    text_box_right.appendChild(add_info("Currencies", country_list[i].currencies)); 
    text_box_right.appendChild(add_info("Languages", country_list[i].languages)); 
    var border = document.createElement("div");
    border.className="borders";
    border.appendChild(add_info("Border","none")); 
    if(country_list[i].borders){
        (border.firstChild).lastChild.remove();
        (country_list[i].borders).forEach(function(a){
            var border_element = document.createElement("button");  
            border_element.innerHTML= country_list[find_name(a)].name; 
            border_element.onclick=function() { detail_country_border(find_name(a)); };
            border.appendChild(border_element);
            border_element = undefined;
        }); 
    }
    text_box.appendChild(text_box_left);
    text_box.appendChild(text_box_right);
    text_box.appendChild(border);
    var country_box = document.createElement("div");
    country_box.className = "detailed";
    country_box.appendChild(flag_box);
    country_box.appendChild(text_box); 
    country_box.id = "detail_country"; 
    (document.getElementById("main-section")).appendChild(country_box);
     
}

function add_info(name, value){
    var element_name = document.createElement("p"); 
    element_name.innerHTML = name +": ";
    var name_value = document.createElement("span");
    if(Array.isArray(value)){
        name_value.innerHTML="";
        value.forEach(function(i){
            if(typeof i === 'object' && i !== null){
                name_value.innerHTML+= i.name +", " ; 
            }else{
                name_value.innerHTML+=i+", ";
            }
        }) 
        name_value.innerHTML = (name_value.innerHTML).slice(0, -2); 

    }else{
        name_value.innerHTML = value;
    }
    element_name.appendChild(name_value);
    return element_name;
} 