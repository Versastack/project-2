const express = require('express');
//const bcryptjs = require('bcryptjs');
//const saltRounds = 10;
const mongoose = require('mongoose')
const router = express.Router();
// const User = require('../models/User.model');
const Admin = require('../models/Admin.model');



// GET ROUTES

//sign-up get
router.get("/signup", (req, res, next) => {

    res.render("signup");
});

//login get
router.get("/login", (req, res, next) => {
    res.render("login");
});



//GET to admin-user-dashboard and user render

//  router.get("/dashboard/:idAdmin/:idUser", (req, res, next) => {
//      const userId = req.params.idUser;
    
//      User.findById(userId)
//      .then((userData) => {
//          res.render("admin/admin-user-dashboard", {userData});
//      })
//      .catch(err => console.log('This error has been triggered', err))
//  });

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
    const { username, password } = req.body;
    Admin.findOne({ username })
        .then((data) => {
            res.redirect(`/dashboard/${data._id}`);
        })
        .catch(err => console.log('This error has been triggered', err))
});



router.post("/dashboard/:idAdmin/update", (req, res, next) => {
    const adminId = req.params.idAdmin;
    Admin.findByIdAndUpdate(adminId, req.body)
    .then(()=> {
        res.send("User updated"); 
    })
    .catch(err => console.log(Error, err))
  });


//  delete user
// route.post("/dashboard/:idAdmin/:idUser/delete", (req, res, next)=> {
//     const idAdmin = req.params.idAdmin
//     const idUser = req.params.idUser;
// Admin.findByIdAndDelete(idUser, req.body)
//     .then(()=> {
//         res.send("User deleted"); 
//     })
//     .catch(err => console.log(Error, err))


// })







module.exports = router;