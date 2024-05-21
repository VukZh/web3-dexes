import {FC, useState} from "react";
import {Button, Card, Flex, NumberInput, Popover, Stack, Text, TextInput} from "@mantine/core";
import style from "./PairItem.module.css";
import {swapFactories, tokensAddresses} from "../state/constants.ts";
import {createPublicClient, http} from "viem";
import {arbitrum, polygon} from "viem/chains";
import {ErrorType} from "viem/_types/errors/utils";
import {GetPriceContractAbi} from "../helpers/getPriceAbi";
import {makeNotification} from "../helpers/makeNotification.ts";

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

  async function getPrice() {
    setLoading(true);
    try {
      const publicClient = createPublicClient({
        chain: chain === "arbitrum" ? arbitrum : polygon,
        transport: http(),
      });

      const res = await publicClient.readContract({
        address: chain === "arbitrum" ? process.env.GET_PRICE_CONTRACT_ARBITRUM_ADDRESS as `0x${string}` : process.env.GET_PRICE_CONTRACT_POLYGON_ADDRESS as `0x${string}`,
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
          <Popover.Dropdown style={{width: 250}}>
            <Stack justify="space-between" gap="xs" align="center">
              <NumberInput label={token1} size="xs" min={0} value={amountIn} onChange={(e) => setAmountIn(e)}/>
              <Text size="xs" c="darkgray">{amountIn * price} {token2}</Text>
              <Button size="xs" variant="light" disabled={!amountIn}>SWAP</Button>
            </Stack>
          </Popover.Dropdown>
        </Popover>
        : <Text size="xs" c="orange" className={style.tokens}>{token1}/{token2}</Text>

      }

      <Text size="xs" style={{flexGrow: 1}} fw={700}
            c={isNaN(price) ? "red" : price === 0 ? "yellow" : "lime"}>Price: {isNaN(price) ? "not exist" : price === 0 ? "" : price}</Text>
      <Button size="xs" variant="light" loading={loading} loaderProps={{"size": "xs", type: "oval"}} onClick={getPrice}>GET
        PRICE</Button>
    </Flex>
  </Card>);
};