// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/// @title GroupManager - Group chat management for EtherChat
contract GroupManager {
    struct Group {
        string name;
        address admin;
        address[] members;
        string metadata; // e.g., IPFS hash for group avatar/info
    }

    mapping(uint256 => Group) public groups;
    uint256 public groupCount;
    mapping(uint256 => mapping(address => bool)) public isMember;

    event GroupCreated(uint256 indexed groupId, string name, address indexed admin, string metadata);
    event MemberAdded(uint256 indexed groupId, address indexed member);
    event MemberRemoved(uint256 indexed groupId, address indexed member);

    modifier onlyAdmin(uint256 groupId) {
        require(msg.sender == groups[groupId].admin, "Not group admin");
        _;
    }

    function createGroup(string memory name, string memory metadata) external returns (uint256) {
        groupCount++;
        Group storage g = groups[groupCount];
        g.name = name;
        g.admin = msg.sender;
        g.metadata = metadata;
        g.members.push(msg.sender);
        isMember[groupCount][msg.sender] = true;
        emit GroupCreated(groupCount, name, msg.sender, metadata);
        return groupCount;
    }

    function addMember(uint256 groupId, address member) external onlyAdmin(groupId) {
        require(!isMember[groupId][member], "Already a member");
        groups[groupId].members.push(member);
        isMember[groupId][member] = true;
        emit MemberAdded(groupId, member);
    }

    function removeMember(uint256 groupId, address member) external onlyAdmin(groupId) {
        require(isMember[groupId][member], "Not a member");
        isMember[groupId][member] = false;
        // Remove from array (gas-inefficient, but simple)
        address[] storage m = groups[groupId].members;
        for (uint i = 0; i < m.length; i++) {
            if (m[i] == member) {
                m[i] = m[m.length - 1];
                m.pop();
                break;
            }
        }
        emit MemberRemoved(groupId, member);
    }

    function getMembers(uint256 groupId) external view returns (address[] memory) {
        return groups[groupId].members;
    }
} 