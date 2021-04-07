/**
 * @type import('hardhat/config').HardhatUserConfig
 */
require("@nomiclabs/hardhat-truffle5");
require("@nomiclabs/hardhat-etherscan");
module.exports = {
  networks: {
    kovan: {
      url: process.env.KOVAN_INFURA,
      accounts: [process.env.KEY]
    }
  },
  solidity: {
    version: "0.8.3",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  mocha: {
    timeout: 20000
  },
  etherscan: {
    apiKey: process.env.API_KEY
  }
};
