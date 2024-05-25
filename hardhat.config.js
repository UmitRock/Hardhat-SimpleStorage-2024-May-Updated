require("@nomicfoundation/hardhat-toolbox")
require("dotenv").config()
require("@nomicfoundation/hardhat-verify")
require("./tasks/block-number")
require("hardhat-gas-reporter")
require("solidity-coverage")
/** @type import('hardhat/config').HardhatUserConfig */

const SEPOLIA =
    process.env.SEPOLIA_RPC_URL ||
    "https://eth-sepolia.alchemyapi.io/v2/your-api-key"
const COINMARKETCAP = process.env.COINMARKETCAP_API || "your-api-key"
const PRIVATE_KEY = process.env.PRIVATE_KEY || "your-private-key"
const ETHER_API = process.env.ETHER_API || "your-etherscan-api-key"
module.exports = {
    defaultNetwork: "hardhat",
    networks: {
        sepolia: {
            url: SEPOLIA,
            accounts: [PRIVATE_KEY],
            chainId: 11155111,
        },
        localhost: {
            url: "http://127.0.0.1:8545/",
            // accounts: [PRIVATE_KEY], auto seclect from node
            chainId: 31337,
        },
    },
    solidity: "0.8.24",
    etherscan: {
        apiKey: ETHER_API,
    },
    gasReporter: {
        enabled: true,
        outputFile: "gas-report.txt",
        noColors: true,
        currency: "USD",
        coinmarketcap: COINMARKETCAP,
        token: "MATIC",
    },
}
