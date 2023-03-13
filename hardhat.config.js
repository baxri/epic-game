require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    goerli: {
      url: "https://rough-wild-sunset.ethereum-goerli.discover.quiknode.pro/4e452e16a9021702f857a2adb3aa69d8ac6f12bc/",
      accounts: [
        "ce750a15884a3ae228dbdea4319341ef3be6306b0708623e4d9f7e205ba9091d",
      ],
    },
  },
};
