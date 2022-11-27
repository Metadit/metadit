import "../assets/app.css";
import type { AppProps } from "next/app";
import type { Page } from "../src/custom";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { UserProvider } from "../src/contexts/User";
import LoadingPage from "../components/global/LoadingPage";

type Props = AppProps & {
  Component: Page;
};

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: Props) {
  const getLayout = Component.getLayout ?? ((page: any) => page);
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <LoadingPage />
        {getLayout(<Component {...pageProps} />)}
      </UserProvider>
    </QueryClientProvider>
  );
}
