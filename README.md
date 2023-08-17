# Project 2 (Ticket & workers System)

## The team (Joan, Juan David, Yago)

### LET'S EXPLAIN VERSASTACK

[Link to VersaStack](https://versastack.adaptable.app)

VersaStack is a web application that works as an administration panel where you can have different collaborators on your project.

As you can see, in the wireframe there are some sections highlited on **GREEN**, those sections are optional. At the beginning, we wanted to add them to be part of the project but we did not have enough time to implement them.

These are some basic things to know about VersaStack:

- When you sign up as a new user you ONLY can do it as an **Admin** (_that is because the users related to one project can only be created by the admin_).

- Every admin will have only one project related to their **ID**.

- Whenever you want to login on VersaStack, you will have the same portal. In the backend, the POST method will check if you are an **Admin or a User**.

- In the **Admin dashboard**, you can see every worker you have on your project with some of their data (\*if you want to see all details of the user you can click on **see details\***); your info as an admin; you can modify your own profile, create a new user that **it's not an admin** and delete your project with every collaborator related to it.

- If you click on **see details** in a worker's profile, you will see all their information, modify the data of that user and delete the profile.

- Now we can talk about login as an username, doing this you will only see your data, keeping in mind, that you are not an admin and cannot modify any aspect of the project.

### Wireframe

[Link to excalidraw](https://excalidraw.com/#json=2b6py-mhfn2U_T7fcmX2r,sxv8ar3zYy-BIiZHUI0fHQ)
![excalidraw frameware](./src-readme/frameware.png)

### Project prezi

[Link to Prezi](https://prezi.com/view/0xfum7ALju1bEMHmLPYv/)

### Languages, frameworks & libraries:

- HTML
- CSS
- JS
- Express
- Express-sessions
- Cookie-parser
- Mongoose
- MongoDB
- DOTENV
- HBS
- Bcriptjs
- Cloudinary
- Multer
- Multer-storage-cloudinary

### Routes

| Route                                | HTTP Verb | Description                                                                                                      |
| ------------------------------------ | --------- | ---------------------------------------------------------------------------------------------------------------- |
| `/`                                  | GET       | It goes to the home page                                                                                         |
| `/signup`                            | GET       | It goes to the signup page                                                                                       |
| `/signup`                            | POST      | It creates a new user on our DB                                                                                  |
| `/login`                             | GET       | It goes to the login page                                                                                        |
| `/login`                             | POST      | It checks if the user exits, starts the session of it on our website and redirect them on to the admin dashboard |
| `/user/dashboard/:iduser`            | GET       | It goes to the user dashboard                                                                                    |
| `/dashboard/:idadmin`                | GET       | It goes to the admin dashboard                                                                                   |
| `/dashboard/:idadmin/delete`         | POST      | It deletes the admin user and every worker from in relation with that admin                                      |
| `/dashboard/:idadmin/:iduser`        | GET       | It shows the user information                                                                                    |
| `/dashboard/:idadmin/:iduser/create` | GET       | It goes to the user form creator using the create user button                                                    |
| `/dashboard/:idadmin/:iduser/create` | POST      | It creates the user with the form inputs using the create uset button                                            |
| `/dashboard/:idadmin/:iduser/update` | GET       | It goes to a form with the user data where you can modify it                                                     |
| `/dashboard/:idadmin/:iduser/update` | POST      | It updates the user with the modyfied fields in the form                                                         |
| `/dashboard/:idadmin/:iduser/delete` | POST      | It deletes the user detected                                                                                     |

### FIRST MODELS

- User

  - username : {
    type: String,
    required: true}
  - email : {
    type: String,
    required: true}
  - password :
    {type: String,
    required: true}

- Admin
  - username : {
    type: String,
    required: true}
  - email : {
    type: String,
    required: true}
  - password :
    {type: String,
    required: true}
  - collaborators : [{
    type: Schema.Types.ObjectId,
    ref: "User"
    }]
