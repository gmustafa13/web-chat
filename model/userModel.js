const user = require('../schema/User');

var userModel = {
    saveData: async (userInfo) => {
        console.log("userinfo",userInfo)
        let userData = new user(userInfo);
        return await userData.save();
    },
    getOne: async (userInfo) => {
        return await user.findOne({email:userInfo.email});
      },
}


module.exports = userModel;