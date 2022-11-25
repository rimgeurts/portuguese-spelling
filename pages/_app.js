import "../styles/globals.css";
import Layout from "../components/Layout";
import { ApiProvider } from "@reduxjs/toolkit/query/react";
import { strapiApi } from "../redux/apis/strapi";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { SessionProvider } from "next-auth/react";

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </SessionProvider>
  );
}
