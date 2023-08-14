const express = require('express');
//const bcryptjs = require('bcryptjs');
//const saltRounds = 10;
const mongoose = require('mongoose')
const router = express.Router();
// const User = require('../models/User.model');
const Admin = require('../models/Admin.model');



/*Sign-up*/
router.get("/signup", (req, res, next) => {

    res.render("signup");
});

//login
router.get("/login", (req, res, next) => {
    res.render("login");
});

/*Sign-up POST*/
router.post("/signup", (req, res, next) => {
    const {username, email, password} = req.body
    Admin
    .create({username,email,password})
    .then((data)=>{
        console.log(data)
        res.redirect("/login");
    })
    .catch(err=> console.log('This error has been triggered',err)) 
});


module.exports = router;