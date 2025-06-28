import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "@/components/Layout";
import { NextUIProvider } from "@nextui-org/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries:{
      refetchOnWindowFocus:false,
      retry:false,
    }
  }
})

export default function App({ Component, pageProps:{session,...pageProps} }: AppProps) {
  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <NextUIProvider>
          {/* <Layout> */}
            <Component {...pageProps} />
          {/* </Layout> */}
        </NextUIProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}
