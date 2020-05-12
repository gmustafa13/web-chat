var userModel = require("../model/userModel");
var express = require("express");
var router = express.Router();
const passport = require('passport')
const {
  TE,
  ReS
} = require('../util');

router.post('/user/save', async (req, res) => {
  console.log("user",req.userInfo)
  try {
    const userData = await userModel.saveData(req.userInfo);
    if (!userData) {
      return ReS(res, {
        message: 'Successfully',
        list: []
      }, 200);
    } else {
      return ReS(res, {
        message: 'Successfully',
        list: userData
      }, 200);
    }

  } catch (error) {
    return TE(res,error.message, true)
  }
})
router.post("/register", async (req, res) => {
  console.log('req.body',req.body)
  try {
    let userExist = await userModel.getOne(req.body);
    if (userExist) {
      res.send({
        massage: "already exist"
      });
    } else {
      let userData = await userModel.saveData(req.body);
      if (userData) {
        res.redirect("/login");
      }
    }
  } catch (error) {
    res.redirect("/signup");
  }
});
router.post("/login", passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}));
module.exports = router;