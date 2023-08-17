const express = require('express');
const mongoose = require('mongoose')
const router = express.Router();
const User = require('../models/User.model');
const { isLoggedIn, sameUser } = require('../middleware/route-guard.js');

// user goes to his dashboard
router.get("/user/dashboard/:idUser", isLoggedIn, sameUser, (req, res, next) => {
    const idUser = req.params.idUser;
    User.findById(idUser)
    .then((data) => {
        res.render("user/user-dashboard", {data, connected: req.session.currentUser});
    })
    .catch(err => console.log('This error has been triggered', err))
});

module.exports = router;