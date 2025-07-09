require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */

console.log("PRIVATE_KEY:", process.env.PRIVATE_KEY, "LENGTH:", process.env.PRIVATE_KEY.length);

module.exports = {
  networks: {
    amoy: {
      url: process.env.MUMBAI_RPC_URL,
      accounts: [process.env.PRIVATE_KEY].filter(Boolean),
    },
  },
  solidity: {
    compilers: [
      { version: "0.8.20" },
      { version: "0.8.28" }
    ]
  }
};
