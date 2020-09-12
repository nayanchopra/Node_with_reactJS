const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    googleId : String,
    firstName : String,
    familyName : String
})

mongoose.model('users', userSchema);