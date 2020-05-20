var userModel = require("../model/userModel");
var express = require("express");
var router = express.Router();
const passport = require('passport')
const {
  TE,
  ReS
} = require('../util');

router.post('/user/save', async (req, res) => {
  try {
    const userData = await userModel.saveData(req.body);
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
    return TE(res, error.message, true)
  }
})
router.post("/register", async (req, res) => {
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
  // successRedirect: '/lendingpage',
  // failureRedirect: '/login',
  failureFlash: true
}), (req, res) => {
  if (req.user) {
    try {
      return ReS(res, {
        message: 'Successfully',
        list: req.user
      }, 200);
    } catch (error) {
      return TE(res, error.message, true)
    }
  } else {
    return TE(res, error.message, true)
  }
});
router.get('/lendingpage', async (req, res) => {
  try {
    if (req.user) {
      let listOfUser = await userModel.listOfUserExcludingMe(req.user);
      if (!listOfUser) {
        return ReS(res, {
          message: 'Successfully',
          list: []
        }, 200);
      } else {

        res.render('landingPage.ejs', {
          userData: req.user,
          abc: listOfUser
        })
        // return ReS(res, {
        //   message: 'Successfully',
        //   list: listOfUser
        // }, 200);
      }
    }
  } catch (error) {
    return TE(res, error.message, true)
  }

})
router.post('image', async (req,res) => {
  
})
router.get('/user/getAll', async (req, res) => {
  try {
    const userData = await userModel.getAll();
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
    return TE(res, error.message, true)
  }
})
module.exports = router;