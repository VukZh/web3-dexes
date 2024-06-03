export const swapContractAbi =
  [{"inputs": [], "name": "AllowanceFailed", "type": "error"}, {
    "inputs": [],
    "name": "ApproveFailed",
    "type": "error"
  }, {"inputs": [], "name": "PairDoesntExist", "type": "error"}, {
    "inputs": [],
    "name": "TransferFailed",
    "type": "error"
  }, {
    "inputs": [{"internalType": "address", "name": "router", "type": "address"}, {
      "internalType": "uint256",
      "name": "amountIn",
      "type": "uint256"
    }, {"internalType": "address", "name": "tokenIn", "type": "address"}, {
      "internalType": "address",
      "name": "tokenOut",
      "type": "address"
    }],
    "name": "getAmountsOut",
    "outputs": [{"internalType": "uint256[]", "name": "amounts", "type": "uint256[]"}],
    "stateMutability": "view",
    "type": "function"
  }, {
    "inputs": [{"internalType": "address", "name": "factory", "type": "address"}, {
      "internalType": "address",
      "name": "token1",
      "type": "address"
    }, {"internalType": "address", "name": "token2", "type": "address"}, {
      "internalType": "uint8",
      "name": "decimalsAfterPoint",
      "type": "uint8"
    }],
    "name": "getPrice",
    "outputs": [{"internalType": "uint256", "name": "price", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  }, {
    "inputs": [{"internalType": "address", "name": "router", "type": "address"}, {
      "internalType": "address",
      "name": "tokenIn",
      "type": "address"
    }, {"internalType": "address", "name": "tokenOut", "type": "address"}, {
      "internalType": "uint256",
      "name": "amountIn",
      "type": "uint256"
    }, {"internalType": "uint256", "name": "amountOutMin", "type": "uint256"}, {
      "internalType": "address",
      "name": "to",
      "type": "address"
    }, {"internalType": "uint256", "name": "deadline", "type": "uint256"}],
    "name": "swapTokens",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }]