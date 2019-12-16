var input = [3,225,1,225,6,6,1100,1,238,225,104,0,1101,37,61,225,101,34,121,224,1001,224,-49,224,4,224,102,8,223,223,1001,224,6,224,1,224,223,223,1101,67,29,225,1,14,65,224,101,-124,224,224,4,224,1002,223,8,223,101,5,224,224,1,224,223,223,1102,63,20,225,1102,27,15,225,1102,18,79,224,101,-1422,224,224,4,224,102,8,223,223,1001,224,1,224,1,223,224,223,1102,20,44,225,1001,69,5,224,101,-32,224,224,4,224,1002,223,8,223,101,1,224,224,1,223,224,223,1102,15,10,225,1101,6,70,225,102,86,40,224,101,-2494,224,224,4,224,1002,223,8,223,101,6,224,224,1,223,224,223,1102,25,15,225,1101,40,67,224,1001,224,-107,224,4,224,102,8,223,223,101,1,224,224,1,223,224,223,2,126,95,224,101,-1400,224,224,4,224,1002,223,8,223,1001,224,3,224,1,223,224,223,1002,151,84,224,101,-2100,224,224,4,224,102,8,223,223,101,6,224,224,1,224,223,223,4,223,99,0,0,0,677,0,0,0,0,0,0,0,0,0,0,0,1105,0,99999,1105,227,247,1105,1,99999,1005,227,99999,1005,0,256,1105,1,99999,1106,227,99999,1106,0,265,1105,1,99999,1006,0,99999,1006,227,274,1105,1,99999,1105,1,280,1105,1,99999,1,225,225,225,1101,294,0,0,105,1,0,1105,1,99999,1106,0,300,1105,1,99999,1,225,225,225,1101,314,0,0,106,0,0,1105,1,99999,108,677,677,224,1002,223,2,223,1006,224,329,101,1,223,223,1107,677,226,224,102,2,223,223,1006,224,344,101,1,223,223,8,677,677,224,1002,223,2,223,1006,224,359,101,1,223,223,1008,677,677,224,1002,223,2,223,1006,224,374,101,1,223,223,7,226,677,224,1002,223,2,223,1006,224,389,1001,223,1,223,1007,677,677,224,1002,223,2,223,1006,224,404,1001,223,1,223,7,677,677,224,1002,223,2,223,1006,224,419,1001,223,1,223,1008,677,226,224,1002,223,2,223,1005,224,434,1001,223,1,223,1107,226,677,224,102,2,223,223,1005,224,449,1001,223,1,223,1008,226,226,224,1002,223,2,223,1006,224,464,1001,223,1,223,1108,677,677,224,102,2,223,223,1006,224,479,101,1,223,223,1108,226,677,224,1002,223,2,223,1006,224,494,1001,223,1,223,107,226,226,224,1002,223,2,223,1006,224,509,1001,223,1,223,8,226,677,224,102,2,223,223,1006,224,524,1001,223,1,223,1007,226,226,224,1002,223,2,223,1006,224,539,1001,223,1,223,107,677,677,224,1002,223,2,223,1006,224,554,1001,223,1,223,1107,226,226,224,102,2,223,223,1005,224,569,101,1,223,223,1108,677,226,224,1002,223,2,223,1006,224,584,1001,223,1,223,1007,677,226,224,1002,223,2,223,1005,224,599,101,1,223,223,107,226,677,224,102,2,223,223,1005,224,614,1001,223,1,223,108,226,226,224,1002,223,2,223,1005,224,629,101,1,223,223,7,677,226,224,102,2,223,223,1005,224,644,101,1,223,223,8,677,226,224,102,2,223,223,1006,224,659,1001,223,1,223,108,677,226,224,102,2,223,223,1005,224,674,1001,223,1,223,4,223,99,226];
var numInstructions = 0;
var parseCode;
var opCode = null;
var mode = [];
var result;

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
                opCodeThree(input, i, programInput);
                numInstructions = 2;
                break;
            case 4:
                opCodeFour(input, i, mode);
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
    console.log(mode[0] != 1 ? input[input[i + 1]] : input[i + 1]);
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

intcode(5);