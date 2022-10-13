// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "base64-sol/base64.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import './libraries/HexStrings.sol';

contract NftPlatform is ERC721, AccessControl{
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIdCounter; //最新のトークンIDが入ります
  using HexStrings for uint256;

  bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
  bytes32 public constant REGISTER_ROLE = keccak256("REGISTER_ROLE");

  mapping(uint256 => Product) public products;

  struct Product {
    string name;
    string image;
    string description;
    uint16 price;
    address seller;
  }

  constructor(address _register, address _minter) ERC721("NftPlatform", "NPF") {
    _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
    _setupRole(REGISTER_ROLE, _register);
    _setupRole(MINTER_ROLE, _minter);
  }

  function safeMint(
    address to,
    string memory _name,
    string memory _image,
    string memory _description,
    uint16 _price,
    address _seller
  )
  public 
  onlyRole(MINTER_ROLE)
  {
    _safeMint(to, _tokenIdCounter.current());
    products[_tokenIdCounter.current()] = Product({
      name: _name,
      image: _image,
      description: _description,
      price: _price,
      seller: _seller
    });
    _tokenIdCounter.increment();
  }

  function tokenURI(uint256 tokenId) 
  public 
  view
  override(ERC721)
  returns (string memory)
  {
    return 
    string (
      abi.encodePacked(
        "data:application/json;base64,",
        Base64.encode(
          bytes(
            abi.encodePacked(
              "{\"name\":\"", products[tokenId].name,
              "\",\"image\":\"", products[tokenId].image,
              "\",\"description\":\"", products[tokenId].description,
              "\",\"price\":\"", Strings.toString(products[tokenId].price),
              "\",\"seller\":\"", addressToString(products[tokenId].seller),
              "\"}"
            )
          )
        )
      )
    );
  }

  function addressToString(address addr) internal pure returns (string memory) {
    return  (uint256(uint160(addr))).toHexString(20);
  }

  function supportsInterface(bytes4 interfaceId)
    public
    view
    override(ERC721, AccessControl)
    returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}