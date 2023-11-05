var next_btn = document.getElementById("nextstep");
var goback_btn = document.getElementById("goback");
var confirm_btn = document.getElementById("confirm");
var plan_option = null;
var plan_duration = "Monthly";
var on_service = false;
var lg_storage = false;
var cust_profile = false;

var Marine_blue = "hsl(213, 96%, 18%)";
var Purplish_blue = "hsl(243, 100%, 62%)";
var Strawberry_red = "hsl(354, 84%, 57%)";
var Cool_gray = "hsl(231, 11%, 63%)";
var Light_gray = "hsl(229, 24%, 87%)";
var Alabaster = "hsl(231, 100%, 99%)";

slider("Yearly");
var current = 1;
step_choose(current);

function error_rm(a) { 
    document.getElementsByClassName("error_txt")[a].innerHTML = "";
    document.getElementsByClassName("info_form_input")[a].style.borderColor = "";

}
function checker(stp) {
    switch (stp) {
        case 1:
            var info_name_input = document.getElementById("info_name");
            var info_email_input = document.getElementById("info_email");
            var info_tel_input = document.getElementById("info_tel");
            var error_txt = document.getElementsByClassName("error_txt");
            var status = true;
            if ((info_name_input.value).trim() === "") {
                info_name_input.style.borderColor = Strawberry_red;
                error_txt[0].innerHTML = "This Field is required";
                status = false;
            } else {
                if (info_name_input.value.length < 3) {
                    info_name_input.style.borderColor = Strawberry_red;
                    error_txt[0].innerHTML = "Minimum of 3 letters";
                    status = false;
                }
            }
            var validemail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            if ((info_email_input.value).trim() === "") {
                info_email_input.style.borderColor = Strawberry_red;
                error_txt[1].innerHTML = "This Field is required";
                status = false;
            } else {
                if (!info_email_input.value.match(validemail)) {
                    info_email_input.style.borderColor = Strawberry_red;
                    error_txt[1].innerHTML = "Invalid Email Address";
                    status = false;
                }
            }
            var validtel = /^[+0]+[0-9]*$/;
            if ((info_tel_input.value).trim() === "") {
                info_tel_input.style.borderColor = Strawberry_red;
                error_txt[2].innerHTML = "This Field is required";
                status = false;
            } else {
                if (!info_tel_input.value.match(validtel)) {
                    info_tel_input.style.borderColor = Strawberry_red;
                    error_txt[2].innerHTML = "Invalid Phone Number";
                    status = false;
                }
            }
            return status;
        case 2:
            if (plan_option === null) {
                for (i = 0; i < 3; i++) {
                    document.getElementsByClassName("plan-box")[i].style.borderColor = Strawberry_red;
                }
                if (document.getElementById("error_step_2") === null) {
                    var error_plan = document.createElement("p");
                    var error_text = document.createTextNode("No plan selected");
                    error_plan.appendChild(error_text);
                    error_plan.style.color = Strawberry_red;
                    error_plan.id = "error_step_2";
                    (document.getElementById("step2")).insertBefore(error_plan, (document.getElementById("step2_form")));
                }
                return false;
            } else {
                return true;
            }
        default:
            return true;
    }
}
function slider(x = plan_duration) {
    switch (x) {
        case "Yearly":
            plan_duration = "Monthly";
            document.getElementById("dot_monthly").style.display = "block";
            document.getElementById("dot_yearly").style.display = "none";
            document.getElementById("h3_yearly").style.color = Cool_gray;
            document.getElementById("h3_monthly").style.color = Marine_blue;
            document.getElementById("arcade_price").innerHTML = "$9/mo";
            document.getElementById("advanced_price").innerHTML = "$12/mo";
            document.getElementById("pro_price").innerHTML = "$15/mo";
            document.getElementsByClassName("yearly_discount")[0].style.display = "none";
            document.getElementsByClassName("yearly_discount")[1].style.display = "none";
            document.getElementsByClassName("yearly_discount")[2].style.display = "none";
            document.getElementById("on-service-h2").innerHTML = "+$1/mo";
            document.getElementById("lg-storage-h2").innerHTML = "+$2/mo";
            document.getElementById("cust-profile-h2").innerHTML = "+$2/mo";
            document.getElementById("total").innerHTML = "Total (per month)";
            break;
        case "Monthly":
            plan_duration = "Yearly";
            document.getElementById("dot_yearly").style.display = "block";
            document.getElementById("dot_monthly").style.display = "none";
            document.getElementById("h3_yearly").style.color = Marine_blue;
            document.getElementById("h3_monthly").style.color = Cool_gray;
            document.getElementById("arcade_price").innerHTML = "$90/yr";
            document.getElementById("advanced_price").innerHTML = "$120/yr";
            document.getElementById("pro_price").innerHTML = "$150/yr";
            document.getElementsByClassName("yearly_discount")[0].style.display = "block";
            document.getElementsByClassName("yearly_discount")[1].style.display = "block";
            document.getElementsByClassName("yearly_discount")[2].style.display = "block";
            document.getElementById("on-service-h2").innerHTML = "+$10/yr";
            document.getElementById("lg-storage-h2").innerHTML = "+$20/yr";
            document.getElementById("cust-profile-h2").innerHTML = "+$20/yr";
            document.getElementById("total").innerHTML = "Total (per year)";
            break;
    }
}
function plan_chooser() {
    var arcade_status = document.getElementById("arcade").checked;
    var advanced_status = document.getElementById("advanced").checked;
    var pro_status = document.getElementById("pro").checked;
    var plan_box = document.getElementsByClassName("plan-box");
    function changer(a, border = Purplish_blue, bg = Alabaster) {
        plan_box[a].style.borderColor = border;
        plan_box[a].style.backgroundColor = bg;
    }
    if (document.getElementById("error_step_2") != null) {
        document.getElementById("error_step_2").remove();
    }
    if (arcade_status) {
        changer(0);
        plan_option = "Arcade";
    } else {
        changer(0, "", "");
    }
    if (advanced_status) {
        changer(1);
        plan_option = "Advanced";
    } else {
        changer(1, "", "");
    }
    if (pro_status) {
        changer(2);
        plan_option = "Pro";
    } else {
        changer(2, "", "");
    }
}
function option_chooser() {
    on_service = document.getElementById("on-service").checked;
    lg_storage = document.getElementById("lg-storage").checked;
    cust_profile = document.getElementById("cust-profile").checked;
    var add_box = document.getElementsByClassName("add-box");
    var add_box_check = document.getElementsByClassName("checker");
    function changer(a, border = Purplish_blue, bg = Alabaster) {
        add_box[a].style.borderColor = border;
        add_box[a].style.backgroundColor = bg;
        add_box_check[a].style.borderColor = border;
        add_box_check[a].style.backgroundColor = border;
    }
    if (on_service) {
        changer(0);
    } else {
        changer(0, "", "");
    }
    if (lg_storage) {
        changer(1);
    } else {
        changer(1, "", "");
    }
    if (cust_profile) {
        changer(2);
    } else {
        changer(2, "", "");
    }
}
function step_choose(current_step) {
    for (var i = 1; i < 6; i++) {
        document.getElementById("step" + i).style.display = "none";
    }

    next_btn.style.display = "none";
    goback_btn.style.display = "none";
    confirm_btn.style.display = "none";
    for (var i = 1; i < 5; i++) {
        document.getElementById("circle_" + i).className = "circle_" + i;
    }
    document.getElementById("step" + current_step).style.display = "block";
    if (current_step !== 5) {
        document.getElementById("circle_" + current_step).className = "circle_current";
    }

    next_btn.parentElement.style.display = "flex";
    switch (current_step) {
        case 1:
            next_btn.parentElement.style.justifyContent = "flex-end";
            next_btn.style.display = "block";
            break;
        case 2:
            next_btn.parentElement.style.justifyContent = "space-between";
            next_btn.style.display = "block";
            goback_btn.style.display = "block";
            break;
        case 3:
            next_btn.style.display = "block";
            goback_btn.style.display = "block";
            break;
        case 4:
            confirm_btn.style.display = "block";
            goback_btn.style.display = "block";
            total_calculator();
            break;
        case 5:
            next_btn.parentElement.style.display = "none";
            break;
    }
}
function next_step(x = current) {
    current = x;
    if (checker(current)) {
        if (current < 4) {
            current += 1;
            step_choose(current);
        }
        else {
            alert("error");
        }
    }
}
function prev_step() {
    current -= 1;
    step_choose(current);
}
function finish() {
    if (current === 4) {
        console.log("works correctly");
        current += 1;
        step_choose(current);
    }
    else {
        alert("error");
    }
}
function detail_adder(given_add_on_name, given_add_on_price) {
    if (document.getElementById(given_add_on_name) == null) {
        var add_on_name = document.createElement("h5");
        var node = document.createTextNode(given_add_on_name);
        add_on_name.appendChild(node);
        var add_on_price = document.createElement("p");
        node = document.createTextNode(given_add_on_price);
        add_on_price.appendChild(node);
        var add_ons_list = document.createElement("div")
        add_ons_list.appendChild(add_on_name);
        add_ons_list.appendChild(add_on_price);
        add_ons_list.className = "extra";
        add_ons_list.id = given_add_on_name;
        document.getElementById("detail_list").appendChild(add_ons_list);
    }
}
function total_calculator() {
    var base_price = 0;
    var extra = 0;
    var plan_duration_post_fix;
    switch (plan_option) {
        case "Arcade":
            base_price = 9;
            break;
        case "Advanced":
            base_price = 12;
            break;
        case "Pro":
            base_price = 15;
            break;
    }
    switch (plan_duration) {
        case "Monthly":
            plan_duration_post_fix = "/mo";
            break;
        case "Yearly":
            plan_duration_post_fix = "0/yr";
            break;
    }
    if (on_service) {
        extra += 1;
        detail_adder("Online service", ("+$" + 1 + plan_duration_post_fix));
    } else {
        var temp_name = document.getElementById("Online service");
        if (temp_name != null) {
            temp_name.remove();
        }
    }
    if (lg_storage) {
        extra += 2;
        detail_adder("Large storage", ("+$" + 2 + plan_duration_post_fix));
    } else {
        var temp_name = document.getElementById("Large storage");
        if (temp_name != null) {
            temp_name.remove();
        }
    }
    if (cust_profile) {
        extra += 2;
        detail_adder("Customizable profile", ("+$" + 2 + plan_duration_post_fix));
    } else {
        var temp_name = document.getElementById("Customizable profile");
        if (temp_name != null) {
            temp_name.remove();
        }
    }
    if (extra === 0) {
        detail_adder("Add ons", ("+$" + 0 + plan_duration_post_fix));
    } else {
        var temp_name = document.getElementById("Add ons");
        if (temp_name != null) {
            temp_name.remove();
        }
    }
    document.getElementById("choosen_plan").innerHTML = plan_option + " (" + plan_duration + ")";
    document.getElementById("choosen_plan_price").innerHTML = '$' + base_price + plan_duration_post_fix;
    document.getElementById("total_price").innerHTML = '$' + (base_price + extra) + plan_duration_post_fix;
}