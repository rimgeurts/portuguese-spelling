import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html className="bg-gradient-to-r from-sky-400 to-blue-500 w-full h-screen">
        <img className={'absolute rotate-[180deg]'} src="/background.svg" alt=""/>
        <img className={'absolute bottom-0 '} src="/background.svg" alt=""/>
      <Head />
      <body className="">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
