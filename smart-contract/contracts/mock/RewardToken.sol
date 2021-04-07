// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;
pragma experimental ABIEncoderV2;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract RewardToken is ERC20, Ownable {
    address public redeemContract;
    
    constructor(string memory _name, string memory _symbol)
        ERC20(_name, _symbol)
    {}

    function initializeRedeemContract(address _redeemContract) public onlyOwner {
        redeemContract = _redeemContract;
    }

    function mint(address account, uint256 amount) external {
        require(msg.sender == redeemContract, "Not Redeem Contract");
        _mint(account, amount);
    }

    function burn(address account, uint256 amount) external {
        require(msg.sender == redeemContract, "Not Redeem Contract");
        _burn(account, amount);
    }
}
