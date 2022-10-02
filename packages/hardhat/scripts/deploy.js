const hre = require("hardhat");
const fs = require("fs");

async function main() {
  const HolaMundoContractFactory = await hre.ethers.getContractFactory("HolaMundo");
  const HolaMundoContract = await HolaMundoContractFactory.deploy();

  await HolaMundoContract.deployed();

  console.log("HolaMundo deployed to:", HolaMundoContract.address);

  fs.writeFileSync(
    "../next-app/utils/contractAddress.js",
    `export const contractAddress = "${HolaMundoContract.address}"`
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
