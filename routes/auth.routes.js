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
                    console.log("no estas registrado");
                }
                else {
                    console.log(user, "eres usuario")
                }
            })
            
        }
        else {
            console.log(admin, "eres admin")
        }
    })
    .catch((err)=> console.log(err))
    
   
    // const user = User.findOne({ username, password });

/*     if (admin) {
        // Redirect to admin dashboard
         Admin.findOne({ username })
         .then((data) => {
            res.render('admin/admin-dashboard', {adminId: data._id});  
    })}
    
    else if (user) {
            User.findOne({ username })
            .then((data) => {
           res.render('user/user-dashboard', {userId: data._id}) }) 
        } */

        
    });


//     const { username, password } = req.body;

//     Admin.findOne({ username })
//         .then((data) => {
//             res.redirect(`/dashboard/${data._id}`);
//         })
//         .catch(err => console.log('This error has been triggered', err))
// });

// user goes to his dashboard

// router.get("/dashboard/:idUser", (req, res, next) => {
//     const idUser = req.params.idUser;
//     User.findById(idUser)
//     .then((data) => {
//         res.render("user/user-dashboard", {data});
//     })
//     .catch(err => console.log('This error has been triggered', err))
// });

// user goes back to login
// router.get("user/user-dashboard", (req, res, next) => {
//     res.redirect("/login");
// });

// router.post("/dashboard/:idAdmin/update", (req, res, next) => {
//     const adminId = req.params.idAdmin;
//     Admin.findByIdAndUpdate(adminId, req.body)
//     .then(()=> {
//         res.send("User updated"); 
//     })
//     .catch(err => console.log(Error, err))
//   });


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