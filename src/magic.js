import { Magic } from "magic-sdk";

export const magic = new Magic("pk_live_EFD6690D03DF646E", {
  network: {
    rpcUrl: "https://rpc.testnet.fantom.network/",
    chainId: 4002
  }
});
