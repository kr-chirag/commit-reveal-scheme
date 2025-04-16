// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/utils/Strings.sol";

contract CommitReveal {
    using Strings for uint256;
    error InvalidSigner(address signer, address sender);
    error InvalidSign(bytes error);

    constructor() {}

    function hash(bytes memory data) public pure returns (bytes32) {
        return
            keccak256(
                abi.encodePacked(
                    "\x19Ethereum Signed Message:\n",
                    data.length.toString(),
                    data
                )
            );
    }

    function verify(
        bytes memory data,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) public view {
        bytes32 commitHash = hash(data);
        address signer = ecrecover(commitHash, v, r, s);
        require(signer == msg.sender, InvalidSigner(signer, msg.sender));
    }
}
