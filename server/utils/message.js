const moment = require('moment');

let generateMessage = function (from, text) {
    return {
        from, text, createdAt: moment().valueOf()
    }
}

module.exports = {generateMessage}