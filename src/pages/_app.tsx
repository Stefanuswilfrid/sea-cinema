import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import RegisterModal from "@/components/Modal/RegisterModal";
import LoginModal from "@/components/Modal/LoginModal";
import SeatModal from "@/components/Modal/SeatModal";
import ToasterProvider from "@/components/ToasterProvider";
import { SessionProvider } from "next-auth/react";
import { useRouter } from "next/router";
import { CartProvider } from "@/libs/context";
import ModalProvider from "@/components/ModalProvider";
import { Analytics } from "@vercel/analytics/react"

import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";
import React from "react";

if (typeof window !== "undefined") {
  // checks that we are client-side
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY as string, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com",
    person_profiles: "always", // or 'always' to create profiles for anonymous users as well
    loaded: (posthog) => {
      if (process.env.NODE_ENV === "development") posthog.debug(); // debug mode in development
    },
  });
}


export default  function App({ Component, pageProps: {session,...pageProps} }: AppProps) {
  const router = useRouter();
  const movieName = router.asPath.substring(1);

  React.useEffect(() => {
    // Track page views
    const handleRouteChange = () => posthog?.capture("$pageview");
    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
    <CartProvider>
    <SessionProvider>
      <Analytics/>
      <ModalProvider/>
      <ToasterProvider />
      <Navbar /> 
      <Component {...pageProps} />
      <Footer />
      </SessionProvider>
      </CartProvider>
    </>
  );
}
