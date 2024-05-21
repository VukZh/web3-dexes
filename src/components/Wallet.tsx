"use server";

import {Button} from "@mantine/core";
import {IconWallet} from "@tabler/icons-react";
import {createWalletClient, custom} from "viem";
import {arbitrum, polygon} from "viem/chains";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import {FC, use, useContext, useEffect} from "react";
import {Context} from "../state/ContextProvider.tsx";
// @ts-ignore
import {ErrorType} from "viem/_types/errors/utils";
import {notifications} from "@mantine/notifications";

const walletIcon = <IconWallet size={24}/>;

const makeNotification = (msg: string) => {
  notifications.show({
    title: "Error",
    message: msg,
    autoClose: 3000,
    style: {position: "absolute", bottom: "50px", right: "10px", maxWidth: "600px"},
    color: "red",
  });
};


export const Wallet: FC = () => {

  const {walletAddress, setWalletAddress, activeChain, setActiveChain} = useContext(Context);

  const clientWallet = createWalletClient({
    chain: activeChain === "Polygon" ? polygon : arbitrum,
    transport: custom(window.ethereum!),
  });


  useEffect(() => {
    const newChain: any = activeChain === "Polygon" ? polygon : arbitrum;

    const switchChain = async () => {
      await clientWallet.switchChain({id: newChain.id});
    };
    try {
      switchChain().then(() => {
        activeChain === "Polygon" ? setActiveChain("Polygon") : setActiveChain("Arbitrum");
      }).catch(() => {
        activeChain === "Polygon" ? setActiveChain("Arbitrum") : setActiveChain("Polygon");
      });

    } catch (e: any) {
      makeNotification(e.message.toString());
    }

  }, [activeChain]);

  const execClientW = async () => {
    const [address] = await clientWallet.requestAddresses();
    setWalletAddress(address);
  };
  return <Button m={5} color={walletAddress ? "green" : "tomato"} leftSection={walletIcon} w={40} pr={0}
                 onClick={execClientW}></Button>;
};

