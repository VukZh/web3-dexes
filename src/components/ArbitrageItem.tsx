import {FC, useContext, useState} from "react";
import {Button, Card, Flex, NumberInput, Popover, Stack, Text} from "@mantine/core";
import style from "./ArbitrageItem.module.css";
import {dexesInChaines, swapFactories, tokensAddresses} from "../state/constants.ts";
import {createPublicClient, createWalletClient, custom, http} from "viem";
import {arbitrum, polygon, bsc} from "viem/chains";
import {ErrorType} from "viem/_types/errors/utils";
import {swapContractAbi} from "../helpers/swapAbi";
import {makeNotification} from "../helpers/makeNotification.ts";
import {Context} from "../state/ContextProvider.tsx";

type ArbitrageItemType = {
  chain: string
  token1: string,
  token2: string,
}

export const ArbitrageItem: FC<ArbitrageItemType> = ({
                                                       chain,
                                                       // dexes,
                                                       token1,
                                                       token2,
                                                     }) => {
  const [prices, setPrices] = useState<Array<number>>([0, 0, 0]);
  const [loading, setLoading] = useState(false);
  const [amountIns, setAmountIns] = useState<Array<number>>([0, 0, 0]);
  const [tokensFromDexes, setTokensFromDexes] = useState<Array<number>>([0, 0, 0]);

  const {walletAddress} = useContext(Context);

  const [dex0, dex1, dex2] = dexesInChaines[chain];

  // @ts-ignore
  // const pairExists = !!tokensAddresses[token1][chain] && !!tokensAddresses[token2][chain]

  console.log("dex0", dex0);


  const getPrice = async () => {
    setLoading(true);
    try {
      const publicClient = createPublicClient({
        chain: chain === "arbitrum" ? arbitrum : chain === "polygon" ? polygon : bsc,
        transport: http(),
      });

      console.log("publicClient", publicClient)

      const address = chain === "arbitrum" ? process.env.GET_PRICE_CONTRACT_ARBITRUM_ADDRESS as `0x${string}` : chain === "polygon" ? process.env.GET_PRICE_CONTRACT_POLYGON_ADDRESS as `0x${string}` : process.env.GET_PRICE_CONTRACT_BSC_ADDRESS as `0x${string}`;

      const res0 = publicClient.readContract({
        address: address,
        abi: swapContractAbi,
        functionName: "getPrice",
        // @ts-ignore
        args: [swapFactories[dex0][chain], tokensAddresses[token1][chain], tokensAddresses[token2][chain], 10],
      });
      console.log("get price0", swapFactories[dex0][chain], tokensAddresses[token1][chain], tokensAddresses[token2][chain], address);

      const res1 = publicClient.readContract({
        address: address,
        abi: swapContractAbi,
        functionName: "getPrice",
        // @ts-ignore
        args: [swapFactories[dex1][chain], tokensAddresses[token1][chain], tokensAddresses[token2][chain], 10],
      });
      console.log("get price1", swapFactories[dex1][chain], tokensAddresses[token1][chain], tokensAddresses[token2][chain], address);

      const res2 = publicClient.readContract({
        address: address,
        abi: swapContractAbi,
        functionName: "getPrice",
        // @ts-ignore
        args: [swapFactories[dex2][chain], tokensAddresses[token1][chain], tokensAddresses[token2][chain], 10],
      });

      console.log("get price2", swapFactories[dex2][chain], tokensAddresses[token1][chain], tokensAddresses[token2][chain], address);


      const res = await Promise.allSettled([res0, res1, res2]);
      const resUpdated = res.map(r => Number(Number(r.value) / 10 ** 10));
      console.log("res", res, resUpdated);
      setPrices(resUpdated);
    } catch (e: ErrorType) {
      console.error(e);
      console.log("err");
      setPrices([NaN, NaN, NaN]);
      makeNotification(`Price ${token1} / ${token2} not found`);
    } finally {
      setLoading(false);
    }
  }

  // const getTokensFromDex = async () => {
  //   try {
  //     const publicClient = createPublicClient({
  //       chain: chain === "arbitrum" ? arbitrum : chain === "polygon" ? polygon : bsc,
  //       transport: http(),
  //     });
  //     const res = await publicClient.readContract({
  //       address: chain === "arbitrum" ? process.env.GET_PRICE_CONTRACT_ARBITRUM_ADDRESS as `0x${string}` : chain === "polygon" ? process.env.GET_PRICE_CONTRACT_POLYGON_ADDRESS as `0x${string}` : process.env.GET_PRICE_CONTRACT_BSC_ADDRESS as `0x${string}`,
  //       abi: swapContractAbi,
  //       functionName: "getAmountsOut",
  //       // @ts-ignore
  //       args: [swapRoutes[dex][chain], amountIn * 10 ** getDecimals(chain, token1), tokensAddresses[token1][chain], tokensAddresses[token2][chain]],
  //     });
  //
  //     // @ts-ignore
  //     // console.log(">>>>>>>>>>", swapRoutes[dex][chain], tokensAddresses[token1][chain], tokensAddresses[token2][chain], amountIn * 10 ** getDecimals(chain, token1))
  //
  //     // @ts-ignore
  //     setTokensFromDex(Number(res[1]) / (10 ** getDecimals(chain, token2)))
  //
  //   } catch (e: ErrorType) {
  //     console.error(e);
  //   }
  // }
  //
  // const handleSetAmountIn = (e: string | number) => {
  //   setTokensFromDex(0)
  //   setAmountIn(Number(e))
  // }
  //
  // const handleSwap = async () => {
  //
  //   const router = swapRoutes[dex][chain];
  //   const tokenIn = tokensAddresses[token1][chain];
  //   const tokenOut = tokensAddresses[token2][chain];
  //   const _amountIn = Math.floor(amountIn * 10 ** getDecimals(chain, token1));
  //   const amountOutMin = Math.floor(tokensFromDex * 10 ** getDecimals(chain, token2));
  //   const to = walletAddress;
  //   const deadline = Math.floor(Number(new Date()) / 1000) + 60 * 10; // now + 10 minutes
  //
  //   console.log("router", router);
  //   console.log("tokenIn", tokenIn);
  //   console.log("tokenOut", tokenOut);
  //   console.log("amountIn", _amountIn);
  //   console.log("amountOutMin", amountOutMin);
  //   console.log("to", to);
  //   console.log("deadline", deadline);
  //
  //   const CCC = chain === "arbitrum" ? arbitrum : chain === "polygon" ? polygon : bsc
  //   console.log("CCC", CCC);
  //
  //   const clientWallet = createWalletClient({
  //     chain: chain === "arbitrum" ? arbitrum : chain === "polygon" ? polygon : bsc,
  //     transport: custom(window.ethereum!)
  //   })
  //
  //   const address = chain === "arbitrum" ? process.env.GET_PRICE_CONTRACT_ARBITRUM_ADDRESS : chain === "polygon" ? process.env.GET_PRICE_CONTRACT_POLYGON_ADDRESS : process.env.GET_PRICE_CONTRACT_BSC_ADDRESS;
  //   console.log("address", address);
  //
  //   const gasLimit = chain === "arbitrum" ? 462800n : chain === "polygon" ? 694200n : 55000n;
  //
  //
  //   try {
  //
  //     const publicClient = createPublicClient({
  //       chain: chain === "arbitrum" ? arbitrum : chain === "polygon" ? polygon : bsc,
  //       transport: http(),
  //     });
  //
  //     const [account] = await clientWallet.getAddresses()
  //
  //     // const usdtChainAddress = chain === "arbitrum" ? tokensAddresses.USDT.arbitrum : chain === "polygon" ? tokensAddresses.USDT.polygon : tokensAddresses.USDT.bsc;
  //     // const approvedAddress = chain === "arbitrum" ? process.env.GET_PRICE_CONTRACT_ARBITRUM_ADDRESS : chain === "polygon" ? process.env.GET_PRICE_CONTRACT_POLYGON_ADDRESS : process.env.GET_PRICE_CONTRACT_BSC_ADDRESS;
  //
  //     const res = await clientWallet.writeContract({
  //       address: tokenIn as `0x${string}`,
  //       abi: ERC20ContractAbi,
  //       functionName: 'approve',
  //       account,
  //       args: [address, _amountIn],
  //       gas: gasLimit,
  //     })
  //     console.log("res", res)
  //     await publicClient.waitForTransactionReceipt(
  //       {hash: res}
  //     )
  //
  //     const res2 = await clientWallet.writeContract({
  //       address: address as `0x${string}`,
  //       abi: swapContractAbi,
  //       functionName: 'swapTokens',
  //       account,
  //       args: [router, tokenIn, tokenOut, _amountIn, amountOutMin, to, deadline],
  //       gas: BigInt(Number(gasLimit) * 1.4),
  //     })
  //     console.log("res2", res2)
  //   } catch
  //     (e: ErrorType) {
  //     console.error(e)
  //     makeNotification(e.message.toString())
  //   }
  //
  //
  // }


  return (<Card withBorder
                padding="xs"
                component="div" className={style.wrapper}>
    <Flex
      gap="xs"
      justify="flex-start"
      align="center"
      wrap="wrap"
      ml={5}
    >

      {prices[0] ?

        <Popover width={300} trapFocus position="bottom" withArrow shadow="md">
          <Popover.Target>
            <Text size="xs" c="orange" className={style.tokensWprice}>{token1}/{token2}</Text>
          </Popover.Target>
          {/*<Popover.Dropdown style={{width: 380}}>*/}
          {/*  <Stack justify="space-between" gap="xs" align="center" style={{padding: "0"}}>*/}
          {/*    <NumberInput label={token1} size="xs" min={0} value={amountIn} onChange={handleSetAmountIn}*/}
          {/*                 style={{width: "100%"}}/>*/}
          {/*    <Text size="xs" c="darkgray"> = {amountIn * price} {token2}</Text>*/}
          {/*    <Flex justify="space-between" style={{width: "100%"}} align="center">*/}

          {/*      {!tokensFromDex ? <Text size="xs">Received from*/}
          {/*        DEX: </Text> : <Text size="xs">Received from*/}
          {/*        DEX: {tokensFromDex} (- {((1 - (tokensFromDex / (amountIn * price))) * 100).toFixed(2)} %)</Text>}*/}
          {/*      <Button size="xs" variant="outline" disabled={!amountIn} onClick={getTokensFromDex}>GET</Button>*/}
          {/*    </Flex>*/}
          {/*    <Button size="xs" variant="outline" disabled={!amountIn || !tokensFromDex}*/}
          {/*            onClick={handleSwap}>SWAP</Button>*/}
          {/*  </Stack>*/}
          {/*</Popover.Dropdown>*/}
        </Popover>
        : <Text size="xs" c="orange" className={style.tokens}>{token1}/{token2}</Text>

      }



        <Text size="xs" style={{flexGrow: 1}} fw={700}
              c={isNaN(prices[0]) ? "red" : prices[0] === 0 ? "yellow" : "lime"}>{isNaN(prices[0]) ? "not exist" : prices[0] === 0 ? "" : prices[0]}</Text>

      <Text size="xs" style={{flexGrow: 1}} fw={700}
            c={isNaN(prices[1]) ? "red" : prices[0] === 0 ? "yellow" : "lime"}>{isNaN(prices[1]) ? "not exist" : prices[1] === 0 ? "" : prices[1]}</Text>

      <Text size="xs" style={{flexGrow: 1}} fw={700}
            c={isNaN(prices[2]) ? "red" : prices[0] === 0 ? "yellow" : "lime"}>{isNaN(prices[2]) ? "not exist" : prices[2] === 0 ? "" : prices[2]}</Text>

      <Button size="xs" variant="light" loading={loading} loaderProps={{"size": "xs", type: "oval"}} onClick={getPrice}
              disabled={false}>GET
        PRICES</Button>
    </Flex>
  </Card>);
};