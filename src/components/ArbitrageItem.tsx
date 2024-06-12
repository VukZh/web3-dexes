import {FC, useContext, useEffect, useState} from "react";
import {Button, Card, Flex, NumberInput, Popover, Stack, Text, Progress} from "@mantine/core";
import style from "./ArbitrageItem.module.css";
import {dexesInChaines, swapFactories, tokensAddresses, swapRoutes} from "../state/constants.ts";
import {createPublicClient, createWalletClient, custom, http} from "viem";
import {arbitrum, polygon, bsc} from "viem/chains";
// @ts-ignore
import {ErrorType} from "viem/_types/errors/utils";
import {swapContractAbi} from "../helpers/swapAbi";
import {makeNotification} from "../helpers/makeNotification.ts";
import {Context} from "../state/ContextProvider.tsx";
import {getDecimals} from "../helpers/getDecimals.ts";
import {getBetterPair} from "../helpers/getBetterPair.ts";
import {ERC20ContractAbi} from "../helpers/erc20TokensAbi.ts";


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
  const [amountIn, setAmountIn] = useState<number>(0);
  const [tokensFromDexes, setTokensFromDexes] = useState<Array<number>>([0, 0, 0]);
  const [getBackTokensFromDexes, setGetBackTokensFromDexes] = useState<Array<number>>([0, 0, 0, 0, 0, 0]);
  const [betterPath, setBetterPath] = useState<{
    dex1: number,
    dex2: number,
    ind: number
  }>({
    dex1: 0,
    dex2: 0,
    ind: 0
  })
  const [progress, setProgress] = useState(0);
  const [progressIsUpdated, setProgressIsUpdated] = useState(false);

  const {walletAddress} = useContext(Context);

  // @ts-ignore
  const [dex0, dex1, dex2] = dexesInChaines[chain];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress <= 0) {
          clearInterval(timer);
          setProgressIsUpdated(false);
          return 0;
        }
        return prevProgress - 1;
      });
    }, 100);

    return () => {
      clearInterval(timer);
      setProgressIsUpdated(false);
    };
  }, [progressIsUpdated]);


  const getPrice = async () => {
    setLoading(true);
    try {
      const publicClient = createPublicClient({
        chain: chain === "arbitrum" ? arbitrum : chain === "polygon" ? polygon : bsc,
        transport: http(),
      });

      const address = chain === "arbitrum" ? process.env.GET_PRICE_CONTRACT_ARBITRUM_ADDRESS as `0x${string}` : chain === "polygon" ? process.env.GET_PRICE_CONTRACT_POLYGON_ADDRESS as `0x${string}` : process.env.GET_PRICE_CONTRACT_BSC_ADDRESS as `0x${string}`;

      const res0 = publicClient.readContract({
        address: address,
        abi: swapContractAbi,
        functionName: "getPrice",
        // @ts-ignore
        args: [swapFactories[dex0][chain], tokensAddresses[token1][chain], tokensAddresses[token2][chain], 10],
      });

      const res1 = publicClient.readContract({
        address: address,
        abi: swapContractAbi,
        functionName: "getPrice",
        // @ts-ignore
        args: [swapFactories[dex1][chain], tokensAddresses[token1][chain], tokensAddresses[token2][chain], 10],
      });

      const res2 = publicClient.readContract({
        address: address,
        abi: swapContractAbi,
        functionName: "getPrice",
        // @ts-ignore
        args: [swapFactories[dex2][chain], tokensAddresses[token1][chain], tokensAddresses[token2][chain], 10],
      });


      const res = await Promise.allSettled([res0, res1, res2]);
      // @ts-ignore
      const resUpdated = res.map(r => Number(Number(r.value) / 10 ** 10));
      console.log("res", res);
      setPrices(resUpdated);
    } catch (e: ErrorType) {
      console.error(e);
      setPrices([NaN, NaN, NaN]);
      makeNotification(`Price ${token1} / ${token2} not found`);
    } finally {
      setLoading(false);
    }
  }

  const getTokensFromDex = async () => {

    if (progress === 0) {
      setProgress(100);
      setProgressIsUpdated(true);
    }


    try {
      const publicClient = createPublicClient({
        chain: chain === "arbitrum" ? arbitrum : chain === "polygon" ? polygon : bsc,
        transport: http(),
      });
      const res0 = publicClient.readContract({
        address: chain === "arbitrum" ? process.env.GET_PRICE_CONTRACT_ARBITRUM_ADDRESS as `0x${string}` : chain === "polygon" ? process.env.GET_PRICE_CONTRACT_POLYGON_ADDRESS as `0x${string}` : process.env.GET_PRICE_CONTRACT_BSC_ADDRESS as `0x${string}`,
        abi: swapContractAbi,
        functionName: "getAmountsOut",
        // @ts-ignore
        args: [swapRoutes[dex0][chain], amountIn * 10 ** getDecimals(chain, token1), tokensAddresses[token1][chain], tokensAddresses[token2][chain]],
      });

      const res1 = publicClient.readContract({
        address: chain === "arbitrum" ? process.env.GET_PRICE_CONTRACT_ARBITRUM_ADDRESS as `0x${string}` : chain === "polygon" ? process.env.GET_PRICE_CONTRACT_POLYGON_ADDRESS as `0x${string}` : process.env.GET_PRICE_CONTRACT_BSC_ADDRESS as `0x${string}`,
        abi: swapContractAbi,
        functionName: "getAmountsOut",
        // @ts-ignore
        args: [swapRoutes[dex1][chain], amountIn * 10 ** getDecimals(chain, token1), tokensAddresses[token1][chain], tokensAddresses[token2][chain]],
      });

      const res2 = publicClient.readContract({
        address: chain === "arbitrum" ? process.env.GET_PRICE_CONTRACT_ARBITRUM_ADDRESS as `0x${string}` : chain === "polygon" ? process.env.GET_PRICE_CONTRACT_POLYGON_ADDRESS as `0x${string}` : process.env.GET_PRICE_CONTRACT_BSC_ADDRESS as `0x${string}`,
        abi: swapContractAbi,
        functionName: "getAmountsOut",
        // @ts-ignore
        args: [swapRoutes[dex2][chain], amountIn * 10 ** getDecimals(chain, token1), tokensAddresses[token1][chain], tokensAddresses[token2][chain]],
      });
      const res = await Promise.allSettled([res0, res1, res2]);
      // @ts-ignore
      const resUpdated = res.map(r => r?.value ? Number(r.value[1]) / (10 ** getDecimals(chain, token2)) : NaN);

      const res01back = publicClient.readContract({
        address: chain === "arbitrum" ? process.env.GET_PRICE_CONTRACT_ARBITRUM_ADDRESS as `0x${string}` : chain === "polygon" ? process.env.GET_PRICE_CONTRACT_POLYGON_ADDRESS as `0x${string}` : process.env.GET_PRICE_CONTRACT_BSC_ADDRESS as `0x${string}`,
        abi: swapContractAbi,
        functionName: "getAmountsOut",
        // @ts-ignore
        args: [swapRoutes[dex1][chain], Math.trunc(resUpdated[0] * 10 ** getDecimals(chain, token2)), tokensAddresses[token2][chain], tokensAddresses[token1][chain]],
      });

      const res02back = publicClient.readContract({
        address: chain === "arbitrum" ? process.env.GET_PRICE_CONTRACT_ARBITRUM_ADDRESS as `0x${string}` : chain === "polygon" ? process.env.GET_PRICE_CONTRACT_POLYGON_ADDRESS as `0x${string}` : process.env.GET_PRICE_CONTRACT_BSC_ADDRESS as `0x${string}`,
        abi: swapContractAbi,
        functionName: "getAmountsOut",
        // @ts-ignore
        args: [swapRoutes[dex2][chain], Math.trunc(resUpdated[0] * 10 ** getDecimals(chain, token2)), tokensAddresses[token2][chain], tokensAddresses[token1][chain]],
      });

      const res10back = publicClient.readContract({
        address: chain === "arbitrum" ? process.env.GET_PRICE_CONTRACT_ARBITRUM_ADDRESS as `0x${string}` : chain === "polygon" ? process.env.GET_PRICE_CONTRACT_POLYGON_ADDRESS as `0x${string}` : process.env.GET_PRICE_CONTRACT_BSC_ADDRESS as `0x${string}`,
        abi: swapContractAbi,
        functionName: "getAmountsOut",
        // @ts-ignore
        args: [swapRoutes[dex0][chain], Math.trunc(resUpdated[1] * 10 ** getDecimals(chain, token2)), tokensAddresses[token2][chain], tokensAddresses[token1][chain]],
      });

      const res12back = publicClient.readContract({
        address: chain === "arbitrum" ? process.env.GET_PRICE_CONTRACT_ARBITRUM_ADDRESS as `0x${string}` : chain === "polygon" ? process.env.GET_PRICE_CONTRACT_POLYGON_ADDRESS as `0x${string}` : process.env.GET_PRICE_CONTRACT_BSC_ADDRESS as `0x${string}`,
        abi: swapContractAbi,
        functionName: "getAmountsOut",
        // @ts-ignore
        args: [swapRoutes[dex2][chain], Math.trunc(resUpdated[1] * 10 ** getDecimals(chain, token2)), tokensAddresses[token2][chain], tokensAddresses[token1][chain]],
      });

      const res20back = publicClient.readContract({
        address: chain === "arbitrum" ? process.env.GET_PRICE_CONTRACT_ARBITRUM_ADDRESS as `0x${string}` : chain === "polygon" ? process.env.GET_PRICE_CONTRACT_POLYGON_ADDRESS as `0x${string}` : process.env.GET_PRICE_CONTRACT_BSC_ADDRESS as `0x${string}`,
        abi: swapContractAbi,
        functionName: "getAmountsOut",
        // @ts-ignore
        args: [swapRoutes[dex0][chain], Math.trunc(resUpdated[2] * 10 ** getDecimals(chain, token2)), tokensAddresses[token2][chain], tokensAddresses[token1][chain]],
      });

      const res21back = publicClient.readContract({
        address: chain === "arbitrum" ? process.env.GET_PRICE_CONTRACT_ARBITRUM_ADDRESS as `0x${string}` : chain === "polygon" ? process.env.GET_PRICE_CONTRACT_POLYGON_ADDRESS as `0x${string}` : process.env.GET_PRICE_CONTRACT_BSC_ADDRESS as `0x${string}`,
        abi: swapContractAbi,
        functionName: "getAmountsOut",
        // @ts-ignore
        args: [swapRoutes[dex1][chain], Math.trunc(resUpdated[2] * 10 ** getDecimals(chain, token2)), tokensAddresses[token2][chain], tokensAddresses[token1][chain]],
      });


      const resBack = await Promise.allSettled([res01back, res02back, res10back, res12back, res20back, res21back]);
      // @ts-ignore
      const resBackUpdated = resBack.map(r => r?.value ? Number(r.value[1]) / (10 ** getDecimals(chain, token1)) : NaN);


      // @ts-ignore
      setTokensFromDexes(resUpdated)
      setGetBackTokensFromDexes(resBackUpdated);
      setBetterPath(getBetterPair(resBackUpdated))

    } catch (e: ErrorType) {
      console.error(e);
    }
  }

  const handleSetAmountIn = (e: string | number) => {
    setTokensFromDexes([0, 0, 0])
    setGetBackTokensFromDexes([0, 0, 0, 0, 0, 0])
    // @ts-ignore
    setAmountIn(e)
  }

  const handleArbitrage = async () => {
    const address = chain === "arbitrum" ? process.env.GET_PRICE_CONTRACT_ARBITRUM_ADDRESS : chain === "polygon" ? process.env.GET_PRICE_CONTRACT_POLYGON_ADDRESS : process.env.GET_PRICE_CONTRACT_BSC_ADDRESS;
    // @ts-ignore
    const tokenIn = tokensAddresses[token1][chain];
    // @ts-ignore
    const tokenOut = tokensAddresses[token2][chain];
    // @ts-ignore
    const _amountIn = Math.floor(amountIn * 10 ** getDecimals(chain, token1));
    const fixedNanTokensFromDexes = tokensFromDexes.map(t => isNaN(t) ? 0 : t);
    const amountInMinAgain = Math.floor(Math.max(...getBackTokensFromDexes) * 10 ** getDecimals(chain, token1))
    const amountOutMin = Math.floor(Math.max(...fixedNanTokensFromDexes) * 10 ** getDecimals(chain, token2))
    // @ts-ignore
    const router1 = swapRoutes[dexesInChaines[chain][betterPath.dex1]][chain];
    // @ts-ignore
    const router2 = swapRoutes[dexesInChaines[chain][betterPath.dex2]][chain];
    const gasLimit = chain === "arbitrum" ? 470000n : chain === "polygon" ? 700000n : 55000n;
    const deadline = Math.floor(Number(new Date()) / 1000) + 60 * 10; // now + 10 minutes


    const clientWallet = createWalletClient({
      chain: chain === "arbitrum" ? arbitrum : chain === "polygon" ? polygon : bsc,
      // @ts-ignore
      transport: custom(window.ethereum!)
    })
    const to = walletAddress;

    try {
      const publicClient = createPublicClient({
        chain: chain === "arbitrum" ? arbitrum : chain === "polygon" ? polygon : bsc,
        transport: http(),
      });

      const [account] = await clientWallet.getAddresses()
      const res = await clientWallet.writeContract({
        address: tokenIn as `0x${string}`,
        abi: ERC20ContractAbi,
        functionName: 'approve',
        account,
        args: [address, _amountIn],
        gas: gasLimit,
      })
      console.log("res", res)
      await publicClient.waitForTransactionReceipt(
        {hash: res}
      )

      const res2 = await clientWallet.writeContract({
        address: address as `0x${string}`,
        abi: swapContractAbi,
        functionName: 'swapTokens',
        account,
        args: [router1, tokenIn, tokenOut, _amountIn, amountOutMin, to, deadline],
        gas: BigInt(Number(gasLimit) * 2),
      })
      console.log("res2", res2)
      await publicClient.waitForTransactionReceipt(
        {hash: res2}
      )

      const res3 = await clientWallet.writeContract({
        address: tokenOut as `0x${string}`,
        abi: ERC20ContractAbi,
        functionName: 'approve',
        account,
        args: [address, amountOutMin],
        gas: gasLimit,
      })
      console.log("res", res3)
      await publicClient.waitForTransactionReceipt(
        {hash: res3}
      )

      const res4 = await clientWallet.writeContract({
        address: address as `0x${string}`,
        abi: swapContractAbi,
        functionName: 'swapTokens',
        account,
        args: [router2, tokenOut, tokenIn, amountOutMin, amountInMinAgain, to, deadline],
        gas: BigInt(Number(gasLimit) * 2),
      })
      console.log("res3", res4)
      await publicClient.waitForTransactionReceipt(
        {hash: res4}
      )
      makeNotification(`Success: ${amountInMinAgain / 10 ** getDecimals(chain, token1)}`, true)

    } catch (e: ErrorType) {
      console.error(e)
      makeNotification(e.message.toString())
    }

  }

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

      {(prices[0] && prices[1] || prices[1] && prices[2] || prices[0] && prices[2]) ?

        <Popover width={300} trapFocus position="bottom" withArrow shadow="md">
          <Popover.Target>
            <Text size="xs" c="orange" className={style.tokensWprice}>{token1}/{token2}</Text>
          </Popover.Target>
          <Popover.Dropdown style={{width: 380}}>
            <Stack justify="space-between" gap="xs" align="center" style={{padding: "0"}}>
              <NumberInput label={token1} size="xs" min={0} value={amountIn} onChange={handleSetAmountIn}
                           style={{width: "100%"}}/>
              <Text size="xs"
                    c="darkgray"> = {amountIn * prices[0]} ; {amountIn * prices[1]} ; {amountIn * prices[2]} {token2}</Text>
              <Stack justify="space-between" style={{width: "100%"}} gap="xs">

                {(!tokensFromDexes[0] && !tokensFromDexes[1] && !tokensFromDexes[2]) ? <Text size="xs">Received from
                  DEX: </Text> : <>
                  {!isNaN(tokensFromDexes[0]) &&
                      <Text size="xs">Received from
                        {" " + dex0.toUpperCase()}: {tokensFromDexes[0]} {token2}</Text>}
                  {!isNaN(tokensFromDexes[1]) &&
                      <Text size="xs">Received from
                        {" " + dex1.toUpperCase()}: {tokensFromDexes[1]} {token2}</Text>}
                  {!isNaN(tokensFromDexes[2]) &&
                      <Text size="xs">Received from
                        {" " + dex2.toUpperCase()}: {tokensFromDexes[2]} {token2}</Text>}
                </>}

                <Button size="xs" variant="outline" disabled={!amountIn} onClick={getTokensFromDex}>Calculate</Button>

                {!(!getBackTokensFromDexes[0] && !getBackTokensFromDexes[1] && !getBackTokensFromDexes[2] && !getBackTokensFromDexes[3] && !getBackTokensFromDexes[4] && !getBackTokensFromDexes[5]) &&
                    <Stack gap="xs">
                        <Text size="xs">Get {token1} back from:</Text>
                      {!isNaN(getBackTokensFromDexes[0]) &&
                          <Text size="xs" c={betterPath.ind === 0 ? "green" : "white"}>
                            {" " + dex0.toUpperCase()} - {dex1.toUpperCase()} : {getBackTokensFromDexes[0]}</Text>}
                      {!isNaN(getBackTokensFromDexes[1]) &&
                          <Text size="xs" c={betterPath.ind === 1 ? "green" : "white"}>
                            {" " + dex0.toUpperCase()} - {dex2.toUpperCase()} : {getBackTokensFromDexes[1]}</Text>}
                      {!isNaN(getBackTokensFromDexes[2]) &&
                          <Text size="xs" c={betterPath.ind === 2 ? "green" : "white"}>
                            {" " + dex1.toUpperCase()} - {dex0.toUpperCase()} : {getBackTokensFromDexes[2]}</Text>}
                      {!isNaN(getBackTokensFromDexes[3]) &&
                          <Text size="xs" c={betterPath.ind === 3 ? "green" : "white"}>
                            {" " + dex1.toUpperCase()} - {dex2.toUpperCase()} : {getBackTokensFromDexes[3]}</Text>}
                      {!isNaN(getBackTokensFromDexes[4]) &&
                          <Text size="xs" c={betterPath.ind === 4 ? "green" : "white"}>
                            {" " + dex2.toUpperCase()} - {dex0.toUpperCase()} : {getBackTokensFromDexes[4]}</Text>}
                      {!isNaN(getBackTokensFromDexes[5]) &&
                          <Text size="xs" c={betterPath.ind === 5 ? "green" : "white"}>
                            {" " + dex2.toUpperCase()} - {dex1.toUpperCase()} : {getBackTokensFromDexes[5]}</Text>}

                        <Progress.Root size="16" style={{color:  "red"}}>
                            <Progress.Section value={progress} color="lime">
                                <Progress.Label></Progress.Label>
                            </Progress.Section>
                          {progress === 0 && <Text size="xs" pl={10}>need update</Text>}
                        </Progress.Root>

                        <Button size="xs" variant="outline" disabled={progress === 0}
                                onClick={handleArbitrage}>Arbitrage</Button>
                    </Stack>}

              </Stack>

            </Stack>
          </Popover.Dropdown>
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