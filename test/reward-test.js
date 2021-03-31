const { expect } = require("chai");
const { BigNumber, Contract } = require('ethers');
const { ethers } = require('hardhat');
const mathUtil = require('./utils');

let masterChefContractFactory
let lpTokenContract
let rewardTokenContract
let epochLength
let owner
let addr1
let addr2
let addrs
let expectedPerSecondREWARD
let startingRewards
let decayBase

const DECIMALS = 10**18
const basisPoints = 10**4
const INITIAL_MINT = 10**6

const sleepTime = 5

before(async () => {

    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
    console.log("===================Deploying Contracts=====================");

    const LpTokenFactory = await ethers.getContractFactory("LpToken");
    lpTokenContract = await LpTokenFactory.deploy("LpToken", "LPT");
    await lpTokenContract.deployed();
    console.log("lptoken deployed");

    await lpTokenContract.mint(owner.address, ethers.utils.parseEther(INITIAL_MINT.toString()));
    console.log(INITIAL_MINT.toString() + " LPT minted to " + owner.address);
    console.log();

    const rewardTokenContractFactory = await ethers.getContractFactory("RewardToken");
    rewardTokenContract = await rewardTokenContractFactory.deploy("Reward Token", "REWARD")
    await rewardTokenContract.deployed();
    console.log("reward token deployed");

    await rewardTokenContract.mint(owner.address, ethers.utils.parseEther((40*INITIAL_MINT).toString()));
    console.log((40 * INITIAL_MINT).toString() + " REWARD minted to " + owner.address);
    
    startingRewards = ethers.utils.parseEther('100000');
    decayBase = ethers.utils.parseEther('0.813');

    epochLength = 60

    // trigger MasterChef constructor here according to your own logic
    // const masterChefContractFactory = await ethers.getContractFactory("MasterChefV2");
    // const masterChefContract = await masterChefContractFactory.deploy("your ctor arguments here")
    // await masterChefContract.deployed();
    // console.log("Rewards Contract deployed");

    // await lpTokenContract.approve(masterChefContract.address, ethers.utils.parseEther(INITIAL_MINT.toString()));
    // console.log("Rewards contract approved to transfer "+DECIMALS.toString()+ " LPT of "+owner.address);

    // const ownerREWARDBalance = await rewardTokenContract.balanceOf(owner.address);
    // await rewardTokenContract.transfer(masterChefContract.address, ownerREWARDBalance);
    // console.log(ownerREWARDBalance.toString() + " REWARD tokens transfered to rewards contract");

    console.log("==========================================================\n\n")
})

describe("Check Contract Deployments", function() {
    it("Lptoken should be deployed", async() => {
        expect(await lpTokenContract.symbol()).to.equal("LPT");
        expect(await lpTokenContract.name()).to.equal("LpToken");
    })
    it("RewardToken should be deployed", async() => {
        expect(await rewardTokenContract.symbol()).to.equal("REWARD");
        expect(await rewardTokenContract.name()).to.equal("Reward Token");
    })
    it("MasterChef Contract should be deployed", async () => {
        expect(1).to.equal(1);
    })
})

describe("When I stake my LP token on the MasterChef contract, I am able to receive my proportion of REWARD. When I remove my LP token from the Rewards contract, I stop earning REWARD", function() {
    it("I earn the correct number of REWARD tokens per time interval on depositing LPT", async() => {

        // deposit LP tokens to Rewards contract

        // wait for some time

        // check new REWARD balance

        const actual = 123
        const expected = 123
        expect(actual).to.equal(expected);
    })

    it("I stop earning REWARD tokens on withdrawing LPT", async () => {
        
        // withdraw LP tokens from the Rewards contract

        // wait for some time

        // check new REWARD balance

        // assert
        const actual = 123
        const expected = 123
        expect(actual).to.equal(expected);
    })

})

