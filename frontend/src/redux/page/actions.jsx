const actions = {
  GET_WEB3_INSTANCE: "GET_WEB3_INSTANCE",
  GET_ALLOWANCE: "GET_ALLOWANCE",
  GET_STAKED: "GET_STAKED",
  GET_BALANCE: "GET_BALANCE",
  GET_DEPOSIT_BALANCE: "GET_DEPOSIT_BALANCE",
  GET_TOTAL_DEPOSIT: "GET_TOTAL_DEPOSIT",
  
  APPROVE_TOKEN: "APPROVE_TOKEN",
  DEPOSIT_TOKEN: "DEPOSIT_TOKEN",
  DEPOSIT_TOKEN_ALL: "DEPOSIT_TOKEN_ALL",
  WITHDRAW_TOKEN: "WITHDRAW_TOKEN",
  WITHDRAW_TOKEN_ALL: "WITHDRAW_TOKEN_ALL",

  getWeb3Instance: (callback) => ({
    type: actions.GET_WEB3_INSTANCE,
    payload: { callback },
  }),
  
  getDepositBalaces: (vaultAddress, tokenAddress, callback) => ({
    type: actions.GET_DEPOSIT_BALANCE,
    payload: { vaultAddress, tokenAddress, callback },
  }),

  getTotalDeposit: (vaultAddress, tokenAddress, callback) => ({
    type: actions.GET_TOTAL_DEPOSIT,
    payload: { vaultAddress, tokenAddress, callback },
  }),

  getBalance: (tokenAddress, callback) => ({
    type: actions.GET_BALANCE,
    payload: { tokenAddress, callback },
  }),

  getAllowance: (vaultAddress, tokenAddress, callback) => ({
    type: actions.GET_ALLOWANCE,
    payload: { vaultAddress, tokenAddress, callback },
  }),

  getStaked: (pid, callback) => ({
    type: actions.GET_STAKED,
    payload: { pid, callback },
  }),

  approveToken: (tokenAddress, vaultAddress, callback) => ({
    type: actions.APPROVE_TOKEN,
    payload: { tokenAddress, vaultAddress, callback },
  }),

  depositToken: (vaultAddress, tokenAddress, amount, callback) => ({
    type: actions.DEPOSIT_TOKEN,
    payload: { vaultAddress, tokenAddress, amount, callback },
  }),

  depositAllToken: (vaultAddress, callback) => ({
    type: actions.DEPOSIT_TOKEN_ALL,
    payload: { vaultAddress, callback },
  }),

  withdrawToken: (vaultAddress, tokenAddress, amount, callback) => ({
    type: actions.WITHDRAW_TOKEN,
    payload: { vaultAddress, tokenAddress, amount, callback },
  }),

  withdrawAllToken: (vaultAddress, callback) => ({
    type: actions.WITHDRAW_TOKEN_ALL,
    payload: { vaultAddress, callback },
  }),
};

export default actions;
