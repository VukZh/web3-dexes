import {PairItem} from "./PairItem.tsx";
import {useDebouncedState} from "@mantine/hooks";
import {TextInput, Text, Flex, Stack} from "@mantine/core";
import {IconSearch} from "@tabler/icons-react";
import {availablePairs, dexesInChaines} from "../state/constants.ts";
import {useContext, useEffect} from "react";
import {Context} from "../state/ContextProvider.tsx";

export const Swap = () => {
  const [filteredCoins, setFilteredCoins] = useDebouncedState<string>("", 600);
  const {activeChain} = useContext(Context);
  const searchIcon = <IconSearch size={16}/>;


  const filteredAvailablePairs = filteredCoins ? availablePairs.filter(p => p.includes(filteredCoins)) : availablePairs;
  const dex1CoinsArray = filteredAvailablePairs.map(p => ({
    chain: activeChain.toLowerCase(),
    dex: dexesInChaines[activeChain.toLowerCase()][0],
    token1: p.split("-")[0],
    token2: p.split("-")[1],
  }));
  const dex2CoinsArray = filteredAvailablePairs.map(p => ({
    chain: activeChain.toLowerCase(),
    dex: dexesInChaines[activeChain.toLowerCase()][1],
    token1: p.split("-")[0],
    token2: p.split("-")[1],
  }));
  const dex3CoinsArray = filteredAvailablePairs.map(p => ({
    chain: activeChain.toLowerCase(),
    dex: dexesInChaines[activeChain.toLowerCase()][2],
    token1: p.split("-")[0],
    token2: p.split("-")[1],
  }));
  console.log("filteredAvailablePairs", filteredAvailablePairs);

  useEffect(() => {
    console.log("........ ", activeChain, dex1CoinsArray);
  }, [filteredCoins]);

  return (
    <>
      <Flex justify="center" gap={15} align="end">
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
          <Text c="teal" align="center">{(dexesInChaines[activeChain.toLowerCase()][0]).toUpperCase()}</Text>
          {dex1CoinsArray.map((coin) => (
            <PairItem key={coin.token1 + coin.token2 + activeChain} chain={coin.chain} dex={coin.dex}
                      token1={coin.token1} token2={coin.token2}></PairItem>
          ))}
        </Stack>
        <Stack
          h={"150%"}
          align="stretch"
          justify="flex-start"
          gap="xs"
        >
          <Text c="teal" align="center">{(dexesInChaines[activeChain.toLowerCase()][1]).toUpperCase()}</Text>
          {dex2CoinsArray.map((coin) => (
            <PairItem key={coin.token1 + coin.token2 + activeChain} chain={coin.chain} dex={coin.dex}
                      token1={coin.token1} token2={coin.token2}></PairItem>
          ))}
        </Stack>
        <Stack
          h={"150%"}
          align="stretch"
          justify="flex-start"
          gap="xs"
        >
          <Text c="teal" align="center">{(dexesInChaines[activeChain.toLowerCase()][2]).toUpperCase()}</Text>
          {dex3CoinsArray.map((coin) => (
            <PairItem key={coin.token1 + coin.token2 + activeChain} chain={coin.chain} dex={coin.dex}
                      token1={coin.token1} token2={coin.token2}></PairItem>
          ))}
        </Stack>
      </Flex>

    </>


  );
};