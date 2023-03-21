const { expect } = require("chai");
const { ethers } = require("hardhat");

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), "ether");
};

const NAMES = ["Joel", "Ellie", "Abby"];
const IMAGES = [
  "https://firebasestorage.googleapis.com/v0/b/epic-game-803be.appspot.com/o/joel.jpeg?alt=media&token=6d0caf09-9be3-4685-ae65-c3fc627179fa",
  "https://firebasestorage.googleapis.com/v0/b/epic-game-803be.appspot.com/o/Ellie.webp?alt=media&token=33c35519-1699-4b40-abda-df103c63a542",
  "https://firebasestorage.googleapis.com/v0/b/epic-game-803be.appspot.com/o/abby.jpeg?alt=media&token=46f8482c-ac31-4b3c-a10e-0ab7e11472b5",
];
const HPS = [250, 200, 300];
const ATTACK_DAMAGES = [30, 20, 40];

const BIG_BOSS = "Bloater";
const BOSS_IMAGE =
  "https://firebasestorage.googleapis.com/v0/b/epic-game-803be.appspot.com/o/boss.jpeg?alt=media&token=dbb2ac29-8580-498c-9819-a88dd5dd78b3";
const BOSS_HP = 10000;
const BOSS_ATTACK_DAMAGE = 50;

const HP_PRICE = "0.001";
const MINTED_CHARACTER_INDEX = 0;
const BOUGHT_HP = 50;

describe("Read information", () => {
  let gameContract;
  let deployer, buyer;

  before(async () => {
    [deployer, buyer] = await ethers.getSigners();

    gameContract = await (
      await ethers.getContractFactory("MyEpicGame")
    ).deploy(
      NAMES,
      IMAGES,
      HPS,
      ATTACK_DAMAGES,
      BIG_BOSS,
      BOSS_IMAGE,
      BOSS_HP,
      BOSS_ATTACK_DAMAGE
    );
    await gameContract.deployed();
  });

  it("List of characters", async () => {
    const characters = await gameContract.getAllDefaultCharacters();
    expect(characters[0].name).to.equals(NAMES[0]);
    expect(characters[1].name).to.equals(NAMES[1]);
    expect(characters[2].name).to.equals(NAMES[2]);
  });

  it("Get bit boss", async () => {
    const boss = await gameContract.getBigBoss();
    expect(boss.name).to.equals(BIG_BOSS);
  });

  it("Mint character", async () => {
    transaction = await gameContract
      .connect(deployer)
      .mintCharacterNFT(MINTED_CHARACTER_INDEX);

    await transaction.wait();

    const characterMinted = await gameContract
      .connect(deployer)
      .checkIfUserHasNFT();

    expect(characterMinted.name).to.equals(NAMES[MINTED_CHARACTER_INDEX]);
  });

  it("Character minted", async () => {
    const characterMinted = await gameContract
      .connect(deployer)
      .checkIfUserHasNFT();

    expect(characterMinted.name).to.equals(NAMES[MINTED_CHARACTER_INDEX]);
  });

  it("Buy hp", async () => {
    transaction = await gameContract
      .connect(deployer)
      .buyHp({ value: ethers.utils.parseEther(HP_PRICE) });
    await transaction.wait();

    const finalBalance = await ethers.provider.getBalance(gameContract.address);
    const totalPayedHp = await gameContract.totalPayedHp();

    const characterMinted = await gameContract
      .connect(deployer)
      .checkIfUserHasNFT();

    expect(ethers.utils.formatEther(finalBalance)).to.equals(HP_PRICE);
    expect(ethers.utils.formatEther(totalPayedHp)).to.equals(HP_PRICE);
    expect(characterMinted.hp).to.equals(
      HPS[MINTED_CHARACTER_INDEX] + BOUGHT_HP
    );
  });

  it("Attack boss", async () => {
    transaction = await gameContract.connect(deployer).attackBoss();
    await transaction.wait();

    expect(transaction).to.emit(gameContract, "AttackCompletes");
  });

  it("widthdraw", async () => {
    const contractBalanceBefore = await ethers.provider.getBalance(
      gameContract.address
    );
    const trx = await gameContract.connect(deployer).withdraw();
    await trx.wait();

    const contractBalanceAfter = await ethers.provider.getBalance(
      gameContract.address
    );

    expect(
      ethers.utils.formatEther(contractBalanceBefore.sub(contractBalanceAfter))
    ).to.equals(HP_PRICE);
  });
});
