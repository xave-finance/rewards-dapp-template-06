## Exponential Decay LP Rewards

### Quickstart

This project uses [`create-react-app`](https://create-react-app.dev/), so most
configuration files are handled by it.

First install the dependencies by running `npm i` at project root. This will install dependencies in the `./frontend` folder as well.

To run it, you just need to execute `npm start` in a terminal, and open
[http://localhost:3000](http://localhost:3000).

To

To learn more about what `create-react-app` offers, you can read
[its documentation](https://create-react-app.dev/docs/getting-started).

### Running Tests

We have included some math util functions you may find useful - but no pressure to use it

```
npx hardhat test
```

### Instructions

The goal of this exercise is largely an open one - we would just like to see how you approach the problem and see what you end up applying to the repo. You may need/want to add more mocks or tests than what is described in this document. There is no "right" or "wrong" answer, as long as your logic makes sense, subsequent unit tests are sensible and all passing and the front end spins up locally (or on a testnet, whichever you prefer). You are also free to add any other improvements to this repo, such as implementing Typescript and other tools/frameworks you are used to - but this is not a requirement.

### Todo

1. Change `sushiPerBlock` calculation

Included in this repo is a copy of the MasterChefV2.sol contract (raw copy, edit as you wish). We would like to alter the `sushiPerBlock` function so that the rewards emission is no longer linear but now follows a decay curve of `Reward_Epoch = A * B ^ X` where A is the starting rewards in an epoch and B is a fixed constant `0.813` and `X` is the epoch number we would like to calculate total rewards for.

Sample Calculation:

- A = 100,000 REWARD during block 1, B = 0.813 and X = 3 (block # 3)
- `Reward_Block = 100000 * 0.813 ^ 3 = 53,736.7797 REWARD tokens released for block 3`

Mocks that may be required:

- LP Token (ERC20)
- Rewards Token for rewards (ERC20) called "REWARD"

Recommended unit tests:

- "When I stake my LP tokens, I earn REWARD tokens"
- "When I unstake my LP tokens, I stop earning REWARD tokens"

2. Refractor the MasterChefV2 to work with the `./frontend` if needed. It has not been changed in any way

3. Make the `./frontend` work locally

4. Add a very simple single page UI that allows the staking and unstaking of LP tokens. A frontend boilerplate has been provided.
   You may edit as you wish. Please add the following UI elements:
   - Stake button
   - Unstake button
   - Amount Staked
   - Rewards Earned

**Environment:**
You can use the hardhat local environment or optionally deploy to a testnet. Either is fine.

- Hardhat = 31337
- Kovan = 42

**Prerequisites:**

- Install metamask
- Create your own ETH Address
- Fund your address from [Kovan faucet](https://faucet.kovan.network/) (Optional, when deploying to kovan)
- Create your own [Infura](https://infura.io/ "Infura") Project_ID (Optional, when deploying to kovan)
- Create .env file and add a seed phrase and Infura project ID.

**Next Steps**

1. Clone this repo and create your own branch. Naming convention is feature/your-firstname-lastname
2. Send a pull request
   - @tracyarciaga
   - @ctverceles

** Email us for any questions you might have ** - terersa.li@halodao.com - chris.verceles@halodao.com
