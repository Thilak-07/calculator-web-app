let screen = document.getElementById('answer');
let buttons = document.querySelectorAll('button');
var screenValue = '';
for (item of buttons) {
    item.addEventListener('click', (e) => {
        buttonText = e.target.innerText;
        if (buttonText == 'X') {
            buttonText = '*';
            screenValue += buttonText;
            screen.value = screenValue;
        }
        else if (buttonText == 'C') {
            screenValue = "";
            screen.value = screenValue;
        }
        else if (buttonText == '=') {
            screen.value = calculate(screenValue);
            screenValue = screen.value;
        }
        else {
            screenValue += buttonText;
            screen.value = screenValue;
        }
    })
}

document.addEventListener("keydown", function(event) {
    if(event.code == "KeyX"){
        screenValue += '*';
        screen.value = screenValue;
    }
    if(event.key<=9 || event.key=='+' || event.key=='-' || event.key=='*' || event.key=='.' || event.key=='/' || event.key=='%' || event.key=='(' || event.key==')'){
        screenValue += event.key;
        screen.value = screenValue;
    }
    if(event.key == "Enter" || event.key == "=")
    {
        screen.value = calculate(screenValue);
        screenValue = screen.value;
    }
    else if(event.key == "Delete"){
        screenValue = "";
        screen.value = screenValue;
    }
    else if(event.key == "Backspace"){
        screenValue = screenValue.slice(0, -1);
        screen.value = screenValue;
    }
    else if(event.code == "KeyC"){
        screenValue = "";
        screen.value = screenValue;
    }
})

/*window.onerror = function(){
    screenValue = "";
    screenValue = "Syntax Error";
    screen.value = screenValue;
    setTimeout(function(){ screenValue = ""; screen.value = screenValue; }, 400);
}
*/

//Calculate Fuction ...........
function calculate(input) {
    var f = {
        add: '+',
        sub: '-',
        div: '/',
        mlt: '*',
        mod: '%',
        exp: '^'
        };

    f.ooo = [
        [
            [f.mlt],
            [f.div],
            [f.mod],
            [f.exp]
        ],
        [
            [f.add],
            [f.sub]
        ]
    ];
  
    input = input.replace(/[^0-9%^*\/()\-+.]/g, '');
  
    var output;
    for (var i = 0, n = f.ooo.length; i < n; i++) {
        var re = new RegExp('(\\d+\\.?\\d*)([\\' + f.ooo[i].join('\\') + '])(\\d+\\.?\\d*)');
        re.lastIndex = 0;
        while (re.test(input)) {
            output = _calculate(RegExp.$1, RegExp.$2, RegExp.$3);
            if (isNaN(output) || !isFinite(output)) 
                return output;
            input = input.replace(re, output);
        }
    }
    return output;


    function _calculate(a, op, b) {
      a = a * 1;
      b = b * 1;
      switch (op) {
        case f.add:
          return a + b;
          break;
        case f.sub:
          return a - b;
          break;
        case f.div:
          return a / b;
          break;
        case f.mlt:
          return a * b;
          break;
        case f.mod:
          return a % b;
          break;
        case f.exp:
          return Math.pow(a, b);
          break;
        default:
          null;
      }
    }
}