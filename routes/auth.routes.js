const express = require('express');
const bcryptjs = require('bcryptjs');
const saltRounds = 10;
const mongoose = require('mongoose')
const router = express.Router();
const Admin = require('../models/Admin.model');
const User = require('../models/User.model');
const fileUploader = require('../config/cloudinary.config');

router.get("/", (req, res, next) => {
    res.render("/", {connected: req.session.currentUser})
})

//sign-up get
router.get("/signup", (req, res, next) => {
    res.render("signup", {connected: req.session.currentUser});
});

//login get
router.get("/login", (req, res, next) => {
    res.render("login", {connected: req.session.currentUser});
});

//logout
router.post('/logout', (req, res, next) => {
    req.session.destroy(err => {
      if (err) next(err);
      res.redirect('/');
    });
});

// POST ROUTES

//signup post
router.post("/signup", fileUploader.single('image'), (req, res, next) => {
    const { username, email, password } = req.body
    if (!username || !email || !password) {
        res.render('signup', { errorMessage: 'All fields are mandatory. Please provide your username, email and password.' });
        return;
    }
    bcryptjs
        .genSalt(saltRounds)
        .then(salt => bcryptjs.hash(password, salt))
        .then(hashedPassword => {
            return Admin.create({
                    username,
                    email,
                    password: hashedPassword,
                    image : req.file?.path
                })
        })
        .then((data) => {
            console.log("New user created: ", data)
            res.redirect("/login");
        })
        .catch(err => {
            if (err instanceof mongoose.Error.ValidationError) {
                res.status(500).render('signup', { errorMessage: err.message });
            } 
            else {
                next(err);
            }
        })
});

//login post
router.post("/login", (req, res, next) => {
    const {username, password} = req.body;
    Admin.findOne({username})
    .then((admin)=> {
        if(admin === null){
            User.findOne({username})
            .then((user)=>{
                if (user === null) {
                    console.log("usuario no registrado")
                    res.render("login", { errorMessage: "User doesn't exist." });
                }
                else {
                    if(bcryptjs.compareSync(password, user.password)) {
                        req.session.currentUser = user;
                        res.redirect(`/user/dashboard/${user._id}`)
                    }
                    else{
                        console.log("User contraseña mal")
                        res.render("login", { errorMessage: "Incorrect user and/or password." });
                    }
                }
            }) 
        }
        else {
            if(bcryptjs.compareSync(password, admin.password)) {
                req.session.currentUser = admin;
                res.redirect(`/dashboard/${admin._id}`)
            }
            else{
                console.log("Admin contraseña mal")
                res.render("login", { errorMessage: "Incorrect user and/or password." });
            }
        }
    })
});

module.exports = router;