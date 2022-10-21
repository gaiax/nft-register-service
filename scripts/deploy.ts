require("dotenv").config();
import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();

  const registerAddress = "0xBcd4042DE499D14e55001CcbB24a551F3b954096"
  const minterAddress = "0xBcd4042DE499D14e55001CcbB24a551F3b954096"
  // const registerAddress = String(process.env.REGISTER_ADDRESS);
  // const minterAddress = String(process.env.MINTER_ADDRESS);
  console.log(registerAddress);
  console.log(minterAddress);

  const NftPlatform = await ethers.getContractFactory("NftPlatform");
  const nftPlatform = await NftPlatform.deploy(registerAddress, minterAddress);
  
  await nftPlatform.deployed();
  
  console.log("nftPlatform deployed to:" , nftPlatform.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});