const express = require('express');
//const bcryptjs = require('bcryptjs');
//const saltRounds = 10;
const mongoose = require('mongoose')
const router = express.Router();
// const User = require('../models/User.model');
const Admin = require('../models/Admin.model');

// render admin in dashboard and dashboard hbs
router.get("/dashboard/:idAdmin", (req, res, next) => {
    const adminId = req.params.idAdmin;
    Admin.findById(adminId)
    .then((data) => {
        res.render("admin/admin-dashboard", {data});
    })
    .catch(err => console.log('This error has been triggered', err))
});

// delete button
router.get("/dashboard/:idAdmin/delete", (req, res) => {
    const adminId = req.params.idAdmin;
    console.log(adminId)
    Admin.findByIdAndDelete(adminId)
    .then (() =>{
        res.redirect("/login")
    })
    .catch(err => console.log('This error has been triggered', err))
});

module.exports = router;