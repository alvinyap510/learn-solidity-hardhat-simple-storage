require("@nomiclabs/hardhat-waffle")
require("dotenv").config()
require("@nomiclabs/hardhat-etherscan")
require("./tasks/block-number")
require("hardhat-gas-reporter")
require("solidity-coverage")

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

const RINKEBY_RPC_URL = process.env.RINKEBY_RPC_URL || "https://nothing.com"
const PRIVATE_KEY = process.env.PRIVATE_KEY || "0xSomething"
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "Key"
const CMC_API_KEY = process.env.CMC_API_KEY || "Key"

module.exports = {
    defaultNetwork: "hardhat",
    networks: {
        rinkeby: {
            url: RINKEBY_RPC_URL,
            accounts: [PRIVATE_KEY],
            chainID: 4,
        },
        localhost: {
            url: "http://127.0.0.1:8545/",
            chainID: 31337,
        },
    },
    solidity: "0.8.4",
    etherscan: {
        apiKey: ETHERSCAN_API_KEY,
    },
    gasReporter: {
        enabled: true,
        outputfile: "gasReport.txt",
        noColors: true,
        currency: "USD",
        coinmarketcap: CMC_API_KEY,
        token: "MATIC",
    },
}
