// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract BuggyToken {
    mapping(address => uint256) public balanceOf;

    function transfer(address to, uint256 amount) public {
        // ❌ Bug: doesn't check sender's balance
        balanceOf[to] += amount;
    }
}
