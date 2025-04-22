import type { AppProps } from "next/app";
import { Provider as JotaiProvider } from "jotai";
import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <JotaiProvider>
      <Component {...pageProps} />
    </JotaiProvider>
  );
}
