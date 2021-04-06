const { expect } = require("chai");
const { BigNumber, Contract } = require("ethers");
const { ethers } = require("hardhat");
const mathUtil = require("./utils");

let masterChefContractFactory;
let masterChefContract;
let lpTokenContract;
let rewardTokenContract;
let epochLength;
let owner;
let addr1;
let addr2;
let addrs;
let expectedPerSecondREWARD;
let startingRewards;
let decayBase;

const DECIMALS = 10 ** 18;
const basisPoints = 10 ** 4;
const INITIAL_MINT = 10 ** 6;

const sleepTime = 5;

const sleep = async (delay = sleepTime) => {
  await new Promise((resolve) => {
    setTimeout(resolve, delay * 1000);
  });
};

before(async () => {
  [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
  console.log("===================Deploying Contracts=====================");

  const LpTokenFactory = await ethers.getContractFactory("LpToken");
  lpTokenContract = await LpTokenFactory.deploy("LpToken", "LPT");
  await lpTokenContract.deployed();
  console.log("lptoken deployed");

  await lpTokenContract.mint(
    owner.address,
    ethers.utils.parseEther(INITIAL_MINT.toString())
  );
  console.log(INITIAL_MINT.toString() + " LPT minted to " + owner.address);
  console.log();

  const rewardTokenContractFactory = await ethers.getContractFactory(
    "RewardToken"
  );
  rewardTokenContract = await rewardTokenContractFactory.deploy(
    "Reward Token",
    "REWARD"
  );
  await rewardTokenContract.deployed();
  console.log("reward token deployed");

  await rewardTokenContract.mint(
    owner.address,
    ethers.utils.parseEther((40 * INITIAL_MINT).toString())
  );
  console.log(
    (40 * INITIAL_MINT).toString() + " REWARD minted to " + owner.address
  );
  console.log();

  startingRewards = ethers.utils.parseEther("100000");
  decayBase = ethers.utils.parseEther("0.813");

  // trigger MasterChef constructor here according to your own logic
  masterChefContractFactory = await ethers.getContractFactory("MasterChefV2");
  masterChefContract = await masterChefContractFactory.deploy(
    rewardTokenContract.address,
    startingRewards,
    decayBase,
    1
  );
  await masterChefContract.deployed();

  console.log("MasterChef Contract deployed");

  await lpTokenContract.approve(
    masterChefContract.address,
    ethers.utils.parseEther(INITIAL_MINT.toString())
  );
  console.log(
    "Rewards contract approved to transfer " +
      DECIMALS.toString() +
      " LPT of " +
      owner.address
  );
  console.log();

  const ownerREWARDBalance = await rewardTokenContract.balanceOf(owner.address);
  await rewardTokenContract.transfer(
    masterChefContract.address,
    ownerREWARDBalance
  );
  console.log(
    ownerREWARDBalance.toString() +
      " REWARD tokens transfered to rewards contract"
  );

  await masterChefContract.add(
    1,
    lpTokenContract.address,
    rewardTokenContract.address
  );

  await sleep();

  console.log("==========================================================\n\n");
});

describe("Check Contract Deployments", function () {
  it("Lptoken should be deployed", async () => {
    expect(await lpTokenContract.symbol()).to.equal("LPT");
    expect(await lpTokenContract.name()).to.equal("LpToken");
  });
  it("RewardToken should be deployed", async () => {
    expect(await rewardTokenContract.symbol()).to.equal("REWARD");
    expect(await rewardTokenContract.name()).to.equal("Reward Token");
  });
  it("MasterChef Contract should be deployed", async () => {
    expect(await masterChefContract.SUSHI()).to.equal(
      rewardTokenContract.address
    );
  });
});

describe("When I stake my LP token on the MasterChef contract, I am able to receive my proportion of REWARD. When I remove my LP token from the Rewards contract, I stop earning REWARD", function () {
  it("I earn the correct number of REWARD tokens per time interval on depositing LPT", async () => {
    const startingRewards = 100000;
    const decayBase = 0.813;
    const expected = startingRewards + decayBase ** 1;

    // deposit LP tokens to Rewards contract

    await expect(
      masterChefContract.deposit(0, BigNumber.from(100), owner.address)
    ).to.not.be.reverted;

    await expect(
      masterChefContract.deposit(0, BigNumber.from(100), owner.address)
    ).to.not.be.reverted;

    // wait for some time

    await sleep();

    // check new REWARD balance
    const userInfo = await masterChefContract.userInfo(0, owner.address);
    expect(Number(ethers.utils.formatEther(userInfo.rewardDebt))).to.equal(
      Math.round(expected)
    );
  });

  it("I stop earning REWARD tokens on withdrawing LPT", async () => {
    const startingRewards = 100000;
    const decayBase = 0.813;
    const original = Math.round(startingRewards + decayBase ** 1);
    const expected = original - (original * 100) / (200 + 100);

    await expect(
      masterChefContract.deposit(0, BigNumber.from(100), owner.address)
    ).to.not.be.reverted;

    // wait for some time

    await sleep();

    let userInfo = await masterChefContract.userInfo(0, owner.address);

    await masterChefContract.withdraw(0, BigNumber.from(100), owner.address);

    userInfo = await masterChefContract.userInfo(0, owner.address);

    expect(
      Number(ethers.utils.formatEther(userInfo.rewardDebt)).toFixed(4)
    ).to.equal(Number(expected).toFixed(4));
  });
});
