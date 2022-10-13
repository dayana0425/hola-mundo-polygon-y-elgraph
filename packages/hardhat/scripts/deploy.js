const hre = require("hardhat");
const fs = require("fs");

const EXPOSED_KEY =
  "8da4ef21b864d2cc526dbdb2a120bd2874c36c9d0a1fb7f8c63d7f7a8b41de8f";

async function main() {
  // Obtenga información de la billetera usando su mnemotécnico o clave privada
  const wallet = (process.env.MNEMONIC && process.env.MNEMONIC.length > 0) ? 
  ethers.Wallet.fromMnemonic(process.env.MNEMONIC) : 
  new ethers.Wallet(process.env.PRIVATE_KEY ?? EXPOSED_KEY);
  console.log(`Using address ${wallet.address}`);
  // Proveedor de nodos: Alchemy
  const provider = new ethers.providers.AlchemyProvider(
    "maticmum",
    process.env.MUMBAI_ALCHEMY_KEY
  );
  // Obtenga Signer
  const signer = wallet.connect(provider);
  // Obtenga Saldo De Cartera
  const balanceBN = await signer.getBalance();
  const balance = Number(ethers.utils.formatEther(balanceBN));
  console.log(`Wallet balance ${balance}`);
  // Si no hay suficiente Matic, lanza un error
  if (balance < 0.01) {
    throw new Error("Not enough Matic");
  }

  // Obtenga una instancia de su contrato inteligente
  const HolaMundoContratoFactory = await hre.ethers.getContractFactory("HolaMundo");
  

  // Implemente esa instancia de contrato en Mumbai Testnet
  const HolaMundoContrato = await HolaMundoContratoFactory.deploy();

  console.log("Deploying contract...");
  console.log("Awaiting confirmations");


  // Cada vez que envía una transacción, siempre debe 'await' o 'esperar' a que finalice esa transacción.
  await HolaMundoContrato.deployed();

  console.log("¡Terminado!");
  console.log("HolaMundo.sol implementado en:", HolaMundoContrato.address);

  /*
  Cada vez que implementa su contrato usando este script,
  la nueva dirección del contrato se guarda automáticamente en la carpeta utils en el front-end
  */
  fs.writeFileSync(
    "../next-app/utils/contractAddress.js",
    `export const contractAddress = "${HolaMundoContrato.address}"`
  );
  console.log("Dirección del contrato guardada en ../next-app/utils/contractAddress.js");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
