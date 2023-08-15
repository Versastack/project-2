const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
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
        type: String,
        lowercase: true,
    },
    image: {
        type: String
    },
    administrator: {
        type: Schema.Types.ObjectId,
        ref: "Admin"
    }
    
})

const User = mongoose.model("User", userSchema);

module.exports = User;