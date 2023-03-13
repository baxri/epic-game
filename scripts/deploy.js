const main = async () => {
  // Contract deployed to: 0xAD20A35358f564207ff21Aa30e36AF8cf7bAA722
  const gameContractFactory = await hre.ethers.getContractFactory("MyEpicGame");

  const gameContract = await gameContractFactory.deploy(
    ["Joel", "Ellie", "Abby"],
    [
      "https://ipfs.io/ipfs/QmbVcBiUNr1SoiaZGCL4CJaCfMhpRaK3ie3ofqtBPbe3AX?filename=joel.jpeg",
      "https://i.imgur.com/xVu4vFL.png",
      "https://i.imgur.com/u7T87A6.png",
    ],
    [250, 200, 300],
    [30, 20, 40],
    "Bloater",
    "https://i.imgur.com/AksR0tt.png",
    10000,
    50
  );

  await gameContract.deployed();
  console.log("Contract deployed to:", gameContract.address);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
