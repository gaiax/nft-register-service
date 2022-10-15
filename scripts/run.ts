import { ethers } from "hardhat";
const main = async () => {
	const [deployer] = await ethers.getSigners();
	const nftplatform = await ethers.getContractFactory("NftPlatform");
	const nftContract = await nftplatform.deploy(deployer.address, deployer.address);
	await nftContract.deployed();
	console.log("The NftPlatform NFT deployed to:", nftContract.address);
  const mint = await nftContract.safeMint(
    "0xe4832791325a4519E96881e9798DBf1e88Ed6724",
    "name",
    "https://i.imgur.com/6Qb13Z4.jpeg",
    "description",
    "1000",
    "0xe4832791325a4519E96881e9798DBf1e88Ed6724"
  );
  await mint.wait();
  const tokenURI = await nftContract.tokenURI(0);
  console.log(tokenURI);
};

main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});