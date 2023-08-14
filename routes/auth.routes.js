const express = require('express');
const router = express.Router();

/*Sign-up*/
router.get("/signup", (req, res, next) => {
    res.render("signup");
});

//login
router.get("/login", (req, res, next) => {
    res.render("login");
});


module.exports = router;