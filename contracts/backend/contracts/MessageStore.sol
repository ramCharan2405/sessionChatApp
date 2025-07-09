// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./SpamToken.sol";
import "./GroupManager.sol";

/// @title MessageStore - Decentralized message storage for EtherChat (upgraded)
contract MessageStore {
    struct Message {
        address sender;
        address receiver;
        bytes32 hash;
        uint256 timestamp;
        bool isGroup;
        uint256 groupId;
    }

    mapping(address => mapping(address => Message[])) private directMessages;
    mapping(uint256 => Message[]) private groupMessages;

    SpamToken public spamToken;
    GroupManager public groupManager;
    uint256 public messageFee = 1e18; // 1 SPAM token per message

    event DirectMessageSent(address indexed from, address indexed to, bytes32 hash, uint256 timestamp);
    event GroupMessageSent(address indexed from, uint256 indexed groupId, bytes32 hash, uint256 timestamp);

    constructor(address _spamToken, address _groupManager) {
        spamToken = SpamToken(_spamToken);
        groupManager = GroupManager(_groupManager);
    }

    /// @notice Send a direct message (requires token payment)
    function sendDirectMessage(address to, bytes32 hash) external {
        require(to != address(0), "Invalid receiver");
        require(hash != bytes32(0), "Invalid hash");
        require(spamToken.transferFrom(msg.sender, address(this), messageFee), "Token payment failed");
        Message memory msgObj = Message({
            sender: msg.sender,
            receiver: to,
            hash: hash,
            timestamp: block.timestamp,
            isGroup: false,
            groupId: 0
        });
        directMessages[msg.sender][to].push(msgObj);
        emit DirectMessageSent(msg.sender, to, hash, block.timestamp);
    }

    /// @notice Send a group message (requires token payment, must be group member)
    function sendGroupMessage(uint256 groupId, bytes32 hash) external {
        require(hash != bytes32(0), "Invalid hash");
        require(spamToken.transferFrom(msg.sender, address(this), messageFee), "Token payment failed");
        require(groupManager.isMember(groupId, msg.sender), "Not a group member");
        Message memory msgObj = Message({
            sender: msg.sender,
            receiver: address(0),
            hash: hash,
            timestamp: block.timestamp,
            isGroup: true,
            groupId: groupId
        });
        groupMessages[groupId].push(msgObj);
        emit GroupMessageSent(msg.sender, groupId, hash, block.timestamp);
    }

    /// @notice Get all direct messages between two users
    function getDirectMessages(address from, address to) external view returns (Message[] memory) {
        return directMessages[from][to];
    }

    /// @notice Get all group messages for a group
    function getGroupMessages(uint256 groupId) external view returns (Message[] memory) {
        return groupMessages[groupId];
    }
} 