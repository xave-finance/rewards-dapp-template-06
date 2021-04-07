async function main() {
    const LPToken = artifacts.require("LpToken");
    const RewardToken = artifacts.require("RewardToken");
    const Redeem = artifacts.require("Redeem");

    const RewardTokenContract = await RewardToken.new("Reward Token", "REWARD");
    const LpTokenContract = await LPToken.new("LpToken", "LPT");
    const RedeemContract = await Redeem.new(LpTokenContract.address, RewardTokenContract.address);
    console.log("LPToken address", LpTokenContract.address);
    console.log("RewardToken address", RewardTokenContract.address);
    console.log("Redeem Contract deployed to:", RedeemContract.address);
  }
  
main()
.then(() => process.exit(0))
.catch(error => {
    console.error(error);
    process.exit(1);
});