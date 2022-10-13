import { ethers } from "hardhat";
const main = async () => {
	const [deployer] = await ethers.getSigners();
	const nftplatform = await ethers.getContractFactory("NftPlatform");
	const network = await nftplatform.deploy(deployer.address, deployer.address);
	await network.deployed();
	console.log("The NftPlatform NFT deployed to:", network.address);
};

main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});