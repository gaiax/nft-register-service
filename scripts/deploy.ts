import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();

  const NftPlatform = await ethers.getContractFactory("NftPlatform");
  const nftPlatform = await NftPlatform.deploy(deployer.address, deployer.address);

  await nftPlatform.deployed();
  console.log("nftPlatform deployed to:" , nftPlatform.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
