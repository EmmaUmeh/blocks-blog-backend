
const BlogPostController = require("../controllers/BlogPostController");
const express = require("express");
const router = express.Router();


router.post("/create", BlogPostController.createPost);


module.exports = router;