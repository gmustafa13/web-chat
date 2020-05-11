const base64 = require('base-64');
module.exports = async (req, res, next) => {
    console.log("req.body",req.body)
    let userInfo = {};
    let incomingData = base64.decode(req.body.encodedData);
    req.userInfo = JSON.parse(incomingData);
    next()
}
// module.exports.decodeData = decodeData

