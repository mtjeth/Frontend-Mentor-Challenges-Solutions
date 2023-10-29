var today = new Date(); 
var deadline = new Date(2023,11,12);

var countdown = new Date(deadline - today);

flip("second",countdown.getUTCSeconds());
flip("minute",countdown.getUTCMinutes());
flip("hour",countdown.getUTCHours());
flip("day",countdown.getUTCDate()); 

var a = 0 ;
setInterval(function () { 
    var start = new Date(); 
    flip("second"); 
    var stop = new Date(); 
    a = stop-start;
}, 1000-a);



function flip(hand, no=null) { 
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
    var dn_no = document.getElementById("dn"+pos_fix);
    var dn_no_dis = document.getElementById("dn-dis"+pos_fix);
    if(no === null){
        no = parseInt(main_no.innerHTML) - 1;
    }else{
        no = parseInt(no);
    }
    if(no === -1){
        switch (pos_fix){
            case "-sec":
              flip("minute");
              no = 59;
              break;
            case "-min":
              flip("hour");
              no = 59;
              break;
            case "-hr":
              flip("day");
              no =23;
              break;
          }
    }else {
        if (no < 10) {
            no = "0" + no.toString();
        } else {
            no = no.toString();
          }
    }

    dn_no.innerHTML = no;
    document.getElementById("uwp"+pos_fix).style.animationName = "flipup";
    document.getElementById("dwn"+pos_fix).style.animationName = "flipdwn";
    document.getElementById("dwn-dis"+pos_fix).style.zIndex = "2";
    main_no.innerHTML = no;
    setTimeout(function () {
        document.getElementById("dwn-dis"+pos_fix).style.zIndex = "-1";
        dn_no_dis.innerHTML = no;
    }, 500)
    setTimeout(function () {
        document.getElementById("uwp"+pos_fix).style.animationName = "none";
        document.getElementById("dwn"+pos_fix).style.animationName = "none";
        up_no.innerHTML = no;
    }, 800);
  }
 