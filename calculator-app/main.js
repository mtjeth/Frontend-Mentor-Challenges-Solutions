var a = document.getElementById("main")
var x = document.getElementById("first");
var y = document.getElementById("second");
var z = document.getElementById("third");

function theme(b) {
  if(!(a.className==="container")){
    a.className = "container";
  }
  if (b === 1) {
    a.className+= " dark";
    document.body.style.backgroundColor = "hsl(222, 26%, 31%)";

  }
  if (b === 2) {
    a.className+= " light";
    document.body.style.backgroundColor = "hsl(0, 0%, 90%)";
  }
  if (b === 3) {
    a.className+= " violet"; 
    document.body.style.backgroundColor = "hsl(268, 75%, 9%)";
  }
  sessionStorage.setItem('calc-theme', b); 
}

if(sessionStorage.getItem('calc-theme') === null){
    if( window.matchMedia("(prefers-color-scheme:dark)").matches ){
    sessionStorage.setItem('calc-theme', '1');
    }else{
        sessionStorage.setItem('calc-theme', '2');
    }
}
theme(parseInt(sessionStorage.getItem('calc-theme')));


var operation = "0";
var store_value = 0;

function calc(input_value){
    var value = document.getElementById('display').value.toString();
    switch(input_value) {
        case "reset":
            value = "";
            store_value=0;
            break;
        case "del":
            value=value.slice(0,-1);
            break;
        case "0":
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
            value = value.replace(/,/g, "") + input_value.toString();
            value = parseFloat(value).toLocaleString("en-US")
            break;
        case ".":
            value= value +'.';
            break;
        case "+":
        case "-":
        case "*":
        case "/":
            if(value[-1]==='.'){
                value = value.slice(0,-1);
            }
            operation = input_value;
            store_value = parseFloat(value.replace(/,/g, ""));
            value = "";
            break;
        case "=":
            if(value[-1]==='.'){
                value = value.slice(0,-1);
            }
            switch(operation){
                case "0":
                    value= value;
                    break;
                case "+":
                    value = (parseFloat(value.replace(/,/g, ""))+store_value).toLocaleString("en-US");
                    break;
                case "-":
                    value = (parseFloat(value.replace(/,/g, ""))-store_value).toLocaleString("en-US");
                    break;
                case "*":
                    value = (parseFloat(value.replace(/,/g, ""))*store_value).toLocaleString("en-US");
                    break;
                case "/":
                    value = (parseFloat(value.replace(/,/g, ""))/store_value).toLocaleString("en-US");
                    break;
            }
    }
    document.getElementById('display').value = value;
}
window.addEventListener(
    "keydown",
    (event) => {
        if (event.defaultPrevented) {
          return; // Do nothing if the event was already processed
        }
    if((/^[0-9/*-+=]+$/).test(event.key)){
        calc(event.key);
    }
    if(event.key === "Backspace")
    {
        calc("del");
    }
    if(event.key === "Enter")
    {
        calc("=");
    }
    event.preventDefault();
  },
  true,
);
