const express = require('express');
//const bcryptjs = require('bcryptjs');
//const saltRounds = 10;
const mongoose = require('mongoose')
const router = express.Router();
// const User = require('../models/User.model');
const Admin = require('../models/Admin.model');

//sign-up get
router.get("/signup", (req, res, next) => {

    res.render("signup");
});

//login get
router.get("/login", (req, res, next) => {
    res.render("login");
});

//signup post
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


router.get("/dashboard/:idAdmin", (req, res, next) => {
    //change for redirect to dashboard
    res.send("pepe");
});

//login post
router.post("/login", (req, res, next) => {
    const { username, password } = req.body;
    Admin.findOne({username})
    .then((data) => {
        res.redirect(`/dashboard/${data._id}`);
    })
    .catch(err=> console.log('This error has been triggered',err)) 
});

// delete button
router.delete("/dashboard/:idAdmin/delete", (req, res) => {
    const adminId = req.params.idAdmin;
    Admin.findByIdAndDelete(adminId)

    res.send('Admin user and related workers deleted.');
  });

module.exports = router;