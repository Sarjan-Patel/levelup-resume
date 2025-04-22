import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
   <Head>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js" />
  <script src="https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.fog.min.js" />
</Head>

      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
