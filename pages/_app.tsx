import "../assets/app.css";
import type { AppProps } from "next/app";
import type { Page } from "../src/page";
import React from "react";
// this should give a better typing
type Props = AppProps & {
  Component: Page;
};

export default function App({ Component, pageProps }: Props) {
  const getLayout = Component.getLayout ?? ((page: any) => page);
  const Layout = Component.layout ?? React.Fragment;
  return getLayout(
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
