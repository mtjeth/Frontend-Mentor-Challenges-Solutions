function flip(hand) {
    switch (hand) {
        case "second":
            var pos_fix = "-sec";
            break;
        case "minute":
            var pos_fix = "-min";
            break;
        case "hour":
            var pos_fix = "-hr";
            break;
        case "day":
            var pos_fix = "-day";
            break;
    }
    var up_no = document.getElementById("up"+pos_fix);
    var main_no = document.getElementById("main"+pos_fix);
    var dwn_no = document.getElementById("dwn"+pos_fix);
    var dwn_no_dis = document.getElementById("dwn-dis"+pos_fix);
    var no = parseInt(main_no.innerHTML) + 1;
    if (no < 10) {
        no = "0" + no.toString();
    } else {
        no = no.toString();
    }
    dwn_no.innerHTML = no;
    document.getElementById("uwp"+pos_fix).style.animationName = "flipup";
    document.getElementById("dwn"+pos_fix).style.animationName = "flipdwn";
    document.getElementById("dwn-dis"+pos_fix).style.zIndex = "2";
    main_no.innerHTML = no;
    setTimeout(function () {
        document.getElementById("dwn-dis"+pos_fix).style.zIndex = "-1";
        dwn_no_dis.innerHTML = no;
    }, 400)
    setTimeout(function () {
        document.getElementById("uwp"+pos_fix).style.animationName = "none";
        document.getElementById("dwn"+pos_fix).style.animationName = "none";
        up_no.innerHTML = no;
    }, 800);
}


setInterval(function () { flip("day"); }, 30000);
setInterval(function () { flip("hour"); }, 20000);
setInterval(function () { flip("minute"); }, 10000);
setInterval(function () { flip("second"); }, 1000);
