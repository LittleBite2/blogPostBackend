const mongoose = require("mongoose")
const postSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            require: true
        },
        description: String,
        author: {
            type: String,
            require: true
        }
    },
    {
        timestamps: true
    })

const Post = mongoose.model("Post", postSchema)
module.exports = Post
