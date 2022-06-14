const { getContractAddress } = require("ethers/lib/utils")
const { ethers, run, network } = require("hardhat")
// require("dotenv").config()

async function main() {
    const SimpleStorageFactory = await ethers.getContractFactory(
        "SimpleStorage"
    )
    console.log("Deploying contract...")
    const simpleStorage = await SimpleStorageFactory.deploy()
    await simpleStorage.deployed()
    console.log("Deployed address: " + simpleStorage.address)
    // console.log(network.config)
    // const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY
    if (network.config.chainID === 4 && process.env.ETHERSCAN_API_KEY) {
        console.log("Waiting for block confirmations...")
        await simpleStorage.deployTransaction.wait(6)
        await verify(simpleStorage.address, [])
    }

    const currentValue = await simpleStorage.retrieve()
    console.log("Current value: " + currentValue)

    const transactionResponse = await simpleStorage.store(51089)
    transactionResponse.wait(1)

    const updatedValue = await simpleStorage.retrieve()
    console.log("New value: " + updatedValue)
}

async function verify(contractAddress, args) {
    console.log("Verifying contract...")
    try {
        await run("verify:verify", {
            address: contractAddress,
            constructorArguments: args,
        })
    } catch (e) {
        if (e.message.toLowerCase().includes("already verified")) {
            console.log("Already verified!")
        } else {
            console.log(e)
        }
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.log(error)
        process.exit(1)
    })
