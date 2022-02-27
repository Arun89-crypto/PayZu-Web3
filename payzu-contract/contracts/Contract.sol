//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract Transactions {
    event Transfer(
        address sender,
        address reciever,
        uint256 amount,
        string message,
        uint256 timestamp,
        string keyword
    );

    function sendTransaction(
        address payable reciever,
        uint256 amount,
        string memory message,
        string memory keyword
    ) public {
        emit Transfer(
            msg.sender,
            reciever,
            amount,
            message,
            block.timestamp,
            keyword
        );
    }
}
