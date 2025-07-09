// scripts/deploy.js
const hre = require("hardhat");

async function main() {
    const [deployer] = await hre.ethers.getSigners();

    // Deploy SpamToken with deployer as initial owner
    const SpamToken = await hre.ethers.getContractFactory("SpamToken");
    const spamToken = await SpamToken.deploy(deployer.address);
    await spamToken.deployed();
    console.log("SpamToken deployed to:", spamToken.address);

    // Deploy GroupManager
    const GroupManager = await hre.ethers.getContractFactory("GroupManager");
    const groupManager = await GroupManager.deploy();
    await groupManager.deployed();
    console.log("GroupManager deployed to:", groupManager.address);

    // Deploy MessageStore with addresses of SpamToken and GroupManager
    const MessageStore = await hre.ethers.getContractFactory("MessageStore");
    const messageStore = await MessageStore.deploy(spamToken.address, groupManager.address);
    await messageStore.deployed();
    console.log("MessageStore deployed to:", messageStore.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
}); 