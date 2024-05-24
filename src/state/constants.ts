export const tabs = ["SWAP", "ARBITRAGE"];
export const chains = ["Polygon", "Arbitrum", "BSC"];

export const swapFactories = {
  uniswap: {
    polygon: "0x9e5A52f57b3038F1B8EeE45F28b3C1967e22799C",
    arbitrum: "0xf1D7CC64Fb4452F05c498126312eBE29f30Fbcf9",
    bsc: "0x8909Dc15e40173Ff4699343b6eB8132c65e18eC6",
  },
  sushiswap: {
    polygon: "0xc35DADB65012eC5796536bD9864eD8773aBc74C4",
    arbitrum: "0xc35DADB65012eC5796536bD9864eD8773aBc74C4",
    bsc: "0xc35DADB65012eC5796536bD9864eD8773aBc74C4",
  },
  quickswap: {
    polygon: "0x5757371414417b8C6CAad45bAeF941aBc7d3Ab32",
    arbitrum: "",
    bsc: "",
  },
  pancakeswap: {
    polygon: "",
    arbitrum: "0x02a84c1b3BBD7401a5f7fa98a384EBC70bB5749E",
    bsc: "0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73",
  },
};

export const swapRoutes = {
  uniswap: {
    polygon: "0xedf6066a2b290C185783862C7F4776A2C8077AD1",
    arbitrum: "0x4752ba5dbc23f44d87826276bf6fd6b1c372ad24",
    bsc: "0x4752ba5dbc23f44d87826276bf6fd6b1c372ad24",
  },
  sushiswap: {
    polygon: "0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506",
    arbitrum: "0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506",
    bsc: "0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506",
  },
  quickswap: {
    polygon: "0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff",
    arbitrum: "",
    bsc: "",
  },
  pancakeswap: {
    polygon: "",
    arbitrum: "0x8cFe327CEc66d1C090Dd72bd0FF11d690C33a2Eb",
    bsc: "0x10ED43C718714eb63d5aA57B78B54704E256024E",
  },
};

export const dexesInChaines = {
  polygon: ["uniswap", "sushiswap", "quickswap"],
  arbitrum: ["uniswap", "sushiswap", "pancakeswap"],
  bsc: ["uniswap", "sushiswap", "pancakeswap"],
};

export const tokensAddresses = {
  USDT: {
    polygon: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
    arbitrum: "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9",
    bsc: "0x55d398326f99059fF775485246999027B3197955",
    decimals: 6,
    bscdecimals: 18
  },
  WBTC: {
    polygon: "0x1BFD67037B42Cf73acF2047067bd4F2C47D9BfD6",
    arbitrum: "0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f",
    bsc: "",
    decimals: 8,
    bscdecimals: 8
  },
  WETH: {
    polygon: "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619",
    // arbitrum: "0xD8369C2EDA18dD6518eABb1F85BD60606dEb39Ec",
    arbitrum: "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1",
    bsc: "0x2170Ed0880ac9A755fd29B2688956BD959F933F8",
    decimals: 18,
    bscdecimals: 18
  },
  UNI: {
    polygon: "0xb33EaAd8d922B1083446DC23f610c2567fB5180f",
    arbitrum: "0xFa7F8980b0f1E64A2062791cc3b0871572f1F7f0",
    bsc: "0xBf5140A22578168FD562DCcF235E5D43A02ce9B1",
    decimals: 18,
    bscdecimals: 18
  },
  SUSHI: {
    polygon: "0x0b3F868E0BE5597D5DB7fEB59E1CADBb0fdDa50a",
    arbitrum: "0xd4d42F0b6DEF4CE0383636770eF773390d85c61A",
    bsc: "0x947950BcC74888a40Ffa2593C5798F11Fc9124C4",
    decimals: 18,
    bscdecimals: 18
  },
  LINK: {
    polygon: "0x53E0bca35eC356BD5ddDFebbD1Fc0fD03FaBad39",
    arbitrum: "0xf97f4df75117a78c1A5a0DBb814Af92458539FB4",
    bsc: "0xF8A0BF9cF54Bb92F17374d9e9A321E6a111a51bD",
    decimals: 18,
    bscdecimals: 18
  },
  WOO: {
    polygon: "0x1B815d120B3eF02039Ee11dC2d33DE7aA4a8C603",
    arbitrum: "0xcAFcD85D8ca7Ad1e1C6F82F651fA15E33AEfD07b",
    bsc: "0x4691937a7508860F876c9c0a2a617E7d9E945D4B",
    decimals: 18,
    bscdecimals: 18
  },
  OMNI: {
    polygon: "0x9e20461bc2c4c980f62f1B279D71734207a6A356",
    arbitrum: "0x9e20461bc2c4c980f62f1B279D71734207a6A356",
    bsc: "0x9e20461bc2c4c980f62f1B279D71734207a6A356",
    decimals: 18,
    bscdecimals: 18
  },
  STG: {
    polygon: "0x2F6F07CDcf3588944Bf4C42aC74ff24bF56e7590",
    arbitrum: "0x6694340fc020c5E6B96567843da2df01b2CE1eb6",
    bsc: "0xB0D502E938ed5f4df2E681fE6E419ff29631d62b",
    decimals: 18,
    bscdecimals: 18
  },
  ARB: {
    polygon: "",
    arbitrum: "0x912CE59144191C1204E64559FE8253a0e49E6548",
    bsc: "0xa050FFb3eEb8200eEB7F61ce34FF644420FD3522",
    decimals: 18,
    bscdecimals: 18
  },
  CAKE: {
    polygon: "",
    arbitrum: "0x1b896893dfc86bb67Cf57767298b9073D2c1bA2c",
    bsc: "0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82",
    decimals: 18,
    bscdecimals: 18
  },
  AAVE: {
    polygon: "0xD6DF932A45C0f255f85145f286eA0b292B21C90B",
    arbitrum: "",
    bsc: "0xfb6115445Bff7b52FeB98650C87f44907E58f802",
    decimals: 18,
    bscdecimals: 18
  },
  SAND: {
    polygon: "0xBbba073C31bF03b8ACf7c28EF0738DeCF3695683",
    arbitrum: "",
    bsc: "",
    decimals: 18,
    bscdecimals: 18
  },
  CRV: {
    polygon: "0x172370d5Cd63279eFa6d502DAB29171933a610AF",
    arbitrum: "0x11cDb42B0EB46D95f990BeDD4695A6e3fA034978",
    bsc: "",
    decimals: 18,
    bscdecimals: 18
  },
  WBNB: {
    polygon: "",
    arbitrum: "",
    bsc: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
    decimals: 18,
    bscdecimals: 18
  },
  COMP: {
    polygon: "0x8505b9d2254A7Ae468c0E9dd10Ccea3A837aef5c",
    arbitrum: "0x354A6dA3fcde098F8389cad84b0182725c6C91dE",
    bsc: "0x52CE071Bd9b1C4B00A0b92D298c512478CaD67e8",
    decimals: 18,
    bscdecimals: 18
  },
  MATIC: {
    polygon: "0x0000000000000000000000000000000000001010",
    arbitrum: "",
    bsc: "0xCC42724C6683B7E57334c4E856f4c9965ED682bD",
    decimals: 18,
    bscdecimals: 18
  },
  WMATIC: {
    polygon: "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270",
    arbitrum: "",
    bsc: "0xc836d8dC361E44DbE64c4862D55BA041F88Ddd39",
    decimals: 18,
    bscdecimals: 18
  },
  LDO: {
    polygon: "",
    arbitrum: "0x13Ad51ed4F1B7e9Dc168d8a00cB3f4dDD85EfA60",
    bsc: "0x986854779804799C1d68867F5E03e601E781e41b",
    decimals: 18,
    bscdecimals: 18
  },
  // FRM: {
  //   polygon: "0xd99baFe5031cC8B345cb2e8c80135991F12D7130",
  //   arbitrum: "0x9f6AbbF0Ba6B5bfa27f4deb6597CC6Ec20573FDA",
  //   bsc: "0xA719b8aB7EA7AF0DDb4358719a34631bb79d15Dc",
  //   decimals: 18,
  //   bscdecimals: 18
  // },
  // SNX: {
  //   polygon: "0x50B728D8D964fd00C2d0AAD81718b71311feF68a",
  //   arbitrum: "",
  //   bsc: "0x9Ac983826058b8a9C7Aa1C9171441191232E8404",
  //   decimals: 18,
  //   bscdecimals: 18
  // },
  // GRT: {
  //   polygon: "",
  //   arbitrum: "0x9623063377AD1B27544C965cCd7342f7EA7e88C7",
  //   bsc: "",
  //   decimals: 18,
  //   bscdecimals: 18
  // },
  // DODO: {
  //   polygon: "",
  //   arbitrum: "0x69Eb4FA4a2fbd498C257C57Ea8b7655a2559A581",
  //   bsc: "0x67ee3Cb086F8a16f34beE3ca72FAD36F7Db929e2",
  //   decimals: 18,
  //   bscdecimals: 18
  // },
  // W: {
  //   polygon:	"",
  //   arbitrum:	"0xB0fFa8000886e57F86dd5264b9582b2Ad87b2b91",
  //   decimals: 18
  // },
  // AXL: {
  //   polygon:	"0x6e4E624106Cb12E168E6533F8ec7c82263358940",
  //   arbitrum:	"0x23ee2343B892b1BB63503a4FAbc840E0e2C6810f",
  //   decimals: 6
  // },
  // YFI: {
  //   polygon:	"",
  //   arbitrum:	"0x82e3A8F066a6989666b031d916c43672085b1582",
  //   decimals: 18
  // },
  // C98: {
  //   polygon:	"0x77f56cf9365955486B12C4816992388eE8606f0E",
  //   arbitrum:	"",
  //   decimals: 18
  // },
  // APEX: {
  //   polygon:	"",
  //   arbitrum:	"0x61A1ff55C5216b636a294A07D77C6F4Df10d3B56",
  //   decimals: 18
  // },
  // PORT3: {
  //   polygon:	"0xb4357054c3dA8D46eD642383F03139aC7f090343",
  //   arbitrum:	"0xb4357054c3dA8D46eD642383F03139aC7f090343",
  //   decimals: 18
  // },
  // FRXETH: {
  //   polygon:	"0xEe327F889d5947c1dc1934Bb208a1E792F953E96",
  //   arbitrum:	"0x178412e79c25968a32e89b11f63B33F733770c2A",
  //   decimals: 18
  // },
  // KAP: {
  //   polygon:	"0xc27158bB8E08899d38765752F91d7d778e16AB8e",
  //   arbitrum:	"0x965d00aA7ABC62CA10132e641D08593435aC811d",
  //   decimals: 18
  // },
  // SMT: {
  //   polygon:	"0xE631DABeF60c37a37d70d3B4f812871df663226f",
  //   arbitrum:	"0x2680E82fB8beb5a153A67Fe687FFa67ABb6b9013",
  //   decimals: 18
  // },
};

export const availablePairs = [
  'USDT-WBTC', 'WBTC-USDT', 'USDT-WETH', 'WETH-USDT', 'USDT-UNI', 'UNI-USDT', 'USDT-SUSHI', 'SUSHI-USDT', 'USDT-LINK', 'LINK-USDT', 'USDT-WOO', 'WOO-USDT', 'USDT-OMNI', 'OMNI-USDT', 'USDT-STG', 'STG-USDT', 'USDT-ARB', 'ARB-USDT', 'USDT-CAKE', 'CAKE-USDT', 'USDT-AAVE', 'AAVE-USDT', 'USDT-SAND', 'SAND-USDT', 'USDT-CRV', 'CRV-USDT', 'USDT-WBNB', 'WBNB-USDT', 'USDT-COMP', 'COMP-USDT', 'USDT-MATIC', 'MATIC-USDT', 'USDT-WMATIC', 'WMATIC-USDT', 'USDT-LDO', 'LDO-USDT',
  'WBTC-WETH', 'WETH-WBTC', 'WBTC-UNI', 'UNI-WBTC', 'WBTC-SUSHI', 'SUSHI-WBTC', 'WBTC-LINK', 'LINK-WBTC', 'WBTC-WOO', 'WOO-WBTC', 'WBTC-OMNI', 'OMNI-WBTC', 'WBTC-STG', 'STG-WBTC', 'WBTC-ARB', 'ARB-WBTC', 'WBTC-CAKE', 'CAKE-WBTC', 'WBTC-AAVE', 'AAVE-WBTC', 'WBTC-SAND', 'SAND-WBTC', 'WBTC-CRV', 'CRV-WBTC', 'WBTC-WBNB', 'WBNB-WBTC', 'WBTC-COMP', 'COMP-WBTC', 'WBTC-MATIC', 'MATIC-WBTC', 'WBTC-WMATIC', 'WMATIC-WBTC', 'WBTC-LDO', 'LDO-WBTC',
  'WETH-UNI', 'UNI-WETH', 'WETH-SUSHI', 'SUSHI-WETH', 'WETH-LINK', 'LINK-WETH', 'WETH-WOO', 'WOO-WETH', 'WETH-OMNI', 'OMNI-WETH', 'WETH-STG', 'STG-WETH', 'WETH-ARB', 'ARB-WETH', 'WETH-CAKE', 'CAKE-WETH', 'WETH-AAVE', 'AAVE-WETH', 'WETH-SAND', 'SAND-WETH', 'WETH-CRV', 'CRV-WETH', 'WETH-WBNB', 'WBNB-WETH', 'WETH-COMP', 'COMP-WETH', 'WETH-MATIC', 'MATIC-WETH', 'WETH-WMATIC', 'WMATIC-WETH', 'WETH-LDO', 'LDO-WETH',
  'UNI-SUSHI', 'SUSHI-UNI', 'UNI-LINK', 'LINK-UNI', 'UNI-WOO', 'WOO-UNI', 'UNI-OMNI', 'OMNI-UNI', 'UNI-STG', 'STG-UNI', 'UNI-ARB', 'ARB-UNI', 'UNI-CAKE', 'CAKE-UNI', 'UNI-AAVE', 'AAVE-UNI', 'UNI-SAND', 'SAND-UNI', 'UNI-CRV', 'CRV-UNI', 'UNI-WBNB', 'WBNB-UNI', 'UNI-COMP', 'COMP-UNI', 'UNI-MATIC', 'MATIC-UNI', 'UNI-WMATIC', 'WMATIC-UNI', 'UNI-LDO', 'LDO-UNI',
  'SUSHI-LINK', 'LINK-SUSHI', 'SUSHI-WOO', 'WOO-SUSHI', 'SUSHI-OMNI', 'OMNI-SUSHI', 'SUSHI-STG', 'STG-SUSHI', 'SUSHI-ARB', 'ARB-SUSHI', 'SUSHI-CAKE', 'CAKE-SUSHI', 'SUSHI-AAVE', 'AAVE-SUSHI', 'SUSHI-SAND', 'SAND-SUSHI', 'SUSHI-CRV', 'CRV-SUSHI', 'SUSHI-WBNB', 'WBNB-SUSHI', 'SUSHI-COMP', 'COMP-SUSHI', 'SUSHI-MATIC', 'MATIC-SUSHI', 'SUSHI-WMATIC', 'WMATIC-SUSHI', 'SUSHI-LDO', 'LDO-SUSHI',
  'LINK-WOO', 'WOO-LINK', 'LINK-OMNI', 'OMNI-LINK', 'LINK-STG', 'STG-LINK', 'LINK-ARB', 'ARB-LINK', 'LINK-CAKE', 'CAKE-LINK', 'LINK-AAVE', 'AAVE-LINK', 'LINK-SAND', 'SAND-LINK', 'LINK-CRV', 'CRV-LINK', 'LINK-WBNB', 'WBNB-LINK', 'LINK-COMP', 'COMP-LINK', 'LINK-MATIC', 'MATIC-LINK', 'LINK-WMATIC', 'WMATIC-LINK', 'LINK-LDO', 'LDO-LINK',
  'WOO-OMNI', 'OMNI-WOO', 'WOO-STG', 'STG-WOO', 'WOO-ARB', 'ARB-WOO', 'WOO-CAKE', 'CAKE-WOO', 'WOO-AAVE', 'AAVE-WOO', 'WOO-SAND', 'SAND-WOO', 'WOO-CRV', 'CRV-WOO', 'WOO-WBNB', 'WBNB-WOO', 'WOO-COMP', 'COMP-WOO', 'WOO-MATIC', 'MATIC-WOO', 'WOO-WMATIC', 'WMATIC-WOO', 'WOO-LDO', 'LDO-WOO',
  'OMNI-STG', 'STG-OMNI', 'OMNI-ARB', 'ARB-OMNI', 'OMNI-CAKE', 'CAKE-OMNI', 'OMNI-AAVE', 'AAVE-OMNI', 'OMNI-SAND', 'SAND-OMNI', 'OMNI-CRV', 'CRV-OMNI', 'OMNI-WBNB', 'WBNB-OMNI', 'OMNI-COMP', 'COMP-OMNI', 'OMNI-MATIC', 'MATIC-OMNI', 'OMNI-WMATIC', 'WMATIC-OMNI', 'OMNI-LDO', 'LDO-OMNI',
  'STG-ARB', 'ARB-STG', 'STG-CAKE', 'CAKE-STG', 'STG-AAVE', 'AAVE-STG', 'STG-SAND', 'SAND-STG', 'STG-CRV', 'CRV-STG', 'STG-WBNB', 'WBNB-STG', 'STG-COMP', 'COMP-STG', 'STG-MATIC', 'MATIC-STG', 'STG-WMATIC', 'WMATIC-STG', 'STG-LDO', 'LDO-STG',
  'ARB-CAKE', 'CAKE-ARB', 'ARB-AAVE', 'AAVE-ARB', 'ARB-SAND', 'SAND-ARB', 'ARB-CRV', 'CRV-ARB', 'ARB-WBNB', 'WBNB-ARB', 'ARB-COMP', 'COMP-ARB', 'ARB-MATIC', 'MATIC-ARB', 'ARB-WMATIC', 'WMATIC-ARB', 'ARB-LDO', 'LDO-ARB',
  'CAKE-AAVE', 'AAVE-CAKE', 'CAKE-SAND', 'SAND-CAKE', 'CAKE-CRV', 'CRV-CAKE', 'CAKE-WBNB', 'WBNB-CAKE', 'CAKE-COMP', 'COMP-CAKE', 'CAKE-MATIC', 'MATIC-CAKE', 'CAKE-WMATIC', 'WMATIC-CAKE', 'CAKE-LDO', 'LDO-CAKE',
  'AAVE-SAND', 'SAND-AAVE', 'AAVE-CRV', 'CRV-AAVE', 'AAVE-WBNB', 'WBNB-AAVE', 'AAVE-COMP', 'COMP-AAVE', 'AAVE-MATIC', 'MATIC-AAVE', 'AAVE-WMATIC', 'WMATIC-AAVE', 'AAVE-LDO', 'LDO-AAVE',
  'SAND-CRV', 'CRV-SAND', 'SAND-WBNB', 'WBNB-SAND', 'SAND-COMP', 'COMP-SAND', 'SAND-MATIC', 'MATIC-SAND', 'SAND-WMATIC', 'WMATIC-SAND', 'SAND-LDO', 'LDO-SAND',
  'CRV-WBNB', 'WBNB-CRV', 'CRV-COMP', 'COMP-CRV', 'CRV-MATIC', 'MATIC-CRV', 'CRV-WMATIC', 'WMATIC-CRV', 'CRV-LDO', 'LDO-CRV',
  'WBNB-COMP', 'COMP-WBNB', 'WBNB-MATIC', 'MATIC-WBNB', 'WBNB-WMATIC', 'WMATIC-WBNB', 'WBNB-LDO', 'LDO-WBNB',
  'COMP-MATIC', 'MATIC-COMP', 'COMP-WMATIC', 'WMATIC-COMP', 'COMP-LDO', 'LDO-COMP',
  'MATIC-WMATIC', 'WMATIC-MATIC', 'MATIC-LDO', 'LDO-MATIC',
  'WMATIC-LDO', 'LDO-WMATIC'
];

