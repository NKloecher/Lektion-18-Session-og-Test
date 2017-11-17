function sum(max) {
    var sum = 0;
    for (var i = 1; i<= max; i++)
        sum += i;
    return sum;
}

exports.sum = sum;

