import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import RegisterModal from "@/components/Modal/RegisterModal";
import LoginModal from "@/components/Modal/LoginModal";
import ToasterProvider from "@/components/ToasterProvider";
import { SessionProvider } from "next-auth/react";

export default  function App({ Component, pageProps: {session,...pageProps} }: AppProps) {
  return (
    <>
    <SessionProvider>
      <ToasterProvider />
      <LoginModal />
      <RegisterModal />
      <Navbar /> 
      <Component {...pageProps} />
      <Footer />
      </SessionProvider>
    </>
  );
}
