const express = require("express");
const cors = require("cors");
const mongoose  = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("./models/user");
const Post = require("./models/post")
const app = express();
const cookieParser = require("cookie-parser");
const multer  = require('multer');
const fs = require("fs");

const salt = bcrypt.genSaltSync(10);
const secret = "frwhlfwfyyg1234";
const uploadMiddleware = multer({ dest: 'uploads/' })


app.use(cors({credentials : true , origin : "http://localhost:3000"}));
app.use(express.json());
app.use(cookieParser());
app.use("/uploads" , express.static(__dirname + "/uploads"))

mongoose.connect("mongodb+srv://syedshaida:sGOEt44WywdUVtmX@cluster0.rsviwax.mongodb.net/")

app.get("/" , (req,res) => {
    res.json("Homepage");
})

app.post("/api/user/register" , async(req,res) => {
    const {username , password} = req.body;
    try{
        const userData = await User.create({
            username ,
             password : bcrypt.hashSync(password , salt)
            })
        res.json(userData);
    }catch(e){
        res.status(400).json(e);
    }
})

app.post("/api/user/login" , async (req,res) => {
    const {username , password} = req.body;
    try{
        const userDoc = await User.findOne({username});
        const isUserValid = bcrypt.compareSync(password , userDoc.password)
        if(isUserValid) {
            jwt.sign({username , id : userDoc._id} , secret , {} , (err , token) =>{
                if (err) throw err
                res.cookie("token" , token).json({
                    id : userDoc._id,
                    username
                })
            })
        } else{
            res.status(400).json("wrong credentials")
        }
    }catch(e) {
        res.status(400).json(e)
    }
})

app.get("/profile" , ((req,res) => {
    const {token} = req.cookies;
    jwt.verify(token , secret , {} , (err,info) => {
        if(err) throw err;
        res.json(info)
    })
}))

app.post("/logout" , ((req,res) => {
    res.cookie("token" , "").json("logout ok")
}))

app.post("/post" , uploadMiddleware.single("file") , async (req,res) => {
    const {originalname , path} = req.file;
    const {title , summary , content } = req.body;
    const imageParts = originalname.split(".");
    const extension = imageParts[imageParts.length - 1];
    const newPath = path + "." + extension
    fs.renameSync(path , newPath );

    const {token} = req.cookies;
    jwt.verify(token , secret , {} , async (err,info) => {
        if(err) throw err;
        const postDoc = await Post.create({
            title,
            summary,
            content,
            file : newPath,
            author : info.id
        })
        res.json({postDoc : postDoc})

    })
})

app.get("/posts" ,async (req,res) => {
    const posts = await Post.find().populate("author" , ["username"]).sort({createdAt : - 1})
    res.json({posts:posts})
})

app.get("/post/:postId" , async (req,res) => {
    const {postId} = req.params;
    const postDoc = await Post.findById(postId).populate("author" , ["username"])
    res.json(postDoc)
})

app.listen(4000 , () => {
    console.log("app running on port 4000")
})