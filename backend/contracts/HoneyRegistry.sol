// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Honey {
    struct HoneyProduct {
        uint256 id;
        string producer;
        string origin;
        uint256 productionDate;
        bytes32 dataHash; // Change from string to bytes32
        bool isCertified;
    }

    mapping(uint256 => HoneyProduct) public honeyProducts;
    mapping(bytes32 => uint256) public dataHashToId; // Use bytes32 for the dataHash-to-ID mapping
    uint256 public honeyCount;

    address public owner; // Owner of the contract

    event HoneyProductAdded(uint256 id, string producer, string origin, uint256 productionDate, bytes32 dataHash);

    constructor() {
        owner = msg.sender; // Set the deployer as the owner
    }

    // Modifier to restrict access to the owner
    modifier onlyOwner() {
        require(msg.sender == owner, "You do not have the authority to add a product");
        _;
    }

    // Function to add honey product details and return the dataHash
    function addHoneyProduct(
        string memory _producer,
        string memory _origin,
        uint256 _productionDate
    ) public onlyOwner returns (bytes32) { // Apply the modifier here
        // Increment honeyCount for new product ID
        honeyCount++;

        // Generate the data hash using keccak256 of product attributes
        bytes32 dataHashBytes = keccak256(abi.encodePacked(honeyCount, _producer, _origin, _productionDate));

        // Ensure the data hash is unique
        require(dataHashToId[dataHashBytes] == 0, "Data hash already exists.");

        // Store honey product in mapping
        honeyProducts[honeyCount] = HoneyProduct(honeyCount, _producer, _origin, _productionDate, dataHashBytes, true);

        // Map the data hash to the product ID
        dataHashToId[dataHashBytes] = honeyCount;

        // Emit event for successful addition
        emit HoneyProductAdded(honeyCount, _producer, _origin, _productionDate, dataHashBytes);

        // Return the dataHash for the added product
        return dataHashBytes;
    }

    function verifyHoneyProduct(bytes32 _dataHash) public view returns (bool) {
        // Ensure the data hash exists in the mapping
        uint256 productId = dataHashToId[_dataHash];

        // Check if the productId is non-zero, meaning the dataHash exists
        if (productId == 0) {
            return false;  // No product exists for the given hash
        }

        // Retrieve the product details using the productId
        HoneyProduct memory product = honeyProducts[productId];

        // Return true if the product is certified and the data hash matches
        return product.isCertified && product.dataHash == _dataHash;
    }
}
