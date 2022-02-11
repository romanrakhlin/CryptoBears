pragma solidity >=0.4.22 <0.9.0;

import "./IERC721.sol";
import "./IERC721Receiver.sol";
import "./Ownable.sol";

contract CryptoBearsContract is IERC721, Ownable {

	// initial constants
	uint256 public constant CREATION_LIMIT_GEN0 = 10;
	string public constant name = "CryptoBears";
	string public constant symbol = "CB";
	bytes4 internal constant MAGIC_ERC721_RECEIVED = bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"));
	bytes4 private constant INTERFACE_ID_ERC721 = 0x80ac58cd;
	bytes4 private constant INTERFACE_ID_ERC165 = 0x01ffc9a7;
	
	struct Bear {
		uint256 genes;
		uint64 birthTime;
		uint32 momId;
		uint32 dadId;
		uint16 generation;
	}

	Bear[] bears;

	uint256 public gen0Counter;

	// mappings
	mapping(uint256 => address) public bearIdToOwner;
	mapping(address => uint256) ownershipTokenCount;
	mapping(uint256 => address) public bearIdToApproved;
	mapping(address => mapping(address => bool)) private operatorsApprovals;

	// events
	event Birth(address owner, uint256 bearId, uint256 genes, uint256 momId, uint256 dadId, uint256 generation);
	event TotalSupply(uint256);
	
	// main fuctional
	function breed(uint256 momId, uint256 dadId) public returns(uint256) {
		require(_owns(msg.sender, momId), "The user doesnt own the token");
		require(_owns(msg.sender, dadId), "The user doesnt own the token");

		( uint256 momDNA,,,,uint256 MomGeneration ) = getBear(momId);
		( uint256 dadDNA,,,,uint256 DadGeneration ) = getBear(dadId);

		uint256 newDNA = _mixDNA(momDNA, dadDNA);

		uint256 kidGeneration = 0;

		if (MomGeneration < DadGeneration) {
			kidGeneration = DadGeneration + 1;
			kidGeneration /= 2;
		} else if (MomGeneration > DadGeneration) {
			kidGeneration = MomGeneration + 1;
			kidGeneration /= 2;
		} else {
			kidGeneration = MomGeneration + 1;
		}

		_createBear(momId, dadId, kidGeneration, newDNA, msg.sender);
	}

	function supportsInterface(bytes4 interfaceId) public view returns(bool) {
		return (interfaceId == INTERFACE_ID_ERC721 || interfaceId == INTERFACE_ID_ERC165);
	}

	function safeTransferFrom(address from, address to, uint256 bearId) public {
		safeTransferFrom(from, to, bearId, "");
	}

	function safeTransferFrom(address from, address to, uint256 bearId, bytes memory data) public {
		require(_isApprovedOrOwner(msg.sender, from, to, bearId));
		_safeTransfer(from, to, bearId, data);
	}

	function transferFrom(address from, address to, uint256 bearId) public {
		require(to != address(0));
		require(msg.sender == from || _approvedFor(msg.sender, bearId) || isApprovedForAll(from, msg.sender));
		require(_owns(from, bearId));
		require(bearId < bears.length);
		_transfer(from, to, bearId);
	}

	function approve(address to, uint256 bearId) public {
		require(_owns(msg.sender, bearId));
		_approve(bearId, to);
		emit Approval(msg.sender, to, bearId);
	}

	function setApprovalForAll(address operator, bool approved) public {
		require(operator != msg.sender);
		operatorsApprovals[msg.sender][operator] = approved;
		emit ApprovalForAll(msg.sender, operator, approved);
	}

	function getApproved(uint256 bearId) public view returns(address) {
		require(bearId < bears.length);
		return bearIdToApproved[bearId];
	}

	function isApprovedForAll(address owner, address operator) public view returns(bool) {
		return operatorsApprovals[owner][operator];
	}

	function createBearGen0(uint256 genes) public onlyOwner returns(uint256) {
		require(gen0Counter < CREATION_LIMIT_GEN0);
		gen0Counter++;
		return _createBear(0, 0, 0, genes, msg.sender);
	}

	function getBear(uint256 bearId) public view returns(uint256 genes, uint256 birthTime, uint256 momId, uint256 dadId, uint256 generation) {
        Bear storage bear = bears[bearId];
        require(bear.birthTime > 0, "the kitty doesn't exist");

        birthTime = uint256(bear.birthTime);
        momId = uint256(bear.momId);
        dadId = uint256(bear.dadId);
        generation = uint256(bear.generation);
        genes = uint256(bear.genes);
    }

	function balanceOf(address owner) public view returns(uint256 balance) {
		return ownershipTokenCount[owner];
	}

	function totalSupply() public returns(uint256 total) {
		emit TotalSupply(uint256(bears.length));
		return bears.length;
	}

	function getName() public pure returns(string memory tokenName) {
		return name;
	}

	function getSymbol() public pure returns(string memory tokenSymbol) {
		return symbol;
	}

	function ownerOf(uint256 bearId) public view returns(address owner) {
		return bearIdToOwner[bearId];
	}

	function transfer(address to, uint256 bearId) public {
		require(to != address(0));
		require(to != address(this));
		require(_owns(msg.sender, bearId));
		_transfer(msg.sender, to, bearId);
	}

	// helper functions
	function _createBear(uint256 _momId, uint256 _dadId, uint256 _generation, uint256 _genes, address _owner) private returns(uint256) {
		Bear memory newBear = Bear({
			genes: _genes,
			birthTime: uint64(block.timestamp),
			momId: uint32(_momId),
			dadId: uint32(_dadId),
			generation: uint16(_generation)
		});
		bears.push(newBear);
		uint256 newBearId = bears.length - 1;
		emit Birth(_owner, newBearId, _genes, _momId, _dadId, _generation);
		_transfer(address(0), _owner, newBearId);
		return newBearId;
	}

	function _transfer(address from, address to, uint256 bearId) private {
		ownershipTokenCount[to]++;
		bearIdToOwner[bearId] = to;
		// when we mint, no one need to decrese the token count
		if (from != address(0)) {
			ownershipTokenCount[from]--;
			delete bearIdToApproved[bearId];
		}
		emit Transfer(from, to, bearId);
	}

	function _owns(address receiver, uint256 bearId) private view returns(bool) {
		return bearIdToOwner[bearId] == receiver;
	}

	function _approve(uint256 bearId, address approved) private {
		bearIdToApproved[bearId] = approved;
	}

	function _approvedFor(address receiver, uint256 bearId) private view returns(bool) {
		return bearIdToApproved[bearId] == receiver;
	}

	function _safeTransfer(address from, address to, uint256 bearId, bytes memory data) private {
		_transfer(from, to, bearId);
		require(_checkERC721Support(from, to, bearId, data));
	}

	function _checkERC721Support(address from, address to, uint256 tokenId, bytes memory data) private returns(bool) {
		if (!_isContract(to)) {
			return true;
		}

		bytes4 response = IERC721Receiver(to).onERC721Received(msg.sender, from, tokenId, data);
		return response == MAGIC_ERC721_RECEIVED;
	}

	function _isContract(address to) private view returns(bool) {
		uint32 size;

		// wow FUCKING Assembly!!!!!
		assembly {
			size := extcodesize(to)
		}

		// if size bigges than 0 then its indeed a contract
		return size > 0;
	}

	function _isApprovedOrOwner(address spender, address from, address to, uint256 bearId) private view returns(bool) {
		require(bearId < bears.length);
		require(to != address(0));
		require(_owns(from, bearId));
		return (spender == from || _approvedFor(spender, bearId) || isApprovedForAll(from, spender));
	}

	function _mixDNA(uint256 momDNA, uint256 dadDNA) private returns(uint256) {
		// Create new dna from first half of mum's dna and second half of dad's dna     
		uint256 firstHalf = momDNA.div(10000);
		uint256 secondHalf = dadDNA.mod(10000);
		uint256 newDNA = (firstHalf.mul(10000)).add(secondHalf);
		return newDNA;
	}
} 





