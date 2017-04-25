var validate = function (obj) {
    for (key in obj) {
        if (obj[key] === undefined || obj[key] == "") {
            return {
                pass: false,
                message: "your missing some data" + key
            }
        }
    }
    return true;
}

module.exports = validate;