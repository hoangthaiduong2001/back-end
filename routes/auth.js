const router = require("express").Router();
const passport = require("passport")
const authController = require("../controllers/authController.js");
const { verifyToken } = require("../controllers/verifyToken.js");
require("dotenv").config()
const userController = require("../controllers/userController.js");


//REGISTER
router.post("/register", authController.registerUser);
//REFRESH TOKEN
router.post("/refresh", authController.requestRefreshToken);
//LOG IN
router.post("/login", authController.loginUser);
//LOG OUT
router.post("/logout", verifyToken, authController.logOut);

//GOOGLE
router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'], session: false }));

router.get('/google/callback', (req, res, next) => {
    passport.authenticate('google', (err, profile) => {
        req.user = profile
        next()
    })(req, res, next)
}, (req, res) => {
    res.redirect(`${process.env.URL_CLIENT}/login-success/${req.user?.id}`)
})
  
router.post('/login-success' , authController.loginSuccess)

//FACEBOOK
router.get('/facebook',
  passport.authenticate('facebook', { session: false, scope: ['email'] }));

router.get('/facebook/callback', (req, res, next) => {
    passport.authenticate('facebook', (err, profile) => {
        req.user = profile
        next()
    })(req, res, next)
}, (req, res) => {
    res.redirect(`${process.env.URL_CLIENT}/login-facebook/${req.user?.id}`)
    console.log(req.user)
})
  
router.post('/login-facebook' , authController.loginSuccess)



module.exports = router;