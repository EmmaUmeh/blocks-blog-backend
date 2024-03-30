
const express = require("express")
const router = express.Router();


const Authroutes = require("./auth.routes")
const BlogPostroutes = require("./blogpost.routes")


router.use("/auth", Authroutes)
router.use("/blog", BlogPostroutes)



module.exports = router;