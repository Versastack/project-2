const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    position: {
        type: String
    },
    administrator: {
        type: Schema.Types.ObjectId,
        ref: "Admin"
    }
})

const User = model("User", userSchema);

module.exports = User;