// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

interface IERC20 {
    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function transfer(address recipient, uint256 amount) external returns (bool);
    function allowance(address owner, address spender) external view returns (uint256);
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
}

interface LPTOKEN {
    function mint(address account, uint256 amount) external;
    function burn(address account, uint256 amount) external;
    function balanceOf(address account) external view returns (uint256);
}

contract Redeem {
    mapping(address => uint) public rewardBalancePerUser;
    mapping(address => uint) public lastBlockNumberPerUser;
    mapping(address => uint) public depositBalancePerUser;

    IERC20 public token0; // token for deposit
    LPTOKEN public token1; // token for reward

    uint public totalDeposit;
    uint public REWARD_PER_BLOCK = 1e20;
    address public gov;

    event Deposited(address indexed user, uint amount);
    event ClaimedReward(address indexed user, uint amount);
    event Withdrawn(address indexed user, uint amount);

    constructor (address _token0, address _token1) payable {
        token0 = IERC20(_token0);
        token1 = LPTOKEN(_token1);
        gov = msg.sender;
    }

    modifier onlyGov() {
        require(msg.sender == gov, "only Governance");
        _;
    }

    function balance0() public view returns (uint) {
        return token0.balanceOf(address(this));
    }

    function balance1() public view returns (uint) {
        return token1.balanceOf(address(this));
    }

    function getRewardAmount(address userAddress) public view returns (uint) {
        uint lastBlockNumber = lastBlockNumberPerUser[userAddress];
        uint rewardBalance = rewardBalancePerUser[userAddress];
        if (lastBlockNumber > 0) {
            uint updatedStartingRewardAmount = REWARD_PER_BLOCK * depositBalancePerUser[userAddress] / totalDeposit;
            uint blocknumbers = block.number - lastBlockNumber;
            // 1 + r + r**2 + ... + r**n = SUM(k=0...n) r**k = (1 - r**(n+1)) /(1 - r)
            // But because uint(a/b) is 0, (a/b) ** (n+1) will be 0. 
            // And updatedStartingRewardAmount * (a**n) / (b**n) can cause overflow.
            // So we need to do this calcualtion (updatedStartingRewardAmount * a / b)  blocknumbers'th times.
            uint initialAmount = updatedStartingRewardAmount * 1000; 
            for (uint i = 0; i < blocknumbers; i++) {
                initialAmount = initialAmount * 813;
                initialAmount = initialAmount / 1000;
            }
            rewardBalance += (updatedStartingRewardAmount * 1000 - initialAmount) / (1000 - 813);
        }
        return rewardBalance;
    }

    function getReward(address userAddress) internal {
        uint rewardBalance = getRewardAmount(userAddress);
        rewardBalancePerUser[userAddress] = rewardBalance;
        lastBlockNumberPerUser[userAddress] = block.number;
    }

    function deposit(uint amount) external {
        require(amount > 0, "Can not deposit amount 0 !");
        getReward(msg.sender);
        token0.transferFrom(msg.sender, address(this), amount);
        depositBalancePerUser[msg.sender] += amount;
        totalDeposit += amount;
        emit Deposited(msg.sender, amount);
    }

    function withdraw(uint amount) external {
        getReward(msg.sender);
        uint depositBalance = depositBalancePerUser[msg.sender];
        if (amount > depositBalance) {
            amount = depositBalance;
        }
        token0.transfer(msg.sender, amount);
        depositBalancePerUser[msg.sender] = depositBalance - amount;
        totalDeposit -= amount;

        emit Withdrawn(msg.sender, amount);
    }

    function claim() external {
        getReward(msg.sender);
        uint rewardBalance = rewardBalancePerUser[msg.sender];
        require(rewardBalance > 0, "Not available withdraw !");
        token1.mint(msg.sender, rewardBalance);
        rewardBalancePerUser[msg.sender] = 0;
        lastBlockNumberPerUser[msg.sender] = 0;
        emit ClaimedReward(msg.sender, rewardBalance);
    }
}
