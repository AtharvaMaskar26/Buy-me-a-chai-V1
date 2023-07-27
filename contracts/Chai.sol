// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract Chai {
    struct Memo {
        string name;
        string message;
        uint256 timestamp;
        address from;
    }

    Memo[] memos;
    address payable owner;

    constructor() {
        owner = payable(msg.sender);
    }

    function buyChai (string calldata name, string calldata message) external payable {
        require(msg.value > 0, "You cannot send 0ETH");
        owner.transfer(msg.value);
        memos.push(Memo(name, message, block.timestamp, msg.sender));
    }

    function getMemos() public view returns (Memo[] memory) {
        return memos;
    }
}