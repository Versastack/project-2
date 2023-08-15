const express = require('express');
const mongoose = require('mongoose')
const router = express.Router();
const User = require('../models/User.model');

// user goes to his dashboard
router.get("/user/dashboard/:idUser", (req, res, next) => {
    const idUser = req.params.idUser;
    User.findById(idUser)
    .then((data) => {
        res.render("user/user-dashboard", {data});
    })
    .catch(err => console.log('This error has been triggered', err))
});

module.exports = router;