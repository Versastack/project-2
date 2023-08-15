const express = require('express');
const bcryptjs = require('bcryptjs');
const saltRounds = 10;
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

// delete admin and all users realted to it
router.get("/dashboard/:idAdmin/delete", (req, res) => {
    const adminId = req.params.idAdmin;
    Admin.findByIdAndDelete(adminId)
    .then (() =>{
        User.deleteMany({administrator : adminId})
        .then(() => {
            res.redirect("/login")
        })
    })
    .catch(err => console.log('This error has been triggered', err))
});

// go to create user page
router.get("/dashboard/:idAdmin/create", (req, res, next) => {
    const idAdmin = req.params.idAdmin
    res.render("admin/admin-create", {idAdmin})
});

//go to modify admin
router.get("/dashboard/:idAdmin/update", (req, res, next) => {
    const idAdmin = req.params.idAdmin
    res.render("admin/admin-update", {idAdmin})
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

// delete user from admin
router.get("/dashboard/:idAdmin/:idUser/delete", (req, res, next) => {
    const adminId = req.params.idAdmin;
    const userId = req.params.idUser;
    User.findByIdAndDelete(userId)
    .then (() =>{
        res.redirect(`/dashboard/${adminId}`)
    })
    .catch(err => console.log('This error has been triggered', err))
});

//POST

// create user as an admin
router.post("/dashboard/:idAdmin/create", (req, res, next) => {
    const { username, email, password, position } = req.body
    const administrator = req.params.idAdmin;
    bcryptjs
        .genSalt(saltRounds)
        .then(salt => bcryptjs.hash(password, salt))
        .then(hashedPassword => {
            return User.create({
                    username,
                    email,
                    password: hashedPassword,
                    position,
                    administrator
                })
        })
        .then((data) => {
            console.log("New user created: ", data)
            res.redirect(`/dashboard/${administrator}`);
        })
        .catch(err => console.log('This error has been triggered', err))
    // User
    //     .create({ username, email, password, position, administrator })
    //     .then((data) => {
    //         console.log("New user created: ", data)
    //         res.redirect(`/dashboard/${administrator}`);
    //     })
    //     .catch(err => console.log('This error has been triggered', err))
});

//update admin profile
router.post("/dashboard/:idAdmin/update", (req, res, next) => {
    const { username, email, password, position } = req.body
    const adminId = req.params.idAdmin
    Admin
    .findByIdAndUpdate(adminId, {
        username: username,
        email: email,
        password: password,
        position: position
    })
        .then((data) => {
            console.log(" User modified: ", data)
            res.redirect(`/dashboard/${data._id}`);
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


module.exports = router;