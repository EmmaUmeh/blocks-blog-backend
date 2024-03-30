// const ethers = require('ethers');
const BlogPostArtifact = require('../../artifacts/contracts/BlogPost.sol/BlogPost.json');
// Connect to an Ethereum node
const hre = require('hardhat');
require("dotenv").config()

// const createPost = async (req, res) => {
//   const { title, content } = req.body;
//   const provider = hre.ethers.provider;
//   const wallet = new ethers.Wallet(`${process.env.PRIVATE_KEY}`, provider);
//   const signer = wallet.connect(provider);
//   const blogPostAddress = process.env.CONTRACT_ADDRESS;
//   const blogPostContract = new ethers.Contract(blogPostAddress, BlogPostArtifact.abi, signer);

//   try {
//     const tx = await blogPostContract.createPost(title, content);
//     await tx.wait();
//     res.status(200).json({ message: 'Post created successfully' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Failed to create post' });
//   }
// };

const ethers  = require("ethers");

const provider = new ethers.Contract(`${process.env.ETHEREUM_RPC_URL}`);
const contractAddress = "YOUR_BLOG_CONTRACT_ADDRESS";

const abi = [
    "function createPost(string _title, string _content)",
];

const contract = new ethers.Contract(contractAddress, abi, provider);

const createPost = async (req, res) => {
    try {
        const { title, content } = req.body;
        const transaction = await contract.createPost(title, content);
        await transaction.wait();
        res.json({ message: "Blog post created successfully" });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Error creating blog post");
    }
};


exports.getPosts = async (req, res) => {
  const provider = hre.ethers.provider;
  const blogPostAddress = process.env.CONTRACT_ADDRESS;
  const blogPostContract = new ethers.Contract(blogPostAddress, BlogPostArtifact.abi, provider);

  try {
    const postCount = await blogPostContract.postCount();
    const posts = [];

    for (let i = 1; i <= postCount; i++) {
      const post = await blogPostContract.posts(i);
      posts.push(post);
    }

    res.status(200).json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
};

module.exports= { createPost}