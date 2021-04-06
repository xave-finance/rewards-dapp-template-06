async function main() {
  const [deployer] = await ethers.getSigners();
  const owner = "0xe86AeBc40Bd023f8e1da04fB5A069fF823f8C62D";
  const INITIAL_MINT = 10 ** 6;
  const startingRewards = ethers.utils.parseEther("0.01");
  const decayBase = ethers.utils.parseEther("0.813");
  const DECIMALS = 10 ** 18;

  console.log("Deploying contracts with the account:", deployer.address);

  console.log("Account balance:", (await deployer.getBalance()).toString());

  const LpTokenFactory = await ethers.getContractFactory("LpToken");
  lpTokenContract = await LpTokenFactory.deploy("LpToken", "LPT");

  await lpTokenContract.deployed();
  console.log("lptoken deployed", lpTokenContract.address);

  await lpTokenContract.mint(
    owner,
    ethers.utils.parseEther(INITIAL_MINT.toString())
  );
  console.log(INITIAL_MINT.toString() + " LPT minted to " + owner);
  console.log();

  const rewardTokenContractFactory = await ethers.getContractFactory(
    "RewardToken"
  );
  rewardTokenContract = await rewardTokenContractFactory.deploy(
    "Reward Token",
    "REWARD"
  );
  await rewardTokenContract.deployed();
  console.log("reward token deployed", rewardTokenContract.address);

  await rewardTokenContract.mint(
    owner,
    ethers.utils.parseEther((40 * INITIAL_MINT).toString())
  );
  console.log((40 * INITIAL_MINT).toString() + " REWARD minted to " + owner);
  console.log();

  // trigger MasterChef constructor here according to your own logic
  masterChefContractFactory = await ethers.getContractFactory("MasterChefV2");
  masterChefContract = await masterChefContractFactory.deploy(
    rewardTokenContract.address,
    startingRewards,
    decayBase,
    1
  );
  await masterChefContract.deployed();

  console.log("MasterChef Contract deployed", masterChefContract.address);

  await lpTokenContract.approve(
    masterChefContract.address,
    ethers.utils.parseEther(INITIAL_MINT.toString())
  );
  console.log(
    "Rewards contract approved to transfer " +
      DECIMALS.toString() +
      " LPT of " +
      owner
  );
  console.log();
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
