const express = require('express');
//const bcryptjs = require('bcryptjs');
//const saltRounds = 10;
const mongoose = require('mongoose')
const router = express.Router();
const User = require('../models/User.model');
const Admin = require('../models/Admin.model');


// GET ROUTES

// render admin in dashboard and dashboard user
router.get("/dashboard/:idAdmin", (req, res, next) => {
    const adminId = req.params.idAdmin;  
    Admin.findById(adminId)
    .then((data) => {
        User.find({administrator : adminId})
        .then((allUsers) => {
            res.render("admin/admin-dashboard", {data , allUsers})
        })
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

//GET to admin-user-dashboard and user render, see user created by an admin
router.get("/dashboard/:idAdmin/:idUser", (req, res, next) => {
    const userId = req.params.idUser;

    User.findById(userId)
    .then((userData) => {
        res.render("admin/admin-user-dashboard", {userData});
    })
    .catch(err => console.log('This error has been triggered', err))
});

// go to update user page

router.get("/dashboard/:idAdmin/:idUser/update", (req, res, next) => {
    const userId = req.params.idUser
    User.findById(userId)
    .then((userData) => {
        res.render("admin/admin-user-update", {userData});
    })
    .catch(err => console.log('This error has been triggered', err))
});

//POST

// create user as an admin
router.post("/dashboard/:idAdmin/create", (req, res, next) => {
    const { username, email, password, position } = req.body
    const administrator = req.params.idAdmin;
    console.log(username, email, password, position, administrator)
    User
        .create({ username, email, password, position, administrator })
        .then((data) => {
            console.log("New user created: ", data)
            res.redirect(`/dashboard/${administrator}`);
        })
        .catch(err => console.log('This error has been triggered', err))
});

// modify user as an admin

router.post("/dashboard/:idAdmin/:idUser/update", (req, res, next) => {
    const { username, email, password, position } = req.body
    const userId = req.params.idUser;
    User
    .findByIdAndUpdate(userId, {
        username: username,
        email: email,
        password: password,
        position: position
    })
        .then((data) => {
            console.log(" User modified: ", data)
            res.redirect(`/dashboard/${data.administrator}`);
        })
        .catch(err => console.log('This error has been triggered', err))
});

//POST ROUTES

// update button
// router.post("/dashboard/:idAdmin/update", (req, res, next) => {
//     const adminId = req.params.idAdmin;
//     Admin
//     .findByIdAndUpdate(adminId, req.body)
//     .then(()=> {
//         res.send("User updated"); 
//     })
//     .catch(err => console.log(Error, err))
//   });
module.exports = router;