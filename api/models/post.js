const mongoose = require("mongoose");
const {Schema , model} = mongoose;

const postSchema = Schema({
    title : String,
    summary : String,
    file : String,
    content : String,
    author : {
        type : Schema.Types.ObjectId ,
        ref : "User"
    }
},{
    timestamps : true
});

const postModel = model("Post" , postSchema);

module.exports = postModel

// 9daYN1sMX5Z4wqQi
// syedshaida59991