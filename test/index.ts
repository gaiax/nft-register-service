import { expect, should } from "chai";
import { ethers } from "hardhat";

describe("NftPlatform", function(){
  it("Should return the new greeting once it's changed", async function() {
    const [deployer] = await ethers.getSigners();
    const NftPlatform = await ethers.getContractFactory("NftPlatform");
    const nftplatform = await NftPlatform.deploy(
      deployer.address,
      deployer.address
    );
    await nftplatform.deployed();
    await nftplatform.safeMint("0xe4832791325a4519E96881e9798DBf1e88Ed6724"); //テストアカウント
    expect(await nftplatform.tokenURI(1)).to.equal(
      "data:application/json;base64,eyJuYW1lIjoibmFtYWUiLCJkZXNjcmlwdGlvbiI6IgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABIn0="
    );

    await nftplatform.safeMint("0xe4832791325a4519E96881e9798DBf1e88Ed6724");
    expect(await nftplatform.tokenURI(2)).to.equal(
      "data:application/json;base64,eyJuYW1lIjoibmFtYWUiLCJkZXNjcmlwdGlvbiI6IgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACIn0="
    );
  });
});