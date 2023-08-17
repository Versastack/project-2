const express = require('express');
const bcryptjs = require('bcryptjs');
const saltRounds = 10;
const mongoose = require('mongoose')
const router = express.Router();
const User = require('../models/User.model');
const Admin = require('../models/Admin.model');
const { isLoggedIn, isUser, sameAdmin } = require('../middleware/route-guard.js');
const fileUploader = require('../config/cloudinary.config');
// All middlewares: isLoggedIn, isUser
// GET ROUTES

// render admin in dashboard and dashboard user
router.get("/dashboard/:idAdmin", isLoggedIn, isUser, sameAdmin, (req, res, next) => {
    const adminId = req.params.idAdmin;  
    Admin.findById(adminId)
    .then((data) => {
        User.find({administrator : adminId})
        .then((allUsers) => {
            res.render("admin/admin-dashboard", {data , allUsers, connected: req.session.currentUser})
        })
    })
    .catch(err => console.log('This error has been triggered', err))
});

// delete admin and all users realted to it
router.get("/dashboard/:idAdmin/delete", isLoggedIn, isUser, sameAdmin, (req, res) => {
    const adminId = req.params.idAdmin;
    Admin.findByIdAndDelete(adminId)
    .then (() =>{
        User.deleteMany({administrator : adminId})
        .then (() =>{
        req.session.destroy(err => {
            if (err) next(err);
            res.redirect('/');
            });
        })
    })
    .catch(err => console.log('This error has been triggered', err))
});

// go to create user page
router.get("/dashboard/:idAdmin/create", isLoggedIn, isUser, sameAdmin, (req, res, next) => {
    const idAdmin = req.params.idAdmin
    res.render("admin/admin-create", {idAdmin, connected: req.session.currentUser})
});

//go to modify admin
router.get("/dashboard/:idAdmin/update", isLoggedIn, isUser, sameAdmin, (req, res, next) => {
    const idAdmin = req.params.idAdmin
    res.render("admin/admin-update", {idAdmin, connected: req.session.currentUser})
});

//GET to admin-user-dashboard and user render, see user created by an admin
router.get("/dashboard/:idAdmin/:idUser", isLoggedIn, isUser, sameAdmin, (req, res, next) => {
    const userId = req.params.idUser;
    User.findById(userId)
    .then((userData) => {
        res.render("admin/admin-user-dashboard", {userData, connected: req.session.currentUser});
    })
    .catch(err => console.log('This error has been triggered', err))
});

// go to update user page
router.get("/dashboard/:idAdmin/:idUser/update", isLoggedIn, isUser, sameAdmin, (req, res, next) => {
    const userId = req.params.idUser
    User.findById(userId)
    .then((userData) => {
        res.render("admin/admin-user-update", {userData, connected: req.session.currentUser});
    })
    .catch(err => console.log('This error has been triggered', err))
});

// delete user from admin
router.get("/dashboard/:idAdmin/:idUser/delete", isLoggedIn, isUser, sameAdmin, (req, res, next) => {
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
router.post("/dashboard/:idAdmin/create", fileUploader.single('image'), (req, res, next) => {
    const { username, email, password, position } = req.body
    const administrator = req.params.idAdmin;
    if (!username || !email || !password) {
        res.render("admin/admin-create", {idAdmin: administrator, errorMessage: 'These fields are mandatory. Please provide your username, email and password.' });
        return;
    }
    bcryptjs
        .genSalt(saltRounds)
        .then(salt => bcryptjs.hash(password, salt))
        .then(hashedPassword => {
            return User.create({
                    username,
                    email,
                    password: hashedPassword,
                    position,
                    image: req.file?.path,
                    administrator
                })
        })
        .then((data) => {
            console.log("New user created: ", data)
            res.redirect(`/dashboard/${administrator}`);
        })
        .catch(err => {
            if (err instanceof mongoose.Error.ValidationError) {
                res.status(500).render('admin/admin-create', {idAdmin: administrator, errorMessage: err.message });
            } 
            else {
                next(err);
            }
        })
});

//update admin profile
router.post("/dashboard/:idAdmin/update", fileUploader.single('image'), (req, res, next) => {
    const { username, email, password, position } = req.body
    const adminId = req.params.idAdmin
    bcryptjs
        .genSalt(saltRounds)
        .then(salt => bcryptjs.hash(password, salt))
        .then(hashedPassword => {
        return Admin.findByIdAndUpdate(adminId, {
            username: username,
            email: email,
            password: hashedPassword,
            image: req.file?.path
            })
        })
        .then((data) => {
            console.log(" User modified: ", data)
            res.redirect(`/dashboard/${data._id}`);
        })
        .catch(err => console.log('This error has been triggered', err))
    });

// modify user as an admin
router.post("/dashboard/:idAdmin/:idUser/update", fileUploader.single('image'), (req, res, next) => {
    const { username, email, password, position } = req.body
    const userId = req.params.idUser;
    bcryptjs
        .genSalt(saltRounds)
        .then(salt => bcryptjs.hash(password, salt))
        .then(hashedPassword => {
        return User.findByIdAndUpdate(userId, {
            username: username,
            email: email,
            password: hashedPassword,
            position: position,
            image: req.file?.path
            })
        })
        .then((data) => {
            console.log(" User modified: ", data)
            res.redirect(`/dashboard/${data.administrator}`);
        })
        .catch(err => console.log('This error has been triggered', err))
});

module.exports = router;