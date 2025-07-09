// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/// @title SpamToken - ERC-20 token for spam protection in EtherChat
contract SpamToken is ERC20, Ownable {
    constructor(address initialOwner) ERC20("SpamToken", "SPAM") Ownable(initialOwner) {}

    /// @notice Mint new tokens (only owner)
    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
} 