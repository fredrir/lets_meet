import "../styles/globals.css";
import React, { useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { Toaster } from "react-hot-toast";
import Navbar from "../components/navbar";

const SessionHandler: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const router = useRouter();

 

  // if ( (router.pathname !== "/")) {
  //   return (
  //     <div className="flex flex-col items-center justify-center h-screen gap-10">
  //       <Image
  //         src="/Online_bla.svg"
  //         width={300}
  //         height={100}
  //         alt="Online logo"
  //         className="animate-pulse"
  //       />
  //       <div className="text-xl">Vent litt...</div>
  //     </div>
  //   );
  // }

  return <>{children}</>;
};

function MyApp({ Component, pageProps: { session, ...pageProps } }: any) {
  return (
    <div>
      <Head>
        <link rel="icon" href="/Online_hvit_o.svg" />
        <title>Online Komitéopptak</title>
      </Head>
      <SessionHandler>
        <Toaster />
        <Navbar />
        <Component {...pageProps} />
      </SessionHandler>
    </div>
  );
}

export default MyApp;
