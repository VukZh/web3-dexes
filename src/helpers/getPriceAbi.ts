export const GetPriceContractAbi =
  [{"inputs": [], "name": "PairDoesntExist", "type": "error"}, {
    "inputs": [{
      "internalType": "address",
      "name": "factory",
      "type": "address",
    }, {"internalType": "address", "name": "token1", "type": "address"}, {
      "internalType": "address",
      "name": "token2",
      "type": "address",
    }, {"internalType": "uint8", "name": "decimalsAfterPoint", "type": "uint8"}],
    "name": "getPrice",
    "outputs": [{"internalType": "uint256", "name": "price", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function",
  }];