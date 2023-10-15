var a = document.getElementById("man");
var x = document.getElementById("first");
var y = document.getElementById("second");
var z = document.getElementById("third");

function theme(b) {
  if (b === 1) {
    a.style.color = "green";
    x.style.backgroundColor = "yellow";
    y.style.backgroundColor = "green";
    z.style.backgroundColor = "green";
  }
  if (b === 2) {
    a.style.color = "yellow";
    x.style.backgroundColor = "green";
    y.style.backgroundColor = "yellow";
    z.style.backgroundColor = "green";
  }
  if (b === 3) {
    a.style.color = "red";
    x.style.backgroundColor = "green";
    y.style.backgroundColor = "green";
    z.style.backgroundColor = "yellow";
  }
  sessionStorage.setItem('calc-theme', b);
}

if(sessionStorage.getItem('calc-theme') === null){
    if( window.matchMedia("(prefers-color-scheme:dark)").matches ){
    sessionStorage.setItem('calc-theme', '2');
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
