pragma solidity >=0.4.24 <0.6.0;

import "zeppelin-solidity/contracts/ownership/Ownable.sol";
import "zeppelin-solidity/contracts/token/ERC20/DetailedERC20.sol";
import "zeppelin-solidity/contracts/math/Math.sol";
import "zeppelin-solidity/contracts/token/ERC20/StandardToken.sol";

contract Hashtag is DetailedERC20, StandardToken, Ownable {
    using Math for uint256;

    uint256 public cap;
    uint256 public blockIncome;
    uint public processedBlock;

    constructor(string _name, string _symbol, uint8 _decimals, uint _blockIncome, uint _cap) DetailedERC20(_name, _symbol, _decimals) StandardToken() Ownable() public {
        require(_cap > 0);
        require(_blockIncome > 0);

        cap = _cap;
        blockIncome = _blockIncome;
        processedBlock = block.number;
    }

    function mine() public onlyOwner returns (uint256) {
        uint blocks = block.number - processedBlock;
        uint256 tokens = blocks.mul(blockIncome);

        uint256 nextTotalSupply = totalSupply_.add(tokens);
        uint256 cappedTotalSupply = nextTotalSupply.min256(cap);
        uint256 income = cappedTotalSupply - totalSupply_;

        require(income > 0);

        totalSupply_ = cappedTotalSupply;
        processedBlock = block.number;

        balances[owner] = balances[owner].add(income);

        return income;
    }
}
