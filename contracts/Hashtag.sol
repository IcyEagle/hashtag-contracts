pragma solidity >=0.4.24 <0.6.0;

import "zeppelin-solidity/contracts/ownership/Ownable.sol";
import "zeppelin-solidity/contracts/token/ERC20/DetailedERC20.sol";
import "zeppelin-solidity/contracts/math/Math.sol";
import "zeppelin-solidity/contracts/token/ERC20/StandardToken.sol";

contract Hashtag is DetailedERC20, StandardToken, Ownable {
    using Math for uint256;
    using SafeMath for uint256;

    uint256 public cap;
    uint256 public blockIncome;
    uint public processedBlockNumber;

    constructor(string _name, string _symbol, uint8 _decimals, uint _blockIncome, uint _cap) DetailedERC20(_name, _symbol, _decimals) StandardToken() Ownable() public {
        require(_cap > 0);
        require(_blockIncome > 0);

        cap = _cap;
        blockIncome = _blockIncome;
        processedBlockNumber = block.number;
    }

    function mine() public onlyOwner returns (uint256) {
        uint blocksCount = block.number - processedBlockNumber;
        uint256 proposedIncome = blocksCount.mul(blockIncome);
        uint256 nextTotalSupply = totalSupply_.add(proposedIncome);
        uint256 cappedTotalSupply = nextTotalSupply.min256(cap);
        uint256 actualIncome = cappedTotalSupply - totalSupply_;

        require(actualIncome > 0);

        balances[owner] = balances[owner].add(actualIncome);
        totalSupply_ = cappedTotalSupply;
        processedBlockNumber = block.number;

        return actualIncome;
    }
}
