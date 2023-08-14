const express = require('express');
//const bcryptjs = require('bcryptjs');
//const saltRounds = 10;
const mongoose = require('mongoose')
const router = express.Router();
const User = require('../models/User.model');
const Admin = require('../models/Admin.model');


// GET ROUTES

// render admin in dashboard and dashboard hbs
router.get("/dashboard/:idAdmin", (req, res, next) => {
    const adminId = req.params.idAdmin;
    Admin.findById(adminId)
    .then((data) => {
        res.render("admin/admin-dashboard", {data});
    })
    .catch(err => console.log('This error has been triggered', err))
});

// delete admin
router.get("/dashboard/:idAdmin/delete", (req, res) => {
    const adminId = req.params.idAdmin;
    console.log(adminId)
    Admin.findByIdAndDelete(adminId)
    .then (() =>{
        res.redirect("/login")
    })
    .catch(err => console.log('This error has been triggered', err))
});

// go to create user page
router.get("/dashboard/:idAdmin/create", (req, res, next) => {
    const idAdmin = req.params.idAdmin
    res.render("admin/admin-create", {idAdmin})
});


// render admin user dashboard hbs
router.get("/dashboard/:idAdmin", (req, res, next) => {
    const adminId = req.params.idAdmin;
    Admin.findById(adminId)
    .then((data) => {
        res.render("admin/admin-dashboard", {data});
    })
    .catch(err => console.log('This error has been triggered', err))
});




// get it goes to user update



//POST ROUTES

// update button
router.post("/dashboard/:idAdmin/update", (req, res, next) => {
    const adminId = req.params.idAdmin;
    Admin
    .findByIdAndUpdate(adminId, req.body)
    .then(()=> {
        res.send("User updated"); 
    })
    .catch(err => console.log(Error, err))
  });

module.exports = router;

// Create user in admin dashboard

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

// create user as an admin

router.post("/dashboard/:idAdmin/create", (req, res, next) => {
    const { username, email, password, position } = req.body
    const idAdmin = req.params.idAdmin;
    console.log(username, email, password, position, idAdmin)
    User
        .create({ username, email, password, position, idAdmin })
        .then((data) => {
            console.log("New user created: ", data)
            res.redirect("/dashboard/:idAdmin/");
        })
        .catch(err => console.log('This error has been triggered', err))
});

// modify user as an admin

// router.post("/dashboard/:idAdmin/create", (req, res, next) => {
//     const { username, email, password, position } = req.body
//     const idAdmin = req.params.idUser;
//     User
//         .create({ username, email, password, position, idAdmin })
//         .then((data) => {
//             console.log("New user created: ", data)
//             res.redirect("/dashboard/:idAdmin/");
//         })
//         .catch(err => console.log('This error has been triggered', err))
// });