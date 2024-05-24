import {FC, useState} from "react";
import {Button, Card, Flex, NumberInput, Popover, Stack, Text, TextInput} from "@mantine/core";
import style from "./PairItem.module.css";
import {swapFactories, swapRoutes, tokensAddresses} from "../state/constants.ts";
import {createPublicClient, http} from "viem";
import {arbitrum, polygon, bsc} from "viem/chains";
import {ErrorType} from "viem/_types/errors/utils";
import {GetPriceContractAbi} from "../helpers/getPriceAbi";
import {makeNotification} from "../helpers/makeNotification.ts";
import {getDecimals} from "../helpers/getDecimals.ts";

type PairItemType = {
  chain: string
  dex: "uniswap" | "sushiswap" | "pancakeswap" | "quickswap",
  token1: string,
  token2: string,
}

export const PairItem: FC<PairItemType> = ({
                                             chain,
                                             dex,
                                             token1,
                                             token2,
                                           }) => {
  const [price, setPrice] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [amountIn, setAmountIn] = useState(0);
  const [tokensFromDex, setTokensFromDex] = useState<number>(0);

  // @ts-ignore
  const pairExists = !!tokensAddresses[token1][chain] && !!tokensAddresses[token2][chain]


  async function getPrice() {
    setLoading(true);
    try {
      const publicClient = createPublicClient({
        chain: chain === "arbitrum" ? arbitrum : chain === "polygon" ? polygon : bsc,
        transport: http(),
      });

      const res = await publicClient.readContract({
        address: chain === "arbitrum" ? process.env.GET_PRICE_CONTRACT_ARBITRUM_ADDRESS as `0x${string}` : chain === "polygon" ? process.env.GET_PRICE_CONTRACT_POLYGON_ADDRESS as `0x${string}` : process.env.GET_PRICE_CONTRACT_BSC_ADDRESS as `0x${string}`,
        abi: GetPriceContractAbi,
        functionName: "getPrice",
        // @ts-ignore
        args: [swapFactories[dex][chain], tokensAddresses[token1][chain], tokensAddresses[token2][chain], 10],
      });
      setPrice(Number(Number(res) / 10 ** 10));
    } catch (e: ErrorType) {
      console.error(e);
      console.log("err");
      setPrice(NaN);
      makeNotification(`Price ${token1} / ${token2} not found`);
    } finally {
      setLoading(false);
    }
  }

  async function getTokensFromDex() {
    try {
      const publicClient = createPublicClient({
        chain: chain === "arbitrum" ? arbitrum : chain === "polygon" ? polygon : bsc,
        transport: http(),
      });
      const res = await publicClient.readContract({
        address: chain === "arbitrum" ? process.env.GET_PRICE_CONTRACT_ARBITRUM_ADDRESS as `0x${string}` : chain === "polygon" ? process.env.GET_PRICE_CONTRACT_POLYGON_ADDRESS as `0x${string}` : process.env.GET_PRICE_CONTRACT_BSC_ADDRESS as `0x${string}`,
        abi: GetPriceContractAbi,
        functionName: "getAmountsOut",
        // @ts-ignore
        args: [swapRoutes[dex][chain], amountIn * 10 ** getDecimals(chain, token1), tokensAddresses[token1][chain], tokensAddresses[token2][chain]],
      });

      // @ts-ignore
      // console.log(">>>>>>>>>>", swapRoutes[dex][chain], tokensAddresses[token1][chain], tokensAddresses[token2][chain], amountIn * 10 ** getDecimals(chain, token1))

      // @ts-ignore
      setTokensFromDex(Number(res[1]) / (10 ** getDecimals(chain, token2)))

    } catch (e: ErrorType) {
      console.error(e);
    }
  }

  const handleSetAmountIn = (e: string | number) => {
    setTokensFromDex(0)
    setAmountIn(Number(e))
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

      {price ?

        <Popover width={300} trapFocus position="bottom" withArrow shadow="md">
          <Popover.Target>
            <Text size="xs" c="orange" className={style.tokensWprice}>{token1}/{token2}</Text>
          </Popover.Target>
          <Popover.Dropdown style={{width: 380}}>
            <Stack justify="space-between" gap="xs" align="center" style={{padding: "0"}}>
              <NumberInput label={token1} size="xs" min={0} value={amountIn} onChange={handleSetAmountIn}
                           style={{width: "100%"}}/>
              <Text size="xs" c="darkgray"> = {amountIn * price} {token2}</Text>
              <Flex justify="space-between" style={{width: "100%"}} align="center">

                {!tokensFromDex ? <Text size="xs">Received from
                  DEX: </Text> : <Text size="xs">Received from
                  DEX: {tokensFromDex} (- {((1 - (tokensFromDex / (amountIn * price))) * 100).toFixed(2)} %)</Text>}
                <Button size="xs" variant="outline" disabled={!amountIn} onClick={getTokensFromDex}>GET</Button>
              </Flex>
              <Button size="xs" variant="outline" disabled={!amountIn}>SWAP</Button>
            </Stack>
          </Popover.Dropdown>
        </Popover>
        : <Text size="xs" c="orange" className={style.tokens}>{token1}/{token2}</Text>

      }

      <Text size="xs" style={{flexGrow: 1}} fw={700}
            c={isNaN(price) ? "red" : price === 0 ? "yellow" : "lime"}>Price: {isNaN(price) ? "not exist" : price === 0 ? "" : price}</Text>
      <Button size="xs" variant="light" loading={loading} loaderProps={{"size": "xs", type: "oval"}} onClick={getPrice} disabled={!pairExists}>GET
        PRICE</Button>
    </Flex>
  </Card>);
};