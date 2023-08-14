const express = require('express');
//const User = require('../models/User.model');
//const bcryptjs = require('bcryptjs');
//const saltRounds = 10;
const mongoose = require('mongoose')
const router = express.Router();

/*Sign-up*/
router.get("/signup", (req, res, next) => {
    res.render("signup");
});

//login
router.get("/login", (req, res, next) => {
    res.render("login");
});


router.get("/dashboard/:idAdmin", (req, res, next) => {
    res.render("/admin");
});

// login posts


router.post("/login", (req, res, next) => {
    const { username, password } = req.body;
    res.redirect("/dashboard/:idAdmin");
});



// router.delete('/dashboard/:idadmin/delete', (req, res) => {
//     const adminId = req.params.idadmin;

//     // Delete admin user
//     // code to delete admin user goes here

//     // Delete related workers
//     // code to delete related workers goes here

//     res.send('Admin user and related workers deleted successfully.');
//   });


module.exports = router;