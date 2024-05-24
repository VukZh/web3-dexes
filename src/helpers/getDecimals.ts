import {tokensAddresses} from "../state/constants.ts";

export const getDecimals = (chain: string, token: string): number => {
  // @ts-ignore
  return chain === 'bsc' ? tokensAddresses[token].bscdecimals : tokensAddresses[token].decimals
}