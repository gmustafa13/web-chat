module.exports.ReS = function (res, data, code) { // Success Web Response
    let send_data = {};

    send_data.success = true;
    if (typeof data == 'object') {
        send_data.result = data;//merge the objects
    }
    if (typeof code !== 'undefined') res.statusCode = code;

    return res.json(send_data)
};

module.exports.TE = TE = function (res,err_message, log) { // TE stands for Throw Error
    if (log === true) {
        console.error(err_message);
        // loggers.error('Util Service TE :'+ err_message);
    }
  
   return res.json({
        statusCode: 401,
        error:err_message
    })
};
