const mongoose = require("mongoose");
const {Schema , model} = mongoose;

const userSchema = new Schema({
    username : {
        type : String,
        required : true,
        unique : true,
        min : 4 ,
    } , 
    password : {
        type : String,
        required : true,
    }
}, {
    timestamps : true
})

const userModel = model("User" , userSchema);

module.exports = userModel;