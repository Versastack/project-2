const express = require('express');
//const bcryptjs = require('bcryptjs');
//const saltRounds = 10;
const mongoose = require('mongoose')
const router = express.Router();
// const User = require('../models/User.model');
const Admin = require('../models/Admin.model');
const User = require('../models/User.model');

// GET ROUTES

//sign-up get
router.get("/signup", (req, res, next) => {
    res.render("signup");
});

//login get
router.get("/login", (req, res, next) => {
    res.render("login");
});

// POST OUTES

//signup post
router.post("/signup", (req, res, next) => {
    const { username, email, password } = req.body
    Admin
        .create({ username, email, password })
        .then((data) => {
            console.log("New user created: ", data)
            res.redirect("/login");
        })
        .catch(err => console.log('This error has been triggered', err))
});

//login post
router.post("/login", (req, res, next) => {
    const {username, password} = req.body;
    // THIS IS ASYNC, admin takes a while to be defined, we need a then
    console.log(username, password);
    Admin.findOne({ username, password })
    .then((admin)=> {
        if(admin === null){
            User.findOne({ username, password })
            .then((user)=>{
                if (user === null) {
                    console.log("usuario no registrado")
                }
                else {
                    //if user redirect to user dashboard
                    res.redirect(`/user/dashboard/${user._id}`)
                }
            })
            
        }
        else {
            //if admin redirect to admin dashboard
            res.redirect(`/dashboard/${admin._id}`)
        }
    })
    .catch((err)=> console.log(err))
});

module.exports = router;