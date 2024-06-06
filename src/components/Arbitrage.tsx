import {SwapItem} from "./SwapItem.tsx";
import {useDebouncedState} from "@mantine/hooks";
import {TextInput, Text, Flex, Stack, Divider, Select} from "@mantine/core";
import {IconSearch} from "@tabler/icons-react";
import {availablePairs, availableTokens, dexesInChaines, tokensAddresses} from "../state/constants.ts";
import {useContext, useState} from "react";
import {Context} from "../state/ContextProvider.tsx";
import {ArbitrageItem} from "./ArbitrageItem.tsx";

export const Arbitrage = () => {
  const [filteredCoins, setFilteredCoins] = useDebouncedState<string>("", 600);
  const {activeChain} = useContext(Context);
  const searchIcon = <IconSearch size={16}/>;


  const tokensArray = Object.keys(tokensAddresses);

  const [basicToken, setBasicToken] = useState(tokensArray[0]);

  // const basicAvailablePairs = availablePairs.filter(p => p.includes(basicToken));
  //
  // const filteredAvailablePairs = filteredCoins ? basicAvailablePairs.filter(p => p.includes(filteredCoins)) : basicAvailablePairs;

  const coinsArray = availableTokens.filter(p => (p !== basicToken) && p.includes(filteredCoins));


  const dexCoinsArray = coinsArray.map(p => ({
    chain: activeChain.toLowerCase(),
    dex: dexesInChaines[activeChain.toLowerCase()][0],
    token1: basicToken.toUpperCase(),
    token2: p.toUpperCase(),
  }));


  console.log("coinsArray", availableTokens.filter(p => p !== basicToken), dexCoinsArray, basicToken);


  // const dex2CoinsArray = filteredAvailablePairs.map(p => ({
  //   chain: activeChain.toLowerCase(),
  //   dex: dexesInChaines[activeChain.toLowerCase()][1],
  //   token1: p.split("-")[0],
  //   token2: p.split("-")[1],
  // }));
  // const dex3CoinsArray = filteredAvailablePairs.map(p => ({
  //   chain: activeChain.toLowerCase(),
  //   dex: dexesInChaines[activeChain.toLowerCase()][2],
  //   token1: p.split("-")[0],
  //   token2: p.split("-")[1],
  // }));
  // console.log("filteredAvailablePairs", filteredAvailablePairs);

  // useEffect(() => {
  //   console.log("........ ", activeChain, dex1CoinsArray);
  // }, [filteredCoins]);

  return (
    <>
      <Flex justify="center" gap={15} align="end">
        <Select
          label="Main token"
          placeholder="Pick token"
          data={tokensArray}
          value={basicToken}
          onChange={(e) => setBasicToken(e)}
        />
        <TextInput
          label="Coins filter"
          description="Select a coin (empty for all)"
          placeholder="The coin you need"
          rightSection={searchIcon}
          defaultValue={filteredCoins}
          onChange={(e) => setFilteredCoins(e.currentTarget.value.toUpperCase().trim())}
          width={300}
          style={{
            width: "40%",
          }}
        />
        <Text c="green">Filtered coins: {filteredCoins.length > 0 ? filteredCoins : "All coins"}</Text>
      </Flex>

      <Flex justify="center" gap={15} mt={15}>
        <Stack
          h={"150%"}
          align="stretch"
          justify="flex-start"
          gap="xs"
        >
          <Text c="teal"
                align="center">{(dexesInChaines[activeChain.toLowerCase()][0]).toUpperCase()} / {(dexesInChaines[activeChain.toLowerCase()][1]).toUpperCase()} / {(dexesInChaines[activeChain.toLowerCase()][2]).toUpperCase()}</Text>
          {dexCoinsArray.map((coin) => !!tokensAddresses[coin.token1][coin.chain] && !!tokensAddresses[coin.token2][coin.chain] && (
            <ArbitrageItem key={coin.token1 + coin.token2 + activeChain} chain={coin.chain}
                           token1={coin.token1} token2={coin.token2}></ArbitrageItem>

          ))}
        </Stack>
        {/*<Stack*/}
        {/*  h={"150%"}*/}
        {/*  align="stretch"*/}
        {/*  justify="flex-start"*/}
        {/*  gap="xs"*/}
        {/*>*/}
        {/*  <Text c="teal" align="center">{(dexesInChaines[activeChain.toLowerCase()][1]).toUpperCase()}</Text>*/}
        {/*  {dex2CoinsArray.map((coin, index) => !!tokensAddresses[coin.token1][coin.chain] && !!tokensAddresses[coin.token2][coin.chain] && (*/}
        {/*    <>*/}
        {/*      <SwapItem key={coin.token1 + coin.token2 + activeChain} chain={coin.chain} dex={coin.dex}*/}
        {/*                token1={coin.token1} token2={coin.token2}></SwapItem>*/}
        {/*      {(index % 2 != 0) && <Divider my="sm"/>}*/}
        {/*    </>*/}
        {/*  ))}*/}
        {/*</Stack>*/}
        {/*<Stack*/}
        {/*  h={"150%"}*/}
        {/*  align="stretch"*/}
        {/*  justify="flex-start"*/}
        {/*  gap="xs"*/}
        {/*>*/}
        {/*  <Text c="teal" align="center">{(dexesInChaines[activeChain.toLowerCase()][2]).toUpperCase()}</Text>*/}
        {/*  {dex3CoinsArray.map((coin, index) => !!tokensAddresses[coin.token1][coin.chain] && !!tokensAddresses[coin.token2][coin.chain] && (*/}
        {/*    <>*/}
        {/*      <SwapItem key={coin.token1 + coin.token2 + activeChain} chain={coin.chain} dex={coin.dex}*/}
        {/*                token1={coin.token1} token2={coin.token2}></SwapItem>*/}
        {/*      {(index % 2 != 0) && <Divider my="sm"/>}*/}
        {/*    </>*/}
        {/*  ))}*/}
        {/*</Stack>*/}
      </Flex>

    </>


  );
};