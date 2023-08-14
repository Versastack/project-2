const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    project: [{
        type: Schema.Types.ObjectId,
        ref: "Admin"
    }]
})

const User = model("User", userSchema);

module.exports = User;