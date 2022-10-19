import { expect, should } from "chai";
import { ethers } from "hardhat";

describe("NftPlatform", function(){
  it("Mint a new NFT and shold return the metadata of NFT", async function() {
    const [deployer] = await ethers.getSigners();
    const NftPlatform = await ethers.getContractFactory("NftPlatform");
    const nftplatform = await NftPlatform.deploy(
      deployer.address,
      deployer.address
    );
    await nftplatform.deployed();
    await nftplatform.safeMint(
      "0xe4832791325a4519E96881e9798DBf1e88Ed6724",
      "name",
      "image",
      "description",
      "1000",
      "0xe4832791325a4519E96881e9798DBf1e88Ed6724"
    ); //テストアカウント

    const bigLastTokenId = await nftplatform.getLastTokenId();
    const lastTokenId = Number(bigLastTokenId) - 1; 
    console.log(lastTokenId);

    const ret0 = await nftplatform.tokenURI(0);
    const b64result0 = ret0.replace('data:application/json;base64,','');
    const strResult0 = Buffer.from(b64result0, 'base64').toString();
    console.log(strResult0);
    const jsonResult0 = JSON.parse(strResult0);
    console.log(jsonResult0);
    expect(b64result0).to.equal(
      "eyJuYW1lIjoibmFtZSIsImltYWdlIjoiaW1hZ2UiLCJkZXNjcmlwdGlvbiI6ImRlc2NyaXB0aW9uIiwicHJpY2UiOiIxMDAwIiwic2VsbGVyIjoiMHhlNDgzMjc5MTMyNWE0NTE5ZTk2ODgxZTk3OThkYmYxZTg4ZWQ2NzI0In0="
    );
    expect(jsonResult0.name).to.equal("name");

    expect(jsonResult0.image).to.equal("image");
    expect(jsonResult0.description).to.equal("description");
    expect(jsonResult0.price).to.equal("1000");
    //HexStrings.solの問題により、TokenURIで叩いたときにアドレスが非チェックサムになるのでlowerCaseに変換してテスト
    const originAddress = "0xe4832791325a4519E96881e9798DBf1e88Ed6724";
    const lowerAddress = originAddress.toLowerCase();
    expect(jsonResult0.seller).to.equal(lowerAddress);
  
  
    //2つ目のNFTテスト
    await nftplatform.safeMint(
      "0xe4832791325a4519E96881e9798DBf1e88Ed6724",
      "name2",
      "image2",
      "description2",
      "1000",
      "0xe4832791325a4519E96881e9798DBf1e88Ed6724"
    ); //テストアカウント
    const ret1 = await nftplatform.tokenURI(1);
    const b64result1 = ret1.replace('data:application/json;base64,','');
    const strResult1 = Buffer.from(b64result1, 'base64').toString();
    const jsonResult1 = JSON.parse(strResult1);
    expect(jsonResult1.name).to.equal("name2");
    expect(jsonResult1.image).to.equal("image2");
    expect(jsonResult1.description).to.equal("description2");
    expect(jsonResult1.price).to.equal("1000");
    //HexStrings.solの問題により、TokenURIで叩いたときにアドレスが非チェックサムになるのでlowerCaseに変換してテスト
    const originAddress1 = "0xe4832791325a4519E96881e9798DBf1e88Ed6724";
    const lowerAddress1 = originAddress1.toLowerCase();
    expect(jsonResult1.seller).to.equal(lowerAddress1);

  });
});