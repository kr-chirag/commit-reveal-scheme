// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract CommitReveal {

    error InvalidSigner(address signer, address sender);

    constructor() {}

    function hash(bytes memory data) public pure returns (bytes32) {
        return keccak256(data);
    }

    function verify(
        bytes memory data,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) public view {
        bytes32 commitHash = hash(data);
        address signer = ecrecover(commitHash, v, r, s);
        require(signer == msg.sender, InvalidSigner(signer,msg.sender));
    }

}
