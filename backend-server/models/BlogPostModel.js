const mongoose = require("mongoose")

const BlogPostSchema = new mongoose.Schema({
    title: String,
    content: String,
})

const BlogPosts = mongoose.model('Users', BlogPostSchema)

module.exports = BlogPosts;