const hre = require("hardhat");

async function main() {
  const chai = await hre.ethers.deployContract("Chai"); // Fetching byte code and abi
  await chai.waitForDeployment();

  console.log(`Deployed contract address: ${await chai.getAddress()}`); // Creating an instance of your smart contract
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
