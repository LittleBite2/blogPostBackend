const express = require("express")
const mongoose = require("mongoose")
const Post = require("./blogPostModel")
const cors = require("cors")
const app = express()
require('dotenv').config()
app.get("/",(req,res)=>{
    res.send("Hello World")
})


mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("database connected successfully")
    })

    .catch((err) => {
        console.log("something went wrong")
    })
app.use(cors())

app.use(express.json());


//create blog post

app.post("/posts", async (req, res) => {
    try {
        const { title, description, author } = req.body
        const postData = await Post.create({
            title, description, author
        })
        res.status(200).json(postData)
    } catch (err) {
        res.status(500).json({
            message: "post not saved",
            error: err.message
        })
    }
})

app.get("/", (req, res) => {
    res.send("welcome")
})


//readblog post all
app.get("/posts", async (req, res) => {
    try {
        const allPosts = await Post.find().select("-createdAt -updatedAt -__v");
        res.status(201).json(allPosts)
    } catch (err) {
        res.status(500).json({
            message: "fetching post failed",
            error: err.message
        })
    }
})

//specific id fetching
app.get("/posts/:id", async (req, res) => {
    try {
        const id = req.params.id
        const singlePost = await Post.findById(id).select("-createdAt -updatedAt -__v");
        res.status(201).json(singlePost)
    } catch (err) {
        res.status(500).json({
            message: "fetching single post failed",
            error: err.message
        })
    }
})

//delete by id

app.delete("/posts/:id", async (req, res) => {
    try {
        const id = req.params.id
        const deletePost = await Post.findByIdAndDelete(id);
        if (!deletePost) return  res.status(404).json({ message: "post not found" })

       
        res.json().json({ message: "post deleted successfully" })
    } catch (err) {
        res.status(500).json({
            message: " error delete single post failed",
            error: err.message
        })
    }
})


//update data

app.put("/posts/:id", async (req, res) => {
    try {
        const { title, description, author } = req.body
        const id = req.params.id
        const updatePost = await Post.findByIdAndUpdate(id, { title, description, author }, { new: true });
        res.status(201).json(updatePost)
    } catch (err) {
        res.status(500).json({
            message: "update post failed",
            error: err.message
        })
    }
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`)
});