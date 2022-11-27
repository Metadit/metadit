import "../assets/app.css";
import type { AppProps } from "next/app";
import type { Page } from "../src/custom";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";

type Props = AppProps & {
  Component: Page;
};

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: Props) {
  const getLayout = Component.getLayout ?? ((page: any) => page);
  const Layout = Component.layout ?? React.Fragment;
  return getLayout(
    <QueryClientProvider client={queryClient}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </QueryClientProvider>
  );
}
