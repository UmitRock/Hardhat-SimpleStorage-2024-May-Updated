const { task } = require("hardhat/config");

// block-number>>value      Print the current block number >> description
task("block-number", "Prints the current block number").setAction(
  async (taskArgs, hre) => {
    // hre is the Hardhat Runtime Environment
    // anonymous function
    // const blockTask = async function () {}
    //or async function blockTask() {}

    // Get the current block number
    const blockNumber = await hre.ethers.provider.getBlockNumber();

    // Log the block number
    console.log(`Current block number: ${blockNumber}`); //Current block number: 0 <<reset every time run it == hardhat network are Current block number: 0 << Default network
    // test net block number is not reset >>yarn hardhat block-number --network sepolia >> exp>>Current block number: 573937
  }
);
//>> show the task add require("./tasks/block-number"); to hardhat.config >>run it >yarn hardhat
/*AVAILABLE TASKS:

>>>>>>>>>>  block-number          Prints the current block number
*/
module.exports = {} // to view block number both network >> 
// yarn hardhat block-number --network hardhat 0
// yarn hardhat block-number --network sepolia 6545456 exp