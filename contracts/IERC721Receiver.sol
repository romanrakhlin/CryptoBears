pragma solidity >=0.4.22 <0.9.0;

interface IERC721Receiver {
	function onERC721Received(address operator, address from, uint256 tokenId, bytes calldata) external returns (bytes4);
}