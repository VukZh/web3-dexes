import {AppShell, Flex, SegmentedControl, Text} from "@mantine/core";
import {Notifications} from "@mantine/notifications";
import {chains, tabs} from "../state/constants.ts";
import {useContext} from "react";
import {Context} from "../state/ContextProvider";
import {Wallet} from "./Wallet.tsx";
import {Swap} from "./Swap.tsx";
// import {GetAllPrices} from "./GetAllPrices.tsx";
import {Arbitrage} from "./Arbitrage.tsx";

export const RootComponent = () => {
  const {activeTab, setActiveTab, walletAddress, activeChain, setActiveChain} = useContext(Context);
  return (
    <AppShell
      withBorder={false}
      padding="md"
      header={{height: 30}}
      footer={{height: 30}}
    >
      <AppShell.Header style={{marginLeft: 25}}><Flex justify="space-between"
                                                      align="flex-start"
                                                      direction="row"
                                                      wrap="wrap"><Text size="xl" variant="gradient"
                                                                        fw={900}
                                                                        gradient={{
                                                                          from: "lightcyan",
                                                                          to: "green",
                                                                          deg: 90,
                                                                        }}
                                                                        style={{width: 220}}>WEB3 React
        Project</Text>
        <Flex justify="center" align="center">
          {walletAddress && <div style={{marginRight: 20}}>{walletAddress}</div>}
          <SegmentedControl data={chains} onChange={setActiveChain} value={activeChain}/>
          <Wallet/>
        </Flex>

      </Flex></AppShell.Header>
      <AppShell.Main>
        <SegmentedControl size="lg" radius="md" data={tabs} value={activeTab} onChange={setActiveTab}/>
        <br/>
        {/*<GetAllPrices></GetAllPrices>*/}
        {activeTab === "SWAP"  &&  <Swap/>}
        {activeTab === "ARBITRAGE"  &&  <Arbitrage/>}

      </AppShell.Main>
      <AppShell.Footer style={{display: "flex", alignItems: "center", justifyContent: "end"}}>
        <Text
          variant="gradient"
          fw={900}
          gradient={{from: "green", to: "lightcyan", deg: 90}}
          style={{width: 80, marginRight: 15}}
        >
          Vuk, 2024
        </Text></AppShell.Footer>
      <Notifications position="top-center" zIndex={1000}/>
    </AppShell>);

};