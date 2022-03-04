module.exports = {
    // ref: https://stackoverflow.com/a/47686619/11297747
    if_eq: function (a, b, options) {
        if (a.length > 0 && b. length > 0 && a === b) {
            return options.fn(this);
        }
        return options.inverse(this);
    },

}