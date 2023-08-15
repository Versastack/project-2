// modify user as an admin

 router.post("/dashboard/:idAdmin/update", (req, res, next) => {
     const { username, email, password, position } = req.body
     const userId = req.params.idUser;
     User
     User
     .findByIdAndUpdate(userId, {
         username: username,
         email: email,
         password: password,
         position: position
     })
         .then((data) => {
             console.log(" User modified: ", data)
             res.redirect("/dashboard/:idAdmin/");
         })
         .catch(err => console.log('This error has been triggered', err))
 });