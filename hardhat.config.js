require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
};

require("dotenv").config()
require("@nomicfoundation/hardhat-ethers")
require("solidity-coverage")
// require("assert/strict")
require("@nomicfoundation/hardhat-verify")

/** @type import('hardhat/config').HardhatUserConfig */

const ETHEREUM_RPC_URL = process?.env?.ETHEREUM_RPC_URL;
// const PRIVATE_KEY = process?.env?.PRIVATE_KEY;

const PRIVATE_KEY = process?.env?.PRIVATE_KEY || "0xdf57089febbacf7ba0bc227dafbffa9fc08a93fdc68e1e42411a14efcf23656e"

  const ETHERSCAN_API_KEY = process?.env?.ETHERSCAN_API_KEY || ""
// module.exports = {
//   defaultNetwork: "hardhat",
//   networks: {
//     ethereum: {
//       url: ETHEREUM_RPC_URL,
//       account: [PRIVATE_KEY],
//       chainId: 1,
//     },
//   },
//   solidity: "0.8.19",
// };


module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {},
    ethereum: {
      url: `${ETHEREUM_RPC_URL}`,
      accounts: [PRIVATE_KEY],
      chainId: 1,
    },
    // localhost: {
    //   url: "http://localhost:8545",
    //   chainId: 1,
    // },
    localhost: {
      url: "http://localhost:8545", // For a local node
      // Or a URL for a remote provider
    },
  },
  solidity: "0.8.19",
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
  // gasReporter: {
  //   enabled: true,
  //   currency: "USD",
  //   outputFile: "gas-report.txt",
  //   noColors: true,
  //   // coinmarketcap: COINMARKETCAP_API_KEY,
  // },
}

