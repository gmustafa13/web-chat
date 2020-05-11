const mongoose = require('mongoose');
const schema = mongoose.Schema;

const massages = new schema({
    massage: {
        type:String
    },
    user: {
        type: schema.Types.ObjectId
    },
    toUser: {
        type:schema.Types.ObjectId
    }
})

module.exports = mongoose.Model("massages", massages);