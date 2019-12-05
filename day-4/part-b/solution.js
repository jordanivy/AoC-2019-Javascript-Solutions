function findValidPasswords() {
    var validPasswords = [];
    var hits = [];
    var hits2 = [];

    for (var i = 168630; i <= 718098; i++) {
        hits = [];
        hits2 = [];
        for (var j = 0; j < 5; j++) {
            if ((i.toString().charAt(j) == i.toString().charAt(j+1))
            && (i.toString().charAt(j+1) != i.toString().charAt(j+2))
            && (i.toString().charAt(j) != i.toString().charAt(j-1))) {
                hits.push('*');
            }
            if (i.toString().charAt(j) <= i.toString().charAt(j+1)){
                hits2.push('*');
            }
        }

        if (hits.length > 0 && hits2.length == 5){
            validPasswords.push([i]);
        }
    }

    console.log("There are " + validPasswords.length + " valid passwords.");
}

findValidPasswords();