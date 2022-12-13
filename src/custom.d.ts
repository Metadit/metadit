import { NextPage } from "next";
import { ComponentType, ReactElement, ReactNode } from "react";
import { MetaMaskInpageProvider } from "@metamask/providers";

export type Page<P = {}> = NextPage<P> & {
  getLayout?: (page: ReactElement) => ReactNode;
  layout?: ComponentType;
};

declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider;
  }
}
