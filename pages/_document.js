import { Head, Html, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  return (
    <Html className="bg-gradient-to-r from-sky-400 to-blue-500 w-full h-screen">
      <img
        className={"absolute rotate-[180deg]"}
        src="/background.svg"
        alt=""
      />
      <img className={"absolute bottom-0 "} src="/background.svg" alt="" />
      <Head>
        <Script
          id={"google-tag1"}
          strategy={"afterInteractive"}
          src={"https://www.googletagmanager.com/gtag/js?id=G-9ZW523B0HV"}
        ></Script>
        <Script
          id={"google-tag2"}
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-9ZW523B0HV');`,
          }}
        ></Script>
      </Head>

      <body className="">
        <noscript
          dangerouslySetInnerHTML={{
            __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=G-9ZW523B0HV"
            height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
          }}
        ></noscript>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
