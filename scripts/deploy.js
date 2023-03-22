const main = async () => {
  // Polygon Contract deployed to: 0xcf1f5294BD518705bc3d3D1595a7c2B52Dc05052
  // https://polygonscan.com/address/0xcf1f5294BD518705bc3d3D1595a7c2B52Dc05052#code

  // HardHat: Contract deployed to: 0x5FbDB2315678afecb367f032d93F642f64180aa3
  const gameContractFactory = await hre.ethers.getContractFactory("MyEpicGame");
  const gameContract = await gameContractFactory.deploy(
    ["Joel", "Ellie", "Abby"],
    [
      "https://ik.imagekit.io/epicgame/epic-game/joel.jpeg?tr=w-400,h-500",
      "https://ik.imagekit.io/epicgame/epic-game/Ellie.webp?tr=w-400,h-500",
      "https://ik.imagekit.io/epicgame/epic-game/abby.jpeg?tr=w-400,h-500",
    ],
    [250, 200, 300],
    [30, 20, 40],
    "Bloater",
    "https://ik.imagekit.io/epicgame/epic-game/boss.jpeg?tr=w-400,h-500",
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
