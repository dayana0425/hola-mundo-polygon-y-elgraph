require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require("hardhat-abi-exporter");
require("dotenv").config();

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

module.exports = {
  solidity: "0.8.13",
  defaultNetwork: "mumbai",
  networks: {
    hardhat: {
      chainId: 1337,
    },
    mumbai: {
      url: process.env.MUMBAI_ALCHEMY_API_URL,
      accounts: {
        mnemonic: process.env.MNEMONIC,
      },
      gas: 2100000,
      gasPrice: 8000000000
    }
  },
  abiExporter: {
    path: "../next-app/contracts/ABI",
    runOnCompile: true,
    clear: true,
    flat: true,
    only: [],
    spacing: 2,
    pretty: false,
  },
  etherscan: {
    apiKey: process.env.POLYGONSCAN_API_KEY,
  },
};
