import {useDebouncedState} from "@mantine/hooks";
import {TextInput, Text, Flex, Stack, Select} from "@mantine/core";
import {IconSearch} from "@tabler/icons-react";
import {availableTokens, dexesInChaines, tokensAddresses} from "../state/constants.ts";
import {useContext, useState} from "react";
import {Context} from "../state/ContextProvider.tsx";
import {ArbitrageItem} from "./ArbitrageItem.tsx";

export const Arbitrage = () => {
  const [filteredCoins, setFilteredCoins] = useDebouncedState<string>("", 600);
  const {activeChain} = useContext(Context);
  const searchIcon = <IconSearch size={16}/>;


  const tokensArray = Object.keys(tokensAddresses);

  const [basicToken, setBasicToken] = useState(tokensArray[0]);

  const coinsArray = availableTokens.filter(p => (p !== basicToken) && p.includes(filteredCoins));


  const dexCoinsArray = coinsArray.map(p => ({
    chain: activeChain.toLowerCase(),
    // @ts-ignore
    dex: dexesInChaines[activeChain.toLowerCase()][0],
    token1: basicToken.toUpperCase(),
    token2: p.toUpperCase(),
  }));


  return (
    <>
      <Flex justify="center" gap={15} align="end">
        <Select
          label="Main token"
          placeholder="Pick token"
          data={tokensArray}
          value={basicToken}
          // @ts-ignore
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
                ta="center">{
            // @ts-ignore
            (dexesInChaines[activeChain.toLowerCase()][0]).toUpperCase()} / {(dexesInChaines[activeChain.toLowerCase()][1]).toUpperCase()} / {(dexesInChaines[activeChain.toLowerCase()][2]).toUpperCase()}</Text>
          {
            // @ts-ignore
            dexCoinsArray.map((coin) => !!tokensAddresses[coin.token1][coin.chain] && !!tokensAddresses[coin.token2][coin.chain] && (
            <ArbitrageItem key={coin.token1 + coin.token2 + activeChain} chain={coin.chain}
                           token1={coin.token1} token2={coin.token2}></ArbitrageItem>

          ))}
        </Stack>
      </Flex>

    </>


  );
};