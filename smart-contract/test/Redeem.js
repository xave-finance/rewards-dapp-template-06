const { artifacts, assert } = require("hardhat");
const { Contract } = require("hardhat/internal/hardhat-network/stack-traces/model");

const LPToken = artifacts.require("LpToken");
const RewardToken = artifacts.require("RewardToken");
const Redeem = artifacts.require("Redeem");

contract("Redeem", accounts => {
    let lptokenContract;
    let rewardTokenContract;
    let redeemContract;
    it("LpToken deploy, Mint 100 Lp tokens to account[1], account[2], account[3], account[4]", async function() {
        lptokenContract = await LPToken.new("LpToken", "LPT");
        let mintAmount = web3.utils.toBN(1e20);
        await lptokenContract.mint(accounts[1], mintAmount, {from: accounts[0]});
        await lptokenContract.mint(accounts[2], mintAmount, {from: accounts[0]});
        await lptokenContract.mint(accounts[3], mintAmount, {from: accounts[0]});
        await lptokenContract.mint(accounts[4], mintAmount, {from: accounts[0]});
        assert.equal(await lptokenContract.symbol(), "LPT");
        assert.equal(await lptokenContract.name(), "LpToken");
    });
    it("account[1], account[2], account[3], account[4] LpToken balance Check", async function() {
        let balanceAccount1 = await lptokenContract.balanceOf(accounts[1]);
        let balanceAccount2 = await lptokenContract.balanceOf(accounts[2]);
        let balanceAccount3 = await lptokenContract.balanceOf(accounts[3]);
        let balanceAccount4 = await lptokenContract.balanceOf(accounts[4]);
        assert.equal(balanceAccount1.toString(), (1e20).toString());
        assert.equal(balanceAccount2.toString(), (1e20).toString());
        assert.equal(balanceAccount3.toString(), (1e20).toString());
        assert.equal(balanceAccount4.toString(), (1e20).toString());
    });
    it("RewardToken deploy", async function() {
        rewardTokenContract = await RewardToken.new("Reward Token", "REWARD");
        assert.equal(await rewardTokenContract.symbol(), "REWARD");
        assert.equal(await rewardTokenContract.name(), "Reward Token");
    });
    
    it("Check decaying reward per block.", async function() {
        redeemContract = await Redeem.new(lptokenContract.address, rewardTokenContract.address);
        await rewardTokenContract.initializeRedeemContract(redeemContract.address, {from: accounts[0]}); // Allow the redeem contract to mint reward tokens.
        let depositAmount_Account1 = web3.utils.toBN(50 * 10 ** 18);
        let depositAmount_Account2 = web3.utils.toBN(50 * 10 ** 18);
        let approveAmount = web3.utils.toBN(100 * 10 ** 18);
        await lptokenContract.approve(redeemContract.address, approveAmount, {from: accounts[1]});
        await lptokenContract.approve(redeemContract.address, approveAmount, {from: accounts[2]});
        await redeemContract.deposit(depositAmount_Account1, {from: accounts[1]});
        await redeemContract.deposit(depositAmount_Account2, {from: accounts[2]});
        
        let reward_block1_account1 = await redeemContract.getRewardAmount(accounts[1]); // Check reward amount for block 1.
        
        web3.eth.sendTransaction({ from: accounts[0], to: accounts[1], value: web3.utils.toWei("1", "gwei"), gasLimit: 21000, gasPrice: 20000000000}); // delay a block.
        let reward_account1 = await redeemContract.getRewardAmount(accounts[1]);
        let reward_block2_account1 = reward_account1 - reward_block1_account1; // Check reward amount for block 2.
        
        web3.eth.sendTransaction({ from: accounts[0], to: accounts[1], value: web3.utils.toWei("1", "gwei"), gasLimit: 21000, gasPrice: 20000000000}); // delay a block.
        reward_account1 = await redeemContract.getRewardAmount(accounts[1]);
        reward_block3_account1 = reward_account1 - reward_block1_account1 - reward_block2_account1; // Check reward amount for block 3.
    
        await redeemContract.claim({from: accounts[1]});
        
        console.log(reward_block1_account1.toString());
        console.log(reward_block2_account1.toString());
        console.log(reward_block3_account1.toString());

        assert.isTrue(reward_block2_account1 < reward_block1_account1);
        assert.isTrue(reward_block3_account1 < reward_block2_account1);
    });
  });