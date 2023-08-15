const Admin = require('../models/Admin.model');

const isLoggedIn = (req, res, next) => {
    if (!req.session.currentUser) {
        return res.redirect('/login');
    }
    next();
};

const isUser = (req, res, next) => {
    Admin.findById(req.session.currentUser)
        .then((data) => {
            if (data === null) {
                return res.redirect(`/user/dashboard/${req.session.currentUser._id}`)
            }
            next();
        })
}

const sameUser = (req, res, next) => {
    if (req.session.currentUser._id !== req.params.idUser) {
        res.redirect(`/user/dashboard/${req.session.currentUser._id}`)
    } else {
        next();
    }
}

const sameAdmin = (req, res, next) => {
    if (req.session.currentUser._id !== req.params.idAdmin) {
        res.redirect(`/dashboard/${req.session.currentUser._id}`)
    } else {
        next();
    }
}

module.exports = {
    isLoggedIn,
    isUser,
    sameUser,
    sameAdmin
};




