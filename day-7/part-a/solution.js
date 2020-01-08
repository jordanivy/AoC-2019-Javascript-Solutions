var input = [3,8,1001,8,10,8,105,1,0,0,21,34,55,68,93,106,187,268,349,430,99999,3,9,102,5,9,9,1001,9,2,9,4,9,99,3,9,1001,9,5,9,102,2,9,9,101,2,9,9,102,2,9,9,4,9,99,3,9,101,2,9,9,102,4,9,9,4,9,99,3,9,101,4,9,9,102,3,9,9,1001,9,2,9,102,4,9,9,1001,9,2,9,4,9,99,3,9,101,2,9,9,1002,9,5,9,4,9,99,3,9,101,1,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,1,9,9,4,9,99,3,9,101,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,101,1,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,1001,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,101,2,9,9,4,9,99,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,101,1,9,9,4,9,3,9,101,1,9,9,4,9,3,9,101,2,9,9,4,9,3,9,1001,9,2,9,4,9,99,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,101,1,9,9,4,9,3,9,101,1,9,9,4,9,99,3,9,101,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,101,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,99];

var numInstructions = 0;
var parseCode;
var opCode = null;
var mode = [];
var result;
var n = 0;
var final;

function intcode(programInput){
    for(var i = 0; input[i] != 99; i += numInstructions) {
        opCode = input[i];
        parseCode = input[i] && input[i].toString().length > 1? input[i].toString() : null;
        mode = [];
        if (parseCode){
            opCode = parseCode.substring(parseCode.length - 2, parseCode.length);

            for (var j = 2; j < parseCode.length; j++) {
                mode.push(parseCode.substring((parseCode.length - (j + 1)), (parseCode.length - j)));
            }
        }

        switch(parseInt(opCode)){
            case 1:
                opCodeOne(input, i, mode);
                numInstructions = 4;
                break;
            case 2:
                opCodeTwo(input, i, mode);
                numInstructions = 4;
                break;
            case 3:
                opCodeThree(input, i, programInput[n]);
                n++;
                numInstructions = 2;
                break;
            case 4:
                final = opCodeFour(input, i, mode);
                numInstructions = 2;
                break;
            case 5:
                result = opCodeFive(input, i, mode);
                if (result != null) {
                    i = result;
                    numInstructions = 0;
                } else {
                    numInstructions = 3;
                }
                break;
            case 6:
                result = opCodeSix(input, i, mode);
                if (result != null) {
                    i = result;
                    numInstructions = 0;
                } else {
                    numInstructions = 3;
                }
                break;
            case 7:
                opCodeSeven(input, i, mode);
                numInstructions = 4;
                break;
            case 8:
                opCodeEight(input, i, mode);
                numInstructions = 4;
                break;
            }
        }

        n = 0;
        return final;
}

function opCodeOne(input, i, mode){
    var pos = ((mode[2] != 1 ? input[i + 3] : i + 3));
    input[pos] = 
    ((mode[0] != 1 ? input[input[i + 1]] : input[i + 1]) 
    + ((mode[1] != 1 ? input[input[i + 2]] : input[i + 2])));
}

function opCodeTwo(input, i, mode){
    var pos = ((mode[2] != 1 ? input[i + 3] : i + 3));
    input[pos] = 
    ((mode[0] != 1 ? input[input[i + 1]] : input[i + 1]) 
    * ((mode[1] != 1 ? input[input[i + 2]] : input[i + 2])));
}

function opCodeThree(input, i, programInput){
    input[input[i + 1]] = programInput;
}

function opCodeFour(input, i, mode){
    return mode[0] != 1 ? input[input[i + 1]] : input[i + 1];
}

function opCodeFive(input, i, mode) {
    return (mode[0] != 1 ? input[input[i + 1]] : input[i + 1]) != 0 ? 
        (mode[1] != 1 ? input[input[i + 2]] : input[i + 2]) : null;
}

function opCodeSix(input, i, mode) {
    return (mode[0] != 1 ? input[input[i + 1]] : input[i + 1]) == 0 ? 
        (mode[1] != 1 ? input[input[i + 2]] : input[i + 2]) : null;
}

function opCodeSeven(input, i, mode) {
    (mode[0] != 1 ? input[input[i + 1]] : input[i + 1]) 
        < (mode[1] != 1 ? input[input[i + 2]] : input[i + 2]) ? 
        input[input[i + 3]] = 1 : input[input[i + 3]] = 0;
}

function opCodeEight(input, i, mode) {
    (mode[0] != 1 ? input[input[i + 1]] : input[i + 1]) 
        == (mode[1] != 1 ? input[input[i + 2]] : input[i + 2]) ? 
        input[input[i + 3]] = 1 : input[input[i + 3]] = 0;
}

var output = [];
var chars = [];
function getPermutations(input) {
    var i, temp;
    for (i = 0; i < input.length; i++) {
      temp = input.splice(i, 1)[0];
      chars.push(temp);
      if (input.length == 0) {
        output.push(chars.slice());
      }
      getPermutations(input);
      input.splice(i, 0, temp);
      chars.pop();
    }
    return output;
  };

var permutations = getPermutations([0,1,2,3,4]);
var finalOutputs = [];

for(var i = 0; i < permutations.length; i ++){
    var signal = 0;
    for (var j = 0; j < permutations[i].length; j++){
        signal = intcode([permutations[i][j], signal]);

        finalOutputs.push(signal);
    }
}
console.log(Math.max(...finalOutputs));