import React, {createContext} from "react";
import {chains, tabs} from "./constants.ts";

interface IContext {
  activeTab: string,
  activeChain: string,
  walletAddress: string
  setActiveTab: React.Dispatch<React.SetStateAction<IContext["activeTab"]>>,
  setActiveChain: React.Dispatch<React.SetStateAction<IContext["activeChain"]>>,
  setWalletAddress: React.Dispatch<React.SetStateAction<IContext["walletAddress"]>>,
}

const InitialContext: IContext = {
  activeTab: tabs[0],
  activeChain: chains[0],
  walletAddress: "",
  setActiveTab: () => {
  },
  setActiveChain: () => {
  },
  setWalletAddress: () => {
  },
};

export const Context = createContext<IContext>(InitialContext);
export const ContextProvider = ({children}: React.PropsWithChildren<object>) => {
  const [activeTab, setActiveTab] = React.useState<IContext["activeTab"]>(InitialContext.activeTab);
  const [activeChain, setActiveChain] = React.useState<IContext["activeChain"]>(InitialContext.activeChain);
  const [walletAddress, setWalletAddress] = React.useState<IContext["walletAddress"]>(InitialContext.walletAddress);

  return (
    <Context.Provider value={{activeTab, activeChain, setActiveTab, setActiveChain, walletAddress, setWalletAddress}}>
      {children}
    </Context.Provider>
  );
};