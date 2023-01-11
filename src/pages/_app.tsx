import "../css/app.css";
import "tippy.js/dist/tippy.css";
import "react-quill/dist/quill.snow.css";
import type { AppProps } from "next/app";
import type { Page } from "../custom";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { UserProvider } from "../contexts/User";
import { Toaster } from "react-hot-toast";
import ModalManager from "../components/global/ModalManager";
import { ModalProvider } from "../contexts/Modal";
import { ModalValuesProvider } from "../contexts/ModalValues";

type Props = AppProps & {
    Component: Page;
};

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: Props) {
    const getLayout = Component.getLayout ?? ((page: any) => page);
    return (
        <QueryClientProvider client={queryClient}>
            <UserProvider>
                <ModalValuesProvider>
                    <ModalProvider>
                        <Toaster
                            position="top-right"
                            toastOptions={{
                                position: "top-center",
                                style: {
                                    background: "#181818",
                                    color: "#fff",
                                    border: "1px solid #282828",
                                    fontSize: "13px",
                                },
                            }}
                        />
                        <ModalManager />
                        {getLayout(<Component {...pageProps} />)}
                    </ModalProvider>
                </ModalValuesProvider>
            </UserProvider>
        </QueryClientProvider>
    );
}
