require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  etherscan: {
    apiKey: "",
  },
  networks: {
    hardhat: {
      mining: {
        auto: false,
        interval: 5000,
      },
    },
    polygon: {
      url: "https://rpc-mainnet.maticvigil.com",
      accounts: [""],
      gas: "auto",
      gasPrice: "auto",
    },
  },
};
