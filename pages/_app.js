import Head from "next/head";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.css";
import "../styles/roster.css";

import { useEffect } from "react";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return (
    <>
    <Head>
       <meta name="viewport" content="width=device-width, initial-scale=1" />
       <title>breakfast raiders</title>
       <link rel="preconnect" href="https://fonts.googleapis.com"></link>
       <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin></link>
       <link href="https://fonts.googleapis.com/css2?family=Dancing+Script&display=swap" rel="stylesheet"></link>
    </Head>
    <Component {...pageProps} />
    </>
    );
}

export default MyApp;
