require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  etherscan: {
    apiKey: "RBVXD6J2539ANTJ63IQK83SXSQFTNCR3F7",
  },
  networks: {
    hardhat: {
      mining: {
        auto: false,
        interval: 5000,
      },
    },
    goerli: {
      url: "https://rough-wild-sunset.ethereum-goerli.discover.quiknode.pro/4e452e16a9021702f857a2adb3aa69d8ac6f12bc/",
      accounts: [
        "",
      ],
    },
  },
};
