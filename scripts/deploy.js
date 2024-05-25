// import
const { ethers, run, network } = require("hardhat"); // package.json "hardhat": "^2.22.3", instead of "ethers"
// async main
async function main() {
  const SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
  console.log("Deploying contract...");
  const simpleStorage = await SimpleStorageFactory.deploy();
  //   await simpleStorage.deployed(); no longer use it
  await simpleStorage.getDeployedCode();
  // what's the private key?
  // whats the rpc-url?
  console.log("Deployed contract to:", simpleStorage.target);
  //   console.log("Deployed contract to:", simpleStorage.>>address); no longer use it

  // what happens when we deploy to a ganche network? not work only for testnet such as Sepolia Network
  //   console.log(network.config);>> details of network
  if (network.config.chainId === 11155111 && process.env.ETHER_API) {
    console.log("Waiting for block Confirmation...");
    //exp == and ===
    // 4 == 4 > true
    // 4 == '4' > true
    // 4 === '4' > false
    // await simpleStorage.deployTransaction.wait(6); // no longer use it
    await simpleStorage.deploymentTransaction().wait(6); //wait 6 blocks
    console.log("Block Confirmed!");
    await verify(simpleStorage.target, []);
  }

  const currentValue = await simpleStorage.retrieve();
  console.log(`Current value is: ${currentValue}`);

  // Update the current value
  const transactionResponse = await simpleStorage.store(7);
  await transactionResponse.wait(1);
  const updatedValue = await simpleStorage.retrieve();
  console.log(`Updated value is: ${updatedValue}`);
}

// hardhat-verify and config on hardhat.config.js >>etherscan...
async function verify(contractAddress, args) {
  console.log("Verifying contract...");
  try {
    await run("verify:verify", { // yarn hardhat verify --help >> get new update if they change >> verify: ,,, NOW
      // "verify:verify came from hardhat-verify --help >> verifiy: Verify a contract on etherscan"
      address: contractAddress,
      constructorArguments: args,
    });
  } catch (e) {
    if (e.message.toLowerCase().includes("already verified")) {
      console.log("Already Verified!");
    } else {
      console.error(e);
    }
  }
}// yarn hardhat run scripts/deploy.js >> use default network 
// or // yarn hardhat run scripts/deploy.js --network hardhat
// yarn hardhat run scripts/deploy.js --network sepolia 
// yarn hardhat run scripts/deploy.js --network localhost>> use node >> yarn hardhat node
 
// main
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
