// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

contract BlogPost {
    struct Post {
        uint256 id;
        address payable author;
        string title;
        string content;
        uint256 timestamp;
    }

    mapping(uint256 => Post) public posts;
    uint256 public postCount;

    event PostCreated(uint256 id, address author, string title, uint256 timestamp);

    function createPost(string memory _title, string memory _content) public {
        postCount++;
        posts[postCount] = Post(postCount, payable(msg.sender), _title, _content, block.timestamp);
        emit PostCreated(postCount, msg.sender, _title, block.timestamp);
    }
}