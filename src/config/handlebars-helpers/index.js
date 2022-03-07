module.exports = {
    // ref: https://stackoverflow.com/a/47686619/11297747
    if_eq: function (a, b, options) {
        if (typeof a === 'undefined' || typeof b === 'undefined') {
            return;
        }
        if (a.length > 0 && b. length > 0 && a === b) {
            return options.fn(this);
        }
        return options.inverse(this);
    },

    //https://stackoverflow.com/a/45767910/11297747
    setVar: function (varName, varValue, options) {
        options.data.root[varName] = varValue;
    },

    //https://stackoverflow.com/a/71274091/11297747
    serialNo: function (options) {
        var currentSerialNo = options.data.root['serialNo'];
        if (currentSerialNo === undefined) {
            currentSerialNo = 1;
        } else {
            currentSerialNo++;
        }

        options.data.root['serialNo'] = currentSerialNo;
        return currentSerialNo;
    }

}