const user = require('../schema/User');

var userModel = {
    saveData: async (userInfo) => {
        if (userInfo.conformPassword) {
            delete userInfo.conformPassword
        }
        let userData = new user(userInfo);
        return await userData.save();
    },
    getOne: async (userInfo) => {
        return await user.findOne({email:userInfo.email});
    },
    listOfUserExcludingMe: async (userData) => {
        return await user.find({email:{$ne:userData.email}})
    },
    getAll: async () => {
        return await user.find();
    }
}


module.exports = userModel;