
// scripts/blogpost-deploy.js

const { ethers } = require("hardhat");

async function main() {
  const BlogPostFactory = await ethers.getContractFactory("BlogPost");
  console.log("Deploying BlogPost contract...");

  // Deploy the contract (no constructor arguments needed)
  const blogPost = await BlogPostFactory.deploy();
  // await blogPost.deployed(1);

  console.log("BlogPost contract deployed to:", blogPost);
  
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

module.exports = main;